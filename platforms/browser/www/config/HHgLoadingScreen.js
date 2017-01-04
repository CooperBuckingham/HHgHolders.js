var HHgLoadingScreen = {};

(function () {

  var splashScreen;
  var loadingScreen;

  var HHgTopHolder = document.getElementById("HHgTopHolder");
  var loadingDiv, insideLoadingDiv;


  HHgLoadingScreen.splashScreenStart = function () {
    loadingDiv = document.createElement('div');
    HHgTopHolder.appendChild(loadingDiv);
    loadingDiv.id = "loading-screen";
    insideLoadingDiv = document.createElement('div');
    insideLoadingDiv.id = "inside-loading-screen";
    loadingDiv.appendChild(insideLoadingDiv);
    loadingDiv.style.zIndex = 98;
    insideLoadingDiv.style.zIndex = 99;


    /*
     var img = new Image();
     img.src = "testPool.png";
     loadingDiv.appendChild(img);
     */


    var canvas = document.createElement('canvas');
    //canvas.classList.add("canvasAsSprite");
    var ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    var img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = "./img/testPool.png";

    insideLoadingDiv.appendChild(canvas);

    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };


  }
  HHgLoadingScreen.splashScreenFinish = function () {
    loadingDiv.parentNode.removeChild(loadingDiv);
  }
  HHgLoadingScreen.loadingScreenOn = function () {

  }
  HHgLoadingScreen.loadingScreenOff = function () {

  }


})();

