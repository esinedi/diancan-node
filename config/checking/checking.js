const result = require('../class/handle.js')

// 公用参数校验
class checking {
	constructor (ctx, ...obj) { // ... obj 接收不固定的参数
		this.ctx = ctx
		this.obj = obj // 接收一个数组字符串 ['1', '2']
	}
	
	// 校验前端传来的值为 undefinded
	Errunder () {
		let bvc = this.obj.indexOf(undefined)
		if (bvc !== -1) {
			/* 
				throw 作用
				1，有 catch 会执行在 catch
				2，阻碍代码向下运行
			 */
			throw new result('参数填写错误', 400)
		}
	}
	
	/* 
		校验手机号码格式
		msg: 错误信息
		num: 校验数组的第 num 个参数
	 */
	Phone (msg, num) {
		let phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
		if (!phone.test(this.obj[num])) {
			throw new result(msg, 202)
		}
	}
	
	/*
		校验密码格式
		msg: 错误信息
		num: 校验数组的第 num 个参数
	 */
	Password (msg, num) {
		let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
		if (!password.test(this.obj[num])) {
			throw new result(msg, 202)
		}
	}
}

module.exports = { checking }