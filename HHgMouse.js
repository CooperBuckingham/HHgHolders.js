

var HHgMouse = {};

(function(){

  var that = HHgMouse;

  that.clickedDownOn;
  that.draggingOriginalPosXY;
  that.draggingMouseOriginalPosXY;
  that.draggingOffsetXY;

  that.dragging;
  that.lastMousePosXY;
  that.thisMousePosXY;

  that.lastFrameTime;
  that.thisFrameTime;
  that.mouseCircle;

  that.doStart = function(){

    that.mouseCircle = HHgGetHolder({w:25,h:25,zIndex: 100});
    that.mouseCircle.doMoveToNewParent({parent: HHgGameHolder, position: HHg0Vector, isScreenPos: true});
    that.mouseCircle.doAddSprite("mouse");
    that.mouseCircle.setVisible(false);
    that.mouseCircle.setMouseable(false);
    HHgScene.doAddMouseDownAndUpListeners();
  }

  that.doResetVars = function(){
    that.clickedDownOn = undefined;
    that.lastMousePosXY = undefined;

    that.thisMousePosXY = undefined;

    that.lastFrameTime = undefined;
    that.thisFrameTime = undefined;
    that.dragging = undefined;
    that.draggingOriginalPosXY = undefined;
    that.draggingMouseOriginalPosXY = undefined;
    that.draggingOffsetXY = undefined;


  }

  that.doSetVars = function(holder, xy){

    that.clickedDownOn = holder;
    that.lastMousePosXY = xy;

    that.thisMousePosXY = xy;
    that.thisFrameTime = window.performance.now();
    that.lastFrameTime = that.thisFrameTime;

    if(holder.isDraggable){
      that.dragging = holder;
      that.draggingOriginalPosXY = holder.getPositionInScreenOriginal();
      that.draggingMouseOriginalPosXY = xy;
      that.draggingOffsetXY = xy.subtractedFrom(that.draggingOriginalPosXY);
    }

  }

  that.doUpdateVars = function(xy){
    that.lastMousePosXY = that.thisMousePosXY;
    that.thisMousePosXY = xy;
    that.lastFrameTime = that.thisFrameTime;
    that.thisFrameTime = window.performance.now();

  }

  that.doMouseMove = function (xy){
    that.mouseCircle.doHide();

    if(that.dragging){
      that.doUpdateVars(xy);
      that.dragging.doMouseMove();
    }

  }

  that.doMouseDown = function (holders, xy){
    that.mouseCircle.doShow(xy);

    if(!holders || holders.length < 1){

      return;
    }

      that.doSetVars(holders[0], xy);
      that.clickedDownOn.doMouseDown();

      if(that.clickedDownOn.isDraggable){
        that.clickedDownOn.doStartMouseMove();
      }

  }
  var isOverClickedDown = false;

  that.doMouseUp = function (holders, xy){

    that.mouseCircle.doHide();
    that.doUpdateVars(xy);

    if(that.clickedDownOn === undefined){
      return;
    }

    if(holders ){
      for(var i = 0; i < holders.length; i++){
        if(holders[i] === that.clickedDownOn){

          isOverClickedDown = true;
          break;
        }
      }
    }

    that.clickedDownOn.doMouseUp(isOverClickedDown);

    if(that.dragging){
      that.dragging.doEndMouseMove();
    }

    isOverClickedDown = false;

    that.doResetVars();

  }

  that.doMouseCancel = function(holders, xy){

    that.doMouseUp(holders, xy);
  }


})();






