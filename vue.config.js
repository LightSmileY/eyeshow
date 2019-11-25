module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'eyemakeup',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://eyetouch-seentao.e2d1f38a-d663-43e3-b62e-3eb86df16574.dev.app.yyuap.com/eyetouch-seentao-be',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
        before: app => { }
    }
}