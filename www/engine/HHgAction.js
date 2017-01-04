var HHgAction = function (owner, totalDelta, startValue, totalTime, ease, onComplete) {
  if (owner === undefined) {
    HHg.warn("ERROR: no owner holder passed to Action");
    return;
  }
  this.resetVals = {};
  this.resetVals.owner = owner;
  this.resetVals.totalDelta = totalDelta;
  this.resetVals.startValue = startValue;
  this.resetVals.totalTime = totalTime;

  this.owner = owner;
  this.onComplete = onComplete;
  this.ease = ease;
  this.totalTime = totalTime;
  this.easeInPercent = 0;
  this.easeOutPercent = 0;
  this.easeAreaUnderCurveMod = .5; //this is a hack since everything is linear easing right now
  this.startValue = startValue;
  this.totalDelta = totalDelta;
  this.isXY = (totalDelta instanceof HHgVector2);
  this.paused = false;

  if (ease) {
    if (ease.easeIn > 1) ease.easeIn /= 100;
    if (ease.easeOut > 1) ease.easeOut /= 100;
    if (ease.easeIn !== undefined) this.easeInPercent = ease.easeIn;
    if (ease.easeOut !== undefined) this.easeOutPercent = ease.easeOut;
  }

  this.resetToStartValues(true);
};

(function () {

  var p = HHgAction.prototype;

  p.resetToStartValues = function () {
    this.timeSoFar = 0;
    this.startTime = +new Date;
    this.lastPercent = 0;
    this.deltaPercent = 0;
    this.deltaValue = this.isXY ? new HHgVector2(0, 0) : 0;
    this.lastValue = this.isXY ? new HHgVector2(0, 0) : 0;
  };

  p.beRemoved = function () {
    //ignoring notifying parent clusters for now, unsure of design
    if (this.mySequence) {
      this.mySequence.childRemoved(this);
    }
  };

  p.finalFrame = function (action) {

    if (action.onComplete) {
      action.onComplete.call(action.owner, action);
    }

    if (action.repeatForever === true) {
      action.resetToStartValues();
      return;
    }

    if (action.repeatN > 1) {
      action.repeatN--;
      action.resetToStartValues();
      return;
    }

    if (action.myCluster) {
      action.myCluster.childComplete(action);
    } else if (action.mySequence) {
      action.mySequence.childComplete(action);
    } else {
      action.owner.doRemoveAction(action);
    }
  };

  p.setEase = function () {
    if (this.easeInPercent > 0) {
      this.easeInTime = this.totalTime * this.easeInPercent;
    } else {
      this.easeInTime = 0;
    }

    if (this.easeOutPercent > 0) {
      this.easeOutTime = (this.totalTime * this.easeOutPercent);
    } else {
      this.easeOutTime = 0;
    }

    this.middlePercent = 1 - (this.easeOutPercent + this.easeInPercent);
    this.middlePercent = this.middlePercent + (this.easeInPercent * (1 - this.easeAreaUnderCurveMod));
    this.middlePercent = this.middlePercent + (this.easeOutPercent * (1 - this.easeAreaUnderCurveMod));
    this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);
  };

  p.whatShouldIDoThisFrame = function (deltaT) {

    this.timeSoFar += deltaT;
    if (this.timeSoFar >= this.totalTime) {
      if (this.isSpecial === true) {
        this.updateFunc(this.lastValue.subtractedFrom(this.endXY));
      } else if (this.isXY === true) {
        if (this.normalizeBy1) {
          this.updateFunc(this.lastValue.subtractedFrom(this.totalDelta).plus(HHg1Vector));
        } else {
          this.updateFunc(this.lastValue.subtractedFrom(this.totalDelta));
        }
      } else {
        this.updateFunc(this.totalDelta - this.lastValue);
      }
      this.finalFrame(this);
      return;
    }
    if (this.timeSoFar < this.easeInTime) {
      this.deltaPercent = this.easeInPercent * ( deltaT / this.easeInTime * ( this.timeSoFar / this.easeInTime ) );
    } else if (this.timeSoFar > this.totalTime - this.easeOutTime) {
      this.deltaPercent = this.easeOutPercent * ( deltaT / this.easeOutTime * ( (this.totalTime - this.timeSoFar) / this.easeOutTime) );
    } else {
      this.deltaPercent = this.middlePercent * ( deltaT / this.middleTime );
    }
    this.lastPercent += this.deltaPercent;

    if (this.isSpecial === true) {
      this.tempXY = this.specialUpdateFunc(this.lastPercent, this);
      //this.deltaValue = this.tempXY.returnSubtract(this.lastValue);
      this.deltaValue = this.tempXY.minus(this.lastValue);
      this.lastValue = this.tempXY;
    } else if (this.isXY === true) {
      this.deltaValue = this.totalDelta.times(this.lastPercent);
      this.deltaValue.minusEquals(this.lastValue);
      this.lastValue.plusEquals(this.deltaValue);
    } else {
      this.deltaValue = this.totalDelta * this.lastPercent;
      this.deltaValue -= this.lastValue;
      this.lastValue += this.deltaValue;
    }
    if (this.normalizeBy1) {
      this.updateFunc(this.deltaValue.plus(HHg1Vector));
    } else {
      this.updateFunc(this.deltaValue);
    }
  };
}());

HHg.HHgActionCommands = {
  makeChildOfAction: function (subclass) {
    subclass.prototype = Object.create(HHgAction.prototype);
    subclass.prototype.constructor = subclass;
  }
};

//======= MOVEMENT

function HHgActionMoveBy(owner, totalDelta, startValue, totalTime, ease, onComplete) {
  HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);
  this.updateFunc = this.owner._setPositionInScreenBy.bind(owner);
  this.setEase();
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveBy);

function HHgActionMoveForever(owner, vectorPerSecond, ease) {
  HHgAction.call(this, owner, null, null, null, ease, null);
  this.perSecondXY = vectorPerSecond;
  this.whatShouldIDoThisFrame = function (deltaT) {
    owner._setPositionInScreenBy(this.perSecondXY.times(deltaT));
  }
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveForever);

function HHgActionRotateBy(owner, totalDelta, startValue, totalTime, ease, onComplete) {
  HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);
  this.updateFunc = this.owner._setRotationOriginalBy.bind(owner);
  this.setEase();
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateBy);

function HHgActionRotateForever(owner, speed, ease) {
  HHgAction.call(this, owner, null, null, null, ease, null);
  this.perSecondN = speed;
  this.whatShouldIDoThisFrame = function (deltaT) {
    owner._setRotationOriginalBy(this.perSecondN * deltaT);
    //could add ease in option here
  }
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateForever);

function HHgActionScaleBy(owner, totalDelta, startValue, totalTime, ease, onComplete) {
  HHgAction.call(this, owner, HHg1Vector.subtractedFrom(totalDelta).times(startValue), startValue, totalTime, ease, onComplete);
  this.normalizeBy1 = true;
  this.updateFunc = this.owner._setScaleOriginalBy.bind(owner);
  this.setEase();
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleBy);

function HHgActionScaleForever(owner, vectorPerSecond, startValue, ease) {
  HHgAction.call(this, owner, null, null, null, ease, null);
  this.perSecondXY = HHg1Vector.subtractedFrom(vectorPerSecond).times(startValue);
  this.whatShouldIDoThisFrame = function (deltaT) {
    owner._setScaleOriginalBy(this.perSecondXY.times(deltaT).plus(HHg1Vector));
  }
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleForever);

function HHgActionFollowQuad(owner, controlXY, endXY, startValue, totalTime, ease, onComplete) {
  HHgAction.call(this, owner, new HHgVector2(1, 1), startValue, totalTime, ease, onComplete);
  this.endXY = endXY;
  this.endX = endXY.x;
  this.endY = endXY.y;
  this.startX = this.startValue.x;
  this.startY = this.startValue.y;
  this.controlXY = controlXY;
  this.controlX = controlXY.x;
  this.controlY = controlXY.y;
  this.tempXY = new HHgVector2(0, 0);
  this.lastValue = this.startValue;
  this.isSpecial = true;

  this.specialUpdateFunc = function (distance, action) {
    return new HHgVector2(action.getXorYAlongQuad(distance, action.startX, action.controlX, action.endX),
      action.getXorYAlongQuad(distance, action.startY, action.controlY, action.endY));
  };
  this.updateFunc = this.owner._setPositionInScreenBy.bind(owner);
  this.setEase();
  var negT;
  this.getXorYAlongQuad = function (t, p1, p2, p3) {
    negT = 1 - t;
    return (negT * negT * p1 + 2 * negT * t * p2 + t * t * p3);
  }
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionFollowQuad);

function HHgActionTimer(owner, totalTime, onComplete) {
  HHgAction.call(this, owner, undefined, undefined, totalTime, undefined, onComplete);
  this.whatShouldIDoThisFrame = function (deltaT) {
    this.timeSoFar += deltaT;
    if (this.timeSoFar >= this.totalTime) {

      this.finalFrame(this);
      return;
    }
  }
};
HHg.HHgActionCommands.makeChildOfAction(HHgActionTimer);

function HHgActionCluster(owner, totalTime, onComplete) {
  HHgActionTimer.call(this, owner, totalTime, onComplete);
  this.isCluster = true;
  this.myActions = [];
  this.actionsCompleted = 0;
};
HHgActionCluster.prototype = Object.create(HHgActionTimer.prototype);
HHgActionCluster.prototype.constructor = HHgActionCluster;

HHgActionCluster.prototype.beRemoved = function () {

  for (var i = 0; i < this.myActions.length; i++) {
    var child = this.myActions[i];
    if (!child.myCluster) continue;
    child.myCluster = undefined; //this is to prevent the endless loop of parent>child>parent removing
    child.owner.doRemoveAction(child);
  }

  this.myActions = undefined;
  this.actionsCompleted = 0;
  HHgAction.prototype.beRemoved.call(this);
};

HHgActionCluster.prototype.childComplete = function (child) {
  child.myCluster = undefined;
  child.owner.doRemoveAction(child);

  this.actionsCompleted++;
  if (this.actionsCompleted >= this.myStoredActions.length) {
    this.finalFrame(this); //call final frame on self, as we avoid doing it in action manager, and wait for the final action to update.
  }
};

HHgActionCluster.prototype.resetToStartValues = function (init) {
  //TODO: this still creates all new actions
  //eventually, if a cluster or sequence is repeat, then it should be caching its actions
  //and calling reset start values on them all below, but that's a bigger overhaul
  this.timeSoFar = 0;
  this.myActions = [];
  this.actionsCompleted = 0;
  this.myStoredActions = this.myStoredActions || [];
  if (init)return;

  var theChild;
  var i = 0;
  var length = this.myStoredActions.length;
  for (i; i < length; i++) {
    theChild = this.owner.doAction(this.myStoredActions[i]);
    this.myActions.push(theChild);
    theChild.myCluster = this;
  }
};

function HHgActionSequence(owner, totalTime, onComplete) {
  HHgActionTimer.call(this, owner, totalTime, onComplete);
  this.isSequence = true;
  this.myActions = [];
  this.myCurrentIndex = 0;
};

HHgActionSequence.prototype = Object.create(HHgActionTimer.prototype);
HHgActionSequence.prototype.constructor = HHgActionSequence;
HHgActionSequence.prototype.beRemoved = function () {
  if (this.myCurrentIndex > -1) {
    var child = this.myCurrentAction;
    child.mySequence = undefined; //this is to prevent the endless loop of parent>child>parent removing
    child.owner.doRemoveAction(child);
  }

  this.myCurrentAction = undefined;
  HHgAction.prototype.beRemoved.call(this);
};

HHgActionSequence.prototype.childRemoved = function (child) {
  if (this.myCurrentAction === child) {
    this.myCurrentIndex = -1; //child already removed, so don't want to loop again
    this.owner.doRemoveAction(this);
  } else {
    HHg.warn("removed child of sequence that was not current, possible error: ", child.name);
  }
};

HHgActionSequence.prototype.childComplete = function (child) {
  child.mySequence = undefined;
  child.owner.doRemoveAction(child);

  this.myCurrentIndex++;
  if (this.myCurrentIndex >= this.myStoredActions.length) {
    //then done with all sequences
    this.myCurrentAction = undefined;
    this.myCurrentIndex = -1;

    this.finalFrame(this); //call final frame on self, as we avoid doing it in action manager, and wait for the final action to update.
  } else {
    var newChild = this.owner.doAction(this.myStoredActions[this.myCurrentIndex]);
    newChild.mySequence = this;
    this.myCurrentAction = newChild;
  }
};

HHgActionSequence.prototype.resetToStartValues = function (init) {
  this.timeSoFar = 0;
  this.myActions = [];
  this.myStoredActions = this.myStoredActions || [];
  this.myCurrentIndex = 0;
  if (init) return;

  var theChild = this.owner.doAction(this.myStoredActions[0]);
  theChild.mySequence = this;
  this.myCurrentAction = theChild;
};

//=======================