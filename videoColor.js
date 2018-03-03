var interval;

function getAverageColourAsRGB (video) {
var canvas = document.createElement('canvas'),
context = canvas.getContext && canvas.getContext('2d'),
rgb = {r:102,g:102,b:102}, // Fallback color
pixelInterval = 5, // Inspect every X pixel
count = 0,
i = -4,
data, length;

// return the fallback color for non-compliant browsers
if (!context) { return rgb; }

// set canvas width & height to video width & height
var height = canvas.height = video.naturalHeight || video.offsetHeight || video.height,
width = canvas.width = video.naturalWidth || video.offsetWidth || video.width;

context.drawImage(video, 0, 0);

try {
data = context.getImageData(0, 0, width, height);
} catch(e) {
// catch errors 
alert(e);
return rgb;
}

data = data.data;
length = data.length;
while ((i += pixelInterval * 4) < length) {
count++;
rgb.r += data[i];
rgb.g += data[i+1];
rgb.b += data[i+2];
}

// round the values for correct rgb format
rgb.r = Math.floor(rgb.r/count);
rgb.g = Math.floor(rgb.g/count);
rgb.b = Math.floor(rgb.b/count);

return rgb;
}

function getVideo() {
var video = document.getElementsByTagName('video')[0];
var rgb = getAverageColourAsRGB(video);
/*
render frames with rgb background for testing
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = video.offsetWidth;
canvas.height = video.offsetHeight;
context.drawImage(video,0,0);
document.body.appendChild(canvas);
var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
console.log(video.offsetHeight);

canvas.style.background = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
canvas.style.padding = '15px';
*/
console.log(rgb);
}

function run() {
interval = setInterval(function(){ getVideo() },1000);
}


function stop() {
  clearInterval(interval);
}