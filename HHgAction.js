


var HHgAction = function (owner){
	this.owner = owner;
	this.subType = subType;
	this.args = args;
	this.startTime = +new Date;
	this.whatShouldIDoThisFrame = function(deltaT, now){
		switch(this.subType){
			case "move":
				
			break;

		}
	} ;
}



function HHgActionMoveTo(owner, pos args){
	HHgAction.call(this, owner);

	this.pos = pos;
}
HHgActionCommands.makeChildOfAction(HHgActionMoveTo);






var HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	}
}
