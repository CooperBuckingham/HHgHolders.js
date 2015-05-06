
var HHgTestDashSceneDiv = true;
var HHgShowTestGrid = true;

var HHgTestsOverride = true; //change this to true and game will begin in start function below
var HHgGame = {doStart: function(){
  //if HHgCustomOverride == true, then this function will start all custom game code
  //if false, then the doStart() function located in HHgGame.js will run the demo code selected

  if(HHgShowTestGrid){
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
  }
    //==================== TEXT TESTS ==================
  if(true){
    var theOne = HHgGetHolder({w:100,h:100});
      theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(0,0), isScreenPos: true});
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);
      theOne.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theOne.test = "testOne";
      theOne.doMakeRectangle({borderRadius: 15, color: "green"});
      theOne.doAddBorder(5);
      var rotate1 = theOne.makeAction("rotateBy", {rotation: -360, time: 10});
      var move1 = theOne.makeAction("moveBy", {positionX: 480, positionY: 270 , time: 10});
      var scale1 = theOne.makeAction("scaleBy", {scaleX:1, scaleY: 3, time: 10});
      theOne.doStoredAction(rotate1);
      theOne.doStoredAction(move1);
      theOne.doStoredAction(scale1);

      var theTwo = HHgGetHolder({w:100,h:100, test: "testTwo"});
      theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(0,0), isScreenPos: true});
      theTwo.setMouseable(true);
      theTwo.setIsDraggable(true);
      theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theTwo.test = "testTwo";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theTwo.doAddSprite("pool");
      var rotate2 = theTwo.makeAction("rotateBy", {rotation: 360, time: 10});
      var move2 = theTwo.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
      var scale2 = theTwo.makeAction("scaleBy", {scaleX: 1, scaleY: 1/3, time: 10});
      theTwo.doStoredAction(rotate2);
      theTwo.doStoredAction(move2);
      theTwo.doStoredAction(scale2);

      var theThree = HHgGetHolder({w:100,h:100, test: "testThree"});
      theThree.doMoveToNewParent({parent: theTwo,position: new HHgVector2(0,100), isScreenPos: false});
      theThree.setMouseable(true);
      theThree.setIsDraggable(true);
      theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theThree.test = "testThree";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theThree.doAddSprite("soccer");
      var rotate3 = theThree.makeAction("rotateBy", {rotation: -360, time: 10});
      var move3 = theThree.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
      var scale3 = theThree.makeAction("scaleBy", {scale:1, time: 10});
      theThree.doStoredAction(rotate3);
      theTwo.doStoredAction(move3);
      //theTwo.doStoredAction(scale3);


      //setTimeout(theOne.doStoredAction.bind(theOne, scale1), 1000);
      // setTimeout(theTwo.doStoredAction.bind(theTwo, scale), 3000);

      //setTimeout(theOne.doStoredAction.bind(theOne, move1), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, rotate), 3000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);

      return;
    }

  //==================== ACTION TESTS ==================
  if(false){
    var theOne = HHgGetHolder({w:100,h:100});
      theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(0,0), isScreenPos: true});
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);
      //theOne.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theOne.test = "testOne";
      theOne.doMakeRectangle({borderRadius: 15, color: "green"});
      theOne.doAddBorder(5);
      var rotate1 = theOne.makeAction("rotateBy", {rotation: -360, time: 10});
      var move1 = theOne.makeAction("moveBy", {positionX: 480, positionY: 270 , time: 10});
      var scale1 = theOne.makeAction("scaleBy", {scaleX:1, scaleY: 3, time: 10});
      theOne.doStoredAction(rotate1);
      theOne.doStoredAction(move1);
      theOne.doStoredAction(scale1);

      var theTwo = HHgGetHolder({w:100,h:100, test: "testTwo"});
      theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(0,0), isScreenPos: true});
      theTwo.setMouseable(true);
      theTwo.setIsDraggable(true);
      //theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theTwo.test = "testTwo";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theTwo.doAddSprite("pool");
      var rotate2 = theTwo.makeAction("rotateBy", {rotation: 360, time: 10});
      var move2 = theTwo.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
      var scale2 = theTwo.makeAction("scaleBy", {scaleX: 1, scaleY: 1/3, time: 10});
      theTwo.doStoredAction(rotate2);
      theTwo.doStoredAction(move2);
      theTwo.doStoredAction(scale2);

      var theThree = HHgGetHolder({w:100,h:100, test: "testThree"});
      theThree.doMoveToNewParent({parent: theTwo,position: new HHgVector2(0,100), isScreenPos: false});
      theThree.setMouseable(true);
      theThree.setIsDraggable(true);
      //theTwo.doAddParagraphText({text: "HELLO USER!\nCustom Override is on", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      theThree.test = "testThree";
      //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
      theThree.doAddSprite("soccer");
      var rotate3 = theThree.makeAction("rotateBy", {rotation: -360, time: 10});
      var move3 = theThree.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
      var scale3 = theThree.makeAction("scaleBy", {scale:1, time: 10});
      theThree.doStoredAction(rotate3);
      theTwo.doStoredAction(move3);
      //theTwo.doStoredAction(scale3);


      //setTimeout(theOne.doStoredAction.bind(theOne, scale1), 1000);
      // setTimeout(theTwo.doStoredAction.bind(theTwo, scale), 3000);

      //setTimeout(theOne.doStoredAction.bind(theOne, move1), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, rotate), 3000);
      //setTimeout(theTwo.doStoredAction.bind(theTwo, move), 5000);


      //****there may be issues with placement by parent or absolute placement, when dragging, maybe id conflicts or someting, in rotate demo
      //something about dragging a child is somehow affecting the parent.
      return;
    }
    //END TEST

//============================ PERFORMANCE ROTATION TEST =====================
    if(false){

      var theOne = HHgGetHolder({w:100,h:100});
      theOne.doMoveToNewParent({position: new HHgVector2(0,800), isScreenPos: false});
      theOne.doAddSprite("pool");
      theOne.test = "pool";
      theOne.setMouseable(true);
      theOne.setIsDraggable(true);

      var listOfHolders = [];
      listOfHolders.push(theOne);

      theOne.doActionMoveInScreenBy({x:0,y: -700,time: 14, easeIn: 20 });
      theOne.doActionRotateForever(HHg.returnRandomInt(1,35));
      //theOne.doActionFollowQuad({cx: 0, cy: 540, x: 800, y: -540, time: 10, easeIn: 25, easeOut: 25 })
      //theOne.doActionRotateBy({rotation:360,time: 30});
      //theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});

      var randomSprite = function(holder){
        var int1 = HHg.returnRandomInt(0,3);
        var name = "orange";
        if(int1 === 0){
          name = "soccer";
        }else if(int1 === 2){
          name = "pool";
        }
        holder.doAddSprite(name);
      };

      for(var i = 0; i < 25; i++){
        var size = HHg.returnRandomInt(60,220);
        var posx = HHg.returnRandomInt(-1000,1000);
        var posy = HHg.returnRandomInt(-500,500);
        var testBall = HHgGetHolder({w:size,h:size});

        testBall.doMoveToNewParent( {parent: listOfHolders[ HHg.returnRandomInt(0, listOfHolders.length) ] , position: new HHgVector2(posx, posy) });
        randomSprite(testBall);
        testBall.setMouseable(true);
        testBall.setIsDraggable(true);

        //testBall.doAddCSSClass("testDiv");

        //testBall.doActionRotateBy({rotation:360,time: 30});

        testBall.doActionRotateForever(HHg.returnRandomInt(1,35));
        testBall.doAddParagraphText({text: "" + i, color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});

        listOfHolders.push(testBall)
      }
      return;
    }
    //END TEST

    //MORE TESTS
  }
};//END HHgGame Replacement
