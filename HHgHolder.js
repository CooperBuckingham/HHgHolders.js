function HHgNode(h, w, parent, xyPos, zIndex, xyOffset, scale){

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
	this.myNetScale = 

	this.myZIndex = zIndex;
	this.myXYOffset = xyOffset;
	this.mySPos;
	this.myPPos;

	this.myChildren;
	this.myActions;

	this.setScreenPosition = function(xyPos){
		this.mySPos = xyPos;
		this.myStuffUpdated();
	}


	this.getScreenPosition = function(){
		return this.mySPos;
	}

	this.setParentPosition = function(parXYPos){

	}

	this.getParentPosition = function(){
		return this.myPPos
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