var HHgHolderHashCont = 0;

var HHgHolder = function(props){
  //props width, height, zIndex, scale(xy or x)

  HHgHolderHashCont++;
  if(HHgHolderHashCont > 50000){
    HHgHolderHashCont = 0;
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
  this._positionInParentOriginal  = this._positionInScreenOriginal;
  this._positionInScreenNet = this._positionInScreenOriginal;
  this._positionStored = this._positionInScreenOriginal;

  this._children;
  this._actions;
  this._clusters =[];
  this._sequences=[];
  this._paused = false;

  this._div;
  this._insideDiv;

  this._hash = HHgHolderHashCont;
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

  p.getCanvas = function(){
    return this._canvas;
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
      returnVal = true;
    }else if(this.frameUpdates.scaleBy !== undefined){
      this._scaleOriginal = this._scaleOriginal.plus( this.frameUpdates.scaleBy);
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

  p.getPositionInScreenOriginal = function(){
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

  p.doAddChild = function (child){
    //this should be a private method
    this._children = this._children || [];
    if(child instanceof HHgHolder !== true){
      throw("Tried to add a child not of HHgHolder Class");
      return;
    }
    this._children.push(child);
  };

  p.doRemoveChild = function(child){
    //this should be a private method
    return HHg.doRemoveThingFromArray(this._children, child);
  };

  p.doMoveToNewParent = p.doAddToNewParent = function(props){
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
      this._parent.doRemoveChild(this);
    }

    this._parent = props.parent || HHgGameHolder;

    if(this._parent instanceof HHgHolder !== true){
      throw("tried to add child to a parent not of HHgHolder Class");
    }

    this._parent.doAddChild(this);

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

  p.doFinalizeAction = function(action){
    this._actions = this._actions || {};
    if(action.name){
      if(this._actions.hasOwnProperty(action.name)){
        console.log("WARNING: Action with name: " + action.name + " already exists on Holder");
        return;
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
      delete this._actions[action.name];

    }else{
      delete this._actions[action.name];
      this._actionsTotal--;
      if(this._actionsTotal <= 0){
        this.actionTotal = 0;
        HHgActionManager.doRemoveOwner(this);
      }
    }
  };
  p.doRemoveActionByName = function(name){
    this.doRemoveAction(this._actions[name]);
  };

  p.doActionMoveInScreenTo = function(props){
    var theAction;
    theAction = new HHgActionMoveBy(this, this._positionInScreenOriginal.subtractedFrom(HHg.returnPositionProps(props)), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionMoveInScreenBy = function(props){
    var theAction;
    theAction = new HHgActionMoveBy(this, HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionMoveInScreenForever = function(props){
    var theAction;
    theAction = new HHgActionMoveForever(this, (HHg.returnPositionProps(props) || HHg.returnSpeedXYprops(props)), this._positionInScreenOriginal, HHg.returnEaseProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionRotateBy = function(props){
    var theAction;
    theAction = new HHgActionRotateBy(this, HHg.returnRotationProps(props), this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
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
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
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
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionRotateForever = function(props){
    var theAction;
    theAction = new HHgActionRotateForever(this, (HHg.returnRotationProps(props) || HHg.returnSpeedNProps(props)), HHg.returnEaseProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionScaleBy = function(props){
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionScaleTo = function(props){
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props).timesInverse(this._scaleOriginal), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionScaleForever = function(props){
    var theAction;
    theAction = new HHgActionScaleForever(this, (HHg.returnScaleProps(props) || HHg.returnSpeedXYProps(props)), this._scaleOriginal, HHg.returnEaseProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionFollowQuad = function(props){
    var theAction;
    theAction = new HHgActionFollowQuad(this, HHg.returnControlPositionProps(props), HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), props.onComplete, HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionTimer = function(props){
    var theAction;
    theAction = new HHgActionTimer(this, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));
    theAction.name = props.name;
    theAction.sequenceChain = props.sequenceChain;
    return this.doFinalizeAction(theAction);
  };

  p.doActionPlaySound = function(props){
    //does this trigger a new sound or existing cached sound. how does sound caching work?
    //then test storing actions and plaing them later
    //then test clusters, then test sequences.
    var test = HHgAudio.newSound("click");
    console.log(test.duration);
  };

  p.doActionCustom = function(func, time, onComplete){
    func.bind(this)();
    return this.doActionTimer({time: time, onComplete: onComplete});
  };

  p.doAction = function(actionName, props){
    this.returnActionFunction(actionName).call(props);
  };

  p.returnActionFunction = function(name){
    switch(name.toLowerCase()){
      case "timer":
      return this.doActionTimer.bind(this);
      case "followquad":
      return this.doActionFollowQuad.bind(this);
      case "scaleforever":
      return this.doActionScaleForever.bind(this);
      case "scaleto":
      return this.doActionScaleTo.bind(this);
      case "scaleby":
      return this.doActionScaleBy.bind(this);
      case "rotateforever":
      return this.doActionRotateForever.bind(this);
      case "rotaterightto":
      return this.doActionRotateRightTo.bind(this);
      case "rotateleftto":
      return this.doActionRotateLeftTo.bind(this);
      case "rotateby":
      return this.doActionRotateBy.bind(this);
      case "moveby":
      case "moveinscreenby":
      return this.doActionMoveInScreenBy.bind(this);
      case "moveto":
      case "moveinscreento":
      return this.doActionMoveInScreenTo.bind(this);
      case "moveinscreenforever":
      return this.doActionMoveInScreenForever.bind(this);
      case "custom":
      return this.doActionCustom.bind(this);
      case "playsound":
      return this.doActionPlaySound.bind(this);
    }
  };

  //============= ACTION CLUSTERS AND SEQUENCES =============

  p.makeAction = p.makeStoredAction = p.storeAction = function(actionName, props){
    return {actionCall: this.returnActionFunction(actionName), props: props, owner: this};
  };

  p.doStoredAction = p.callStoredAction = function(storedAction){
    if(storedAction.isActionCluster){
      return this.doActionCluster(storedAction);
    }else if(storedAction.isActionSequence){
      return this.doActionSequence(storedAction);
    }else{
      return {owner: storedAction.props.owner, name: storedAction.actionCall.call(undefined, storedAction.props)};
    }
  };

  p.makeActionCluster = p.makeCluster = function(storedActions, name, onComplete){
    var i, key, longestTime = 0, finalActions = [], tempAction,totalActions = 1;
    if(storedActions.length !== +storedActions.length){
      for(key in storedActions){
        finalAction.push(storedActions[key]);
      }
    }else{
      finalActions = storedActions;
    }

    for(i = 0; i < finalActions.length; i++){
      tempAction = finalActions[i];
      totalActions++;
      if(tempAction.props.time > longestTime){
        longestTime = tempAction.props.time;
      }
    }
    var func = function(){
      this.props.onComplete();
    };

    var sFunc = function(){
      this.props.sequenceChain();
    };

    finalActions.unshift(this.makeAction("timer", {time: longestTime, onComplete: func.bind(finalActions), sequenceChain: sFunc.bind(finalActions)  } ) );
    finalActions.isActionCluster = true;
    finalActions.props = {time: longestTime, name: name, myActions: [], totalActions: totalActions, owner: this, onComplete: onComplete};
    return finalActions;
  };

  p.doActionCluster = function(cluster){
    var i, tempThing, clusterName;
    for(i = 0; i < cluster.length; i++){
      tempThing = cluster[i];
      cluster.props.myActions.push(this.doStoredAction(tempThing));
    }
    return this.doFinalizeAction(cluster);
  };

  p.makeActionSequence = function(storedActions, name, onComplete){
    var i, key, finalActions = [], finalSequence = [], tempAction, tempAction2, tempFunction;
    if(storedActions.length !== +storedActions.length){
      for(key in storedActions){
        finalActions.push(storedActions[key]);
      }
    }else{
      finalActions = storedActions;
    }
    finalActions.props = {myActions: [], totalActions: finalActions.length, name: name, time: 0, onComplete: onComplete, sequenceChain: function(){}};
    finalActions.push(this.makeAction("timer", {time: 0, onComplete: onComplete}));

    for(i = 0; i < finalActions.length; i++){
      tempAction = finalActions[i];
      finalActions.props.time += tempAction.props.time;

      if(i < finalActions.length - 1){
        var newAction = finalActions[i+1];
        var func = function(sequence, nextAction){
          sequence.props.myActions.push(this.doStoredAction(nextAction));
        };
        tempAction.props.sequenceChain = func.bind(this,finalActions, newAction);
      }else{
        var func = function(){
          this.props.sequenceChain();
        };
        tempAction.props.sequenceChain = func.bind(finalActions);
      }
    }
    finalActions.isActionSequence = true;
    return finalActions;
  };

  p.doActionSequence = function(sequence){
    sequence.props.myActions.push(this.doStoredAction(sequence[0]));
    return this.doFinalizeAction(sequence);
  };

  //============= MOUSE =================
  //this will all be overridden for custom games
  p.doMouseDown = function(){
    //this.setScaleStored();
    //this.setScaleOriginalBy(.9,.9);
    //this.doActionScaleForever({scaleX: .9, scaleY: .9, name: "mousedownscale"});
    //this.doActionPlaySound("click");
    //this.doActionRotateForever({speed:300, name: "mousemoverotate"});
  }

  p.doMouseUp = function(mouseWasOverWhenReleased){
    //this.setScaleOriginalBy(1.0/0.9,1.0/0.9);
    //this.doRemoveActionByName("mousedownscale");
    this.isBeingDragged = false;
  };

  p.doStartMouseMove = function(){
    this.setPositionStored();
    this.isBeingDragged = true;
    console.log("MOUSE START");
  };

  p.doMouseMove = function(){
    this.setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.plus(HHgMouse.draggingOffsetXY));
    if(this.test = "testTwo"){
    }
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
  }

  p.doHide = function(){
    this.setVisible(false);
  };

  p.doAddSprite = function(name, whitePixelTintRGB){
    HHgSprite.doAddSpriteToHolder(this,name,whitePixelTintRGB);
  };

  p.doAddParagraphText = function(props){
    HHgText.doAddTextParagraphToHolder(this,props);
  };

  p.doAddCanvasText = p.doAddText = function(props){
    HHgText.doAddTextCanvasToHolder(this,props);
  };

  p.doMakeRoundedRectangle = p.doMakeRectangle = function(props){
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










