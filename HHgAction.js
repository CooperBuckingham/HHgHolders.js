


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
	setMoveEase: function(action){
		if(action.easeInPercent > 0){
			action.easeInVector = action.moveByAmount.returnVectorScaledBy(action.easeInPercent / action.easeInDistanceMod);
			action.easeInTime = (action.totalTime * action.easeInPercent);
		
			
		}else{
			action.easeInVector = HHg0Vector;
			action.easeInTime = 0;
		}

		if(action.easeOutPercent > 0){
			action.easeOutVector = action.moveByAmount.returnVectorScaledBy(action.easeOutPercent / action.easeOutDistanceMod);
			action.easeOutTime = (action.totalTime * action.easeOutPercent);
		}else{
			action.easeOutVector = HHg0Vector;
			action.easeOutTime = 0;
		}
		
		action.middleVector = action.moveByAmount.returnVectorScaledBy(1 - (action.easeOutPercent + action.easeInPercent) );
		action.middleTime = action.totalTime - (action.easeOutTime + action.easeInTime);
	},
	setRotateEase: function(){
		if(this.easeInPercent > 0){
			this.easeInVector = this.moveByAmount * (this.easeInPercent / this.easeInDistanceMod);
			this.easeInTime = (this.totalTime * this.easeInPercent);
		
			
		}else{
			this.easeInVector = 0;
			this.easeInTime = 0;
		}

		if(this.easeOutPercent > 0){
			this.easeOutVector = this.moveByAmount * (this.easeOutPercent / this.easeOutDistanceMod);
			this.easeOutTime = (this.totalTime * this.easeOutPercent);
		}else{
			this.easeOutVector = HHg0Vector;
			this.easeOutTime = 0;
		}
		
		this.middleVector = this.moveByAmount * (1 - (this.easeOutPercent + this.easeInPercent) );
		this.middleTime = this.totalTime - (this.easeOutTime + this.easeInTime);
	},

	doRotateFrame: function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			this.owner.setRotationOriginalBy(this.degreesToRotate - this.degreesSoFar);
			this.finalFrame(this);

			return;
		}

		this.deltaDegrees = this.degreesToRotate * ( deltaT / this.totalTime );

		this.degreesSoFar += this.deltaDegrees;
		this.owner.setRotationOriginalBy(this.deltaDegrees);

	}

}

//======= MOVEMENT
/*
function HHgActionMoveTo(owner, targetPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);


	this.posStart = this.owner.getPositionInScreenOriginal();
	this.moveByAmount = this.posStart.returnVectorSubtractedFromVector(targetPos);
	this.targetPos = targetPos;

	this.moveSoFar = HHg0Vector;
	
	var that = this,

	deltaMove = HHg0Vector,

	vectorStore = new HHgVector2(0,0),
	xOrYLessThan1 = false;
	

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			deltaT += this.timeSoFar - this.totalTime;
			
			deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT) / that.totalTime ));

			that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
			owner.setPositionInScreenBy(deltaMove);
			
			that.finalFrame(that);

			return;
		}

		deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT ) / that.totalTime ));


		that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
		owner.setPositionInScreenBy(deltaMove);


	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);
*/




function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.posStart = this.owner.getPositionInScreenOriginal();
	this.moveByAmount = deltaPos;

	this.moveSoFar = HHg0Vector;

	HHg.HHgActionCommands.setMoveEase(this);
	
	var that = this,
	deltaMove = HHg0Vector,
	easeTimePercent;

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			deltaT -= this.timeSoFar - this.totalTime;
			
			if(this.easeOutPercent <= 0){
				deltaMove = that.moveByAmount.returnVectorScaledBy( deltaT / that.totalTime );
			}else{
				easeTimePercent = (that.totalTime - this.timeSoFar)/this.easeOutTime;
				deltaMove = that.easeOutVector.returnVectorScaledBy( deltaT/that.easeOutTime * easeTimePercent );
			}
			

			that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
			owner.setPositionInScreenBy(deltaMove);
			
			that.finalFrame(that);

			return;
		}

		
		if(this.timeSoFar < this.easeInTime){
			easeTimePercent = this.timeSoFar/that.easeInTime;
			
			deltaMove = that.easeInVector.returnVectorScaledBy( deltaT/that.easeInTime * easeTimePercent );
		
			
		}else if(this.timeSoFar > that.totalTime - that.easeOutTime ){
			
			easeTimePercent = (that.totalTime - this.timeSoFar)/this.easeOutTime;
			
			deltaMove = that.easeOutVector.returnVectorScaledBy( deltaT/that.easeOutTime * easeTimePercent );
			
			
		}else{

			deltaMove = that.middleVector.returnVectorScaledBy( deltaT / that.middleTime );
		}
		

		//deltaMove = that.moveByAmount.returnVectorScaledBy( deltaT / that.totalTime );

		that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
		owner.setPositionInScreenBy(deltaMove);


	}
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveBy);

function HHgActionMoveForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, ease);

	this.vectorPerSecond = vectorPerSecond;
	
	var that = this;

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setPositionInScreenBy(that.vectorPerSecond.returnVectorScaledBy(deltaT));

	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveForever);






function HHgActionRotateBy(owner, degrees, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.degreesStart = this.owner.getRotationOriginal();
	this.degreesToRotate = degrees;

	this.degreesSoFar = 0;
	
	var that = this,

	deltaDegrees = 0;

	HHg.HHgActionCommands.setRotateEase.bind(this)();

	this.whatShouldIDoThisFrame = HHg.HHgActionCommands.doRotateFrame.bind(this);
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateBy);


function HHgActionRotateForever(owner, speed, ease){
	HHgAction.call(this, owner, null, ease);

	this.speed = speed;
	
	var that = this;

	this.whatShouldIDoThisFrame = function(deltaT){

		deltaDegrees = that.speed * deltaT;

		owner.setRotationOriginalBy(deltaDegrees);

	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateForever);


/*
function HHgActionRotateLeftTo(owner, degrees, totalTime, ease, onComplete){
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.degreesStart = this.owner.getRotationOriginal();

	degrees = degrees % 360;
	if(degrees > 180){
		degrees = -(degrees - 180);
	}

	if(degrees < this.degreesStart){
		degrees = degrees - this.degreesStart;
	}else{
		degrees = -(360 - Math.abs(this.degreesStart - degrees) );
	}

	
	this.degreesToRotate = degrees;

	this.degreesSoFar = 0;
	
	var that = this,

	deltaDegrees = 0;

	HHgSetRotateEase(this);

	this.whatShouldIDoThisFrame = HHgDoRotateFrame;
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateLeftTo);
*/

/*
function HHgActionRotateRightTo(owner, degrees, totalTime, ease, onComplete){
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.degreesStart = this.owner.getRotationOriginal();

	degrees = degrees % 360;
	if(degrees > 180){
		degrees = -(degrees - 180);
	}

	if(degrees > this.degreesStart){
		degrees = degrees - this.degreesStart;
	}else{
		degrees = -(360 - Math.abs(this.degreesStart - degrees) );
	}

	
	this.degreesToRotate = degrees;

	this.degreesSoFar = 0;
	
	var that = this,

	deltaDegrees = 0;

	HHgSetRotateEase(this);

	this.whatShouldIDoThisFrame = HHgDoRotateFrame;
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateRightTo);
*/

function HHgActionScaleBy(owner, scaleXY, totalTime, ease, onComplete){

	//(( (scaleBy - 1U) * %) + 1) * currentScale


	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.scaleStart = this.owner.getScaleOriginal();
	this.scaleByAmount = scaleXY;
	this.scaleAmountDown1 = HHg1Vector.returnVectorSubtractedFromVector(this.scaleByAmount);

	this.scaleRemaining = this.scaleByAmount;
	
	var that = this,

	deltaScale = HHg0Vector;

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			//this has to be a percentage of time remaining.
			deltaT = deltaT - (this.timeSoFar - this.totalTime);
			deltaScale = this.scaleAmountDown1.returnVectorScaledBy(deltaT / that.totalTime).returnVectorPlusVector(HHg1Vector);
			owner.setScaleOriginalBy(deltaScale);
			that.finalFrame(that);

			return;
		}

		deltaScale = this.scaleAmountDown1.returnVectorScaledBy((deltaT ) / that.totalTime).returnVectorPlusVector(HHg1Vector);

		that.scaleRemaining = deltaScale.returnVectorSubtractedFromVector(that.scaleRemaining);
		owner.setScaleOriginalBy(deltaScale);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleBy);

/*
function HHgActionScaleTo(owner, scaleXY, totalTime, ease, onComplete){

HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.scaleStart = this.owner.getScaleOriginal();
	this.scaleByAmount = scaleXY.returnVectorScaledByInverse(this.scaleStart);
	this.scaleAmountDown1 = HHg1Vector.returnVectorSubtractedFromVector(this.scaleByAmount);

	this.scaleRemaining = this.scaleByAmount;
	
	var that = this,

	deltaScale = HHg0Vector;

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			//this has to be a percentage of time remaining.
			deltaT = deltaT - (this.timeSoFar - this.totalTime);
			deltaScale = this.scaleAmountDown1.returnVectorScaledBy(deltaT / that.totalTime).returnVectorPlusVector(HHg1Vector);
			owner.setScaleOriginalBy(deltaScale);
			that.finalFrame(that);

			return;
		}

		deltaScale = this.scaleAmountDown1.returnVectorScaledBy((deltaT) / that.totalTime).returnVectorPlusVector(HHg1Vector);

		that.scaleRemaining = deltaScale.returnVectorSubtractedFromVector(that.scaleRemaining);
		owner.setScaleOriginalBy(deltaScale);


	}
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleTo);
*/

function HHgActionScaleForever(owner, vectorPerSecond, ease){
	HHgAction.call(this, owner, null, ease);

	this.scaleByAmount = vectorPerSecond;
	this.scaleAmountDown1 = HHg1Vector.returnVectorSubtractedFromVector(this.scaleByAmount);

	var that = this;

	this.whatShouldIDoThisFrame = function(deltaT){

		owner.setScaleOriginalBy(this.scaleAmountDown1.returnVectorScaledBy(deltaT).returnVectorPlusVector(HHg1Vector));

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

	this.previousXY;

	var iT, test;
	this.getXorYAlongQuad = function(t, p1, p2, p3) {
		
    	iT = 1 - t;
    	test = iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    	//console.log(test);
    	return test;
	}

	
	this.getQuadraticCurvePoint = function(startX, startY, cpX, cpY, endX, endY, position) {
		return new HHgVector2(this.getXorYAlongQuad(position, startX, cpX, endX),
								this.getXorYAlongQuad(position, startY, cpY, endY));

    };

    var that = this, distanceAlongCurve;

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreenTo(this.endXY);
			that.finalFrame(that);

			return;
		}

		distanceAlongCurve =  ( this.timeSoFar / that.totalTime );
	
		this.previousXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);

		owner.setPositionInScreenTo(this.previousXY);

	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionFollowQuad);

function HHgActionTimer(owner, totalTime, onComplete){

HHgAction.call(this, owner, totalTime, false, onComplete);

	var that = this;

	var deltaScale = HHg0Vector;

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






