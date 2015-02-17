



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
		
		console.log("mouse down");
		
		if(!holders || holders.length < 1){
			
			return;
		}

		holders = findClickedHolder(holders, x, y);
		if(holders){
			that.doSetVars(holders, x, y);
			that.clickedDownOn.doMouseDown();
			return;
		}

		console.log("found nothing to cllick on");
			
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
		console.log("no alpha test passed");
		return undefined;
		
	}

	return this; //for singleton

}();

function placeRedSquare(canvas, x,y){

var ctx=canvas.getContext("2d");
var imgData=ctx.createImageData(20,20);
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i+0]=255;
  imgData.data[i+1]=0;
  imgData.data[i+2]=0;
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,x,y);
}

function getXYPosInDivFromMouse(holder,canvasSize, canvasStyleSize,xy,y,convertedXY){
	
	convertedXY.setXY(xy,y);
	convertedXY = convertedXY.returnVectorPlusVector( holder.returnHalfSizeVector() );
	
	convertedXY = holder.getPositionInScreenOriginal().returnVectorSubtractedFromVector(convertedXY);
	convertedXY.setY(canvasStyleSize.getY() - convertedXY.getY());
	
	convertedXY = convertedXY.returnVectorScaledBy(canvasSize.returnVectorScaledByInverse(canvasStyleSize));
	return convertedXY;

/*
	for(var x = 0; x < 300; x++){
		for(var y = 0; y < 300; y++){
			isAlphaPixel(canvas, x, y) ? theStr += "." : theStr += "0";
		}
		theStr += "\n";
	}
	console.log(theStr);
*/
	/*
	convertedXY.setXY(xy,y);
	
	console.log("canvas pos " + holder.getPositionInScreenOriginal().returnPretty());
	//convertedXY = convertedXY.returnVectorPlusVector(HHgScene.returnHalfSizeVector());
	convertedXY = convertedXY.returnVectorPlusVector(holder.returnHalfSizeVector());
	console.log("mouse x, y " + convertedXY.returnPretty());


	convertedXY = (new HHgVector2( canvas.style.left, canvas.style.bottom)).returnVectorSubtractedFromVector(convertedXY);
	
	*/
	
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

