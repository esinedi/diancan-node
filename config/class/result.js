// 统一给前端返回的 body 响应类
class result {
	constructor (ctx, msg='SUCCESS', code=200, data=null, extra=null) {
		this.ctx = ctx
		this.msg = msg
		this.code = code
		this.data = data
		this.extra = extra
	}
	// 统一返回 json 格式
	answer () {
		this.ctx.body = {
			msg: this.msg,
			data: this.data,
			extra: this.extra // 额外数据不是必填的
		}
	}
}

module.exports = result