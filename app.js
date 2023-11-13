// 引入
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')() // 实例化 new 路由
const cors = require('koa2-cors')
const abnormal = require('./config/weblogic/abnormal.js')

// koa 引用中间件
app.use(cors())
app.use(json())
app.use(bodyparser())
// 全局异常处理
app.use(abnormal)


// 注册-登录
const login = require('./router/login/login.js')

// 配置路由接口
router.use('/api', login)

/* 启动路由 */
app.use(router.routes()).use(router.allowedMethods())

/* 自定义启动端口 4000 */
app.listen(4000)