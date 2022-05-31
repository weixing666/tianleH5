import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
    plugins: [createVuePlugin()],
    // 代理跨域请求
    server: {
        // 如 /myapi/users 会被转发 http://localhost:4000/users  , 开发情况下一般会设置很多个
        proxy: {
            '/myapi': {
                target: 'http://localhost:3001/', // 代理域名地址
                changeOrigin: true, // true 保留请求源头 请求头：Referer
                rewrite: (path) => path.replace(/^\/myapi/, '') // 重写url路径
            },
        }
    },
    // 配置别名 
    resolve: {
        // 设置路径别名
        alias: {
            '@': '/src',
            '@api': '/src/api'
        },
        // 忽略后缀，不建议忽略.vue
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    // 针对生产环境（线上环境）
    build: {
        minify: "terser",
        terserOptions: {
            // 去除console和debugg
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        },
        rollupOptions: {
            // 把js css vue 文件打包后分开文件夹装
            // output: {
            //     chunkFileNames: 'static/js/[name]-[hash].js',
            //     entryFileNames: 'static/js/[name]-[hash].js',
            //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            // }
            output: {
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                // chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                    const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                    return `js/${fileName}/[name].[hash].js`;
                },
                // 超大静态资源拆分
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
        // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的 http 请求。 设置为 0 可以完全禁用此项。 默认4096 (4kb)
        // 阈值不要设置太大，太大解码很耗性能
    },
    assetsInlineLimit: 4096 * 2, // 8kb
    // 配置cdn加速
    rollupOptions: {
        external: ["axios", "moment"],
        plugins: [
            commonjs(),
            externalGlobals({
                axios: "axios",
                moment: "moment",
            }),
        ],

    },

})