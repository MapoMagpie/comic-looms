import fs from 'node:fs/promises';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
    try { return await nextResolve(specifier + '.ts', context); } catch { /* fall back */ }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    const source = await fs.readFile(new URL(url), 'utf8');
    return { format: 'module', shortCircuit: true, source: transpileModule(source, {
      compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 },
    }).outputText };
  }
  return nextLoad(url, context);
}
