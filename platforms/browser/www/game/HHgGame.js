



  //Setting test override in HHgTests.js disables this file for testing
  //otherwise it's the hook in for all custom gameplay

if(window.HHgTestsOverride !== true){

  HHgGame.doStart = function(){
    //============= YOUR GAME LOGIC STARTS HERE ==============
    //========                                       =========
    //========================================================
    HHg.warn("start game");

    // Everything in the HHg Engine is a Holder (HHgHolder)
    // if you want art, text, buttons, UI, it's all going to be an HHgHolder
    // Make a holder
    // add it to a parent (the main holder by default)
      // add any of the following:
      // a sprite
      // a colored shape
      // a border
      // an action (move, rotate, scale, sound, timer) (sequence or cluster)
      // text (paragraph or canvas text)
      // override mouse down/ move/ up functions on holder
  };

  //called at the beginning of every frame by HHgActionManager
  //note, it's not neccessary to use the game loop
  //holder actions are already calculated per frame
  //and events are processed at the end of every frame
  //but if you wanted to add a physics system or the like
  //doLoop is the hook into the requestAnimationFrame loop
  HHgGame.doLoop = function(deltaTime){

  };
}


