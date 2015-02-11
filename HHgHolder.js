var holderHashCount = 0;

var HHgHolder = function(w, h, zIndex, xyOffset, scale){
	holderHashCount++;
	if(holderHashCount > 10000){
		holderHashCount = 0;
		console.log("HASH passed 10000");
	}

	xyOffset =  xyOffset || new HHgVector2(0,0);
	zIndex = zIndex || 0;
	w = w || HHgScene.getWidthOriginal();
	h = h || HHgScene.getHeightOriginal();

	if(scale instanceof HHgVector2){
		//scale is fine
	}else{
		scale = scale || 1 ;
		scale = new HHgVector2(scale,scale);
	}
	
	

	var _widthOriginal = w;
	var _heightOriginal = h;

	var _rotationOriginal = 0;
	var _rotationNet = 0;

	var _parent;
	
	var _backgroundHue, _backgroundSaturation, _backgroundLightness, _backgroundAlpha;

	var _scaleOriginal = scale;
	var _scaleXYOffset = new HHgVector2(1,1);
	var _scaleNet = scale;

	var _zIndex = zIndex;
	var _positionXYOffset = xyOffset;
	var _positionInScreenOriginal = new HHgVector2(0,0);
	var _positionInParentOriginal  = new HHgVector2(0,0);
	var _positionInScreenNet = _positionInScreenOriginal;
	

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
			_backgroundAlpha = A * mult || _backgroundAlpha;

			if(_parent !== undefined){
				that.doNotifySceneOfUpdates("color");
			}
			
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
			return _widthOriginal * _scaleNet.getX();
		}

		this.getHeightNet = function(){
			return _heightOriginal * _scaleNet.getY();
		}


		this.getParent = function(){
			return _parent;
		}

		this.getHalfWidth = function(){
			return that.getWidthNet() / 2;
		}

		this.getHalfHeight = function(){
			return that.getHeightNet() / 2;
		}

		this.getZIndex = function(){
			return _zIndex;
		}

		this.setZIndex = function(z){
			//***this needs more logic, like regarding children
			_zIndex = z;
			that.doNotifySceneOfUpdates(_zIndex);
		}

		this.setPositionXYOffsetOriginal =function(xy, y){
			if(xy instanceof HHgVector2){
				_positionXYOffset = xy;
			}else{
				xy = xy || _positionXYOffset.getX();
				y = y || _positionXYOffset.getY();
				_positionXYOffset = new HHgVector2(xy, y);
			}
			
			that.doRecalcPosition();
		}

		this.getPositionXYOffsetOriginal = function(){
			return _positionXYOffset;
		}

		this.getPositionXYOffsetNet = function(){
			return _positionXYOffset.returnVectorScaledBy(_scaleNet);
		}

		this.setDiv = function(div){
			_div = div;
		}

		this.getDiv = function(){
			return _div;
		}


//will establish this once set in parent is done and working

		

		this.setPositionInScreen = function(xyPos, shouldAddTo){
			if(this._parent === "stop"){
				return;
			}
	

			if(shouldAddTo === true){
				_positionInScreenOriginal = _positionInScreenOriginal.returnVectorPlusVector(xyPos);
			}else{
				_positionInScreenOriginal = xyPos;
			}

				_positionInScreenNet = _positionInScreenOriginal;




			if(_parent !== undefined){

				
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
			
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(_parent.returnHalfSizeVector());
				
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);
				
				_positionInParentOriginal = _positionInScreenOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenNet(),  _parent.getRotationNet() );
				
			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcPosition();
				});
			}

			that.doNotifySceneOfUpdates();

		}


		this.getPositionInScreenOriginal = function(){
			
			return _positionInScreenOriginal;
		}


		this.getPositionInParentOriginal = function(){
			return _positionInParentOriginal;
		}

		this.getPositionInScreenNet = function(){
			
			return _positionInScreenNet;
		}


		this.setPositionInParent = function(parXYPos, shouldAddTo){

			if(this._parent === "stop"){
				return;
			}

			//only problem left is screen original getting set inside of position in parent

			if(shouldAddTo === true){
				_positionInParentOriginal = _positionInParentOriginal.returnVectorPlusVector(parXYPos);
			}else{
				_positionInParentOriginal = parXYPos;
			}



			_positionInScreenOriginal = _positionInParentOriginal;

			if(_parent !== undefined){

				_positionInScreenOriginal = _positionInParentOriginal.returnVectorScaledBy(_parent.getScaleNet());
				_positionInScreenOriginal = _parent.getPositionInScreenNet().returnVectorPlusVector(_positionInScreenOriginal);


				_positionInScreenNet = _positionInScreenOriginal.returnVectorPlusVector( _parent.returnHalfSizeVector() );
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
				
				var stuffToSub = _parent.returnHalfSizeVector();
				_positionInScreenNet = _positionInScreenNet.returnVectorRotatedAroundVectorAtAngle( stuffToSub.returnVectorPlusVector( _parent.getPositionInScreenNet()), -1 * _parent.getRotationNet() );
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				//that is actually the final net, I think
				
				
				//_positionInScreenOriginal = _parent.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);
				//_positionInScreenOriginal = that.getPositionXYOffsetNet().returnVectorSubtractedFromVector(_positionInScreenOriginal);
				//_positionInScreenOriginal = _positionInScreenOriginal.returnVectorPlusVector(that.returnHalfSizeVector());

			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcPosition();
				});
			}

			that.doNotifySceneOfUpdates();


		}

		this.returnHalfSizeVector = function(){
			return new HHgVector2(that.getHalfWidth(), that.getHalfHeight());
		}

		
		this.setScaleOriginal = function(xy, y){

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				_scaleOriginal = xy;

			that.doRecalcScaleNet();

		}

		this.setScaleOriginalMultiplied = function(xy, y){

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				_scaleOriginal = _scaleOriginal.returnVectorScaledBy(xy);

			that.doRecalcScaleNet();

		}

		this.getScaleOriginal = function(val){
			return _scaleOriginal;
		}

		this.setScaleXYOffset = function(xy, y){
			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				_scaleXYOffset = xy;
			
			that.doRecalcScaleNet();
			
			
		}

		this.setScaleXYOffsetMultiplied = function(xy, y){
			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				_scaleXYOffset = _scaleXYOffset.returnVectorScaledBy(xy);
			
			that.doRecalcScaleNet();
			
			
		}

		this.getScaleXYOffset = function(){
			return _scaleXYOffset;
		}
		this.getScaleNet = function(){
			return _scaleNet;
		}

		this.doRecalcScaleNet = function(){
			
			if(_parent === "stop"){
				return;
			}

			_scaleNet = _scaleOriginal.returnVectorScaledBy(_scaleXYOffset);


			if(_parent !== undefined){
				_scaleNet = _parent.getScaleNet().returnVectorScaledBy(_scaleNet);
			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcScaleNet();
				});
			}

			//scale changes have to notify for position changes
			
			 that.doRecalcPosition();

			
			
		}

		this.setRotationOriginal = function(val){
			
			val = val % 360;
			_rotationOriginal = val;
			that.doRecalcRotation();
		}

		this.setRotationOriginalAdd = function(val){
			val = val % 360;
			_rotationOriginal += val;
			that.doRecalcRotation();
		}
		this.setRotationOriginalMultiply = function(val){
			val = val %360;
			_rotationOriginal += val;
			that.doRecalcRotation();
		}

		this.getRotationOriginal = function(){
			return _rotationOriginal;
		}

		this.getRotationNet = function(){
			return _rotationNet;
		}

		this.doRecalcRotation = function(){
			if(_parent === "stop") return;

			_rotationNet = _rotationOriginal;

			if(_parent !== undefined){
				_rotationNet = _rotationNet + _parent.getRotationNet();
			}


			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcRotation();
				});
			}

			that.doRecalcPosition();

		}

		this.doRecalcPosition = function(){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}

			//that.setPositionInParent(_positionInParentOriginal);
			that.setPositionInParent(_positionInParentOriginal);
			
		}

		this.doNotifySceneOfUpdates = function(){
			
			//add thing to list of stuff to udpate;

			HHgScene.doUpdateThisHolder(that);
		}


		this.doAddChild = function (child){
			//this should be a private method
			_children = _children || [];
			if(child instanceof HHgHolder !== true){
				throw("Tried to add a child not of HHgHolder Class");
				return;
			}

			_children.push(child);
			

		}

	this.doRemoveChild = function(child){
		//this should be a private method
		return HHg.doRemoveThingFromArray(_children, child);

	}

	this.doMoveToNewParent = function(newParent, xy, yOrIsScreenPos, isScreenPos){
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

		if(xy instanceof HHgVector2){
			isScreenPos = yOrIsScreenPos;
		}else{
			xy = new HHgVector2(xy, yOrIsScreenPos);
		}
		

		_parent.doAddChild(this);

		that.doRecalcRotation();
		that.doRecalcScaleNet();

		xy = xy || _positionInScreenOriginal;
		xy = xy || new HHgVector2(0,0);

		
		isScreenPos ? that.setPositionInScreen(xy) : that.setPositionInParent(xy);
			
};

//============= ACTIONS ================
	this.actionMoveInScreen = function(xy,y,time,shouldAddTo, onComplete, ease){
		if(xy instanceof HHgVector2 === false){
			xy = xy || that.getPositionInScreenOriginal().getX();
			y = y || that.getPositionInScreenOriginal().getY();
			xy = new HHgVector2(xy, y);
		}else{
			time = y;
			shouldAddTo = time;
		}

		_actions = _actions || [];

		var theAction;
		theAction = shouldAddTo ? (new HHgActionMoveBy(that, xy, time, onComplete, ease)) : (new HHgActionMoveTo(that, xy, time, onComplete, ease));
		_actions.push(theAction);
		HHgMain.HHgActionManager.addAction(theAction);
		
	};

	this.doRemoveAction = function(action){
		HHg.doRemoveThingFromArray(_actions, action);
	}

}








