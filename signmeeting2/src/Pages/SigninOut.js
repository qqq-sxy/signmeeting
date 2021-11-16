import React,{Fragment} from 'react'

import {Link,Route,HashRouter as Router} from 'react-router-dom'


import Signin from '../Components/Signin'
import Signout from '../Components/Signout'
import EmailLogin from '../Components/EmailLogin'
import logo from '../Photos/logo.jpeg'

import '../Styles/global.css'
import '../Styles/SigninOut.css'

const SigninOut = () => (
    <Fragment>
      <Router>
        <div className='SigninOut'>
                <div className='SigninOut-left'>
                    <img src={logo} alt='logo'></img>
                    <Link to='/Signin'><span className='littleLogin'>登录</span></Link>
                    <Link to='/Signout'><span className='littleRegister'>注册</span></Link>
                </div>
                
                <div className='SigninOut-right'>
                    {/* 保证一进首页还有登录的页面 */}
                    <Route path='/'  exact component={Signin}></Route>
                    <Route path='/Signin'  component={Signin}></Route>
                    <Route path='/Signout' component={Signout}></Route>
                    <Route path='/EmailLogin' component={EmailLogin}></Route>

                </div>
        </div>
      </Router>
    </Fragment>
)


export default SigninOut