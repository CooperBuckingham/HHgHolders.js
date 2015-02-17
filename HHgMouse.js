



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

return;
		holders = findClickedHolder(holders, x, y);
		if(holders){
			that.doSetVars(holders, x, y);
			that.clickedDownOn.doMouseDown();
			return;
		}

		
			
	}

	this.doMouseUp = function (holders, x, y){
		console.log("mouseup");
		that.mouseCircle.doHide();

		return;

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

	this.findClickedHolder = function(holders, x, y){
		var holder, canvas, xy, convertedXY = new HHgVector2(0,0),canvasSize = new HHgVector2(0,0), canvasStyleSize = new HHgVector2(0,0);
		for(var i = 0; i < holders.length; i++){

			holder = holders[i];

			canvas = holder.getCanvas();
			canvasSize.setXY(canvas.width, canvas.height);
			canvasStyleSize.setXY(canvas.clientWidth, canvas.clientHeight);
			convertedXY = getXYPosInDivFromMouse(holder,canvasSize,canvasStyleSize,x,y,convertedXY);
			if( isAlphaPixel(canvas,convertedXY.getX(), convertedXY.getY() ) === false){
				
				return holder;
			}

		}
		
		return undefined;
		
	}

	this.rotateMouse = function(mouseXY, holder){


				var _positionInScreenNet = mouseXY;

			
				_positionInScreenNet = _positionInScreenNet.returnVectorPlusVector(HHgScene.returnHalfSizeVector());
				
				_positionInScreenNet = holder.returnHalfSizeVector().returnVectorSubtractedFromVector(_positionInScreenNet);

				var _positionInParentOriginal = holder.getParent().getPositionInScreenOriginal().returnVectorSubtractedFromVector(mouseXY);
				_positionInParentOriginal = _positionInParentOriginal.returnVectorScaledByInverse(holder.getParent().getScaleNet());
				_positionInParentOriginal = _positionInParentOriginal.returnVectorRotatedAroundVectorAtAngle( holder.getParent().getPositionInScreenNet(), -1 *  holder.getParent().getRotationNet() );
			
				return _positionInParentOriginal;
	}

	return this; //for singleton

}();



function getXYPosInDivFromMouse(holder,canvasSize, canvasStyleSize,xy,y,convertedXY){
	/*
	convertedXY.setXY(xy,y);
	convertedXY = convertedXY.returnVectorPlusVector( holder.returnHalfSizeVector() );
	
	convertedXY = holder.getPositionInScreenOriginal().returnVectorSubtractedFromVector(convertedXY);
	convertedXY.setY(canvasStyleSize.getY() - convertedXY.getY());
	
	convertedXY = convertedXY.returnVectorScaledBy(canvasSize.returnVectorScaledByInverse(canvasStyleSize));
	return convertedXY;
	*/
//above worked for non rotated divs
//getBoundingClientRect();

var imgData = holder.getCanvas().getContext("2d").getImageData(0,0,holder.getCanvas().width, holder.getCanvas().height);
for(var i = 0; i < imgData.data.length; i+=4){
	if(i < imgData.data.length / 4){

	}
	imgData.data[i] = 255;
	imgData.data[i+1] = 0;
	imgData.data[i+2] = 0;
	imgData.data[i+3] = 255;

	if(i < imgData.data.length / 4){
		
	imgData.data[i+1] = 255;
	}
}

holder.getCanvas().getContext("2d").putImageData(imgData,0,0);

return;


	convertedXY.setXY(xy,y);
	console.log("mouse P:" + convertedXY.returnPretty());
	console.log("canvas P: " + holder.getCanvas().getBoundingClientRect().left + " " + holder.getCanvas().getBoundingClientRect().bottom);
	convertedXY = convertedXY.returnVectorPlusVector( holder.returnHalfSizeVector() );
	//convertedXY = rotateMouse(convertedXY, holder);
	
	convertedXY = holder.getPositionInScreenOriginal().returnVectorSubtractedFromVector(convertedXY);
	convertedXY.setY(canvasStyleSize.getY() - convertedXY.getY());
	
	convertedXY = convertedXY.returnVectorScaledBy(canvasSize.returnVectorScaledByInverse(canvasStyleSize));
	
	return convertedXY;
	
	
}

//alpha test for mouse click
function isAlphaPixel(canvas, xy, y){
	return canvas.getContext('2d').getImageData(xy, y, 1, 1).data[3] > .15 ? false : true;
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

