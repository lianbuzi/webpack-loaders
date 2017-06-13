 var path=require('path');
 
 var webpack = require('webpack');
 var htmlWebpackPlugin=require('html-webpack-plugin');
 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 var autoprefixer = require('autoprefixer');
 var UglifyJsPlugin=require('uglify-js-plugin');
 var SpritesmithPlugin=require('webpack-spritesmith')
 var loaders=[

 {
 	loader:'css-loader',
 	options:{
 		modules:true,
 		 minimize: true ,//css压缩
 		  sourceMap: true


 	
 	}
 },
 {
 	loader:'postcss-loader',
 	options: {
 	 
 		plugins: function(loader){
 			return [require('autoprefixer')()]
 		} 
} 


}
]
module.exports={
	context:__dirname,	
	entry:{
		script:'./src/app.js'
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'js/[name]-bundle.js'
	},
	module:{
		loaders:[

		{
			test:/\.js$/,
			loader:'babel-loader',
			query:{
				presets:['latest']
			},
			exclude:path.resolve(__dirname,'node_modules'),
			include:path.resolve(__dirname,'src')

		},
		{
			test:/\.html$/,
			loader:'html-loader'
		},
		{
			test:/\.ejs$/,
			loader:'ejs-loader'
		},	
		{
			test:/\.css$/,
			loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use:loaders })

		},
		{test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},

		{
			test:/\.(jpg|png|gif|svg)$/i,
			loaders:['url-loader?limit=10000&name=assets/[name]-[hash:2].[ext]',
			'image-webpack-loader']

		}
		]


	},
	devtool: "source-map",
	plugins:[
	new htmlWebpackPlugin({
		filename:'index.html',
		template:'index.html',
		inject:'body'
	}),
	new ExtractTextPlugin({
		filename:"./css/[name].css", 
		allChunks: false
	}),
	 new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './src/assets/sprite'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './dist/sprites/sprite.png'),
                css: path.resolve(__dirname, './dist/sprites/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
   
	]
}