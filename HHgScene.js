//scene will need pixel multiplier for retina, etc

var HHgScreen = {
	w : 540,
	h : 960,
};

var testContainer;

var showDebugSquares;

var HHgScene, HHgSceneDiv, HHgStable;
var HHgTopHolder = document.getElementById("all");

HHgTopHolder.style.width = "" + HHgScreen.w +"px";
HHgTopHolder.style.height = "" + HHgScreen.h +"px";

function doStartHHgScene(){
	console.log("scene setup start");
	HHgScene = new HHgHolder(HHgScreen.w,HHgScreen.h);
	HHgScene.setMouseable(false);

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doAddScene();
	HHgSceneDiv = HHgScene.getDiv();
	
	HHgStable = new HHgHolder(HHgScene.getWidthNet(), HHgScene.getHeightNet(), -999);

	var testBlock1 = new HHgHolder(150,150);
	testBlock1.doMoveToNewParent(HHgScene, 0,0, true);
	testBlock1.doAddSprite("pool");

	var testBlock2 = new HHgHolder(100,100);
	testBlock2.doMoveToNewParent(testBlock1, 0,100);
	testBlock2.doAddSprite("orange");
	//testBlock.setRotationOriginal(45);
	
	

	var testBlock3 = new HHgHolder(50,50);
	testBlock3.doMoveToNewParent(testBlock2, 0,100);
	testBlock3.doAddSprite("soccer");


	testBlock1.doActionRotate(180, 20);
	testBlock2.doActionRotate(180, 30);

	testBlock1.setScaleXYOffsetMultiplied(2,2);
	//testBlock2.setScaleXYOffsetMultiplied(.9,.9);

	testBlock2.setPositionXYOffsetOriginal(50,50);


}

function doAddFunctionsToScene(scene){
	
	scene._holders = {

	}

	//==== specific 1 off updates ====//


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
	

	scene.doUpdateThisHolder = function(holder){
		if(holder.getDiv() === undefined) return;

		var div = holder.getDiv();
		div.style.backgroundColor = holder.getBackgroundColor();
		div.style.width = "" + holder.getWidthNet() + "px";
		div.style.height ="" + holder.getHeightNet() + "px";
		
		var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreenNet());
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
		div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";
		div.style.zIndex = "" + holder.getZIndex();
		scene.doUpdateHolderMouseable(holder);
		scene.doUpdateHolderVisible(holder);
		//div.style.transform="scale(" + holder.getScaleNet().getX()+","+ holder.getScaleNet().getY() + ")";


	}

	


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
		//div.style.border = "2px solid black";
		div.id = scene.getHash();

		scene.doUpdateThisHolder(scene);
		scene._holders[div.id] = scene;

		div.style.left = parseInt(div.style.left) - HHgScene.getHalfWidth();
		div.style.bottom = parseInt(div.style.bottom) - HHgScene.getHalfHeight();
	

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
		div.style.border = "2px solid black";
		div.id = holder.getHash();

		scene.doUpdateThisHolder(holder);
		scene._holders[div.id] = holder;

		HHgSceneDiv.appendChild(div);
	};

var lastRotate = 0;

	scene.test = function(delta, holder){
	
	
		lastRotate += delta/100;
		if(lastRotate > 30) lastRotate = 0;
		holder.setRotationOriginal(lastRotate);
		holder.setPositionInParent(new HHgVector2(0,.1), true);
		holder.setScaleXYOffsetMultiplied(.999,.999);
		//holder.setRotationOriginal(90);
	};
	

	scene.doAnyScreenConversion = function(xyPos){
		return xyPos;
		
	};

	
	scene.doAddMouseDownAndUpListeners = function(){
		var wOffset = 0;
		var hOffset = 0;

		
		
		HHgTopHolder.addEventListener("mousedown", function(e){
			var relX = e.pageX + wOffset;
			var relY = HHgScreen.h - (e.pageY + hOffset);
			HHgMain.HHgMouse.doMouseDown( scene.returnHoldersUnderPoint( relX, relY),relX - HHgScreen.w / 2, relY - HHgScreen.h / 2  );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mouseup", function(e){
			var relX = e.pageX + wOffset;
			var relY = HHgScreen.h - (e.pageY + hOffset);
			HHgMain.HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( relX, relY),relX - HHgScreen.w / 2,relY - HHgScreen.h / 2  );
			return false;
		}, false);

		HHgTopHolder.addEventListener("mousemove", function(e){
			console.log("mouse moving");
			if(!HHgMain.HHgMouse.clickedDown) return;
			var relX = e.pageX + wOffset;
			var relY = HHgScreen.h - (e.pageY + hOffset);
			HHgMain.HHgMouse.doMouseMove( relX - HHgScreen.w / 2, relY - HHgScreen.h / 2   );
			return false;
		}, false);


	};

	scene.doesDivContainPoint = function(div, x, y){
		//console.log("mouse at relative: " +x +"/" +y + "div at" + div.style.left + "/" + div.style.bottom  );
			var divW = parseInt(div.style.width),
		    divH = parseInt(div.style.height);
			
			if( parseInt(div.style.left) + divW < x ) return false;
			if( parseInt(div.style.bottom) + divH > y) return false;
			if( parseInt(div.style.left) > x) return false;
			if( parseInt(div.style.bottom) < y) return false;

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
		console.log("mousable things " + arr.length);
		var mArr = [];
		var highestZ = -100;
		
		for(var i = 0; i < arr.length; i++ ){
			
			if(scene.doesDivContainPoint(arr[i],x,y)){
				if(+arr[i].style.zIndex > highestZ){
					mArr.unshift(scene.getHolderFromDiv(arr[i]));
					highestZ = +arr[i].style.zIndex;
				}else{
					mArr.push(scene.getHolderFromDiv(arr[i]));
				}
				
			}
		}

		return mArr;

	};

	scene.getHolderFromDiv = function (div){
		return scene._holders[div.id];
	};

	scene.setBackgroundImageForHolder = function(holder, fileName){
		//holder.getDiv().style.backgroundImage = "url(" + fileName +")";
		var img = new Image();
		img.src = fileName;
		holder.getDiv().appendChild(img);
	}

	scene.setCanvasImageForHolder = function(holder, fileName){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.class = holder.getHash()
        canvas.width  = 200;
        canvas.height = 200;
        canvas.style.position = "absolute";
        if(showDebugSquares){
        	canvas.style.border   = "1px solid";
        }
        var div = holder.getDiv();
        var grd=ctx.createRadialGradient(75,50,5,90,60,100);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"white");

		ctx.fillStyle=grd;
		ctx.fillRect(0,0,300,300);

        div.appendChild(canvas)
	

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







	
	

