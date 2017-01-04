window.HHgTestsOverride = true; //change this to true and game will begin in start function below
var HHgTestBodyData = null;

var HHgTestDashSceneDiv = false;

var HHgShowTestGrid = true;
var HHgTestBoxes = false;
var HHgActionDummy;


var HHgGame = {
  doStart: function () {
    //if HHgCustomOverride == true, then this function will start all custom game code
    //if false, then the doStart() function located in HHgGame.js will run the demo code selected
    if (HHgShowTestGrid) {
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
    }

    //site deploy
    //==================== TEXT TESTS ==================
    if (false) {
      var textOne = HHgGetHolder({w: 400, h: 400});
      textOne.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(-600, 400), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddParagraphText({
        text: "X\nX\nX",
        color: "#cccccc",
        vAlign: "top",
        hAlign: "right",
        fontSize: "50",
        shadow: {x: 5, y: 5, color: new HHgColorRGBA(0, 0, 0, .37), blur: 0}
      });
      textOne.doAddBorder(5);

      var textOne = HHgGetHolder({w: 400, h: 400});
      textOne.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(-600, 0), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddParagraphText({
        text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW",
        color: "#cccccc",
        vAlign: "center",
        hAlign: "right",
        fontSize: "50",
        shadow: {x: 5, y: 5, color: new HHgColorRGBA(0, 0, 0, .37), blur: 0}
      });
      textOne.doAddBorder(5);

      var textOne = HHgGetHolder({w: 400, h: 400});
      textOne.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(600, 400), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddCanvasText({
        text: "X\nX\nX",
        color: "#cccccc",
        vAlign: "center",
        hAlign: "center",
        fontSize: "50",
        shadow: {x: 5, y: 5, color: new HHgColorRGBA(0, 0, 0, .37), blur: 0}
      });
      textOne.doAddBorder(5);

      var textOne = HHgGetHolder({w: 400, h: 400});
      textOne.doMoveToNewParent({parent: HHgGameHolder, position: new HHgVector2(0, 0), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddCanvasText({
        text: "11111111111X11111111111\n2222X2222\n3333333333X3333333333",
        color: "#cccccc",
        vAlign: "center",
        hAlign: "center",
        fontSize: "50",
        shadow: {x: 5, y: 5, color: new HHgColorRGBA(0, 0, 0, .37), blur: 0}
      });
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
    if (false) {
      var thing = HHgGetHolder({w: 100, h: 100});
      thing.setMouseable(true);
      thing.setIsDraggable(true);
      var test = HHgGetHolder({w: 50, h: 50});
      thing.doMoveToNewParent();
      thing.doMakeRectangle({borderRadius: 10, color: "green"});
      test.doMoveToNewParent({x: 0, y: 0});
      test.doMakeRectangle({borderRadius: 5, color: "red"});
      var grow = thing.makeAction("scaleBy", {
        name: "grow", scale: 1.50, time: 2, onComplete: function () {
          HHg.warn("GROW DONE")
        }
      });
      var move = thing.makeAction("moveBy", {name: "move", x: 50, y: 50, time: 2});
      var shrink = thing.makeAction("scaleBy", {scale: 0.5, time: 2});
      var grow2 = thing.makeAction("scaleBy", {scale: 2, time: 1});
      var timer1 = thing.makeAction('timer', {
        time: 1, onComplete: function () {
          HHg.warn("TIMER1 DONE")
        }
      });
      var timer2 = thing.makeAction('timer', {
        time: 1, onComplete: function () {
          HHg.warn("TIMER2 DONE")
        }
      });


    }

    //Sequences
    if (false) {
      var thing = HHgGetHolder({w: 150, h: 100});
      thing.setMouseable(true);
      thing.setIsDraggable(true);
      thing.doMoveToNewParent();
      thing.doMakeRectangle({borderRadius: 10, color: "green"});

      var move = thing.makeAction('moveBy', {
        name: 'move1', x: 480, y: 0, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for Move")
        }
      });
      var moveBack = thing.makeAction('moveBy', {
        name: 'move2', x: -480, y: 0, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for MOveBack")
        }
      });
      var grow = thing.makeAction("scaleTo", {
        name: "grow", scale: 1.50, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for Grow")
        }
      });
      var shrink = thing.makeAction("scaleTo", {name: "shrink", scale: .5, time: 1});

      var pause = thing.makeAction("timer", {name: 'timer', time: 1});
      var moveThenBack = thing.makeActionSequence([move, moveBack], 'moveThenback', function () {
        HHg.warn('onComplete Function for moveThenBack')
      });

      var rotateRight = thing.makeAction('rotateBy', {name: 'rotateRight', degrees: 45, time: 1});
      var rotateAndGrowCluster = thing.makeActionCluster([rotateRight, grow], 'clus1', function () {
        HHg.warn('onComplete Function for clus1')
      });
      var seq1 = thing.makeActionSequence([move, moveBack], 'seq1', function () {
        HHg.warn('onComplete Function for seq1')
      });
      //var seq3 = thing.makeActionSequence([seq2, clus1], 'seq3', function(){HHg.warn('onComplete Function for SEQ3')});

      thing.doActionSequence(seq1, true);

    }
    ;

    //clusters
    if (false) {
      var thing = HHgGetHolder({w: 150, h: 100});
      thing.setMouseable(true);
      thing.setIsDraggable(true);
      thing.doMoveToNewParent();
      thing.doMakeRectangle({borderRadius: 10, color: "green"});

      var move = thing.makeAction('moveBy', {
        name: 'move1', x: 480, y: 0, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for Move")
        }
      });
      var moveBack = thing.makeAction('moveBy', {
        name: 'move2', x: -480, y: 0, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for MOveBack")
        }
      });
      var grow = thing.makeAction("scaleTo", {
        name: "grow", scale: 1.50, time: 1, onComplete: function () {
          HHg.warn("onComplete Function for Grow")
        }
      });
      var shrink = thing.makeAction("scaleTo", {name: "shrink", scale: .5, time: 1});

      var pause = thing.makeAction("timer", {name: 'timer', time: 1});
      var moveThenBack = thing.makeActionSequence([move, moveBack], 'moveThenback', function () {
        HHg.warn('onComplete Function for moveThenBack')
      });

      var rotateRight = thing.makeAction('rotateBy', {name: 'rotateRight', degrees: 45, time: 1});
      var rotateLeft = thing.makeAction('rotateBy', {name: 'rotateLeft', degrees: -45, time: 1});
      var rotateAndGrowCluster = thing.makeActionCluster([rotateRight, grow], 'clus1', function () {
        HHg.warn('onComplete Function for clus1')
      });
      var rotateAndShrinkCluster = thing.makeActionCluster([rotateLeft, shrink], 'clus2');
      var seq1 = thing.makeActionSequence([move, moveBack, rotateAndGrowCluster,], 'seq1', function () {
        HHg.warn('onComplete Function for seq1')
      });
      //var seq3 = thing.makeActionSequence([seq2, clus1], 'seq3', function(){HHg.warn('onComplete Function for SEQ3')});

      thing.doActionSequence(seq1, true);
    }

    //forever tests
    if (true) {
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

      var childMovingTarget = HHgGetHolder({w: 200, h: 200, test: "testTwo"});
      childMovingTarget.doMoveToNewParent({parent: theOne, position: new HHgVector2(100, 100), isScreenPos: false});
      childMovingTarget.doAddBorder(20);
      childMovingTarget.doMakeRectangle({borderRadius: 10, color: "red"});
      childMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});

      return;
    }
    //END TEST

    if (HHgTestBodyData === "3" && HHgDoWebsiteDemoDeploy) {

      var button1 = HHgGetHolder({w: 200, h: 80});
      var button2 = HHgGetHolder({w: 200, h: 80});
      var button3 = HHgGetHolder({w: 200, h: 80});

      button1.addToParent({x: -250, y: -440});
      button2.addToParent({x: 0, y: -440});
      button3.addToParent({x: 250, y: -440});

      button1.makeRectangle({radius: 20, color: "#44cccc"});
      button2.makeRectangle({radius: 20, color: new HHgColorRGBA(120, 220, 76)});
      button3.makeRectangle({radius: 20, R: 80, G: 50, B: 160});

      button1.addText({text: "Click Me", shadow: {x: 2, y: 2}});
      button2.addText({text: "Click Me", shadow: {x: 2, y: 2}});
      button3.addText({text: "Click Me", shadow: {x: 2, y: 2}});

      var fireBall = function () {
        var randomSize = HHgRandomInt(50, 250);
        var randomFinish = HHgVector(HHgRandomInt(-960, 960), HHgRandomInt(-540, 540));
        var randomXControl = HHgVector(0, 0);
        var randomSpeed = HHgRandomInt(5, 30) / 10;
        var aBall = HHgGetHolder({size: randomSize});

        aBall.addToParent({position: this.getPosition()});
        aBall.addSprite("soccer", this.getBackgroundColor());
        aBall.doAction("followQuad", {middle: randomXControl, end: randomFinish, time: randomSpeed, easeOut: 5});
        aBall.doAction("scaleTo", {scale: .3, time: randomSpeed, easeOut: 5});
      }

      button1.setMouseable(true);
      button2.setMouseable(true);
      button3.setMouseable(true);

      button1.mouseClick = fireBall;
      button2.mouseClick = fireBall;
      button3.mouseClick = fireBall;

    }

    if (HHgTestBodyData === "4" && HHgDoWebsiteDemoDeploy) {
      var colorPicker = ["#111111", "#44bbbb", "#110000", "#090909", "#151515", "#44cccc", "#190009", "#190900", "#191105", "#222222", "#161616"];
      var colorPicker2 = ["#ffffff", "#ffffff", "#ffffff", "#ff6644", "#cccccc", "#aaaaaa", "#ffffff", "#ffffff", "#gggggg", "#aaaaaa", "#bbbbbb"];


      var tWidth = 1920;
      var tHeight = 1080;
      var tSide = Math.floor(1920 / 30);

      function colorRandom() {
        return Math.floor((Math.random() * colorPicker.length - 1) + 1);
      }

      function changeBlock() {
        if (Math.random() > .7) {
          return true;
        }
        return false;
      }

      function randomTime() {
        return (Math.random() * 100);
      }

      HHgGame.doNewColorLoop = function () {
        var arr = HHgGame.demoDivs;
        for (var i = 0; i < arr.length; i++) {
          if (changeBlock() === true) {
            arr[i].setBackgroundColor(colorPicker[colorRandom()]);
          }
        }

        var func = function () {
          HHgGame.doNewColorLoop();
        }
        var time = randomTime() / 1000;
        if (!HHgActionDummy) {
          var temp = HHgGetHolder({w: 0, y: 0});
          temp.doMoveToNewParent();
          HHgActionDummy = temp;
        }

        HHgActionDummy.doActionTimer({cb: func, time: time});
      }

      HHgGame.demoDivs = [];
      var xNum = 1920 / tSide * .5
      var yNum = 1920 / tSide * .5

      var doMouseDown = function () {
        this.doRemoveActionByName("mousedownscale");
        this.setScaleStored();
        this.setZIndexBy(1);
        this.doAddBorder({width: 2, color: "white"});
        this.doActionScaleForever({scaleX: 2, scaleY: 2, name: "mousedownscale"});
        //this.doActionPlaySound("click");
        //this.doActionRotateForever({speed:-300, name: "mousemoverotate"});
      }

      var doMouseUp = function (mouseWasOverWhenReleased) {
        this.doRemoveActionByName("mousedownscale");
        this.doActionScaleForever({scaleX: .94, scaleY: .94, name: "mousedownscale"});

        this.isBeingDragged = false;
      };


      for (var x = -xNum; x < xNum; x++) {

        for (var y = -yNum; y < yNum; y++) {

          topPos = y * tSide + tSide * .5;
          leftPos = x * tSide + tSide * .5;
          var holder = HHgGetHolder({w: tSide - 1, h: tSide - 1});
          HHgGame.demoDivs.push(holder);
          holder.doMoveToNewParent({x: leftPos, y: topPos});
          holder.doMakeRectangle({color: colorPicker[colorRandom()]});
          holder.setIsDraggable(true);
          holder.setMouseable(true);
          holder.doMouseDown = doMouseDown;
          holder.doMouseUp = doMouseUp;

        }
      }

      HHgGame.doNewColorLoop();
    }

    if (false) {
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
      return;
    }

//============================ PERFORMANCE ROTATION TEST =====================
    if (true) {

      //theOne.doActionFollowQuad({cx: 0, cy: 540, x: 800, y: -540, time: 10, easeIn: 25, easeOut: 25 })
      //theOne.doActionRotateBy({rotation:360,time: 30});
      //theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});
      HHg.warn("LOADING DEMO 1");
      var listOfHolders = [];

      var randomColor = function (holder) {
        var int1 = HHg.returnRandomInt(0, 4);
        var color = "white";
        if (int1 === 0) {
          color = "black";
        } else if (int1 === 2) {
          color = "#444444";
        } else if (int1 === 3) {
          color = "#cc4444"
        }
        holder.doMakeRectangle({borderRadius: "100", color: color});
      };


      var doMouseDown = function () {
        this.doActionScaleBy({scale: .9, time: 0});
        this.setBackgroundColor("#ff4444");
      };

      var doMouseUp = function (mouseWasOverWhenReleased) {
        this.doActionScaleBy({scale: 1 / .9, time: 0});
        this.isBeingDragged = false;
        this.setBackgroundColor("#cc4444");
      };

      for (var i = 0; i < 30; i++) {
        var testBall = HHgGetHolder({w: 100, h: 100});
        listOfHolders.push(testBall);
        testBall.doMoveToNewParent({x: (-240 + i * 20), y: (-135 + i * 20)});
        randomColor(testBall);
        testBall.doActionRotateForever({rotation: 12});
        var act1 = testBall.makeAction("scaleTo", {scale: .6, time: 3});
        var act2 = testBall.makeAction("scaleTo", {scale: 1, time: 10});
        var seq = testBall.makeActionSequence([act1, act2]);

        testBall.doActionSequence(seq);
        testBall.setMouseable(true);
        testBall.setIsDraggable(true);
        testBall.doMouseDown = doMouseDown;
        testBall.doMouseUp = doMouseUp;
      }

      for (var i = 0; i < listOfHolders.length; i++) {
        for (var j = 0; j < 6; j++) {
          testBall = HHgGetHolder({w: (i + 10) * 10, h: (i + 10) * 10});
          testBall.doMoveToNewParent({parent: listOfHolders[i], x: j * i * 100 % 3, y: j * i * 100 % 2});
          var act1 = testBall.makeAction("moveBy", {x: 240, y: 135, time: 3});
          var act2 = testBall.makeAction("moveBy", {x: -240, y: -135, time: 10});
          var seq = testBall.makeActionSequence([act1, act2]);
          testBall.doActionSequence(seq);
          randomColor(testBall);
          testBall.setMouseable(true);
          testBall.setIsDraggable(true);
          testBall.doActionRotateForever({rotation: 12});
          testBall.doMouseDown = doMouseDown;
          testBall.doMouseUp = doMouseUp;
        }

        testBall.doActionRotateForever({rotation: HHg.returnRandomInt(1, 35)});
        //testBall.doAddParagraphText({text: "" + i, color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});
      }
      return;
    }
    //END TEST

    //MORE TESTS
  }
  ,
  doLoop: function (deltaTime) {

  }
};//END HHgGame Replacement

