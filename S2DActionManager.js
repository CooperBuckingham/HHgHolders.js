var S2DActionManager = {
  listOfActions: [];
  addActionToHolder: function(actionObj,holder){

  }

}





(function( window, Date ) {

  window.S2DActionManager.actionLoop = function( animateActions ) {
    var shouldContinueLoop = true;
    var lastFrameTime = +new Date;
    function recurse( thisFrameTime ) {
      if ( shouldContinueLoop !== false ) {
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


function start(){
  window.S2DActionManager.actionLoop(function( deltaT, now ) {
    // rendering code goes here
    // return false; will stop the loop
    console.log("Time: " + deltaT/1000);
    return true;

  } );
}






