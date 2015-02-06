function HHgVector2(x,y){
	this.x = +x;
	this.y = +y;

	this.findPointAtDisNTowardsOtherPoint = function(vB, dis){
		var vAB = new HHgVector2(this.x - vB.x, this.y - vB.y );
		var finalVector = new HHgVector2(vAB.unitVector.x * dis, vAB.unitVector.y * dis );
		return this.returnVectorOfThisPlusB(finalVector);
		

	}
	this.length = function(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	this.unitVector = function(){
		return new HHgVector2(this.x / this.length, this.y / this.length);
	}
	this.xy = function(x,y){
		x ? this.x = +x :;
		y ? this.y = +y :;
	}
	this.returnVectorOfThisPlusB = function(vB){
		return new HHgVector2(this.x + vB.x, this.y + vB.y);
	}
}