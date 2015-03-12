


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
	this.savedAmount = undefined;


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

	}
}

//======= MOVEMENT

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

function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.posStart = this.owner.getPositionInScreenOriginal();
	this.moveByAmount = deltaPos;

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

		deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT) / that.totalTime ));

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

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginalBy(that.degreesToRotate - that.degreesSoFar);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalBy(deltaDegrees);


	}
	
	
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

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginalBy(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalBy(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateLeftTo);

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

	this.whatShouldIDoThisFrame = function(deltaT){
		this.timeSoFar += deltaT;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginalBy(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalBy(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateRightTo);


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

	this.getXorYAlongQuad = function(t, p1, p2, p3) {
		
    	var iT = 1 - t;
    	var test = iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    	//console.log(test);
    	return test;
	}

	this.getQuadraticCurvePoint = function(startX, startY, cpX, cpY, endX, endY, position) {
		return new HHgVector2(this.getXorYAlongQuad(position, startX, cpX, endX),
								this.getXorYAlongQuad(position, startY, cpY, endY));

    };

    var that = this,
	
	distanceAlongCurve;

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






