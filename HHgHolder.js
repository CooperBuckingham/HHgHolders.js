var HHgHolderHashCont = 0;

var HHgHolder = function(w, h, zIndex, scale){
	HHgHolderHashCont++;
	if(HHgHolderHashCont > 10000){
		HHgHolderHashCont = 0;
		console.log("HASH passed 10000");
	}

	zIndex = zIndex || 0;
	w = w || HHgGameHolder.getWidthOriginal();
	h = h || HHgGameHolder.getHeightOriginal();

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
	var _rotationStored = 0;

	var _parent;
	
	var _backgroundHue, _backgroundSaturation, _backgroundLightness, _backgroundAlpha;

	var _scaleOriginal = scale;
	var _scaleNet = scale;
	var _scaleStored = scale;
	

	var _scaleIgnoreParentScale = false;
	var _scaleUniformOnly = false;

	var _zIndex = zIndex || 1;
	var _positionInScreenOriginal = new HHgVector2(0,0);
	var _positionInParentOriginal  = _positionInScreenOriginal;
	var _positionInScreenNet = _positionInScreenOriginal;
	var _positionStored = _positionInScreenOriginal;
	
	

	var _children;
	var _actions;
	
	var _div;
	
	var _hash = HHgHolderHashCont;
	var _timeStamp = +new Date();
	var _finalHash = "" + _hash + "_" + _timeStamp;

	var that = this;

	var _mouseable = true;
	var _visible = true;

	var _canvas;

this.isScene = false;

	this.setGameHolder = function(){
			console.log("do we call this?");
			_scaleOriginal = new HHgVector2(HardwareScreen.w / HHgScreen.w, HardwareScreen.w / HHgScreen.w);
			_scaleNet = _scaleOriginal;
			_widthOriginal = HHgScreen.w;
			_heightOriginal = HHgScreen.h;
			_parent = HHgScene;
	}

	this.setCanvas = function(canvas){
		_canvas = canvas;
	}

	this.getCanvas = function(){
		return _canvas;
	}

	//working on the frame combined updates here, but putting it off for now
	//means we can't have actions that are combinations/additive
	this.test = "no";

	this.frameUpdates = {
		positionBy: undefined,
		rotationBy: undefined,
		scaleBy: undefined,
		positionTo: undefined,
		rotationTo: undefined,
		scaleTo: undefined,
	}


	this.doFrameDump = function(){
		//this will call all the do recalcs, which will then call the complex stuff, which will then
		//use the framebuffers...I think
		if(this.test == "soccer"){
			console.log("soccer is dirty");
		}

		if(this.frameDumpScale()){
			this.doRecalcScale();
		}
		
		if(this.frameDumpRotation()){
			this.doRecalcRotation();
		}

		

		//this is to allow position in screen to be absolute regardless of parent rotation or scale
		if(this.frameDumpPosition()){
		
			this.doRecalcPosition();
		}else{
			
			this.updatePositionFromParentMove();
		}

		
		this.doTellSceneToUpdate();

	}

	this.doTellSceneToUpdate = function(){
		HHgScene.doUpdateThisHolder(this);

		if(_children){
			
				for(var i = 0; i < _children.length; i++){
					_children[i].doTellSceneToUpdate();
				}
			
		}

	}

	this.frameDumpPosition = function(){
		

		var returnVal = false;

	

		if(this.frameUpdates.positionTo !== undefined){
			
			_positionInScreenOriginal = this.frameUpdates.positionTo;
			

			returnVal = true;
		}else if(this.frameUpdates.positionBy !== undefined){
			
			_positionInScreenOriginal = _positionInScreenOriginal.returnVectorPlusVector( this.frameUpdates.positionBy);

			returnVal = true;
		}

		this.frameUpdates.positionBy = undefined;
		this.frameUpdates.positionTo = undefined;
		

		return returnVal;



		
	}
	//the key is that update holder is gettign called a bunch of times, and on the third time, rotation net is zero, check console

	this.frameDumpRotation = function(){

		var returnVal = false;

		if(this.frameUpdates.rotationTo !== undefined){
			
			_rotationOriginal = this.frameUpdates.rotationTo;
			returnVal = true;
		}else if(this.frameUpdates.rotationBy !== undefined){
			
			_rotationOriginal += this.frameUpdates.rotationBy;
			returnVal = true;
		}

		this.frameUpdates.rotationBy = undefined;
		this.frameUpdates.rotationTo = undefined;

		return returnVal;
		

	}


	this.frameDumpScale = function(){
		var returnVal = false;

		if(this.frameUpdates.scaleTo !== undefined){
			
			_scaleOriginal = this.frameUpdates.scaleTo;
			returnVal = true;
		}else if(this.frameUpdates.scaleBy !== undefined){
			
			_scaleOriginal = _scaleOriginal.returnVectorScaledBy( this.frameUpdates.scaleBy);
			returnVal = true;
		}
		

		this.frameUpdates.scaleBy = undefined;
		this.frameUpdates.scaleTo = undefined;

		return returnVal;
		
		

	}

this.framePositionBy = function(xy){
	if(this.frameUpdates.positionBy){
		this.frameUpdates.positionBy = this.frameUpdates.positionBy.returnVectorPlusVector(xy);
	}else{
		this.frameUpdates.positionBy = xy;
	}
	
	that.doNotifySceneOfUpdates();
}
this.frameRotationBy = function(val){
	if(this.frameUpdates.rotationBy){
		this.frameUpdates.rotationBy *= val;
	}else{
		this.frameUpdates.rotationBy = val;
	}
	
	that.doNotifySceneOfUpdates();
}
this.frameScaleBy = function(xy){


	if(this.frameUpdates.scaleBy){
		this.frameUpdates.scaleBy = this.frameUpdates.scaleBy.returnVectorScaledBy(xy);
	}else{
		this.frameUpdates.scaleBy = xy;
	}
	
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

	


	this.doRecalcPosition = function(forceUpdate){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}

				
				_positionInScreenNet = _positionInScreenOriginal.returnVectorScaledBy(HHgGameHolder.getScaleNet());

			if(_parent !== undefined){

			
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgGameHolder.returnHalfSizeVector());
				
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				_positionInParentOriginal = _parent.getPositionInScreenOriginal().returnVectorSubtractedFromVector(_positionInScreenOriginal);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(_parent.getScaleNet());
				_positionInParentOriginal = _positionInParentOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenNet(), -1 *  _parent.getRotationNet() );
				
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledBy(HHgGameHolder.getScaleNet());

				if(this.test === "soccer"){
					console.log("parent pos after screen calc " + _positionInParentOriginal.returnPretty());
				}

			}


			if(_children){
				HHg.doForEach(_children, function(child){
					child.updatePositionFromParentMove();
					
				});
			}
			
		}

		this.setPositionStored = function(){
			_positionStored = _positionInScreenOriginal;
		}

		this.getPositionStored = function(){
			return _positionStored;
		}

		this.setPositionToStored = function(){
			that.setPositionInScreenTo(_positionStored);
		}
		

		this.setPositionInScreenTo = function(xy, y){
			
			xy = HHg.returnVectorFilter(xy,y,_positionInScreenOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}
			
			
			this.framePositionTo(xy);

		}

		this.setPositionInScreenBy = function(xy, y){
		
			xy = HHg.returnVectorFilter(xy,y,_positionInScreenOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
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
			
			xy = HHg.returnVectorFilter(xy,y,_positionInParentOriginal);
			if(xy === undefined){
				xy = new HHgVector2(0,0);
			}
					
			//getting hacky here, but saving the original, then dumping any buffer, then using it to set the udpate
			
			this.frameDumpPosition();

			_positionInParentOriginal = xy;
			//updatePositionFromParentMove(xy)
			this.doNotifySceneOfUpdates();

		}

		this.updatePositionFromParentMove = function(){
			
			
				_positionInScreenOriginal = _positionInParentOriginal;

				//_positionInScreenOriginal = HHgScreenDiff.returnVectorSubtractedFromVector(_positionInScreenOriginal);

			
			if(_parent !== undefined){

				_positionInScreenOriginal = _positionInScreenOriginal.returnVectorScaledBy(_parent.getScaleNet());
				_positionInScreenOriginal = _parent.getPositionInScreenNet().returnVectorPlusVector(_positionInScreenOriginal);

				

				_positionInScreenNet = _positionInScreenOriginal.returnVectorPlusVector( _parent.returnHalfSizeVector() );
				_positionInScreenNet = _positionInScreenNet.returnVectorRotatedAroundVectorAtAngle( _parent.returnHalfSizeVector().returnVectorPlusVector( _parent.getPositionInScreenNet()), -1 * _parent.getRotationNet() );
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				
				
			}
			
			

			if(_children){
				HHg.doForEach(_children, function(child){
					//child.doRecalcPosition();
					child.updatePositionFromParentMove(_positionInParentOriginal);

				});
			}

		}	
//=============== SCALE ================

		this.setScaleStored = function(){
			_scaleStored = _scaleOriginal;
		}

		this.getScaleStored = function(){
			return _scaleStored;
		}

		this.setScaleToStored = function(){
			that.setScaleOriginalTo(_scaleStored);
		}

		this.returnHalfSizeVector = function(){
			return new HHgVector2(that.getHalfWidth(), that.getHalfHeight());
		}


		this.getScaleOriginal = function(){
			return _scaleOriginal;
		}

		this.setScaleOriginalTo = function(xy, y){

			if(xy === true){
				xy = _scaleOriginal.getX();
			}
			if(y === true){
				y = _scaleOriginal.getY();
			}

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				
			
			this.frameScaleTo(xy);
			
			
		}

		this.setScaleOriginalBy = function(xy, y){

			if(xy === true){
				xy = _scaleOriginal.getX();
			}
			if(y === true){
				y = _scaleOriginal.getY();
			}

			if(xy instanceof HHgVector2 === false){
				xy = new HHgVector2(xy, y);
			}
				
			
			this.frameScaleBy(xy);
			
			
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
			


			_scaleNet = _scaleOriginal;


			if(_parent !== undefined){
				_scaleNet = _parent.getScaleNet().returnVectorScaledBy(_scaleNet);
			}

			

			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcScale();
				});
			}



			
			
		}
	//=============== ROTATION ====================

		this.setRotationStored = function(){
			_rotationStored = _rotationOriginal;
		}

		this.getRotationStored = function(){
			return _rotationStored;
		}

		this.setRotationToStored = function(){
			that.setRotationOriginalTo(_rotationStored);
		}

		this.setRotationOriginalTo = function(val){
			
			val = val % 360;
			//_rotationOriginal = val;
			
			
			this.frameRotationTo(val);
		}

		this.setRotationOriginalBy = function(val){
			
			val = val % 360;
			//_rotationOriginal = val;
			
			
			this.frameRotationBy(val);
		}
	

		this.getRotationOriginal = function(){
			return _rotationOriginal;
		}


		this.getRotationNet = function(){
			return _rotationNet;
		}

		this.doRecalcRotation = function(){
			//now called as frame dump
			if(_parent === "stop") return;

			_rotationNet = _rotationOriginal;

			if(_parent !== undefined){
				_rotationNet += _parent.getRotationNet();
			}


			if(_children){
				HHg.doForEach(_children, function(child){
					child.doRecalcRotation();

				});
			}

			

		}

//==================== management

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

		_parent = newParent || HHgGameHolder;


		if(_parent instanceof HHgHolder !== true){
			throw("tried to add child to a parent not of HHgHolder Class");
		}

		

		_parent.doAddChild(this);

		this.setRotationOriginalTo(_rotationOriginal);
		this.setScaleOriginalTo(_scaleOriginal);
		
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
		
		this.setBackgroundColor(true, true, true, .4);
		this.setScaleStored();
		this.setScaleOriginalBy(.75,.75);
	}

	this.doMouseUp = function(mouseWasOverWhenReleased){
		that.setScaleToStored();
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










