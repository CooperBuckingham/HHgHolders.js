var HHgVector2 = function (x,y){
	var _x = +x;
	var _y = +y;
	var vB;

	var that = this;

	this.returnCopy = function(){
		return new HHgVector(_x, _y);
	}

	this.returnVectorLength = function(){
		return Math.sqrt(_x * _x + _y * _y);
	}

	this.returnUnitVector = function(){
		return new HHgVector2(_x / this.returnVectorLength(), _y / this.returnVectorLength());
	}

	this.returnDistanceToVector = function(vB){
		
		return Math.sqrt( (_x-vB.getX())*(_x-vB.getX()) + (_y-vB.getY())*(_y-vB.getY()) );
	}

	this.getX = function(){
		return _x;
	}
	this.setX = function(newX){
		_x = newX;
		//_x = Math.round( newX * 10) / 10;
	}

	this.setXAdd = function(newX){
		_x += newX;
	}

	this.getY = function(){
		return _y;
	}
	this.setY = function(newY){
		_y = newY;
		//_y =   Math.round( newY * 10) / 10;
	}
	this.setYAdd = function(newY){
		_y += newY;
	}


	this.returnVectorAtDistanceToVector = function(vB, dis){

		var vAB = new HHgVector2(vB.getX() - _x,vB.getY() - _y );
		var finalVector = new HHgVector2(vAB.returnUnitVector().getX() * dis, vAB.returnUnitVector().getY() * dis );
		return this.returnVectorPlusVector(finalVector);

	}

	this.returnVectorRotatedAroundVectorAtAngle = function(vB, angle){
		var rads = HHg.doDegreesToRads(angle),
			vBx = vB.getX(),
			vBy = vB.getY();
		
		return new HHgVector2( (Math.cos(rads) * (_x - vBx) - Math.sin(rads) * (_y - vBy) + vBx),
								(Math.sin(rads) * (_x - vBx) + Math.cos(rads) * (_y - vBy) + vBy) );
	}

	this.returnPretty = this.pretty = function(){
		return ("x: " + _x + " y: " + _y);
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
	this.returnVectorPlusVector = this.returnAdd = function(){
		vB = this.parse(arguments);
		return new HHgVector2(_x + vB.getX(), _y + vB.getY());
	}
	this.plusEquals = function(){
		vB = this.parse(arguments);
		this.setXY(_x + vB.getX(), _y + vB.getY());
		return this;
	}
	this.minusEquals = function(){
		vB = this.parse(arguments);
		this.setXY(_x - vB.getX(), _y - vB.getY());
		return this;
	}
	this.timesEquals = function(){
		vB = this.parse(arguments);
		this.setXY(_x * vB.getX(), _y * vB.getY());
		return this;
	}
	this.divideEquals = function(){
		vB = this.parse(arguments);
		this.setXY(_x / vB.getX(), _y / vB.getY());
		return this;
	}

	this.returnVectorScaledBy = this.returnMultiply = function(){
		vB = this.parse(arguments);

		return new HHgVector2(_x * vB.getX(), _y * vB.getY());
	}
	this.returnVectorScaledByInverse = this.returnDivide = function(){
		vB = this.parse(arguments);
		return new HHgVector2(_x / vB.getX(), _y / vB.getY());
	}
	this.returnVectorSubtractedFromVector = function(){
		vB = this.parse(arguments);
		return new HHgVector2(vB.getX() - _x, vB.getY() - _y);
	}

	this.returnSubtract = function(){
		vB = this.parse(arguments);
		return new HHgVector2( _x - vB.getX(), _y - vB.getY() );
	}

	this.hasSameXY = this.isSameAs = this.equals = function(){
		vB = this.parse(arguments);
		return _x == vB.getX() && _y == vB.getY();
	}

	this.returnCopy = this.copy = function(){
		return new HHgVector2(_x, _y);
	}

	this.parse = function(arg){

		if(arg[0] instanceof HHgVector2 === false){
			if(arg[1] !== undefined){
				return new HHgVector2(arg[0], arg[1])
			}else{
				return new HHgVector2(arg[0], arg[0])
			}
		}else{
			return arg[0];
		}
	}

	

}