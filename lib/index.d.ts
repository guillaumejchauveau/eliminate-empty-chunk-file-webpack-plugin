import { Plugin } from 'webpack'

declare namespace EliminateEmptyChunkFilePlugin {
  interface Options {
    scriptPattern?: RegExp
  }
}

export default class EliminateEmptyChunkFilePlugin extends Plugin {
  constructor (options?: EliminateEmptyChunkFilePlugin.Options)
}
