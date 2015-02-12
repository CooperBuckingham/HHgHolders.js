//scene will need pixel multiplier for retina, etc

var HHgScreen = {
	w : 540,
	h : 960,
};

var testContainer;

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

	var testBlock = new HHgHolder(10,10);
	testBlock.doMoveToNewParent(HHgScene, 0,0, true);
	testBlock.setPositionInScreen(-100,0);

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
		div.style.backgroundColor ="red";
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







	
	

