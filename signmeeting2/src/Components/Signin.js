import axios from 'axios'
import React,{useState,Fragment} from 'react'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'

import '../Styles/Signin.css'




const Signin = () => {

      const [state,setState] = useState({
            username:'',
            password:''
      })

      function Loginin(a,b) {
            if (a==='登录成功!') {
                  // TODO
                  window.location.href="http://localhost:3000/Index"
            }
            else if(b==="密码错误!"){
                  alert('密码错误!')
            }
            else{
                  alert(a)
            }
      }

      //将token保存到cookies  并且   定时删除
      const deleteTimeCookie = (a) => {
            //定义cookies在一小时后自动失效
            let deleteTime = new Date(new Date().getTime() +1000*60*60)
            cookie.save('userInfo',a,{ expires: deleteTime },{path:'/'})
      }

      //向后台发送数据
      const POSTdata = () => {
            var data1 = {
                  username:state.username,
                  password:state.password
            }

            axios.post('http://localhost:4000/Signin',
                  {data1:JSON.stringify(data1)},
                  {headers:{'Content-Type' : 'application/json'}})
                        .then((res) => {Loginin(res.data.a,res.data);
                              // cookie.save('userInfo',res.data.b.token,{path:'/'});
                              deleteTimeCookie(res.data.b.token);
                  })
                        .catch((err) => {console.log(err);})
            
                        // console.log(cookie.load('userInfo'));
                    
                        
      }


      function SigninOpera(username,password) {

            if (username === '')
              alert('请输入用户名！')
            else if (password === '')
              alert('请输入密码！')
            else 
              POSTdata();
        }
      
      const submit = () => {SigninOpera(state.username,state.password)}
      //       SigninOpera(state.username,state.password);
      // }, [state]);
      
     
      // //焦点聚焦input框value自动清零
      // const clear_input_values1 = (event) => {
      //   setState({...state,user:''})
      // }
      // const clear_input_values2 = (event) => {
      //   setState({...state,password:''})
      // }
      

      return (
                <Fragment>
                        <div className='Signin-body'>
                            <h3>欢迎登录</h3>  
                            <form onSubmit={(event) => {event.preventDefault();}}>
                                <ul>                                
                                  <li><input type="text" value={state.username} placeholder='用户名'                                 
                                  onChange={event => setState({...state,username:event.target.value})}>
                                  </input></li>
                                  <li><input type="password" value={state.password} placeholder='密码'
                                  onChange={event => setState({...state,password:event.target.value})}>
                                  </input></li>
                               </ul>
                               <input className='Signin-input' type='submit' value = '登录' onClick = {(event) => {submit()}}></input>
                          </form>
                         <Link to = "/EmailLogin"><span> 忘记密码？</span></Link>
                        </div>      
                                  
                </Fragment>
              )
}
export default Signin