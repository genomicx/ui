import { EmscriptenModule, WasmModuleFactory } from './types';
interface CachedModule {
    factory: WasmModuleFactory;
    wasmBinary: ArrayBuffer;
}
/**
 * Load and cache an Emscripten WASM module by name.
 * Fetches <name>.js and <name>.wasm from static.genomicx.org.
 */
export declare function loadWasmModule(name: string, baseUrl?: string): Promise<CachedModule>;
/**
 * Create a fresh Emscripten module instance (captures its own stdout/stderr).
 */
export declare function createModuleInstance(name: string, baseUrl?: string): Promise<EmscriptenModule>;
export {};
