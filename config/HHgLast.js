window.onload = function(){

	HHgLoadingScreen.splashScreenStart(); //This is uneccesary until more caching gets done up front

	HHgCachedImages.doStart(); //image list located in HHgSprite

	HHgObjectPool.doStart(50); //number of holders to cache
	HHgSceneDoStart();
	HHgActionManager.doStart();
	HHgMouse.doStart();

	HHgLoadingScreen.splashScreenFinish();

  window.onresize = function(){
    //TODO see if it makes sense to handle dynamically rescaling the game space here

    //could scale the scene, but might have to dynamically update the fixed hardware offset numbers, for mouse calculations and things

    document.location.reload();
  }

}


