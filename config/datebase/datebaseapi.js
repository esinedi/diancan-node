// 增删改查
const axios = require('axios')
const qs = require('querystring')
const result = require('../class/handle.js')

// 拼接 tokenurl 地址
let param = qs.stringify({
	grant_type: 'client_credential',
	appid: 'wxad79c75b3a44647f',
	secret: 'c5d04be6a6419857a25baf7ae84f553a'
})

// 1.获取 token 的地址： 必须要得到 token 才有权限操纵云开发数据库
// https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html
let url = 'https://api.weixin.qq.com/cgi-bin/token?' + param

// 2.获取云环境 id 和数据库操作 url
// 云环境 id
let env = 'cloud1-0gj2evw28d9f9e47'
// 数据库插入记录 url
let Addurl = 'https://api.weixin.qq.com/tcb/databaseadd?access_token='
// 数据库查询记录 url
let Tripurl = 'https://api.weixin.qq.com/tcb/databasequery?access_token='

class getToken {
	constructor () {}
	
	// 获取 token
	async gettoken () {
		try {
			let token = await axios.get(url)
			if (token.status == 200) {
				return token.data.access_token
			} else {
				// 出现 throw 这个关键词，就会进入 catch 里面，并且 throw 给的值会出现在 catch 的参数里
				throw '获取 token 错误'
			}
		} catch (e) {
			throw new result(e, 500)
		}
	}
	/* 
		调用云开发 http api 接口 (增删改查常规接口)
		dataurl: 数据库插入记录 url
		query: 数据库操作语句 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Collection.html
	 */
	async posteve (dataurl, query) {
		try {
			let token = await this.gettoken()
			let data = await axios.post(dataurl + token, {env, query})
			if (data.data.errcode === 0) {
				return data.data
			} else {
				throw '请求出错'
			}
		} catch (e) {
			// 服务器出现错误
			throw new result(e, 500)
		}
	}
}

module.exports = { getToken, Addurl, Tripurl }