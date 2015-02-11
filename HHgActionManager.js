

HHgMain.HHgActionManager = {
  actionList: [],
  doAddAction: function(action){
      this.actionList.push(action);
  },

  doRemoveAction: function(action){
    console.log("action manager remove start");
    if(HHg.doRemoveThingFromArray(this.actionList, action)){
      console.log("action removed");
    }else{
      console.log("failed to find action to be removed");
    };
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











