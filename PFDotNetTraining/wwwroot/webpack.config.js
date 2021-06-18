const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const path = require('path');
const glob = require('glob');
const sass = require('sass');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const getEntries = function () {
    return glob
        .sync(
            './src/{scripts/pages,styles/pages}/**/!(_)*.{scss,js,ts,tsx}',
        )
        .reduce((entries, entry) => {
            const key = entry
                .split('/')
                .pop()
                .replace(/.scss|.js|.ts|.tsx/gi, '');
            let localEntries = { ...entries };
            if (key in entries) {
                localEntries[key].push(entry);
            } else {
                localEntries = Object.assign(entries, { [key]: [entry] });
            }
            return localEntries;
        }, {});
};

const commonConfig = {
    entry: getEntries(),
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    stats: {
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: true,
        chunkOrigins: false,
        chunkModules: false,
        entrypoints: false,
        colors: true,
        env: true,
        modules: false,
        reasons: false,
        warnings: true,
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[name].bundle.js?ver=[chunkhash]',
        path: path.join(__dirname, '/dist/'),
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './../fonts',
                            useRelativePath: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.*fonts.*\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new LiveReloadPlugin({
            protocol: 'http',
        }),
        new NyanProgressPlugin(),
    ],
};

module.exports = commonConfig;