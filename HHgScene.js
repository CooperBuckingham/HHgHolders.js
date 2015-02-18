//scene will need pixel multiplier for retina, etc
var HardwareScreen = {
	w : 800,
	h : 600,
}

var HHgScreen = {
	w : 1920,
	h : 1080,
};

var HHgScreenSize = new HHgVector2(HHgScreen.w, HHgScreen.h);
var HHgScreenSizeHalf = HHgScreenSize.returnVectorScaledBy(.5);

var testContainer;

var showDebugSquares;

var HHgScene, HHgSVG, HHgSceneDiv, HHgStable, HHgGameHolder, HHgScreenDiff, HHg0Vector;
var HHgTopHolder = document.getElementById("all");

HHgTopHolder.style.width = "" + HardwareScreen.w +"px";
HHgTopHolder.style.height = "" + HardwareScreen.h +"px";

function doStartHHgScene(){
	console.log("scene setup start");
	HHg0Vector = new HHgVector2(0,0);
	HHg0Vector.setX = function(){};;
	HHg0Vector.setY = function(){};;
	HHg0Vector.setXY = function(){};;

	//HHgTestScene = new HHgHolder(HardwareScreen.w, HardwareScreen.h);
HHgScreenDiff = new HHgVector2(0,0);
	HHgScene = new HHgHolder(HardwareScreen.w,HardwareScreen.h);
	
	HHgScene.test = "scene";

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);
	HHgGameHolder = HHgScene;
	HHgScene.doAddScene();
	
	HHgScene.setMouseable(false);
	HHgScene.setPositionInParentTo = function(){};
	HHgScene.setPositionInScreenTo = function(){};
	HHgScene.setPositionInScreenBy = function(){};

	HHgSceneDiv = HHgScene.getDiv();

	//tempHHgGameHolder.doMoveToNewParent(HHgScene, new HHgVector2(0,0));

	HHgScreenDiff = new HHgVector2(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
	

	function buildHolderFromScratch(){
		HHgGameHolder = new HHgHolder(HHgScreen.w, HHgScreen.h);;
		var div = document.createElement("div");
		HHgGameHolder.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		div.style.backgroundColor ="white";
		
		div.id = HHgGameHolder.getHash();
		div.classList.add("scene");

		
		HHgScene._holders[div.id] = HHgGameHolder;
		HHgSceneDiv.appendChild(div);
		HHgSceneDiv = div;
		HHgSceneDiv.style.border = "2px solid black";
		HHgSceneDiv.style.left = "0px";
		HHgSceneDiv.style.top = "" + HHgScreenDiff.getY() + "px";
		
		HHgScene.doAddChild(HHgGameHolder);
		div.classList.add("game-holder");
		div.classList.remove("mouseable");
		

		HHgGameHolder.doNotifySceneOfUpdates = function(){};
		HHgGameHolder.setPositionInParentTo = function(){};
		HHgGameHolder.setPositionInScreenTo = function(){};
		HHgGameHolder.setPositionInScreenBy = function(){};
		HHgGameHolder.doFrameDump = function(){};

	HHgGameHolder.getPositionInScreenNet = function(){
		console.log("called????");
		return HHg0Vector;
		//return HHg0Vector.returnVectorPlusVector(HHgScreenDiff);
	}


		HHgGameHolder.setGameHolder();
	}

	buildHolderFromScratch();
	

	

	

	
	
	
	
	
	
	


	

//----- rotate test
if(true){
var theOne = new HHgHolder(100,100);
	theOne.doMoveToNewParent(HHgGameHolder,new HHgVector2(0,0), true);
	theOne.doAddSprite("pool");
	theOne.test = "pool";
	theOne.setMouseable(true);

	//theOne.setScaleOriginalTo(2,2);

var	theTwo = new HHgHolder(100,100);
	
	theTwo.doMoveToNewParent(theOne, new HHgVector2(100,100), true);
	theTwo.doAddSprite("soccer");
	theTwo.test = "soccer";
	theTwo.setMouseable(false);

var	theThree = new HHgHolder(100,100);
	
	theThree.doMoveToNewParent(theOne, new HHgVector2(-200,-200), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";
	theThree.setMouseable(true);


	setTimeout(function(){
	
	//theTwo.setRotationOriginalTo(45);
	//theOne.setPositionInScreenTo(0,-200);
	//theOne.setScaleOriginalTo(2,2);
	
	


}, 5000);


}


if(false){

var theOne = new HHgHolder(100,100);
	theOne.doMoveToNewParent(HHgGameHolder,new HHgVector2(-200,-200), true);
	theOne.doAddSprite("pool");
	theOne.test = "pool";


var theThree = new HHgHolder(540,3);
	theThree.doMoveToNewParent(HHgGameHolder,new HHgVector2(0,0), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";

var theThree = new HHgHolder(3,540);
	theThree.doMoveToNewParent(HHgGameHolder,new HHgVector2(0,0), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";

	
var theThree = new HHgHolder(540,3);
	theThree.doMoveToNewParent(HHgGameHolder,new HHgVector2(0,100), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";


var theTwo;
setTimeout(function(){
	theTwo = new HHgHolder(100,100);
	
	theTwo.doMoveToNewParent(theOne, new HHgVector2(0,0), true);
	theTwo.doAddSprite("pool");
	theTwo.test = "soccer";

	
	


}, 1000);

setTimeout(function(){
	theOne.setPositionInScreenTo(new HHgVector2(0,450));
	theOne.doActionFollowQuad(new HHgVector2(75,120), new HHgVector2(-100,-450));
	//theOne.setRotationOriginalBy(60);
	theOne.doActionRotate(60, 10);
	


}, 4000);

setTimeout(function(){
	

	


}, 8000);

}

if(false){

	var theOne = new HHgHolder(100,100);
	theOne.doMoveToNewParent(HHgGameHolder,new HHgVector2(-200,-200), true);
	theOne.doAddSprite("pool");
	theOne.test = "pool";


	var listOfHolder = [];
	listOfHolder.push(theOne);

	theOne.setPositionInScreenTo(new HHgVector2(0,450));
	//theOne.doActionFollowQuad(new HHgVector2(75,120), new HHgVector2(-100,-450));
	theOne.doActionMoveInScreen(-75, -700, 10, true);


var randomSprite = function(holder){
	
		var int1 = window.HHg.returnRandomIntLowIncHighExcl(0,3);
		var name = "orange";
		if(int1 === 0){
			name = "soccer";
		}else if(int1 === 2){
			name = "pool";
		}

		holder.doAddSprite(name);
	}



for(var i = 0; i < 50; i++){

	var size = HHg.returnRandomIntLowIncHighExcl(25,200);
	
	var posx = HHg.returnRandomIntLowIncHighExcl(-1000,1000);
	var posy = HHg.returnRandomIntLowIncHighExcl(-500,500);
	var testBall = new HHgHolder(size,size);

	testBall.doMoveToNewParent( listOfHolder[ HHg.returnRandomIntLowIncHighExcl(0, listOfHolder.length) ] , new HHgVector2(posx, posy) );
	randomSprite(testBall);
	testBall.doActionRotate(HHg.returnRandomInt(120,720), HHg.returnRandomInt(5,35));

	listOfHolder.push(testBall)
}
}
//end rotate test


//theOne.doActionMoveInScreen(100,-200,10,true);
//theOne.doActionMoveInScreen(-100,0,5,true);

//theOne.doActionMoveInScreen(theTwo.getPositionInScreenOriginal(),5,false);
//theOne.doActionMoveInScreen(50,200,5,true);

//theOne.doActionFollowQuad(new HHgVector2(100, 0), theTwo.getPositionInScreenOriginal(), 20);

//theOne.setRotationOriginalTo(22);

}

function doAddFunctionsToScene(scene){
	
	scene._holders = {

	}
	scene._dirtyHolders = {

	}

	//==== specific 1 off updates ====//
	scene.doAddToDirtyList = function(holder){
		scene._dirtyHolders[holder.getHash()] = holder;
	}

	scene.doUpdateHolderMouseable = function(holder){
		holder.getMouseable() ? holder.getDiv().classList.add("mouseable") : holder.getDiv().classList.remove("mouseable");
		
	}
	scene.doUpdateHolderVisible = function(holder){
		
		if(holder.getVisible()){
			holder.getDiv().style.display = "inline-block";
		}else{
			holder.getDiv().style.display = "none";
		}
		
	}

	scene.doEndOfFrame = function(){
		if(scene._dirtyHolders.length < 1){
			return;
		}
		var newList = scene._dirtyHolders;
		scene._dirtyHolders = {};
		
		for(var thing in newList){
			newList[thing].doFrameDump();
		}
		newList = {};
		
	}
	

	scene.doUpdateThisHolder = function(holder){
		if(holder.getDiv() === undefined) return;



		var div = holder.getDiv();
		div.style.backgroundColor = holder.getBackgroundColor();
		div.style.width = "" + holder.getWidthNet() + "px";
		div.style.height ="" + holder.getHeightNet() + "px";
		
			var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreenNet(), holder);
			div.style.left ="" + centricConversion.getX() +"px";
			div.style.bottom ="" + centricConversion.getY() + "px";

		

		div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";
		
		div.style.zIndex = "" + holder.getZIndex();
		scene.doUpdateHolderMouseable(holder);
		scene.doUpdateHolderVisible(holder);

		//this is hold over form the experiment with actually scaling divs
		//div.style.transform="scale(" + holder.getScaleNet().getX()+","+ holder.getScaleNet().getY() + ")";


	}

	scene.doAnyScreenConversion = function(xyPos, holder){
		
		return xyPos;
		
	};


	


	scene.doAddScene = function(){
		if(scene.getDiv()){
			scene.doUpdateThisHolder(scene);
			return;
		}
		
		var div = document.createElement("div");
		scene.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		div.style.backgroundColor ="blue";
		
		div.id = scene.getHash();
		div.classList.add("scene");
		
		scene.doUpdateThisHolder(scene);

		
		scene._holders[div.id] = scene;

		HHgTopHolder.appendChild(div);
		
	};

	scene.doAddThisHolder = function(holder){
		if(holder.getDiv()){
			scene.doUpdateThisHolder(holder);
			return;
		}
		
		var div = document.createElement("div");
		holder.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		//div.style.backgroundColor =;
		//div.style.border = "2px solid black";
		div.id = holder.getHash();

		scene.doUpdateThisHolder(holder);
		scene._holders[div.id] = holder;

		HHgSceneDiv.appendChild(div);
	};
	



	
	scene.doAddMouseDownAndUpListeners = function(){
		var wOffset = 0;
		var hOffset = 0;

		HHgTopHolder.addEventListener("mousedown", function(e){
			var relX =  e.pageX;
			var relY =  e.pageY;

			HHgMain.HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(relX , relY),relX - HardwareScreen.w / 2, HardwareScreen.h - (relY - HardwareScreen.h / 2)  );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mouseup", function(e){
			var relX = e.pageX;
			var relY = e.pageY;
			HHgMain.HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( relX, relY),relX - HardwareScreen.w / 2,HardwareScreen.h - (relY - HardwareScreen.h / 2)   );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mousemove", function(e){
			//this will become a "can drag" check
			if(!HHgMain.HHgMouse.clickedDown) return;

			var relX = e.pageX;
			var relY = e.pageY;
			HHgMain.HHgMouse.doMouseMove( relX - HardwareScreen.w / 2, HardwareScreen.h - (relY - HardwareScreen.h / 2)    );
			return false;
		}, false);


	};

	scene.doesHolderContainPoint = function(holder, x, y){
			var canvas = holder.getCanvas();
		   
		    var mousePos = new HHgVector2(x,y);
		    //mousePos = mousePos.returnVectorPlusVector(screenOffset);
		    console.log("MOUSE POS: " + x + " " + y);

		   
		    var holderPosNet = holder.getPositionInScreenNet();
		    
		    holderPosNet = new HHgVector2(holderPosNet.getX(), HardwareScreen.h - (holderPosNet.getY() + holder.getHeightNet()) );
		   var centerPoint = holderPosNet.returnVectorPlusVector(holder.returnHalfSizeVector());
		   console.log("CENTER PT: " + centerPoint.returnPretty());
		   var mouseFinalRelative = mousePos.returnVectorRotatedAroundVectorAtAngle(centerPoint, -1 * holder.getRotationNet());

		   var posInCanvas = holderPosNet.returnVectorSubtractedFromVector(mouseFinalRelative);
		   

		   var left = 0;
		   var right = holder.getWidthNet();
		   var bottom = holder.getHeightNet();
		   var top = 0;

		   var posX = posInCanvas.getX();
		   var posY = posInCanvas.getY();

		   if(posX < left) return false;

		   if(posX > right) return false;

		   if(posY < top) return false;

		   if(posY > bottom) return false;

		   //now adjust for scaled canvas
		   var canvasRatio = new HHgVector2(canvas.width, canvas.height);
			canvasRatio = canvasRatio.returnVectorScaledByInverse((new HHgVector2(canvas.clientWidth, canvas.clientHeight)));
			posInCanvas = posInCanvas.returnVectorScaledBy(canvasRatio);

		   if( isAlphaPixel(canvas, posInCanvas.getX(), posInCanvas.getY()) ) return false;

			return true;
	};

	scene.returnHoldersUnderPoint = function(xy, y){
		//first item in array is highest z, but after that is random
		if(xy instanceof HHgVector2 === true ){
			y = xy.getY();
			var x = xy.getX();
		}else{
			var x = xy;
		}
		var arr = document.getElementsByClassName("mouseable");

		
		var mArr = [];
		var highestZ = -100;
		var thisHolder;
		
		for(var i = 0; i < arr.length; i++ ){
			thisHolder = scene.getHolderFromDiv(arr[i]);
			
			if(scene.doesHolderContainPoint(thisHolder,x,y)){


				if(mArr.length < 1){
					mArr.push(thisHolder);
					continue;
				}

				//this just ensures that index 0 is top clicked, then doens't care about order of the rest
				//we only pass all holders on in case there's some need to drag ALL things under the mouse
				for(var j = 0; j < mArr.length; j++){
					if(thisHolder.getZIndex() >= mArr[j].getZIndex()){
						mArr.unshift(thisHolder);
						break;
					}

				}
				
			}

		}

		return mArr;

	};

	scene.getHolderFromDiv = function (div){
		return scene._holders[div.id];
	};

	scene.getCanvasFromDiv = function (div){
		return scene._holders[div.id].getCanvas();
	}

	scene.setBackgroundImageForHolder = function(holder, fileName){
		//holder.getDiv().style.backgroundImage = "url(" + fileName +")";
		var img = new Image();
		img.src = fileName;
		holder.getDiv().appendChild(img);
	}

	scene.setCanvasImageForHolder = function(holder, fileName){
		var canvas = document.createElement('canvas');
		canvas.classList.add("canvasAsSprite");
		var ctx = canvas.getContext('2d');
		canvas.classList.add(holder.getHash());
		var div = holder.getDiv();
        canvas.width  = 2 * holder.getWidthNet();
        canvas.height = 2 * holder.getHeightNet();
        
        if(true){
        	//canvas.style.border   = "2px solid white";
        }
        holder.setCanvas(canvas);
        

        /*
        var grd=ctx.createRadialGradient(75,50,5,90,60,100);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"white");

		ctx.fillStyle=grd;
		ctx.fillRect(0,0,300,300);
		*/

		var img = new Image();

		img.crossOrigin = "Anonymous";
		img.src = fileName;
		
		div.appendChild(canvas);

      img.onload = function() {
        ctx.drawImage(img,0,0, canvas.width, canvas.height);
      };
	

	}

	scene.doInitSVG = function(){
		HHgSVG = document.createElement('svg');
		HHgSVG.id = "svg";
		HHgSVG.width = HHgScreen.w;
		HHgSVG.height = HHgScreen.h;
		HHgSceneDiv.appendChild(HHgSVG);
	}

function placeRedSquare(canvas, x,y){

var ctx=canvas.getContext("2d");
var imgData=ctx.createImageData(10,10);
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i+0]=0;
  imgData.data[i+1]=255;
  imgData.data[i+2]=0;
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,x,y);
}

function paintYellow(canvas, x, y){
	var imgData = canvas.getContext("2d").getImageData(0,0,canvas.width, canvas.height);
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

canvas.getContext("2d").putImageData(imgData,0,0);
}

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

	
};

//random code findings
//draw image to canvas, maybe good for per pixel mouse click checking
/*
var canvas = document.createElement("canvas");
canvas.width = yourImageElement.width;
canvas.height = yourImageElement.height;
canvas.getContext('2d').drawImage(yourImageElement, 0, 0);
*/
//and then get the pixel of that image:
//canvasElement.getContext('2d').getImageData(x, y, 1, 1).data







	
	

