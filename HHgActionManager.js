

var HHgActionManager = {
  _actionList: [],
  doAddAction: function(action){
      this._actionList.push(action);
  },

  doRemoveAction: function(action){
    
    if(HHg.doRemoveThingFromArray(this._actionList, action)){
    }else{
      console.log("failed to find action to be removed");
    };
  },


};
//changed window.performance.now back to date, as ios was choking
// copyright Paul Irish 2015

(function(){
 
  if ("performance" in window == false) {
      window.performance = {};
  }
  
  Date.now = (Date.now || function () {  // thanks IE8
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



var paused = false;

HHgActionManager.actionLoop = function( animateActions ) {
    var shouldContinueLoop = true;
    var lastFrameTime = window.performance.now();
    var deltaT;
    function recurse( thisFrameTime ) {
      if ( shouldContinueLoop !== false && paused === false ) {
        HHgMain.requestAnimationFrame(recurse);
        thisFrameTime = thisFrameTime && thisFrameTime > 480 ? thisFrameTime : window.performance.now();
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
  var testCounter = 0;
 
  this.actionLoop(function( deltaT, now ) {
    //testCounter++;
    for(i = 0; i < HHgActionManager._actionList.length; i++){
      HHgActionManager._actionList[i].whatShouldIDoThisFrame(deltaT, now);
    }
    //test crap
    //if(testCounter % 4 === 0){
      //HHgTestDiv.getDiv().innerHTML = " " + Math.round(1000/deltaT) ;
      //}
    //}

    HHgScene.doEndOfFrame();
    HHgScene.doUpdateHolders();

    return true;

  } );







}











