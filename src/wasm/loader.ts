import type { EmscriptenModule, WasmModuleFactory } from './types';

const WASM_BASE = 'https://static.genomicx.org/wasm';

interface CachedModule {
  factory: WasmModuleFactory;
  wasmBinary: ArrayBuffer;
}

const cache = new Map<string, CachedModule>();

/**
 * Load and cache an Emscripten WASM module by name.
 * Fetches <name>.js and <name>.wasm from static.genomicx.org.
 */
export async function loadWasmModule(name: string, baseUrl = WASM_BASE): Promise<CachedModule> {
  const key = `${baseUrl}/${name}`;
  if (cache.has(key)) return cache.get(key)!;

  const [jsRes, wasmRes] = await Promise.all([
    fetch(`${baseUrl}/${name}.js`),
    fetch(`${baseUrl}/${name}.wasm`),
  ]);

  if (!jsRes.ok) throw new Error(`Failed to fetch ${name}.js: ${jsRes.status}`);
  if (!wasmRes.ok) throw new Error(`Failed to fetch ${name}.wasm: ${wasmRes.status}`);

  const [moduleText, wasmBinary] = await Promise.all([
    jsRes.text(),
    wasmRes.arrayBuffer(),
  ]);

  // eslint-disable-next-line no-new-func
  const factory = new Function('Module', moduleText + '; return Module;')({}) as WasmModuleFactory;
  const cached = { factory, wasmBinary };
  cache.set(key, cached);
  return cached;
}

/**
 * Create a fresh Emscripten module instance (captures its own stdout/stderr).
 */
export async function createModuleInstance(name: string, baseUrl?: string): Promise<EmscriptenModule> {
  const { factory, wasmBinary } = await loadWasmModule(name, baseUrl);
  const stdout: string[] = [];
  const stderr: string[] = [];
  const mod = await factory({
    wasmBinary: wasmBinary.slice(0),
    print: (text: string) => stdout.push(text),
    printErr: (text: string) => stderr.push(text),
    noInitialRun: true,
  });
  mod._stdout = stdout;
  mod._stderr = stderr;
  return mod;
}
