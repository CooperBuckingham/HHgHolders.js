

window.HHgActionManager = {};
var paused = false;

HHgActionManager.actionLoop = function( animateActions ) {
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
  window.HHgActionManager.actionLoop(function( deltaT, now ) {
    
    HHgScene.test(deltaT, testContainer);




    return true;

  } );
}










