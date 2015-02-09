
var HHgSceneInternal = function(){
	
}



var HHgScene;
var theAll = document.getElementById("all");

function doStartHHgScene(){
	console.log("scene setup start");
	HHgScene = new HHgHolder(960,540);

	//we add all the custom functions to the scene here
	doAddFunctionsToScene(HHgScene);

	HHgScene.doMoveToNewParent("stop");
	var sceneDiv = HHgScene.getDiv();
	console.log(sceneDiv.style.left);
	console.log(HHgScene.getHalfWidth());
	sceneDiv.style.left = parseInt(sceneDiv.style.left) - HHgScene.getHalfWidth();
	sceneDiv.style.bottom = parseInt(sceneDiv.style.bottom) - HHgScene.getHalfHeight();
	sceneDiv.style.backgroundColor = "blue";
	console.log("added scene");

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(0,0));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(-100,100));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(100,100));

	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(100,-100));


	var testBlock = new HHgHolder(50,50);
	testBlock.doMoveToNewParent(HHgScene, new HHgVector2(-100,-100));



}

function doAddFunctionsToScene(scene){
		scene.doAddThisHolder = function(holder){
		
		var div = document.createElement("div");
		holder.setDiv(div);
		div.style.display ="inline-block";
		div.style.position = "absolute";
		div.style.backgroundColor ="red";
		div.style.border = "2px solid black";
		div.style.width = "" + holder.getWidth() + "px";
		div.style.height ="" + holder.getHeight() + "px";
		var centricConversion = this.doConvertTo00Centric( holder.getPositionInScreen() );
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
		div.id = holder.getHash();
		
		theAll.appendChild(div);
	};

	scene.doUpdateThisHolder = function(holder){
		var div = holder.getDiv();
		div.style.width = "" + holder.getWidth() + "px";
		div.style.height ="" + holder.getHeight() + "px";
		var centricConversion = this.doConvertTo00Centric(holder.getPositionInScreen());
		div.style.left ="" + centricConversion.getX() +"px";
		div.style.bottom ="" + centricConversion.getY() + "px";
	}

	scene.doConvertTo00Centric = function(xyPos){
		//return xyPos;
		return new HHgVector2(xyPos.getX() + this.getHalfWidth(), xyPos.getY() + this.getHalfHeight());
	}
}







	
	

