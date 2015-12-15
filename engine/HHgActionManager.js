var HHgForce30FPS = false; //these are for testing only, as they bypass the animationframe loop
var HHgForce15FPS = false;
var HHgForce5FPS = false;
var HHgPaused = false;
var HHgTempHolder;
var HHgTempAction;
var HHgTempActionsObject;
var HHgTempAction2;
var HHgShowFPS = true;

var HHgActionManager = {
  _actionList: {},
  doAddAction: function(owner){
      this._actionList[owner.getHash()] = owner;
  },

  doRemoveOwner: function(owner){
    delete this._actionList[owner.getHash()];
  },

  doActionsForHolders: function(interval){

    for(HHgTempHolder in this._actionList){
      HHgTempHolder = this._actionList[HHgTempHolder];
      if(HHgTempHolder.getPaused() === true || HHgTempHolder.firstUpdate !== true) continue;
      HHgTempActionsObject = HHgTempHolder.getActions()
      for(HHgTempAction in HHgTempActionsObject){
        HHgTempAction2 = HHgTempActionsObject[HHgTempAction];
        if(!HHgTempAction2){
          console.log("Undefined Action being processed");
          continue;
        }
        if(HHgTempAction2.paused === true) continue; //TODO handle cluster or sequence pausing
        if(HHgTempAction2.isSequence === true) continue; //hack around, even though sequences are timers (for length), to ensure it only completes when its final action completes.
        HHgTempAction2.whatShouldIDoThisFrame(interval);
      }
    }
  }
};

(function(){
  if ("performance" in window == false) {
      window.performance = {};
  }
  Date.now = (Date.now || function () {
    return new Date().getTime();
  });
  if ("now" in window.performance == false){
    var nowOffset = Date.now();
    if (performance.timing && performance.timing.navigationStart){
      nowOffset = performance.timing.navigationStart
    }
    window.performance.now = function now(){
      return Date.now() - nowOffset;
    }
  }
})();

HHgActionManager.actionLoop = function( animateActions ) {
    var lastFrameTime;
    var deltaT;
    var lowEnd = 1;
    var highEnd = 160;

    function recurse( thisFrameTime ) {
        window.requestAnimationFrame(recurse);
        thisFrameTime = thisFrameTime && thisFrameTime > highEnd ? thisFrameTime : window.performance.now();
        lastFrameTime = lastFrameTime || thisFrameTime;
        deltaT = thisFrameTime - lastFrameTime;

        if (deltaT >  highEnd){
          deltaT = highEnd;
        }
        if(deltaT > lowEnd){
          animateActions(deltaT);
          lastFrameTime = thisFrameTime;
        }
    }
  recurse();
};

HHgActionManager.doStart = function(){
  var i;

  if(HHgForce30FPS || HHgForce15FPS || HHgForce5FPS){
    var interval = 1.0 / 30.0,
        frameInterval = interval * 1000.0;

   if(HHgForce15FPS){
      interval = 1.0 / 15.0;
      frameInterval = interval * 1000.0;
    }

    if(HHgForce5FPS){
      interval = 1.0 / 5.0;
      frameInterval = interval * 1000.0;
    }

    window.setInterval(function(){
       if(!HHgPaused){
        HHgGame.doLoop(interval);
        HHgActionManager.doActionsForHolders(interval);
        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
       }
    }, frameInterval );
  }else{
      this.actionLoop(function( deltaT ) {
        HHgGame.doLoop(deltaT/1000);
        HHgActionManager.doActionsForHolders(deltaT/1000);
        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
      } );
  }
};











