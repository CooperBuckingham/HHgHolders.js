var HHgMouse = {}; //TODO: add timer vars to check if click is really a click?

(function () {
  var m = HHgMouse;

  m.clickedDownOn;
  m.draggingOriginalPosXY;
  m.draggingMouseOriginalPosXY;
  m.draggingOffsetXY;

  m.dragging;
  m.lastMousePosXY;
  m.thisMousePosXY;

  m.lastFrameTime;
  m.thisFrameTime;
  m.mouseCircle;

  m.doStart = function () {
    m.mouseCircle = HHgGetHolder({w: 25, h: 25, zIndex: 100});
    m.mouseCircle.doMoveToNewParent({parent: HHgGameHolder, position: HHg0Vector, isScreenPos: true});
    m.mouseCircle.doAddSprite("mouse");
    m.mouseCircle.setVisible(false);
    m.mouseCircle.setMouseable(false);
    HHgScene.doAddMouseDownAndUpListeners();
  };

  m.doResetVars = function () {
    m.clickedDownOn = undefined;
    m.lastMousePosXY = undefined;

    m.thisMousePosXY = undefined;

    m.lastFrameTime = undefined;
    m.thisFrameTime = undefined;
    m.dragging = undefined;
    m.draggingOriginalPosXY = undefined;
    m.draggingMouseOriginalPosXY = undefined;
    m.draggingOffsetXY = undefined;
  };

  m.doSetVars = function (holder, xy) {
    m.clickedDownOn = holder;
    m.lastMousePosXY = xy;

    m.thisMousePosXY = xy;
    m.thisFrameTime = window.performance.now();
    m.lastFrameTime = m.thisFrameTime;

    if (holder.isDraggable) {
      m.dragging = holder;
      m.draggingOriginalPosXY = holder.getPositionInScreenOriginal();
      m.draggingMouseOriginalPosXY = xy;
      m.draggingOffsetXY = xy.subtractedFrom(m.draggingOriginalPosXY);
    }
  };

  m.doUpdateVars = function (xy) {
    m.lastMousePosXY = m.thisMousePosXY;
    m.thisMousePosXY = xy;
    m.lastFrameTime = m.thisFrameTime;
    m.thisFrameTime = window.performance.now();
  };

  m.testIfInScene = function (xy) {
    if (xy.y < HHgScreen.maxh / -2 || xy.y > HHgScreen.maxh / 2) {
      return false;
    }
    return true;
  };

  m.doMouseMove = function (xy) {
    if (!m.testIfInScene(xy)) {
      m.doMouseCancel(undefined, xy);
      return;
    }
    m.mouseCircle.doHide();

    if (m.dragging) {
      m.doUpdateVars(xy);
      m.dragging.doMouseMove();
    }
  };

  m.doMouseDown = function (holders, xy) {
    if (!m.testIfInScene(xy)) {
      m.doMouseCancel(undefined, xy);
      return;
    }
    m.mouseCircle.doShow(xy);

    if (!holders || holders.length < 1) {
      return;
    }

    m.doSetVars(holders[0], xy);
    m.clickedDownOn.doMouseDown();

    if (m.clickedDownOn.isDraggable) {
      m.clickedDownOn.doStartMouseMove();
    }
  };

  var isOverClickedDown = false;

  m.doMouseUp = function (holders, xy) {
    m.mouseCircle.doHide();
    m.doUpdateVars(xy);

    if (m.clickedDownOn === undefined) {
      return;
    }

    if (holders) {
      for (var i = 0; i < holders.length; i++) {
        if (holders[i] === m.clickedDownOn) {

          isOverClickedDown = true;
          break;
        }
      }
    }

    m.clickedDownOn.doMouseUp(isOverClickedDown);

    if (m.dragging) {
      m.dragging.doEndMouseMove();
    }

    isOverClickedDown = false;

    m.doResetVars();
  };

  m.doMouseCancel = function (holders, xy) {
    m.doMouseUp(holders, xy);
  };
})();






