

var HHgActionManager = {
  _actionList: [],
  doAddAction: function(action){
      this._actionList.push(action);
  },

  doRemoveAction: function(action){
    
    if(HHg.doRemoveThingFromArray(this._actionList, action)){
      console.log("action removed");
    }else{
      console.log("failed to find action to be removed");
    };
  },

};

var paused = false;

HHgActionManager.actionLoop = function( animateActions ) {
    var shouldContinueLoop = true;
    var lastFrameTime = +new Date;
    var deltaT;
    function recurse( thisFrameTime ) {
      if ( shouldContinueLoop !== false && paused === false ) {
        HHgMain.requestAnimationFrame(recurse);
        thisFrameTime = thisFrameTime && thisFrameTime > 480 ? thisFrameTime : +new Date;
        deltaT = thisFrameTime - lastFrameTime;
      if ( deltaT < 160 && deltaT > 1 ) {
        shouldContinueLoop = animateActions(deltaT, thisFrameTime);
      }
      lastFrameTime = thisFrameTime;
    }
  }
  recurse();

};

HHgActionManager.doStart = function(){
  var i;
 
  this.actionLoop(function( deltaT, now ) {
    
    for(i = 0; i < HHgActionManager._actionList.length; i++){
      HHgActionManager._actionList[i].whatShouldIDoThisFrame(deltaT, now);
    }

    return true;

  } );







}











