
window.HHgTestsOverride = true; //change this to true and game will begin in start function below
var HHgTestBodyData = null;

var HHgTestDashSceneDiv = false;

var HHgShowTestGrid = false;
var HHgTestBoxes = false;
var HHgDoWebsiteDemoDeploy = true;
var HHgActionDummy;


var HHgGame = {doStart: function(){
  //if HHgCustomOverride == true, then this function will start all custom game code
  //if false, then the doStart() function located in HHgGame.js will run the demo code selected


HHgTestBodyData = document.getElementsByTagName("body")[0].getAttribute('data-demo');
console.log("TEST", HHgTestBodyData);


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

  //site deploy
  if(HHgDoWebsiteDemoDeploy){
    var nav = document.createElement("div");
    nav.id = "WEBSITE_NAV";
    var innerNav = document.createElement('div');
    innerNav.id = "WEBSITE_NAV_BOX";
    nav.appendChild(innerNav);

    var lower = document.createElement("div");
    lower.id = "WEBSITE_LOWER";
    var innerLower = document.createElement('div');
    innerLower.id = "WEBSITE_LOWER_BOX";
    lower.appendChild(innerLower);



    var button;
    var buttonList = {};
    for(var i = 0; i < 7; i++){
      button = document.createElement("a");
      button.classList.add("WEBSITE_BUTTON");
      innerNav.appendChild(button);
      buttonList[i] = button;
      if(HHgTestBodyData === "1" && i === 2){
        button.classList.add("WEBSITE_BUTTON_ACTIVE");
        innerLower.innerHTML = "all 2d, drag things around. It's one class and one codebase";
      }else if(HHgTestBodyData === "2" && i === 3){
        button.classList.add("WEBSITE_BUTTON_ACTIVE");
        innerLower.innerHTML = "all native, all fast, just make holders and call methods on them";
      }else if(HHgTestBodyData === "3" && i === 4){
        button.classList.add("WEBSITE_BUTTON_ACTIVE");
        innerLower.innerHTML = "designed for games, but holders make anything";
      }else if(HHgTestBodyData === "4" && i === 5){
        button.classList.add("WEBSITE_BUTTON_ACTIVE");
        innerLower.innerHTML = "more games with complex actions";
      }
    }

    buttonList[1].innerHTML = "GITHUB";
    buttonList[1].setAttribute('href', "https://github.com/CHBDev/HHgHolders.js");
    buttonList[2].innerHTML = "DEMO1";
    buttonList[2].setAttribute('href', "./index.html");
    buttonList[3].innerHTML = "DEMO2";
    buttonList[3].setAttribute('href', "./index2.html");
    buttonList[4].innerHTML = "DEMO3";
    buttonList[4].setAttribute('href', "./index3.html");
    buttonList[5].innerHTML = "DEMO4";
    buttonList[5].setAttribute('href', "./index4.html");
    buttonList[6].innerHTML = "HHG";
    buttonList[6].setAttribute('href', "http://www.heavyhandedgames.com");

    document.body.appendChild(nav);
    document.body.appendChild(lower);

  }
    //==================== TEXT TESTS ==================
  if(false){
      var textOne = HHgGetHolder({w:400,h:400});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-600,400), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddParagraphText({text: "X\nX\nX", color: "#cccccc", vAlign: "top", hAlign: "right", fontSize: "50", shadow: {x: 5, y: 5, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      textOne.doAddBorder(5);

      var textOne = HHgGetHolder({w:400,h:400});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-600,0), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddParagraphText({text: "WWWWWXWWWWW\nWWWWWWWWWWXWWWWWWWWWW\nWWWWWXWWWWW", color: "#cccccc", vAlign: "center", hAlign: "right", fontSize: "50", shadow: {x: 5, y: 5, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      textOne.doAddBorder(5);

      var textOne = HHgGetHolder({w:400,h:400});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(600,400), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddCanvasText({text: "X\nX\nX", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 5, y: 5, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
      textOne.doAddBorder(5);

       var textOne = HHgGetHolder({w:400,h:400});
      textOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(0,0), isScreenPos: true});
      textOne.setMouseable(true);
      textOne.setIsDraggable(true);
      textOne.doAddSprite("pool");
      textOne.doAddCanvasText({text: "11111111111X11111111111\n2222X2222\n3333333333X3333333333", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 5, y: 5, color: new HHgColorRGBA(0,0,0,.37), blur: 0}});
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
   var thing = HHgGetHolder({w:100,h:100});
   thing.setMouseable(true);
   thing.setIsDraggable(true);
   var test = HHgGetHolder({w:50, h:50});
   thing.doMoveToNewParent();
   thing.doMakeRectangle({borderRadius: 10, color:"green"});
   test.doMoveToNewParent({x: 0, y: 0});
   test.doMakeRectangle({borderRadius: 5, color:"red"});
   var grow = thing.makeAction("scaleBy", {name: "grow", scale: 1.50, time: 2, onComplete: function(){console.log("GROW DONE")}});
   var move = thing.makeAction("moveBy", {name: "move", x: 50, y: 50, time: 2});
   var shrink = thing.makeAction("scaleBy", {scale: 0.5, time: 2});
   var grow2 = thing.makeAction("scaleBy", {scale: 2, time: 1});
   var timer1 = thing.makeAction('timer', {time: 1, onComplete:function(){console.log("TIMER1 DONE")}});
   var timer2 = thing.makeAction('timer', {time: 1, onComplete:function(){console.log("TIMER2 DONE")}});
   var clus1 = thing.makeActionCluster(grow, timer1);
   var clus2 = thing.makeActionCluster(move, timer2);
   var seq1 = thing.makeActionSequence(grow, move, shrink);
   var seq2 = thing.makeActionSequence(shrink, move, move);
   var finalSeq = thing.makeActionSequence(clus1, seq1, seq2, clus2);

   var up = thing.makeAction("scaleTo", {scale: 2, time: 1});
   var down = thing.makeAction("scaleTo", {scale: 1, time: 1});
   var beat = thing.makeActionSequence(up, down);
   var doubleBeat = thing.makeActionSequence(beat, beat);

   //var seq3 = thing.makeActionSequence([seq, timer2]);
   //var seq2 = thing.makeActionSequence([grow, move, shrink]);
   //var move2 = thing.makeAction("moveBy", {x: 100, y: 100, time: 2});
   //var seqAll = thing.makeActionSequence([grow, move, shrink, move2]);
   //thing.doActionSequence(seq);
    //thing.doActionSequence(seq);
   //thing.doAction(seq2);
   //setTimeout(thing.doAction.bind(thing, seq), 5000);
   // test.doAction(grow);


   thing.doActionSequenceForever(finalSeq);

  }

  if(false){


  }

  if(false){
    var parMoving = HHgGetHolder({w:100,h:100});
    parMoving.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-960,540), isScreenPos: true});
    parMoving.doMakeRectangle({borderRadius: 10, color: "green"});
    //parMoving.doAddBorder(4);
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
    //childMoving.doAddBorder(4);
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
    //parMoving.doAddBorder(4);
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
    //childMoving.doAddBorder(4);
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
    //parMoving.doAddBorder(4);
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
    //childMoving.doAddBorder(1.5);
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
    //parMovingTarget.doAddBorder(20);
    parMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});

    var childMovingTarget = HHgGetHolder({w:200,h:200, test: "testTwo"});
    childMovingTarget.doMoveToNewParent({parent: theOne,position: new HHgVector2(100,100), isScreenPos: false});
    childMovingTarget.doAddBorder(20);
    childMovingTarget.doMakeRectangle({borderRadius: 10, color: "red"});
    childMovingTarget.doAddParagraphText({fontSize: "100", text: "10", color: "black"});


    return;
  }
    //END TEST

    if(HHgTestBodyData === "4" && HHgDoWebsiteDemoDeploy){
      var leftPos = new HHgVector2( -960,0);
      var arcPos = new HHgVector2(0,270);
      var rightPos = new HHgVector2(960,0);


      var thing = HHgGetHolder({w: 200, h: 200});
      thing.doMoveToNewParent();
      thing.doAddSprite("soccer");
      thing.setMouseable(true);
      thing.setIsDraggable(true);

      var thing2 = HHgGetHolder({w: 100, h: 100});
      thing2.doMoveToNewParent({parent: thing});
      thing2.doAddSprite("soccer");

      var thing3 = HHgGetHolder({w: 50, h: 50});
      thing3.doMoveToNewParent({parent: thing2});
      thing3.doAddSprite("soccer");

      var sizeUp = thing2.makeAction("scaleTo", {scale: 2, time: 1});
      var sizeDown = thing2.makeAction("scaleTo", {scale: .5, time: 1});
      var up = thing3.makeAction("moveBy", {x: 0, y: 100, time: 1});
      var down = thing3.makeAction("moveBy", {x: 0, y: -100, time: 1});
      var right = thing.makeAction("followQuad", {control: arcPos, position: rightPos, time: 3});
      var left = thing.makeAction("followQuad", {control: arcPos, position: leftPos, time: 3});
      var rotateR = thing.makeAction("rotateBy", {rotate: 90, time: 1});
      var rotateL = thing.makeAction("rotateBy", {rotate: -90, time: .5});
      //var right = thing.makeAction('moveTo', {time: 1, position: rightPos});
      //var left = thing.makeAction('moveTo', {time: 1, position: leftPos });


      //TODO calling action sequence with the follow quad in it throws max stack error
      // thing.doStoredAction(right);
      // setTimeout(thing.doStoredAction.bind(thing, left), 3000);

      var bounce = thing.makeActionSequence([right, left]);
      var scale2 = thing.makeActionSequence([sizeUp, sizeDown]);
      var bob = thing.makeActionSequence([up, down]);
      var rotateRSeq = thing.makeActionSequence([rotateR]);
      var rotateLSeq = thing.makeActionSequence([rotateL]);

      thing.doActionSequenceForever(bounce);
      thing.doActionSequenceForever(rotateRSeq);
      thing2.doActionSequenceForever(rotateLSeq);
      thing3.doActionSequenceForever(bob);
    }

    if(HHgTestBodyData === "2" && HHgDoWebsiteDemoDeploy){
      var colorPicker = ["#111111", "#000000", "#110000", "#090909", "#151515","#000000", "#190009", "#190900", "#191105", "#222222", "#161616" ];
      var colorPicker2 = ["#ffffff", "#ffffff", "#ffffff", "#ff6644", "#cccccc","#aaaaaa", "#ffffff", "#ffffff", "#gggggg", "#aaaaaa", "#bbbbbb" ];


      var tWidth = 1920;
      var tHeight = 1080;
      var tSide = Math.floor( 1920 / 30);

      function colorRandom(){
        return Math.floor((Math.random() * colorPicker.length - 1) + 1);
      }

      function changeBlock(){
        if(Math.random() > .7){
          return true;
        }
        return false;
      }

      function randomTime(){
        return (Math.random() * 100);
      }

      HHgGame.doNewColorLoop = function (){
        var arr = HHgGame.demoDivs;
        for(var i = 0; i < arr.length; i++){
          if(changeBlock() === true){
             arr[i].setBackgroundColor(colorPicker[colorRandom()]);
          }
        }

        var func = function(){
          HHgGame.doNewColorLoop();
        }
        var time = randomTime()/1000;
        if(!HHgActionDummy){
          var temp = HHgGetHolder({w:0,y:0});
          temp.doAddToNewParent();
          HHgActionDummy = temp;
        }

        HHgActionDummy.doActionTimer({cb:func, time: time});
      }

      HHgGame.demoDivs = [];
      var xNum = 1920 / tSide * .5
      var yNum = 1920 / tSide * .5

      var doMouseDown = function(){
        this.doRemoveActionByName("mousedownscale");
        this.setScaleStored();
        this.setZIndexBy(1);
        this.doAddBorder({width: 2, color: "white"});
        this.doActionScaleForever({scaleX:2, scaleY: 2, name: "mousedownscale"});
        //this.doActionPlaySound("click");
        //this.doActionRotateForever({speed:-300, name: "mousemoverotate"});
      }

      var doMouseUp = function(mouseWasOverWhenReleased){
        this.doRemoveActionByName("mousedownscale");
        this.doActionScaleForever({scaleX:.94, scaleY: .94, name: "mousedownscale"});

        this.isBeingDragged = false;
      };


      for(var x = -xNum; x < xNum; x++){

        for(var y = -yNum; y < yNum; y++){

          topPos = y * tSide + tSide * .5;
          leftPos = x * tSide + tSide * .5;
          var holder = HHgGetHolder({w: tSide -1, h: tSide -1});
          HHgGame.demoDivs.push(holder);
          holder.doAddToNewParent({x:leftPos,y:topPos});
          holder.doMakeRectangle({color:colorPicker[colorRandom()] });
          holder.setIsDraggable( true);
          holder.setMouseable(true);
          holder.doMouseDown = doMouseDown;
          holder.doMouseUp = doMouseUp;

        }
      }

      HHgGame.doNewColorLoop();
    }

    if(HHgTestBodyData === "3" && HHgDoWebsiteDemoDeploy){
      //do game thing here maybe
      //temp copy of test 1
      console.log("DEMO 3");
       var theOne = HHgGetHolder({w:100,h:100});
        theOne.doMoveToNewParent({position: new HHgVector2(0,800), isScreenPos: false});
        theOne.doAddSprite("pool");
        theOne.test = "pool";
        theOne.setMouseable(true);
        theOne.setIsDraggable(true);

        var listOfHolders = [];
        listOfHolders.push(theOne);

        theOne.doActionMoveInScreenBy({x:0,y: -700,time: 14, easeIn: 20 });
        theOne.doActionRotateForever({rotation: HHg.returnRandomInt(1,35)});
        //theOne.doActionFollowQuad({cx: 0, cy: 540, x: 800, y: -540, time: 10, easeIn: 25, easeOut: 25 })
        //theOne.doActionRotateBy({rotation:360,time: 30});
        theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30}); //crashes?

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

        for(var i = 0; i < 100; i++){
          var size = HHg.returnRandomInt(100,175);
          var posx = HHg.returnRandomInt(-1000,1000);
          var posy = HHg.returnRandomInt(-500,500);
          var testBall = HHgGetHolder({w:size,h:size});

          testBall.doMoveToNewParent( {parent: listOfHolders[ HHg.returnRandomInt(0, listOfHolders.length) ] , position: new HHgVector2(posx, posy) });
          randomSprite(testBall);
          testBall.setMouseable(true);
          testBall.setIsDraggable(true);

          //testBall.doAddCSSClass("testDiv");

          //testBall.doActionRotateBy({rotation:360,time: 30});

          testBall.doActionRotateForever({rotation: HHg.returnRandomInt(1,35)});
          //testBall.doAddParagraphText({text: "" + i, color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});

          listOfHolders.push(testBall)
        }
        return;
    }

//============================ PERFORMANCE ROTATION TEST =====================
    if(HHgTestBodyData === "1" && HHgDoWebsiteDemoDeploy){

        //theOne.doActionFollowQuad({cx: 0, cy: 540, x: 800, y: -540, time: 10, easeIn: 25, easeOut: 25 })
        //theOne.doActionRotateBy({rotation:360,time: 30});
        //theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});
        console.log("LOADING DEMO 1");
        var listOfHolders = [];

        var randomColor = function(holder){
          var int1 = HHg.returnRandomInt(0,4);
          var color = "white";
          if(int1 === 0){
            color = "black";
          }else if(int1 === 2){
            color = "#444444";
          }else if(int1 === 3){
            color = "#cc4444"
          }
          holder.doMakeRectangle({borderRadius:"100",  color: color});
        };


        var doMouseDown = function(){
          this.doActionScaleBy({scale: .9, time: 0});
          this.setBackgroundColor("#ff4444");
        };

        var doMouseUp = function(mouseWasOverWhenReleased){
          this.doActionScaleBy({scale: 1/.9, time: 0});
          this.isBeingDragged = false;
          this.setBackgroundColor("#cc4444");
        };

        for(var i = 0; i < 30; i++){
          var testBall = HHgGetHolder({w:100,h:100});
          listOfHolders.push(testBall);
          testBall.doMoveToNewParent( {x: (-240 + i * 20), y: (-135 + i * 20) });
          randomColor(testBall);
          testBall.doActionRotateForever({rotation:12});
          var act1 = testBall.makeAction("scaleTo",{scale: .6, time: 3});
          var act2 = testBall.makeAction("scaleTo",{scale: 1, time: 10});
          var seq = testBall.makeActionSequence([act1, act2] );

          testBall.doActionSequence(seq);
          testBall.setMouseable(true);
          testBall.setIsDraggable(true);
          testBall.doMouseDown = doMouseDown;
            testBall.doMouseUp = doMouseUp;


        }

        for(var i = 0; i < listOfHolders.length; i++){
          for(var j = 0; j < 6; j++){
            testBall = HHgGetHolder({w:(i+10) * 10, h:(i+10)*10});
            testBall.doMoveToNewParent({parent:listOfHolders[i], x: j * i * 100 % 3, y: j * i * 100 % 2});
            var act1 = testBall.makeAction("moveBy",{x: 240, y:135, time:3});
            var act2 = testBall.makeAction("moveBy",{x: -240,y:-135, time: 10});
            var seq = testBall.makeActionSequence([act1, act2] );
            testBall.doActionSequence(seq);
            randomColor(testBall);
            testBall.setMouseable(true);
            testBall.setIsDraggable(true);
            testBall.doActionRotateForever({rotation: 12});
            testBall.doMouseDown = doMouseDown;
            testBall.doMouseUp = doMouseUp;
          }

          testBall.doActionRotateForever({rotation: HHg.returnRandomInt(1,35)});
          //testBall.doAddParagraphText({text: "" + i, color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "50", shadow: {x: 3, y: 3, color: "#000000", blur: 2}});
        }
        return;
      }
    //END TEST

    //MORE TESTS
  }
  ,
  doLoop: function(deltaTime){

  }
};//END HHgGame Replacement

