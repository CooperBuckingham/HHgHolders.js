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

var HHgHoldCanvasUpresScaleBy = 2;
var HHgForceHardwareRendering = false; //this will improve performance for some situations, like tranlating position
//NOTE: but note that it will cause elements like "borders" and "fonts", to scale as rasterized images.

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

    var lineUp = HHgGetHolder({w:3,h:1080});
    lineUp.doMoveToNewParent({position: new HHgVector2(-480,0)});
    lineUp.doMakeRectangle({color: "black"});

    var lineUp = HHgGetHolder({w:3,h:1080});
    lineUp.doMoveToNewParent({position: new HHgVector2(480,0)});
    lineUp.doMakeRectangle({color: "black"});

    var lineUp = HHgGetHolder({w:1920,h:3});
    lineUp.doMoveToNewParent({position: new HHgVector2(0,-270)});
    lineUp.doMakeRectangle({color: "black"});

    var lineUp = HHgGetHolder({w:1920,h:3});
    lineUp.doMoveToNewParent({position: new HHgVector2(0,270)});
    lineUp.doMakeRectangle({color: "black"});

    var theOne = HHgGetHolder({w:100,h:100});
      theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-480,-270), isScreenPos: true});
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);
      //theOne.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theOne.test = "testOne";
      theOne.doMakeRectangle({borderRadius: 15, color: "green"});
      theOne.doAddBorder(5);
      var rotate1 = theOne.makeAction("rotateBy", {rotation: -1440, time: 40});
      var move1 = theOne.makeAction("moveBy", {positionX: 480, positionY: 270 , time: .1});
      var scale1 = theOne.makeAction("scaleBy", {scale:1.5, time: 5});
      theOne.doStoredAction(rotate1);
      //theOne.doStoredAction(move1);
      //theOne.doStoredAction(scale1);

      var theTwo = HHgGetHolder({w:100,h:100, test: "testTwo"});
      theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(0,0), isScreenPos: true});
      theTwo.setMouseable(true);
      theTwo.setIsDraggable(true);
      //theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theTwo.test = "testTwo";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theTwo.doAddSprite("pool");
      var rotate2 = theTwo.makeAction("rotateBy", {rotation: -1440, time: 20});
      var move2 = theTwo.makeAction("moveBy", {positionX: -480, positionY: -270, time: 3});
      var scale2 = theTwo.makeAction("scaleBy", {scale:.85, time: 5});
      theTwo.doStoredAction(rotate2);
      //theTwo.doStoredAction(move2);
      //theTwo.doStoredAction(scale2);

      var theThree = HHgGetHolder({w:100,h:100, test: "testThree"});
      theThree.doMoveToNewParent({parent: theTwo,position: new HHgVector2(100,100), isScreenPos: true});
      theThree.setMouseable(true);
      theThree.setIsDraggable(true);
      //theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theThree.test = "testThree";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theThree.doAddSprite("pool");
      var rotate3 = theThree.makeAction("rotateBy", {rotation: -1440, time: 10});
      var move3 = theThree.makeAction("moveBy", {positionX: -480, positionY: -270, time: 3});
      var scale3 = theThree.makeAction("scaleBy", {scale:.85, time: 5});
      theThree.doStoredAction(rotate3);
      //theTwo.doStoredAction(move3);
      //theTwo.doStoredAction(scale3);


      //setTimeout(theOne.doStoredAction.bind(theOne, scale1), 1000);
      // setTimeout(theTwo.doStoredAction.bind(theTwo, scale), 3000);

      //setTimeout(theOne.doStoredAction.bind(theOne, move1), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, rotate), 3000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);


      //****there may be issues with placement by parent or absolute placement, when dragging, maybe id conflicts or someting, in rotate demo
      //something about dragging a child is somehow affecting the parent.
   console.log("HELLO USER! Custom override is on");
 }};


