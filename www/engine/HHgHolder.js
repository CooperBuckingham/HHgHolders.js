var HHgHolderHashCount = 0;

var HHgHolder = function (props) {
  HHgHolderHashCount++;
  if (HHgHolderHashCount > 50000) {
    HHgHolderHashCount = 0;
    HHg.warn("HASH passed 50000");
  }

  var size = HHg.returnSizeProps(props) || new HHgVector2(HHgGameHolder.getWidthOriginal(), HHgGameHolder.getHeightOriginal());

  this._scaleXSizeToParent = false;
  this._scaleYSizeToParent = false;

  if (typeof size.x === "string") {
    if (size.x.indexOf("%") > 0) {
      this._scaleXSizeToParent = true;
    } else {
      HHg.warn("WARNING: received argument of type string for an x value, without a percent symbol. This could be indicative of a problem", size.x);
      size.x = parseFloat(size.x);
    }
  }
  if (typeof size.y === "string") {
    if (size.y.indexOf("%") > 0) {
      this._scaleYSizeToParent = true;
    } else {
      HHg.warn("WARNING: received argument of type string for a y value, without a percent symbol. This could be indicative of a problem", size.y);
      size.y = parseFloat(size.y);
    }
  }
  this._sizeOriginal = size;
  this._sizeOriginalHalf = this._sizeOriginal.times(.5);

  this._rotationOriginal = HHg.returnRotationProps(props) || 0;
  this._rotationNet = this._rotationOriginal;
  this._rotationStored = 0;

  this._parent;

  this._backgroundColor;
  this._tintColor;

  this._scaleOriginal = HHg.returnScaleProps(props) || new HHgVector2(1, 1);
  this._scaleNet = this._scaleOriginal;
  this._scaleStored = this._scaleOriginal;
  this._scaleIgnoreParentScale = false;
  this._scaleUniformOnly = false;
  this._positionInScreenOriginal = new HHgVector2(0, 0);
  this._positionInParentOriginal = new HHgVector2(0, 0);
  this._positionInScreenNet = this._positionInScreenOriginal;
  this._positionStored = this._positionInScreenOriginal;

  this._children;
  this._actions;
  this._clusters = [];
  this._sequences = [];
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
  if (this._zIndex === undefined) {
    this._zIndex = 1;
  }

  this._counterForNamingActions = 0;
  this._actionsTotal = 0;

  this.fontSizeOriginal = 1;
  this.fontSizeScaled = 1;
  this.borderWidthScaled = 0;
  this.borderWidthOriginal = 0;

  this.isScene = false;
  this.isDraggable = false;
  this.isBeingDragged = false;

  this.test = "no";

  this.resetChanges();

  this.resetFrameUpdates();
};

(function () {
  var p = HHgHolder.prototype;

  p.resetChanges = function () {
    this.changes = {
      scale: false,
      position: false,
      rotation: false,
      tint: false,
      backgroundColor: false,
      visible: false,
      mouseable: false,
      zIndex: false,
      classList: false
    }
  };

  p.resetFrameUpdates = function () {
    this.frameUpdates = {
      positionBy: undefined,
      rotationBy: undefined,
      scaleBy: undefined,
      positionTo: undefined,
      rotationTo: undefined,
      scaleTo: undefined,
      positionAbsolute: undefined
    }
  };

  p.resetFramePositionUpdates = function () {
    this.frameUpdates.positionBy = undefined;
    this.frameUpdates.positionTo = undefined;
    this.frameUpdates.positionAbsolute = undefined;
  };

  p.setIsDraggable = function (bool) {
    this.isDraggable = bool;
  };

  p.getIsDraggable = function () {
    return this.isDraggable;
  };

  p.setPaused = function (bool) {
    this._paused = bool;
    if (this._children === undefined) return;
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].setPaused(bool);
    }
  };

  p.getPaused = function () {
    return this._paused;
  };

  p.setScene = function () {
    this._scaleOriginal = new HHgVector2(1, 1);
    this._scaleNet = this._scaleOriginal;
    this._sizeOriginal.x = HardwareScreen.w;
    this._sizeOriginal.y = HardwareScreen.w / (HHgScreen.w * HHgScreen.maxh);
    this._parent = "stop";
    this._mouseable = false;
    this.test = "scene";
  };

  p.setGameHolder = function () {
    this._scaleOriginal = new HHgVector2(HardwareScreen.w / HHgScreen.w, HardwareScreen.w / HHgScreen.w);
    HHgPixelScale = this._scaleOriginal.x;
    this._scaleNet = this._scaleOriginal;
    this._sizeOriginal.x = HHgScreen.w;
    this._sizeOriginal.y = HHgScreen.h;
    this._parent = HHgScene;
    this._mouseable = false;
    this.isGameHolder = true;
    this.getScaleNetForChildPosition = function () {
      return HHg1Vector;
    };
    this.test = "gameholder";
  };

  p.setCanvas = function (canvas) {
    this._canvas = canvas;
  };

  p.setTextCanvas = function (canvas) {
    this._textCanvas = canvas;
  };

  p.getCanvas = function () {
    return this._canvas;
  };

  p.getTextCanvas = function () {
    return this._textCanvas;
  };

  p.doFrameDump = function () {
    if (this.frameDumpScale()) {
      this._doRecalcScale();
    }
    if (this.frameDumpRotation()) {
      this._doRecalcRotation();
    }
    if (this.frameDumpPosition() || this.isBeingDragged === true) {
      this._doRecalcPosition();
    } else {
      this._updatePositionFromParentMove();
    }
    this.doMarkForFinalPass();
  };

  p.doMarkForFinalPass = function () {
    HHgScene.addToFinalPassList(this);
    if (this._children) {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i]._updatePositionFromParentMove();
        this._children[i].doMarkForFinalPass();
      }
    }
  };

  p.frameDumpPosition = function () {
    var returnVal = false;
    if (this.frameUpdates.positionAbsolute !== undefined) {
      this._positionInScreenOriginal = this.frameUpdates.positionAbsolute;
      returnVal = true;
    } else if (this.isBeingDragged === true) {
      //won't allow other types of position updates
    } else if (this.frameUpdates.positionTo !== undefined) {
      this._positionInScreenOriginal = this.frameUpdates.positionTo;
      returnVal = true;
    } else if (this.frameUpdates.positionBy !== undefined) {
      this._positionInScreenOriginal = this._positionInScreenOriginal.plus(this.frameUpdates.positionBy);
      returnVal = true;
    }

    this.frameUpdates.positionBy = undefined;
    this.frameUpdates.positionTo = undefined;
    this.frameUpdates.positionAbsolute = undefined;
    return returnVal;
  };

  p.frameDumpRotation = function () {
    var returnVal = false;
    if (this.frameUpdates.rotationTo !== undefined) {
      this._rotationOriginal = this.frameUpdates.rotationTo;
      returnVal = true;
    } else if (this.frameUpdates.rotationBy !== undefined) {
      this._rotationOriginal += this.frameUpdates.rotationBy;
      returnVal = true;
    }

    this.frameUpdates.rotationBy = undefined;
    this.frameUpdates.rotationTo = undefined;
    return returnVal;
  };

  p.frameDumpScale = function () {
    var returnVal = false;
    if (this.frameUpdates.scaleTo !== undefined) {
      this._scaleOriginal = this.frameUpdates.scaleTo;
      this._scaleOriginal.zeroFloor();
      returnVal = true;
    } else if (this.frameUpdates.scaleBy !== undefined) {
      this._scaleOriginal = this._scaleOriginal.plus(this.frameUpdates.scaleBy);
      this._scaleOriginal.zeroFloor();
      returnVal = true;
    }

    this.frameUpdates.scaleBy = undefined;
    this.frameUpdates.scaleTo = undefined;
    return returnVal;
  };

  p.framePositionBy = function (xy) {
    if (this.frameUpdates.positionBy) {
      this.frameUpdates.positionBy = this.frameUpdates.positionBy.plus(xy);
    } else {
      this.frameUpdates.positionBy = xy;
    }
    this._notifySceneOfUpdates();
  };

  p.frameRotationBy = function (val) {
    if (this.frameUpdates.rotationBy) {
      this.frameUpdates.rotationBy += val;
    } else {
      this.frameUpdates.rotationBy = val;
    }

    this._notifySceneOfUpdates();
  };

  p.frameScaleBy = function (xy) {
    if (this.frameUpdates.scaleBy) {
      this.frameUpdates.scaleBy = this.frameUpdates.scaleBy.plus(xy);
    } else {
      this.frameUpdates.scaleBy = xy;
    }
    this._notifySceneOfUpdates();
  };

  p.framePositionTo = function (xy) {
    this.frameUpdates.positionTo = xy;
    this._notifySceneOfUpdates();
  };

  p.frameRotationTo = function (val) {
    this.frameUpdates.rotationTo = val;
    this._notifySceneOfUpdates();
  };

  p.frameScaleTo = function (xy) {
    this.frameUpdates.scaleTo = xy;
    this._notifySceneOfUpdates();
  };

  p.framePositionAbsolute = function (xy) {
    this.frameUpdates.positionAbsolute = xy;
    this._notifySceneOfUpdates();
  };

  p.getHash = function () {
    return this._finalHash;
  };

  p.setMouseable = function (mouseable) {
    this._mouseable = mouseable;
    this.changes.mouseable = true;
    if (this._div) {
      this._notifySceneOfUpdates();
    }
  };

  p.getMouseable = function () {
    return this._mouseable;
  };

  p.setVisible = function (val) {
    if (this._visible === val) {
      return;
    }
    this._visible = val;
    this.changes.visible = true;
    if (this._div) {
      this._notifySceneOfUpdates();
    }
  };

  p.getVisible = function () {
    return this._visible;
  };

  p.setBackgroundColor = function (color) {
    this._backgroundColor = HHg.returnColorProps(color);
    this.changes.backgroundColor = true;
    if (this._parent !== undefined) {
      this._notifySceneOfUpdates();
    }
  };

  p.getBackgroundColor = function () {
    return this._backgroundColor;
  };

  p.setTintToRGBA = function (color) {
    this.changes.tint = true;
    if (this._parent !== undefined) {
      this._notifySceneOfUpdates();
    }
    this._tintColor = color;
  };

  p.setTintByRGBA = function (color, percent) {
    this.changes.tint = true;
    if (this._parent !== undefined) {
      this._notifySceneOfUpdates();
    }
    if (this._tintColor) {
      this._tintColor.blendColorIn(color, percent);
    } else {
      this.setTintToRGBA(color);
    }
  };

  p.getTintRGBA = function () {
    return this._tintColor;
  };

  //do we want these to be calculations if the holder is holding things?
  p.getWidthOriginal = function () {
    return this._sizeOriginal.x;
  };

  p.getHeightOriginal = function () {
    return this._sizeOriginal.y;
  };

  p.getSizeOriginal = function () {
    return this._sizeOriginal;
    //return new HHgVector2(this._sizeOriginal.x, this._sizeOriginal.y);
  };

  p.getSizeNet = function () {
    return new HHgVector2(this.getWidthNet(), this.getHeightNet());
  };

  p.getFirstWidth = function () {
    return this._sizeOriginal.x * this._parent.getScaleNetForChildScale().x;
    //return this._sizeOriginal.x;
  };

  p.getWidthNet = function () {
    return this._sizeOriginal.x * this._scaleNet.x;
  };

  p.getFirstHeight = function () {
    return this._sizeOriginal.y * this._parent.getScaleNetForChildScale().y;
  };

  p.getHeightNet = function () {
    return this._sizeOriginal.y * this._scaleNet.y;
  };

  p.getMySizeOffset = function () {
    return this._sizeOriginalHalf.times(this.getScaleNetForMyPosition());
  };

  p.getCenterPosition = function () {
    return this._positionInScreenNet.plus(this.getMySizeOffset());
  };

  p.getParent = function () {
    return this._parent;
  };

  p.getHalfWidth = function () {
    return this.getWidthNet() / 2;
  };

  p.getHalfHeight = function () {
    return this.getHeightNet() / 2;
  };

  p.getZIndex = function () {
    return this._zIndex;
  };

  p.setZIndexTo = function (z, doNotUpdateChildren) {
    this.changes.zIndex = true;
    this._zIndex = z;
    this._notifySceneOfUpdates();
    if (doNotUpdateChildren !== true) {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].setZIndexTo(z);
      }
    }
  };

  p.setZIndexBy = function (z, doNotUpdateChildren) {
    this.changes.zIndex = true;
    this._zIndex += z;
    this._notifySceneOfUpdates();
    if (doNotUpdateChildren !== true) {
      if (!this._children) return;
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].setZIndexBy(z);
      }
    }
  };

  p.setDiv = function (div) {
    this._div = div;
  };
  p.getDiv = function () {
    return this._div;
  };
  p.setInsideDiv = function (insideDiv) {
    this._insideDiv = insideDiv;
  };
  p.getInsideDiv = function () {
    if (!this._insideDiv) {
      HHg.warn("ERROR: attempting to access undefined HHgHolder._insideDiv. This likely means the holder has not been added to the scene.", this);
      throw new ReferenceError("getInsideDiv. See Error Log Above for Holder Info.", "HHgHolder.js");
    }
    return this._insideDiv;
  };
  p.setScalerDiv = function (scalerDiv) {
    this._scalerDiv = scalerDiv;
  };
  p.getScalerDiv = function () {
    if (!this._scalerDiv) {
      HHg.warn("ERROR: attempting to access undefined HHgHolder._scalerDiv. This likely means the holder has not been added to the scene.", this);
      throw new ReferenceError("getInsideDiv. See Error Log Above for Holder Info.", "HHgHolder.js");
    }
    return this._scalerDiv;
  };

  //============ POSITION ==================

  p._doRecalcPosition = function () {
    if (this._parent === "stop") return;
    if (this._parent == undefined) {
      return;
    }
    this._convertOriginalToNetPosition();
    if (this._parent !== undefined) {
      this._positionInParentOriginal = this._positionInScreenOriginal.getVectorRotated(this._parent.getPositionInScreenOriginal(), 1 * this._parent.getRotationNet());
      this._positionInParentOriginal = this._parent.getPositionInScreenOriginal().subtractedFrom(this._positionInParentOriginal);
      this._positionInParentOriginal = this._positionInParentOriginal.dividedBy(this._parent.getScaleNetForChildPosition());
    }
    this.changes.position = true;
    if (this._children) {
      HHg.doForEach(this._children, function (child) {
        child._updatePositionFromParentMove();
      });
    }
  };

  p._setPositionStored = function () {
    this._positionStored = this._positionInScreenOriginal;
  };

  p.getPositionStored = function () {
    return this._positionStored;
  };

  p._setPositionInScreenTo = function (props) {
    this.framePositionTo(HHg.returnPositionProps(props));
  };

  p._setPositionInScreenBy = function (props) {
    this.framePositionBy(HHg.returnPositionProps(props));
  };

  p._setPositionInScreenAbsolute = function (props) {
    this.framePositionAbsolute(HHg.returnPositionProps(props));
  };

  p.getPositionInScreenOriginal = p.getPosition = function () {
    return this._positionInScreenOriginal;
  };

  p.getPositionWithCentering = function () {
    return this.returnHalfSizeVector().plus(this._positionInScreenOriginal);
  };

  p.getPositionInParentOriginal = function () {
    return this._positionInParentOriginal;
  };

  p.getPositionInScreenNet = function () {
    return this._positionInScreenNet;
  };

  p._setPositionInParentTo = function (props) {
    this._positionInParentOriginal = HHg.returnPositionProps(props);
    this._notifySceneOfUpdates();
    this.resetFramePositionUpdates();
    this._updatePositionFromParentMove();
  };

  p._setPositionXInParentTo = function (x) {
    this._setPositionInParentTo({x: x, y: this._positionInParentOriginal.y});
  };

  p._setPositionYInParentTo = function (y) {
    this._setPositionInParentTo({y: y, x: this._positionInParentOriginal.x});
  };

  p._updatePositionFromParentMove = function () {
    if (this.isBeingDragged === true) {
      return;
    }
    this._positionInScreenOriginal = this._positionInParentOriginal;
    if (this._parent !== undefined) {
      var tempPos = this._positionInParentOriginal.times(this._parent.getScaleNetForChildPosition());
      tempPos = this._parent.getPositionInScreenOriginal().plus(tempPos);
      this._positionInScreenOriginal = tempPos.getVectorRotated(this._parent.getPositionInScreenOriginal(), -1 * this._parent.getRotationNet());
      this._convertOriginalToNetPosition(); //TODO: scale y of parent on initial is not affecting child y placement correctly. Error could be here, or in convertOriginalToNet
    }
    this.changes.position = true;
    if (this._children) {
      HHg.doForEach(this._children, function (child) {
        child._updatePositionFromParentMove();
      });
    }
  };

  p._convertOriginalToNetPosition = function () {
    var tempPos = this._positionInScreenOriginal.minus(this.getSizeOriginal().times(.5).times(this._parent.getScaleNetForChildPosition().times(this._scaleOriginal)));
    //var tempPos = this._positionInScreenOriginal.minus(this._sizeOriginalHalf.times(this._scaleNet));

    tempPos.plusEquals(HHgScreenSizeHalf); // Move 50 percent of screen size to center
    this._positionInScreenNet = tempPos.times(HHgPixelScale); //adjust for screen scale
  };

  //=============== SCALE ================

  p.setScaleStored = function () {
    this._scaleStored = this._scaleOriginal;
  };

  p.getScaleStored = function () {
    return this._scaleStored;
  };

  p.setScaleToStored = function () {
    this._setScaleOriginalTo(this._scaleStored);
  };

  p.returnHalfSizeVector = function () {
    return new HHgVector2(this.getHalfWidth(), this.getHalfHeight());
  };

  p.getScaleOriginal = function () {
    return this._scaleOriginal;
  };

  p._setScaleOriginalTo = function (props) {
    this.frameScaleTo(HHg.returnScaleProps(props));
  };

  p._setScaleOriginalBy = function (props) {
    this.frameScaleBy(HHg1Vector.subtractedFrom(HHg.returnScaleProps(props)));
  };

  p._setScaleOriginalByActionFraction = function (props) {
    this.frameScaleBy(HHg.returnScaleProps(props).plus(HHg1Vector));
  };

  p.getScaleNetForChildScale = function () {
    this._scaleNet = this._scaleIgnoreParentScale ? this._scaleOriginal / this._parent.getScaleNetForChildPosition() : this._scaleNet;
    if (this._scaleUniformOnly === true) {
      var larger = (this._scaleNet.x > this._scaleNet.y) ? this._scaleNet.x : this._scaleNet.y;
      this._scaleNet = new HHgVector2(larger, larger);
    }
    return this._scaleNet;
  };

  p.getScaleNetForChildPosition = function () {
    if (!this._parent || this._parent.isGameHolder === true) {
      return this._scaleOriginal;
    }
    return this._parent.getScaleNetForChildPosition().times(this.getScaleOriginal());
  };

  p.getScaleNetForMyPosition = function () {
    if (this._parent !== undefined) {
      return this._parent.getScaleNetForChildScale();
    }
    return HHg1Vector;
  };

  p._doRecalcScale = function () {
    this._scaleNet = this._scaleOriginal;
    if (this._parent !== undefined) {
      this._scaleNet = this._parent.getScaleNetForChildScale().times(this._scaleNet);
    }
    this.fontSizeScaled = this.fontSizeOriginal * this._scaleNet.x; //TODO, cooper, investigate
    this.borderWidthScaled = this.borderWidthOriginal * this._scaleNet.x;

    this.changes.scale = true;
    if (this._children) {
      HHg.doForEach(this._children, function (child) {
        child._doRecalcScale();
      });
    }
  };
  //=============== ROTATION ====================

  p.setRotationStored = function () {
    this._rotationStored = this._rotationOriginal;
  };

  p.getRotationStored = function () {
    return this._rotationStored;
  };

  p._setRotationOriginalTo = function (props) {
    this.frameRotationTo(HHg.returnRotationProps(props) % 360);
  };

  p._setRotationOriginalBy = function (props) {
    this.frameRotationBy(HHg.returnRotationProps(props) % 360);
  };

  p.getRotationOriginal = function () {
    return this._rotationOriginal % 360;
  };

  p.getRotationNet = function () {
    return this._rotationNet % 360;
  };

  p.getParentRotation = function () {
    return this._parent.getRotationOriginal();
  };

  p._doRecalcRotation = function () {
    if (this._parent === "stop") return;
    this._rotationNet = this._rotationOriginal;

    if (this._parent !== undefined) {
      this._rotationNet += this._parent.getRotationNet();
    }

    this.changes.rotation = true;
    if (this._children) {
      HHg.doForEach(this._children, function (child) {
        child._doRecalcRotation();
      });
    }
  };

  //==================== alignment
  p.alignHLeft = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionXInParentTo(this._parent.getWidthOriginal() * -0.5 + this.getWidthNet() * .5);
  };

  p.alignHRight = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionXInParentTo(this._parent.getWidthOriginal() * .5 - this.getWidthNet() * .5);
  };

  p.alignHCenter = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionXInParentTo(0);
  };

  p.alignVTop = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionYInParentTo(this._parent.getHeightOriginal() * .5 - this.getHeightNet() * .5);
  };

  p.alignVBottom = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionYInParentTo(this._parent.getHeightOriginal() * -0.5 + this.getHeightNet() * .5);
  };

  p.alignVCenter = function () {
    if (!this._parent) {
      HHg.warn("WARNING: attempted to align a holder with no parent");
      return;
    }

    this._setPositionYInParentTo(0);
  };

  //==================== management

  p._notifySceneOfUpdates = function () {
    HHgScene.doAddToDirtyList(this);
  };

  p._addToChildrenList = function (child) {
    //this should be a private method
    this._children = this._children || [];
    if (child instanceof HHgHolder !== true) {
      throw("Tried to add a child not of HHgHolder Class");
      return;
    }
    this._children.push(child);
  };

  p._removeFromChildrenList = function (child) {
    return HHg.doRemoveThingFromArray(this._children, child); //TODO, cooper, why isn't this a hashmap?
  };

  p.addChild = function (child) {
    child.doMoveToNewParent({parent: this});
  };

  p.destroyChild = function (child) {
    child.destroySelf();
  };

  p.destroySelf = function () {
    HHgActionManager.doRemoveOwner(this);
    HHgScene.doRemoveThisHolder(this);
    if (this._parent) {
      this._parent._removeFromChildrenList(this);
    }

    if (this._children) {
      HHg.doForEach(this._children, function (child) {
        child.destroySelf();
      });
    }
  };

  p.doMoveToNewParent = p.addToParent = function (props) {
    if (this._parent === "stop") {
      return;
    }
    if (props === undefined) {
      props = {};
    }
    if (props.parent === "stop") {
      HHgScene.doAddThisHolder(this);
      return;
    }

    props.position = HHg.returnPositionProps(props, HHg0Vector);

    if (props.position === undefined) {
      props.position = HHg0Vector;
    }

    if (this._parent === undefined) {
      HHgScene.doAddThisHolder(this);
    } else {
      this._parent._removeFromChildrenList(this);
    }

    this._parent = props.parent || HHgGameHolder;
    if (this === this._parent) throw("tried to add holder to itself");

    if (this._parent instanceof HHgHolder !== true) {
      throw("tried to add child to a parent not of HHgHolder Class");
    }

    // if size is a percentage, then we get the parents size, and set this child to a hard number
    // then forget about the percentages. Or should adding it to a different parent, then change the size again?
    if (this._scaleXSizeToParent || this._scaleYSizeToParent) {
      this._sizeOriginal.x = this._scaleXSizeToParent ? (parseFloat(this._sizeOriginal.x) / 100 * this._parent._sizeOriginal.x) : this._sizeOriginal.x;
      this._sizeOriginal.y = this._scaleYSizeToParent ? (parseFloat(this._sizeOriginal.y) / 100 * this._parent._sizeOriginal.y) : this._sizeOriginal.y;

      this._sizeOriginal = new HHgVector2(this._sizeOriginal.x, this._sizeOriginal.y);
      this._sizeOriginalHalf = this._sizeOriginal.times(.5);
    }

    this._parent._addToChildrenList(this);

    if (this.test === "CENTER") {
      debugger;
    }

    this._setRotationOriginalTo(this._rotationOriginal);
    this._setScaleOriginalTo(this._scaleOriginal);
    this._setPositionInScreenTo(new HHgVector2(0, 0));

    if (HHg.returnIsScreenPosProps(props)) {
      this._positionInScreenOriginal = props.position;
      this._setPositionInScreenTo(props.position)
    } else {
      this._setPositionInParentTo(props.position)
    }
  };

  //============= ACTIONS ================

  p.doFinalizeAction = function (action, props) {
    this._actions = this._actions || {};

    if (props.name) {
      action.name = props.name;
      if (this._actions[action.name] !== undefined) {
        action.name = action.name + "_" + this._counterForNamingActions + HHg.returnRandomHash();
        HHg.warn("WARNING: Action with name: " + action.name + " already exists on Holder");
      }
    } else {
      action.name = "" + this._counterForNamingActions + HHg.returnRandomHash();
    }

    this._counterForNamingActions++;

    this._actions[action.name] = action;
    this._actionsTotal++;
    HHgActionManager.doAddAction(this, action);

    return action;
  };

  p.getActions = function () {
    return this._actions;
  };

  p.doRemoveAction = function (action) {
    if (this._actions[action.name] === undefined) {
      HHg.warn("WARNING: Trying to remove an action not listed on this holder")
      return;
    }

    if (this._actionsTotal <= 0) {
      HHg.warn("ERROR: this holder has this action, but total actions is ", this._actionsTotal);
    }
    delete this._actions[action.name];
    this._actionsTotal--;
    if (this._actionsTotal <= 0) {
      this._actionsTotal = 0;
      HHgActionManager.doRemoveOwner(this);
    }

    action.beRemoved();
  };

  p.doRemoveActionByName = function (name) {
    if (!this._actions) return;
    this.doRemoveAction(this._actions[name]);
  };

  p.doActionMoveInScreenTo = function (props) {
    var theAction;
    theAction = new HHgActionMoveBy(this, this._positionInScreenOriginal.subtractedFrom(HHg.returnPositionProps(props)), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionMoveInScreenBy = function (props) {
    var theAction;
    theAction = new HHgActionMoveBy(this, HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionMoveInScreenForever = function (props) {
    var theAction;
    theAction = new HHgActionMoveForever(this, (HHg.returnPositionProps(props) || HHg.returnSpeedXYprops(props)), this._positionInScreenOriginal, HHg.returnEaseProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionRotateBy = function (props) {
    var theAction;
    theAction = new HHgActionRotateBy(this, HHg.returnRotationProps(props), this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionRotateLeftTo = function (props) {
    var degrees = HHg.returnRotationProps(props) % 360;
    if (degrees > 180) {
      degrees = -(degrees - 180);
    }

    if (degrees < this._rotationOriginal) {
      degrees = degrees - this._rotationOriginal;
    } else {
      degrees = -(360 - Math.abs(this._rotationOriginal - degrees) );
    }

    var theAction;
    theAction = new HHgActionRotateBy(this, degrees, this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionRotateRightTo = function (props) {
    var degrees = HHg.returnRotationProps(props) % 360;
    if (degrees > 180) {
      degrees = -(degrees - 180);
    }

    if (degrees > this._rotationOriginal) {
      degrees = degrees - this._rotationOriginal;
    } else {
      degrees = -(360 - Math.abs(this._rotationOriginal - degrees) );
    }

    var theAction;
    theAction = new HHgActionRotateBy(this, degrees, this._rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionRotateForever = function (props) {
    var theAction;
    theAction = new HHgActionRotateForever(this, (HHg.returnRotationProps(props) || HHg.returnSpeedNProps(props)), HHg.returnEaseProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionScaleBy = function (props) {
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionScaleTo = function (props) {
    var theAction;
    theAction = new HHgActionScaleBy(this, HHg.returnScaleProps(props).timesInverse(this._scaleOriginal), this._scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionScaleForever = function (props) {
    var theAction;
    theAction = new HHgActionScaleForever(this, (HHg.returnScaleProps(props) || HHg.returnSpeedXYProps(props)), this._scaleOriginal, HHg.returnEaseProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionFollowQuad = function (props) {
    var theAction;
    theAction = new HHgActionFollowQuad(this, HHg.returnControlPositionProps(props), HHg.returnPositionProps(props), this._positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), props.onComplete, HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionTimer = function (props) {
    var theAction;
    theAction = new HHgActionTimer(this, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));

    this.doFinalizeAction(theAction, props);
    return theAction;
  };

  p.doActionPlaySound = function (props) {
    //does this trigger a new sound or existing cached sound. how does sound caching work?
    //then test storing actions and plaing them later
    //then test clusters, then test sequences.
    var test = HHgAudio.newSound("click");
  };

  p.doActionCustom = function (func, time, onComplete) {
    //todo, this should become a cluster, a custom action needs to return an actual action
    //Removing for now;
    HHg.warn("Custom Actions are disabled");
    return {};
    func.bind(this)();
    this.doActionTimer({time: time, onComplete: onComplete});

  };

  p.doAction = function (actionName, props) {
    if (typeof actionName === "object") {
      this.doStoredAction(actionName);
      return;
    }
    this.returnActionFunction(actionName).call(this, props);
  };

  p.returnActionFunction = function (name) {
    switch (name.toLowerCase()) {
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

  p.makeAction = p.makeStoredAction = p.storeAction = function (actionName, props) {
    return {actionCall: this.returnActionFunction(actionName), props: props}; //removed owner: this
  };

  p.doStoredAction = p.callStoredAction = p.doAction = function (storedAction) {
    if (storedAction.props.isCluster) {
      return this.doActionCluster(storedAction)
    } else if (storedAction.props.isSequence) {
      return this.doActionSequence(storedAction);
    } else {
      return storedAction.actionCall.call(this, storedAction.props);
    }
  };

  p.makeActionCluster = p.makeCluster = function (storedActions, name, onComplete) {
    var tempTime;
    var longestTime = 0;

    for (var key in storedActions) {
      tempTime = storedActions[key].props.time;
      if (tempTime > longestTime) {
        longestTime = tempTime;
      }
    }

    return {
      actionCall: this.doActionCluster,
      props: {storedActions: storedActions, name: name, onComplete: onComplete, time: longestTime, isCluster: true}
    };
  };

  p.makeActionSequence = p.makeSequence = function (storedActions, name, onComplete) {
    var tempTime;
    var totalTime = 0;

    for (var key in storedActions) {
      tempTime = storedActions[key].props.time;
      totalTime += tempTime;
    }

    return {
      actionCall: this.doActionSequence,
      props: {storedActions: storedActions, name: name, onComplete: onComplete, time: totalTime, isSequence: true}
    };
  };

  p.doActionCluster = function (cluster, nOrForever) {
    if (!cluster.props.isCluster) {
      HHg.warn("ERROR: non cluster passed to doActionCluster.", cluster);
      return;
    }
    var props = cluster.props;
    var theCluster = new HHgActionCluster(this, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));

    var returnCluster = this.doFinalizeAction(theCluster, props);
    returnCluster.myStoredActions = props.storedActions;

    var theChild;
    var i = 0;
    var length = cluster.props.storedActions.length;
    for (i; i < length; i++) {
      theChild = this.doAction(cluster.props.storedActions[i]);
      returnCluster.myActions.push(theChild);
      theChild.myCluster = returnCluster;
    }

    if (nOrForever === true) {
      returnCluster.repeatForever = true;
    } else if (nOrForever > 0) {
      returnCluster.repeatN = nOrForever;
    }

    return returnCluster;
  };

  p.doActionClusterForever = function (cluster) {
    this.doActionCluster(cluster, true);
  };

  p.doActionSequence = function (sequence, nOrForever) {
    if (!sequence.props.isSequence) {
      HHg.warn("ERROR: non sequence passed to doActionSequence.", sequence);
      return;
    }
    var props = sequence.props;
    var theSequence = new HHgActionSequence(this, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));

    var returnSequence = this.doFinalizeAction(theSequence, props);
    returnSequence.myStoredActions = props.storedActions;

    var theChild = this.doAction(sequence.props.storedActions[0]);
    theChild.mySequence = returnSequence;
    returnSequence.myCurrentAction = theChild;

    if (nOrForever === true) {
      returnSequence.repeatForever = true;
    } else if (nOrForever > 0) {
      returnSequence.repeatN = nOrForever;
    }

    return returnSequence;
  };

  p.doActionSequenceForever = function (sequence) {
    this.doActionSequence(sequence, true);
  };


  //============= MOUSE =================

  p.setMouseClick = function (func) {
    this.mouseClick = func;
  };

  p.changeToButton = function (func) {
    this.isButton = true;
    this.setMouseable(true);
    this.mouseClick = func;
  };

  p.doMouseDown = function () {
    if (this.isButton) {
      this.setScaleStored();
      this._setScaleOriginalTo(.95);
    }
  };

  p.doMouseUp = function (mouseWasOverWhenReleased) {
    if (mouseWasOverWhenReleased && this.mouseClick) this.mouseClick();
    if (this.isButton) {
      this.setScaleToStored();
    }
    this.isBeingDragged = false;
  };

  p.doStartMouseMove = function () {
    this._setPositionStored();
    this.isBeingDragged = true;
  };

  p.doMouseMove = function () {
    this._setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.plus(HHgMouse.draggingOffsetXY));
  };

  //TODO: does this and mouse up fire, and if so, in what sequence?
  p.doEndMouseMove = function () {
    this._setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.plus(HHgMouse.draggingOffsetXY));
    this.isBeingDragged = false;
    //TODO: need to trigger something here for like dragging and dropping. Does the thing itself check, or the being dropped on?
  };

  //======visibility =========
  p.doShow = function (xy, y) {
    this.setVisible(true);
    if (xy !== undefined) {
      if (xy instanceof HHgVector2 === true) {
        this._setPositionInScreenTo(xy);
      } else if (y !== undefined) {
        this._setPositionInScreenTo({x: xy, y: y});
      }
    }
  };

  p.doHide = function () {
    this.setVisible(false);
  };

  p.doAddSprite = p.addSprite = function (name, whitePixelTintRGB) {
    HHgSprite.doAddSpriteToHolder(this, name, whitePixelTintRGB);
  };

  p.doAddParagraphText = p.addPText = function (props) {
    HHgText.doAddTextParagraphToHolder(this, props);
  };

  p.doAddCanvasText = p.doAddText = p.addText = function (props) {
    HHgText.doAddTextCanvasToHolder(this, props);
  };

  p.doMakeRoundedRectangle = p.doMakeRectangle = p.makeRectangle = function (props) {
    HHgShape.addRectangle(this, props);
  };

  p.doMakeEllipse = p.doMakeCircle = function (props) {
    HHgShape.addEllipse(this, props);
  };

  p.doMakeTriangle = function (props) {
    HHgShape.addTriangle(this, props);
  };

  p.doRemoveShape = function () {
    HHgShape.removeShape(this);
  };

  p.doAddOutline = p.doAddBorder = function (props) {
    HHgShape.addBorder(this, props);
  };

  p.doRemoveOutline = p.doRemoveBorder = function () {
    HHgShape.addBorder(this, {borderStyle: "none", borderWidth: 0});
  };

  //======custom CSS==========
  p.doAddCSSClass = function (className) {
    this.classAddingObject = this.classAddingObject || {};
    this.classAddingObject[className] = className;
    this.changes.classList = true;
    this._notifySceneOfUpdates();
  };

  p.doRemoveCSSClass = function (className) {
    this.classRemovingObject = this.classRemovingObject || {};
    this.classRemovingObject[className] = className;
    this.changes.classList = true;
    this._notifySceneOfUpdates();
  };

  //============ sound ===============
  p.doAddSound = function (name) {
    //TODO
  };
  p.doPlaySound = function (name) {
    //TODO
  };
  p.doPauseSound = function (name) {
    //TODO
  };
  p.doKillSound = function (name) {
    //TODO
  };
}());










