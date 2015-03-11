var HHgForce30FPS = true;
var HHgPaused = false;

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

  if(HHgForce30FPS){
    var interval = 1.0 / 30.0,
      frameInterval = interval * 1000.0;
    console.log(interval);
       
    window.setInterval(function(){
     

       if(!HHgPaused){
        for(i = 0; i < HHgActionManager._actionList.length; i++){
          HHgActionManager._actionList[i].whatShouldIDoThisFrame(interval);
        }

        HHgScene.doEndOfFrame();
        HHgScene.doUpdateHolders();
       }
      

    }, frameInterval );

  }else{
      this.actionLoop(function( deltaT ) {
     
      for(i = 0; i < HHgActionManager._actionList.length; i++){
        HHgActionManager._actionList[i].whatShouldIDoThisFrame(deltaT/1000);
      }

      HHgScene.doEndOfFrame();
      HHgScene.doUpdateHolders();

      } );
  }
 
}











