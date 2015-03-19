var HardwareScreen = {
  w : window.innerWidth,
  h : window.innerHeight,
  //w : window.screen.availWidth,
  //h : window.screen.availHeight,
};

var HHgScreen = {
  w : 1920, //these are the points used for all measurements
  h : 1080, //do not adjust these to an arbitray
  maxh : 1440,
  isLandscapeGame : true, //not implemented yet, the w/h is the only determining factor
};

var HHgTestBoxes = false;

var HHgCustomOverride = false; //change this to true and game will begin in start function below
var HHgGame = {doStart: function(){
  //if HHgCustomOverride == true, then this function will start all custom game code
  //if false, then the doStart() function located in HHgGame.js will run the demo code selected
    var theOne = HHgGetHolder({w:200,h:200});
      theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-200,-200), isScreenPos: true});
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);
      testBall.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});

  console.log("HELLO USER! Custom override is on");
}};