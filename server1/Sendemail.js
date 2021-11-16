const nodemailer = require("nodemailer")  
//创建一个smtp的服务器
const config = {
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '3469998737@qq.com', //注册的邮箱账号
        pass: 'vfzqjgophzuzdaei' //邮箱的授权码
    }
};
//创建一个SMPT客户端对象
const transporter = nodemailer.createTransport(config);


//发送邮件
module.exports = function  nodemail(mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};






























