import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { evLog } from "./ev-log";

export type FileData = {
  name: string,
  data: Uint8Array
}
export type FrameMeta = { file: string, delay: number }[];

export class FFmpegConvertor {
  coreURL?: string;
  wasmURL?: string;
  ffmpeg?: FFmpeg;
  size: number = 0;
  /// 140MB, don't know why, but it's the limit, if execced, ffmpeg throw index out of bounds error
  maxSize: number = 140000000;
  taskCount: number = 0;
  reloadLock: boolean = false;

  async init(): Promise<FFmpegConvertor> {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    this.coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
    this.wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
    this.ffmpeg = new FFmpeg();
    await this.load();
    return this;
  }

  async load() {
    await this.ffmpeg!.load(
      {
        coreURL: this.coreURL,
        wasmURL: this.wasmURL,
        // classWorkerURL: this.classWorkerURL,
      }
    );
  }

  async check() {
    if (!this.coreURL || !this.wasmURL || !this.ffmpeg) {
      throw new Error("FFmpegConvertor not init");
    }
    if (this.size > this.maxSize) {
      const verLock = this.reloadLock;
      await this.waitForTaskZero();
      if (!this.reloadLock) {
        this.reloadLock = true
        try {
          evLog("info", "FFmpegConvertor: size limit exceeded, terminate ffmpeg, verLock: ", verLock);
          this.ffmpeg.terminate();
          await this.load();
          this.size = 0;
          this.taskCount = 0;
        } finally {
          this.reloadLock = false
        }
      } else {
        await this.waitForReloadLock();
      }
    }
  }

  async writeFiles(files: FileData[], randomPrefix: string) {
    const ffmpeg = this.ffmpeg!;
    await Promise.all(
      files.map(async (f) => {
        this.size += f.data.byteLength;
        await ffmpeg.writeFile(randomPrefix + f.name, f.data);
      })
    );
  }

  async readOutputFile(file: string) {
    const result = await this.ffmpeg!.readFile(file);
    this.size += result.length;
    return result;
  }

  // TODO: find a way to reduce time cost; to mp4 30MB takes 50s; to gif 30MB takes 26s
  async convertTo(files: FileData[], format: "GIF" | "MP4", meta?: FrameMeta): Promise<Blob> {
    await this.check();
    this.taskCount++;
    try {
      const ffmpeg = this.ffmpeg!;
      const randomPrefix = Math.random().toString(36).substring(7);
      await this.writeFiles(files, randomPrefix);

      let metaStr: string;
      if (meta) {
        metaStr = meta.map(m => `file '${randomPrefix}${m.file}'\nduration ${m.delay / 1000}`).join('\n');
      } else {
        metaStr = files.map(f => `file '${randomPrefix}${f.name}'\nduration 0.04`).join('\n');
      }
      await ffmpeg.writeFile(randomPrefix + 'meta.txt', metaStr);

      let resultFile: string;
      let mimeType: string;
      switch (format) {
        case "GIF":
          resultFile = randomPrefix + 'output.gif';
          mimeType = 'image/gif';
          // ffmpeg -f concat -i test.txt -vf "split [a][b];[a] palettegen=stats_mode=diff [p];[b][p] paletteuse=dither=bayer:bayer_scale=2" output_3.gif
          await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', randomPrefix + 'meta.txt', '-vf', 'split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=2', resultFile]);
          break
        case "MP4":
          resultFile = randomPrefix + 'output.mp4';
          mimeType = 'video/mp4';
          await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', randomPrefix + 'meta.txt', '-c:v', 'h264', '-pix_fmt', 'yuv420p', resultFile]);
          break
      }

      const result = await this.readOutputFile(resultFile);

      const deletePromise = files.map((f) => ffmpeg.deleteFile(randomPrefix + f.name));
      if (meta) {
        deletePromise.push(ffmpeg.deleteFile(randomPrefix + 'meta.txt'));
      }
      deletePromise.push(ffmpeg.deleteFile(resultFile));
      // delete temp files
      await Promise.all(deletePromise);

      return new Blob([result as BlobPart], { type: mimeType });
    } finally {
      this.taskCount--;
    }
  }

  async waitForTaskZero() {
    while (this.taskCount > 0) {
      await new Promise(r => setTimeout(r, 100));
    }
    // random wait for 10-100ms 
    await new Promise(r => setTimeout(r, Math.random() * 100 + 10));
  }

  async waitForReloadLock() {
    while (this.reloadLock) {
      await new Promise(r => setTimeout(r, 100));
    }
    // random wait for 10-100ms 
    await new Promise(r => setTimeout(r, Math.random() * 100 + 10));
  }

}

export function generateConvertScript() {
  const sh = `#!/bin/sh
# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg is not installed. Please install ffmpeg to use this script."
    exit 1
fi
# Find all directories name containing 'ugoira'
dirs=$(find . -maxdepth 1 -type d -name "*ugoira*")
for dir in $dirs; do
    out=$(basename "$dir")
    out=$\{out/_ugoira0/\}
    ffmpeg -f concat -safe 0 -i "$dir/frames.txt" -filter_complex "[0:v]format=rgb24,split[x][z];[z]palettegen[p];[x][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 -y "$out.gif" 2>&1 | grep -v "deprecated pixel format"
    if [ $? -eq 0 ]; then
        echo "Converted $out.gif"
        rm -rf "$dir"
    else
        echo "Failed to convert $out.gif"
    fi
done
echo "Conversion complete."`;
  const bat = `@echo off
setlocal enabledelayedexpansion
REM Check if ffmpeg is installed
where ffmpeg >nul 2>nul
if errorlevel 1 (
    echo ffmpeg is not installed. Please install ffmpeg and make sure it is in your PATH. (Try: winget install ffmpeg)
    pause
    exit /b 1
)
REM Find all directories in the current folder that contain "ugoira"
for /d %%D in (*ugoira*) do (
    set "dir=%%D"
    set "out=%%~nD"
    REM Remove the "_ugoira0" suffix from the folder name
    set "out=!out:_ugoira0=!"
    echo Processing "!dir!"...
    REM Run ffmpeg to generate the animated GIF
    ffmpeg -f concat -safe 0 -i "!dir!\\frames.txt" -filter_complex "[0:v]format=rgb24,split[x][z];[z]palettegen[p];[x][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 -y "!out!.gif" 2>&1 | findstr /V "deprecated pixel format"
    REM Check if the ffmpeg command succeeded
    if !errorlevel! == 0 (
        echo Successfully converted: !out!.gif
        REM Delete the original directory
        rmdir /s /q "!dir!"
    ) else (
        echo Failed to convert: !out!.gif
    )
)
echo All conversions completed.
pause`;
  return [sh, bat];
}
