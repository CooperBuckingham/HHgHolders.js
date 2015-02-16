//scene will need pixel multiplier for retina, etc

var HHgScreen = {
	w : 540,
	h : 960,
};

var HHgScreenSize = new HHgVector2(HHgScreen.w, HHgScreen.h);
var HHgScreenSizeHalf = HHgScreenSize.returnVectorScaledBy(.5);

var testContainer;

var showDebugSquares;

var HHgScene, HHgSVG, HHgSceneDiv, HHgStable;
var HHgTopHolder = document.getElementById("all");

HHgTopHolder.style.width = "" + HHgScreen.w +"px";
HHgTopHolder.style.height = "" + HHgScreen.h +"px";

function doStartHHgScene(){
	console.log("scene setup start");
	HHgScene = new HHgHolder(HHgScreen.w,HHgScreen.h);
	HHgScene.setMouseable(false);
	HHgScene.test = "scene";

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doAddScene();
	HHgSceneDiv = HHgScene.getDiv();
	
	//HHgStable = new HHgHolder(HHgScene.getWidthNet(), HHgScene.getHeightNet(), -999);
	HHgScene.doInitSVG();


//----- rotate test

if(false){

var theOne = new HHgHolder(100,100);
	theOne.doMoveToNewParent(HHgScene,new HHgVector2(-200,-200), true);
	theOne.doAddSprite("pool");
	theOne.test = "pool";


var theThree = new HHgHolder(540,3);
	theThree.doMoveToNewParent(HHgScene,new HHgVector2(0,0), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";

var theThree = new HHgHolder(3,540);
	theThree.doMoveToNewParent(HHgScene,new HHgVector2(0,0), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";

	
var theThree = new HHgHolder(540,3);
	theThree.doMoveToNewParent(HHgScene,new HHgVector2(0,100), true);
	theThree.doAddSprite("orange");
	theThree.test = "orange";


var theTwo;
setTimeout(function(){
	theTwo = new HHgHolder(100,100);
	debugger;
	theTwo.doMoveToNewParent(theOne, new HHgVector2(0,0), true);
	theTwo.doAddSprite("pool");
	theTwo.test = "soccer";

	console.log(theTwo.getPositionInParentOriginal().returnPretty());
	debugger;


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

if(true){

	var theOne = new HHgHolder(100,100);
	theOne.doMoveToNewParent(HHgScene,new HHgVector2(-200,-200), true);
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
	
	var posx = HHg.returnRandomIntLowIncHighExcl(-300,300);
	var posy = HHg.returnRandomIntLowIncHighExcl(-400,400);
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
		
		var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreenNet());
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
		div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";
		div.style.zIndex = "" + holder.getZIndex();
		scene.doUpdateHolderMouseable(holder);
		scene.doUpdateHolderVisible(holder);

		//this is hold over form the experiment with actually scaling divs
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
			//this will become a "can drag" check
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
		canvas.classList.add("canvasAsSprite");
		var ctx = canvas.getContext('2d');
		canvas.classList.add(holder.getHash());
        //canvas.width  = 200;
        //canvas.height = 200;
        canvas.style.position = "absolute";
        if(showDebugSquares){
        	canvas.style.border   = "1px solid";
        }
        var div = holder.getDiv();

        /*
        var grd=ctx.createRadialGradient(75,50,5,90,60,100);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"white");

		ctx.fillStyle=grd;
		ctx.fillRect(0,0,300,300);
		*/

		var img = new Image();
		img.src = fileName;
		div.appendChild(canvas);

      img.onload = function() {
        ctx.drawImage(img,0,0, canvas.width, canvas.height);
      };

        div.appendChild(canvas);
	

	}

	scene.doInitSVG = function(){
		HHgSVG = document.createElement('svg');
		HHgSVG.id = "svg";
		HHgSVG.width = HHgScreen.w;
		HHgSVG.height = HHgScreen.h;
		HHgSceneDiv.appendChild(HHgSVG);
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







	
	

