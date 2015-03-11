var HHgForce30FPS = false;
var HHgForce15FPS = false;
var HHgPaused = false;
var HHgTempHolder;
var HHgTempAction;

var HHgActionManager = {
  _actionList: {},
  doAddAction: function(owner){
      this._actionList[owner.getHash()] = owner;
  },

  doRemoveOwner: function(owner){
    console.log("do remove owner");
    delete this._actionList[owner.getHash()];
  },

  doActionsForHolders: function(interval){
    
    for(HHgTempHolder in this._actionList){
      HHgTempHolder= this._actionList[HHgTempHolder];
      if(HHgTempHolder.getPaused() === true) continue;

      for(HHgTempAction in HHgTempHolder.getActions()){
        HHgTempHolder.getActions()[HHgTempAction].whatShouldIDoThisFrame(interval);
      }

    }
  }


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
var lowEnd = .01; //1 //.01
var highEnd = 1600; //160

HHgActionManager.actionLoop = function( animateActions ) {

    var lastFrameTime = window.performance.now();
    var deltaT;
    function recurse( thisFrameTime ) {
      
        window.requestAnimationFrame(recurse);

        thisFrameTime = thisFrameTime && thisFrameTime > 480 ? thisFrameTime : window.performance.now();
        deltaT = thisFrameTime - lastFrameTime;
        

        if ( deltaT < highEnd && deltaT > lowEnd ) {
          animateActions(deltaT);
        }

        lastFrameTime = thisFrameTime;
    
  }
  recurse();

};


HHgActionManager.doStart = function(){
  var i;

  if(HHgForce30FPS || HHgForce15FPS){
    var interval = 1.0 / 30.0,
        frameInterval = interval * 1000.0;
    

    if(HHgForce15FPS){
      interval = 1.0 / 15.0;
      frameInterval = interval * 1000.0;
    }
       
    window.setInterval(function(){
     

       if(!HHgPaused){
        
        HHgActionManager.doActionsForHolders(interval);

        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
       }
      

    }, frameInterval );

  }else{
      this.actionLoop(function( deltaT ) {
     
        HHgActionManager.doActionsForHolders(deltaT/1000);

        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();

      } );
  }
 
}











