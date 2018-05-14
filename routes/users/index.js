var express = require('express');
var router = express.Router();
let { select } = require('../../mysql')
router.post('/login', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    let { user_name, user_password } = req.body;
    const userP = /^[a-zA-Z0-9_-]{4,16}$/;
    const pwdP = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!userP.test(user_name) || !pwdP.test(user_password)) {
        res.json({ msg: '用户名或密码格式不正确,请重新输入', status: 'err' })
    } else {
        select('select user_name,user_password from users where user_name=?', [user_name]).then((info) => {

            if (info.rows.length === 0) {
                res.json({ msg: '该用户不存在', status: 'no' })
            } else if (info.rows[0].user_password === user_password) {
                res.json({ msg: '登陆成功', status: 'ok' })
            } else {
                res.json({ msg: '密码错误', status: 'err' })
            }
        }, (info) => {
            res.json(info);
        })
    }
})
module.exports = router;
