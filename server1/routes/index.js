var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




const {connection} = require('../Mysql')

const jwt = require('jsonwebtoken'); //引入token验证


const bodyParser = require('body-parser');//用于解析请求体中的信息

//引入发送邮件
const  nodemail = require('../Sendemail')





// const app = express();


// //设置全局使用
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));


// // 1、设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");// 这里设置允许所有跨域访问
//     res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,set-cookie");//一定要在这里面加上自定义的请求头
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     // res.setHeader('set-cookie')
    
//     next();
// });

//连接数据库
connection.connect((err) => {
    if(err) {
        console.log("数据库连接失败");
    }
    console.log("数据库连接成功");
})





//注册页面
router.post('/Signout',
    function (req, res) {
        const registerData = JSON.parse(req.body.data); // 解析一下JSON格式数据
        if (registerData) {
                // Register(registerData.username,registerData.password,registerData.email,registerData.tep,registerData.zclass)
                //编写查询语句
            var find1 = "SELECT * FROM useinfo WHERE username = '"+registerData.username+"'";
            //'SELECT * FROM useinfo WHERE username = ' + username 写成这种不行   传入中文参数   mysql  中间件识别不了
        //编写添加语句
            var insert = 'INSERT INTO useinfo (id,username,password,email,mobile,zclass) VALUES (0,?,?,?,?,?)';
        //执行sql语句
            connection.query(find1, function(err, result) {
                if (err) {   //链接失败 直接return;
                    console.log('[错误]' + err);
                    return;
                };

                if (result.length) {//如果数据库返回数据 说明账号已存在
                    console.log('账号已存在');
                    res.send('用户名已存在!')
                    return ;
                }
                else {               //否则不存在   可以进行注册
                    var inserInfo = [registerData.username,registerData.password,registerData.email,registerData.tep,registerData.zclass];   //定义插入数据
                    //执行插入数据语句
                    connection.query(insert, inserInfo, function(err, result) {
                        if (err) {   //链接失败 直接return;
                            console.log('[注册错误]' + err);
                            return;
                        };
                        console.log('------------start----------------');
                        console.log('注册成功');
                        console.log(result);
                        console.log('--------------end-----------------');
                        res.send('注册成功!')
                    });
                };
            });
            return;

        }
})


//登录页面
router.post('/Signin',
    function(req,res) {
        const LoginData= JSON.parse(req.body.data1);
        if(LoginData) {
            // Login(LoginData.username,LoginData.password)
            //编写sql查询语句;
	        var find2 = "SELECT * FROM useinfo WHERE username = '"+LoginData.username+"'";
            //执行sql语句
            connection.query(find2, function(err, result) {
                if (err) {   //链接失败 直接return;
                    console.log('[错误]' + err);
                    return;
                };

                if (result.length) {   //如果查到了数据
                    console.log('------------start----------------');
                    var string = JSON.stringify(result);
                    var json = JSON.parse(string)[0];
                    console.log(string)
                    if (json.password == LoginData.password) {
                        console.log('密码校验正确');
                        console.log(result);
                        // res.send('登录成功!')
                        
                        
                        // //token 将用户信息加密
                        const token = jwt.sign(LoginData,'sxy3469998737')
                        res.send({
                            a:'登录成功!',
                            b:{token}
                        }) 
                    }

                    else {
                        console.log('密码校验错误');
                        res.send('密码错误!')
                    } 
                }
                else {
                        console.log('账号不存在')
                        res.send('账号不存在!')

                    return ;
                    }
	        })
        }


    }
)


//邮箱验证页面
router.post('/EmailLogin',
    function (req,res) {
        const EmailLoginData= JSON.parse(req.body.data2);
        // const testTime = new Date().getTime()
        // if(testTime - time>= 5) {
        //     res.send('验证码已过期!')
        // }
        if(EmailLoginData) {
            // let find3 = "SELECT * FROM useinfo WHERE email = '"+EmailLoginData.qqEmail+"'";
            let change1 = "UPDATE useinfo set password = '"+EmailLoginData.newPassword+"' WHERE email =  '"+EmailLoginData.qqEmail+"'";

            if(Initcode === EmailLoginData.veCode) {
                connection.query(change1,function(err,result) {
                        if (err) {   //链接失败 直接return;
                                    console.log('[密码修改错误]' + err);
                                    return;
                                };
                        
                        console.log('------------start----------------');
                        console.log('密码修改成功');
                        console.log(result);
                        console.log('--------------end-----------------');
                        res.send('密码修改成功!');
                }
                )              
            }
            else {
                res.send('验证码错误!')
            }
                
        }   
    }
)


//去掉个async          
router.get('/EmailLogin', function(req,res) { 
    const email = req.query.email;//刚从前台传来的邮箱,get  与  post  接收前台传送的数据方式并不一样
    let find4 = "SELECT * FROM useinfo WHERE email = '"+email+"'" ;


    // time = new Date().getTime()//记录时间
   

        //六位随机数
    const createSixNum = () => {
        var Num = "";
        for(var i = 0; i<6;i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    }

//去掉了个await

    var code =  createSixNum();//这是用来生成随机六位数的
    connection.query(find4,(error,result) => {
        if(result.length) {
            var mail = {
                        //发件人
                        from:'<3469998737@qq.com>',
                        //主题
                        subject:'修改密码',
                        //收件人
                        to:email,
                        //邮件内容，HTML 格式
                        text:'你的验证码为'+code+',有效期为五分钟!'
                    };
                    Initcode = code;
                    nodemail(mail)
                res.send(
                    // code:0,
                    // message:'发送成功'
                    "验证码发送成功!"
                )
        }
        else {
            res.send('该邮箱未注册!')
        }
    })
})




//会议页面
router.post('/Index/Meeting',
function(req,res) {
    const MeetData = JSON.parse(req.body.data4);
    // console.log(req.headers['set-cookie']);
    const token = req.headers['set-cookie'].pop()
    console.log(token);

    // if(token.length > 10) {
    //     console.log(1);
    // }
    // else {
    //     console.log(2);
    // }
    // const {LoginData} = jwt.verify(token,'sxy3469998737')
    // const a = jwt.verify(token,'sxy3469998737')
    // console.log(a);

    if(token.length > 10) {
        const a = jwt.verify(token,'sxy3469998737')

        var find2 = "SELECT * FROM useinfo WHERE username = '"+a.username+"' and password = '"+a.password+"'" 
       
         
        connection.query(find2,(err,result) => {
            if (err) {   //链接失败 直接return;
                console.log('[错误]' + err);
                return;
            };
            if(result.length) {
                if(MeetData !== '删除记录!') {
                    //编写查询语句
                    var find1 = "SELECT * FROM meetbook WHERE meetRoom = '"+MeetData.meetRoom+"' and meetWeek = '"+MeetData.meetWeek+"'" 
                    //插入语 句 
                    var insert = 'INSERT INTO meetbook (id,meetRoom,meetMen,meetWeek,meetStartTime,meetEndTime) VALUES (0,?,?,?,?,?)';
                    var inserInfo = [MeetData.meetRoom,MeetData.meetMen,MeetData.meetWeek,MeetData.meetStartTime,MeetData.meetEndTime];   //定义插入数据
                    //判断会议时间是否冲突
                    var timeConflict = "SELECT * FROM meetbook WHERE (meetStartTime between '"+MeetData.meetStartTime+"' and  '"+MeetData.meetEndTime+"') or (meetEndTime between '"+MeetData.meetStartTime+"' and  '"+MeetData.meetEndTime+"')  or (meetStartTime > '"+MeetData.meetStartTime+"' and meetEndTime <  '"+MeetData.meetEndTime+"') or (meetStartTime < '"+MeetData.meetStartTime+"' and meetEndTime > '"+MeetData.meetEndTime+"')  "
                 
                    //查询
                    connection.query(find1,(err,result) => {
                        if (err) {   //链接失败 直接return;
                            console.log('[错误]' + err);
                            return;
                        };
                        if(result.length) {
                            connection.query(timeConflict,(err,result) => {
                                if (err) {   //链接失败 直接return;
                                    console.log('[判断会议室时间冲突错误错误]' + err);
                                    return;
                                };
                                if(result.length) {
                                    res.send("改时间段已经被预定!")
                                }
                                else {
                                    connection.query(insert,inserInfo,(err,result) => {
                                        if (err) {   //链接失败 直接return;
                                            console.log('[插入数据库错误]' + err);
                                            return;
                                        };
                                        console.log('------------start----------------');
                                        console.log('预订成功');
                                        console.log(result);
                                        console.log('--------------end-----------------');
                                        res.send('预订成功!')
                                    })
                                }
                            })
                        }
                        else {
                            connection.query(insert,inserInfo,(err,result) => {
                                if (err) {   //链接失败 直接return;
                                    console.log('[插入数据库错误]' + err);
                                    return;
                                };
                                console.log('------------start----------------');
                                console.log('预订成功');
                                console.log(result);
                                console.log('--------------end-----------------');
                                res.send('预订成功!')
                            })
                        }
                    })
            
                   
                    
                }
                else {
                        //console.log(MeetData);
                       //删除最后一条数据
                       var delete1 = "DELETE  FROM meetbook WHERE 1 ORDER BY id DESC LIMIT 1"
                       connection.query(delete1,(err,result) => {
                            if (err) {   //链接失败 直接return;
                                console.log('[错误]' + err);
                                return;
                            };
                            

                       })
                }
            }
            else {
                res.send("验证出现错误!")
            }
        })
    }
    else {
        res.send("登录已过期!")
    }
    
  

})
//会议页面  将数据库中的数据展示到前台页面
router.get('/Index/Meeting',function(req,res) {

    const token2 = req.headers['set-cookie'].pop()
    // console.log(token2);

    var user_sql = 'SELECT * FROM meetbook';
    if(token2.length > 10) {
            connection.query(user_sql,function(err,result) {
            if(err) {
                console.log('[查询数据表错误]'+err);
            }
            else {
                // console.log(result);
                res.send({
                    data:result
                })
            }
            
        })
    }
    else {
        res.send('验证已过期!')
        // console.log('jjjjjjjhjj');

    }
   
})

//位置签到页面
router.post('Index/LocationCheckIn',function(req,res) {
    const Location = JSON.parse(req.body.data5);
    res.send("HELLo")
})





module.exports = router;
