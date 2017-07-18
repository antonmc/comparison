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

  return cost;
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

console.log( watsonstt(30, 30, 100000))
