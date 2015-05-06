


(function(){

  //Setting test override in HHgTests.js disables this file
  //otherwise it's the hook in for all custom gameplay
  if(HHgTestsOverride === true) return;

  HHgGame.doStart = function(){

    //============= YOUR GAME LOGIC STARTS HERE ==============
    //========                                       =========
    //========================================================
    console.log("start game");

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
  }
})();
