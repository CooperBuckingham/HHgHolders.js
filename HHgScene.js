
var HHgSceneInternal = function(){
	
}

var HHgMain = window;

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

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doAddScene();
	HHgSceneDiv = HHgScene.getDiv();
	
	

	HHgStable = new HHgHolder(HHgScene.getWidthNet(), HHgScene.getHeightNet(), -999);

	//HHgStable.doMoveToNewParent(HHgScene, HHgScene.getWidthNet() * 3, HHgScene.getHeightNet() * 3, true);


	/*var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(-100,100), true);
	testBlock.setBackgroundColor(60,.75,.75,1);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(0,0), true);

	
	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(100,100), true);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(100,-100), true);


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(-100,-100), true);
*/
//==================

//==================
/*
testContainer = new HHgHolder(200,200);
testContainer.doMoveToNewParent(HHgScene, new HHgVector2(-100, 300));
testContainer.setBackgroundColor(120,.75,.75,.5);

	var testBlock = new HHgHolder(20,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(0,0));

	var testBlock = new HHgHolder(20,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,100));
	testBlock.setBackgroundColor(60,.75,.75,1);

	var testBlock = new HHgHolder(20,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,100));

	var testBlock = new HHgHolder(20,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,-100));


	var testBlock = new HHgHolder(20,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,-100));

	//=====
	//testContainer.setRotationOriginal(30);
	
	testBlock.setPositionXYOffsetOriginal(100,0);
*/
var testContainer2 = new HHgHolder(250,500);
testContainer2.doMoveToNewParent(HHgScene, new HHgVector2(0, 200), false);
testContainer2.setBackgroundColor(120,.75,.75,.5);
//testContainer2.setScaleOriginal(2,2);



	var testBlock = new HHgHolder(100,100);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(159,100), false);
	
	var testBlock = new HHgHolder(100,100);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(-100,-100), false);
	
	var testBlock = new HHgHolder(100,100);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(-100,100), false);
	
	var testBlock = new HHgHolder(100,100);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(100,-445), false);
	testBlock.setBackgroundColor(356,.75,.75,.5);
	

	testContainer2.setScaleOriginal(1.4,1.4);
	
	
	testBlock.setPositionInScreen(new HHgVector2(0,200));

	testContainer2.doActionMoveInScreen(0, -400, 10 );


}

function doAddFunctionsToScene(scene){
	
	scene._holders = {

	}
	

	scene.doUpdateThisHolder = function(holder){
		var div = holder.getDiv();
		div.style.backgroundColor = holder.getBackgroundColor();
		div.style.width = "" + holder.getWidthNet() + "px";
		div.style.height ="" + holder.getHeightNet() + "px";
		var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreenNet());
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
		div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";

		scene.doUpdateMouseable(holder);
	}

	scene.doUpdateMouseable = function(holder){
		holder.getMouseable() ? holder.getDiv().classList.add("mouseable") : holder.getDiv().classList.remove("mouseable");
		
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
		console.log("HHG, Top" + HHgTopHolder.style.marginLeft);
		HHgTopHolder.addEventListener("mousedown", function(e){
			HHgMouse.doMouseDown(scene.returnHoldersUnderPoint( e.pageX + wOffset, e.pageY - hOffset));
		}, false);
		HHgTopHolder.addEventListener("mouseup", function(e){
			HHgMouse.doMouseUp(scene.returnHoldersUnderPoint( e.pageX + wOffset, e.pageY - hOffset))
		}, false);
	};

	scene.doesDivContainPoint = function(div, x, y){
		console.log("Does Div Have: " + x + "," + y);
			if(+div.style.left <= x ) return false;
			if(+div.style.bottom <= y) return false;
			if(+div.style.left + (+div.style.width) > x) return false;
			if(+div.style.bottom + (+div.style.height) > y) return false;

			return true;
	};

	scene.returnHoldersUnderPoint = function(xy, y){
		console.log("return holders under: " + xy +"," + y);
		if(xy instanceof HHgVector2 === true ){
			y = xy.getY();
			var x = xy.getX();
		}else{
			var x = xy;
		}
		var arr = document.getElementsByClassName("mouseable");
		
	
	
		var mArr = [];
		for(var i = 0; i < arr.length; i++ ){
			if(scene.doesDivContainPoint(arr[i],x,y)){
				mArr.push(scene.getHolderFromDiv(arr[i]));
			}
		}

		return mArr;

	};

	scene.getHolderFromDiv = function (div){
		return scene._holders[div.id];
	};

	
}

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







	
	

