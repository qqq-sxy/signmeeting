import React,{useState,Fragment} from 'react'
import axios from 'axios'



import '../Styles/Signout.css'

const Signout = () => {
    const [state,setState] = useState({    
        username :'',
        password :'',
        twoPassword:'',
        email :'',
        tep:'',
        zclass : ''
    })

    function Logoutout(a) {
        if (a==='注册成功!') {
              window.location.href="http://localhost:3000/"
        }
  }
    //  // 从后台获取数据
    //  const getData = () => {
    //     //console.log(state.zclass);
        
      
    //     axios.get('http://localhost:8080/Signout')
    //       .then((res) => {console.log(res)}
    //       )
    // }

    //向后台发送数据
    const postData = () => {
        var data = {
            username:state.username,
            password:state.password,
            email:state.email,
            tep:state.tep,
            zclass:state.zclass

        }
        // console.log(data);
        axios.post('http://localhost:4000/Signout',
            {data:JSON.stringify(data)},
            {headers : {'Content-Type':'application/json'}})  //如果不加这个请求头，就会显示该端口没有服务
                .then((res) => {
                    Logoutout(res.data);})//从后台返回数据
                .catch((err) => {
                    console.log(err);
            })
        
    }

    //判断手机号
    function SignoutOpera(zclass,username,tep,email,password,twoPassword) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
           
        if (username === '')
            alert('请输入用户名！');
        else if (password === '') 
            alert('请输入密码！')
        else if(password !== twoPassword)
            alert('输入两次密码不一样！')
        else if (!myreg.test(tep)) {
            alert('请输入正确的手机号！');
        }
        else if (email === '') 
            alert('请输入邮箱！') 
        else if (!(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
            alert('请输入正确的邮箱！')
        }
        else if (tep === '') 
            alert('请输入手机号！')
        else if (zclass === '')
            alert('请输入专业班级！');
        else {
            // getData();
            postData();
        }
            
    }

   
    const submit = () => {
    //     SignoutOpera(state.zclass,state.user,state.tep,state.email,state.password,state.twoPassword)
    // },[state]
        SignoutOpera(state.zclass,state.username,state.tep,state.email,state.password,state.twoPassword)
}


    return (
        <Fragment>
        <div className='Signout-body'>
                <h3>欢迎注册</h3>
                <form onSubmit={(event) => {
                    event.preventDefault();
                }}>
                     <ul>                        
                         
 
                         {/* <li>
                              必须加label 否则会出现问题 
                             <label><input type='radio' name='sex' value='男' checked='checked'/> 男</label>
                             <label><input type='radio' name='sex' value='女'/> 女</label>
                         </li> */}
                         
                         
                         <li><input type="text" value={state.username} placeholder='用户名'
                         onChange ={(event) => setState({...state,username:event.target.value})}>
                         </input></li>
 
                         <li><input type="password" value={state.password} placeholder='密码'
                         onChange ={(event) => setState({...state,password:event.target.value})}>
                         </input></li>

                         <li><input type="password" value={state.twoPassword} placeholder='再次输入密码'
                         onChange ={(event) => setState({...state,twoPassword:event.target.value})}>
                         </input></li>

                         <li><input type="text" value={state.email} placeholder='Email'
                         onChange ={(event) => setState({...state,email:event.target.value})}>
                         </input></li>
 
                         <li><input type="text" value={state.tep} placeholder='手机号'
                         onChange ={(event) => setState({...state,tep:event.target.value})}>
                         </input></li> 
  

                         <li><input type='text' value={state.zclass} placeholder='专业班级'
                         onChange ={(event) => setState({...state,zclass:event.target.value})}>
                         </input></li>
                     </ul>
                     <input className='Signout-input' type='submit' value='注册' onClick = {() =>{
                         submit();
                         
                     }}></input>
                </form> 
            </div>
     </Fragment>
    )

}

export default Signout










