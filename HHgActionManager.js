

window.HHgActionManager = {};
var paused = false;

(function( window, Date ) {

  window.HHgActionManager.actionLoop = function( animateActions ) {
    var shouldContinueLoop = true;
    var lastFrameTime = +new Date;
    function recurse( thisFrameTime ) {
      if ( shouldContinueLoop !== false || paused === true ) {
        window.requestAnimationFrame(recurse);
        thisFrameTime = thisFrameTime && thisFrameTime > 500 ? thisFrameTime : +new Date;
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
})( window, Date );


function startHHgActionManager(){
  window.HHgActionManager.actionLoop(function( deltaT, now ) {
    // rendering code goes here
    // return false; will stop the loop
    //console.log("Time: " + deltaT/1000);




    return true;

  } );
}








