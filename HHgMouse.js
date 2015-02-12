

var doStartHHgMouse = function(){

		HHgScene.doAddMouseDownAndUpListeners();

};


window.HHgMouse = function(){

	var clickedDownOn;
	var lastMousePosX;
	var lastMousePosY;
	var thisMousePosX;
	var thisMousePosY;
	var lastFrameTime;
	var thisFrameTime;

	var that = this;
	

	this.doResetVars = function(){
		clickedDownOn = undefined;
		lastMousePosY = undefined;
		lastMousePosX = undefined;
		thisMousePosY = undefined;
		thisMousePosX = undefined;
		lastFrameTime = undefined;
		thisFrameTime = undefined;
	};

	this.doSetVars = function(holder, x, y){
		clickedDownOn = holder;
		lastMousePosX = lastMousePosX || x;
		lastMousePosY = lastMousePosY || y;
		
		thisMousePosX = x;
		thisMousePosY = y;
		thisFrameTime = +new Date;
		lastFrameTime = lastFrameTime || thisFrameTime;
		
	};

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
		
	};




	this.doMouseUp = function (holders, x, y){
		console.log("mouseup");
		if(clickedDownOn === undefined){
			return;
		}

		for(var i = 0; i < holders.length; i++){
			if(holders[i] === clickedDownOn){
				clickedDownOn.doMouseUp();
				that.doResetVars();
				return;
			}
		}
		
		
		
		
	};

	this.doMouseMove = function (holders, x, y){
		holders[0].doMouseMove();
	};

};