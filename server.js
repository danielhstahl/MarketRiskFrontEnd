var child_process = require('child_process');
var http=require('http');
var express = require('express');
var bodyParser=require('body-parser');
var exphbs = require('express-handlebars');
var handleYield=require('handleYield');
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

app.get('/', function (req, res) {
   res.render('index');
});
io.on('connection', function(socket) {
  //var child = child_process.spawn('/home/daniel/Documents/cpp/marketRisk/./marketRisk',
  var child = child_process.spawn('./OptionPricing',
    {
      stdio: [
        'pipe', //pipe parent to child
        'pipe', // pipe child's stdout to parent
        'pipe' // pipe
      ]
    }
  );
  child.stdout.on('data', function (data) {
      console.log(""+data);
     io.emit('data', data.toString('utf8'));
  });
  child.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
  child.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
  socket.on('getYield', function(data) { //if "submit" is clicked ona  project page
    //retreiveFutures(child);
    var yields=new handleYield(child);
    yields.retreiveLiborAndSwap(child);

  });
  socket.on('getMC', function(data) {
    //var portfolio=getPortfolio(3000);
      console.log(data);
    child.stdin.write(JSON.stringify(data));
    child.stdin.write("\n");
  });
});

var getPortfolio=function(numAssets){
  var currdate=new Date();
  var portfolio=[];
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
  return portfolio;
//  retreivedPortfolio=true;
}
