import rimraf from 'rimraf'
import test from 'ava'
import webpack from 'webpack'
import EliminateEmptyChunkFilePlugin from '../'
import fs from 'fs'

const webpackConfig = {
  target: 'web',
  mode: 'production',
  entry: {
    app: ['./test/fixtures/index.html']
  },
  output: {
    path: __dirname + '/tmp',
    filename: '[name].js',
    publicPath: '../'
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
    new EliminateEmptyChunkFilePlugin()
  ]
}

test.afterEach.always('clear tmp', t => {
  rimraf.sync('test/tmp')
})

test.serial.cb('it should delete app.js', t => {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      t.fail(err || stats.compilation.errors)
    }

    t.false(fs.existsSync('test/tmp/app.js'))
    t.end()
  })
})

test.serial.cb('it should not delete app.js', t => {
  webpackConfig.entry.app.push('./test/fixtures/a.js')
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      t.fail(err || stats.compilation.errors)
    }

    t.true(fs.existsSync('test/tmp/app.js'))
    t.end()
  })
})
