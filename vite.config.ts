import path from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'
import configCompressPlugin from './config/plugin/compress'
import configVisualizerPlugin from './config/plugin/visualizer'

export default ({ mode }: ConfigEnv): UserConfig => {
  // eslint-disable-next-line node/prefer-global/process
  const root = process.cwd()

  const { VITE_BASE_URL } = loadEnv(mode, root)

  return defineConfig({
    base: '/',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [UnoCSS(), react(), configCompressPlugin('gzip'), configVisualizerPlugin(mode)],

    server: {
      host: true,
      proxy: {
        '/api/': {
          target: VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },

    esbuild: {
      pure: ['console.log'],
      drop: ['debugger'],
    },

    build: {
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
    },
  })
}
