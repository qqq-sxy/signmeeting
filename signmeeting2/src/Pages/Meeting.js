import React,{useState,Fragment} from 'react'
import axios from 'axios'
import cookie from 'react-cookies'



//引入样式
import '../Styles/Meeting.css'

function Meeting() {

    const [state,setState] = useState({
        meetRoom:'大会议室',
        meetMen:'',
        meetWeek:'',
        meetStartTime:'',
        meetEndTime:'',
        list:[]
    })

    const handleMeetRoom = (event) => {
        // console.log(event.target.value);
        setState({...state,meetRoom:event.target.value})

    }

    // const handleMeetWeek = (event) => {
    //     console.log(event.target.value);
    //     setState({...state,meetWeek:event.target.value})

    // }



    // const Book = () => {
    //     setState(
    //         {list:[...state.list,state.meetRoom,state.meetMen,state.meetWeek,state.meetStartTime,state.meetEndTime],meetRoom:'大会议室',meetMen:'',meetWeek:'',meetStartTime:'',meetEndTime:'',}
    //     )
    // }

    //登录时间过期后  自动跳转到登录页面
    const Loginexpired = (s) => {
        if (s === "验证出现错误!" || s === "登录已过期!") {
            window.location.href="http://192.168.230.243:6379"
        }
        else {
            alert(s);
        }
    }

    const Bookdata = () => {
        var data4 = {
              meetRoom:state.meetRoom,
              meetMen:state.meetMen,
              meetWeek:state.meetWeek,
              meetStartTime:state.meetStartTime,
              meetEndTime:state.meetEndTime
        }
        var a= cookie.load('userInfo');
        // console.log(a);
       


        axios.post('http://localhost:4000/Index/Meeting',
            {data4:JSON.stringify(data4)},
            {headers:{'Content-Type' : 'application/json;charset=UTF-8',
                        'set-cookie' : a
                     }
                      
            })
            .then((res) => {Loginexpired(res.data);})
            .catch((err) => {console.log(err);})


    }

    // //取得数据库传来的所有数据
    const getMySQldata = (data,data2) => {

        console.log(data);

        if(data2 === '验证已过期!'){
            window.location.href="http://192.168.230.243:6379"
        }
        else {
            setState({...state,list:data})
            console.log(data);
        }


        // console.log(data)
      
    }



    const renderdata = () => {

        let b = cookie.load('userInfo');

        axios({
            url:'http://localhost:4000/Index/Meeting',
            method:'get',
            headers:{
                'Content-Type' : 'application/json;charset=UTF-8',
                'set-cookie' : b
            }
        })
        .then((res) => {getMySQldata(res.data.data,res.data)})
        .catch((err) => {console.log(err);})

        console.log(cookie.load('userInfo'));

    }



    //判断输入框不能为空
    function inputKong(meetMen,meetWeek,meetSatrtTime,meetEndTime)  {
        if(meetMen === ''){
            alert('请填写预约人!')
        }
        else if (meetWeek === '') {
            alert('请填写星期!')
        }
        else if (meetSatrtTime === '')
            alert('请填写开始时间!')
        else if(meetEndTime === '')
            alert('请填写结束时间!')
        else {
            Bookdata();
        }
    }

    const inputKongBook = () => {
        inputKong(state.meetMen,state.meetWeek,state.meetStartTime,state.meetEndTime)
    }

    //点击删除会议
    const DeleteMeeting = () => {
      
        if(  window.confirm('是否删除刚创建的记录!')) {
                let c = cookie.load('userInfo');

                var data4 = '删除记录!'

                axios.post('http://localhost:4000/Index/Meeting',
                {data4:JSON.stringify(data4)},
                {headers:{'Content-Type' : 'application/json;charset=UTF-8',
                            'set-cookie' : c
                        }
                        
                })
                .then((res) => {alert(res.data);})
                .catch((err) => {console.log(err);})
        }
        else {
            console.log('hhh');
        }
    }

    return(
        <Fragment>
               <form onSubmit={(event) => {event.preventDefault();}}>
                    <ul className="meetRoom">
                        <li>
                                <p>会议室类别：</p>
                                <select  className="Meeting-one-selectOne" value = {state.meetRoom} onChange={handleMeetRoom}>
                                        <option>会议室选择</option>
                                        <option>大会议室</option>
                                        <option>小会议室</option>
                                </select>
                        </li>

                        <li><p>预约人：</p><input type="text"  placeholder='预约人' value={state.meetMen} onChange={event => setState({...state,meetMen:event.target.value})}></input></li>

                        <li>
                            <p>星期：</p>
                            {/* <input type="week"   value={state.meetWeek} onChange={event => setState({...state,meetWeek:event.target.value})}></input> */}

                            <select  className="Meeting-one-selectOne" value = {state.meetWeek} onChange={event => setState({...state,meetWeek:event.target.value})}>
                                        <option>日期选择</option>
                                        <option>星期一</option>
                                        <option>星期二</option>
                                        <option>星期三</option>
                                        <option>星期四</option>
                                        <option>星期五</option>
                                        <option>星期六</option>
                                        <option>星期天</option>
                            </select>
                        </li>
                        <li><p>开始时间：</p> <input type="time"   value={state.meetStartTime} onChange={event => setState({...state,meetStartTime:event.target.value})}></input></li>
                        <li><p>结束时间：</p><input type="time"   value={state.meetEndTime} onChange={event => setState({...state,meetEndTime:event.target.value})}></input></li>
                        <li className="daDiv">
                            <input type="button" value="展示已预约的时间" onClick={renderdata} className="booktime"></input>
                            <input className="lastInput" type="button" value="预约" onClick={inputKongBook}></input>
                         </li>
                    </ul>
                   <div className='leibie'><span>会议室类别</span><span>会议预订人</span> <span>会议时间</span></div>

                    <ul className="addMeeting" >
                   

                    {
                        
                            state.list.map((item,index) => {
                               
                                return (
                                    <ul onClick={DeleteMeeting}>
                                        <li
                                            key={item+index}
                                            dangerouslySetInnerHTML={{__html:item.meetRoom}}></li>
                                        <li
                                            key={item+index}
                                            dangerouslySetInnerHTML={{__html:item.meetMen}}></li>
                                        <li
                                            key={item+index}
                                            dangerouslySetInnerHTML={{__html:item.meetWeek+""+item.meetStartTime+"~"+item.meetEndTime}}></li>
                                    </ul>
                                        
                                )
                            })
                        
                   
                    }
                            
                
                    </ul>
               </form>

        </Fragment>
    )
}

export default Meeting;




















































// import React,{useState,Fragment} from 'react'
// import axios from 'axios'

// //引入样式
// import '../Styles/Meeting.css'

// function Meeting() {
//     const [state,setState] = useState({
//         meetRoom:'会议室选择',
//         meetYear:'年份',
//         meetMonth:'月份',
//         meetDay:'日份',
//         meetStartHour:'时',
//         meetStartMinute:'分',
//         meetEndHour:'时',
//         meetEndMinute:'分',
//         meetMen:'',
//         list:[]

//   })
//     //复选框获取值
//     const handleMeetRoom = (event) => {
//         console.log(event.target.value);
//         setState({...state,meetRoom:event.target.value})

//     }

//     const handleMeetYear= (event) => {
//         console.log(event.target.value);
//         setState({...state,meetYear:event.target.value})

//     }

//     const handleMeetMonth = (event) => {
//         console.log(event.target.value);
//         setState({...state, meetMonth:event.target.value})

//     }

//     const handleMeetDay = (event) => {
//         console.log(event.target.value);
//         setState({...state,meetDay:event.target.value})

//     }

//     const handleMeetStartHour = (event) => {
//         console.log(event.target.value);
//         setState({...state,meetStartHour:event.target.value})

//     }

//     const handleMeetStartMinute = (event) => {
//         console.log(event.target.value);
//         setState({...state, meetStartMinute:event.target.value})

//     }

//     const handleMeetEndHour = (event) => {
//         console.log(event.target.value);
//         setState({...state,meetEndHour:event.target.value})

//     }

//     const handleMeetEndMinute = (event) => {
//         console.log(event.target.value);
//         setState({...state,meetEndMinute:event.target.value})

//     }

//     const handleMeetMen = (event) => {
//         // console.log(event.target.value);
//         setState({...state,meetMen:event.target.value})
//     }


//     //会议室预订
//     const Book = () => {
//         // console.log('你好');
//         setState(
//             {list:[...state.list,state.meetRoom,state.meetYear,state.meetMonth,state.meetDay,state.meetStartHour,state.meetStartMinute,state.meetEndHour,state.meetEndMinute,state.meetMen],
//                 meetRoom:'会议室选择',meetYear:'年份',meetMonth:'月份',meetDay:'日份',meetStartHour:'时',meetStartMinute:'分',meetEndHour:'时',meetEndMinute:'分',meetMen:''}
//         )


//     }


//     //向后台发送数据

//     const BookData = () => {
//         var bookData = {
//             meetRoom:state.meetRoom,
//             meetYear:state.meetYear,
//             meetMonth:state.meetMonth,
//             meetDay:state.meetDay,
//             meetStartHour:state.meetStartHour,
//             meetStartMinute:state.meetStartMinute,
//             meetEndHour:state.meetEndHour,
//             meetEndMinute:state.meetEndMinute,
//             meetMen:state.meetMen
//         }

//         axios.post('http://localhost:8000/Index/Meeting',
//             {bookData:JSON.stringify(bookData)},
//             {headers:{'Content-Type' : 'application/json'}})
//                 .then((res) => {alert(res.data)})
//                 .catch((err) => {console.log(err);})
//     }

//     return (
//         <Fragment>
//             <ul className='Meeting-one' >
//                 <li className='Meeting-one-lione'>
//                     {/* 选择会议室类别 */}
//                     <select  className="Meeting-one-selectOne" value = {state.meetRoom} onChange={handleMeetRoom}>
//                         <option>会议室选择</option>
//                         <option>大会议室</option>
//                         <option>小会议室</option>
//                     </select>
//                     {/* 选择会议时间 */}
//                         <select  value = {state.meetYear} onChange={handleMeetYear}>
//                             <option>年份</option>
//                             <option>2021.</option>
//                             <option>2022.</option>
//                             <option>2023.</option>
//                             <option>2024.</option>
//                         </select>
//                         <select value = {state.meetMonth} onChange={handleMeetMonth}>
//                             <option>月份</option>
//                             <option>1.</option>
//                             <option>2.</option>
//                             <option>3.</option>
//                             <option>4.</option>
//                             <option>5.</option>
//                             <option>6.</option>
//                             <option>7.</option>
//                             <option>8.</option>
//                             <option>9.</option>
//                             <option>10.</option>
//                             <option>11.</option>
//                             <option>12.</option>
//                         </select>

//                         <select value = {state.meetDay} onChange={handleMeetDay}>
//                             <option>日份</option>
//                             <option>1</option>
//                             <option>2</option>
//                             <option>3</option>
//                             <option>4</option>
//                             <option>5</option>
//                             <option>6</option>
//                             <option>7</option>
//                             <option>8</option>
//                             <option>9</option>
//                             <option>10</option>
//                             <option>11</option>
//                             <option>12</option>
//                             <option>13</option>
//                             <option>14</option>
//                             <option>15</option>
//                             <option>16</option>
//                             <option>17</option>
//                             <option>18</option>
//                             <option>19</option>
//                             <option>20</option>
//                             <option>21</option>
//                             <option>22</option>
//                             <option>23</option>
//                             <option>24</option>
//                             <option>25</option>
//                             <option>26</option>
//                             <option>27</option>
//                             <option>28</option>
//                             <option>29</option>
//                             <option>30</option>
//                             <option>31</option>
//                         </select>
//                 </li>

//                 <li className="Meeting-one-selectTwo">


//                 <select value = {state.meetStartHour} onChange={handleMeetStartHour}>
//                             <option>时</option>
//                             <option>1：</option>
//                             <option>2：</option>
//                             <option>3：</option>
//                             <option>5：</option>
//                             <option>6：</option>
//                             <option>7：</option>
//                             <option>8：</option>
//                             <option>9：</option>
//                             <option>10：</option>
//                             <option>11：</option>
//                             <option>12：</option>
//                             <option>13：</option>
//                             <option>14：</option>
//                             <option>15：</option>
//                             <option>16：</option>
//                             <option>17：</option>
//                             <option>18：</option>
//                             <option>19：</option>
//                             <option>20：</option>
//                             <option>21：</option>
//                             <option>22：</option>
//                             <option>23：</option>
//                             <option>24：</option>
//                         </select>

//                         <select value = {state.meetStartMinute} onChange = {handleMeetStartMinute}>
//                             <option>分</option>
//                             <option>00~</option>
//                             <option>01~</option>
//                             <option>02~</option>
//                             <option>03~</option>
//                             <option>04~</option>
//                             <option>05~</option>
//                             <option>06~</option>
//                             <option>07~</option>
//                             <option>08~</option>
//                             <option>09~</option>
//                             <option>10~</option>
//                             <option>11~</option>
//                             <option>12~</option>
//                             <option>13~</option>
//                             <option>14~</option>
//                             <option>15~</option>
//                             <option>16~</option>
//                             <option>17~</option>
//                             <option>18~</option>
//                             <option>19~</option>
//                             <option>20~</option>
//                             <option>21~</option>
//                             <option>22~</option>
//                             <option>23~</option>
//                             <option>24~</option>
//                             <option>25~</option>
//                             <option>26~</option>
//                             <option>27~</option>
//                             <option>28~</option>
//                             <option>29~</option>
//                             <option>30~</option>
//                             <option>31~</option>
//                             <option>32~</option>
//                             <option>33~</option>
//                             <option>34~</option>
//                             <option>35~</option>
//                             <option>36~</option>
//                             <option>37~</option>
//                             <option>38~</option>
//                             <option>39~</option>
//                             <option>40~</option>
//                             <option>41~</option>
//                             <option>42~</option>
//                             <option>43~</option>
//                             <option>44~</option>
//                             <option>45~</option>
//                             <option>46~</option>
//                             <option>47~</option>
//                             <option>48~</option>
//                             <option>49~</option>
//                             <option>50~</option>
//                             <option>51~</option>
//                             <option>52~</option>
//                             <option>53~</option>
//                             <option>54~</option>
//                             <option>55~</option>
//                             <option>56~</option>
//                             <option>57~</option>
//                             <option>58~</option>
//                             <option>59~</option>
//                         </select>

//                         <span className='xiaospan'>~</span>

//                         <select value = {state.meetEndHour} onChange={handleMeetEndHour}>
//                         <option>时</option>
//                             <option>1：</option>
//                             <option>2：</option>
//                             <option>3：</option>
//                             <option>5：</option>
//                             <option>6：</option>
//                             <option>7：</option>
//                             <option>8：</option>
//                             <option>9：</option>
//                             <option>10：</option>
//                             <option>11：</option>
//                             <option>12：</option>
//                             <option>13：</option>
//                             <option>14：</option>
//                             <option>15：</option>
//                             <option>16：</option>
//                             <option>17：</option>
//                             <option>18：</option>
//                             <option>19：</option>
//                             <option>20：</option>
//                             <option>21：</option>
//                             <option>22：</option>
//                             <option>23：</option>
//                             <option>24：</option>
//                         </select>

//                         <select value = {state.meetEndMinute} onChange = {handleMeetEndMinute}>
//                             <option>分</option>
//                             <option>01</option>
//                             <option>02</option>
//                             <option>03</option>
//                             <option>04</option>
//                             <option>05</option>
//                             <option>06</option>
//                             <option>07</option>
//                             <option>08</option>
//                             <option>09</option>
//                             <option>10</option>
//                             <option>11</option>
//                             <option>12</option>
//                             <option>13</option>
//                             <option>14</option>
//                             <option>15</option>
//                             <option>16</option>
//                             <option>17</option>
//                             <option>18</option>
//                             <option>19</option>
//                             <option>20</option>
//                             <option>21</option>
//                             <option>22</option>
//                             <option>23</option>
//                             <option>24</option>
//                             <option>25</option>
//                             <option>26</option>
//                             <option>27</option>
//                             <option>28</option>
//                             <option>29</option>
//                             <option>30</option>
//                             <option>31</option>
//                             <option>32</option>
//                             <option>33</option>
//                             <option>34</option>
//                             <option>35</option>
//                             <option>36</option>
//                             <option>37</option>
//                             <option>38</option>
//                             <option>39</option>
//                             <option>40</option>
//                             <option>41</option>
//                             <option>42</option>
//                             <option>43</option>
//                             <option>44</option>
//                             <option>45</option>
//                             <option>46</option>
//                             <option>47</option>
//                             <option>48</option>
//                             <option>49</option>
//                             <option>50</option>
//                             <option>51</option>
//                             <option>52</option>
//                             <option>53</option>
//                             <option>54</option>
//                             <option>55</option>
//                             <option>56</option>
//                             <option>57</option>
//                             <option>58</option>
//                             <option>59</option>
//                         </select>
//                     </li>

//                     <li className="meetMen"><input value={state.meetMen} onChange={handleMeetMen} placeholder='预约人'></input>
//                                             <button onClick={() => {
//                                                 Book();
//                                                 BookData();
//                                             }}>预订</button>
//                     </li>


//                 </ul>

//                 <div className='leibie'><span>会议室类别</span><span>会议时间</span> <span>会议预订人</span></div>

//                 <ul className="addMeeting">

//                     {
//                         state.list.map((item,index) => {
//                             return (
//                                 <li
//                                     key={index}
//                                     dangerouslySetInnerHTML={{__html:item}}></li>
//                             )
//                         })
//                     }

//             </ul>
//         </Fragment>
//     )
// }

// export default Meeting