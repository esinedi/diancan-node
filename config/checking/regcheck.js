const { checking } = require('./checking.js')

// 子类：注册校验账号信息
class regcheck extends checking {
	Start () {
		super.Errunder()
		super.Phone('请填写正常的手机号码', 0)
		super.Password('密码必须为6-20位数字和字母的组合', 1)
	}
}

module.exports = regcheck