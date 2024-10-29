import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'

// const url = '192.168.2.108:9999' // lyf
// const url = '111.46.57.216:64000'
const url = '111.46.57.216:64008/api'

export default ({ mode, command }) => {
	const env = loadEnv(mode, process.cwd())
	const { VITE_APP_BASE } = env
	return defineConfig({
		base: VITE_APP_BASE,
		server: {
			// host: url,
			hmr: true,
			port: 8080,
			open: true,
			proxy: {
				'/api': {
					target: `http://${url}`,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '')
				}
			}
		},
		plugins: [
			vue(),
			VueSetupExtend(),
			// AutoImport({
			// 	resolvers: [ElementPlusResolver()]
			// }),
			// Components({
			// 	resolvers: [ElementPlusResolver()]
			// })
		],
		optimizeDeps: {
			// include: ['schart.js']
		},
		resolve: {
			alias: {
				'~': resolve(__dirname, './'),
				"@": resolve(__dirname, "./src"),
				"components": resolve(__dirname, "./src/components"),
				"styles": resolve(__dirname, "./src/styles"),
				"utils": resolve(__dirname, "./src/utils"),
			}
		},
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
		},
	})
}



