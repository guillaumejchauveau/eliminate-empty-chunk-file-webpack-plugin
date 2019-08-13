# Eliminate empty chunk file webpack plugin
This package contains a Webpack plugin that will automatically detect if a chunk of the compilation should emit it's default output file. It looks in each chunk's modules if the user request (the path in the entry configuration or any require-like operation) matches a script pattern (default is ```/\.js$/```). If no modules matches, the plugins iterates over the chunk's files to remove from the compilation any assets matching the script pattern.

The pattern can be configured like so:
```js
// A webpack config example.
{
  target: 'web',
  mode: 'production',
  entry: {
    app: ['./test/fixtures/index.html']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: __dirname,
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader',
            options: {
              publicPath: '../'
            }
          },
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    new EliminateEmptyChunkFilePlugin({ // Optionnal configuration object.
      scriptPattern: /\.m?js$/ // Custom script pattern.
    })
  ]
}
```
