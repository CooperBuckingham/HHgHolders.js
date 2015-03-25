var HHgHolderHashCont = 0;

var HHgHolder = function(props){
//props width, height, zIndex, scale(xy or x)
	HHgHolderHashCont++;
	if(HHgHolderHashCont > 50000){
		HHgHolderHashCont = 0;
		console.log("HASH passed 50000");
	}
	var temp = HHg.returnSizeProps(props) || new HHgVector2(HHgGameHolder.getWidthOriginal(), HHgGameHolder.getHeightOriginal());


	var _widthOriginal = temp.getX(),
		_heightOriginal = temp.getY(),
		_sizeOriginal = new HHgVector2(_widthOriginal, _heightOriginal),
		_sizeOriginalHalf = _sizeOriginal.returnVectorScaledBy(.5),

		_rotationOriginal = 0,
		 _rotationNet = 0,
		_rotationStored = 0,

		_parent,

		_backgroundColor,
		_tintColor,

		_scaleOriginal = HHg.returnScaleProps(props) || new HHgVector2(1,1),
		_scaleNet = _scaleOriginal,
		_scaleStored = _scaleOriginal,


		_scaleIgnoreParentScale = false,
		_scaleUniformOnly = false,
		_positionInScreenOriginal = new HHgVector2(0,0),
		 _positionInParentOriginal  = _positionInScreenOriginal,
		_positionInScreenNet = _positionInScreenOriginal,
		_positionStored = _positionInScreenOriginal,

		_children,
		_actions, _clusters =[], _sequences=[],
		_paused,

		_div,

		_hash = HHgHolderHashCont,
		_timeStamp = +new Date(),
		_finalHash = "" + _hash + "_" + _timeStamp,

		that = this,

		_mouseable = false,
		_visible = true,
		_classList = {},
		_soundList = {},

		_canvas;

	var _zIndex = HHg.returnZIndexProps(props);
		if(_zIndex === undefined){
			_zIndex = 1;
		}

		var counterForNamingActions = 0;
	var actionsTotal = 0;

	this.getOriginalSize = function(){
		return _sizeOriginal;
	};

	this.fontSizeOriginal = 1;
	this.fontSizeScaled = 1;
	this.borderWidthScaled = 0;
	this.borderWidthOriginal = 0;

	this.isScene = false,
	this.isDraggable = false;
	this.isBeingDragged = false;

	this.test = "no";

	this.resetChanges = function(){
		this.changes = {
			scale: false,
			position: false,
			rotation: false,
			tint: false,
			backgroundColor: false,
			visible: false,
			mouseable: false,
			zIndex: false,
			classList: false,
		}
	};

	this.resetChanges();

	this.resetFrameUpdates = function(){
		this.frameUpdates = {
			positionBy: undefined,
			rotationBy: undefined,
			scaleBy: undefined,
			positionTo: undefined,
			rotationTo: undefined,
			scaleTo: undefined,
			positionAbsolute: undefined,
		}

	};

	this.resetFrameUpdates();

	this.resetFramePositionUpdates = function(){
		this.frameUpdates.positionBy = undefined;
		this.frameUpdates.positionTo = undefined;
		this.frameUpdates.positionAbsolute = undefined;
	}

	this.setIsDraggable = function(bool){
		this.isDraggable = bool;
	}

	this.getIsDraggable = function(){
		return this.isDraggable;
	}

	this.setNewStats = function(props){
		var size = HHg.returnSizeProps(props) || new HHgVector2(HHgGameHolder.getWidthOriginal(), HHgGameHolder.getHeightOriginal());

		_widthOriginal = size.getX();
		_heightOriginal = size.getY();
		_zIndex = HHg.returnZIndexProps(props) || 1;

		_scaleOriginal = HHg.returnScaleProps(props) || new HHgVector2(1,1);
	};

	this.killHolder = this.releaseHolder = function(){
		_widthOriginal = w;
		_heightOriginal = h;

		_rotationOriginal = 0;
		_rotationNet = 0;
		_rotationStored = 0;

		_backgroundColor = undefined;
		_tintColor = undefined;

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

		actionsTotal = 0;
		HHgActionManager.doRemoveOwner(that);
		_actions = {};

		_children = [];

		for(var key in _classList){
			this.doRemoveCSSClass(key);
		}

		_classList = {};

		_mouseable = false;
		_visible = false;

		this.isScene = false;

		this.test = "no";

		this.resetFrameUpdates();

		this.resetChanges();
	}


	this.setPaused = function(bool){

		_paused = bool;
		for(var i =0; i < _children.length; i++){
			_children[i].setPaused(bool);
		}
	}

	this.getPaused = function(){
		return _paused;
	}

	this.setScene = function(){
			_scaleOriginal = new HHgVector2(1,1);
			_scaleNet = _scaleOriginal;
			_widthOriginal = HardwareScreen.w;
			_heightOriginal = HardwareScreen.w / (HHgScreen.w * HHgScreen.maxh);
			_parent = "stop";
			_mouseable = false;
			this.test = "scene";
	}

	this.setGameHolder = function(){

			_scaleOriginal = new HHgVector2(HardwareScreen.w / HHgScreen.w, HardwareScreen.w / HHgScreen.w);
			HHgPixelScale = _scaleOriginal.getX();
			_scaleNet = _scaleOriginal;
			_widthOriginal = HHgScreen.w;
			_heightOriginal = HHgScreen.h;
			_parent = HHgScene;
			_mouseable = false;
			this.isGameHolder = true;
			this.getScaleNetForChildPosition = function(){
				return HHg1Vector;
			}
			this.test = "gameholder";
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

		if(this.frameDumpPosition() || this.isBeingDragged === true){

			this.doRecalcPosition();
		}else{

			this.updatePositionFromParentMove();

		}

		this.doMarkForFinalPass();


	}

	this.doMarkForFinalPass = function(){
		//pulling this out and doing a second pass
		HHgScene.addToFinalPassList(this);

		if(_children){

				for(var i = 0; i < _children.length; i++){
					_children[i].updatePositionFromParentMove();
					_children[i].doMarkForFinalPass();
				}

		}

	}

	this.frameDumpPosition = function(){

		var returnVal = false;

		if(this.frameUpdates.positionAbsolute !== undefined){
			_positionInScreenOriginal = this.frameUpdates.positionAbsolute;
			returnVal = true;

		}else if(this.isBeingDragged === true){
			//won't allow other types of position updates
		}else if(this.frameUpdates.positionTo !== undefined){

			_positionInScreenOriginal = this.frameUpdates.positionTo;


			returnVal = true;
		}else if(this.frameUpdates.positionBy !== undefined ){

			_positionInScreenOriginal = _positionInScreenOriginal.returnVectorPlusVector( this.frameUpdates.positionBy);

			returnVal = true;
		}

		this.frameUpdates.positionBy = undefined;
		this.frameUpdates.positionTo = undefined;
		this.frameUpdates.positionAbsolute = undefined;


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

			_scaleOriginal = _scaleOriginal.returnVectorPlusVector( this.frameUpdates.scaleBy);
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
		this.frameUpdates.rotationBy += val;
	}else{
		this.frameUpdates.rotationBy = val;
	}

	that.doNotifySceneOfUpdates();
}
this.frameScaleBy = function(xy){


	if(this.frameUpdates.scaleBy){
		this.frameUpdates.scaleBy = this.frameUpdates.scaleBy.returnVectorPlusVector(xy);
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

this.framePositionAbsolute = function(xy){
	this.frameUpdates.positionAbsolute = xy;
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

		this.setBackgroundColor = function(color){

			_backgroundColor = HHg.returnColorProps(color);


			this.changes.backgroundColor = true;

			if(_parent !== undefined){
				that.doNotifySceneOfUpdates();
			}

		}
		this.getBackgroundColor = function(){
			return _backgroundColor;
		}

		this.setTintToRGBA = function(color){
			console.log("setting tint: " + color.pretty());
			this.changes.tint = true;
			if(_parent !== undefined){
				that.doNotifySceneOfUpdates();
			}
			_tintColor = color;
		}

		this.setTintByRGBA = function(color, percent){
			this.changes.tint = true;
			if(_parent !== undefined){
				that.doNotifySceneOfUpdates();
			}
			if(_tintColor){
				_tintColor.blendColorIn(color,percent);
			}else{
				this.setTintToRGBA(color);
			}

		}
		this.getTintRGBA = function(){
			return _tintColor;
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

		this.getMySizeOffset = function(){
			return _sizeOriginalHalf.returnVectorScaledBy(this.getScaleNetForMyPosition());
		}
		this.getCenterPosition = function(){
			return _positionInScreenNet.returnVectorPlusVector(this.getMySizeOffset());
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

		this.setZIndexTo = function(z, doNotUpdateChildren){
			//***this needs more logic, like regarding children

			this.changes.zIndex = true;
			_zIndex = z;
			that.doNotifySceneOfUpdates();
			if(doNotUpdateChildren !== true){
				for(var i = 0; i < _children.length; i++){
					_children[i].setZIndexTo(z);
				}
			}
		}

		this.setZIndexBy = function(z, doNotUpdateChildren){
			this.changes.zIndex = true;
			_zIndex+= z;
			that.doNotifySceneOfUpdates();
			if(doNotUpdateChildren !== true){
				for(var i = 0; i < _children.length; i++){
					_children[i].setZIndexBy(z);
				}
			}
		}


		this.setDiv = function(div){
			_div = div;
		}

		this.getDiv = function(){
			return _div;
		}


//============ POSITION ==================


//EXPERIEMNT
	this.doRecalcPosition = function(){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}

				this.convertOriginalToNetPosition();


			if(_parent !== undefined){

				_positionInParentOriginal = _positionInScreenOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenOriginal(), 1 *  _parent.getRotationNet() );

				_positionInParentOriginal = _parent.getPositionInScreenOriginal().returnVectorSubtractedFromVector(_positionInParentOriginal);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(_parent.getScaleNetForChildPosition());

			}

			this.changes.position = true;


			if(_children){
				HHg.doForEach(_children, function(child){

					child.updatePositionFromParentMove();

				});
			}

		}
/*

	this.doRecalcPosition = function(){
			if(_parent === "stop") return;

			if(_parent == undefined){
				return;
			}

				this.convertOriginalToNetPosition();


			if(_parent !== undefined){

				_positionInParentOriginal = _positionInScreenOriginal.returnVectorRotatedAroundVectorAtAngle( _parent.getPositionInScreenOriginal(), 1 *  _parent.getRotationNet() );

				_positionInParentOriginal = _parent.getPositionInScreenOriginal().returnVectorSubtractedFromVector(_positionInParentOriginal);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(_parent.getScaleNetForChildPosition());

			}

			this.changes.position = true;


			if(_children){
				HHg.doForEach(_children, function(child){

					child.updatePositionFromParentMove();

				});
			}

		}
		*/

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

		this.setPositionInScreenAbsolute = function(props){

			this.framePositionAbsolute(HHg.returnPositionProps(props));
		}


		this.getPositionInScreenOriginal = function(){

			return _positionInScreenOriginal;
		}

		this.getPositionWithCentering = function(){
			return that.returnHalfSizeVector().returnVectorPlusVector( _positionInScreenOriginal);
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

				this.doNotifySceneOfUpdates();

				this.resetFramePositionUpdates();

				this.updatePositionFromParentMove();


		}

		this.updatePositionFromParentMove = function(){

			//****
			if(this.isBeingDragged === true){
				return;
			}

				_positionInScreenOriginal = _positionInParentOriginal;


			if(_parent !== undefined){


				_positionInScreenOriginal = _positionInScreenOriginal.returnVectorScaledBy(_parent.getScaleNetForChildPosition());
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


//EXPERIMENT

		this.convertOriginalToNetPosition = function(){

		//note, to specifically use GameHolder scale for child here, even though it's asking for position
		//because the offsets need its relative scale.

		_positionInScreenNet = _positionInScreenOriginal.returnVectorScaledBy(HHgGameHolder.getScaleNetForChildScale());
		_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgGameHolder.returnHalfSizeVector());
	  _positionInScreenNet.minusEquals(this.getMySizeOffset());




		//_positionInScreenNet = _sizeOriginal.returnVectorScaledBy(.5).returnVectorScaledBy(HHgPixelScale).returnVectorSubtractedFromVector(_positionInScreenNet);
		//_positionInScreenNet = _positionInScreenNet.returnVectorScaledBy(HHgGameHolder.getScaleNetForChildScale());
//***** working on getting scale to efect posiiton correctly.
			if(_parent !== undefined){


			}

		}
/*
		this.convertOriginalToNetPosition = function(){

		//note, to specifically use GameHolder scale for child here, even though it's asking for position
		//because the offsets need its relative scale.
			_positionInScreenNet = _positionInScreenOriginal.returnVectorScaledBy(HHgGameHolder.getScaleNetForChildScale());

			if(_parent !== undefined){

				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgGameHolder.returnHalfSizeVector());

					_positionInScreenNet = that.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

			}

		}
		*/
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


			this.frameScaleBy( HHg1Vector.returnVectorSubtractedFromVector(HHg.returnScaleProps(props)) ) ;


		}
		this.setScaleOriginalByActionFraction = function(props){


			this.frameScaleBy(HHg.returnScaleProps(props).returnVectorPlusVector(HHg1Vector));


		}

		this.getScaleNetForChildScale = function(){
			_scaleNet = _scaleIgnoreParentScale ? _scale / _parent.getScaleNetForChildPosition() : _scaleNet;

			if(_scaleUniformOnly === true){
				var larger = _scaleNet.getX() > _scaleNet.geY() ? _scaleNet.getX() : _scaleNet.getY();

				_scaleNet = new HHgVector2(larger, larger);
			}


			return _scaleNet;
		}

		this.getScaleNetForChildPosition = function(){

			if(_parent.isGameHolder === true){
				return _scaleOriginal;
			}
				return this.getScaleNetForChildScale();

		}

		this.getScaleNetForMyPosition = function(){


			if(_parent !== undefined){
				return _parent.getScaleNetForChildScale();
			}

			return HHg1Vector;
		}

		this.doRecalcScale = function(){

			_scaleNet = _scaleOriginal;


			if(_parent !== undefined){
				_scaleNet = _parent.getScaleNetForChildScale().returnVectorScaledBy(_scaleNet);
			}

			this.fontSizeScaled = this.fontSizeOriginal * _scaleNet.getX();
			this.borderWidthScaled = this.borderWidthOriginal * _scaleNet.getX();

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

	this.doMoveToNewParent = this.doAddToNewParent = function(props){
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

		this.setRotationOriginalBy(_rotationOriginal);
		this.setScaleOriginalBy(HHg1Vector);

		if(HHg.returnIsScreenPosProps(props)){
			_positionInScreenOriginal = props.position;
			that.setPositionInScreenTo(props.position)
		}else{
			that.setPositionInParentTo(props.position)
		}

}

//============= ACTIONS ================

	this.doFinalizeAction = function(action){

		_actions = _actions || {};
		if(action.name){
			if(_actions.hasOwnProperty(action.name)){
				console.log("WARNING: Action with name: " + action.name + " already exists on Holder");
				return;
			}
		}else{
			action.name = "" + counterForNamingActions + HHg.returnRandomHash();
		}

		counterForNamingActions++;

		if(action.isActionCluster || action.isActionSequence){
			_actions[action.name] = action;
			return {owner: action.props.owner, name: action.name};
		}else{
			_actions[action.name] = action;
			actionsTotal++;
			HHgActionManager.doAddAction(that,action);
			return action.name;
		}

	}

	this.getActions = function(){
		return _actions;
	}

	this.doRemoveAction = function(action){
		var tempObject;
		if(action.isActionCluster || action.isActionSequence){
			for(var i = 0; i < action.props.myActions.length; i++){
				tempObject = action.props.myActions[i];
				tempObject.owner.doRemoveActionByName(tempObject.name);
			}
			delete _actions[action.name];

		}else{
			delete _actions[action.name];

			actionsTotal--;
			if(actionsTotal <= 0) HHgActionManager.doRemoveOwner(that);
		}

	}
	this.doRemoveActionByName = function(name){

		 this.doRemoveAction(_actions[name]);
	}


	this.doActionMoveInScreenTo = function(props){

		var theAction;
		theAction = new HHgActionMoveBy(that, _positionInScreenOriginal.returnVectorSubtractedFromVector(HHg.returnPositionProps(props)), _positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);


	}

	this.doActionMoveInScreenBy = function(props){

		var theAction;
		theAction = new HHgActionMoveBy(that, HHg.returnPositionProps(props), _positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);


	}

	this.doActionMoveInScreenForever = function(props){

		var theAction;
		theAction = new HHgActionMoveForever(that, (HHg.returnPositionProps(props) || HHg.returnSpeedXYprops(props)), _positionInScreenOriginal, HHg.returnEaseProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionRotateBy = function(props){

		var theAction;

		theAction = new HHgActionRotateBy(that, HHg.returnRotationProps(props), _rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionRotateLeftTo = function(props){

			var degrees = HHg.returnRotationProps(props) % 360;
			if(degrees > 180){
				degrees = -(degrees - 180);
			}

			if(degrees < _rotationOriginal){
				degrees = degrees - _rotationOriginal;
			}else{
				degrees = -(360 - Math.abs(_rotationOriginal - degrees) );
			}

		var theAction;
		theAction = new HHgActionRotateBy(that, degrees, _rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionRotateRightTo = function(props){

			var degrees = HHg.returnRotationProps(props) % 360;
			if(degrees > 180){
				degrees = -(degrees - 180);
			}

			if(degrees > _rotationOriginal){
				degrees = degrees - _rotationOriginal;
			}else{
				degrees = -(360 - Math.abs(_rotationOriginal - degrees) );
			}

		var theAction;
		theAction = new HHgActionRotateBy(that, degrees, _rotationOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionRotateForever = function(props){

		var theAction;
		theAction = new HHgActionRotateForever(that, (HHg.returnRotationProps(props) || HHg.returnSpeedNProps(props)), HHg.returnEaseProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);
	}

	this.doActionScaleBy = function(props){

		var theAction;

		theAction = new HHgActionScaleBy(that, HHg.returnScaleProps(props), _scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}
	this.doActionScaleTo = function(props){

		var theAction;
		theAction = new HHgActionScaleBy(that, HHg.returnScaleProps(props).returnVectorScaledByInverse(_scaleOriginal), _scaleOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionScaleForever = function(props){

		var theAction;
		theAction = new HHgActionScaleForever(that, (HHg.returnScaleProps(props) || HHg.returnSpeedXYProps(props)), _scaleOriginal, HHg.returnEaseProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionFollowQuad = function(props){

		var theAction;
		theAction = new HHgActionFollowQuad(that, HHg.returnControlPositionProps(props), HHg.returnPositionProps(props), _positionInScreenOriginal, HHg.returnTimeProps(props), HHg.returnEaseProps(props), props.onComplete, HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);

	}

	this.doActionTimer = function(props){

		var theAction;
		theAction = new HHgActionTimer(that, HHg.returnTimeProps(props), HHg.returnOnCompleteProps(props));
		theAction.name = props.name;
		theAction.sequenceChain = props.sequenceChain;
		return this.doFinalizeAction(theAction);
	}

	this.doActionPlaySound = function(props){
		//does this trigger a new sound or existing cached sound. how does sound caching work?
		//then test storing actions and plaing them later
		//then test clusters, then test sequences.
		var test = HHgAudio.newSound("click");
		console.log(test.duration);

	}

	this.doActionCustom = function(func, time, onComplete){
		func.bind(this)();
		return this.doActionTimer({time: time, onComplete: onComplete});

	}

	this.doAction = function(actionName, props){
		this.returnActionFunction(actionName).call(props);
	}

	this.returnActionFunction = function(name){
		switch(name.toLowerCase()){
			case "timer":
			return this.doActionTimer.bind(this);
			case "followquad":
			return this.doActionFollowQuad.bind(this);
			case "scaleforever":
			return this.doActionScaleForever.bind(this);
			case "scaleto":
			return this.doActionScaleTo.bind(this);
			case "scaleby":
			return this.doActionScaleBy.bind(this);
			case "rotateforever":
			return this.doActionRotateForever.bind(this);
			case "rotaterightto":
			return this.doActionRotateRightTo.bind(this);
			case "rotateleftto":
			return this.doActionRotateLeftTo.bind(this);
			case "rotateby":
			return this.doActionRotateBy.bind(this);
			case "moveby":
			case "moveinscreenby":
			return this.doActionMoveInScreenBy.bind(this);
			case "moveto":
			case "moveinscreento":
			return this.doActionMoveInScreenTo.bind(this);
			case "moveinscreenforever":
			return this.doActionMoveInScreenForever.bind(this);
			case "custom":
			return this.doActionCustom.bind(this);
			case "playsound":
			return this.doActionPlaySound.bind(this);
		}
	}

	//============= ACTION CLUSTERS AND SEQUENCES =============

	this.makeAction = this.makeStoredAction = this.storeAction = function(actionName, props){
		return {actionCall: this.returnActionFunction(actionName), props: props, owner: this};
	}

	this.doStoredAction = this.callStoredAction = function(storedAction){
		if(storedAction.isActionCluster){
			return this.doActionCluster(storedAction);
		}else if(storedAction.isActionSequence){
			return this.doActionSequence(storedAction);
		}else{
			return {owner: storedAction.props.owner, name: storedAction.actionCall.call(undefined, storedAction.props)};
		}

	}

	this.makeActionCluster = this.makeCluster = function(storedActions, name, onComplete){
		var i, key, longestTime = 0, finalActions = [], tempAction,totalActions = 1;

		if(storedActions.length !== +storedActions.length){
			for(key in storedActions){
				finalAction.push(storedActions[key]);
			}
		}else{
			finalActions = storedActions;
		}

			for(i = 0; i < finalActions.length; i++){
				tempAction = finalActions[i];
				totalActions++;
				if(tempAction.props.time > longestTime){
					longestTime = tempAction.props.time;
				}
			}
			var func = function(){
				this.props.onComplete();
			};

			var sFunc = function(){
				this.props.sequenceChain();
			}

			finalActions.unshift(this.makeAction("timer", {time: longestTime, onComplete: func.bind(finalActions), sequenceChain: sFunc.bind(finalActions)  } ) );
			finalActions.isActionCluster = true;
			finalActions.props = {time: longestTime, name: name, myActions: [], totalActions: totalActions, owner: this, onComplete: onComplete};
			return finalActions;

	}

	this.doActionCluster = function(cluster){
		var i, tempThing, clusterName;


		for(i = 0; i < cluster.length; i++){
			tempThing = cluster[i];
			cluster.props.myActions.push(this.doStoredAction(tempThing));
		}

		return this.doFinalizeAction(cluster);

	}

	this.makeActionSequence = function(storedActions, name, onComplete){
		var i, key, finalActions = [], finalSequence = [], tempAction, tempAction2, tempFunction;
		if(storedActions.length !== +storedActions.length){
			for(key in storedActions){
				finalActions.push(storedActions[key]);
			}
		}else{
			finalActions = storedActions;
		}

		finalActions.props = {myActions: [], totalActions: finalActions.length, name: name, time: 0, onComplete: onComplete, sequenceChain: function(){}};

		finalActions.push(this.makeAction("timer", {time: 0, onComplete: onComplete}));

			for(i = 0; i < finalActions.length; i++){
				tempAction = finalActions[i];
				finalActions.props.time += tempAction.props.time;

				if(i < finalActions.length - 1){
					var newAction = finalActions[i+1];
					var func = function(sequence, nextAction){
						sequence.props.myActions.push(this.doStoredAction(nextAction));
					};

					tempAction.props.sequenceChain = func.bind(that,finalActions, newAction);

				}else{

					var func = function(){
						this.props.sequenceChain();
					};

					tempAction.props.sequenceChain = func.bind(finalActions);
				}
			}

			finalActions.isActionSequence = true;
			return finalActions;

	}

	this.doActionSequence = function(sequence){

		sequence.props.myActions.push(this.doStoredAction(sequence[0]));
		return this.doFinalizeAction(sequence);
	}

//============= MOUSE =================


	//this will all be overridden for custom games
	this.doMouseDown = function(){

		//this.setScaleStored();
		//this.setScaleOriginalBy(.9,.9);
		//this.doActionScaleForever({scaleX: .9, scaleY: .9, name: "mousedownscale"});
		//this.doActionPlaySound("click");
		//this.doActionRotateForever({speed:300, name: "mousemoverotate"});
	}

	this.doMouseUp = function(mouseWasOverWhenReleased){
		//this.setScaleOriginalBy(1.0/0.9,1.0/0.9);
		//this.doRemoveActionByName("mousedownscale");
		this.isBeingDragged = false;

	}

	this.doStartMouseMove = function(){

		this.setPositionStored();
		this.isBeingDragged = true;


	}

	this.doMouseMove = function(){

		this.setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.returnVectorPlusVector(HHgMouse.draggingOffsetXY));

	}

	this.doEndMouseMove = function(){

		this.setPositionInScreenAbsolute(HHgMouse.thisMousePosXY.returnVectorPlusVector(HHgMouse.draggingOffsetXY));
		this.isBeingDragged = false;
		//this.doRemoveActionByName("mousemoverotate");
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

	this.doAddSprite = function(name, whitePixelTintRGB){
		HHgSprite.doAddSpriteToHolder(this,name,whitePixelTintRGB);
	}

	this.doAddParagraphText = function(props){

		HHgText.doAddTextParagraphToHolder(this,props);
	}

	this.doAddCanvasText = this.doAddText = function(props){
		HHgText.doAddTextCanvasToHolder(this,props);
	}

	this.doMakeRoundedRectangle = this.doMakeRectangle = function(props){
		HHgShape.addRectangle(that, props);
	}

	this.doMakeEllipse = this.doMakeCircle = function(props){
		HHgShape.addEllipse(that, props);
	}

	this.doMakeTriangle = function(props){
		HHgShape.addTriangle(that, props);
	}

	this.doRemoveShape = function(){
		HHgShape.removeShape(that);
	}

	this.doAddOutline = this.doAddBorder = function(props){
		HHgShape.addBorder(that,props);
	}

	this.doRemoveOutline = this.doRemoveBorder = function(){
		HHgShape.addBorder(that, {borderStyle: "none", borderWidth: 0});
	}

	//======custom CSS==========
	this.doAddCSSClass = this.doAddCSSClass = function(className){
		this.classAddingObject = this.classAddingObject || {};
		this.classAddingObject[className] = className;
		this.changes.classList = true;
		this.doNotifySceneOfUpdates();
	}

	this.doRemoveCSSClass = this.doRemoveCSSClass = function(className){
		this.classRemovingObject = this.classRemovingObject || {};
		this.classRemovingObject[className] = className;
		this.changes.classList = true;
		this.doNotifySceneOfUpdates();
	}

	//============ sound ===============
	this.doAddSound = function(name){

	}
	this.doPlaySound = function(name){

	}
	this.doPauseSound = function(name){

	}
	this.doKillSound = function(name){

	}


}










