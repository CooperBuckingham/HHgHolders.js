//======= GAME SPECIFIC SETTINGS ===========
var HHgProduction = false;
var HHgPathPrefix = "";
var HHgImgFolder = "img/";

var HardwareScreen = {
  w: window.innerWidth,
  h: window.innerHeight
  //w : window.screen.availWidth,
  //h : window.screen.availHeight,
};

var HHgOrientationPortrait = false;
if (HHgOrientationPortrait) {
  HHgScreen = {
    w: 1080, //these are the points used for all measurements
    h: 1920, //do not adjust these to an arbitray size unless you unerstand what's happening
    maxh: 1920
  };
} else {
  HHgScreen = {
    w: 1920, //these are the points used for all measurements
    h: 1080, //do not adjust these to an arbitray size unless you understand what's happening
    maxh: 1440
  };
}

//Upres canvas sets the initial size of the canvas to be larger by a factor than the Div size
//this ensures that scaling the div up does not cause the canvas to pixelate
var HHgHoldCanvasUpresScaleBy = 2;

//this will improve performance for some situations, like tranlating position
//NOTE: but note that it will cause elements like "borders" and "fonts", to scale as rasterized images.
//DISABLED FOR NOW
var HHgForceHardwareRendering = false;


// CALC
if (HHgProduction) {
  HHg.warn = HHgNoOp;
}






