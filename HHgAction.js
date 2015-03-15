


var HHgAction = function (owner, totalTime, ease, onComplete){
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
	this.easeInDistanceMod = .5; //this is a hack since everything is linear easing right now
	this.easeOutDistanceMod = .5; //this is a hack since everything is linear easing right now

	this.soFarN = 0;
	this.deltaN = 0;

	this.soFarXY = HHg0Vector;
	this.deltaXY = HHg0Vector;
	

	if(ease){
		switch(ease){
		case "none":
		break;

		case "in30":
		this.easeInPercent = .30;
		break;

		case "out30":
		this.easeInPercent = .30;
		break;

		case "in10out10":
		this.easeInPercent = .10;
		this.easeOutPercent = .10;
		break;

		case "inAndOut50":
		this.easeInPercent = .50;
		this.easeOutPercent = .50;
		break;

		default:
		this.easeInPercent = .20;
		this.easeOutPercent = .20;
		break;

	}
	
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
	setEaseXY: function(){
		if(this.easeInPercent > 0){
			this.easeInVector = this.changeXY.returnVectorScaledBy(this.easeInPercent / this.easeInDistanceMod);
			this.easeInTime = (this.totalTime * this.easeInPercent);
		
			
		}else{
			this.easeInVector = HHg0Vector;
			this.easeInTime = 0;
		}

		if(this.easeOutPercent > 0){
			this.easeOutVector = this.changeXY.returnVectorScaledBy(this.easeOutPercent / this.easeOutDistanceMod);
			this.easeOutTime = (this.totalTime * this.easeOutPercent);
		}else{
			this.easeOutVector = HHg0Vector;
			this.easeOutTime = 0;
		}
		
		this.middleVector = this.changeXY.returnVectorScaledBy(1 - (this.easeOutPercent + this.easeInPercent) );
		this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);
	},
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
			
			this.updateFunc(this.changeN - this.soFarN);
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

	doFrameXY: function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			this.updateFunc(this.soFarXY.returnVectorSubtractedFromVector(this.changeXY));
			
			this.finalFrame(this);

			return;
		}

		
		if(this.timeSoFar < this.easeInTime){
			
			this.deltaXY = this.easeInVector.returnVectorScaledBy( deltaT/this.easeInTime * ( this.timeSoFar/this.easeInTime ) );
		
			
		}else if(this.timeSoFar > this.totalTime - this.easeOutTime ){
			
			this.deltaXY = this.easeOutVector.returnVectorScaledBy( deltaT/this.easeOutTime * ( (this.totalTime - this.timeSoFar)/this.easeOutTime) );
			
			
		}else{

			this.deltaXY = this.middleVector.returnVectorScaledBy( deltaT / this.middleTime );
		}

		this.soFarXY = this.soFarXY.returnVectorPlusVector(this.deltaXY);
		this.updateFunc(this.deltaXY);


	},




}

//======= MOVEMENT


function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.startXY = this.owner.getPositionInScreenOriginal();
	this.changeXY = deltaPos;

	this.updateFunc = this.owner.setPositionInScreenBy.bind(owner);

	HHg.HHgActionCommands.setEaseXY.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrameXY.bind(this);
	
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



function HHgActionRotateBy(owner, degrees, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.startN = this.owner.getRotationOriginal();
	this.changeN = degrees;
	
	this.updateFunc = this.owner.setRotationOriginalBy.bind(owner);

	HHg.HHgActionCommands.setEaseN.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrameN.bind(this);
	
	
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


function HHgActionScaleBy(owner, scaleXY, totalTime, ease, onComplete){

	//(( (scaleBy - 1U) * %) + 1) * currentScale


	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.startXY = this.owner.getScaleOriginal();
	this.changeXY = HHg1Vector.returnVectorSubtractedFromVector(scaleXY);

	this.updateFunc = this.owner.setScaleOriginalBy.bind(owner);

	HHg.HHgActionCommands.setEaseXY.bind(this)();
	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doFrameXY.bind(this);
	
	
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


function HHgActionFollowQuad(owner, controlXY, endXY, totalTime, ease, onComplete){

	if(!owner){
		return false;
	}


	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.endXY = endXY;
	this.endX = endXY.getX();
	this.endY = endXY.getY();
	this.startXY = owner.getPositionInScreenOriginal();

	this.startX = this.startXY.getX();
	this.startY = this.startXY.getY();
	this.controlXY = controlXY;
	this.controlX = controlXY.getX();
	this.controlY = controlXY.getY();

	this.previousXY = this.startXY;

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

    var that = this, distanceAlongCurve;
    

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){

			distanceAlongCurve = 1;
	
			this.currentXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);
		
			owner.setPositionInScreenBy( this.previousXY.returnVectorSubtractedFromVector(this.currentXY) );

			
			that.finalFrame(that);

			return;
		}

		distanceAlongCurve = this.timeSoFar / that.totalTime;
	
		this.currentXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);
	
		//HHgPlaceTestSprite(this.currentXY);

		owner.setPositionInScreenBy( this.previousXY.returnVectorSubtractedFromVector(this.currentXY) );
		this.previousXY = this.currentXY;

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






