

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
			return "../HHgEngine/testPool.png";
			case "soccer":
			return "../HHgEngine/testSoccer.png";
			case "orange":
			return "../HHgEngine/testOrange.png";
			case "mouse":
			return "../HHgEngine/testMouse.png";
			default:
			return "../HHgEngine/testOrange.png";
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