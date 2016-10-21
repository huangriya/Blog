var mongoose = require("./mongoose");

// 创建用户表骨架
var schema = new mongoose.Schema({
	title: String,   //标题
	word: String,      //文字内容
	time: {type: Date, default: Date.now}    //发送时间
})


module.exports = mongoose.model('word', schema);
	
