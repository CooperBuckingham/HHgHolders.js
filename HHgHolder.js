function HHgNode(h, w, parent, xyPos, zIndex, xyOffset, scale, xyScaleOffset){

	xyScaleOffset ? : xyScaleOffset = new Vector2(1,1);
	xyOffset ? : xyOffset = new Vector2(0,0);
	scale ? : scale = 1.0;
	zIndex ? : zIndex = 0;
	parent ? : parent = HHgScene;
	w ? : w = HHgScene.myWidth;
	h ? : w = HHgScene.myHeight;


	this.myHeight = h;
	this.myWidth = w;
	this.myParent = parent;
	
	this.myScaleOriginal = scale;
	this.myScaleNet;

	this.myZIndex = zIndex;
	this.myXYOffset = xyOffset;
	this.mySPos;
	this.myPPos;

	this.myChildren;
	this.myActions;

	this.setPositionInScreen = function(xyPos, shouldAddTo){
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

	this.setPositionInParent = function(parXYPos){
		var scaledV = parent.

	}

	this.getPositionInParent = function(){
		return this.myPPos
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

	}
	this.getScaleNet = function(){
		return this.myScaleNet
	}

	this.udpateScaleNet = function(){
		this.myScaleNet = parent.myScaleNet * this.myScaleOriginal;
		this.myStuffUpdated();
	}


	this.addChildren: function (){
		this.myChildren = this.myChildren || [];

		//add holders, add sprites
	}
	this.removeChildren: function(){

	}

	this.myStuffUpdated: function(){
		//add thing to list of stuff to udpate;
	}
}