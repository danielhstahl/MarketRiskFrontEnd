var child_process = require('child_process');
var https=require('https');
var http=require('http');
var express = require('express');
var bodyParser=require('body-parser');
var exphbs = require('express-handlebars');

var app = express();
var server = http.createServer(app).listen(8000); //required fro socket.io
var io = require('socket.io').listen(server);
app.use(bodyParser.json());
//app.use('/assets', express.static('node_modules')); //for socket.io
app.use('/assets', express.static('assets'));
var handlebars = exphbs.create({
  extname: '.html'
});
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

//TODO: make this MUCH BETTER ORGANIZED!!!


app.get('/', function (req, res) {
   res.render('index');
});
io.on('connection', function(socket) {
  var child = child_process.spawn('/home/daniel/Documents/cpp/marketRisk/./marketRisk',
  //child = child_process.spawn('./test',
    //["marketRisk"], //parameters passed to the market risk CPP program.
    {
      stdio: [
        'pipe', //pipe parent to child
        'pipe', // pipe child's stdout to parent
        'pipe' // pipe
      ]
    }
  );
  socket.on('getYield', function(data) { //if "submit" is clicked ona  project page
    //retreiveFutures(child);
    retreiveLiborAndSwap(child);
    https.get("https://api.stlouisfed.org/fred/series/observations?series_id=USD1WKD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json", function(result){callback(result, child);}); //1 week libor history
  });
  socket.on('getMC', function(data) {
    getPortfolio(3000);
    child.stdin.write(JSON.stringify(portfolio));
    child.stdin.write("\n");
    child.stdout.on('data', function (data) {
      io.emit('mc', ''+data);
    });
    child.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  });
});



var portfolio=[];
var YieldCurveUnExtrapolated={};
var historicalResults="";
var retreivedHistoricalResults=false;
var retreivedYieldResults=false;
var retreivedPortfolio=false;
var j={"j":0};

function retreiveLiborAndSwap(child){
  var apiStrings=[
    {
      description:"Most Current 1 week LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=USD1WKD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:7,//7 day convention
      type:"LIBOR"
    },
    {
      description:"Most Current 1 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=USD1MTD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:30,//thirty day convention
      type:"LIBOR"
    },
    {
      description:"Most Current 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=USD3MTD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:90,
      type:"LIBOR"
    },
    {
      description:"Most Current 6 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=USD6MTD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:180,
      type:"LIBOR"
    },
    {
      description:"Most Current 12 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=USD12MD156N&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:360,
      type:"LIBOR"
    },
    {
      description:"Most Current 1 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP1&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:360,
      type:"Swap"
    },
    {
      description:"Most Current 2 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP2&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:720,
      type:"Swap"
    },
    {
      description:"Most Current 3 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP3&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:1080,
      type:"Swap"
    },
    {
      description:"Most Current 4 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP4&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:1440,
      type:"Swap"
    },
    {
      description:"Most Current 5 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP5&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:1800,
      type:"Swap"
    },
    {
      description:"Most Current 7 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP7&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:2520,
      type:"Swap"
    },
    {
      description:"Most Current 10 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP10&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:3600,
      type:"Swap"
    },
    {
      description:"Most Current 30 year swap on 3 month LIBOR",
      url:"https://api.stlouisfed.org/fred/series/observations?series_id=DSWP30&api_key=6b75e4bc06a6ed991a7a9cc64d70c3fa&file_type=json&sort_order=desc&limit=1",
      daysPlus:10800,
      type:"Swap"
    }
  ];
  YieldCurveUnExtrapolated=Array(apiStrings.length);
  runFunc(apiStrings, 0, child);
}

function retreiveFutures(child){
  var getData;
  YieldCurveUnExtrapolated=[];
  http.get("http://www.cmegroup.com/CmeWS/mvc/Quotes/Future/1/G", function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //the whole response has been recieved
    response.on('end', function () {
      var oneDay = 24*60*60*1000;
      getData=JSON.parse(str);

      getData=getData.quotes;
      var Wednesday=3;
      var twoWeeks=13;
      var n=getData.length;
      var currdate=new Date();
      for(var i=0; i<n; i++){
        if(getData[i].last!=='-'){
          var year="";
          var month="";
          var date="";
          for(var j=0; j<4;j++){
            year+=getData[i].expirationDate[j];
          }
          date+=year+"-";
          month+=getData[i].expirationDate[4];
          month+=getData[i].expirationDate[5];
          //day="01";
          var myDate=new Date(year, month-1, 1);
          var beginningDay=myDate.getDay();

          //var daysAdd=beginningDay<=3?(3-beginningDay+14):7-(beginningDay-3)+14; //wednesday is "3"
          var daysAdd=beginningDay<=Wednesday?(Wednesday-beginningDay+twoWeeks):7-(beginningDay-Wednesday)+twoWeeks; //wednesday is "3"
          date+=month+"-"+daysAdd;
          //date+=getData[i].expirationDate[6];
          //date+=getData[i].expirationDate[7];

          YieldCurveUnExtrapolated.push({
            value:getData[i].last,
            date:date,
            daysPlus:Math.round(Math.abs((myDate.getTime() - currdate.getTime())/(oneDay))),
            type:"Futures"
          });
        }

      }


      if(!YieldCurveUnExtrapolated[0]){
        for(var i=0; i<n; i++){
          if(getData[i].priorSettle!=='-'){
            var year="";
            var month="";
            var date="";
            for(var j=0; j<4;j++){
              year+=getData[i].expirationDate[j];
            }
            date+=year+"-";
            month+=getData[i].expirationDate[4];
            month+=getData[i].expirationDate[5];
            //day="01";
            var myDate=new Date(year, month-1, 1);
            var beginningDay=myDate.getDay();

            //var daysAdd=beginningDay<=3?(3-beginningDay+14):7-(beginningDay-3)+14; //wednesday is "3"
            var daysAdd=beginningDay<=Wednesday?(Wednesday-beginningDay+twoWeeks):7-(beginningDay-Wednesday)+twoWeeks; //wednesday is "3"
            date+=month+"-"+daysAdd;
            //date+=getData[i].expirationDate[6];
            //date+=getData[i].expirationDate[7];

            YieldCurveUnExtrapolated.push({
              value:getData[i].priorSettle,
              date:date,
              daysPlus:Math.round(Math.abs((myDate.getTime() - currdate.getTime())/(oneDay))),
              type:"Futures"
            });
          }
        }
      }
      retreivedYieldResults=true;
      sendDataToCPP(child);
    });
  });
}


var callback = function(response, child) {
  var str = '';
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    historicalResults += chunk;
  });
  //the whole response has been recieved
  response.on('end', function () {
    retreivedHistoricalResults=true;
    sendDataToCPP(child);
  });
}
var clb=function(response, i, n, jObj, desc, daysPlus, type, child){
  var str = '';
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });
  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var obj=JSON.parse(str);

    YieldCurveUnExtrapolated[i]={date:obj.observations[0].date, value:obj.observations[0].value, description:desc, daysPlus:daysPlus, type:type};
    jObj.j++;
    //console.log(jObj.j);
    if(n==jObj.j){
      retreivedYieldResults=true;
      //console.log(YieldCurveUnExtrapolated);
      sendDataToCPP(child);
    }
  });
}
function sendDataToCPP(child){
  if(retreivedYieldResults&&retreivedHistoricalResults){

    child.stdin.write(JSON.stringify(YieldCurveUnExtrapolated));
    child.stdin.write("\n");
    child.stdin.write(historicalResults);
    child.stdin.write("\n");
    //child.stdin.write(JSON.stringify(portfolio));
    //child.stdin.write("\n");
    child.stdout.on('data', function (data) {
      //console.log(''+data);
      io.emit('yield', ''+data);
    });
    child.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  }
}
var runFunc=function(arrayUrl, i, child){
  var n=arrayUrl.length;
  if(i<n){
    https.get(arrayUrl[i].url, function(response){
      clb(response, i, n, j, arrayUrl[i].description, arrayUrl[i].daysPlus, arrayUrl[i].type, child);
    });
    runFunc(arrayUrl, i+1, child);
  }
}
var getPortfolio=function(numAssets){
  var currdate=new Date();
  Date.prototype.addDays = function(days){
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
  }
  Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return yyyy + "-"+(mm[1]?mm:"0"+mm[0])+ "-" + (dd[1]?dd:"0"+dd[0]); // padding
  };
  //console.log(currdate.addDays(1).yyyymmdd());
  for(var i=0; i<numAssets/4; i++){ //create a fake portfolio
    portfolio.push({maturity:currdate.addDays(i+1).yyyymmdd(), type:"bond"});
  }
  for(var i=0; i<numAssets/4; i++){ //create a fake portfolio
    portfolio.push({maturity:currdate.addDays(i+1).yyyymmdd(), strike:.03, tenor:.25, type:"caplet"});
  }
  for(var i=0; i<numAssets/4; i++){ //create a fake portfolio
    portfolio.push({maturity:currdate.addDays(i+1).yyyymmdd(), strike:.03, tenor:.25, underlyingMaturity:currdate.addDays(i+721).yyyymmdd(), type:"swaption"});
  }
  for(var i=0; i<numAssets/4; i++){ //create a fake portfolio
    portfolio.push({maturity:currdate.addDays(i+1).yyyymmdd(), strike:.99, underlyingMaturity:currdate.addDays(i+91).yyyymmdd(), type:"call"});
  }
//  retreivedPortfolio=true;
}
