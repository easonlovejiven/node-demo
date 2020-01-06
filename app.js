var mysql = require("mysql");
var express = require('express');
var fs = require("fs")
var app = express()
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "uniqueway_hera",
    socketPath: '/tmp/mysql.sock'
})

connection.connect();

app.get("/users", function (req, res) {
    var page = parseInt(req.query.page)
    var page_s = (page - 1) * 16
    var sql = `select * from users limit ${page_s},16`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            res.end(err)
        }
    })
})
// 注册的用户信息
app.all("/user_register", function (req, res) {
    req.on("data", function (sa) {
        var post_shuju = ""
        var vip_s = JSON.parse(post_shuju += sa)
        console.log(vip_s.email)
        var register_sql = `select * from users where name='${vip_s.name}' and email='${vip_s.email}';`
        connection.query(register_sql, function (err, result) {
            if (err) {
                console.log(err)
            } else if (result.length == 0) {
                console.log("123")
                var register_sqls = `insert into users set name='${vip_s.name}',password='${vip_s.password}',email='${vip_s.email}';`
                connection.query(register_sqls, function (err_s, result_s) {
                    res.send("注册成功")
                    res.end(err_s)
                })
            } else {
                console.log("456")
                res.send("该用户名或邮箱已被注册")
                res.end(err)
            }
        })
    })
})
// 用户的登录信息
app.all("/user_login", function (req, res) {
    req.on("data", function (data_s) {
        var par=JSON.parse(data_s)
        console.log(par)
        var login = `select * from users where name='${par.name}' and password='${par.password}';`
        console.log(login)
        connection.query(login, function (err, result) {
            if (err) {
                console.log(err)
            }else{
                console.log(result)
                res.send(result)
                res.end(err)
            }
        })
    })
})

// 首页
app.get("/", function (req, res) {
  var cookie_s=req.headers.cookie
  if(cookie_s){
    fs.readFile("./html/home.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data)
    })
  }else{
    res.redirect('/login')
  }
})

// css
app.get("/css", function (req, res) {
    fs.readFile("./css/01.css", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data)
    })
})

// js
//axios 
app.get("/axios", function (req, res) {
    fs.readFile("./js/axios.js", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        res.end(data)
    })
})

// jquery
app.get("/jquery", function (req, res) {
    fs.readFile("./js/jquery-1.12.1.js", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        res.end(data)
    })
})

// 注册页面
app.get("/register", function (req, res) {
    fs.readFile("./html/register.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data)
    })
})

app.get("/login", function (req, res) {
    fs.readFile("./html/login.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data)
    })
})

app.listen('8000', function () {
    console.log("第一个node起来了")
})