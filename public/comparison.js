var cost = 0;

let RATEA = 0;
let RATEB = 0.02;
let RATEC = 0.015;
let RATED = 0.0125;
let RATEE = 0.01;

let CAPA = 1000;
let CAPB = 250000;
let CAPC = 500000;
let CAPD = 1000000;

var minutesAtRateE = 0;
var minutesAtRateD = 0;
var minutesAtRateC = 0;
var minutesAtRateB = 0;
var minutesAtRateA = 0;

function calculateWatsonCost(){
  cost = RATEE * minutesAtRateE +
  RATED * minutesAtRateD +
  RATEC * minutesAtRateC +
  RATEB * minutesAtRateB +
  RATEA * minutesAtRateA;

  var dollars = cost.toFixed(2);

  return dollars;
}

function watsonstt(minutes, days, users){

  if( days > 0 ){
     minutes = minutes * days;
  }

  if( users > 0 ){
    minutes = minutes * users;
  }

  if( minutes > CAPD ){
    minutesAtRateE = minutes - CAPD;
    minutesAtRateD = CAPC;
    minutesAtRateC = CAPB;
    minutesAtRateB = CAPB - CAPA;
    minutesAtRateA = CAPA;
  }else if( minutes > CAPC ){
    minutesAtRateD = minutes - CAPC;
    minutesAtRateC = CAPB;
    minutesAtRateB = CAPB - CAPA;
    minutesAtRateA = CAPA;
  }else if( minutes > CAPB){
    minutesAtRateC = minutes - CAPB;
    minutesAtRateB = 249000;
    minutesAtRateA = 1000;
  }else if( minutes > CAPA ){
    minutesAtRateB = minutes - CAPA;
    minutesAtRateA = 1000;
  }

  return calculateWatsonCost();
}


function calculate(){


  var minutes = document.getElementById('minuteslider');
  var days = document.getElementById('dayslider');
  var users = document.getElementById('userslider');

  var minuteslabel = document.getElementById('minuteslabel');
  minuteslabel.innerHTML = minutes.value;

  var daysslabel = document.getElementById('dayslabel');
  dayslabel.innerHTML = days.value;

  var userslabel = document.getElementById('userslabel');
  userslabel.innerHTML = users.value;

  console.log('minutes: ' + minutes.value)
  console.log('days: ' + days.value)
  console.log('users: ' + users.value)

  var ibmcost = document.getElementById('ibmcost');
  ibmcost.innerHTML = '$' + watsonstt(minutes.value, days.value, users.value);
}
