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
