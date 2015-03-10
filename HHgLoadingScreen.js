var HHgLoadingScreen = {};

(function(){

	var splashScreen;
	var loadingScreen;

	var theAll = document.getElementById("all");
	var loadingDiv;


	HHgLoadingScreen.splashScreenStart = function(){
		loadingDiv = document.createElement('div');
		theAll.appendChild(loadingDiv);
		loadingDiv.id = "loading-screen";
		var header = document.createElement("h1");
		loadingDiv.appendChild(header);
		header.innerHTML = "HHg Engine Loading v0.2";
		loadingDiv.style.zIndex = 99;

		/*
		var img = new Image();
		img.src = "testPool.png";
		loadingDiv.appendChild(img);
		*/



		var canvas = document.createElement('canvas');
		canvas.classList.add("canvasAsSprite");
		var ctx = canvas.getContext('2d');
		canvas.width  = 2 * 1000;
		canvas.height = 2 * 1000;

		var img = new Image();

		img.crossOrigin = "Anonymous";
		img.src = "testPool.png";
		
		loadingDiv.appendChild(canvas);

		img.onload = function() {
			ctx.drawImage(img,0,0, canvas.width, canvas.height);
		};



	}
	HHgLoadingScreen.splashScreenFinish = function(){

	}
	HHgLoadingScreen.loadingScreenOn = function(){

	}
	HHgLoadingScreen.loadingScreenOff = function(){

	}
	

	HHgLoadingScreen.splashScreenStart();

})();

