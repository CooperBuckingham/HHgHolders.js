	var HHgVector2 = function (x,y){
	var _x = +x;
	var _y = +y;

	var that = this;

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

	this.returnVectorRotatedAroundVectorAtAngle = function(vB, angle){
		var rads = HHg.doDegreesToRads(angle),
			vBx = vB.getX(),
			vBy = vB.getY();
		
		return new HHgVector2( (Math.cos(rads) * (_x - vBx) - Math.sin(rads) * (_y - vBy) + vBx),
								(Math.sin(rads) * (_x - vBx) + Math.cos(rads) * (_y - vBy) + vBy) );
	}

	this.returnPretty = function(){
		return ("HHgVector2: x: " + _x + " y: " + _y);
	}
	
	
	this.setXY = function(xy,y){
		if(xy instanceof HHgVector2){
			_x = xy.getX();
			_y = xy.getY();
		}else{
			_x = +xy;
			_y = +y;
		}
		
	}
	this.returnVectorPlusVector = function(vB){
		return new HHgVector2(_x + vB.getX(), _y + vB.getY());
	}
	this.returnVectorScaledBy = function(val){
		if(val instanceof HHgVector2 === false){
			val = new HHgVector2(val, val);
		}
		return new HHgVector2(_x * val.getX(), _y * val.getY());
	}
	this.returnVectorScaledByInverse = function(val){
		return new HHgVector2(_x / val.getX(), _y / val.getY());
	}
	this.returnVectorSubtractedFromVector = function(vB){
		return new HHgVector2(vB.getX() - _x, vB.getY() - _y);
	}

}