



var HHgMouse = function HHgMouse(){
	if(HHgMouse.singleton){
		return HHgMouse.singleton;
	}
	HHgMouse.singleton = this;

	var clickedDownOn;
	var lastMousePosX;
	var lastMousePosY;
	var thisMousePosX;
	var thisMousePosY;
	var lastFrameTime;
	var thisFrameTime;

	var that = this;
	
	this.doStart = function(){

		HHgScene.doAddMouseDownAndUpListeners();

	}

	this.doResetVars = function(){
		clickedDownOn = undefined;
		lastMousePosY = undefined;
		lastMousePosX = undefined;
		thisMousePosY = undefined;
		thisMousePosX = undefined;
		lastFrameTime = undefined;
		thisFrameTime = undefined;
	}

	this.doSetVars = function(holder, x, y){
		clickedDownOn = holder;
		lastMousePosX = lastMousePosX || x;
		lastMousePosY = lastMousePosY || y;
		
		thisMousePosX = x;
		thisMousePosY = y;
		thisFrameTime = +new Date;
		lastFrameTime = lastFrameTime || thisFrameTime;
		
	}

	this.doMouseMove = function (holders, x, y){
		if(!holders || holders.length < 1){
			return;
		}
		holders[0].doMouseMove();
	}

	this.doMouseDown = function (holders, x, y){
		console.log("mousedown");
		if(!holders || holders.length < 1){
			return;
		}

		that.doSetVars(holder[0], x, y);
		that.clickedDownOn.doMouseDown();
		/*
		HHg.doForEach(holders, function(thing){
			
		});
		*/
	}

	this.doMouseUp = function (holders, x, y){
		console.log("mouseup");

		if(clickedDownOn === undefined){
			return;
		}
		if(!holders || holders.length < 1){
			return;
		}

		for(var i = 0; i < holders.length; i++){
			if(holders[i] === clickedDownOn){
				clickedDownOn.doMouseUp();
				that.doResetVars();
				return;
			}
		}
		
	}

	

	return this; //for singleton



}();