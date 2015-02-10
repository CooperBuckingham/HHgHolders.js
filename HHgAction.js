

HHgMain.HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	}
}

var HHgAction = function (owner, time, ease, onComplete){
	this.owner = owner;
	this.onComplete = onComplete;
	this.ease = ease;
	this.time = time;
	this.startTime = +new Date;
	this.whatShouldIDoThisFrame = function(deltaT, now){

	};

	
}




function HHgActionMoveTo(owner, targetPos, time, ease, onComplete){
	HHgAction.call(this, owner, time, ease, onComplete);

	this.vB = targetPos;
	this.time = time;
	this.vA = owner.getPositionInScreen();
	this.currentPosition = this.vA;
	this.totalDistance = this.vA.returnVectorSubtractedFromVector(this.vB);

var deltaDistance = 0;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		deltaDistance = this.totalDistance * (deltaT / this.time );
		this.currentPosition.returnVectorAtDistanceToVector(this.vB, deltaDistance);
		owner.setPositionInScreen(this.currentPosition);
	}

	
}
HHgMain.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);

function HHgActionMoveBy(owner, deltaPos, time, ease, onComplete){
	HHgAction.call(this, owner, time, ease, onComplete);

	this.pos = deltaPos;
	this.time = time;
	
}
HHgMain.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);







