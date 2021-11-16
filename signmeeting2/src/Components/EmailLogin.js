import axios from 'axios'
import React,{useState,Fragment} from 'react'
import '../Styles/EmailLogin.css'
const EmailLogin = () => {
    const [state,setState] = useState({
        qqEmail:'',
        veCode:'',
        newPassword:''
    })
    //密码修改成功后用于跳转到登录页面
    const tiaozhuan = (a) => {
        if(a === '密码修改成功!'){
            window.location.href="http://localhost:3000"
        }
        else {
            alert(a)
        }
    }
    const SendCode = () => {
        var data2 = {
            qqEmail:state.qqEmail,
            veCode:state.veCode,
            newPassword:state.newPassword
        }
        axios.post('http://localhost:3000/EmailLogin',
            //get请求使用不了 JSON.stringify,会报错
            {data2 : JSON.stringify(data2)},
            {headers:{'Content-Type' : 'application/json'}})
            .then((res) =>{tiaozhuan(res.data);})
            .catch((err) => {console.log(err);})
    }

    //发送邮箱
    const getCode = () => {
        // console.log("HEllo ");
        // console.log(state.qqEmail);
        // var data3 = {
        //     qqEmail:state.qqEmail
        // }
       
        
        
            axios({
                url:'http://localhost:4000/EmailLogin',
                method:'get',
                params:{
                    'email' :state.qqEmail
                }
            })
            .then((res) => {alert(res.data)})
            .catch((err) => {console.log(err);})
        }

    function Panduan(qqEmail,veCode,newPassword) {
        if(qqEmail === '') {
            alert('邮箱为空!')
        }
        else if (!(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(qqEmail))) {
            alert('请输入正确的邮箱!')
        }
        else if(veCode === '')
            alert('验证码未填写!')

        else if(newPassword === '')
            alert('新密码未填写!')

        //将来用于判断验证码是否正确

        else {
            SendCode();
        }
    }
    
    const Submit1 = () => {
        Panduan(state.qqEmail,state.veCode,state.newPassword)
    }

    return (
        <Fragment>
            <h3>忘记密码？</h3>
           <form onSubmit={(event) => {event.preventDefault();}}>
            <ul className="Email">
                    <li><input type  = "text" placeholder='注册时QQ邮箱' value={state.qqEmail} onChange={e => setState({...state,qqEmail:e.target.value})}></input></li>
                    <li><input  type  = "text" placeholder='验证码' value={state.veCode} onChange={e => setState({...state,veCode:e.target.value})}></input><span className="getcode" onClick={getCode}>获取验证码</span></li>
                    <li><input  type  = "password" placeholder='新密码' value={state.newPassword} onChange={e => setState({...state,newPassword:e.target.value})}></input></li>
                    {/* <li><input  type  = "password" placeholder='再次输入新密码' value={state.twonewPassword} onChange={e => setState({...state,twonewPassword:e.target.value})}></input></li> */}

            </ul>
            <input  className="EmailLogin-input" type='submit' value = '提交' onClick = {Submit1}></input>
           </form>

        </Fragment>
    )
}


export default EmailLogin 