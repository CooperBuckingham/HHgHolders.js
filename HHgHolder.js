var holderHashCount = 0;

function HHgHolder(w, h, zIndex, xyOffset, scale, xyScaleOffset){
	holderHashCount++;
	if(holderHashCount > 10000){
		holderHashCount = 0;
		console.log("HASH passed 10000");
	}

	xyScaleOffset =  xyScaleOffset || new HHgVector2(1,1);
	xyOffset =  xyOffset || new HHgVector2(0,0);
	scale = scale || 1.0;
	zIndex = zIndex || 0;
	w = w || HHgScene.getWidth();
	h = h || HHgScene.getHeight();
	xyScaleOffset = xyScaleOffset || new HHgVector2(1,1);

	var _widthOriginal = w;
	var _heightOriginal = h;

	var _widthNet = w;
	var _heightNet = h;
	
	var _parent;
	
	var _backgroundHue, _backgroundSaturation, _backgroundLightness, _backgroundAlpha;

	var _scaleOriginal = scale;
	var _scaleXYOffset = xyScaleOffset;
	var _scaleNet = scale;

	var _zIndex = zIndex;
	var _xyOffset = xyOffset;
	var _positionInScreen = new HHgVector2(0,0);
	var _positionInParent  = new HHgVector2(0,0);

	var _children;
	var _actions;
	
	var _div;
	
	var _hash = holderHashCount;
	var _timeStamp = +new Date();
	var _finalHash = "" + _hash + "_" + _timeStamp;

	var that = this;
	

this.getHash = function(){
	return _finalHash;
}

		this.setBackgroundColor = function(H, S, L, A, shouldMultiplyBy){
		
			H = H > 360 ? H % 360 : H;
			S = S > 1 ? 1 : S;
			L = L > 1 ? 1 : L;
			A = A > 1 ? 1 : A;
			
			var mult = shouldMultiplyBy || 1;

			_backgroundHue = H * mult || _backgroundHue;
			_backgroundSaturation = S * mult || _backgroundSaturation;
			_backgroundLightness = L * mult || _backgroundLightness;
			_backgroundAlpha = A * mult || _backgroundLightness;


			that.doUpdatedNotify();
		}

		this.getBackgroundColor= function(){
			return "hsla(" + _backgroundHue + ", " + (100 * _backgroundSaturation) + "%, " + (100 * _backgroundLightness) + "%, " + _backgroundAlpha +")";
		}
	
		//do we want these to be calculations if the holder is holding things?
		this.getWidthOriginal = function(){
			return _widthOriginal;
		}


		this.getHeightOriginal = function(){
			return _heightOriginal;
		}

		this.getWidthNet = function(){
			return _widthNet;
		}

		this.getHeightNet = function(){
			return _heightNet;
		}


		this.getParent = function(){
			return _parent;
		}

		this.getHalfWidth = function(){
			return _widthNet / 2;
		}

		this.getHalfHeight = function(){
			return _heightNet / 2;
		}

		this.getZ = function(){
			return _zIndex;
		}

		this.setZ = function(z){
			//***this needs more logic, like regarding children
			_zIndex = z;
			that.doUpdatedNotify();
		}

		this.setXYOffset =function(xy){
			_xyOffset = xy;
			//need to update both screen and parent position
			that.doUpdatedNotify();
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
			//have to update stuff here
			that.doUpdateScaleNet();
			
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
			var diffOfVectorsInScreen = posOfParentInScreen.returnVectorSubtractedFromVector(_positionInScreen);
			_positionInParent = diffOfVectorsInScreen.returnVectorScaledByInverse(_parent.getScaleNet());
			_positionInParent = _positionInParent.returnVectorPlusVector(_parent.returnHalfSizeVector());
			_positionInParent = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInParent);

			this.doUpdatedNotify();
		}


		this.getPositionInScreen = function(){
			return _positionInScreen;
		}

		this.setX = function(x, shouldAddTo){
			that.setPositionInScreen(new HHgVector2(x,_positionInScreen.getY(), shouldAddTo));
		}

		this.setY = function(y, shouldAddTo){
			that.setPositionInScreen(new HHgVector2(_x,y), shouldAddTo);
		}

		this.setXInParent = function(x, shouldAddTo){
			that.setPositionInParent(new HHgVector2(x,_y), shouldAddTo);
		}

		this.setYInParent = function(y, shouldAddTo){
			that.setPositionInParent(new HHgVector2(_x,y), shouldAddTo);
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
			_positionInScreen = posOfParentInScreen.returnVectorPlusVector(_positionInParent);
			_positionInScreen = _positionInScreen.returnVectorScaledBy(_parent.getScaleNet());
			_positionInScreen = _positionInScreen.returnVectorPlusVector(_parent.returnHalfSizeVector());
			_positionInScreen = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreen);


			that.doUpdatedNotify();

			//return new HHgVector2(xyPos.getX() + this.getHalfWidth(), xyPos.getY() + this.getHalfHeight());

		}

		this.returnHalfSizeVector = function(){
			return new HHgVector2(_widthNet / 2, _heightNet / 2);
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

			that.updateNetScale();

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

			that.doUpdatedNotify();
		}


		this.doAddChild = function (child){
			_children = _children || [];
			if(child instanceof HHgHolder !== true){
				throw("Tried to add a child not of HHgHolder Class");
				return;
			}

			_children.push(child);
			

		//call update to parent on each

		//add holders, add sprites
	}
	this.doRemoveChild = function(child){
		return HHg.doRemoveThingFromArray(_children, child);

	}

	this.doUpdatedNotify = function(){
		console.log("updatedNotify");
		//add thing to list of stuff to udpate;
		HHgScene.doUpdateThisHolder(that);
	}

	this.doMoveToNewParent = function(newParent, pos, isScreenPos){
		if(_parent === "stop"){
			return;
		}

		if(newParent === "stop"){
			HHgScene.doAddThisHolder(this);
			return;
		}

		if(_parent === undefined){
			HHgScene.doAddThisHolder(this);
		}else{
			_parent.doRemoveChild(this);
		}

		_parent = newParent || HHgScene;

		if(_parent instanceof HHgHolder !== true){
			throw("tried to add child to a parent not of HHgHolder Class");
		}

		_parent.doAddChild(this);
		
		that.doUpdateScaleNet();
		pos = pos || new HHgVector2(0,0);
		isScreenPos ? that.setPositionInScreen(pos) : that.setPositionInParent(pos);
			
	


};



}