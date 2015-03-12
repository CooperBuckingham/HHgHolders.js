//scene will need pixel multiplier for retina, etc
var HardwareScreen = {
	w : window.innerWidth,
	h : window.innerHeight,
	//w : window.screen.availWidth,
	//h : window.screen.availHeight,
}

var HHgScreen = {
	w : 1920,
	h : 1080,
	maxh : 1440,
	isLandscapeGame : true,
};



function HHgUpdateHardwareScreen(){
	//could update landscape etc here
	//this doesn't get called anywhere currently, but will become part of the dynamic screen/landscape to portrait system.
	HardwareScreen.w = window.innerWidth;
	HardwareScreen.h = window.innerHeight;
	if(HHgScreen.isLandscapeGame === true){
		HHgScreenDiff.setXY(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
	}else{
		//eventually change this to support portrait
		HHgScreenDiff.setXY(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
	}

	HHgScene.getDiv().style.maxHeight = "" + HHgGameHolder.getScaleNet().getX() * HHgScreen.maxh + "px";
		
}



var HHgTrackedTouch;
var HHgScreenSize = new HHgVector2(HHgScreen.w, HHgScreen.h);
var HHgScreenSizeHalf = HHgScreenSize.returnVectorScaledBy(.5);

var testContainer;

var showDebugSquares;

var HHgScene, HHgSVG, HHgSceneDiv, HHgStable, HHgGameHolder, HHgScreenDiff, HHgScreenDiffPlus, HHg0Vector, HHg1Vector, HHg10000Vector, HHgHalfVector, HHgTestDiv, HHgPixelScale;
var HHgTopHolder = document.getElementById("all");

HHgTopHolder.style.width = "" + HardwareScreen.w +"px";
HHgTopHolder.style.height = "" + HardwareScreen.h +"px";

HHgSceneDoStart = function(){
	console.log("HHgScene Start NOW");
	HHg0Vector = new HHgVector2(0,0);
	HHg0Vector.setX = function(){};
	HHg0Vector.setY = function(){};
	HHg0Vector.setXY = function(){};

	HHg1Vector = new HHgVector2(1,1);
	HHg1Vector.setX = function(){};
	HHg1Vector.setY = function(){};
	HHg1Vector.setXY = function(){};

	HHgHalfVector = new HHgVector2(.5,.5);
	HHgHalfVector.setX = function(){};
	HHgHalfVector.setY = function(){};
	HHgHalfVector.setXY = function(){};

	HHg10000Vector = new HHgVector2(10000,10000);
	HHg10000Vector.setX = function(){};
	HHg10000Vector.setY = function(){};
	HHg10000Vector.setXY = function(){};




	HHgScreenDiff = new HHgVector2(0,0);
	HHgScene = new HHgHolder({w:HardwareScreen.w,h:HardwareScreen.h});

	HHgScene.test = "scene";
	doAddFunctionsToScene(HHgScene);
	HHgGameHolder = HHgScene;

	function doAddScene(){
		
		var div = document.createElement("div");
		HHgScene.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		div.style.backgroundColor ="white";
		
		div.id = HHgScene.getHash();
		div.classList.add("scene");
		
		div.style.width = "" + HardwareScreen.w + "px";
		div.style.maxHeight = "" + HardwareScreen.w / HHgScreen.w * HHgScreen.maxh + "px";
		div.style.height = "" + HardwareScreen.w / HHgScreen.w * HHgScreen.maxh + "px";
		
		div.style.left ="" + 0 +"px";
		//div.style.bottom = HardwareScreen.h - (HardwareScreen.w / HHgScreen.w * HHgScreen.maxh) / 2;
		div.style.top = "" + ((HardwareScreen.h - (HardwareScreen.w / HHgScreen.w * HHgScreen.maxh)) / 2) + "px";

		HHgScene._holders[div.id] = HHgScene;

		HHgTopHolder.appendChild(div);

		HHgScene.setPositionInParentTo = function(){};
		HHgScene.setPositionInScreenTo = function(){};
		HHgScene.setPositionInScreenBy = function(){};
		HHgScene.doNotifySceneOfUpdates = function(){};
		HHgScene.doFrameDump = function(){};
		HHgScene.getPositionInScreenNet = function(){
			return HHg0Vector;
		}

		HHgScene.setScene();
		
	}
	doAddScene();
	
	
	HHgSceneDiv = HHgScene.getDiv();
	//this is part of the work to make the screen cap out at 4by3, but it just throws stuff off right now.
	

	HHgScreenDiff = new HHgVector2(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
	
	
	function buildHolderFromScratch(){
		
		HHgGameHolder = new HHgHolder({w:HHgScreen.w, h: HHgScreen.h});;
		var div = document.createElement("div");
		HHgGameHolder.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		div.style.backgroundColor ="white";
		
		div.id = HHgGameHolder.getHash();
		div.classList.add("scene");

		HHgScene._holders[div.id] = HHgGameHolder;
		
		HHgSceneDiv.appendChild(div);
		//from here on out the game holder is now the scene div other holders are added to
		HHgSceneDiv = div;
		HHgSceneDiv.style.border = "2px dashed black";
		
		HHgScene.doAddChild(HHgGameHolder);
		div.classList.add("game-holder");
		div.classList.remove("mouseable");
		div.style.width = "" + HHgScreen.w * (HardwareScreen.w / HHgScreen.w) + "px";
		div.style.height = "" + HHgScreen.h * (HardwareScreen.w / HHgScreen.w) + "px";
		HHgSceneDiv.style.left = "0px";

		HHgScreenDiffPlus = new HHgVector2(0, ((HardwareScreen.w / HHgScreen.w * HHgScreen.maxh) - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w)))/2 );

		HHgSceneDiv.style.top = "" + HHgScreenDiffPlus.getY() + "px";
		


		HHgGameHolder.doNotifySceneOfUpdates = function(){};
		HHgGameHolder.setPositionInParentTo = function(){};
		HHgGameHolder.setPositionInScreenTo = function(){};
		HHgGameHolder.setPositionInScreenBy = function(){};
		HHgGameHolder.doFrameDump = function(){};

		HHgGameHolder.getPositionInScreenNet = function(){
			return HHg0Vector;
		}

		HHgGameHolder.setGameHolder();
	}

	buildHolderFromScratch();

	//do more scene stuff

	
	function sceneTests(){
	
		if(true){

			var theOne = HHgGetHolder({w:100,h:100});
			theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-200,-200), isScreenPos: true});
			theOne.doAddSprite("pool");
			theOne.test = "pool";
			theOne.setMouseable(true);
			theOne.setIsDraggable(true);

			var listOfHolder = [];
			listOfHolder.push(theOne);
			theOne.setPositionInScreenTo(new HHgVector2(0,450));
			theOne.doActionMoveInScreenBy({x:-75,y: -700,time: 30});
			theOne.doActionRotateBy({rotation:360,time: 30});
			theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});


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

			for(var i = 0; i < 25; i++){

				var size = HHg.returnRandomIntLowIncHighExcl(60,220);

				var posx = HHg.returnRandomIntLowIncHighExcl(-1000,1000);
				var posy = HHg.returnRandomIntLowIncHighExcl(-500,500);
				var testBall = HHgGetHolder({w:size,h:size});

				testBall.doMoveToNewParent( {parent: listOfHolder[ HHg.returnRandomIntLowIncHighExcl(0, listOfHolder.length) ] , position: new HHgVector2(posx, posy) });
				randomSprite(testBall);
				testBall.setMouseable(true);
				testBall.setIsDraggable(true);
				testBall.doActionRotateBy({rotation: HHg.returnRandomInt(120,720), time: HHg.returnRandomInt(5,35)});

				listOfHolder.push(testBall)
			}
		}

		if(false){

			var theOne = HHgGetHolder({w:100,h:100});
			theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-200,-200), isScreenPos: true});
			theOne.doAddSprite("pool");
			theOne.test = "pool";
			theOne.setMouseable(true);
			theOne.setIsDraggable(true);

			var theTwo = HHgGetHolder({w:100,h:100});
			theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(-200,-200), isScreenPos: false});
			theTwo.doAddSprite("soccer");
			theTwo.test = "soccer";
			theTwo.setMouseable(true);
			theTwo.setIsDraggable(true);

			theOne.setPositionInScreenTo(new HHgVector2(0,450));
			//theOne.doActionMoveInScreenBy({x:-75,y: -700,time: 30});
			//theOne.doActionRotateBy({rotation:360,time: 30});
			//theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});

		}

	}
	sceneTests();

}



function doAddFunctionsToScene(scene){
	
	scene._holders = {

	}
	scene._dirtyHolders = {

	}

	scene._finalDirtyHolders = {

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

	scene.doUpdateHolders = function(){

		if(scene._finalDirtyHolders.length < 1){
			return;
		}
		var newList = scene._finalDirtyHolders;
		scene._finalDirtyHolders = {};
		
		var holder, div, changes;
		for(var thing in newList){
			holder = newList[thing];

			if(holder.getDiv() === undefined) return;

			div = holder.getDiv();
			changes = holder.changes;
			if(changes.scale === true){
				div.style.width = "" + Math.round(holder.getWidthNet())  + "px";
				div.style.height ="" + Math.round(holder.getHeightNet()) + "px";
			}

			if(changes.rotation === true){
				div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";
			
			}

			if(changes.position === true){
				div.style.left ="" + holder.getPositionInScreenNet().getX() +"px";
				div.style.bottom ="" + holder.getPositionInScreenNet().getY() + "px";

			}

			if(changes.color === true){
				div.style.backgroundColor = holder.getBackgroundColor();
			}

			if(changes.zIndex === true){
				div.style.zIndex = "" + holder.getZIndex();
			}
			
			if(changes.mouseable === true){
				scene.doUpdateHolderMouseable(holder);
			}

			if(changes.visible === true){
				scene.doUpdateHolderVisible(holder);
			}
			
			
			holder.resetChanges();
			
		}
		
	};
	

	scene.doUpdateThisHolder = function(holder){
	
		//creating second pass for final updates here
		//need second dirty list
		scene._finalDirtyHolders[holder.getHash()] = holder;
	}



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
		var relX = 0, relY = 0;
		var mouseXY, touch, touchlist, i;
		

		HHgTopHolder.addEventListener("mousedown", function(e){
			e.preventDefault();
			e.stopPropagation();
			relX =  e.pageX;
			relY =  e.pageY;
			mouseXY = new HHgVector2(relX,relY);

			HHgMain.HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),scene.convertMouseToHolder(mouseXY) );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mouseup", function(e){
			e.preventDefault();
			e.stopPropagation();
			relX = e.pageX;
			relY = e.pageY;
			mouseXY = new HHgVector2(relX,relY);
			HHgMain.HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),scene.convertMouseToHolder(mouseXY)  );
			return false;
		}, false);


		document.addEventListener("mouseout", function(e){
			
			e = e ? e : window.event;
		    var from = e.relatedTarget || e.toElement;
		    if (!from || from.nodeName == "HTML") {

		        relX = e.pageX;
				relY = e.pageY;
				mouseXY = new HHgVector2(relX,relY);
				HHgMain.HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),scene.convertMouseToHolder(mouseXY)  );
		    }
			//e.preventDefault();
			//e.stopPropagation();
			//if(e.relatedTarget !== null) return;
			//if(e.target !== HHgTopHolder) return;

			
			return false;
		}, false);

		HHgTopHolder.addEventListener("mousemove", function(e){
			e.preventDefault();
			e.stopPropagation();
			relX = e.pageX;
			relY = e.pageY;

			mouseXY = new HHgVector2(relX,relY);
			HHgMain.HHgMouse.doMouseMove( scene.convertMouseToHolder(mouseXY)   );
			return false;
		}, false);

		HHgTopHolder.addEventListener("touchstart", function(e){
			e.preventDefault();
			
			touch = e.changedTouches[0];
			console.log("touch start :" + touch.identifier);
			HHgTrackedTouch = touch.identifier;
			relX =  touch.pageX;
			relY =  touch.pageY;
			mouseXY = new HHgVector2(relX,relY);

			HHgMain.HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),scene.convertMouseToHolder(mouseXY) );
			return false;
		}, false);

		HHgTopHolder.addEventListener("touchend", function(e){
			e.preventDefault();
			
			touchList = e.changedTouches;
			
			for(i = 0; i < touchList.length; i++){
				if(touchList[i].identifier === HHgTrackedTouch){
					relX =  touchList[i].pageX;
					relY =  touchList[i].pageY;
					mouseXY = new HHgVector2(relX,relY);
					HHgMain.HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),scene.convertMouseToHolder(mouseXY)  );
					break;
				}
			}

			return false;
		}, false);

		HHgTopHolder.addEventListener("touchmove", function(e){
			//this will become a "can drag" check
			e.preventDefault();
			touchList = e.changedTouches;
			
			for(i = 0; i < touchList; i++){
				if(touchList[i].identifier === HHgTrackedTouch){
					relX =  touchList[i].pageX;
					relY =  touchList[i].pageY;
					mouseXY = new HHgVector2(relX,relY);
					HHgMain.HHgMouse.doMouseMove( scene.convertMouseToHolder(mouseXY)   );
					break;
				}
			}
			
			
			return false;
		}, false);

		HHgTopHolder.addEventListener("touchcancel", function(e){
			e.preventDefault();
			
			touchList = e.changedTouches;
			
			for(i = 0; i < touchList.length; i++){
				if(touchList[i].identifier === HHgTrackedTouch){
					relX =  touchList[i].pageX;
					relY =  touchList[i].pageY;
					mouseXY = new HHgVector2(relX,relY);
					HHgMain.HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),scene.convertMouseToHolder(mouseXY)  );
					break;
				}
			}

			return false;
		}, false);


	};

	scene.convertMouseToHolder = function(xy){

		xy = xy.returnVectorPlusVector(HHgScreenDiff);
		xy.setY(HardwareScreen.h -xy.getY() );

		
		xy = HHgGameHolder.returnHalfSizeVector().returnVectorSubtractedFromVector(xy);
		xy = xy.returnVectorScaledByInverse(HHgGameHolder.getScaleNet());
		return xy;
		


	}


	scene.doesHolderContainPoint = function(holder, xy){
		var canvas = holder.getCanvas(),

		mousePos = xy.returnVectorPlusVector(HHgScreenDiff),

		    holderPosNet = holder.getPositionInScreenNet();

		    holderPosNet = new HHgVector2(holderPosNet.getX(), HardwareScreen.h - (holderPosNet.getY() + holder.getHeightNet()) );
		   
		    var centerPoint = holderPosNet.returnVectorPlusVector(holder.returnHalfSizeVector()),
		     
		    mouseFinalRelative = mousePos.returnVectorRotatedAroundVectorAtAngle(centerPoint, -1 * holder.getRotationNet()),

		    posInCanvas = holderPosNet.returnVectorSubtractedFromVector(mouseFinalRelative),

		    left = 0,
		    right = holder.getWidthNet(),
		    bottom = holder.getHeightNet(),
		    top = 0,

		    posX = posInCanvas.getX(),
		    posY = posInCanvas.getY();

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

		scene.returnHoldersUnderPoint = function(xy){
		
	
		var arr = document.getElementsByClassName("mouseable"),

		
		mArr = [],
		highestZ = -100,
		thisHolder;
		
		for(var i = 0; i < arr.length; i++ ){
			thisHolder = scene.getHolderFromDiv(arr[i]);
			
			if(scene.doesHolderContainPoint(thisHolder,xy)){

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

	function isAlphaPixel(canvas, x, y){
		if(isNaN(x)){
			console.log("FAIL: " + canvas);
			console.log("isAlpha: canvas: " + canvas +" xy: " + x + " y: " + y );
		}
		
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










