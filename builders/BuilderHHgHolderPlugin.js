var HHgTestBoxes = false;

var HHgBuilderLeftHolder;
var HHgBuilderRightHolder;
var HHgBuilderBottomHolder;

var HHgBuilderDirtyData = false;
var HHgBuilderNav;
var HHgBuilderNavDataToolbar;

var HHgGame = {
  doGalaxyTest: function(disableIfFalse) {
    if (disableIfFalse === false) return;

    //do game thing here maybe
    //temp copy of test 1
    HHg.warn("DEMO 3");
    var theOne = HHgGetHolder({w: 100, h: 100});
    theOne.doMoveToNewParent({position: new HHgVector2(0, 800), isScreenPos: false});
    theOne.doAddSprite("pool");
    theOne.test = "pool";
    theOne.setMouseable(true);
    theOne.setIsDraggable(true);

    var listOfHolders = [];
    listOfHolders.push(theOne);

    theOne.doActionMoveInScreenBy({x: 0, y: -700, time: 14, easeIn: 20});
    theOne.doActionRotateForever({rotation: HHg.returnRandomInt(1, 35)});
    //theOne.doActionFollowQuad({cx: 0, cy: 540, x: 800, y: -540, time: 10, easeIn: 25, easeOut: 25 })
    //theOne.doActionRotateBy({rotation:360,time: 30});
    theOne.doActionScaleTo({scaleX: 0.25, scaleY: 0.25, time: 30}); //crashes?

    var randomSprite = function (holder) {
      var int1 = HHg.returnRandomInt(0, 3);
      var name = "orange";
      if (int1 === 0) {
        name = "soccer";
      } else if (int1 === 2) {
        name = "pool";
      }
      holder.doAddSprite(name);
    };

    for (var i = 0; i < 100; i++) {
      var size = HHg.returnRandomInt(100, 175);
      var posx = HHg.returnRandomInt(-1000, 1000);
      var posy = HHg.returnRandomInt(-500, 500);
      var testBall = HHgGetHolder({w: size, h: size});

      testBall.doMoveToNewParent({
        parent: listOfHolders[HHg.returnRandomInt(0, listOfHolders.length)],
        position: new HHgVector2(posx, posy)
      });
      randomSprite(testBall);
      testBall.setMouseable(true);
      testBall.setIsDraggable(true);

      //testBall.doAddCSSClass("testDiv");

      //testBall.doActionRotateBy({rotation:360,time: 30});

      testBall.doActionRotateForever({rotation: HHg.returnRandomInt(1, 35)});
      //testBall.doAddParagraphText({text: "" + i, color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});

      listOfHolders.push(testBall)
    }
  },
  addTestGrid: function(disableIfFalse) {
    if (disableIfFalse === false) return;

    var lineUp = HHgGetHolder({w: 3, h: 1080});
      lineUp.doMoveToNewParent();
      lineUp.doMakeRectangle({color: "black"});

      var lineUp = HHgGetHolder({w: 1920, h: 3});
      lineUp.doMoveToNewParent();
      lineUp.doMakeRectangle({color: "black"});

      var lineUp = HHgGetHolder({w: 3, h: 1080});
      lineUp.doMoveToNewParent({position: new HHgVector2(-480, 0)});
      lineUp.doMakeRectangle({color: "black"});

      var lineUp = HHgGetHolder({w: 3, h: 1080});
      lineUp.doMoveToNewParent({position: new HHgVector2(480, 0)});
      lineUp.doMakeRectangle({color: "black"});

      var lineUp = HHgGetHolder({w: 1920, h: 3});
      lineUp.doMoveToNewParent({position: new HHgVector2(0, -270)});
      lineUp.doMakeRectangle({color: "black"});

      var lineUp = HHgGetHolder({w: 1920, h: 3});
      lineUp.doMoveToNewParent({position: new HHgVector2(0, 270)});
      lineUp.doMakeRectangle({color: "black"});

  },
  doTests: function(disableIfFalse) {
    if (disableIfFalse === false) return;
    //===============================================
    //forever tests
    if (false) {
      for (var i = 25; i < 200; i += 1) {
        var thing = HHgGetHolder({w: 100 + i, h: 100 + i});
        thing.setMouseable(true);
        thing.setIsDraggable(true);
        thing.doMoveToNewParent();
        thing.doMakeRectangle({borderRadius: 10, color: new HHgColorRGBA(i, i, i, 1)});
        var moveX = thing.makeAction('moveBy', {x: 1 + i, y: 0, time: 1 + 1});
        var moveY = thing.makeAction('moveBy', {y: 1 + i, x: 0, time: 1 + 1});
        var moveBackX = thing.makeAction('moveBy', {x: -1 - i, y: 0, time: 1 + 1});
        var moveBackY = thing.makeAction('moveBy', {y: -1 - i, x: 0, time: 1 + 1});
        var clusterMove = thing.makeActionCluster([moveX, moveY]);
        var clusterMoveBack = thing.makeActionCluster([moveBackX, moveBackY]);
        var sequence = thing.makeActionSequence([clusterMove, clusterMoveBack]);

        thing.doActionSequence(sequence, true);
      }
    }

    if (false) {
      var parMoving = HHgGetHolder({w: 100, h: 100});
      parMoving.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(-960, 540), isScreenPos: true});
      parMoving.doMakeRectangle({borderRadius: 10, color: "green"});
      //parMoving.doAddBorder(4);
      parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
      parMoving.doAddParagraphText({fontSize: "50", text: "10", color: "black"});
      var rotate1 = parMoving.makeAction("rotateBy", {rotation: 360, time: 5});
      var move1 = parMoving.makeAction("moveBy", {positionX: 960, positionY: -540, time: 5});
      var scale1 = parMoving.makeAction("scaleBy", {scaleX: 2, scaleY: 2, time: 5});
      parMoving.doStoredAction(rotate1);
      parMoving.doStoredAction(move1);
      parMoving.doStoredAction(scale1);

      var childMoving = HHgGetHolder({w: 100, h: 100, test: "testTwo"});
      childMoving.doMoveToNewParent({parent: parMoving, position: new HHgVector2(50, 50), isScreenPos: false});
      //childMoving.doAddBorder(4);
      childMoving.doMakeRectangle({borderRadius: 10, color: "red"});
      childMoving.doAddParagraphText({fontSize: "50", text: "10", color: "black"});
      var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
      var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
      var scale2 = childMoving.makeAction("scaleBy", {scaleX: 1, scaleY: 1, time: 10});
      //childMoving.doStoredAction(rotate2);
      //childMoving.doStoredAction(move2);
      //childMoving.doStoredAction(scale2);

      var parMoving = HHgGetHolder({w: 400, h: 400});
      parMoving.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(960, -540), isScreenPos: true});
      parMoving.doMakeRectangle({borderRadius: 20, color: "green"});
      //parMoving.doAddBorder(4);
      parMoving.doAddParagraphText({fontSize: "200", text: "20", color: "black"});
      parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
      var rotate1 = parMoving.makeAction("rotateBy", {rotation: -360, time: 5});
      var move1 = parMoving.makeAction("moveBy", {positionX: -960, positionY: 540, time: 5});
      var scale1 = parMoving.makeAction("scaleBy", {scaleX: .5, scaleY: .5, time: 5});
      parMoving.doStoredAction(rotate1);
      parMoving.doStoredAction(move1);
      parMoving.doStoredAction(scale1);

      var childMoving = HHgGetHolder({w: 400, h: 400, test: "testTwo"});
      childMoving.doMoveToNewParent({parent: parMoving, position: new HHgVector2(200, 200), isScreenPos: false});
      //childMoving.doAddBorder(4);
      childMoving.doAddParagraphText({fontSize: "200", text: "20", color: "black"});
      childMoving.doMakeRectangle({borderRadius: 20, color: "red"});
      var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
      var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
      var scale2 = childMoving.makeAction("scaleBy", {scaleX: 1, scaleY: 1, time: 10});
      //childMoving.doStoredAction(rotate2);
      //childMoving.doStoredAction(move2);
      //childMoving.doStoredAction(scale2);

      var parMoving = HHgGetHolder({w: 100, h: 100});
      parMoving.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(-960, -540), isScreenPos: true});
      parMoving.doMakeRectangle({borderRadius: 5, color: "green"});
      //parMoving.doAddBorder(4);
      parMoving.doAddParagraphText({fontSize: "50", text: "5", color: "black"});
      parMoving.setMouseable(true);
      parMoving.setIsDraggable(true);
      var rotate1 = parMoving.makeAction("rotateBy", {rotation: -360, time: 5});
      var move1 = parMoving.makeAction("moveBy", {positionX: 960, positionY: 540, time: 5});
      var scale1 = parMoving.makeAction("scaleBy", {scaleX: 2, scaleY: 2, time: 5});
      parMoving.doStoredAction(rotate1);
      parMoving.doStoredAction(move1);
      parMoving.doStoredAction(scale1);

      var childMoving = HHgGetHolder({w: 10, h: 10, test: "testTwo"});
      childMoving.doMoveToNewParent({parent: parMoving, position: new HHgVector2(50, 50), isScreenPos: false});
      //childMoving.doAddBorder(1.5);
      childMoving.doAddParagraphText({fontSize: "2", text: "this is a multiline paragraph of doom", color: "black"});
      childMoving.doMakeRectangle({borderRadius: 1, color: "red"});
      var rotate2 = childMoving.makeAction("rotateBy", {rotation: 180, time: 10});
      var move2 = childMoving.makeAction("moveBy", {positionX: 500, positionY: 0, time: 10});
      var scale2 = childMoving.makeAction("scaleBy", {scaleX: 10, scaleY: 10, time: 5});
      //childMoving.doStoredAction(rotate2);
      //childMoving.doStoredAction(move2);
      childMoving.doStoredAction(scale2);

      var parMovingTarget = HHgGetHolder({w: 200, h: 200});
      parMovingTarget.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(0, 0), isScreenPos: true});
      parMovingTarget.doMakeRectangle({borderRadius: 10, color: "green"});
      //parMovingTarget.doAddBorder(20);
      parMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});

      // var childMovingTarget = HHgGetHolder({w: 200, h: 200, test: "testTwo"});
      // childMovingTarget.doMoveToNewParent({parent: theOne, position: new HHgVector2(100, 100), isScreenPos: false});
      // childMovingTarget.doAddBorder(20);
      // childMovingTarget.doMakeRectangle({borderRadius: 10, color: "red"});
      // childMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});
    }
  },
  doClickTests: function(disableIfFalse) {
    if (disableIfFalse === false) return;
    var behindCenter = HHgGetHolder({w:400, h:400, scale: 2});
    var center = HHgGetHolder({w:400, h:400, scale: 2, rotation: 45, hackIsCenter: true});
    var left = HHgGetHolder({w:300, h:100, scale: .5, rotation: 137});
    var right = HHgGetHolder({w:100, h:300, scale: 1.6, rotation: 19});

    center.test = "CENTER";
    HHgBuilderRightHolder.addChild(behindCenter);
    HHgBuilderRightHolder.addChild(center);

    left.addToParent({parent: right, x: -200, y:0});
    right.addToParent({parent: center, x: 400, y:0});

    behindCenter.setBackgroundColor("orange");
    center.setBackgroundColor("red");
    center.doAddCSSClass("CENTER");
    left.setBackgroundColor("blue");
    right.setBackgroundColor("green");

    var revertColor = function() {
      this.setBackgroundColor(this.lastBackgroundColor);
    };
    var printName = function() {
      this.lastBackgroundColor = this.getBackgroundColor();
      this.setBackgroundColor("black");
      this.doActionTimer({time: 2, onComplete: revertColor});
      HHg.warn("Clicked on: ", this.test);
    };

    behindCenter.setMouseable(true);
    behindCenter.setMouseClick(printName);
    center.setMouseable(true);
    center.setMouseClick(printName);
    right.setMouseable(true);
    right.setMouseClick(printName);
    right.doActionRotateForever(10);
    left.setMouseable(true);
    left.setMouseClick(printName);
    left.doActionRotateForever(20);

  },
  doScaleTests: function(disableIfFalse) {
    if (disableIfFalse === false) return;
    var spinner = HHgGetHolder({w: 500, h: 500});
    //spinner.doActionRotateForever({speed: 15});
    spinner.addToParent({parent: HHgBuilderRightHolder});
    spinner.doMakeRectangle({color: "orange", borderRadius: 25});
    spinner.setMouseable(true);
    spinner.doActionScaleBy({time:0, scale:.5});
    spinner.doMouseDown = function() {
      this.setScaleStored();
      this.doActionScaleBy({scale: .5, time: 1});
      this.setBackgroundColor("blue");
      // thingOnSpinner.setScaleStored();
      // thingOnSpinner.doActionScaleBy({scale: .5, time: 1});
    };
    spinner.doMouseUp = function() {
      this.setScaleToStored();
      this.setBackgroundColor("orange");
      // thingOnSpinner.setScaleToStored();
      // thingOnSpinner.setBackgroundColor("green");
    };

    var thingOnSpinner = HHgGetHolder({w: 250, h: 250});
    //thingOnSpinner.doActionRotateForever({speed: -5});
    thingOnSpinner.addToParent({parent: spinner, x: 250, y: 250});
    thingOnSpinner.doMakeRectangle({color: "green", borderRadius: 25});
    // thingOnSpinner.setMouseable(true);
    // thingOnSpinner.setIsDraggable(true);
    // thingOnSpinner.test = "ONSPINNER";


  },
  setupUI: function() {
    HHgBuilderLeftHolder = HHgGetHolder({w:640, h:1080});
    HHgBuilderLeftHolder.doMoveToNewParent();
    HHgBuilderLeftHolder.alignHLeft();
    HHgBuilderLeftHolder.doMakeRectangle({color: "gray", borderRadius: 25});

    HHgBuilderRightHolder = HHgGetHolder({w:1920, h:1080, scale:(.6666)});
    HHgBuilderRightHolder.test = "RIGHT";
    HHgBuilderRightHolder.doAddCSSClass("RIGHTHOLDER");
    HHgBuilderRightHolder.doMoveToNewParent();
    HHgBuilderRightHolder.alignHRight();
    HHgBuilderRightHolder.alignVTop();

    // HHgBuilderRightHolder.alignHRight();
    // HHgBuilderRightHolder.alignVTop();
    HHgBuilderRightHolder.setBackgroundColor(buildHHgColorRGBA({r:0, g:0, b:0, a:.3}));

    if (true) {
      for (var i = 1; i < 12; i++) {
        var line = HHgGetHolder({w: 3, h: 1080});
        var slot = 160;
        var val = (i - 6) * slot;
        line.doMoveToNewParent({parent: HHgBuilderRightHolder, x: val});
        line.doMakeRectangle({color: "black"});
      }
    }

    if (true) {
      for (var i = 1; i < 12; i++) {
        var line = HHgGetHolder({w: 1920, h: 3});
        var slot = 90;
        var val = (i - 6) * slot;
        line.doMoveToNewParent({parent: HHgBuilderRightHolder, x: 0, y: val});
        line.doMakeRectangle({color: "black"});
      }
    }

    HHgBuilderBottomHolder = HHgGetHolder({w:1280, h:360});
    HHgBuilderBottomHolder.doMoveToNewParent();
    HHgBuilderBottomHolder.alignVBottom();
    HHgBuilderBottomHolder.alignHRight();
    HHgBuilderBottomHolder.doMakeRectangle({color: "gray", borderRadius: 25});

    HHgBuilderNav = HHgGetHolder({w: "100%", h: "5%"});
    HHgBuilderLeftHolder.addChild(HHgBuilderNav);
    HHgBuilderNav.alignVTop();

    var changerButtons = HHgGetHolder({w:"50%", h:"100%"});
    HHgBuilderNav.addChild(changerButtons);
    changerButtons.alignHLeft();

    var characterButton = HHgGetHolder({w:"50%", h:"100%"});
    changerButtons.addChild(characterButton);
    characterButton.alignHLeft();
    characterButton.doMakeRectangle({color: "black", borderRadius: 25});
    characterButton.doAddParagraphText({text: "CHARACTERS", color: "white", vAlign: "center", hAlign: "center"});
    characterButton.changeToButton(function() {
      HHgBuilderChangeToCharacter();
    });

    var levelButton = HHgGetHolder({w:"50%", h:"100%"});
    changerButtons.addChild(levelButton);
    levelButton.alignHRight();
    levelButton.doMakeRectangle({color: "black", borderRadius: 25});
    levelButton.doAddParagraphText({text: "LEVELS", color: "white", vAlign: "center", hAlign: "center"});
    levelButton.changeToButton(function() {
      HHgBuilderChangeToLevel();
    });
  },
  doStart: function () {

    HHgGame.setupUI();
    HHgGame.addTestGrid(false);
    HHgGame.doTests(false);
    HHgGame.doClickTests(false);
    HHgGame.doScaleTests(true);
    HHgGame.doGalaxyTest(false);



  },
  doLoop: function (deltaTime) {

  }
};
