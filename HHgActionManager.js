

HHgMain.HHgActionManager = {
  actionList: [],
  addAction: function(action){
      this.actionList.push(action);
  },

  removeAction: function(action){
    HHg.doRemoveThingFromArray(this.actionList, action);
  },

};

var paused = false;

HHgMain.HHgActionManager.actionLoop = function( animateActions ) {
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


function doStartHHgActionManager(){
  var i;
  var theActionList = HHgActionManager.actionList;
  HHgMain.HHgActionManager.actionLoop(function( deltaT, now ) {
    
    for(i = 0; i < theActionList.length; i++){
      theActionList[i].whatShouldIDoThisFrame(deltaT, now);
    }

    return true;

  } );
}











