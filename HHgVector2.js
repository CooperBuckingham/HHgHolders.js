	function HHgVector2(x,y){
	var _x = +x;
	var _y = +y;

	var myLength = function(){
		return Math.sqrt(_x * _x + _y * _y);
	}

	var unitVector = function(){
		return new HHgVector2(_x / myLength(), _y / myLength());
	}

	this.getX = function(){
		return _x;
	}
	this.setX = function(newX){
		_x = newX;
	}

	this.getY = function(){
		return _y;
	}
	this.setY = function(newY){
		_y = newY;
	}

		this.returnVectorAtDistanceToVector = function(vB, dis){
		var vAB = new HHgVector2(_x - vB.getX(), _y - vB.getY() );
		var finalVector = new HHgVector2(vAB.unitVector.getX() * dis, vAB.unitVector.getY() * dis );
		return this.returnVectorPlusVector(finalVector);
		

	}
	
	
	this.setXY = function(x,y){
		if(typeof x === "HHgVector2"){
			_x = x.getX();
			_y = x.getY();
		}else{
			_x = +x;
			_y = +y;
		}
		
	}
	this.returnVectorPlusVector = function(vB){
		return new HHgVector2(_x + vB.getX(), _y + vB.getY());
	}
	this.returnVectorScaledBy = function(val){
		return new HHgVector2(_x * val, _y * val);
	}
	this.returnVectorScaledByInverse = function(val){
		return new HHgVector2(_x / val, _y / val);
	}
	this.returnVectorSubtractedFromVector = function(vB){
		return new HHgVector2(vB.getX() - _x, vB.getY() - _y);
	}

}