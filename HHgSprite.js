

var HHgSprite = {
	//toggle this to use pngs directly in divs instead of writing to canvas
	useContext : true,

	returnSprite : function(name){
		return HHgImageManager.returnFileName(name);
	},
	doAddSpriteToHolder : function(holder, name){

		if(this.useContext === false){
			HHgScene.setBackgroundImageForHolder(holder, this.returnSprite(name));
			
		}else{
			HHgScene.setCanvasImageForHolder(holder, this.returnSprite(name));
		}

	
	}
};

var HHgImageManager = {

	returnFileName : function(name){
		switch(name){
			case "pool":
			return "testPool.png";
			case "soccer":
			return "testSoccer.png";
			case "orange":
			return "testOrange.png";
			case "mouse":
			return "testMouse.png";
			default:
			return "testOrange.png";
		}
	}

};

var HHgCachedImages = {
	//will setup list of images to precache
	cacheList: {},
	doStart: function(){
		//ph
	}
};