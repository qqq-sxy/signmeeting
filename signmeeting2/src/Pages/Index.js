import {Fragment,useState} from 'react'
import {Link,Route,HashRouter as Router} from 'react-router-dom'

//引入粒子背景库
import Placeholder from "particles-bg"

import '../Styles/global.css'
import '../Styles/Index.css'

// import SigninOut from './SigninOut'
import Meeting from './Meeting'
import LocationCheckIn from './LocationCheckIn'


function Index() {
    const [colorBorder,setColorBorder] = useState({color2:'#00aced',border2:'',color1:'#c32f10',border1:'0.2rem solid #c32f10'})

    const changeColor1 = (e) => {
        
        // setColorBorder(ccc? {colorBorder.color:"#00aced",colorBorder.border:''} : {color:'#c32f10',border:'0.2rem solid #c32f10'});
        setColorBorder({...colorBorder,color1:'#c32f10',border1:'0.2rem solid #c32f10',color2:'#00aced',border2:''})
      };

    const changeColor2 = (e) => {
        
        // setColorBorder(ccc? {colorBorder.color:"#00aced",colorBorder.border:''} : {color:'#c32f10',border:'0.2rem solid #c32f10'});
        setColorBorder({...colorBorder,color1:'#00aced',border1:'',color2:'#c32f10',border2:'0.2rem solid #c32f10'})
      };

    return (
        <Fragment>
           <Router>
                <Placeholder type="polygon" bg={true}></Placeholder>
                <div className="Index-top">
                    <Link to='/Index/Meeting' onClick={changeColor1}><span className="Index-top-span1" style={{color:colorBorder.color1,borderBottom:colorBorder.border1}}>会议预订</span></Link>
                    <Link to='/Index/LocationCheckIn' onClick={changeColor2}><span className="Index-top-span2" style={{color:colorBorder.color2,borderBottom:colorBorder.border2}}>签到系统</span></Link>
                </div>

                <div className="Index-bottom">
                    {/* <Route path='/' component = {SigninOut}></Route> */}
                    <Route path='/Index' exact component = {Meeting}></Route>
                    <Route path='/Index/Meeting' component = {Meeting}></Route>
                    <Route path='/Index/LocationCheckIn' component = {LocationCheckIn}></Route>
                </div>

           </Router>
        </Fragment>
        
   
    )
}

export default Index