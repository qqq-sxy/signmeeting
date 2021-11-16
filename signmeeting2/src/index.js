import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter as Router} from 'react-router-dom'





import SigninOut from './Pages/SigninOut'
import Index from './Pages/Index'
import LocationCheckIn from './Pages/LocationCheckIn'
import Meeting from './Pages/Meeting'




ReactDOM.render(
    <Fragment>
      <Router>
        <Route path='/' exact component={SigninOut}></Route>
        <Route path='/Index'  component={Index}></Route>
        <Route path='/LocationCheckIn'  component={LocationCheckIn}></Route>
        <Route path='/Meeting'  component={Meeting}></Route>
      </Router>
    </Fragment>,
    document.getElementById('root')
)