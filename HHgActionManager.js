

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
    function recurse( thisFrameTime ) {
      if ( shouldContinueLoop !== false && paused === false ) {
        window.requestAnimationFrame(recurse);
        thisFrameTime = thisFrameTime && thisFrameTime > 480 ? thisFrameTime : +new Date;
        var deltaT = thisFrameTime - lastFrameTime;
      // do not render frame when deltaT is too high
      if ( deltaT < 160 ) {

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











