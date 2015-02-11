
var HHgSceneInternal = function(){
	
}

var HHgMain = window;

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
testContainer2.doMoveToNewParent(HHgScene, new HHgVector2(0, 200), true);
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
	

	//testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	testContainer2.setScaleOriginal(2,2);
	testContainer2.setScaleOriginal(1,1);
	testContainer2.setScaleOriginal(1.25,1.25);
	testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	//testBlock.setPositionInScreen(testBlock.getPositionInScreenOriginal());
	//testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	testBlock.setPositionInScreen(testBlock.getPositionInScreenOriginal());
	testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	//testContainer2.setRotationOriginal(180);


	//testContainer2.setScaleOriginal(1,1);
	//testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	
	HHgScene.doAddMouseClick(testContainer2, function(){
		this.setRotationOriginalAdd(22.5);
		testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	//testBlock.setPositionInScreen(testBlock.getPositionInScreenOriginal());
	//testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	testBlock.setPositionInScreen(testBlock.getPositionInScreenOriginal());
	testBlock.setPositionInParent(testBlock.getPositionInParentOriginal());
	}, false);

	testContainer2.actionMoveInScreen(0, -400, 25 );


}

function doAddFunctionsToScene(scene){
		
	scene.doUpdateThisHolder = function(holder){
		var div = holder.getDiv();
		div.style.backgroundColor = holder.getBackgroundColor();
		div.style.width = "" + holder.getWidthNet() + "px";
		div.style.height ="" + holder.getHeightNet() + "px";
		var centricConversion = scene.doAnyScreenConversion(holder.getPositionInScreenNet());
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
		holder.setPositionInParent(new HHgVector2(0,.1), true);
		holder.setScaleXYOffsetMultiplied(.999,.999);
		//holder.setRotationOriginal(90);
	}

	scene.doAddMouseClick = function(holder, func, shouldBubble){
		holder.getDiv().addEventListener("click", func.bind(holder), shouldBubble);
	}

	

	scene.doAnyScreenConversion = function(xyPos){
		return xyPos;
		//return new HHgVector2(xyPos.getX() + this.getHalfWidth(), xyPos.getY() + this.getHalfHeight());
	}
}







	
	

