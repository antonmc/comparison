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

function calculateWatsonCost() {
  cost = RATEE * minutesAtRateE + RATED * minutesAtRateD + RATEC * minutesAtRateC + RATEB * minutesAtRateB + RATEA * minutesAtRateA;

  // var dollars = cost.toFixed(2);

  return cost;
}

function watsonstt(minutes, days, users) {

  if (days > 0) {
    minutes = minutes * days;
  }

  if (users > 0) {
    minutes = minutes * users;
  }

  if (minutes > CAPD) {
    minutesAtRateE = minutes - CAPD;
    minutesAtRateD = CAPC;
    minutesAtRateC = CAPB;
    minutesAtRateB = CAPB - CAPA;
    minutesAtRateA = CAPA;
  } else if (minutes > CAPC) {
    minutesAtRateD = minutes - CAPC;
    minutesAtRateC = CAPB;
    minutesAtRateB = CAPB - CAPA;
    minutesAtRateA = CAPA;
  } else if (minutes > CAPB) {
    minutesAtRateC = minutes - CAPB;
    minutesAtRateB = 249000;
    minutesAtRateA = 1000;
  } else if (minutes > CAPA) {
    minutesAtRateB = minutes - CAPA;
    minutesAtRateA = 1000;
  }

  return calculateWatsonCost();
}

/* MICROSOFT */

let MSRATEA = 0;
let MSRATEB = 0.019456;/* COST PER MINUTE - MS CHARGES VERY DIFFERENTLY */

let MSCAPA = 1250;/* 5000 15 second transactions = 1250 minutes */

var msMinutesAtRateA = 0;
var msMinutesAtRateB = 0;

function calculateBingCost() {
  cost = MSRATEA * msMinutesAtRateA + MSRATEB * msMinutesAtRateB;
  // var dollars = cost.toFixed(2);
  return cost;
}

function bingstt(minutes, days, users) {

  if (days > 0) {
    minutes = minutes * days;
  }

  if (users > 0) {
    minutes = minutes * users;
  }

  if (minutes > MSCAPA) {
    msMinutesAtRateB = minutes - MSRATEA;
    msMinutesAtRateA = MSCAPA;
  }
  return calculateBingCost();
}

/* GOOGLE */

let GOOGLERATEA = 0;
let GOOGLERATEB = 0.015;/* COST PER MINUTE - GOOGLE CHARGES VERY DIFFERENTLY */

let GOOGLECAPA = 60;/* 5000 15 second transactions = 1250 minutes */

var googleMinutesAtRateA = 0;
var googleMinutesAtRateB = 0;

function calculateGoogleCost() {
  cost = GOOGLERATEA * googleMinutesAtRateA + GOOGLERATEB * googleMinutesAtRateB;
  return cost;
}

function googlestt(minutes, days, users) {

  if (days > 0) {
    minutes = minutes * days;
  }

  if (users > 0) {
    minutes = minutes * users;
  }

  if (minutes > GOOGLECAPA) {
    googleMinutesAtRateB = minutes - GOOGLERATEA;
    googleMinutesAtRateA = GOOGLECAPA;
  }
  return calculateGoogleCost();
}

function drawBar(average, mycost, company) {

  var myamountdiv = document.getElementById(company + 'amount');
  var mysavingdiv = document.getElementById(company + 'saving');
  var myexcessdiv = document.getElementById(company + 'excess');

  if (mycost > average) {

    var amount = 100 / average * mycost;
    amount = amount -100;
    amount = amount.toFixed(0);
    myamountdiv.style.height = '100%';
    mysavingdiv.style.height =0;
    myexcessdiv.style.height = amount + '%';
  } else {
    var amount = 100 / average * mycost;
    amount = amount.toFixed(0);
    myamountdiv.style.height = amount + '%';
    mysavingdiv.style.height = 100 - amount + '%';
    myexcessdiv.style.height = 0;
  }
}

function reset() {
  minutesAtRateE = 0;
  minutesAtRateD = 0;
  minutesAtRateC = 0;
  minutesAtRateB = 0;
  minutesAtRateA = 0;

  msMinutesAtRateA = 0;
  msMinutesAtRateB = 0;

  googleMinutesAtRateA = 0;
  googleMinutesAtRateB = 0;
}

function calculate() {

  reset();

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

  var m = parseInt(minutes.value);
  var d = parseInt(days.value)
  var u = parseInt(users.value)

  let ibmDollars = watsonstt(m, d, u);
  let msDollars = bingstt(m, d, u);
  let googleDollars = googlestt(m, d, u);

  var ibmcost = document.getElementById('ibmcost');
  ibmcost.innerHTML = '$' + ibmDollars.toFixed(2);

  var mscost = document.getElementById('mscost');
  mscost.innerHTML = '$' + msDollars.toFixed(2);

  var googlecost = document.getElementById('googlecost');
  googlecost.innerHTML = '$' + googleDollars.toFixed(2);

  var average = (ibmDollars + msDollars + googleDollars) / 3;

  // var ibmamount = document.getElementById('ibmamount');
  // var msamount = document.getElementById('ibmamount');
  // var googleamount = document.getElementById('ibmamount');
  //
  // var ibmsaving = document.getElementById('ibmsaving');
  // var mssaving = document.getElementById('mssaving');
  // var googlesaving = document.getElementById('googlesaving');

  drawBar(average, ibmDollars, 'ibm');
  drawBar(average, msDollars, 'ms')
  drawBar(average, googleDollars, 'google')


  // if( ibmcost > average ){
  //   ibmamount.style.height = '100%';
  // }else{
  //   var amount = 100/average * ibmcost;
  //   amount = amount.toFixed(0);
  //   ibmamount.style.height = amount + '%';
  // }
}
