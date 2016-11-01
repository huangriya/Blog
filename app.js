var express = require('express'),
	http = require('http'),
	app = express();

app.use(express.static('static')); //设置静态资源目录
app.set('views', './view'); //设置模板目录
app.set('view engine', 'ejs'); //设置模板引擎名称


// 引入word模块路由
var word = require('./routes/word');
word(app);

// 监听一个端口号启动服务
app.listen(1688, function() {
	console.log("提交成功");
	console.log("启动成功");
});