// 注册-登录-接口
const router = require('koa-router')() // 实例化 new 路由
// 统一给前端返回的 body 响应
const result = require('../../config/class/result.js')
// 引入校验
const regcheck = require('../../config/checking/regcheck.js')
// 操作数据库的接口
const { getToken, Addurl, Tripurl } = require('../../config/datebase/datebaseapi.js')
// 生成 token
const { gentoken } = require('../../token/jwt.js')

// 注册接口
router.post('/register', async ctx => {
	// post 提交的值在：ctx.request.body
	let { account, password } = ctx.request.body
	// 1:校验前端传来的值是否合法
	new regcheck(ctx, account, password).Start()
	// 2:查询手机号码是否已经注册
	/*
		微信云开发
		db 数据库
		collection 数据库集合引用
		where 查询数据
	 */
	const query = `
		db.collection('business-acc').where({account:'${account}'}).get()
	`
	try {
		const user = await new getToken().posteve(Tripurl, query)
		if (user.data.length > 0) {
			// 已经注册过了
			new result(ctx, '已经注册过', 202).answer()
		} else {
			// 没有注册过
			// 数据：[账号， 密码， uid: 商家唯一标识]
			// 生成商家唯一标识 uid
			const uid = JSON.stringify(new Date().getTime())
			const OBJ = JSON.stringify({ account, password, uid })
			// 3.添加账号数据
			/*
				微信云开发
				db 数据库
				collection 数据库集合引用
				add 添加数据
			 */
			const addquery = `
				db.collection('business-acc').add({
					data: ${OBJ}
				})
			`
			const res = await new getToken().posteve(Addurl, addquery)
			new result(ctx, '注册成功').answer()
		}
	} catch (e) {
		new result(ctx, '注册失败,服务器发生错误', 500).answer()
	}
})

router.post('/login', async ctx => {
	// post 提交的值在：ctx.request.body
	let { account, password } = ctx.request.body
	// 1:查询账号信息
	/*
		微信云开发
		db 数据库
		collection 数据库集合引用
		where 查询数据
	 */
	const query = `
		db.collection('business-acc').where({account:'${account}', password: '${password}'}).get()
	`
	try {
		const user = await new getToken().posteve(Tripurl, query)
		if (user.data.length === 0) {
			// 没有注册过
			new result(ctx, '账号或者密码错误', 202).answer()
		} else {
			// 2:获取 uid 生成 token
			const uid = JSON.parse(user.data[0]).uid
			const token = gentoken(uid)
			console.log(token)
			new result(ctx, '登录成功', 200, { token }).answer()
		}
	} catch (e) {
		new result(ctx, '登录失败,服务器发生错误', 500).answer()
	}
})
module.exports = router.routes()