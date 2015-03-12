

var HHgSprite = {

	returnSprite : function(name){
		return HHgImageManager.returnFileName(name);
	},
	doAddSpriteToHolder : function(holder, name, whitePixelTintRGB){

			HHgScene.setCanvasImageForHolder(holder, this.returnSprite(name), whitePixelTintRGB);
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