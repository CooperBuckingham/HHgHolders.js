//BLOG CONFIG

var HHgPathPrefix = "";

var HardwareScreen = {
  w : window.innerWidth,
  h : window.innerHeight,
  //w : window.screen.availWidth,
  //h : window.screen.availHeight,
};

var HHgOrientationLandscape = false;
var HHgScreen;

if(HHgOrientationLandscape){
    HHgScreen = {
      w : 1080, //these are the points used for all measurements
      h : 1920, //do not adjust these to an arbitray size unless you unerstand what's happening
      maxh : 1920,
    };
}else{
   HHgScreen = {
      w : 1920, //these are the points used for all measurements
      h : 1080, //do not adjust these to an arbitray size unless you understand what's happening
      maxh : 1440,
    };
}

var HHgTransformsOnly = true;
var HHgHoldCanvasUpresScaleBy = 2;

var HHgTestBoxes = false;

var HHgCustomOverride = true; //change this to true and game will begin in start function below
var HHgGame = {doStart: function(){
  //if HHgCustomOverride == true, then this function will start all custom game code
  //if false, then the doStart() function located in HHgGame.js will run the demo code selected

    var lineUp = HHgGetHolder({w:3,h:1080});
    lineUp.doMoveToNewParent();
    lineUp.doMakeRectangle({color: "black"});

    var lineUp = HHgGetHolder({w:1920,h:3});
    lineUp.doMoveToNewParent();
    lineUp.doMakeRectangle({color: "black"});

    var theOne = HHgGetHolder({w:100,h:100});
      theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(250,250), isScreenPos: true});
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);
      //theOne.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theOne.test = "testone";
      theOne.doMakeRectangle({borderRadius: 15, color: "green"});
      theOne.doAddBorder(5);
      var rotate1 = theOne.makeAction("rotateBy", {rotation: 180, time: 5});
      var move1 = theOne.makeAction("moveBy", {positionX: 960, positionY: 540 , time: 10});
      var scale1 = theOne.makeAction("scaleBy", {scale: 5, time: 2});
      //theOne.doStoredAction(rotate1);
      //theOne.doStoredAction(move1);
      theOne.doStoredAction(scale1);


      var theTwo = HHgGetHolder({w:100,h:100, test: "testTwo"});
      theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(50,50), isScreenPos: false});
      theTwo.setMouseable(true);
      theTwo.setIsDraggable(true);
      //theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theTwo.test = "testTwo";
      theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      //theTwo.doAddSprite("pool");
      var rotate = theTwo.makeAction("rotateBy", {rotation: 180, time: 5});
      var move = theTwo.makeAction("moveTo", {positionX: -1920, positionY: -1080, time: 10});
      var scale = theTwo.makeAction("scaleBy", {scale: 2, time: 1});
      //theTwo.doStoredAction(rotate);
      //theTwo.doStoredAction(move);
      //theTwo.doStoredAction(scale);


   console.log("HELLO USER! Custom override is on");
 }};


