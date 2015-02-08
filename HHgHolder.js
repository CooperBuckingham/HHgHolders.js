var holderHashCount = 0;

var HHgHolder = function(w, h, parent, zIndex, xyOffset, scale, xyScaleOffset){
	holderHashCount++;

	xyScaleOffset =  xyScaleOffset || new HHgVector2(1,1);
	xyOffset =  xyOffset || new HHgVector2(0,0);
	scale = scale || 1.0;
	zIndex = zIndex || 0;
	parent = parent || HHgScene;
	w = w || HHgScene.myWidth;
	h = h || HHgScene.myHeight;
	xyScaleOffset = xyScaleOffset || new HHgVector2(1,1);

	var _width = w;
	var _height = h;
	
	var _parent = parent;

	
	var _scaleOriginal = scale;
	var _scaleNet = _parent.getScaleNet() * scale;

	var _zIndex = zIndex;
	var _xyOffset = xyOffset;
	var _positionInScreen = new HHgVector2(0,0);
	var _positionInParent  = new HHgVector2(0,0);

	var _children;
	var _actions;
	var _xyScaleOffset = xyScaleOffset;
	var _div;
	
	var _hash = holderHashCount;
	var _timeStamp = +new Date();

	var _doUpdateToParent = function(){
			this.setPositionInParent(new HHgVector2(0,0) );
			this.doUpdateScaleNet();
			

		}


	return function(){
		//do we want these to be calculations if the holder is holding things?
		this.getWidth = function(){
			return _width;
		}

		this.setWidth = function(){
			//***likely needs some more complicated logic here
			//do we want to scale, do we even all manual width setting?
			//maybe width and height are relavent to scale?
		}

		this.getHeight = function(){
			return _height;
		}

		this.setHeight = function(){
			//same questions as width
		}

		this.getParent = function(){
			return _parent;
		}

		this.getZ = function(){
			return _zIndex;
		}

		this.setZ = function(z){
			//***this needs more logic, like regarding children
			_zIndex = z;
			this.doUpdatedNotify();
		}

		this.setXYOffset =function(xy){
			_xyOffset = xy;
			this.doUpdatedNotify();
		}

		this.getXYOffset = function(){
			return _xyOffset;
		}

		this.setDiv = function(div){
			_div = div;
		}

		this.getDiv = function(){
			return _div;
		}

		this.setXYScaleOffset = function(xyScaleOffset){
			_xyScaleOffset = xyScaleOffset;
			this.doUpdateNotify();
		}

		this.getXYScaleOffset = function(){
			return _xyScaleOffset;
		}

		this.setPositionInScreen = function(xyPos, shouldAddTo){
			if(_parent === "stop"){
				return;
			}
			if(shouldAddTo === true){
				_positionInScreen = _positionInScreen.returnVectorPlusVector(xyPos);
			}else{
				_positionInScreen = xyPos;
			}

			var posOfParentInScreen = _parent.getPositionInScreen();
			var diffOfVectorsInScreen = _positionInScreen.returnVectorSubtractedFromVector(posOfParentInScreen);
			var diffOfVectorTimesScale = diffOfVectorsInScreen.returnVectorScaledByInverse(_parent.getScaleNet());

			_positionInParent = diffOfVectorTimesScale;


			this.doUpdatedNotify();
		}


		this.getPositionInScreen = function(){
			return _positionInScreen;
		}

		this.setX = function(x, shouldAddTo){
			this.setPositionInScreen(new HHgVector2(x,_positionInScreen.getY(), shouldAddTo);
		}

		this.setY = function(y, shouldAddTo){
			this.setPositionInScreen(new HHgVector2(_x,y), shouldAddTo);
		}

		this.setXInParent = function(x, shouldAddTo){
			this.setPositionInParent(new HHgVector2(x,_y), shouldAddTo);
		}

		this.setYInParent = function(y, shouldAddTo){
			this.setPositionInParent(new HHgVector2(_x,y), shouldAddTo);
		}

		this.getX = function(){
			return _positionInScreen.getX();
		}
		this.getY = function(){
			return _positionInScreen.getY();
		}
		this.getXInParent = function(){
			return _positionInParent.getX();
		}
		this.getYInParent = function(){
			return _positionInParent.getY();
		}

		this.setPositionInParent = function(parXYPos, shouldAddTo){

			if(this._parent === "stop"){
				return;
			}

			if(shouldAddTo === true){
				_positionInParent = _positionInParent.returnVectorPlusVector(parXYPos);
			}else{
				_positionInParent = parXYPos;
			}

			var posOfParentInScreen = _parent.getPositionInScreen();
			var diffOfVectorsInScreen = _positionInParent.returnVectorSubtractedFromVector(posOfParentInScreen);
			_positionInScreen = diffOfVectorsInScreen.returnVectorScaledBy(_parent.getScaleNet());


			this.myStuffUpdated();

		}

		this.getPositionInParent = function(){
			return _positionInParent;
		}

		this.setScaleOriginal = function(val, shouldMultiplyBy){
			if(shouldMultiplyBy === true){
				_scaleOriginal *= val;
			}else{
				_scaleOriginal = val;
			}

			this.updateNetScale();

		}

		this.getScaleOriginal = function(val){
			return _scaleOriginal;
		}
		this.getScaleNet = function(){
			return _scaleNet;
		}

		this.doUpdateScaleNet = function(){
			
			if(_parent === "stop"){
				return;
			}
			
			_scaleNet *= _parent.getScaleNet();

			this.doUpdateNotify();
		}


		this.doAddChildren = function (){
			_children = _children || [];

		//call update to parent on each

		//add holders, add sprites
	}
	this.doRemoveChildren = function(){

	}

	this.doUpdatedNotify = function(){
		//add thing to list of stuff to udpate;
	}

	this.doMoveToNewParent = function(newParent){
		_doUpdateToParent();
	}

};



}