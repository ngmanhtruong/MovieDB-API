// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};


// Convert a number to money formatting
export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};


export const isPersistedState = stateName =>{
  const sessionState = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
}


function degreesToRadians(deg) {
  return (deg/180) * Math.PI;
}
function percentToRadians(percentage) {
  // convert the percentage into degrees
  var degrees = percentage * 360 / 100;
  // and so that arc begins at top of circle (not 90 degrees) we add 270 degrees
  return degreesToRadians(degrees + 270);
}
export function drawPercentageCircle(percentage, radius, canvas){
  var context = canvas.getContext('2d');
  canvas.style.backgroundColor = 'black';
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var startAngle = percentToRadians(0);
  var endAngle = percentToRadians(percentage);
  // set to true so that we draw the missing percentage
  var counterClockwise = true;
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 15;
  // line color
  context.strokeStyle = 'lightyellow';
  context.stroke();
  // set to false so that we draw the actual percentage
  counterClockwise = false;
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 15;
  // line color
  context.strokeStyle = 'lightblue';
  context.stroke();
  // now draw the inner text
        context.font = radius/2.5 + "px Helvetica";
        context.fillStyle = "lightblue";
        context.textAlign = "center";
        // baseline correction for text
        context.fillText(percentage+"%", x, y*1.05);
   
}
// implantation happens here
/*
  var canvas = document.getElementById('myCanvas');
  var percentage = 70;
  var radius;
  if (myCanvas.height < myCanvas.width) {
      radius = myCanvas.height / 3;
  }
  else {
      radius = myCanvas.width / 3;
  }
*/
//drawPercentageCircle(percentage, radius, canvas);