
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
    var textOne = HHgGetHolder({w:100,h:100});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-600,400), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddParagraphText({text: "X\nX\nX", color: "#cccccc", vAlign: "bottom", hAlign: "right", fontSize: "12", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      textOne.doAddBorder(5);

       var textOne = HHgGetHolder({w:100,h:100});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-600,0), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddParagraphText({text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW", color: "#cccccc", vAlign: "bottom", hAlign: "right", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      textOne.doAddBorder(5);

    // var theOne = HHgGetHolder({w:100,h:100});
    //   theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(0,0), isScreenPos: true});
    //   theOne.setMouseable(true);
    //   theOne.setIsDraggable(true);
    //   theOne.doAddParagraphText({text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
    //   theOne.test = "testOne";
    //   theOne.doMakeRectangle({borderRadius: 15, color: "green"});
    //   theOne.doAddBorder(5);
    //   var rotate1 = theOne.makeAction("rotateBy", {rotation: -360, time: 10});
    //   var move1 = theOne.makeAction("moveBy", {positionX: 480, positionY: 270 , time: 10});
    //   var scale1 = theOne.makeAction("scaleBy", {scaleX:1, scaleY: 3, time: 10});
    //   theOne.doStoredAction(rotate1);
    //   theOne.doStoredAction(move1);
    //   theOne.doStoredAction(scale1);

    //   var theTwo = HHgGetHolder({w:100,h:100, test: "testTwo"});
    //   theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(0,0), isScreenPos: true});
    //   theTwo.setMouseable(true);
    //   theTwo.setIsDraggable(true);
    //   theTwo.doAddParagraphText({text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
    //   theTwo.test = "testTwo";
    //   //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
    //   theTwo.doAddSprite("pool");
    //   var rotate2 = theTwo.makeAction("rotateBy", {rotation: 360, time: 10});
    //   var move2 = theTwo.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
    //   var scale2 = theTwo.makeAction("scaleBy", {scaleX: 1, scaleY: 1/3, time: 10});
    //   theTwo.doStoredAction(rotate2);
    //   theTwo.doStoredAction(move2);
    //   theTwo.doStoredAction(scale2);

    //   var theThree = HHgGetHolder({w:100,h:100, test: "testThree"});
    //   theThree.doMoveToNewParent({parent: theTwo,position: new HHgVector2(0,100), isScreenPos: false});
    //   theThree.setMouseable(true);
    //   theThree.setIsDraggable(true);
    //   theTwo.doAddParagraphText({text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 1, y: 1, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
    //   theThree.test = "testThree";
    //   //theTwo.doMakeRectangle({borderRadius: 15, color: "red"});
    //   theThree.doAddSprite("soccer");
    //   var rotate3 = theThree.makeAction("rotateBy", {rotation: -360, time: 10});
    //   var move3 = theThree.makeAction("moveBy", {positionX: 100, positionY: 100, time: 10});
    //   var scale3 = theThree.makeAction("scaleBy", {scale:1, time: 10});
    //   theThree.doStoredAction(rotate3);
    //   theTwo.doStoredAction(move3);
    //   //theTwo.doStoredAction(scale3);


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
    var parMoving = HHgGetHolder({w:100,h:100});
    parMoving.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-960,540), isScreenPos: true});
    parMoving.doMakeRectangle({borderRadius: 10, color: "green"});
    parMoving.doAddBorder(10);
    parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
    parMoving.doAddParagraphText({fontSize: "50", text: "10", color: "black"});
    var rotate1 = parMoving.makeAction("rotateBy", {rotation: 360, time: 5});
    var move1 = parMoving.makeAction("moveBy", {positionX: 960, positionY: -540 , time: 5});
    var scale1 = parMoving.makeAction("scaleBy", {scaleX:2, scaleY: 2, time: 5});
    parMoving.doStoredAction(rotate1);
    parMoving.doStoredAction(move1);
    parMoving.doStoredAction(scale1);

    var childMoving = HHgGetHolder({w:100,h:100, test: "testTwo"});
    childMoving.doMoveToNewParent({parent: parMoving,position: new HHgVector2(50,50), isScreenPos: false});
    childMoving.doAddBorder(10);
    childMoving.doMakeRectangle({borderRadius: 10, color: "red"});
    childMoving.doAddParagraphText({fontSize: "50", text: "10", color: "black"});
    var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
    var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
    var scale2 = childMoving.makeAction("scaleBy", {scaleX: 1, scaleY: 1, time: 10});
    //childMoving.doStoredAction(rotate2);
    //childMoving.doStoredAction(move2);
    //childMoving.doStoredAction(scale2);

    var parMoving = HHgGetHolder({w:400,h:400});
    parMoving.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(960,-540), isScreenPos: true});
    parMoving.doMakeRectangle({borderRadius: 20, color: "green"});
    parMoving.doAddBorder(40);
    parMoving.doAddParagraphText({fontSize: "200", text: "20", color: "black"});
    parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
    var rotate1 = parMoving.makeAction("rotateBy", {rotation: -360, time: 5});
    var move1 = parMoving.makeAction("moveBy", {positionX: -960, positionY: 540 , time: 5});
    var scale1 = parMoving.makeAction("scaleBy", {scaleX:.5, scaleY: .5, time: 5});
    parMoving.doStoredAction(rotate1);
    parMoving.doStoredAction(move1);
    parMoving.doStoredAction(scale1);

    var childMoving = HHgGetHolder({w:400,h:400, test: "testTwo"});
    childMoving.doMoveToNewParent({parent: parMoving,position: new HHgVector2(200,200), isScreenPos: false});
    childMoving.doAddBorder(40);
    childMoving.doAddParagraphText({fontSize: "200", text: "20", color: "black"});
    childMoving.doMakeRectangle({borderRadius: 20, color: "red"});
    var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
    var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
    var scale2 = childMoving.makeAction("scaleBy", {scaleX: 1, scaleY: 1, time: 10});
    //childMoving.doStoredAction(rotate2);
    //childMoving.doStoredAction(move2);
    //childMoving.doStoredAction(scale2);

    var parMoving = HHgGetHolder({w:100,h:100});
    parMoving.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-960,-540), isScreenPos: true});
    parMoving.doMakeRectangle({borderRadius: 5, color: "green"});
    parMoving.doAddBorder(10);
    parMoving.doAddParagraphText({fontSize: "50", text: "5", color: "black"});
    parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
    var rotate1 = parMoving.makeAction("rotateBy", {rotation: -360, time: 5});
    var move1 = parMoving.makeAction("moveBy", {positionX: 960, positionY: 540 , time: 5});
    var scale1 = parMoving.makeAction("scaleBy", {scaleX:2, scaleY: 2, time: 5});
    parMoving.doStoredAction(rotate1);
    parMoving.doStoredAction(move1);
    parMoving.doStoredAction(scale1);

    var childMoving = HHgGetHolder({w:10,h:10, test: "testTwo"});
    childMoving.doMoveToNewParent({parent: parMoving,position: new HHgVector2(50,50), isScreenPos: false});
    childMoving.doAddBorder(1.5);
    childMoving.doAddParagraphText({fontSize: "2", text: "this is a multiline paragraph of doom", color: "black"});
    childMoving.doMakeRectangle({borderRadius: 1, color: "red"});
    var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
    var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
    var scale2 = childMoving.makeAction("scaleBy", {scaleX: 10, scaleY: 10, time: 5});
    //childMoving.doStoredAction(rotate2);
    //childMoving.doStoredAction(move2);
    childMoving.doStoredAction(scale2);

    var parMovingTarget = HHgGetHolder({w:200,h:200});
    parMovingTarget.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(0,0), isScreenPos: true});
    parMovingTarget.doMakeRectangle({borderRadius: 10, color: "green"});
    parMovingTarget.doAddBorder(20);
    parMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});

    var childMovingTarget = HHgGetHolder({w:200,h:200, test: "testTwo"});
    childMovingTarget.doMoveToNewParent({parent: theOne,position: new HHgVector2(100,100), isScreenPos: false});
    childMovingTarget.doAddBorder(20);
    childMovingTarget.doMakeRectangle({borderRadius: 10, color: "red"});
    childMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});


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
