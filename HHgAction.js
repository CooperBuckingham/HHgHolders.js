


var HHgAction = function (owner, totalDelta, startValue, totalTime, ease, onComplete){
	if(owner === undefined){
		console.log("ERROR: no owner holder passed to Action");
		return;
	}
	this.owner = owner;

	this.onComplete = onComplete;
	this.ease = ease;
	this.totalTime = totalTime;
	this.startTime = +new Date;
	this.timeSoFar = 0;
	this.easeInPercent = 0;
	this.easeOutPercent = 0;
	this.easeAreaUnderCurveMod = .5; //this is a hack since everything is linear easing right now
	this.startValue = startValue;

	this.totalDelta = totalDelta;

	this.isXY = (totalDelta instanceof HHgVector2);

	this.lastPercent = 0;
	this.deltaPercent = 0;

	this.deltaValue = this.isXY ? new HHgVector2(0,0) : 0;
	this.lastValue = this.isXY ? new HHgVector2(0,0) : 0;

	if(ease){

		if(ease.easeIn > 1 ) ease.easeIn /= 100;
		if(ease.easeOut > 1) ease.easeOut /= 100;
		if(ease.easeIn !== undefined) this.easeInPercent = ease.easeIn;
		if(ease.easeOut !== undefined) this.easeOutPercent = ease.easeOut;

	}

	this.finalFrame = function(action){

		if(action.onComplete){
			action.onComplete();
		}

		action.owner.doRemoveAction(action);

	};

	this.setEase = function(){
		if(this.easeInPercent > 0){
			this.easeInTime = this.totalTime * this.easeInPercent;
		}else{
			this.easeInTime = 0;
		}

		if(this.easeOutPercent > 0){
			this.easeOutTime = (this.totalTime * this.easeOutPercent);
		}else{
			this.easeOutTime = 0;
		}

		this.middlePercent =  1 - (this.easeOutPercent + this.easeInPercent) ;
		this.middlePercent = this.middlePercent + (this.easeInPercent * (1 - this.easeAreaUnderCurveMod));
		this.middlePercent = this.middlePercent + (this.easeOutPercent * (1 - this.easeAreaUnderCurveMod));
		this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);

	};


	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;

		if(this.timeSoFar >= this.totalTime){

			if(this.isSpecial === true){
				this.updateFunc(this.lastValue.returnVectorSubtractedFromVector(this.endXY));
			}else if(this.isXY === true){
				this.updateFunc(this.lastValue.returnVectorSubtractedFromVector(this.totalDelta));
			}else{
				this.updateFunc( this.totalDelta - this.lastValue );
			}

			this.finalFrame(this);

			return;
		}


		if(this.timeSoFar < this.easeInTime){

			this.deltaPercent = this.easeInPercent * ( deltaT/this.easeInTime * ( this.timeSoFar/this.easeInTime ) );


		}else if(this.timeSoFar > this.totalTime - this.easeOutTime ){

			this.deltaPercent = this.easeOutPercent * ( deltaT/this.easeOutTime * ( (this.totalTime - this.timeSoFar)/this.easeOutTime) );


		}else{

			this.deltaPercent = this.middlePercent * ( deltaT / this.middleTime );
		}

		this.lastPercent += this.deltaPercent;

		if(this.isSpecial === true){
				this.tempXY = this.specialUpdateFunc(this.lastPercent, this);

				this.deltaValue = this.tempXY.returnSubtract(this.lastValue);
				this.lastValue = this.tempXY;
		}else if(this.isXY === true){
			this.deltaValue = this.totalDelta.returnMultiply(this.lastPercent);
			this.deltaValue.minusEquals(this.lastValue);
			this.lastValue.plusEquals(this.deltaValue);
		}else{
			this.deltaValue = this.totalDelta * this.lastPercent;
			this.deltaValue -= this.lastValue;
			this.lastValue += this.deltaValue;
		}

		this.updateFunc(this.deltaValue);

	};


}

HHg.HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	}
};


//======= MOVEMENT


function HHgActionMoveBy(owner, totalDelta, startValue, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);

	this.updateFunc = this.owner.setPositionInScreenBy.bind(owner);

	this.setEase();

}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveBy);

function HHgActionMoveForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, null, null, ease, null);

	this.perSecondXY = vectorPerSecond;

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setPositionInScreenBy(this.perSecondXY.returnVectorScaledBy(deltaT));
		//could add ease in option here
	}

}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveForever);



function HHgActionRotateBy(owner, totalDelta, startValue, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);


	this.updateFunc = this.owner.setRotationOriginalBy.bind(owner);

	this.setEase();


}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateBy);


function HHgActionRotateForever(owner, speed, ease){
	HHgAction.call(this, owner, null, null, null, ease, null);

	this.perSecondN = speed;

	this.whatShouldIDoThisFrame = function(deltaT){
		owner.setRotationOriginalBy(this.perSecondN * deltaT);
		//could add ease in option here

	}


}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateForever);


function HHgActionScaleBy(owner, totalDelta, startValue, totalTime, ease, onComplete){

	//(( (scaleBy - 1U) * %) + 1) * currentScale


	HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);

	this.updateFunc = this.owner.setScaleOriginalBy.bind(owner);

	this.setEase();


}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleBy);


function HHgActionScaleForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, null, null, ease, null);

	this.perSecondXY = HHg1Vector.returnVectorSubtractedFromVector(vectorPerSecond);

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setScaleOriginalBy(this.perSecondXY.returnVectorScaledBy(deltaT).returnVectorPlusVector(HHg1Vector));
		//could add ease in option here

	}


}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleForever);


function HHgActionFollowQuad(owner, controlXY, endXY, startValue, totalTime, ease, onComplete){

	HHgAction.call(this, owner, new HHgVector2(1,1), startValue, totalTime, ease, onComplete);

	this.endXY = endXY;
	this.endX = endXY.getX();
	this.endY = endXY.getY();

	this.startX = this.startValue.getX();
	this.startY = this.startValue.getY();
	this.controlXY = controlXY;
	this.controlX = controlXY.getX();
	this.controlY = controlXY.getY();

	this.tempXY = new HHgVector2(0,0);
	this.lastValue = this.startValue;
	this.isSpecial = true;

	this.specialUpdateFunc = function(distance, action){

		return new HHgVector2(action.getXorYAlongQuad(distance, action.startX, action.controlX, action.endX),
								action.getXorYAlongQuad(distance, action.startY, action.controlY, action.endY));
	}

	this.updateFunc = this.owner.setPositionInScreenBy.bind(owner);

	this.setEase();

	var negT;
	this.getXorYAlongQuad = function(t, p1, p2, p3) {

    	negT = 1 - t;
    	return (negT * negT * p1 + 2 * negT * t * p2 + t * t * p3);

	}

}
HHg.HHgActionCommands.makeChildOfAction(HHgActionFollowQuad);


function HHgActionTimer(owner, totalTime, onComplete){

HHgAction.call(this, owner, null, null, totalTime, ease, onComplete);

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;

		if(this.timeSoFar >= this.totalTime){
			that.finalFrame(this);

			return;
		}


	}


}
HHg.HHgActionCommands.makeChildOfAction(HHgActionTimer);




//=======================






