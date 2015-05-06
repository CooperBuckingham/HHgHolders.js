


(function(){

  //Setting test override in HHgTests.js disables this file
  //otherwise it's the hook in for all custom gameplay
  if(HHgTestsOverride === true) return;

  HHgGame.doStart = function(){

    //============= YOUR GAME LOGIC STARTS HERE ==============
    //========                                       =========
    //========================================================
    console.log("start game");

  }
})();
