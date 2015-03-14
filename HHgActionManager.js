var HHgForce30FPS = false;
var HHgForce15FPS = false;
var HHgPaused = false;
var HHgTempHolder;
var HHgTempAction;
var HHgShowFPS = true;

var HHgActionManager = {
  _actionList: {},
  doAddAction: function(owner){
      this._actionList[owner.getHash()] = owner;
  },

  doRemoveOwner: function(owner){
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
  
  Date.now = (Date.now || function () { 
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







HHgActionManager.actionLoop = function( animateActions ) {

    var lastFrameTime = window.performance.now();
    var deltaT;
    var lowEnd = 1; //1 //.01
    var highEnd = 160; //160

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

    //var count = 0, average = 0, high = 0, low = 100, stored = 0; framesOver16 = 0; lastFrame = 0;

      this.actionLoop(function( deltaT ) {

        HHgActionManager.doActionsForHolders(deltaT/1000);

        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
        /*
        if(HHgShowFPS){
            
          count++;
          average += deltaT;
          if(high < deltaT) high = deltaT; if(low > deltaT)low = deltaT; if(deltaT > 34)framesOver16++;
          if(count === 30){
            count = 0;
            average = average / 30;
            average = 1000 / average;
            stored = "FPS: " + Math.round(average) + " high: " + Math.round(high) + " low: " + Math.round(low) + " #over: " + framesOver16;
            console.log(stored);
            high = 0; low = 100;
            average = 0;
            framesOver16 = 0;

          }
        }
        */
      
        

      } );
  }
 
}











