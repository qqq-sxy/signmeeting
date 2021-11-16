import React,{Fragment,useEffect} from 'react'
import '../Styles/LocationCheckIn.css'










function LocationCheckIn ()  {

	


	const getLocation = () => {
		console.log('ghdfiyuq');
		//开启SDK辅助定位
		const {BMap,BMAP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT}=window;
		var map = new BMap.Map("allmap");
		var geolocation = new BMap.Geolocation();
		geolocation.enableSDKLocation();
		geolocation.getCurrentPosition(function(r)	{
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				alert('您的位置：'+r.point.lng+','+r.point.lat);//先经度，后维度
			}
			else {
				alert('failed'+this.getStatus());
			}  
		})      
	}

	useEffect(() => {
		console.log('hhh');
		const {BMap,BMAP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT}=window;
		var map = new BMap.Map("allmap");
	    var point = new BMap.Point(108.96821,34.28394); //这里使用BMap命名空间下的Point类  来创建一个坐标点  其中116.404表示经度，39.915表示维度
		map.centerAndZoom(point, 19);//地图初始化，此方法用于设置中心点坐标和地图级别且地图必须经过初始化才可以执行其他操作
		map.enableScrollWheelZoom(true);//设置鼠标滚轮缩放
		map.enableInertialDragging();//启用地图惯性拖拽，默认禁止
		map.enableContinuousZoom();//启用连续缩放效果，默认禁止
		 
		

	})

	
	
	return (
		<Fragment>
			<div id="allmap"></div>
			<input type="button" value="位置签到" onClick={getLocation}></input>



		


		</Fragment>
	)
}

export default LocationCheckIn


// import  React,{Component,Fragment} from 'react';
// import axios from 'axios'
// import '../Styles/LocationCheckIn.css'

//  class LocationCheckIn extends Component{ 
// 	constructor(props) {
//         super(props)
// 	}
//     componentDidMount () {
// 		const {BMap,BMAP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT}=window;
// 		var map = new BMap.Map("allmap");//创建Map实例，通过BMap命名空间下的Map类表示地图，通过new 操作符  可以创建一个地图实例，其参数可以是元素id也可是是元素对象
// 		var point = new BMap.Point(108.90740,34.15902); //这里使用BMap命名空间下的Point类  来创建一个坐标点  其中116.404表示经度，39.915表示维度
// 		map.centerAndZoom(point, 14);//地图初始化，此方法用于设置中心点坐标和地图级别且地图必须经过初始化才可以执行其他操作
// 		map.enableScrollWheelZoom();//设置鼠标滚轮缩放
// 		map.enableInertialDragging();//启用地图惯性拖拽，默认禁止
// 		map.enableContinuousZoom();//启用连续缩放效果，默认禁止

// 		 var size = new BMap.Size(10, 20);
// 		 map.addControl(new BMap.CityListControl({
// 			 anchor: BMAP_ANCHOR_TOP_LEFT,
// 			 offset: size,
// 		 }));
		

// 	//将维度传到后台
		

// 			var geolocation = new BMap.Geolocation();
// 			// 开启SDK辅助定位
// 			geolocation.enableSDKLocation();
// 			geolocation.getCurrentPosition(function(r){
// 			if(this.getStatus() == BMAP_STATUS_SUCCESS){
// 				var mk = new BMap.Marker(r.point);
// 				map.addOverlay(mk);
// 				map.panTo(r.point);
// 				console.log('您的位置：'+r.point.lng+','+r.point.lat);
// 			}
// 			else {
// 				console.log('failed'+this.getStatus());
// 			}        
// 		});
// 		}









		// var data5 = {
		// 	pointLng:lng,
		// 	pointLat:lat
		// }
		// axios.post('http://localhost:8000/Index/LocationCheckIn',
		// 	{data5:JSON.stringify(data5)},
		// 	{Headers:{'Content-Type' : 'application/json'}})
		// 	.then((res) =>{alert(res.data)})
		// 	.catch((err) => {console.log(err);})
	
		
	
	
	 
// 	 render(){
// 		 return (
// 			 <Fragment>
// 			  <div id={"allmap"} className="location"></div>
// 			  <input type="button" value="位置签到" className="qiandao" ></input>
// 			</Fragment>
// 		 )
// 	 }
// }
// export default LocationCheckIn





// var lat = 0;
// var lng = 0;

// class LocationCheckIn extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lat: '',//自身纬度
//             lng: '',//自身经度
//         }
//     }

// 	componentDidMount(){
//         var type3 = [550, 30];//设定  google  gps格式转换
//         var transTypesParam = "";
//         const _this = this;
//         function getLocation() {
//             var options = {
//                 enableHighAccuracy: true,
//                 timeout: 5000,
//                 maximumAge: 0
//             };
//             if (navigator.geolocation) { //用浏览器获取坐标地址
//                 navigator.geolocation.getCurrentPosition(showPosition, showError, options);
//             } else {
//                 alert("浏览器不支持地理定位!");
//             }
//         }


// 		 //获取浏览器GPS成功
// 		 function showPosition(position) {
//             var x = position.coords.longitude; //经度 
//             var y = position.coords.latitude;//纬度 

//             transTypesParam = getTransType(position.coords.accuracy);//该方法很重要，用来判断手机定位格式，方法在下方
//             var BMap = window.BMap;
//             var ggPoint = new BMap.Point(x, y);
//             showMap(ggPoint, true);//显示地图坐标
//         }

		
//         //获取失败，失败后用百度地图自带的方法，但是定位会不准
//         function showError(error) {
//             var BMap = window.BMap;
//             var geolocation = new BMap.Geolocation();
//             geolocation.getCurrentPosition(function (r) {
//                 if (this.getStatus() == 'BMAP_STATUS_SUCCESS') {
//                     showMap(r.point, false);
//                 }
//                 else {
//                     //向后台传值经纬度  此位GPRS定位失败后走的方法，如果GPRS定位成功，这不走此方法
//                      home.index({ longitude: r.longitude, latitude: r.latitude }).then((result) => {
//                         if (result.code === 1) {
//                             _this.setState({
//                                 data: result.data,
//                             })
//                         } else { Toast.offline(result.msg, 1) }
//                     })  
//                     alert('定位失败1：' + this.getStatus());
//                 }
//             }, { enableHighAccuracy: true })

// 			switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                     alert("用户拒绝了地理定位请求");
//                     //$("#testInfo").html(error.code + "User denied the request for Geolocation.");
//                     break;
//                 case error.POSITION_UNAVAILABLE:
//                     alert("位置信息不可用");
//                     //$("#testInfo").html(error.code + "Location information is unavailable.");
//                     break;
//                 case error.TIMEOUT:
//                     alert("获取用户位置的请求超时");
//                     //$("#testInfo").html(error.code + "The request to get user location timed out.");
//                     break;
//                 case error.UNKNOWN_ERROR:
//                     alert("发生未知错误");
//                     //$("#testInfo").html(error.code + "An unknown error occurred.");
//                     break;
//             }

//         }

// 		// 用来判断手机定位格式
//         function getTransType(accuracy) {
//             if (window.localStorage) {
//                 var transType = localStorage.getItem("xdlcfwapp_transType");
//                 if (transType != null && transType != "") {
//                     return transType;
//                 }
//             }

//             for (var i = 0; i < type3.length; i++) {
//                 if (type3[i] == accuracy) {
//                     localStorage.setItem("xdlcfwapp_transType", 3);
//                     return 3;
//                 }
//             }
//             localStorage.setItem("xdlcfwapp_transType", 1);
//             return 1;
//         };

// 		var bm = null;
//         function showMap(ggPoint, isTrans) {
//             // 百度地图API功能
//             var BMap = window.BMap;
//             bm = new BMap.Map("allmap");
//             bm.centerAndZoom(ggPoint, 15);
//             bm.enableScrollWheelZoom(true);
//             if (isTrans) {
//                 bm.addControl(new BMap.NavigationControl());
//                 //坐标转换完之后的回调函数
//                 var translateCallback = function (data) {
//                     if (data.status === 0) {
//                         alert(JSON.stringify(data));//弹出的数据是一个对象，需要取值经纬度
//                         lng = data.points && data.points.length > 0 ? data.points[0].lng : '';
//                         lat = data.points && data.points.length > 0 ? data.points[0].lat : '';
//                         alert(JSON.stringify(data.points[0].lng));
//                         alert(JSON.stringify(data.points[0].lat));
//                         //向后台传值经纬度  如果GPRS定位成功，程序走的此方法
//                         home.index({ longitude: lng, latitude: lat }).then((result) => {
//                             if (result.code === 1) {
//                                 _this.setState({
//                                     data: result.data,
//                                 })
//                             } else { Toast.offline(result.msg, 1) }
//                         })
//                     } else {
//                         //  alert("经纬度：333333333====="+transTypesParam);
//                     }
//                 }

// 				setTimeout(function () {
//                     var convertor = new BMap.Convertor();
//                     var pointArr = [];
//                     pointArr.push(ggPoint);
//                     convertor.translate(pointArr, transTypesParam, 5, translateCallback);
//                 }, 1000)
//             } else {
//                 alert("经纬度：" + ggPoint.lng + "," + ggPoint.lat);
//             }
//         }
//         getLocation();
//     }
//     render() {
        
//         return (
//             <div >
//                 <div id="allmap" style={{ width: 0, height: 0 }}></div>
//             </div>
//         );
//     }

// }