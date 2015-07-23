window.onload = function(){

	HHgLoadingScreen.splashScreenStart(); //This is uneccesary until more caching gets done up front

	HHgCachedImages.doStart(); //image list located in HHgSprite

	HHgObjectPool.doStart(50); //number of holders to cache
	HHgSceneDoStart();
	HHgActionManager.doStart();
	HHgMouse.doStart();

	HHgLoadingScreen.splashScreenFinish();

}


