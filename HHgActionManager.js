

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

  doMakePath: function(){

    //make canvas
    //add to div, mainly scene I would guess
    //do context and path


/*
    beginPath()
    closePath()
    moveTo(x, y)
    lineTo(x, y)
    rect(x, y, width, height)*
    quadraticCurveTo(cpx, cpy, x, y)
    bezierCurveTo(cp1x, cp2y, cp2x, cp2y, x, y)
    arc(x, y, radius, startAngle, endAngle, anticlockwise)
    arcTo(x1, y1, x2, y2, radius)

    //quad curve
     context.beginPath();

        // Start
        context.moveTo(75, 200);

        // Control point (first two numbers) and end point (second two numbers)
        context.quadraticCurveTo(25, 53, 525, 200);

    context.stroke();
  }

  //bezier
   context.beginPath();
        
        // Start
        context.moveTo(75, 200);

        // Control point 1 (first two numbers), Control point 2 (second two numbers) and 
        // end point (last two numbers)
        context.bezierCurveTo(210, 30, 365, 30, 525, 200);

    context.stroke();

    //svg path
    <path d="M100,250 C138,87 397,252 400,250" />

    <svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
*/

}
};

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
 
  this.actionLoop(function( deltaT, now ) {
    
    for(i = 0; i < HHgActionManager._actionList.length; i++){
      HHgActionManager._actionList[i].whatShouldIDoThisFrame(deltaT, now);
    }

    return true;

  } );







}











