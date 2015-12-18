

var HHgMouse = {};

(function(){

  var mouse = HHgMouse;

  mouse.clickedDownOn;
  mouse.draggingOriginalPosXY;
  mouse.draggingMouseOriginalPosXY;
  mouse.draggingOffsetXY;

  mouse.dragging;
  mouse.lastMousePosXY;
  mouse.thisMousePosXY;

  mouse.lastFrameTime;
  mouse.thisFrameTime;
  mouse.mouseCircle;

  mouse.doStart = function(){

    mouse.mouseCircle = HHgGetHolder({w:25,h:25,zIndex: 100});
    mouse.mouseCircle.doMoveToNewParent({parent: HHgGameHolder, position: HHg0Vector, isScreenPos: true});
    mouse.mouseCircle.doAddSprite("mouse");
    mouse.mouseCircle.setVisible(false);
    mouse.mouseCircle.setMouseable(false);
    HHgScene.doAddMouseDownAndUpListeners();
  }

  mouse.doResetVars = function(){
    mouse.clickedDownOn = undefined;
    mouse.lastMousePosXY = undefined;

    mouse.thisMousePosXY = undefined;

    mouse.lastFrameTime = undefined;
    mouse.thisFrameTime = undefined;
    mouse.dragging = undefined;
    mouse.draggingOriginalPosXY = undefined;
    mouse.draggingMouseOriginalPosXY = undefined;
    mouse.draggingOffsetXY = undefined;


  }

  mouse.doSetVars = function(holder, xy){

    mouse.clickedDownOn = holder;
    mouse.lastMousePosXY = xy;

    mouse.thisMousePosXY = xy;
    mouse.thisFrameTime = window.performance.now();
    mouse.lastFrameTime = mouse.thisFrameTime;

    if(holder.draggable){
      mouse.dragging = holder;
      mouse.draggingOriginalPosXY = holder.getPositionInScreenOriginal();
      mouse.draggingMouseOriginalPosXY = xy;
      mouse.draggingOffsetXY = xy.subtractedFrom(mouse.draggingOriginalPosXY);
    }

  }

  mouse.doUpdateVars = function(xy){
    mouse.lastMousePosXY = mouse.thisMousePosXY;
    mouse.thisMousePosXY = xy;
    mouse.lastFrameTime = mouse.thisFrameTime;
    mouse.thisFrameTime = window.performance.now();

  }

  mouse.testIfInScene = function(xy){
    if(xy.y < HHgScreen.maxh / -2 || xy.y > HHgScreen.maxh / 2){
      return false;
    }
    return true;
  }

  mouse.doMouseMove = function (xy){
    if(!mouse.testIfInScene(xy)){
      mouse.doMouseCancel(undefined, xy);
      return;
    }
    mouse.mouseCircle.doHide();

    if(mouse.dragging){
      mouse.doUpdateVars(xy);
      mouse.dragging.doMouseMove();
    }
  }

  mouse.doMouseDown = function (holders, xy){
    if(!mouse.testIfInScene(xy)){
      mouse.doMouseCancel(undefined, xy);
      return;
    }
    mouse.mouseCircle.doShow(xy);

    if(!holders || holders.length < 1){
      return;
    }

      mouse.doSetVars(holders[0], xy);
      mouse.clickedDownOn.doMouseDown();

      if(mouse.clickedDownOn.draggable){
        mouse.clickedDownOn.doStartMouseMove();
      }

  }
  var isOverClickedDown = false;

  mouse.doMouseUp = function (holders, xy){

    mouse.mouseCircle.doHide();
    mouse.doUpdateVars(xy);

    if(mouse.clickedDownOn === undefined){
      return;
    }

    if(holders ){
      for(var i = 0; i < holders.length; i++){
        if(holders[i] === mouse.clickedDownOn){

          isOverClickedDown = true;
          break;
        }
      }
    }

    mouse.clickedDownOn.doMouseUp(isOverClickedDown);

    if(mouse.dragging){
      mouse.dragging.doEndMouseMove();
    }

    isOverClickedDown = false;

    mouse.doResetVars();

  }

  mouse.doMouseCancel = function(holders, xy){

    mouse.doMouseUp(holders, xy);
  }


})();






