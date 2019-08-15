import { Plugin } from 'webpack'

export = EliminateEmptyChunkFilePlugin;

declare class EliminateEmptyChunkFilePlugin extends Plugin {
  constructor (options?: EliminateEmptyChunkFilePlugin.Options);
}

declare namespace EliminateEmptyChunkFilePlugin {
  interface Options {
    scriptPattern?: RegExp
  }
}
