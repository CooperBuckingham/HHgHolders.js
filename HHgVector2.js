function HHgVector2(x,y){
	this.myX = +x;
	this.myY = +y;

	this.findPointAtDisNTowardsOtherPoint = function(vB, dis){
		var vAB = new HHgVector2(this.x - vB.x, this.y - vB.y );
		var finalVector = new HHgVector2(vAB.unitVector.x * dis, vAB.unitVector.y * dis );
		return this.returnVectorPlusVector(finalVector);
		

	}
	this.myLength = function(){
		return Math.sqrt(this.myX * this.myX + this.myY * this.myY);
	}
	this.unitVector = function(){
		return new HHgVector2(this.myX / this.myLength, this.myY / this.myLength);
	}
	this.myXY = function(x,y){
		if(typeof x === "HHgVector2"){
			this.myX = x.myX;
			this.myY = x.myY;
		}else{
			this.myX = +x;
		this.myY = +y;
		}
		
	}
	this.returnVectorPlusVector = function(vB){
		return new HHgVector2(this.myX + vB.myX, this.myY + vB.myY);
	}
	this.returnVectorScaledBy = function(val){
		return new HHgVector2(this.myX * val, this.myY * val);
	}
	this.returnVectorScaledByInverse = function(val){
		return new HHgVector2(this.myX / val, this.myY / val);
	}
}