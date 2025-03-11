import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        vue(),
        viteCompression(),
        //按需加载antd
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                }),
            ],
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            // 指定symbolld格式
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                charset: false,
                javascriptEnabled: true,
            },
        },
    },
    server: {
        port: 8080,
        host: 'localhost',
        open: true,
        https: false,
        proxy: {
            '/api': {
                target: 'https://album.jing-shi.net/api',
                // target: 'http://192.168.1.34:8001/api',
                // target: 'https://942qufn14569.vicp.fun/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
