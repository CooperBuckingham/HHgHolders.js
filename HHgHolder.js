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
		this.doRecalcScale();
		this.doRecalcRotation();
		this.doRecalcPosition();
	}

	this.frameDumpPosition = function(){
		
		var returnVal = this.frameUpdates.positionTo || _positionInScreenOriginal.returnVectorPlusVector( this.frameUpdates.positionBy);

		this.frameUpdates.positionBy = this.frameUpdates.positionByReset;
		this.frameUpdates.positionTo = undefined;

		return returnVal;
		
	}

	this.frameDumpRotation = function(){
		
		
		var returnVal = this.frameUpdates.rotationTo || this.frameUpdates.rotationBy * _rotationOriginal;

		this.frameUpdates.rotationBy = this.frameUpdates.rotationByReset;
		this.frameUpdates.rotationTo = undefined;
		return returnVal;
		

	}


	this.frameDumpScale = function(){
		
		
		var returnVal = this.frameUpdates.scaleTo || this.frameUpdates.scaleBy.returnVectorScaledBy(_scaleOriginal);

		this.frameUpdates.scaleBy = this.frameUpdates.scaleByReset;
		this.frameUpdates.scaleTo = undefined;
		return returnVal;
		

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
		HHgScene.doUpdateHolderMouseable(that);
	}
	
}
this.getMouseable = function(){
	return _mouseable;
}

this.setVisible = function(val){
	_visible = val;
	if(_div){

		HHgScene.doUpdateHolderVisible(that);
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

		

		this.setPositionXYOffsetOriginal =function(xy, y){
			xy = HHg.returnVectorFilter(xy,y,_positionXYOffset);

			_positionXYOffset = xy;
			
			that.doNotifySceneOfUpdates();
		}

	

		this.setDiv = function(div){
			_div = div;
		}

		this.getDiv = function(){
			return _div;
		}


//============ POSITION ==================

	this.doRecalcPosition = function(){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}
			_positionInScreenOriginal = this.frameDumpPosition();

				_positionInScreenNet = _positionInScreenOriginal;

			if(_parent !== undefined){

				
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
			
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgScene.returnHalfSizeVector());
				
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);
				

				_positionInParentOriginal = _positionInScreenOriginal.returnVectorScaledByInverse(_parent.getScaleNet());
				_positionInParentOriginal = _positionInParentOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenNet(),  _parent.getRotationNet() );
			
			
			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcPosition();
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

		this.setPositionInScreenBy = function(xy){
		
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


		this.setPositionInParentTo = function(xy, y ){

			xy = HHg.returnVectorFilter(xy, y, _positionInParentOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}
						if(this._parent === "stop"){
							return;
						}
			
				_positionInParentOriginal = xy;

			_positionInScreenOriginal = _positionInParentOriginal;
			

			if(_parent !== undefined){

				_positionInScreenOriginal = _positionInParentOriginal.returnVectorScaledBy(_parent.getScaleNet());
				_positionInScreenOriginal = _parent.getPositionInScreenNet().returnVectorPlusVector(_positionInScreenOriginal);
			}

			this.setPositionInScreenTo(_positionInScreenOriginal);
//try to cut this all out
/*
				_positionInScreenNet = _positionInScreenOriginal.returnVectorPlusVector( _parent.returnHalfSizeVector() );
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(that.getPositionXYOffsetNet());
				
				var stuffToSub = _parent.returnHalfSizeVector();
				_positionInScreenNet = _positionInScreenNet.returnVectorRotatedAroundVectorAtAngle( stuffToSub.returnVectorPlusVector( _parent.getPositionInScreenNet()), -1 * _parent.getRotationNet() );
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				//that is actually the final net, I think
				
				
				
			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcPosition();
				});
			}
*/
			
//=============== SCALE ================

		}

		this.returnHalfSizeVector = function(){
			return new HHgVector2(that.getHalfWidth(), that.getHalfHeight());
		}

		
		this.setScaleOriginal = function(xy, y){

		xy = HHg.returnVectorFilter(xy,y,_scaleOriginal);
				_scaleOriginal = xy;
				this.doNotifySceneOfUpdates();

		}


		this.getScaleOriginal = function(){
			return _scaleOriginal;
		}

		this.setScaleXYOffset = function(xy, y){

			if(xy === true){
				xy = _scaleXYOffset.getX();
			}
			if(y === true){
				y = _scaleXYOffet.getY();
			}

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				_scaleXYOffset = xy;
			
			this.doNotifySceneOfUpdates();
			
			
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

			_scaleXYOffset = this.frameDumpScale();
			_scaleNet = _scaleOriginal.returnVectorScaledBy(_scaleXYOffset);



			if(_parent !== undefined){
				_scaleNet = _parent.getScaleNet().returnVectorScaledBy(_scaleNet);
			}

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcScaleNet();
				});
			}



			
			
		}
	//=============== ROTATION ====================

		this.setRotationOriginal = function(val){
			
			val = val % 360;
			_rotationOriginal = val;
			this.doNotifySceneOfUpdates();
		}

		this.getRotationOriginal = function(){
			return _rotationOriginal;
		}

		this.setRotationOffset = function(val){
			val = val % 360;
			_rotationOffset = val;
			this.doNotifySceneOfUpdates();

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

			_rotationOffset = this.frameDumpRotation();
			
			_rotationNet = _rotationOriginal * _rotationOffset;

			if(_parent !== undefined){
				_rotationNet = _rotationNet + _parent.getRotationNet();
			}


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

		

		if(newParent instanceof HHgHolder !== true){
			if(newParent instanceof HHgVector2){
				xy = newParent;
			}else{
				if(typeof newParent === "number"){
					yOrIsScreenPos = xy;
					xy = newParent;
				}
			}
			newParent = HHgScene;
			
		}

		if(xy === undefined){
			xy = _positionInScreenOriginal;
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










