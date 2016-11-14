var model	= require('../model/wordSchema');
var cheerio = require('cheerio');

module.exports = function(app) {

	// 首页查询所有数据
	app.get('/', function(req, res) {
		// 获取浏览器url Page参数值
		var queryPage = req.query.page;

		// 如果page存在或者小于1 就让page等于一
		if (!queryPage || queryPage < 1) queryPage = 1;

		//获取从多少条数据开始
		var number = (queryPage - 1) * 30;

		// 返回文档总条数
		model.count({}, function(err, count) {
			// count：总条数
			if (err) {
				console.log('查询总条数:' + err);
				return;
			}
			// 查询当前页数据
			// sort: 排序
			// time: 根据time字段排序 -1 倒叙
			model.find({}, null, {sort: {time: -1}}, function(err, docs) {
				if (err) {
					console.log('查询内容:' + err);
					return;
				}
				var docs = docs;

				// 轮训获取文本的第一个段落与第一张图片
				var img = '';
				for (var i = 0; i < docs.length; i++) {
					var $ = cheerio.load(docs[i].word);
					$('img').length > 0 ? img = '<div><img src="'+ $('img').eq(0).attr('src') +'"/></div>' : img = '';
					docs[i].word = '<p>' + $('p').eq(0).html() + '</p>' + img ;
				}
				res.json({
					code: 0,
					data: docs,
					page: queryPage - 0,
					number: 30,
					PageCount: count
				})
			// skip: 起始条数，从number条往后30条
			// limit: 往后第多少条
			}).skip(number).limit(30);
		})
	})

	// 添加文档
	app.get('/word/add', function(req, res) {
		var data = {
			title: 'bbbbbbbbbbbbbbbbbbb',
			word: '<p>111111111111111</p><p>222222222222</p><p>3333333333333333</p><img src="www.baidu.com"/>'
		}
		model.create(data, function(err, docs) {
			if (err) {
				res.send(err);
			} else {
				res.json({code: '0', data: [data]});
			}
		})
	})
}