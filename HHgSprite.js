

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
			return HHgPathPrefix + "testPool.png";
			case "soccer":
			return HHgPathPrefix + "testSoccer.png";
			case "orange":
			return HHgPathPrefix + "testOrange.png";
			case "mouse":
			return HHgPathPrefix + "testMouse.png";
			default:
			return HHgPathPrefix + "testOrange.png";
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