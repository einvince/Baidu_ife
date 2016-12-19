/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var checked=""

/**
 * 渲染图表
 */
function renderChart() {
	console.log(chartData)
    var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
	var color = '',text = '';
	for (var item in chartData) {
		color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    text += '<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:'+color+'"></div>';
}
  aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowGraTime == checked) {
    return;
  } else {
    pageState.nowGraTime = checked;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  if (pageState.nowSelectCity == checked) {
    return;
  } else {
    pageState.nowSelectCity = checked;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  }

  // 调用图表渲染函数


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var timeclick = document.getElementById("form-gra-time")
	    timeclick.addEventListener('click',function(e){
       if(e.target&&e.target.nodeName.toUpperCase()=="INPUT") { console.log(e.target.value) ; checked =e.target.value; graTimeChange()}   });
	  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}


/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById("city-select");
  var citys = Object.getOwnPropertyNames(aqiSourceData);
  var html = citys.map(function (item) {
  	return "<option>"+item+"</option>"
  });
  pageState.nowSelectCity=citys[0];
  select.innerHTML = html.join("");

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

  select.addEventListener('change',citySelectChange)
  

  // var citySelect = document.getElementById('city-select');
  // var cityList = '';
  // for (var i in aqiSourceData) {
  // 	cityList += '<option>' + i +'</option>';
  // }
  // citySelect.innerHTML = cityList;


}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city=pageState.nowSelectCity
  // var citydata = Object.getOwnPropertyNames(aqiSourceData);
  var citydata = aqiSourceData[city]
  console.log(citydata)
  console.log(pageState.nowGraTime)
  if (pageState.nowGraTime=='day'){
  	console.log(citydata)
  	return chartData=citydata

  }
  	
  if (pageState.nowGraTime=='week'){
  	weeksum=0; week=0; daycount=0
  	for (var date in citydata){
  		daycount++
  		weeksum+=citydata[date]
  		if ((new Date(date)).getDay()==6){
  			week++
  			chartData['第'+week+'周']=Math.floor(weeksum/daycount)
  			daycount=0
  			weeksum=0
  		}
      }
     if (daycount!=0){
     	week++
  	    chartData['第'+week+'周']=Math.floor(weeksum/daycount)
      }
  	}

  if (pageState.nowGraTime=='month'){
  	monthsum=0; month=0; daycount=0
  	for (var date in citydata){
  		daycount++
  		monthsum+=citydata[date]
  		if ((new Date(date)).getMonth()!==month){
  			month++
  			chartData['第'+month+'月']=Math.floor(monthsum/daycount)
  			daycount=0
  			weeksum=0
  		}
      }
     if (daycount!=0){
     	month++
  	    chartData['第'+month+'月']=Math.floor(monthsum/daycount)
      }
  	}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
