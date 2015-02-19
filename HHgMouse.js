



var HHgMouse = function HHgMouse(){
	if(HHgMouse.singleton){
		return HHgMouse.singleton;
	}
	HHgMouse.singleton = this;

	this.clickedDownOn;
	this.lastMousePosX;
	this.lastMousePosY;
	this.thisMousePosX;
	this.thisMousePosY;
	this.lastFrameTime;
	this.thisFrameTime;
	this.mouseCircle;

	var that = this;
	
	this.doStart = function(){


		that.mouseCircle = new HHgHolder(25,25, 100);
		that.mouseCircle.doMoveToNewParent(HHgGameHolder, new HHgVector2(0,0), false);
		that.mouseCircle.doAddSprite("mouse");
		that.mouseCircle.setVisible(false);
		that.mouseCircle.setMouseable(false);
		


		HHgScene.doAddMouseDownAndUpListeners();

	}

	this.doResetVars = function(){
		that.clickedDownOn = undefined;
		that.lastMousePosY = undefined;
		that.lastMousePosX = undefined;
		that.thisMousePosY = undefined;
		that.thisMousePosX = undefined;
		that.lastFrameTime = undefined;
		that.thisFrameTime = undefined;
	}

	this.doSetVars = function(holder, xy){

		that.clickedDownOn = holder;
		that.lastMousePosX = that.lastMousePosX || xy.getX();
		that.lastMousePosY = that.lastMousePosY || xy.getY();
		
		that.thisMousePosX = xy.getX();
		that.thisMousePosY = xy.getY();
		that.thisFrameTime = window.performance.now();
		that.lastFrameTime = that.lastFrameTime || that.thisFrameTime;
		
	}

	this.doMouseMove = function (xy){
		//more logic here to determine dragging later
		that.mouseCircle.doHide();

		if(!HHgMain.HHgMouse.clickedDown) return;
		that.clickedDownOn.doMouseMove(xy);
	}

	this.doMouseDown = function (holders, xy){
		that.mouseCircle.doShow(xy);
		
		if(!holders || holders.length < 1){
			
			return;
		}

			that.doSetVars(holders[0], xy);
			that.clickedDownOn.doMouseDown();

	}

	this.doMouseUp = function (holders, xy){
		
		that.mouseCircle.doHide();

		if(that.clickedDownOn === undefined){
			return;
		}
		if(holders ){
			for(var i = 0; i < holders.length; i++){
				if(holders[i] === clickedDownOn){
					//do alhpa check here
					that.clickedDownOn.doMouseUp(true);
					that.doResetVars();
					return;
				}
			}
		}

		that.clickedDownOn.doMouseUp(false);
		that.doResetVars();
		
	}



	return this; //for singleton

}();



//alpha test for mouse click





