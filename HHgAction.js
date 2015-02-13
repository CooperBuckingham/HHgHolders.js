


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


	this.whatShouldIDoThisFrame = function(deltaT, now){

	};
	this.finalFrame = function(action){
		
		if(action.onComplete){
			console.log("called follow up");
			action.onComplete();
		}
		
		action.owner.doRemoveAction(action);
		HHgActionManager.doRemoveAction(action);


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

	if(!owner){
		return false;
	}
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.vB = targetPos;
	this.vA = owner.getPositionInScreenOriginal();

	
	this.currentPosition = this.vA;
	this.totalDistance = this.vA.returnDistanceToVector(this.vB);

	var that = this;

	var deltaDistance = 0;

	console.log(this.vA.returnPretty() + " TO " + this.vB.returnPretty());

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreenTo(that.vB);
			that.finalFrame(that);

			return;
		}

		deltaDistance = that.totalDistance * ( (deltaT / 1000) / that.totalTime );

		that.currentPosition = that.currentPosition.returnVectorAtDistanceToVector(that.vB, deltaDistance);
		
	

		owner.setPositionInScreenTo(that.currentPosition);


	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);

function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){
		if(!owner){
			return false;
		}


	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	
	this.vA = owner.getPositionInScreenOriginal();
	this.vB = deltaPos;
	
	
	this.targetDistance = this.vA.returnDistanceToVector(this.vB);
	this.distanceSoFar = 0;

	var that = this;

	var deltaDistance = 0;
	var percentOfTotalTime = 0;
	var lastTime = 0;

	console.log(this.vA.returnPretty() + " TO " + this.vB.returnPretty());

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			percentOfTotalTime = (this.totalTime - lastTime) / this.totalTime;
			owner.setPositionInScreenBy( that.vB.returnVectorScaledBy(percentOfTotalTime) );

			
			that.finalFrame(that);

			return;
		}
		lastTime = this.timeSoFar;
		percentOfTotalTime = (deltaT / 1000) / that.totalTime;

		//deltaDistance = that.targetDistance * percentOfTotalTime;
		//distanceSoFar += deltaDistance;

		owner.setPositionInScreenBy( that.vB.returnVectorScaledBy(percentOfTotalTime) );

		//owner.setPositionInScreen(owner.getPositionInScreenOriginal().returnVectorAtDistanceToVector(that.vB, deltaDistance));
		


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);




function HHgActionRotateBy(owner, degrees, time, ease, onComplete){
	HHgAction.call(this, owner, time, ease, onComplete);

console.log("rotating");

	this.degreesStart = this.owner.getRotationOriginal();
	this.degreesToRotate = degrees;

	this.degreesSoFar = this.vA;
	
	var that = this;

	var deltaDegrees = 0;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOffsetBy(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT / 1000) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalTo(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);



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


	
	var that = this;

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
	
	var distanceAlongCurve;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
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
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);




//=======================




//====Helper Function for above







