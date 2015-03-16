


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
	this.startValue = this.startValue;

	this.totalDelta = totalDelta;

	this.isXY = (totalDelta instanceof HHgVector2);

	this.lastPercent = 0;
	this.deltaPercent = 0;

	
	this.deltaValue = this.isXY ? new HHgVector2(0,0) : 0;
	this.lastValue = this.isXY ? new HHgVector2(0,0) : 0;
	

	if(ease){
		
		if(ease.easeIn > 1 ) ease.easeIn /= 100;
		if(ease.easeOut > 1) ease.easeOut /= 100;
		this.easeInPercent = ease.easeIn;
		this.easeOutPercent = ease.easeOut;

	}


	this.whatShouldIDoThisFrame = function(deltaT){
		//override in children
	};
	this.finalFrame = function(action){
		
		if(action.onComplete){
			action.onComplete();
		}
		
		action.owner.doRemoveAction(action);
		
	};

	
}

HHg.HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	},
	setEase: function(){
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

	},

	/*
	setEaseN: function(){
		if(this.easeInPercent > 0){
			this.easeInVector = this.changeN * (this.easeInPercent / this.easeInDistanceMod);
			this.easeInTime = (this.totalTime * this.easeInPercent);
		
			
		}else{
			this.easeInVector = 0;
			this.easeInTime = 0;
		}

		if(this.easeOutPercent > 0){
			this.easeOutVector = this.changeN * (this.easeOutPercent / this.easeOutDistanceMod);
			this.easeOutTime = (this.totalTime * this.easeOutPercent);
		}else{
			this.easeOutVector = HHg0Vector;
			this.easeOutTime = 0;
		}
		
		this.middleVector = this.changeN * (1 - (this.easeOutPercent + this.easeInPercent) );
		this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);
	},

	doFrameN: function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			deltaT -= (this.timeSoFar - this.totalTime);



			this.updateFunc(this.);
			this.finalFrame(this);

			return;
		}

		if(this.timeSoFar < this.easeInTime){
			
			this.deltaN = this.easeInVector * ( deltaT/this.easeInTime * (this.timeSoFar/this.easeInTime) );
		
			
		}else if(this.timeSoFar > this.totalTime - this.easeOutTime ){
			
			this.deltaN = this.easeOutVector * ( deltaT/this.easeOutTime * ( (this.totalTime - this.timeSoFar)/this.easeOutTime ) );
			
			
		}else{

			this.deltaN = this.middleVector * ( deltaT / this.middleTime );
		}

		this.soFarN += this.deltaN;
		this.updateFunc(this.deltaN);

	},
	*/

	doFrame: function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			if(this.isXY === true){
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
	
		if(this.isXY === true){
			this.deltaValue = this.totalDelta.returnMultiply(this.lastPercent);
			this.deltaValue.minusEquals(this.lastValue);
			this.lastValue.plusEquals(this.deltaValue);
		}else{
			this.deltaValue *= this.lastPercent;
			this.deltaValue -= this.lastValue;
			this.lastValue += this.deltaValue;
		}

		this.updateFunc(this.deltaValue);

	},




}

//======= MOVEMENT


function HHgActionMoveBy(owner, totalDelta, startValue, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);


	this.updateFunc = this.owner.setPositionInScreenBy.bind(owner);

	HHg.HHgActionCommands.setEase.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrame.bind(this);
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveBy);

function HHgActionMoveForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, ease);

	this.perSecondXY = vectorPerSecond;

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setPositionInScreenBy(this.perSecondXY.returnVectorScaledBy(deltaT));
		//could add ease in option here
	}
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveForever);



function HHgActionRotateBy(owner, totalDelta, startValue, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalDelta, startValue, totalTime, ease, onComplete);

	this.startValue = this.owner.getRotationOriginal();
	this.totalDelta = degrees;
	
	this.updateFunc = this.owner.setRotationOriginalBy.bind(owner);

	HHg.HHgActionCommands.setEase.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrame.bind(this);
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateBy);


function HHgActionRotateForever(owner, speed, ease){
	HHgAction.call(this, owner, null, ease);

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

	this.startValue = this.owner.getScaleOriginal();
	this.totalDelta = HHg1Vector.returnVectorSubtractedFromVector(scaleXY);

	this.updateFunc = this.owner.setScaleOriginalBy.bind(owner);

	HHg.HHgActionCommands.setEase.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrame.bind(this);
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleBy);


function HHgActionScaleForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, ease);

	this.perSecondXY = HHg1Vector.returnVectorSubtractedFromVector(vectorPerSecond);

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setScaleOriginalBy(this.perSecondXY.returnVectorScaledBy(deltaT).returnVectorPlusVector(HHg1Vector));
		//could add ease in option here

	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleForever);


function HHgActionFollowQuad(owner, controlXY, endXY, startXY, totalTime, ease, onComplete){

	if(!owner){
		return false;
	}


	
	HHgAction.call(this, owner, 1, startXY, totalTime, ease, onComplete);

	this.endXY = endXY;
	this.endX = endXY.getX();
	this.endY = endXY.getY();
	

	this.startX = this.startXY.getX();
	this.startY = this.startXY.getY();
	this.controlXY = controlXY;
	this.controlX = controlXY.getX();
	this.controlY = controlXY.getY();

	this.previousXY = this.startXY;

	this.changeN = 1;

		if(this.easeInPercent > 0){
			this.easeInVector = this.changeN * (this.easeInPercent / this.easeInDistanceMod);
			this.easeInTime = (this.totalTime * this.easeInPercent);
		
			
		}else{
			this.easeInVector = 0;
			this.easeInTime = 0;
		}

		if(this.easeOutPercent > 0){
			this.easeOutVector = this.changeN * (this.easeOutPercent / this.easeOutDistanceMod);
			this.easeOutTime = (this.totalTime * this.easeOutPercent);
		}else{
			this.easeOutVector = HHg0Vector;
			this.easeOutTime = 0;
		}
		
		this.middleVector = this.changeN * (1 - (this.easeOutPercent + this.easeInPercent) );
		this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);


	//break this into easing using points at percent times to create 3 sub curves, yikes

	var negT;
	this.getXorYAlongQuad = function(t, p1, p2, p3) {
		
    	negT = 1 - t;
    	return (negT * negT * p1 + 2 * negT * t * p2 + t * t * p3);
    	
	}

	
	this.getQuadraticCurvePoint = function(startX, startY, controlX, controlY, endX, endY, distance) {
		return new HHgVector2(this.getXorYAlongQuad(distance, startX, controlX, endX),
								this.getXorYAlongQuad(distance, startY, controlY, endY));

    };

    var that = this, distanceAlongCurve = 0, lastDistanceAlongCurve = 0;
    

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){

			distanceAlongCurve = 1;
	
			this.currentXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);
		
			owner.setPositionInScreenBy( this.previousXY.returnVectorSubtractedFromVector(this.currentXY) );

			
			that.finalFrame(that);

			return;
		}

		
		//HHgPlaceTestSprite(this.currentXY);

		if(this.timeSoFar < this.easeInTime){
			
			this.deltaN = this.easeInVector * ( deltaT/this.easeInTime * (this.timeSoFar/this.easeInTime) );

			//this.deltaN = 1/this.deltaN;
		
		}else if(this.timeSoFar > this.totalTime - this.easeOutTime ){
			
			this.deltaN = this.easeOutVector * ( deltaT/this.easeOutTime * ( (this.totalTime - this.timeSoFar)/this.easeOutTime ) );
			//this.deltaN = 1/this.deltaN;
			
			
		}else{

			this.deltaN = this.middleVector * ( deltaT / this.middleTime );
		}

		distanceAlongCurve = lastDistanceAlongCurve + this.deltaN;
	
		this.currentXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);
		lastDistanceAlongCurve = distanceAlongCurve;


		owner.setPositionInScreenBy( this.previousXY.returnVectorSubtractedFromVector(this.currentXY) );
		this.previousXY = this.currentXY ;

	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionFollowQuad);

function HHgActionTimer(owner, totalTime, onComplete){

HHgAction.call(this, owner, totalTime, false, onComplete);

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			that.finalFrame(that);

			return;
		}


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionTimer);




//=======================






