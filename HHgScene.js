//scene will need pixel multiplier for retina, etc



var HHgTrackedTouch,
		HHgScreenSize = new HHgVector2(HHgScreen.w, HHgScreen.h),
	  HHgScreenSizeHalf = HHgScreenSize.returnVectorScaledBy(.5),
	  testContainer, showDebugSquares;

var HHgScene, HHgSceneDiv, HHgGameHolder, HHgScreenDiff, HHgScreenDiffPlus, HHg0Vector, HHg1Vector, HHg10000Vector, HHgHalfVector, HHgTestDiv, HHgPixelScale;
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

		div.style.top = "" + ((HardwareScreen.h - (HardwareScreen.w / HHgScreen.w * HHgScreen.maxh)) / 2) + "px";

		HHgScene._holders[div.id] = HHgScene;

		HHgTopHolder.appendChild(div);

		HHgScene.setPositionInParentTo = function(){};
		HHgScene.setPositionInScreenTo = function(){};
		HHgScene.setPositionInScreenBy = function(){};
		HHgScene.doNotifySceneOfUpdates = function(){};
		HHgScene.doFrameDump = function(){};
		HHgGameHolder.killHolder = function(){};
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
		HHgGameHolder.killHolder = function(){};

		HHgGameHolder.getPositionInScreenNet = function(){
			return HHg0Vector;
		}

		HHgGameHolder.setGameHolder();
		HHgPixelScale = HHgGameHolder.getScaleNetForChildScale().getX();
	}

	buildHolderFromScratch();

	//ALL CUSTOM GAME CODE START IN THIS FUNCTION:
	HHgGame.doStart();


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
		var transformString = "";

		var holder, div, changes;
		for(var thing in newList){
			holder = newList[thing];

			if(holder.getDiv() === undefined) return;

			div = holder.getDiv();
			changes = holder.changes;

			if(changes.backgroundColor === true){
				div.style.backgroundColor = holder.getBackgroundColor().returnString();

			}
			if(changes.tint === true){
				tintCanvasByFill( holder.getCanvas(), holder.getTintRGBA().returnString() );


			}

			if(HHgTransformsOnly && holder.firstUpdate === true){
				if(changes.scale === true || changes.rotation === true || changes.position === true ){

					transformString = "scale(" + (holder.getWidthNet() /  parseFloat(div.style.width) ) + "," + (holder.getHeightNet() / parseFloat(div.style.height) ) + ") ";
					transformString = transformString + "rotate(" + holder.getRotationNet() +"deg" +") ";

					/*
					var testTranslate = holder.getPositionInScreenNet();
					testTranslate = testTranslate.returnVectorSubtractedFromVector( new HHgVector2(parseFloat(div.style.left), parseFloat(div.style.bottom)) );
					testTranslate.timesEquals(holder.getScaleNetForChildScale());
					transformString = transformString + "translate(" + testTranslate.getX() + "px," + testTranslate.getY() + "px)"
					*/

					//testTranslate.minusEquals(holder.returnHalfSizeVector());
				/*
				if(holder.paragraph !== undefined){
					holder.paragraph.style.fontSize = "" + holder.fontSizeScaled + "px";
				}
				*/

				var adjustedPosition = holder.getPositionInScreenNet();
				//var holderHalfSizeUnscaled = holder.getSizeOriginal().returnVectorScaledBy(.5);
				//adjustedPosition.minusEquals(holderHalfSizeUnscaled);
				div.style.left ="" + adjustedPosition.getX() +"px";
				div.style.bottom ="" + adjustedPosition.getY() + "px";

					if(holder.borderWidthOriginal > 0){
						//div.style.borderWidth = "" + holder.borderWidthScaled + "px";
					}
				}

			}else{
				holder.firstUpdate = true;

				if(changes.scale === true ){

					div.style.width = "" + holder.getWidthNet() + "px";
					div.style.height = "" + holder.getHeightNet() + "px";

					if(holder.paragraph !== undefined){
						holder.paragraph.style.fontSize = "" + holder.fontSizeScaled + "px";
					}

					if(holder.borderWidthOriginal > 0){
						div.style.borderWidth = "" + holder.borderWidthScaled + "px";
					}

				}

			if(changes.position === true){

				var adjustedPosition = holder.getPositionInScreenNet();
				//var testAdjust = holder.returnHalfSizeVector();
				//adjustedPosition.minusEquals(testAdjust);
				div.style.left ="" + adjustedPosition.getX() +"px";
				div.style.bottom ="" + adjustedPosition.getY() + "px";

			}

			if(changes.rotation === true){
				//div.style.transform="rotate(" + HHg.roundNumToPlaces(holder.getRotationNet(), 2) +"deg" +")";
				transformString = transformString + "rotate(" + holder.getRotationNet() +"deg" +")";
			}

		}

			if(transformString){
				div.style.transform = transformString;
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

			if(changes.classList === true){
				for(var key in holder.classAddingObject){
					holder.getDiv().classList.add(holder.classAddingObject[key]);
				}
				holder.classAddingObject = undefined;

				for(var key in holder.classRemovingObject){
					holder.getDiv().classList.remove(holder.classRemovingObject[key]);
				}
				holder.classRemovingObject = undefined;

			}


			holder.resetChanges();

		}

	};


	scene.addToFinalPassList = function(holder){

		//creating second pass for final updates here
		//need second dirty list
		scene._finalDirtyHolders[holder.getHash()] = holder;
	}

	scene.doAddThisHolder = function(holder){
		if(holder.getDiv()){
			scene.addToFinalPassList(holder);
			return;
		}

		var div = document.createElement("div");
		holder.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";

		if(HHgTestBoxes === true){
			div.style.border = "2px solid black";
		}

		div.id = holder.getHash();

		scene.addToFinalPassList(holder);
		scene._holders[div.id] = holder;

		HHgSceneDiv.appendChild(div);

		//experiment
		//div.style.width = "" + Math.round(holder.getWidthNet())  + "px";
		//div.style.height ="" + Math.round(holder.getHeightNet()) + "px";

		//div.style.left ="" + HHg.roundNumToPlaces(holder.getPositionInScreenNet().getX(),2) +"px";
		//div.style.bottom ="" + HHg.roundNumToPlaces(holder.getPositionInScreenNet().getY(),2) + "px";


	};

	//====================================================

	scene.doAddTextDiv = function(owner, props){

		var parent = document.createElement("div");
		owner.getDiv().appendChild(parent);
		var child = document.createElement("pre");
		parent.appendChild(child);
		var parentScale = owner.getScaleNetForChildScale().getX();
		var tempFontSize = props.fontSize * parentScale;
		child.style.color = props.color ? props.color.returnString() : "black";
		child.style.fontSize = "" + tempFontSize + "px";
		child.style.fontStyle = props.fontStyle
		child.classList.add(props.fontStyle);
		child.innerHTML = props.text;

		child.style.textAlign = props.hAlign;
		child.style.verticalAlign = props.vAlign;

		//parent.style.border = "4px solid green";

		parent.classList.add("textDiv");

		parent.id = owner.getHash() + "t";
		child.id = owner.getHash() + "p";

		if(props.shadow !== undefined){

			props.shadow.x *= parentScale;
			props.shadow.y *= parentScale;
			props.shadow.blur *= parentScale;

			child.style.textShadow = "" + props.shadow.x + "px " + props.shadow.y + "px " + props.shadow.blur + "px " + props.shadow.color.returnString();
		}

		owner.textDiv = parent;
		owner.paragraph = child;
		owner.fontSizeOriginal = props.fontSize;

	};

	scene.doAddTextToCanvas = function(owner, props){

		var ctx = owner.getCanvas().getContext("2d"), x, y, textWidth, textHeight, divWidth, divHeight;
		console.log("debug");
		var parentScale = owner.getScaleNetForChildScale().getX();
		textHeight = props.fontSize * parentScale;
		ctx.font = "" + textHeight + "px " + props.font ;
		textWidth = ctx.measureText(props.text).width * parentScale;

		divWidth = owner.getWidthNet() * HHgHoldCanvasUpresScaleBy;
		divHeight = owner.getHeightNet() * HHgHoldCanvasUpresScaleBy;


		if(props.vAlign === "top"){
			y = 0;
			ctx.textBaseline = "top";
		}else if(props.vAlign === "middle"){
			y = (divHeight - textHeight) / 2;
			ctx.textBaseline = "middle";
		}else{
			y = divHeight;
			ctx.textBaseline = "bottom";
		}

		if(props.hAlign === "left"){
			x = 0;
			ctx.textAlign = "left";
		}else if(props.hAlign === "center"){
			x = (divWidth - textWidth) / 2;
			ctx.textAlign = "center";
		}else{
			x = divWidth;

			ctx.textAlign = "right";
		}

		if(props.shadow !== undefined){
			ctx.shadowOffsetX = props.shadow.x * parentScale;
			ctx.shadowOffsetY = props.shadow.y  * parentScale;
			ctx.shadowColor = props.shadow.color;
			ctx.shadowBlur = props.shadow.blur  * parentScale;
		}

		if(props.stroke !== undefined){
			ctx.strokeStyle = props.stroke.color;
  			ctx.lineWidth = props.stroke.width;
  			ctx.strokeText(props.text, x, y);
		}

		//ctx.globalCompositeOperation = "destination-atop";
		ctx.fillText(props.text,x,y);


	}


	//========================================================

	scene.doAddMouseDownAndUpListeners = function(){
		var wOffset = 0;
		var hOffset = 0;
		var relX = 0, relY = 0;
		var mouseXY, touch, touchlist, i, test;


		HHgTopHolder.addEventListener("mousedown", function(e){
			e.preventDefault();
			e.stopPropagation();
			relX =  e.pageX;
			relY =  e.pageY;
			mouseXY = new HHgVector2(relX,relY);
			mouseXY = scene.convertMouseToHolder(mouseXY);
			HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),mouseXY );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mouseup", function(e){
			e.preventDefault();
			e.stopPropagation();
			relX = e.pageX;
			relY = e.pageY;
			mouseXY = new HHgVector2(relX,relY);
			mouseXY = scene.convertMouseToHolder(mouseXY);
			HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
			return false;
		}, false);


		document.addEventListener("mouseout", function(e){

			e = e ? e : window.event;
		    test = e.relatedTarget || e.toElement;
		    if (!test || test.nodeName == "HTML") {
		        relX = e.pageX;
				relY = e.pageY;
				mouseXY = new HHgVector2(relX,relY);
				mouseXY = scene.convertMouseToHolder(mouseXY);
				HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),mouseXY );
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
			mouseXY = scene.convertMouseToHolder(mouseXY);
			HHgMouse.doMouseMove( mouseXY  );
			return false;
		}, false);

		HHgTopHolder.addEventListener("touchstart", function(e){
			e.preventDefault();

			touch = e.changedTouches[0];

			HHgTrackedTouch = touch.identifier;
			relX =  touch.pageX;
			relY =  touch.pageY;
			mouseXY = new HHgVector2(relX,relY);
			mouseXY = scene.convertMouseToHolder(mouseXY);
			HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),mouseXY );
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
					mouseXY = scene.convertMouseToHolder(mouseXY);
					HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
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
					mouseXY = scene.convertMouseToHolder(mouseXY);
					HHgMouse.doMouseMove( mouseXY   );
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
					mouseXY = scene.convertMouseToHolder(mouseXY);
					HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
					break;
				}
			}

			return false;
		}, false);


	};

	scene.convertMouseToHolder = function(xy){

		xy = xy.returnVectorPlusVector(HHgScreenDiff);
		xy.setY(HardwareScreen.h -xy.getY() );

		//experiment
		xy = HHgGameHolder.returnHalfSizeVector().returnVectorSubtractedFromVector(xy);
		xy = xy.returnVectorScaledByInverse(HHgGameHolder.getScaleNetForChildScale());
		return xy;



	}


	scene.doesHolderContainPoint = function(holder, xy){
				var canvas = holder.getCanvas();

		//holders new bounds are
		//position
				var holderOriginalSize = holder.getSizeOriginal();
		    var holderOriginalScale = holder.getScaleOriginal();
		    var holderFinalSize = holderOriginalSize.returnVectorScaledBy(holderOriginalScale);
		    var holderHalfSize = holderFinalSize.returnVectorScaledBy(.5);

				var mousePos = xy.returnCopy();
				console.log("MOUSE: " + mousePos.pretty());

		    var holderCenter = holder.getPositionInScreenOriginal();
		    console.log("CENTER: " + holderCenter.pretty());

		    var mouseFinalRelative = mousePos.returnVectorRotatedAroundVectorAtAngle(holderCenter, -1 * holder.getRotationNet());

		    var posInCanvas = holderCenter.returnVectorSubtractedFromVector(mouseFinalRelative);
		    //var posInCanvasScaled = posInCanvas.returnVectorScaledBy(holderOriginalScale);


//debugger;
		    posInCanvas.plusEquals(holderHalfSize);

		    console.log("HOLDER H: " + holderHalfSize.pretty());
				console.log("CANVAS: " + posInCanvas.pretty());

		    var left = 0;
		    var right = holderFinalSize.getX();

		    var top = 0;
		    var bottom = holderFinalSize.getY();

		    var posX = posInCanvas.getX();
		    var posY = posInCanvas.getY();

		    if(posX < left) return false;

		    if(posX > right) return false;

		    if(posY < top) return false;

		    if(posY > bottom) return false;

		    console.log("inside canvas");
		   //now adjust for scaled canvas
		   if(canvas !== undefined){

					var canvasRatio = new HHgVector2(canvas.width, canvas.height);
					canvasRatio.timesEquals(holder.getScaleNetForChildScale());
		   		canvasRatio = canvasRatio.returnVectorScaledByInverse((new HHgVector2(canvas.clientWidth, canvas.clientHeight) ));

		   		posInCanvas.timesEquals(canvasRatio);


		   		//posInCanvas = posInCanvas.returnVectorScaledBy(canvasRatio).returnVectorScaledBy(holder.getScaleNetForChildScale());


		   		if( isAlphaPixel(canvas, posInCanvas.getX(), posInCanvas.getY() ) ) return false;

				}
				console.log("IS NOT ALPHA");

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

	scene.setCanvasImageForHolder = function(holder, fileName, whitePixelTintColor){
		var canvas = document.createElement('canvas');
		canvas.classList.add("canvasAsSprite");
		var ctx = canvas.getContext('2d');
		canvas.classList.add(holder.getHash());
		var div = holder.getDiv();
		canvas.width  = 2 * holder.getWidthNet();
		canvas.height = 2 * holder.getHeightNet();
		var color = whitePixelTintColor;

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
			if(color){
				tintCanvasByColorize(canvas, color);

			}

		};



	}

	var ctx, imgData;
	scene.tintCanvasByFill = function(canvas, color){
		ctx = canvas.getContext("2d");

		ctx.fillStyle = color.returnString();
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.globalCompositeOperation = "destination-atop";

	};

	function tintCanvasByColorize(canvas, color){
		ctx = canvas.getContext("2d");
		imgData = ctx.getImageData(0,0,canvas.width, canvas.height);

			for(var i = 0; i < imgData.data.length; i+=4){

				if(imgData.data[i+4] === 0) continue;

					imgData.data[i] = imgData.data[i] / 255 * color.R;
					imgData.data[i+1] = imgData.data[i+1] / 255 * color.G;
					imgData.data[i+2] = imgData.data[i+2] / 255 * color.B;
					//imgData.data[i+3] === 255;
			}

		ctx.putImageData(imgData,0,0);
	}

	function tintCanvasByOverlay(canvas, color){

		var ctx = canvas.getContext("2d");
		var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);

			function overlay(a,b){
				a /=255; b /= 255;
				if(a < .5) return 255*2*a*b;

				return 255*(1 - 2*(1-a)*(1-b));
			}

			console.log(color);

			for(var i = 0; i < imgData.data.length; i+=4){

				if(imgData.data[i+4] === 0) continue;

					imgData.data[i] = overlay(imgData.data[i], color.R);
					imgData.data[i+1] = overlay(imgData.data[i+1], color.G);
					imgData.data[i+2] = overlay(imgData.data[i+2], color.B);
					//imgData.data[i+3] === 255;
			}

			ctx.putImageData(imgData,0,0);
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

	scene.maskShapeTriangle = function(props){

		if(props.borderRadius === undefined) return;

		var holder = props.holder;
		var str = "",i,br = props.borderRadius;
		if(br !== undefined){
			for( i = 0; i < br.length; i++){
				str += br[i];
			}
		}

		holder.getDiv().style.borderRadius = str;

	}
	scene.maskShapeEllipse = function(props){
		if(props.borderRadius === undefined) return;

		var holder = props.holder;
		var str = "",i,br = props.borderRadius;
		if(br !== undefined){
			for( i = 0; i < br.length; i++){
				str += br[i];
			}
		}

		holder.getDiv().style.borderRadius = str;
	}
	scene.maskShapeRectangle = function(props){
		if(props.borderRadius === undefined) return;

		var holder = props.holder;
		var str = "",i,br = props.borderRadius;
		if(br !== undefined){
			for( i = 0; i < br.length; i++){

				if(i == 4){
					str += " / ";
				}

				if(br[i] < 1){
					str += (br[i] * 100) + "% ";
				}else{
					str += br[i] * HHgPixelScale + "px ";
				}
			}
		}

		holder.getDiv().style.borderRadius = str;
	}

	scene.removeShape = function(holder){
		holder.getDiv().style.borderRadius = 0;
	}

	scene.addBorderToHolder = function(props){
		var bw = props.borderWidth, holder = props.holder;
		if(bw < .5){
			bw *= holder.getHeightNet();
		}
		props.holder.borderWidthOriginal = bw;

		bw *= HHgPixelScale;

		holder.getDiv().style.border = "" + bw + "px " + props.borderStyle + " " + props.color.returnString();
	}


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
	HHgPixelScale = HHgGameHolder.getScaleNetForChildScale().getX();

	HHgScene.getDiv().style.maxHeight = "" + HHgGameHolder.getScaleNetForChildScale().getX() * HHgScreen.maxh + "px";

};









