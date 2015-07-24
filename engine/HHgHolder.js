var HHgHolderHashCount = 0;

var HHgHolder = function(props){
  //props width, height, zIndex, scale(xy or x)

  HHgHolderHashCount++;
  if(HHgHolderHashCount > 50000){
    HHgHolderHashCount = 0;
    console.log("HASH passed 50000");
  }
  this.that = this;
  var temp = HHg.returnSizeProps(props) || new HHgVector2(HHgGameHolder.getWidthOriginal(), HHgGameHolder.getHeightOriginal());

  this._widthOriginal = temp.x;
  this._heightOriginal = temp.y;
  this._sizeOriginal = new HHgVector2(this._widthOriginal, this._heightOriginal);
  this._sizeOriginalHalf = this._sizeOriginal.times(.5);

  this._rotationOriginal = 0;
  this._rotationNet = 0;
  this._rotationStored = 0;

  this._parent;

  this._backgroundColor;
  this._tintColor;

  this._scaleOriginal = HHg.returnScaleProps(props) || new HHgVector2(1,1);
  this._scaleNet = this._scaleOriginal;
  this._scaleStored = this._scaleOriginal;

  this._scaleIgnoreParentScale = false;
  this._scaleUniformOnly = false;
  this._positionInScreenOriginal = new HHgVector2(0,0);
  this._positionInParentOriginal  = new HHgVector2(0,0);
  this._positionInScreenNet = this._positionInScreenOriginal;
  this._positionStored = this._positionInScreenOriginal;

  this._children;
  this._actions;
  this._clusters =[];
  this._sequences=[];
  this._paused = false;

  this._div;
  this._insideDiv;

  this._hash = HHgHolderHashCount;
  this._timeStamp = +new Date();
  this._finalHash = "" + this._hash + "_" + this._timeStamp;

  this._mouseable = false;
  this._visible = true;
  this._classList = {};
  this._soundList = {};

  this._canvas;

  this._zIndex = HHg.returnZIndexProps(props);
  if(this._zIndex === undefined){
    this._zIndex = 1;
  }

  this._counterForNamingActions = 0;
  this._actionsTotal = 0;

  this.fontSizeOriginal = 1;
  this.fontSizeScaled = 1;
  this.borderWidthScaled = 0;
  this.borderWidthOriginal = 0;

  this.isScene = false,
  this.isDraggable = false;
  this.isBeingDragged = false;

  this.test = "no";

  this.resetChanges = function(){
    this.changes = {
      scale: false,
      position: false,
      rotation: false,
      tint: false,
      backgroundColor: false,
      visible: false,
      mouseable: false,
      zIndex: false,
      classList: false,
    }
  };

  this.resetChanges();

  this.resetFrameUpdates = function(){
    this.frameUpdates = {
      positionBy: undefined,
      rotationBy: undefined,
      scaleBy: undefined,
      positionTo: undefined,
      rotationTo: undefined,
      scaleTo: undefined,
      positionAbsolute: undefined,
    }
  };

  this.resetFrameUpdates();

};

(function(){

  var p = HHgHolder.prototype;

  p.getOriginalSize = function(){
    return this._sizeOriginal;
  };

  p.resetFramePositionUpdates = function(){
    this.frameUpdates.positionBy = undefined;
    this.frameUpdates.positionTo = undefined;
    this.frameUpdates.positionAbsolute = undefined;
  };

  p.setIsDraggable = function(bool){
    this.isDraggable = bool;
  };

  p.getIsDraggable = function(){
    return this.isDraggable;
  };

  p.setPaused = function(bool){
    this._paused = bool;
    if(this._children === undefined) return;
    for(var i =0; i < this._children.length; i++){
      this._children[i].setPaused(bool);
    }
  };

  p.getPaused = function(){
    return this._paused;
  };

  p.setScene = function(){
    this._scaleOriginal = new HHgVector2(1,1);
    this._scaleNet = this._scaleOriginal;
    this._widthOriginal = HardwareScreen.w;
    this._heightOriginal = HardwareScreen.w / (HHgScreen.w * HHgScreen.maxh);
    this._parent = "stop";
    this._mouseable = false;
    this.test = "scene";
  };

  p.setGameHolder = function(){
    this._scaleOriginal = new HHgVector2(HardwareScreen.w / HHgScreen.w, HardwareScreen.w / HHgScreen.w);
    HHgPixelScale = this._scaleOriginal.x;
    this._scaleNet = this._scaleOriginal;
    this._widthOriginal = HHgScreen.w;
    this._heightOriginal = HHgScreen.h;
    this._parent = HHgScene;
    this._mouseable = false;
    this.isGameHolder = true;
    this.getScaleNetForChildPosition = function(){
      return HHg1Vector;
    };
    this.test = "gameholder";
  };

  p.setCanvas = function(canvas){
    this._canvas = canvas;
  };

  p.setTextCanvas = function(canvas){
    this._textCanvas = canvas;
  };

  p.getCanvas = function(){
    return this._canvas;
  };

  p.getTextCanvas = function(){
    return this._textCanvas;
  };

  p.doFrameDump = function(){
    if(this.frameDumpScale()){
      this.doRecalcScale();
    }
    if(this.frameDumpRotation()){
      this.doRecalcRotation();
    }
    if(this.frameDumpPosition() || this.isBeingDragged === true){
      this.doRecalcPosition();
    }else{
      this.updatePositionFromParentMove();
    }
    this.doMarkForFinalPass();
  };

  p.doMarkForFinalPass = function(){
    HHgScene.addToFinalPassList(this);
    if(this._children){
      for(var i = 0; i < this._children.length; i++){
        this._children[i].updatePositionFromParentMove();
        this._children[i].doMarkForFinalPass();
      }
    }
  };

  p.frameDumpPosition = function(){
    var returnVal = false;
    if(this.frameUpdates.positionAbsolute !== undefined){
      this._positionInScreenOriginal = this.frameUpdates.positionAbsolute;
      returnVal = true;
    }else if(this.isBeingDragged === true){
    //won't allow other types of position updates
    }else if(this.frameUpdates.positionTo !== undefined){
      this._positionInScreenOriginal = this.frameUpdates.positionTo;
      returnVal = true;
    }else if(this.frameUpdates.positionBy !== undefined ){
      this._positionInScreenOriginal = this._positionInScreenOriginal.plus( this.frameUpdates.positionBy);
      returnVal = true;
    };

    this.frameUpdates.positionBy = undefined;
    this.frameUpdates.positionTo = undefined;
    this.frameUpdates.positionAbsolute = undefined;
    return returnVal;
  };

  p.frameDumpRotation = function(){
    var returnVal = false;
    if(this.frameUpdates.rotationTo !== undefined){
      this._rotationOriginal = this.frameUpdates.rotationTo;
      returnVal = true;
    }else if(this.frameUpdates.rotationBy !== undefined){
      this._rotationOriginal += this.frameUpdates.rotationBy;
      returnVal = true;
    }

    this.frameUpdates.rotationBy = undefined;
    this.frameUpdates.rotationTo = undefined;
    return returnVal;
  };

  p.frameDumpScale = function(){
    var returnVal = false;
    if(this.frameUpdates.scaleTo !== undefined){
      this._scaleOriginal = this.frameUpdates.scaleTo;
      this._scaleOriginal.zeroFloor();
      returnVal = true;
    }else if(this.frameUpdates.scaleBy !== undefined){
      this._scaleOriginal = this._scaleOriginal.plus( this.frameUpdates.scaleBy);
      this._scaleOriginal.zeroFloor();
      returnVal = true;
    }

    this.frameUpdates.scaleBy = undefined;
    this.frameUpdates.scaleTo = undefined;
    return returnVal;
  };

  p.framePositionBy = function(xy){
    if(this.frameUpdates.positionBy){
      this.frameUpdates.positionBy = this.frameUpdates.positionBy.plus(xy);
    }else{
      this.frameUpdates.positionBy = xy;
    }
    this.doNotifySceneOfUpdates();
  };
  p.frameRotationBy = function(val){
    if(this.frameUpdates.rotationBy){
      this.frameUpdates.rotationBy += val;
    }else{
      this.frameUpdates.rotationBy = val;
    }

    this.doNotifySceneOfUpdates();
  }
  p.frameScaleBy = function(xy){

    if(this.frameUpdates.scaleBy){
      this.frameUpdates.scaleBy = this.frameUpdates.scaleBy.plus(xy);
    }else{
      this.frameUpdates.scaleBy = xy;
    }
    this.doNotifySceneOfUpdates();
  };

  p.framePositionTo = function(xy){
    this.frameUpdates.positionTo = xy;
    this.doNotifySceneOfUpdates();
  };

  p.frameRotationTo = function(val){
    this.frameUpdates.rotationTo = val;
    this.doNotifySceneOfUpdates();
  };

  p.frameScaleTo = function(xy){

    this.frameUpdates.scaleTo = xy;
    this.doNotifySceneOfUpdates();
  };

  p.framePositionAbsolute = function(xy){
    this.frameUpdates.positionAbsolute = xy;
    this.doNotifySceneOfUpdates();
  };

  p.getHash = function(){
    return this._finalHash;
  };

  p.setMouseable = function(mouseable){
    this._mouseable = mouseable;
    this.changes.mouseable = true;
    if(this._div){
      this.doNotifySceneOfUpdates();
    }
  };

  p.getMouseable = function(){
    return this._mouseable;
  };

  p.setVisible = function(val){
    if(this._visible === val){
      return;
    }
    this._visible = val;
    this.changes.visible = true;
    if(this._div){
      this.doNotifySceneOfUpdates();
    }
  };

  p.getVisible = function(){
    return this._visible;
  };

  p.setBackgroundColor = function(color){
    this._backgroundColor = HHg.returnColorProps(color);
    this.changes.backgroundColor = true;
    if(this._parent !== undefined){
      this.doNotifySceneOfUpdates();
    }
  };

  p.getBackgroundColor = function(){
    return this._backgroundColor;
  };

  p.setTintToRGBA = function(color){
    this.changes.tint = true;
    if(this._parent !== undefined){
      this.doNotifySceneOfUpdates();
    }
    this._tintColor = color;
  };

  p.setTintByRGBA = function(color, percent){
    this.changes.tint = true;
    if(this._parent !== undefined){
      this.doNotifySceneOfUpdates();
    }
    if(this._tintColor){
      this._tintColor.blendColorIn(color,percent);
    }else{
      this.setTintToRGBA(color);
    }
  };

  p.getTintRGBA = function(){
    return this._tintColor;
  };

    //do we want these to be calculations if the holder is holding things?
  p.getWidthOriginal = function(){
    return this._widthOriginal;
  };

  p.getHeightOriginal = function(){
    return this._heightOriginal;
  };

  p.getSizeOriginal = function(){
    return new HHgVector2(this._widthOriginal, this._heightOriginal);
  };

  p.getSizeNet = function(){
    return new HHgVector2(this.getWidthNet(), this.getHeightNet());
  };

  p.getWidthNet = function(){
    return this._widthOriginal * this._scaleNet.x;
  };

  p.getHeightNet = function(){
    return this._heightOriginal * this._scaleNet.y;
  };

  p.getMySizeOffset = function(){
    return this._sizeOriginalHalf.times(this.getScaleNetForMyPosition());
  };

  p.getCenterPosition = function(){
    return this._positionInScreenNet.plus(this.getMySizeOffset());
  };

  p.getParent = function(){
    return this._parent;
  };

  p.getHalfWidth = function(){
    return this.getWidthNet() / 2;
  };

  p.getHalfHeight = function(){
    return this.getHeightNet() / 2;
  };

  p.getZIndex = function(){
    return this._zIndex;
  };

  p.setZIndexTo = function(z, doNotUpdateChildren){
    this.changes.zIndex = true;
    this._zIndex = z;
    this.doNotifySceneOfUpdates();
    if(doNotUpdateChildren !== true){
      for(var i = 0; i < this._children.length; i++){
        this._children[i].setZIndexTo(z);
      }
    }
  };

  p.setZIndexBy = function(z, doNotUpdateChildren){
    this.changes.zIndex = true;
    this._zIndex+= z;
    this.doNotifySceneOfUpdates();
    if(doNotUpdateChildren !== true){
      if(!this._children) return;
      for(var i = 0; i < this._children.length; i++){
        this._children[i].setZIndexBy(z);
      }
    }
  };

  p.setDiv = function(div){
    this._div = div;
  };
  p.getDiv = function(){
    return this._div;
  };
  p.setInsideDiv = function(insideDiv){
    this._insideDiv = insideDiv;
  };
  p.getInsideDiv = function(insideDiv){
    return this._insideDiv;
  };

  //============ POSITION ==================

  //EXPERIEMNT
  p.doRecalcPosition = function(){
    if(this._parent === "stop") return;
    if(this._parent == undefined){
      return;
    }
    this.convertOriginalToNetPosition();
    if(this._parent !== undefined){
      this._positionInParentOriginal = this._positionInScreenOriginal.getVectorRotated( this._parent.getPositionInScreenOriginal(), 1 *  this._parent.getRotationNet() );
      this._positionInParentOriginal = this._parent.getPositionInScreenOriginal().subtractedFrom(this._positionInParentOriginal);
      this._positionInParentOriginal = this._positionInParentOriginal.dividedBy(this._parent.getScaleNetForChildPosition());
    }
    this.changes.position = true;
    if(this._children){
      HHg.doForEach(this._children, function(child){
        child.updatePositionFromParentMove();
      });
    }
  };

  p.setPositionStored = function(){
    this._positionStored = this._positionInScreenOriginal;
  };

  p.getPositionStored = function(){
    return this._positionStored;
  };

  p.setPositionToStored = function(){
    this.setPositionInScreenTo(this._positionStored);
  };

  p.setPositionInScreenTo = function(props){
    this.framePositionTo(HHg.returnPositionProps(props));
  };

  p.setPositionInScreenBy = function(props){
    this.framePositionBy(HHg.returnPositionProps(props));
  };

  p.setPositionInScreenAbsolute = function(props){
    this.framePositionAbsolute(HHg.returnPositionProps(props));
  };

  p.getPositionInScreenOriginal = p.getPosition = function(){
    return this._positionInScreenOriginal;
  };

  p.getPositionWithCentering = function(){
    return this.returnHalfSizeVector().plus( this._positionInScreenOriginal);
  };

  p.getPositionInParentOriginal = function(){
    return this._positionInParentOriginal;
  };

  p.getPositionInScreenNet = function(){
    return this._positionInScreenNet;
  };

  p.setPositionInParentTo = function(props){
    this._positionInParentOriginal = HHg.returnPositionProps(props);
    this.doNotifySceneOfUpdates();
    this.resetFramePositionUpdates();
    this.updatePositionFromParentMove();
  };

  p.updatePositionFromParentMove = function(){
    if(this.isBeingDragged === true){
      return;
    }
    this._positionInScreenOriginal = this._positionInParentOriginal;
    if(this._parent !== undefined){
      this._positionInScreenOriginal = this._positionInScreenOriginal.times(this._parent.getScaleNetForChildPosition());
      this._positionInScreenOriginal = this._parent.getPositionInScreenOriginal().plus(this._positionInScreenOriginal);
      this._positionInScreenOriginal = this._positionInScreenOriginal.getVectorRotated( this._parent.getPositionInScreenOriginal() , -1 * this._parent.getRotationNet() );
      this.convertOriginalToNetPosition();
    }
    this.changes.position = true;
    if(this._children){
      HHg.doForEach(this._children, function(child){
      child.updatePositionFromParentMove();
      });
    }
  };

  p.convertOriginalToNetPosition = function(){
    //note, to specifically use GameHolder scale for child here, even though it's asking for position
    //because the offsets need its relative scale.
    this._positionInScreenNet = this._positionInScreenOriginal.times(HHgGameHolder.getScaleNetForChildScale());
    this._positionInScreenNet = this._positionInScreenNet.plus(HHgGameHolder.returnHalfSizeVector());
    this._positionInScreenNet.minusEquals(this._sizeOriginalHalf.times(HHgPixelScale));
  };

  //=============== SCALE ================

  p.setScaleStored = function(){
    this._scaleStored = this._scaleOriginal;
  };

  p.getScaleStored = function(){
    return this._scaleStored;
  };

  p.setScaleToStored = function(){
    this.setScaleOriginalTo(this._scaleStored);
  };

  p.returnHalfSizeVector = function(){
    return new HHgVector2(this.getHalfWidth(), this.getHalfHeight());
  };

  p.getScaleOriginal = function(){
    return this._scaleOriginal;
  };

  p.setScaleOriginalTo = function(props){
    this.frameScaleTo(HHg.returnScaleProps(props));
  };

  p.setScaleOriginalBy = function(props){
    this.frameScaleBy( HHg1Vector.subtractedFrom(HHg.returnScaleProps(props)) ) ;
  };

  p.setScaleOriginalByActionFraction = function(props){
    this.frameScaleBy(HHg.returnScaleProps(props).plus(HHg1Vector));
  };

  p.getScaleNetForChildScale = function(){
    this._scaleNet = this._scaleIgnoreParentScale ? this._scaleOriginal / this._parent.getScaleNetForChildPosition() : this._scaleNet;
    if(this._scaleUniformOnly === true){
      var larger = (this._scaleNet.x > this._scaleNet.y) ? this._scaleNet.x : this._scaleNet.y;
      this._scaleNet = new HHgVector2(larger, larger);
    }
    return this._scaleNet;
  };

  p.getScaleNetForChildPosition = function(){
    if(this._parent.isGameHolder === true){
      return this._scaleOriginal;
    }
    return this._parent.getScaleNetForChildPosition().times(this.getScaleOriginal());
  };

  p.getScaleNetForMyPosition = function(){
    if(this._parent !== undefined){
      return this._parent.getScaleNetForChildScale();
    }
    return HHg1Vector;
  };

  p.doRecalcScale = function(){
    this._scaleNet = this._scaleOriginal;
    if(this._parent !== undefined){
      this._scaleNet = this._parent.getScaleNetForChildScale().times(this._scaleNet);
    }
    this.fontSizeScaled = this.fontSizeOriginal * this._scaleNet.x;
    this.borderWidthScaled = this.borderWidthOriginal * this._scaleNet.x;

    this.changes.scale = true;
    if(this._children){
      HHg.doForEach(this._children, function(child){
        child.doRecalcScale();
      });
    }
  };
  //=============== ROTATION ====================

  p.setRotationStored = function(){
    this._rotationStored = this._rotationOriginal;
  };

  p.getRotationStored = function(){
    return this._rotationStored;
  };

  p.setRotationToStored = function(){
    this.setRotationOriginalTo(this._rotationStored);
  };

  p.setRotationOriginalTo = function(props){
    this.frameRotationTo(HHg.returnRotationProps(props) % 360);
  };

  p.setRotationOriginalBy = function(props){
    this.frameRotationBy(HHg.returnRotationProps(props) % 360);
  };

  p.getRotationOriginal = function(){
    return this._rotationOriginal % 360;
  };

  p.getRotationNet = function(){
    return this._rotationNet;
  };

  p.getParentRotation = function(){
    return this._parent.getRotationOriginal();
  };

  p.doRecalcRotation = function(){
    //now called as frame dump
    if(this._parent === "stop") return;
    this._rotationNet = this._rotationOriginal;

    if(this._parent !== undefined){
      this._rotationNet += this._parent.getRotationNet();
    }

    this.changes.rotation = true;
    if(this._children){
      HHg.doForEach(this._children, function(child){
        child.doRecalcRotation();
      });
    }
  };

  //==================== management

  p.doNotifySceneOfUpdates = function(){
    //*** disabling this and moving to the frame buffer thing
    //HHgScene.doUpdateThisHolder(that);
    HHgScene.doAddToDirtyList(this);
  };

  p._addToChildrenList = function (child){
    //this should be a private method
    this._children = this._children || [];
    if(child instanceof HHgHolder !== true){
      throw("Tried to add a child not of HHgHolder Class");
      return;
    }
    this._children.push(child);
  };

  p._removeFromChildrenList = function(child){
    //this should be a private method
    return HHg.doRemoveThingFromArray(this._children, child);
  };

  p.addChild = function(child){
    child.doAddToNewParent({parent: this});
  };

  //TODO p.removeChild
  //TODO p.removeFromScene / removeFromParent
  p.removeFromParent = p.remove = function(){
    //TODO eventually this needs to be back to the holder pool
    if(!this._parent) return;
    //this.doMoveToNewParent({parent: HHgHolderBucket})
    HHgScene.doRemoveThisHolder(this);
  };

  p.doMoveToNewParent = p.doAddToNewParent = p.addToParent = function(props){
    if(this._parent === "stop"){
      return;
    }
    if(props === undefined){
      props = {};
    }
    if(props.parent === "stop"){
      HHgScene.doAddThisHolder(this);
      return;
    }

    props.position = HHg.returnPositionProps(props, HHg0Vector);

    if(props.position === undefined){
      props.position = HHg0Vector;
    }

    if(this._parent === undefined){
      HHgScene.doAddThisHolder(this);
    }else{
      this._parent._removeFromChildrenList(this);
    }

    this._parent = props.parent || HHgGameHolder;
    if(this === this._parent) throw("tried to add holder to itself");

    if(this._parent instanceof HHgHolder !== true){
      throw("tried to add child to a parent not of HHgHolder Class");
    }

    this._parent._addToChildrenList(this);

    this.setRotationOriginalBy(this._rotationOriginal);
    this.setScaleOriginalBy(HHg1Vector);

    this.setPositionInScreenTo(new HHgVector2(0,0));
    this._startPositionForTranslate = this._positionInScreenNet;

    if(HHg.returnIsScreenPosProps(props)){
      this._positionInScreenOriginal = props.position;
      this.setPositionInScreenTo(props.position)
    }else{
      this.setPositionInParentTo(props.position)
    }
  };

  //============= ACTIONS ================

  p.doFinalizeAction = function(action, props){
    this._actions = this._actions || {};


    if(props.mySequence){
      action.myNextAction = props.myNextAction;
      action.mySequence = props.mySequence;
      action.isSequenceFinalTimer = props.isSequenceFinalTimer;
    }
    if(props.myCluster){
      action.myCluster = props.myCluster;
      action.isClusterFinalTimer = props.isClusterFinalTimer;
    }
    if(props.name){
      action.name = props.name;
      if(this._actions[action.name] !== undefined){
        var existingAction = this._actions[action.name];
        var existingActionNewRandomName = "" + this._counterForNamingActions + HHg.returnRandomHash();
        existingAction.name = existingActionNewRandomName;
        this._actions[existingActionNewRandomName] = existingAction;

        //TODO this got weird once we started copying actions inside of sequences to rerun them
        console.log("WARNING: Action with name: " + action.name + " already exists on Holder");
        console.log("previous action's name changed to random name");

      }
    }else{
      action.name = "" + this._counterForNamingActions + HHg.returnRandomHash();
    }

    this._counterForNamingActions++;

    if(action.isActionCluster || action.isActionSequence){
      this._actions[action.name] = action;
      return {owner: action.props.owner, name: action.name};
    }else{
      this._actions[action.name] = action;
      this._actionsTotal++;
      HHgActionManager.doAddAction(this,action);
      return action.name;
    }
  };

  p.getActions = function(){
    return this._actions;
  };

  p.doRemoveAction = function(action){
    var tempObject;
    if(action.isActionCluster || action.isActionSequence){
      for(var i = 0; i < action.props.myActions.length; i++){
        tempObject = action.props.myActions[i];
        tempObject.owner.doRemoveActionByName(tempObject.name);
      }
      //TODO refactor to not use delete
      //this._actions[action.name] = undefined;
      delete this._actions[action.name];

    }else{
      //this._actions[action.name] = undefined;
      delete this._actions[action.name];
      this._actionsTotal--;
      if(this._actionsTotal <= 0){
        this.actionTotal = 0;
        HHgActionManager.doRemoveOwner(this);
      }
    }
  };
  p.doRemoveActionByName = function(name){
    if(!this._actions) return;
    this.doRemoveAction(this._actions[name]);
  };

  p.doActionMoveInScreenTo = function(props){
    var theAction;
    theAction = new HHgActionMoveBy(this, this._positionInScreenOriginal.subtractedFrom(HHg.returnPositionProps(props)), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionMoveInScreenBy = function(props){
    var theAction;
    theAction = new HHgActionMoveBy(this, HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionMoveInScreenForever = function(props){
    var theAction;
    theAction = new HHgActionMoveForever(this, (HHg.returnPositionProps(props) || HHg.returnSpeedXYprops(props)), this._positionInScreenOriginal, HHg.returnEaseProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionRotateBy = function(props){
    var theAction;
    theAction = new HHgActionRotateBy(this, HHg.returnRotationProps(props), this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionRotateLeftTo = function(props){
    var degrees = HHg.returnRotationProps(props) % 360;
    if(degrees > 180){
      degrees = -(degrees - 180);
    }

    if(degrees < _rotationOriginal){
      degrees = degrees - this._rotationOriginal;
    }else{
      degrees = -(360 - Math.abs(this._rotationOriginal - degrees) );
    }

    var theAction;
    theAction = new HHgActionRotateBy(this, degrees, this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionRotateRightTo = function(props){
    var degrees = HHg.returnRotationProps(props) % 360;
    if(degrees > 180){
      degrees = -(degrees - 180);
    }

    if(degrees > this._rotationOriginal){
      degrees = degrees - this._rotationOriginal;
    }else{
      degrees = -(360 - Math.abs(this._rotationOriginal - degrees) );
    }

    var theAction;
    theAction = new HHgActionRotateBy(this, degrees, this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionRotateForever = function(props){
    // props.time = 100;
    // props.rotation = props.rotation * 100;
    // var seq = this.makeActionSequence([this.makeAction("rotateBy", props)]);
    // return this.doActionSequenceForever(seq);

    var theAction;
    theAction = new HHgActionRotateForever(this, (HHg.returnRotationProps(props) || HHg.returnSpeedNProps(props)), HHg.returnEaseProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionScaleBy = function(props){
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionScaleTo = function(props){
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props).timesInverse(this._scaleOriginal), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionScaleForever = function(props){
    // props.time = 100;

    // props.scale = props.scale * 100;
    // props.scaleX = props.scaleX * 100;
    // props.scaleY = props.scaleY * 100;
    // var seq = this.makeActionSequence([this.makeAction("scaleBy", props)]);
    // return this.doActionSequenceForever(seq);


    var theAction;
    theAction = new HHgActionScaleForever(this, (HHg.returnScaleProps(props) || HHg.returnSpeedXYProps(props)), this._scaleOriginal, HHg.returnEaseProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionFollowQuad = function(props){
    var theAction;
    theAction = new HHgActionFollowQuad(this, HHg.returnControlPositionProps(props), HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), props.onComplete, HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionTimer = function(props){
    var theAction;
    theAction = new HHgActionTimer(this, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));

    return this.doFinalizeAction(theAction, props);
  };

  p.doActionPlaySound = function(props){
    //does this trigger a new sound or existing cached sound. how does sound caching work?
    //then test storing actions and plaing them later
    //then test clusters, then test sequences.
    var test = HHgAudio.newSound("click");
    console.log(test.duration);
  };

  p.doActionCustom = function(func, time, onComplete){
    //todo, this should become a cluster, a custom action needs to return an actual action
    func.bind(this)();
    return this.doActionTimer({time: time, onComplete: onComplete});
  };

  p.doAction = function(actionName, props){
    if(typeof actionName === "object"){
      this.doStoredAction(actionName);
      return;
    }
    this.returnActionFunction(actionName).call(this,props);
  };

  p.returnActionFunction = function(name){
    switch(name.toLowerCase()){
      case "timer":
      return this.doActionTimer;
      case "followquad":
      return this.doActionFollowQuad;
      case "scaleforever":
      return this.doActionScaleForever;
      case "scaleto":
      return this.doActionScaleTo;
      case "scaleby":
      return this.doActionScaleBy;
      case "rotateforever":
      return this.doActionRotateForever;
      case "rotaterightto":
      return this.doActionRotateRightTo;
      case "rotateleftto":
      return this.doActionRotateLeftTo;
      case "rotateby":
      return this.doActionRotateBy;
      case "moveby":
      case "moveinscreenby":
      return this.doActionMoveInScreenBy;
      case "moveto":
      case "moveinscreento":
      return this.doActionMoveInScreenTo;
      case "moveinscreenforever":
      return this.doActionMoveInScreenForever;
      case "custom":
      return this.doActionCustom;
      case "playsound":
      return this.doActionPlaySound;
      default:
      throw new Error("ACTION NAME ERROR");
    }
  };

  //============= ACTION CLUSTERS AND SEQUENCES =============

  p.makeAction = p.makeStoredAction = p.storeAction = function(actionName, props){
    return {actionCall: this.returnActionFunction(actionName), props: props}; //removed owner: this
  };

  p.doStoredAction = p.callStoredAction = function(storedAction){
    if(storedAction.isActionCluster){
      return this.doActionCluster(storedAction);
    }else if(storedAction.isActionSequence){
      return this.doActionSequence(storedAction);
    }else{
      return {owner: this, name: storedAction.actionCall.call(this, storedAction.props)};
    }
  };


  p.makeActionCluster = p.makeCluster = function(storedActions, name, onComplete){
    var i, key, longestTime = 0, finalActions = [], tempAction, args;
    args = Array.prototype.slice.call(arguments, 0);

    if(storedActions.props){
      console.log("FOUND ONLY ACTIONS");
      for(var i = 0; i < arguments.length; i++){
        finalActions.push(arguments[i]);
      }
      onComplete = undefined;
      name = undefined;
    }else if(!Array.isArray(storedActions)){
      for(key in storedActions){
        tempAction = storedActions[key];
        if(!tempAction.props){
          console.log("ERROR: attemping to add non action to cluster");
          return;
        }
        finalActions.push(tempAction);
      }
    }else{
      for(var i = 0; i < storedActions.length; i++){
        finalActions.push(storedActions[i]);
      }
    }

    for(i = 0; i < finalActions.length; i++){
      tempAction = finalActions[i];

      if(tempAction.props.time > longestTime){
        longestTime = tempAction.props.time;
      }

      tempAction.props.myCluster = finalActions;
    }

    var totalTimer = this.makeAction("timer", {time: longestTime, onComplete: function(){console.log("Cluster Complete"); onComplete;} } );
    totalTimer.props.isClusterFinalTimer = true;
    totalTimer.props.myCluster = finalActions;
    finalActions.push(totalTimer);

    finalActions.isActionCluster = true;
    finalActions.props = {time: longestTime, name: name, myActions: [], totalActions: finalActions.length};

    finalActions.sequenceChain = HHgAction.prototype.sequenceChain;
    finalActions = HHg.copyActionShell(finalActions);
    finalActions.originalArguments = args;

    return finalActions;
  };

  p.doActionCluster = function(cluster, nOrForever){
    var i, tempThing, clusterName;
    for(i = 0; i < cluster.length; i++){
      tempThing = cluster[i];
      cluster.props.myActions.push(this.doStoredAction(tempThing));
    }
    cluster.owner = this;

    if(nOrForever === 0 || nOrForever === true){
      cluster.repeatF = true;
      cluster.repeatSelfF = HHgAction.prototype.repeatSelfF;
    }else if(nOrForever){
      cluster.repeatN = nOrForever;
      cluster.repeatSelfN = HHgAction.prototype.repeatSelfN;
    }

    return this.doFinalizeAction(cluster, cluster.props);
  };

  p.doActionClusterForever = function(cluster){
    return this.doActionCluster(cluster, true);
  };

  p.doActionClusterTimes = function(cluster, n){
    return this.doActionCluster(cluster, n);
  };

  p.makeActionSequence = p.makeSequence = function(storedActions, name, onComplete){
    var i, key, finalActions = [], finalSequence = [], tempAction, tempAction2, tempFunction, args;
    args = Array.prototype.slice.call(arguments, 0);
    if(storedActions.props){
     //console.log("FOUND ONLY ACTIONS");
     for(var i = 0; i < arguments.length; i++){
       finalActions.push(arguments[i]);
     }
     name = undefined;
     onComplete = undefined;
    }else if(!Array.isArray(storedActions)){
     for(key in storedActions){
       tempAction = storedActions[key];
       if(!tempAction.props){
         console.log("ERROR: attemping to add non action to cluster");
         return;
       }
       finalActions.push(tempAction);
     }
    }else{
     for(var i = 0; i < storedActions.length; i++){
       finalActions.push(storedActions[i]);
     }
    }

    finalActions.props = {myActions: [], totalActions: 0, name: name, time: 0};
    //TODO: eventually this should all get sub classed and sequences should stop being arrayw with properties
    //this system has grown beyond its original design, but for now, we just grab the prototype function we need
    finalActions.isActionSequence = true;
    finalActions.sequenceChain = HHgAction.prototype.sequenceChain;

    var finalTimer = this.makeAction("timer", {time: 0, onComplete: function(){console.log("Sequence Complete"); onComplete;}} );
    finalTimer.props.isSequenceFinalTimer = true;
    finalActions.push(finalTimer);

    for(i = 0; i < finalActions.length; i++){
      tempAction = finalActions[i];
      finalActions.props.time += tempAction.props.time;

      tempAction.props.mySequence = finalActions;
    }

    finalActions.props.totalActions = finalActions.length;
    finalActions = HHg.copyActionShell(finalActions);
    finalActions.originalArguments = args;

    return finalActions;
  };

  p.doActionSequence = function(sequence, nOrForever){
    sequence.props.myActions.push(this.doStoredAction(sequence[0]));
    sequence.owner = this;


    if(nOrForever === 0 || nOrForever === true){
      sequence.repeatF = true;
      sequence.repeatSelfF = HHgAction.prototype.repeatSelfF;
    }else if(nOrForever){
      sequence.repeatN = nOrForever;
      sequence.repeatSelfN = HHgAction.prototype.repeatSelfN;
    }

    return this.doFinalizeAction(sequence, sequence.props);
  };

  p.doActionSequenceForever = function(sequence){
    return this.doActionSequence(sequence, true);
  };

  p.doActionSequenceTimes = function(sequence, n){
    return this.doActionSequence(sequence, n);
  };

  //============= MOUSE =================
  //this will all be overridden for custom games
  p.doMouseDown  = function(){

    this.setScaleStored();

    //this.doActionScaleForever({scaleX:1.1, scaleY: 1.1, name: "mousedownscale"});
    //this.doActionPlaySound("click");
    //this.doActionRotateForever({speed:-300, name: "mousemoverotate"});
  }

  p.mouseClick = undefined;

  p.doMouseUp = function(mouseWasOverWhenReleased){
    if(mouseWasOverWhenReleased && this.mouseClick) this.mouseClick();
    //this.doRemoveActionByName("mousemoverotate");
    //this.doRemoveActionByName("mousedownscale");
    this.isBeingDragged = false;
  };

  p.doStartMouseMove = function(){
    this.setPositionStored();
    this.isBeingDragged = true;
    //console.log("MOUSE START");
  };

  p.doMouseMove = function(){
    this.setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.plus(HHgMouse.draggingOffsetXY));
  };

  p.doEndMouseMove = function(){
    this.setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.plus(HHgMouse.draggingOffsetXY));
    this.isBeingDragged = false;
  };

  //======visibility =========
  p.doShow = function(xy,y){
    this.setVisible(true);
    if(xy !== undefined){
      if(xy instanceof HHgVector2 === true){
        this.setPositionInScreenTo(xy);
      }else if(y !== undefined){
        this.setPositionInScreenTo({x:xy,y:y});
      }
    }
  };

  p.doHide = function(){
    this.setVisible(false);
  };

  p.doAddSprite = p.addSprite = function(name, whitePixelTintRGB){
    HHgSprite.doAddSpriteToHolder(this,name,whitePixelTintRGB);
  };

  p.doAddParagraphText = p.addPText = function(props){
    HHgText.doAddTextParagraphToHolder(this,props);
  };

  p.doAddCanvasText = p.doAddText = p.addText = function(props){
    HHgText.doAddTextCanvasToHolder(this,props);
  };

  p.doMakeRoundedRectangle = p.doMakeRectangle = p.makeRectangle = function(props){
    HHgShape.addRectangle(this, props);
  };

  p.doMakeEllipse = p.doMakeCircle = function(props){
    HHgShape.addEllipse(this, props);
  };

  p.doMakeTriangle = function(props){
    HHgShape.addTriangle(this, props);
  };

  this.doRemoveShape = function(){
    HHgShape.removeShape(this);
  };

  p.doAddOutline = p.doAddBorder = function(props){
    HHgShape.addBorder(this,props);
  };

  p.doRemoveOutline = p.doRemoveBorder = function(){
    HHgShape.addBorder(this, {borderStyle: "none", borderWidth: 0});
  };

  //======custom CSS==========
  p.doAddCSSClass = p.doAddCSSClass = function(className){
    this.classAddingObject = this.classAddingObject || {};
    this.classAddingObject[className] = className;
    this.changes.classList = true;
    this.doNotifySceneOfUpdates();
  };

  p.doRemoveCSSClass = p.doRemoveCSSClass = function(className){
    this.classRemovingObject = this.classRemovingObject || {};
    this.classRemovingObject[className] = className;
    this.changes.classList = true;
    this.doNotifySceneOfUpdates();
  };

  //============ sound ===============
  p.doAddSound = function(name){
    //TODO
  };
  p.doPlaySound = function(name){
    //TODO
  };
  p.doPauseSound = function(name){
    //TODO
  };
  p.doKillSound = function(name){
    //TODO
  };
}());










