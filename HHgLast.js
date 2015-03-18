window.onload = function(){

	
	HHgCachedImages.doStart(); //image list located in HHgSprite

	HHgObjectPool.doStart(50); //number of holders to cache
	HHgSceneDoStart();
	HHgActionManager.doStart();
	HHgMouse.doStart();

	HHgLoadingScreen.splashScreenFinish();

}


