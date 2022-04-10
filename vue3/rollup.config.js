import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import tsplugin from 'rollup-plugin-typescript2';

// 绝对路径
const absoPath = (filename) => path.resolve(__dirname, filename);

export default {
    input: absoPath('src/index.ts'),
    output: {
        // 导出
        file: absoPath('dist/Vue.js'),
        format: 'umd', // umd 格式可以在浏览器中运行
        name: 'VueReactivity'
    },
    plugins: [
        commonjs(),
        tsplugin()
    ]
}