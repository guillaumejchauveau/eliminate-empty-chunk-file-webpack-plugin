const NormalModule = require('webpack/lib/NormalModule')

class EliminateEmptyChunkFilePlugin {
  constructor (config = {}) {
    this.config = Object.assign(
      {
        scriptPattern: /\.js$/
      },
      config
    )
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tap(
      'EliminateEmptyChunkFilePlugin',
      compilation => {
        for (const chunk of compilation.chunks) {
          let emitDefaultAsset = false
          for (const wModule of chunk.modulesIterable) {
            if (wModule instanceof NormalModule) {
              if (this.config.scriptPattern.test(wModule.userRequest)) {
                emitDefaultAsset = true
              }
            }
          }

          if (!emitDefaultAsset) {
            for (let fileIndex = 0; fileIndex < chunk.files.length;) {
              const assetName = chunk.files[fileIndex]

              if (this.config.scriptPattern.test(assetName)) {
                delete compilation.assets[assetName]
                chunk.files.splice(fileIndex, 1)
              } else {
                fileIndex++
              }
            }
          }
        }
      }
    )
  }
}

module.exports = EliminateEmptyChunkFilePlugin
