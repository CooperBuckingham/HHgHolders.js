
var HHgSceneInternal = function(){
	
}



var HHgScene, HHgStable;
var theAll = document.getElementById("all");

function doStartHHgScene(){
	console.log("scene setup start");
	HHgScene = new HHgHolder(960,540);

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doMoveToNewParent("stop");
	var sceneDiv = HHgScene.getDiv();
	
	sceneDiv.style.left = parseInt(sceneDiv.style.left) - HHgScene.getHalfWidth();
	sceneDiv.style.bottom = parseInt(sceneDiv.style.bottom) - HHgScene.getHalfHeight();
	sceneDiv.style.backgroundColor = "blue";

	HHgStable = new HHgHolder(HHgScene.getWidthNet(), HHgScene.getHeightNet(), -999);
	HHgStable.doMoveToNewParent(HHgScene, HHgScene.getWidthNet() * 3, HHgScene.getHeightNet() * 3, true);


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

var testContainer = new HHgHolder(100,100);
testContainer.doMoveToNewParent(HHgScene, new HHgVector2(0, 0));
testContainer.setBackgroundColor(120,.75,.75,.5);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(0,0));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,100));
	testBlock.setBackgroundColor(60,.75,.75,1);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,100));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,-100));


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,-100));

	//=====

	var testContainer = new HHgHolder(100,100);
testContainer.doMoveToNewParent(HHgScene, new HHgVector2(0, 0));
testContainer.setBackgroundColor(120,.75,.75,.5);
testContainer.setScaleXYOffset(.75,.75);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(0,0));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,100));
	testBlock.setBackgroundColor(60,.75,.75,1);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,100));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(100,-100));


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer, new HHgVector2(-100,-100));





}

function doAddFunctionsToScene(scene){
		
	scene.doUpdateThisHolder = function(holder){
		var div = holder.getDiv();
		div.style.backgroundColor = holder.getBackgroundColor();
		div.style.width = "" + holder.getWidthNet() + "px";
		div.style.height ="" + holder.getHeightNet() + "px";
		var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreen());
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
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
		div.style.backgroundColor ="red";
		div.style.border = "2px solid black";
		div.id = holder.getHash();

		scene.doUpdateThisHolder(holder);
		
		theAll.appendChild(div);
	};

	

	scene.doAnyScreenConversion = function(xyPos){
		return xyPos;
		//return new HHgVector2(xyPos.getX() + this.getHalfWidth(), xyPos.getY() + this.getHalfHeight());
	}
}







	
	

