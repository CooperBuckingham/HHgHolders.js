<pre>
//====================================================================
HHgEngine v0.3.2
by Cooper Buckingham
HeavyHandedGames.com

This is a simple 2d engine, written in javascript, that makes use of all
traditional HTML and CSS elements but extrapolates them into a standard
sprite system, akin to Cocos2d or Apple's SpriteKit.

The standard usage is to use only javascript, and then allow the engine
to handle the rest. But all elements remain as standard DIVs so any
modifications can be made to HTML/CSS/Javascript that would be made to
a standard web page.

The engine functions entirely independantly of the DOM, except for HHgScene.js
which updates all the visible elements per frame. HHgScene could be modified
to "translate" the engine's data into any one of a number of visual forms.

The engine is most notably missing a physics system, but in general is not
really designed to be a thousands of things bouncing and updating engine.
Though one could easily be added and then use updates on HHgHolders.


Doc v0.0.5
//====================================================================

1. The scene will automatically scale visually to the width of the screen.
  a. But all measurements are done on a point system of 1920/1080.
    aa. so even if you are on a tiny phone, or in a small browser window, you would still use 1920 as screen width.
  b. All of these settings can be changed in HHgScene.js

2. HHgLoadingScreen.js is loaded before any engine processing takes place.

3. HHgGame.doStart() is called by the scene once setup is finished.
  a. Your specific code to start your game goes here.

4. HHgActionManager runs a loop which essentially has 3 steps per frame:
  a. calculate outcomes of all HHgActions.
  b. calculate final results of these on all HHgHolders.
  c. tell scene to update all visual elements.

5. HHgHolder is the only visual element in the engine.
  a. It holds images/sprites, color, text/paragraph text, or other HHgHolders
    var someHolder = new HHgHolder({w: 100, h: 100});
    aa. but unless you specifally choose not to use it, you should use the ObjectPool to get holders:
      var someHolder = var HHgGetHolder({w: 100, h: 100});
      aaa. and then return the holder to the pool when no longer needed:
        HHgReleaseHolder(someHoldervar);
    ab. a holder needs to be added to a holder in order to be visible, and in most cases needs a sprite/image:
      someHolder.doMoveToNewParent({parent: someOtherHolder, position: new HHgVector2(-200,-200), isScreenPos: true});
      someHolder.doAddSprite("pool");
      someHolder.doAddParagraphText({text: "my text", color: {H: 255, S: .5, L: .5, A: 1}, shadow: {color: "black", x: 4, y: 4, blur: 4}});
      someHolder.setMouseable(true);
      someHolder.setIsDraggable(true);
  b. Please note that many of the properties (most) require the use of getters/setters
    ba. This is to allow for specific calculations and scene updates when values are changed.
      var someNumber = someHolder.getWidth();
      someHolder.setPositionInScreenTo(29,45);
      someHolder.setPositionInParentTo(new HHgVector2(200,200));
  c. HHgHolders are automatically updated when their parent holders are updated by Position/Rotation/Scale.
  d. holders can be positioned in a parent, or in screen. and each one updates the other.
    da. So if you call someHolder.setPositionInScreenTo(0,0), its position in parent will change.
      daa. var newVector = someHolder.getPositionInParent();
  e. HHgHolders depth is based on their zIndex property. Changing the zIndex of a parent will adjust all children

6. HHgGameHolder is the top level Holder in the hierarchy.
  a. any HHgHolders you wish to add to the game and not be parented to another Holder should be parented to this:
    someHolder.doMoveToNewParent({parent: HHgGameHolder, position: {x: 200, y: 200} });
    aa. providing no parent argument will default to adding to HHgHolder.
  b. HHgScene is technically an HHgHolder, but scale and position will be incorrect for children

7. Properties Object - most classes and high level functions expect a javascript {} to be passed as arguments.
  a. The HHgHelper object then runs one function per expected argument to process and filter the input
    aa. This means that argument passing tends to be flexible, so for size you could pass in:
      aaa. {size: 100} or {w: 100, h: 100} or {size:{w: 100, h: 100}} etc.
  b. But for complex classes like creating an action, you'll pass in a single object with multiple key value pairs.
  c. Almost all values are optional, and will be filled in with a sensible value if omitted, like 0,0 for position.

8. HHgAction is what holders use to animate or change or set timers.
  a. You do not need to create HHgActions directly, instead you use helper functions on HHgHolder
    someHolder.doActionRotateBy({rotation: HHg.returnRandomInt(120,720), time: HHg.returnRandomInt(5,35)});
    someHolder.doActionFollowQuad({cx: 0, cy: 540, x: 960, y: -540, time: 10, easeIn: 25, easeOut: 25 });
  b. The holder and the actionManager will handle the rest.
  c. You can pass a name key/value into the above functions to uniquely name an action on an object.
    ca. This then allows you to call doRemoveActionByName(name);
  d. passing a key for 'onComplete: someFunction' to the function will cause the passed function to be executed on completion.
  e. HHgHolder has actions for:
    doActionRotateBy(any amount from negative to positive, time);
    doActionRotateLeftTo(any degree from 0 - 360, time); doActionRotateRightTo(); doActionRotateForever(+/- rotation per second);
    doActionMoveInScreenTo(x,y, time); doActionMoveInScreenBy(); doActionMoveForever(vector per second);
    doActionScaleTo(positive value, positive value, time); doActionScaleBy(positive value, positive value); doActionScaleForever(scale per second);
    doActionFollowQuad(vector control, vector destination, time); //creates a quadratic path using the current xy, a control xy, and final xy

9. Timers - do not use setTimeOut or setInterval anywhere, as this will cause things to fall out of sync
  9a. Instead call a timer action on an HHgHolder
    someHolder.doActionTimer({time: 10, onComplete: someFunc});

10. Values
  a. the xy grid for positioning on the screen, and in Holders is 0,0 centric (default point dimension is 1920/1080)
  b. time is always in seconds
  c. colors are always eventually in a HHgRGBA object, but most classes and functions will take HSL, RGB, or Hex values
    ca. this just means that passing in arguments other than a color object will result in a conversion step.
  d. all position/rotation/scale values are in points, so 1 or 1.5 or .044567. no strings, no trailing "px", etc.
    da. the engine will handle all of the conversions in the scene. You can modify rounding behavior there though.

11. Mouse and Touch
  a. there are built in mouse and touch handlers on HHgMouse.js, the engine will use the correct ones based on device type.
  b. you should not need to touch HHgMouse.js, instead, override the existing HHgHolder methods:
    doMouseDown(); doMouseUp(); doStartMouseMove(); doMouseMove(); doEndMouseMove();
  c. the engine calculates a holder as 'touched' based on z-index and canvas pixel alpha;
    ca. but a Holder must have mouseable set to true, which is set to false by default.
      someHolder.setMouseable(true);
  d. for a holder to recieve the move events, it must be set to draggable.
    da. someHolder.setIsDraggable(true);
  e. HHgMouse recieves an array of all qualifying Holders for mouse/touch, it only uses the highest element in the array.
    ea. if you need to access a "stack of holders" for something like dragging a stack, then you'll need to modify HHgMouse.js.

12. HHgColor
  a. all color in the engine eventually comes down to R: 1-255 G: 1-255 B: 1-255 A: 0-1
    aa. and creating a new color object:
      var someColor = new HHgColorRGBA(255,255,255,1);
    ab. there is also an HSL color object: H: 0-360, S: 0-1, L: 0-1, A: 0-1
      var someColor = new HHgColorHSLA(360,1,1,1);
    ac. HHgColorHelper has methods to convert to and from RGB, HSL and Hex
      aca. many functions and classes will do this conversion automatically if you pass in anything other than RGBA

13. HHgVector2
  a. HHgVector2 is the basis for passing grid coordinates, vectors, and scales.
    var someVector = new HHgVector2(50.5,323.7);
  b. HHgVector2's contain all functions for vector math, add, subtract, divide, etc.
    ba. these are also all versioned with aliased and verbose names
    bb. they also return a new vector, and do not modify the existing vector
      var someVector = vector1.returnVectorPlusVector(vector2);
      var someVector = vector1.returnAdd(vector2);
      var someVector = vector1.returnVectorScaledBy(vector2);
      var someVector = vector1.returnMultiply(vector2);
  c. to immediately modify existing vectors, use the 'plusEquals'/etc functions.
    someVector.plusEquals(someOtherVector); someVector.addEquals(someOtherVector);
    someVector.divideEquals(someOtherVector);
  d. Other useful functions:
    someVector.returnDistanceToVector(someOtherVector);
    someVector.returnVectorRotatedAroundVectorAtAngle(someOtherVector, angle); //this will all be handled for you in actions
    someVector.returnVectorAtDistanceToVector(someOtherVector);
  e. to save memory allocation you can use someVector.setXY(x,y) to change the values of a vector.
    ea. but be very careful using this, as vectors tend to get passed around, and these are objects passed by reference
      eaa. unlike in many languages where a vector would be a struct passed by value.

14. HHgText
  a. all text is displayed in engine by adding it to HHgHolders.
    aa. this text is one of 2 types:
      aaa. someHolder.doAddParagraphText({text: "my text", color: {H: 255, S: .5, L: .5, A: 1}, shadow: {color: "black", x: 4, y: 4, blur: 4}});
      aab. someHolder.doAddCanvasText({text: "my text", color: {H: 255, S: .5, L: .5, A: 1}, shadow: {color: "black", x: 4, y: 4, blur: 4}});
    ab. paragraph text creates a <pre> (preformatted text) element inside of the div.
      aba. this text is then modified via standard CSS.
      abb. when the div is scaled, the scene recalculates the font size to adjust for the div scale.
      abc. this text is not part of the canvas, and is therefore not subject to mouse/touch tests.
    ac. canvas text is created by formatting a 2d context and then painting the text directly onto the div's canvas
      aca. this is obviously much lower overhead, but will look "rasterized", and will be part of mouse/touch detection rules.

15. Adding and Modifying
  a. the engine is designed to have anything and everything modded, but I recommend not changing anything on HHgHolder or HHgScene
    aa. unless you understand exactly what it's doing.
  b. tack any properties onto holders that make sense to you, and create any custom controllers to handle game logic.
  c. HHgActionManager runs a function every frame that receives the delta time since the last frame
    ca. actions already handle all of their updates via this delta
    cb. but you could add another function to the beginning of the list if you were interested in another type of game loop.

15. Usage and Quirks
  a. you'll notice that pretty much any function that you are supposed to interact with start with "do" to do something or "return" to return something
  b. or "get" and "set" for property access. the engine does a lot of secondary computation after properties are set.
    ba. this requires the use of setter functions instead of standard .access
  c. most functions require property objects to be passed as arguments {R: 255, G: 255, B: 255};
    ca. but if a function just takes 1 concept, then it usally can be short-handed for faster typing:
      funcTakesColor(255,255,255);


//=============================================================
//END
</pre>