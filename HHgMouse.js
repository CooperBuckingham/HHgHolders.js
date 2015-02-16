



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
		that.thisFrameTime = +new Date;
		that.lastFrameTime = that.lastFrameTime || that.thisFrameTime;
		
	}

	this.doMouseMove = function (x, y){
		//more logic here to determine dragging later
		that.clickedDownOn.doMouseMove();
	}

	this.doMouseDown = function (holders, x, y){
		that.mouseCircle.doShow(x,y);
		//mouseclick is 0/0 centric
		console.log("mouse down");
		
		if(!holders || holders.length < 1){
			console.log("no divs");
			return;
		}
		
		var holder, canvas;
		var xy;
		for(var i = 0; i < holders.length; i++){
			holder = holders[i];
			canvas = holder.getCanvas();
			convertedXY = getXYPosInDivFromMouse(canvas,x,y,convertedXY);
			if(isAlphaPixel(canvas,convertedXY.getX(), convertedXY.getY() ) === false){
				that.doSetVars(holder, x, y);
				that.clickedDownOn.doMouseDown();
				return;
			}

		}

	}

	this.doMouseUp = function (holders, x, y){
		console.log("mouseup");
		that.mouseCircle.doHide();

		if(that.clickedDownOn === undefined){
			return;
		}
		if(!holders || holders.length < 1){
			return;
		}

		for(var i = 0; i < holders.length; i++){
			if(holders[i] === clickedDownOn){
				that.clickedDownOn.doMouseUp();
				
				return;
			}
		}
		
		that.doResetVars();
		
	}

	

	return this; //for singleton



}();

function getXYPosInDivFromMouse(canvas,xy,y,convertedXY){
	convertedXY.setXY(xy,y);
	convertedXY.returnVectorPlusVector(HHgScene.returnHalfSizeVector());
	convertedXY = (new HHgVector2(canvas.style.left, canvas.style.bottom)).returnVectorSubtractedFromVector(convertedXY);

	return convertedXY;
}

//alpha test for mouse click
function isAlphaPixel(canvas, xy, y){
	return canvas.getContext('2d').getImageData(x, y, 1, 1).data[3] > .15 ? false : true;
}


function getpixelcolour(canvas, x, y) {
  var cx = canvas.getContext('2d');
  var pixel = cx.getImageData(x, y, 1, 1);
  return {
    r: pixel.data[0],
    g: pixel.data[1],
    b: pixel.data[2],
    a: pixel.data[3]
  };
}

