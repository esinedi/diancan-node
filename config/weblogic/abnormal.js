// 自定义的全局异常处理中间件
const result = require('../class/handle.js')

const abnormal = async (ctx, next) => {
	try {
		await next() // 等待到下一步
	} catch (err) {
		const isresult = err instanceof result
		if (isresult) {
			// 得到一个已知错误
			ctx.body = {
				msg: err.msg
			}
			ctx.status = err.code
		} else {
			// 未知错误
			ctx.body = {
				msg: '服务器发生错误'
			}
			ctx.status = 500
		}
	}
}

module.exports = abnormal