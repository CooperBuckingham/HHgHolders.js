function S2DAction(owner, subType, args){
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