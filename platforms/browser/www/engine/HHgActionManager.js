var HHgForce30FPS = false; //these are for testing only, as they bypass the animationframe loop
var HHgForce15FPS = false;
var HHgForce5FPS = false;
var HHgPaused = false;
var HHgShowFPS = true;

var HHgActionManager = {
  _actionList: {},
  doAddAction: function (owner) {
    this._actionList[owner.getHash()] = owner;
  },

  doRemoveOwner: function (owner) {
    delete this._actionList[owner.getHash()];
  },

  doActionsForHolders: function (interval) {
    var tempHolder;
    var tempAction;
    var tempActionsObject;
    var key;
    for (key in this._actionList) {
      tempHolder = this._actionList[key];
      if (tempHolder.getPaused() === true || tempHolder.firstUpdate !== true) continue;
      tempActionsObject = tempHolder.getActions();
      for (key in tempActionsObject) {
        tempAction = tempActionsObject[key];
        if (!tempAction) {
          HHg.warn("Undefined Action being processed");
          continue;
        }
        if (tempAction.paused === true) continue; //TODO handle cluster or sequence pausing
        if (tempAction.isSequence === true) continue; //hack around, even though sequences are timers (for length), to ensure it only completes when its final action completes.
        if (tempAction.isCluster === true) continue;
        tempAction.whatShouldIDoThisFrame(interval);
      }
    }
  }
};

(function () {
  if ("performance" in window == false) {
    window.performance = {};
  }
  Date.now = (Date.now || function () {
    return new Date().getTime();
  });
  if ("now" in window.performance == false) {
    var nowOffset = Date.now();
    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart
    }
    window.performance.now = function now() {
      return Date.now() - nowOffset;
    }
  }
})();

HHgActionManager.actionLoop = function (animateActions) {
  var lastFrameTime;
  var deltaT;
  var lowEnd = 1; //TODO, cooper, revisit
  var highEnd = 160;

  function recurse(thisFrameTime) {
    window.requestAnimationFrame(recurse);
    thisFrameTime = thisFrameTime && thisFrameTime > highEnd ? thisFrameTime : window.performance.now();
    lastFrameTime = lastFrameTime || thisFrameTime;
    deltaT = thisFrameTime - lastFrameTime;

    if (deltaT > highEnd) {
      deltaT = highEnd;
    }
    if (deltaT > lowEnd) {
      animateActions(deltaT);
      lastFrameTime = thisFrameTime;
    }
  }

  recurse();
};

HHgActionManager.doStart = function () {
  if (HHgForce30FPS || HHgForce15FPS || HHgForce5FPS) {
    var interval = 1.0 / 30.0,
      frameInterval = interval * 1000.0;

    if (HHgForce15FPS) {
      interval = 1.0 / 15.0;
      frameInterval = interval * 1000.0;
    }

    if (HHgForce5FPS) {
      interval = 1.0 / 5.0;
      frameInterval = interval * 1000.0;
    }

    window.setInterval(function () {
      if (!HHgPaused) {
        HHgGame.doLoop(interval);
        HHgActionManager.doActionsForHolders(interval);
        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
      }
    }, frameInterval);
  } else {
    this.actionLoop(function (deltaT) {
      HHgGame.doLoop(deltaT / 1000);
      HHgActionManager.doActionsForHolders(deltaT / 1000);
      HHgScene.doEndOfFrame();
      HHgScene.doUpdateHolders();
    });
  }
};