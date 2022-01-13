import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'main', // 起个名字，安装、引入用
      fileName: (format) =>`main.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      plugins: [
        resolve(), 
        babel({ 
          babelrc: false,
          babelHelpers: 'bundled',
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: 11,
                  browsers: 'last 2 versions'
                },
                useBuiltIns: 'usage',
                corejs: 2
              }
            ]
          ],
        }
      )]
    }
  }
})
