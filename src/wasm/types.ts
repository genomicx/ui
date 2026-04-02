export interface EmscriptenModule {
  callMain: (args: string[]) => void;
  FS: {
    writeFile: (path: string, data: string | Uint8Array) => void;
    readFile: (path: string) => Uint8Array;
    unlink: (path: string) => void;
  };
  _stdout: string[];
  _stderr: string[];
}

export interface WasmModuleFactory {
  (options: {
    wasmBinary: ArrayBuffer;
    print: (text: string) => void;
    printErr: (text: string) => void;
    noInitialRun: true;
  }): Promise<EmscriptenModule>;
}
