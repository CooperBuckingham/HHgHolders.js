
var HHgSceneInternal = function(){
	
}

var testContainer;

var HHgScene, HHgStable;
var theAll = document.getElementById("all");

function doStartHHgScene(){
	console.log("scene setup start");
	HHgScene = new HHgHolder(540,960);

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doMoveToNewParent("stop");
	var sceneDiv = HHgScene.getDiv();
	
	sceneDiv.style.left = parseInt(sceneDiv.style.left) - HHgScene.getHalfWidth();
	sceneDiv.style.bottom = parseInt(sceneDiv.style.bottom) - HHgScene.getHalfHeight();
	sceneDiv.style.backgroundColor = "blue";

	HHgStable = new HHgHolder(HHgScene.getWidthNet(), HHgScene.getHeightNet(), -999);
	HHgStable.doMoveToNewParent(HHgScene, HHgScene.getWidthNet() * 3, HHgScene.getHeightNet() * 3, false);


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
	testContainer.setPositionXYOffsetOriginal(100,-50);
	testBlock.setPositionXYOffsetOriginal(100,-50);

	var testContainer2 = new HHgHolder(200,200);
testContainer2.doMoveToNewParent(HHgScene, new HHgVector2(0, -250));
testContainer2.setBackgroundColor(120,.75,.75,.5);
testContainer2.setScaleXYOffset(2,2);


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(0,0));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(-100,100));
	testBlock.setBackgroundColor(60,.75,.75,1);

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(100,100));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(100,-100));


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(testContainer2, new HHgVector2(-100,-100));
	testBlock.setBackgroundColor(150,1,1,1);

	var testBlock2 = new HHgHolder(50,50);
	testBlock2.doMoveToNewParent(testBlock, new HHgVector2(12.5,12.5));
	testBlock2.setBackgroundColor(300,.5,.5,1);
	testBlock2.setScaleXYOffset(.5,.5);
	
	testContainer2.setRotationOriginal(30);
	
	testBlock2.getDiv().addEventListener("click", function(){
		console.log("clicked");
		testContainer.setScaleXYOffset(1.25, 1.25, true);
		}, true);


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
		div.style.transform="rotate(" + (holder.getRotationNet()) +"deg" +")";
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

var lastRotate = 0;
	scene.test = function(delta, holder){
		lastRotate += delta/100;
		if(lastRotate > 30) lastRotate = 0;
		holder.setRotationOriginal(lastRotate);
		//holder.setRotationOriginal(90);
	}

	

	scene.doAnyScreenConversion = function(xyPos){
		return xyPos;
		//return new HHgVector2(xyPos.getX() + this.getHalfWidth(), xyPos.getY() + this.getHalfHeight());
	}
}







	
	

