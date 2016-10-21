var model = require('../model/wordSchema');

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
				console.log(err);
			} else {
				// 如果总条数大于0，继续执行
				if (count > 0) {
					// 查询当前页数据
					// sort: 排序
					// time: 根据time字段排序 -1 倒叙
					model.find({}, {sort: {time: -1}}, function(err, docs) {
						if (err) {
							// 查询内容出错控制台输出
							console.log('查询内容:' + err)
						} else {
							res.render('index', {
								code: 0,
								data: docs,
								page: queryPage - 0,
								number: 30,
								PageCount: count
							})
						}
					// skip: 起始条数，从number条往后30条
					// limit: 往后第多少条
					}).skip(number).limit(30);
				} else {
					// 总条数小于0，直接返回空数据
					res.json({
						code: -10,
						msg: '没有查询到任何数据'
					})
				}
			}
		})
	})

	app.post('/word/add', function(req, res) {

	})
}