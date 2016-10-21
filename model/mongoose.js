var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blog");


mongoose.connection.on("error", function(error) {
	console.log("数据库连接失败：" + error);
});

module.exports = mongoose;