const jwt = require('jsonwebtoken')
const { security } = require('./tokentime.js')

// 配置 token 加密生成
function gentoken (uid, secop=2) {
	const secretkey = security.secretkey
	const expiresIn = security.expiresIn
	/* 
		值1：参与加密的对象
		值2：参与加密的值
		值3：加密的时间
	 */
	const token = jwt.sign({uid, secop}, secretkey, {expiresIn})
	return token
}

module.exports = { gentoken }
