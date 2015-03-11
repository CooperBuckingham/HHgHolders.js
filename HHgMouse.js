



var HHgMouse = function HHgMouse(){
	if(HHgMouse.singleton){
		return HHgMouse.singleton;
	}
	HHgMouse.singleton = this;

	this.clickedDownOn;
	this.draggingOriginalPosXY;
	this.draggingMouseOriginalPosXY;
	this.draggingOffsetXY;

	this.dragging;
	this.lastMousePosXY;
	
	this.thisMousePosXY;
	
	this.lastFrameTime;
	this.thisFrameTime;
	this.mouseCircle;

	var that = this;
	
	this.doStart = function(){


		that.mouseCircle = HHgGetHolder({w:25,h:25,zIndex: 100});
		that.mouseCircle.doMoveToNewParent({parent: HHgGameHolder, position: HHg0Vector, isScreenPos: false});
		that.mouseCircle.doAddSprite("mouse");
		that.mouseCircle.setVisible(false);
		that.mouseCircle.setMouseable(false);
		
		HHgScene.doAddMouseDownAndUpListeners();

	}

	this.doResetVars = function(){
		that.clickedDownOn = undefined;
		that.lastMousePosXY = undefined;
		
		that.thisMousePosXY = undefined;
		
		that.lastFrameTime = undefined;
		that.thisFrameTime = undefined;
		this.dragging = undefined;
		this.draggingOriginalPosXY = undefined;
		this.draggingMouseOriginalPosXY = undefined;
		this.draggingOffsetXY = undefined;


	}

	this.doSetVars = function(holder, xy){

		that.clickedDownOn = holder;
		that.lastMousePosXY = xy;
		
		that.thisMousePosXY = xy;
		that.thisFrameTime = window.performance.now();
		that.lastFrameTime = that.thisFrameTime;

		if(holder.isDraggable){
			that.dragging = holder;
			that.draggingOriginalPosXY = holder.getPositionInScreenOriginal();
			that.draggingMouseOriginalPosXY = xy;
			that.draggingOffsetXY = xy.returnVectorSubtractedFromVector(that.draggingOriginalPosXY);
		}
		
	}

	this.doUpdateVars = function(xy){
		that.lastMousePosXY = that.thisMousePosXY;
		that.thisMousePosXY = xy;
		that.lastFrameTime = that.thisFrameTime;
		that.thisFrameTime = window.performance.now();

	}

	this.doMouseMove = function (xy){
		that.mouseCircle.doHide();


		if(that.dragging){
			that.doUpdateVars(xy);
			that.dragging.doMouseMove();
		}
		
	}

	this.doMouseDown = function (holders, xy){
		that.mouseCircle.doShow(xy);
		
		
		if(!holders || holders.length < 1){
			
			return;
		}

			that.doSetVars(holders[0], xy);
			that.clickedDownOn.doMouseDown();

			if(that.clickedDownOn.isDraggable){
				that.clickedDownOn.doStartMouseMove();
			}

	}
	var isOverClickedDown = false;

	this.doMouseUp = function (holders, xy){
		
		that.mouseCircle.doHide();
		that.doUpdateVars(xy);

		if(that.clickedDownOn === undefined){
			return;
		}

		if(holders ){
			for(var i = 0; i < holders.length; i++){
				if(holders[i] === clickedDownOn){
					
					isOverClickedDown = true;
					break;
				}
			}
		}

		that.clickedDownOn.doMouseUp(isOverClickedDown);

		if(that.dragging){
			that.dragging.doEndMouseMove();
		}

		isOverClickedDown = false;

		that.doResetVars();
		
	}



	return this; //for singleton

}();






