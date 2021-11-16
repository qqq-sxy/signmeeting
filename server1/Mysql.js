//连接数据库
var   mysql = require('mysql');//引入mysql 模块

var mysql_user = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'project1'
};

var connection = mysql.createConnection(mysql_user,{multipleStatements: true});
//multipleStatements: true  此功能打开可同时使用多条  查询语句




module.exports = {
    connection
};


