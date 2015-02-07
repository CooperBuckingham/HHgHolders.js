var holderHashCount = 0;

var HHgHolder = function(w, h, parent, zIndex, xyOffset, scale, xyScaleOffset){

	xyScaleOffset =  xyScaleOffset || new HHgVector2(1,1);
	xyOffset =  xyOffset || new HHgVector2(0,0);
	scale = scale || 1.0;
	zIndex = zIndex || 0;
	parent = parent || HHgScene;
	w = w || HHgScene.myWidth;
	h = h || HHgScene.myHeight;
	xyScaleOffset = xyScaleOffset || new HHgVector2(1,1);

	this.myWidth = w;
	this.myHeight = h;
	
	this.myParent = parent;

	
	this.myScaleOriginal = scale;
	this.myScaleNet = scale;

	this.myZIndex = zIndex;
	this.myXYOffset = xyOffset;
	this.mySPos = new HHgVector2(0,0);
	this.myPPos  = new HHgVector2(0,0);

	this.myChildren;
	this.myActions;
	this.myScaleOffset = xyScaleOffset;
	this.myDiv;
	holderHashCount++;
	this.myHash = holderHashCount;
	this.myTimeStamp = +new Date();

	
	this.updateToParent = function(){
		this.setPositionInParent(new HHgVector2(0,0) );
		console.log("before update scale");
		this.updateScaleNet();
		console.log("after console log");

	}

	this.setPositionInScreen = function(xyPos, shouldAddTo){
		if(this.myParent === "stop"){
			return;
		}
		if(shouldAddTo === true){
			this.mySPos = this.mySPos.returnVectorPlusVector(xyPos);
		}else{
			this.mySPos = xyPos;
		}

		this.myPPos = this.mySPos.returnVectorPlusVector(this.myParent.getPositionInScreen()).returnVectorScaledByInverse(this.parent.getScaleNet);
		
		this.myStuffUpdated();
	}


	this.getPositionInScreen = function(){
		return this.mySPos;
	}

	this.setPositionInParent = function(parXYPos, shouldAddTo){
		
		if(this.myParent === "stop"){
			return;
		}

		if(shouldAddTo === true){
			this.myPPos = this.myPPos.returnVectorPlusVector(parXYPos);
		}else{
			this.myPPos = parXYPos;
		}

		var parScreenPos = this.myParent.getPositionInScreen();
		var parNetScale = this.myParent.getScaleNet();
		var thisPlusThat = parScreenPos.returnVectorPlusVector(this.myPPos);
		this.mySPos = thisPlusThat.returnVectorScaledBy(parNetScale);

		
		this.myStuffUpdated();

	}

	this.getPositionInParent = function(){
		return this.myPPos;
	}

	this.setScaleOriginal = function(val, shouldMultiplyBy){
		if(shouldMultiplyBy === true){
			this.myScaleOriginal *= val;
		}else{
			this.myScaleOriginal = val;
		}
		
		this.updateNetScale();

	}

	this.getScaleOriginal = function(val){
		return this.myScaleOriginal;
	}
	this.getScaleNet = function(){
		return this.myScaleNet;
	}

	this.updateScaleNet = function(){
		console.log("here 0");
		if(this.myParent === "stop"){
			return;
		}
		console.log("here 1");
		this.myScaleNet = this.myParent.myScaleNet * this.myScaleOriginal;
		this.myStuffUpdated();
	}


	this.addChildren = function (){
		this.myChildren = this.myChildren || [];

		//call update to parent on each

		//add holders, add sprites
	}
	this.removeChildren = function(){

	}

	this.myStuffUpdated = function(){
		//add thing to list of stuff to udpate;
	}

	this.updateToParent();

}