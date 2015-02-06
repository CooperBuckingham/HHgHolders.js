function Vector2d(x,y){
	this.x = +x;
	this.y = +y;

	this.findPointAtDisNTowardsOtherPoint = function(vB, dis){
		var vAB = new Vector2d(this.x - vB.x, this.y - vB.y );
		var finalVector = new Vector2d(vAB.unitVector.x * dis, vAB.unitVector.y * dis );
		return this.returnVectorOfThisPlusB(finalVector);
		

	}
	this.length = function(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	this.unitVector = function(){
		return new Vector2d(this.x / this.length, this.y / this.length);
	}
	this.xy = function(x,y){
		x ? this.x = +x :;
		y ? this.y = +y :;
	}
	this.returnVectorOfThisPlusB = function(vB){
		return new Vector2d(this.x + vB.x, this.y + vB.y);
	}
}