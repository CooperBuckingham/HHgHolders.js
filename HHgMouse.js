



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


		that.mouseCircle = new HHgHolder(10,10, 100);
		//that.mouseCircle.doMoveToNewParent();
		//that.mouseCircle.setVisible(false);
		


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

	this.doSetVars = function(holder, x, y){

		that.clickedDownOn = holder;
		that.lastMousePosX = that.lastMousePosX || x;
		that.lastMousePosY = that.lastMousePosY || y;
		
		that.thisMousePosX = x;
		that.thisMousePosY = y;
		that.thisFrameTime = window.performance.now();
		that.lastFrameTime = that.lastFrameTime || that.thisFrameTime;
		
	}

	this.doMouseMove = function (x, y){
		//more logic here to determine dragging later
		that.clickedDownOn.doMouseMove();
	}

	this.doMouseDown = function (holders, x, y){
		that.mouseCircle.doShow(x,y);
		
		console.log("mouse down");
		
		if(!holders || holders.length < 1){
			
			return;
		}

		
		
			that.doSetVars(holders[0], x, y);
			that.clickedDownOn.doMouseDown();

		
			
	}

	this.doMouseUp = function (holders, x, y){
		console.log("mouseup");
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





