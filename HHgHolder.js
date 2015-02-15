var HHgHolderHashCont = 0;

var HHgHolder = function(w, h, zIndex, xyOffset, scale){
	HHgHolderHashCont++;
	if(HHgHolderHashCont > 10000){
		HHgHolderHashCont = 0;
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
	var _rotationOffset = 0;

	var _parent;
	
	var _backgroundHue, _backgroundSaturation, _backgroundLightness, _backgroundAlpha;

	var _scaleOriginal = scale;
	var _scaleXYOffset = new HHgVector2(1,1);
	var _scaleNet = scale;

	var _scaleIgnoreParentScale = false;
	var _scaleUniformOnly = false;

	var _zIndex = zIndex || 1;
	var _positionXYOffset = xyOffset;
	var _positionInScreenOriginal = new HHgVector2(0,0);
	var _positionInParentOriginal  = new HHgVector2(0,0);
	var _positionInScreenNet = _positionInScreenOriginal;
	

	var _children;
	var _actions;
	
	var _div;
	
	var _hash = HHgHolderHashCont;
	var _timeStamp = +new Date();
	var _finalHash = "" + _hash + "_" + _timeStamp;

	var that = this;

	var _mouseable = true;
	var _visible = true;

	//working on the frame combined updates here, but putting it off for now
	//means we can't have actions that are combinations/additive
	this.test = "no";

	this.frameUpdates = {
		positionByReset: new HHgVector2(0,0),
		positionBy: new HHgVector2(0,0),
		rotationBy: 0,
		rotationByReset: 0,
		scaleBy: new HHgVector2(1,1),
		scaleByReset: new HHgVector2(1,1),
		positionTo: undefined,
		rotationTo: undefined,
		scaleTo: undefined,
	}

	this.doFrameDump = function(){
		//this will call all the do recalcs, which will then call the complex stuff, which will then
		//use the framebuffers...I think


		//this.doRecalcScale();
		this.doRecalcRotation();
		this.doRecalcPosition();

	}

	this.frameDumpPosition = function(){
		
		

		if(this.frameUpdates.positionTo !== undefined){
			
			_positionInScreenOriginal = this.frameUpdates.positionTo;
		}else{
			if(this.frameUpdates.positionBy.hasSameXY(new HHgVector2(0,0))){
				return false;
			}
			_positionInScreenOriginal = _positionInScreenOriginal.returnVectorPlusVector( this.frameUpdates.positionBy);
		}

		this.frameUpdates.positionBy = this.frameUpdates.positionByReset;
		this.frameUpdates.positionTo = undefined;

		return true;



		
	}
	//the key is that update holder is gettign called a bunch of times, and on the third time, rotation net is zero, check console

	this.frameDumpRotation = function(){
		if(this.frameUpdates.rotationTo !== undefined){
			if(_rotationOffset == this.frameUpdates.rotationTo){
				return false;
			}
			_rotationOffset = this.frameUpdates.rotationTo;
		}else{
			if(this.frameUpdates.rotationBy == 0){
				return false;
			}
			_rotationOffset += this.frameUpdates.rotationBy;
		}

		this.frameUpdates.rotationBy = this.frameUpdates.rotationByReset;
		this.frameUpdates.rotationTo = undefined;

		return true;
		

	}


	this.frameDumpScale = function(){
		if(this.frameUpdates.scaleTo !== undefined){
			if(this.frameUpdates.scaleTo.hasSameXY(_scaleXYOffset)){
				return false;
			}
			_scaleXYOffset = this.frameUpdates.scaleTo;
		}else{
			if(this.frameUpdates.scaleBy.hasSameXY(new HHgVector2(0,0))){
				return false;
			}
			_scaleXYOffset = _scaleXYOffset.returnVectorScaledBy( this.frameUpdates.scaleBy);
		}
		

		this.frameUpdates.scaleBy = this.frameUpdates.scaleByReset;
		this.frameUpdates.scaleTo = undefined;

		return true;
		
		

	}

this.framePositionBy = function(xy){
	this.frameUpdates.positionBy = this.frameUpdates.positionBy.returnVectorPlusVector(xy);
	that.doNotifySceneOfUpdates();
}
this.frameRotationBy = function(val){
	this.frameUpdates.rotationBy *= val;
	that.doNotifySceneOfUpdates();
}
this.frameScaleBy = function(xy){
	this.frameUpdates.scaleBy = this.frameUpdates.scaleBy.returnVectorScaledBy(xy);
	that.doNotifySceneOfUpdates();
}

this.framePositionTo = function(xy){
	
	this.frameUpdates.positionTo = xy;
	that.doNotifySceneOfUpdates();
}

this.frameRotationTo = function(val){
	this.frameUpdates.rotationTo = val;
	that.doNotifySceneOfUpdates();
}

this.frameScaleTo = function(xy){
	this.frameUpdates.scaleTo = xy;
	that.doNotifySceneOfUpdates();
}




this.getHash = function(){
	return _finalHash;
}
this.setMouseable = function(mouseable){
	_mouseable = mouseable;
	if(_div){
		
		this.doNotifySceneOfUpdates();
	}
	
}
this.getMouseable = function(){
	return _mouseable;
}

this.setVisible = function(val){
	_visible = val;
	if(_div){
		this.doNotifySceneOfUpdates();
		
	}
	

}
this.getVisible = function(){
	return _visible;
}

		this.setBackgroundColor = function(H, S, L, A, shouldMultiplyBy){
		if(H === true){
			H = _backgroundHue;
		}
		if(S === true){
			L = _backgroundSaturation;
		}
		if(L === true){
			L = _backgroundLightness;
		}
		if(A === true){
			A = _backgroundAlpha;
		}
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

		

	

		this.setDiv = function(div){
			_div = div;
		}

		this.getDiv = function(){
			return _div;
		}


//============ POSITION ==================


		this.setPositionXYOffsetOriginal =function(xy, y){
			xy = HHg.returnVectorFilter(xy,y,_positionXYOffset);

			_positionXYOffset = xy;
			
			that.doNotifySceneOfUpdates();
		}


	this.doRecalcPosition = function(forceUpdate){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}

			//framedump sets position original
			if(! this.frameDumpPosition() && forceUpdate == false){
				if(this.test = "soccer"){
					console.log("AHA");
				}
				
				return;
			}
			
				_positionInScreenNet = _positionInScreenOriginal;

			if(_parent !== undefined){

				
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
			
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgScene.returnHalfSizeVector());
				
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				_positionInParentOriginal = _parent.getPositionInScreenOriginal().returnVectorSubtractedFromVector(_positionInScreenOriginal);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(_parent.getScaleNet());
				_positionInParentOriginal = _positionInParentOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenNet(),  _parent.getRotationNet() );
			
			
			}

			if(this.test = "soccer"){
					console.log("going into update " + _rotationNet);
				}

			HHgScene.doUpdateThisHolder(this);

			if(_children){
				HHg.doForEach(_children, function(child){
					//child.doRecalcPosition();
					child.updatePositionFromParentMove(child.getPositionInParentOriginal());
				});
			}
			
		}

		this.getPositionXYOffsetOriginal = function(){
			return _positionXYOffset;
		}

		this.getPositionXYOffsetNet = function(){
			
			return _positionXYOffset.returnVectorScaledBy(_scaleNet);
			
		}
		

		this.setPositionInScreenTo = function(xy, y){
			xy = HHg.returnVectorFilter(xy,y,_positionInScreenOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}
			if(this._parent === "stop"){
				return;
			}
			
			this.framePositionTo(xy);

		}

		this.setPositionInScreenBy = function(xy, y){
		
			xy = HHg.returnVectorFilter(xy,y,_positionInScreenOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}
			if(this._parent === "stop"){
				return;
			}

			this.framePositionBy(xy);
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

		this.setPositionInParentTo = function(xy, y)
		{
			xy = HHg.returnVectorFilter(xy, y, _positionInParentOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}

			if(this._parent === "stop"){
				return;
			}		

					
			//getting hacky here, but saving the original, then dumping any buffer, then using it to set the udpate
			var holder = _positionInParentOriginal;
			this.frameDumpPosition();

			this.updatePositionFromParentMove(holder);

		}

		this.updatePositionFromParentMove = function(xy){

			_positionInParentOriginal = xy;
			if(this.test = "soccer"){
				console.log("soccer updated in par " + xy.returnPretty());
			}

			_positionInScreenOriginal = _positionInParentOriginal;

			this.frameDumpPosition();
			

			if(_parent !== undefined){

				_positionInScreenOriginal = _positionInParentOriginal.returnVectorScaledBy(_parent.getScaleNet());
				_positionInScreenOriginal = _parent.getPositionInScreenNet().returnVectorPlusVector(_positionInScreenOriginal);

				_positionInScreenNet = _positionInScreenOriginal.returnVectorPlusVector( _parent.returnHalfSizeVector() );
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
				
				var stuffToSub = _parent.returnHalfSizeVector();
				_positionInScreenNet = _positionInScreenNet.returnVectorRotatedAroundVectorAtAngle( stuffToSub.returnVectorPlusVector( _parent.getPositionInScreenNet()), -1 * _parent.getRotationNet() );
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);
				
			}
			
			HHgScene.doUpdateThisHolder(this);

			if(_children){
				HHg.doForEach(_children, function(child){
					//child.doRecalcPosition();
					child.updatePositionFromParentMove(_positionInParentOriginal);

				});
			}

		}	
//=============== SCALE ================

		

		this.returnHalfSizeVector = function(){
			return new HHgVector2(that.getHalfWidth(), that.getHalfHeight());
		}

		
		this.setScaleOriginalTo = function(xy, y){

		xy = HHg.returnVectorFilter(xy,y,_scaleOriginal);
				_scaleOriginal = xy;
				this.doNotifySceneOfUpdates();

		}


		this.getScaleOriginal = function(){
			return _scaleOriginal;
		}

		this.setScaleOffsetTo = function(xy, y){

			if(xy === true){
				xy = _scaleOffset.getX();
			}
			if(y === true){
				y = _scaleOffet.getY();
			}

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				
			
			this.frameScaleTo(xy);
			
			
		}

		this.setScaleOffsetBy = function(xy, y){

			if(xy === true){
				xy = _scaleOffset.getX();
			}
			if(y === true){
				y = _scaleOffet.getY();
			}

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				
			
			this.frameScaleBy(xy);
			
			
		}


		this.getScaleXYOffset = function(){
			return _scaleXYOffset;
		}
		this.getScaleNet = function(){
			_scaleNet = _scaleIgnoreParentScale ? _scale / _parent.getScaleNet() : _scaleNet;

			if(_scaleUniformOnly === true){
				var larger = _scaleNet.getX() > _scaleNet.geY() ? _scaleNet.getX() : _scaleNet.getY();

				_scaleNet = new HHgVector2(larger, larger);
			}


			return _scaleNet;
		}

		this.doRecalcScale = function(){
			//this now gets called only in the frame dump
			if(_parent === "stop"){
				return;
			}

			
			if(!that.frameDumpScale() ){
				return;
			}

			_scaleNet = _scaleOriginal.returnVectorScaledBy(_scaleXYOffset);


			if(_parent !== undefined){
				_scaleNet = _parent.getScaleNet().returnVectorScaledBy(_scaleNet);
			}

			this.doRecalcPosition(true);

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcScale();
				});
			}



			
			
		}
	//=============== ROTATION ====================

		this.setRotationOriginalTo = function(val){
			
			val = val % 360;
			//_rotationOriginal = val;
			console.log("set rtatate to")
			this.frameRotationTo(val);
		}
	

		this.getRotationOriginal = function(){
			return _rotationOriginal;
		}

		this.setRotationOffsetTo = function(val){
			val = val % 360;
			
			this.frameRotationTo(val);

		}
		this.setRotationOffsetBy = function(val){
			val = val % 360;
			
			this.frameRotationBy(val);

		}
		this.getRotationOffset = function(){
			return _rotationOffset;
		}

		this.getRotationNet = function(){
			return _rotationNet;
		}

		this.doRecalcRotation = function(){
			//now called as frame dump
			if(_parent === "stop") return;

			if(!this.frameDumpRotation()){
				if(this.test == "pool"){
					console.log("pool frame dump fail")
				}
				return;
			}
			console.log("made it past frame dump rotate test");

			_rotationNet = _rotationOriginal + _rotationOffset;

			if(_parent !== undefined){
				_rotationNet += _parent.getRotationNet();
			}

			if(this.test = "soccer"){
				console.log("parent set rotate, soccer now " + _rotationNet);
			}

			this.doRecalcPosition(true);

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcRotation();
				});
			}

			

		}



		this.doNotifySceneOfUpdates = function(){
			
			//*** disabling this and moving to the frame buffer thing
			//HHgScene.doUpdateThisHolder(that);
			HHgScene.doAddToDirtyList(that);
			
			/*
			if(_children){
				HHg.doForEach(_children, function(child){
					HHgScene.doAddToDirtyList(child);
				});
			}
			*/

			
			

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

	this.doMoveToNewParent = function(newParent, xy, isScreenPos){
		if(_parent === "stop"){
			return;
		}

		if(newParent === "stop"){
			HHgScene.doAddThisHolder(this);
			return;
		}

		

		if(xy === undefined){
			xy = new HHgVector2(0,0);
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

		//removing as part of frame dump
		//that.doRecalcRotation();
		//that.doRecalcScaleNet();

	
		
		isScreenPos ? that.setPositionInScreenTo(xy) : that.setPositionInParentTo(xy);
			
}

//============= ACTIONS ================

	var doFinalizeAction = function(action){
		HHgActionManager.doAddAction(action);
		_actions = _actions || [];
		_actions.push(action);

	}

	this.doRemoveAction = function(action){
		HHg.doRemoveThingFromArray(_actions, action);
	}

	this.doActionMoveInScreen = function(xy,y,time,shouldAddTo, onComplete, ease){

		if(xy === true){
				xy = _positionInScreenOriginal.getX();
			}
			if(y === true){
				y = _positionInScreenOriginal.getY();
			}

		if(xy instanceof HHgVector2 === false){
			xy = xy || that.getPositionInScreenOriginal().getX();
			y = y || that.getPositionInScreenOriginal().getY();
			xy = new HHgVector2(xy, y);
		}else{
			onComplete = shouldAddTo;
			shouldAddTo = time;
			time = y;

		}



		var theAction;
		theAction = shouldAddTo ? (new HHgActionMoveBy(that, xy, time, false, onComplete)) : (new HHgActionMoveTo(that, xy, time,false, onComplete));
		doFinalizeAction(theAction);
		
		
	}

	this.doActionRotate = function(degrees, time){

		var theAction;
		theAction = new HHgActionRotateBy(that, degrees, time);
		
		doFinalizeAction(theAction);

	}

	this.doActionFollowQuad = function(xyC, xy2, time){
		

		var theAction;
		theAction = new HHgActionFollowQuad(that, xyC, xy2, time);
		doFinalizeAction(theAction);




		
	}

//============= MOUSE =================

	

	this.doMouseDown = function(){
		console.log("yay")
		this.setBackgroundColor(true, true, true, .4);
	}

	this.doMouseUp = function(){

	}

	this.doMouseMove = function(){

	}


	//======visibility =========

	this.doShow = function(xy,y){
		
		xy = HHg.returnVectorFilter(xy,y, _positionInScreenOriginal);
		
		this.setVisible(true);
		if(xy !== undefined){
			this.setPositionInScreenTo(xy);

		}

	}
	this.doHide = function(){

		that.setVisible(false);

	}

	this.doAddSprite = function(name){
		HHgSprite.doAddSpriteToHolder(this,name);
	}

}










