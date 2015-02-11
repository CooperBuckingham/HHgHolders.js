

HHgMain.HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	}
}

var HHgAction = function (owner, totalTime, ease, onComplete){
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
			action.onComplete();
		}
		
		action.owner.doRemoveAction(action);
		HHgActionManager.doRemoveAction(action);


	};

	
}




function HHgActionMoveTo(owner, targetPos, totalTime, ease, onComplete){
	
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
			
			owner.setPositionInScreen(that.vB);
			that.finalFrame(that);

			return;
		}

		deltaDistance = that.totalDistance * ( (deltaT / 1000) / that.totalTime );

		that.currentPosition = that.currentPosition.returnVectorAtDistanceToVector(that.vB, deltaDistance);
		
	

		owner.setPositionInScreen(that.currentPosition);


	}

	
}
HHgMain.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);

function HHgActionMoveBy(owner, deltaPos, time, ease, onComplete){
	HHgAction.call(this, owner, time, ease, onComplete);

	this.pos = deltaPos;
	
	
}
HHgMain.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);







