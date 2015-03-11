var HHgHolderHashCont = 0;

var HHgHolder = function(props){
//props width, height, zIndex, scale(xy or x)
	HHgHolderHashCont++;
	if(HHgHolderHashCont > 10000){
		HHgHolderHashCont = 0;
		console.log("HASH passed 10000");
	}

	HHg.returnSizeProps(props);

	var _widthOriginal = props.size.getX(),
		_heightOriginal = props.size.getY(),

		_rotationOriginal = 0,
		 _rotationNet = 0,
		_rotationStored = 0,

		_parent,
	
		_backgroundHue, _backgroundSaturation, _backgroundLightness, _backgroundAlpha,

		_scaleOriginal = HHg.returnScaleProps(props),
		_scaleNet = _scaleOriginal,
		_scaleStored = _scaleOriginal,
	

		_scaleIgnoreParentScale = false,
		_scaleUniformOnly = false,

		_zIndex = props.zIndex || 1,
		_positionInScreenOriginal = new HHgVector2(0,0),
		 _positionInParentOriginal  = _positionInScreenOriginal,
		_positionInScreenNet = _positionInScreenOriginal,
		_positionStored = _positionInScreenOriginal,
	
		_children,
		_actions,
	
		_div,
	
		_hash = HHgHolderHashCont,
		_timeStamp = +new Date(),
		_finalHash = "" + _hash + "_" + _timeStamp,

		that = this,

		_mouseable = false,
		_visible = true,

		_canvas;

	this.isScene = false,

	this.test = "no",

	this.frameUpdates = {
		positionBy: undefined,
		rotationBy: undefined,
		scaleBy: undefined,
		positionTo: undefined,
		rotationTo: undefined,
		scaleTo: undefined,
	};

	this.changes = {
		scale: false,
		position: false,
		rotation: false,
		color: false,
		visible: false,
		mouseable: false,
		zIndex: false,
	};

	this.resetChanges = function(){
		this.changes = {
			scale: false,
			position: false,
			rotation: false,
			color: false,
			visible: false,
			mouseable: false,
			zIndex: false,
		}
	};

	this.setNewStats = function(props){
		HHg.returnSizeProps(props);
		_widthOriginal = props.size.getX();
		_heightOriginal = props.size.getY();
		_zIndex = props.zIndex || 1;
	
		_scaleOriginal = HHg.returnScaleProps(props);
	};

	this.killHolder = function(){
		_widthOriginal = w;
		_heightOriginal = h;

		_rotationOriginal = 0;
		_rotationNet = 0;
		_rotationStored = 0;

		if(_parent) _parent.doRemoveChild(this);
		
		_parent = undefined;
		
		_scaleOriginal = 1;
		_scaleNet = 1;
		_scaleStored = 1;
		

		_scaleIgnoreParentScale = false;
		_scaleUniformOnly = false;

		_zIndex = -1;
		_positionInScreenOriginal = HHg10000Vector;
		_positionInParentOriginal  = _positionInScreenOriginal;
		_positionInScreenNet = _positionInScreenOriginal;
		_positionStored = _positionInScreenOriginal;
		
		
		for(var i = 0; i < _children.length; i++){
			_children[i].killHolder();
		}

		for(var i = 0; i < _actions.length; i++){
			HHgActionManager.doRemoveAction(_actions[i]);
		}

		_children = [];
		_actions = [];
		_mouseable = false;
		_visible = false;

		this.isScene = false;

		this.test = "no";

		this.frameUpdates = {
			positionBy: undefined,
			rotationBy: undefined,
			scaleBy: undefined,
			positionTo: undefined,
			rotationTo: undefined,
			scaleTo: undefined,
		}

		this.changes = {
			scale: false,
			position: false,
			rotation: false,
			color: false,
			visible: false,
			mouseable: false,
			zIndex: false,
		}
	}

	this.setScene = function(){
			_scaleOriginal = new HHgVector2(1,1);
			_scaleNet = _scaleOriginal;
			_widthOriginal = HardwareScreen.w;
			_heightOriginal = HardwareScreen.w / (HHgScreen.w * HHgScreen.maxh);
			_parent = "stop";
			_mouseable = false;
	}

	this.setGameHolder = function(){
			
			_scaleOriginal = new HHgVector2(HardwareScreen.w / HHgScreen.w, HardwareScreen.w / HHgScreen.w);
			HHgPixelScale = _scaleOriginal.getX();
			_scaleNet = _scaleOriginal;
			_widthOriginal = HHgScreen.w;
			_heightOriginal = HHgScreen.h;
			_parent = HHgScene;
			_mouseable = false;
	}

	this.setCanvas = function(canvas){
		_canvas = canvas;
	}

	this.getCanvas = function(){
		return _canvas;
	}

	this.doFrameDump = function(){

		if(this.frameDumpScale()){
			this.doRecalcScale();
		}
		
		if(this.frameDumpRotation()){
			this.doRecalcRotation();
		}

		if(this.frameDumpPosition()){
			
			this.doRecalcPosition();
		}else{
			this.updatePositionFromParentMove();
		}

			
		this.doTellSceneToUpdate();
		

	}

	this.doTellSceneToUpdate = function(){
		//pulling this out and doing a second pass
		HHgScene.doUpdateThisHolder(this);

		if(_children){
			
				for(var i = 0; i < _children.length; i++){
					_children[i].updatePositionFromParentMove();
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
	this.changes.mouseable = true;
	if(_div){
		
		this.doNotifySceneOfUpdates();
	}
	
}
this.getMouseable = function(){
	return _mouseable;
}

this.setVisible = function(val){
	_visible = val;
	this.changes.visible = true;
	if(_div){
		this.doNotifySceneOfUpdates();
		
	}
	

}
this.getVisible = function(){
	return _visible;
}

	this.setBackgroundColor = function(H, S, L, A, shouldMultiplyBy){

		this.changes.color = true;

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
			
			if(shouldMultiplyBy){
				_backgroundHue *= H;
				_backgroundSaturation *= S;
				_backgroundLightness *= L;
				_backgroundAlpha *= A;

			}else{
				_backgroundHue = H;
				_backgroundSaturation = S;
				_backgroundLightness = L;
				_backgroundAlpha = A;
			}
			
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

		this.getSizeOriginal = function(){
			return new HHgVector2(_widthOriginal, _heightOriginal);
		}

		this.getSizeNet = function(){
			return new HHgVector2(this.getWidthNet(), this.getHeightNet());
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

			this.changes.zIndex = true;
			_zIndex = z;
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
				
				this.convertOriginalToNetPosition();
				

			if(_parent !== undefined){

			

				_positionInParentOriginal = _parent.getPositionInScreenOriginal().returnVectorSubtractedFromVector(_positionInScreenOriginal);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(_parent.getScaleNet());
				_positionInParentOriginal = _positionInParentOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenOriginal(), 1 *  _parent.getRotationNet() );


			}

			this.changes.position = true;


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
		

		this.setPositionInScreenTo = function(props){
			
			
			this.framePositionTo(HHg.returnPositionProps(props));

		}

		this.setPositionInScreenBy = function(props){
		
			this.framePositionBy(HHg.returnPositionProps(props));
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

		this.setPositionInParentTo = function(props)
		{

			_positionInParentOriginal = HHg.returnPositionProps(props);
			//updatePositionFromParentMove(xy)
			this.doNotifySceneOfUpdates();

		}

		this.updatePositionFromParentMove = function(){
			
				if(that.test === "soccer" && (_positionInParentOriginal.getX() > 1 || _positionInParentOriginal.getY() > 1) ){
					
					console.log("PARENT SOCCER POSITION");
					console.log(_positionInParentOriginal.returnPretty());
					

				}
			
				_positionInScreenOriginal = _positionInParentOriginal;

			
			if(_parent !== undefined){

		
				_positionInScreenOriginal = _positionInScreenOriginal.returnVectorScaledBy(_parent.getScaleNet());
				_positionInScreenOriginal = _parent.getPositionInScreenOriginal().returnVectorPlusVector(_positionInScreenOriginal);

				_positionInScreenOriginal = _positionInScreenOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenOriginal() , -1 * _parent.getRotationNet() );
				

				this.convertOriginalToNetPosition();
			

			}

			this.changes.position = true;
			
			

			if(_children){
				HHg.doForEach(_children, function(child){
					
					child.updatePositionFromParentMove();

				});
			}

		}

		this.convertOriginalToNetPosition = function(){

			_positionInScreenNet = _positionInScreenOriginal.returnVectorScaledBy(HHgGameHolder.getScaleNet());

			if(_parent !== undefined){


				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgGameHolder.returnHalfSizeVector());
				
				_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);
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

		this.setScaleOriginalTo = function(props){
				
			
			this.frameScaleTo(HHg.returnScaleProps(props));
			
			
		}

		this.setScaleOriginalBy = function(props){

			
			this.frameScaleBy(HHg.returnScaleProps(props));
			
			
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

			this.changes.scale = true;
			

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
			this.setRotationOriginalTo(_rotationStored);
		}

		this.setRotationOriginalTo = function(props){
			
			
			this.frameRotationTo(HHg.returnRotationProps(props) % 360);
		}

		this.setRotationOriginalBy = function(props){
			
			this.frameRotationBy(HHg.returnRotationProps(props) % 360);
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

			this.changes.rotation = true;


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

	this.doMoveToNewParent = function(props){
		//newParent, xy, isScreenPos

		if(_parent === "stop"){
			return;
		}

		if(props.parent === "stop"){
			HHgScene.doAddThisHolder(this);
			return;
		}

		HHg.returnPositionProps(props, HHg0Vector);

		if(_parent === undefined){
			HHgScene.doAddThisHolder(this);
		}else{
			_parent.doRemoveChild(this);

		}

		_parent = props.parent || HHgGameHolder;


		if(_parent instanceof HHgHolder !== true){
			throw("tried to add child to a parent not of HHgHolder Class");
		}

		
		_parent.doAddChild(this);

		this.setRotationOriginalTo(_rotationOriginal);
		this.setScaleOriginalTo(_scaleOriginal);
		
		props.isScreenPos ? that.setPositionInScreenTo(props.position) : that.setPositionInParentTo(props.position);
			
}

//============= ACTIONS ================
	var actionCounter = 0;
	var doFinalizeAction = function(action){
		
		_actions = _actions || {};
		if(action.name){
			if(_actions.hasOwnProperty(action.name)){
				console.log("WARNING: Action with name: " + action.name + " already exists on Holder");
				return;
			}
		}else{
			action.name = actionCounter;
		}

		actionCounter++;
		HHgActionManager.doAddAction(action);
		_actions[action.name] = action;

	}

	this.doRemoveAction = function(action){
		
		HHgActionManager.doRemoveAction(action);
		delete _actions[action.name];
	}

	this.doActionMoveInScreenTo = function(props){

		HHg.returnPositionProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = (new HHgActionMoveTo(that, props.position, props.time, props.ease, props.onComplete));
		doFinalizeAction(theAction);
		
		
	}

	this.doActionMoveInScreenBy = function(props){

		HHg.returnPositionProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = (new HHgActionMoveBy(that, props.position, props.time, props.ease, props.onComplete));
		doFinalizeAction(theAction);
		
		
	}

	this.doActionRotateBy = function(props){

		HHg.returnRotationProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionRotateBy(that, props.rotation, props.time, props.ease, props.onComplete);
		
		doFinalizeAction(theAction);

	}



	this.doActionRotateLeftTo = function(props){

		HHg.returnRotationProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionRotateLeftTo(that, props.rotation, props.time, props.ease, props.onComplete);
		
		doFinalizeAction(theAction);

	}

	this.doActionRotateRightTo = function(props){

		HHg.returnRotationProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionRotateRightTo(that, props.rotation, props.time, props.ease, props.onComplete);
		
		doFinalizeAction(theAction);

	}

	this.doActionRotateForever = function(props){

		HHg.returnSpeedProps(props);
		HHg.returnEaseProps(props);

		var theAction;
		theAction = new HHgActionRotateForever(that, props.speed, props.ease);
		
		doFinalizeAction(theAction);
	}

	this.doActionScaleBy = function(props){

		HHg.returnScaleProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionScaleBy(that, props.scale, props.time, props.ease, props.onComplete);
		
		doFinalizeAction(theAction);

	}
	this.doActionScaleTo = function(props){

		HHg.returnScaleProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionScaleTo(that, props.scale, props.time, props.ease, props.onComplete);
		
		doFinalizeAction(theAction);

	}

	this.doActionFollowQuad = function(props){
		
		HHg.returnPositionProps(props);
		HHg.returnControlPositionProps(props);
		HHg.returnTimeProps(props);
		HHg.returnEaseProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionFollowQuad(that, props.control, props.position, props.time, props.ease, props.onComplete);
		doFinalizeAction(theAction);
		
	}

	this.doActionTimer = function(props){

		HHg.returnTimeProps(props);
		HHg.returnOnCompleteProps(props);

		var theAction;
		theAction = new HHgActionTimer(that, props.time, props.onComplete);
	}

//============= MOUSE =================

	

	this.doMouseDown = function(){
		
		//this.setBackgroundColor(true, true, true, .4);
		
		this.setScaleStored();
		this.setScaleOriginalBy(.9,.9);
	
		//this.setScaleOriginalTo(.75,.75);
		//this.setRotationStored();
		//this.setRotationOriginalTo(60);
	}

	this.doMouseUp = function(mouseWasOverWhenReleased){
		this.setScaleOriginalBy(1.0/0.9,1.0/0.9);
		//that.setRotationToStored();
		//this.setRotationOriginalTo(0);
		//this.setScaleToStored();
	}

	this.doMouseMove = function(){

	}


	//======visibility =========

	this.doShow = function(xy,y){
		
		this.setVisible(true);
		if(xy !== undefined){
			if(xy instanceof HHgVector2 === true){
				this.setPositionInScreenTo(xy);
			}else if(y !== undefined){
				this.setPositionInScreenTo({x:xy,y:y});
			}
			
		}

	}
	this.doHide = function(){

		that.setVisible(false);

	}

	this.doAddSprite = function(name){
		HHgSprite.doAddSpriteToHolder(this,name);
	}

}










