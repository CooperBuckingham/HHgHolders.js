var HHgLoadingScreen = {};

(function(){

  var splashScreen;
  var loadingScreen;

  var theAll = document.getElementById("all");
  var loadingDiv, insideLoadingDiv;


  HHgLoadingScreen.splashScreenStart = function(){
    loadingDiv = document.createElement('div');
    theAll.appendChild(loadingDiv);
    loadingDiv.id = "loading-screen";
    insideLoadingDiv = document.createElement('div');
    var header = document.createElement("h1");
    insideLoadingDiv.appendChild(header);
    insideLoadingDiv.id = "inside-loading-screen";
    header.innerHTML = "HHg Engine Loading v0.2";
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
    canvas.width  = 200;
    canvas.height = 200;

    var img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = "./img/testPool.png";

    insideLoadingDiv.appendChild(canvas);

    img.onload = function() {
      ctx.drawImage(img,0,0, canvas.width, canvas.height);
    };



  }
  HHgLoadingScreen.splashScreenFinish = function(){
    loadingDiv.parentNode.removeChild(loadingDiv);
  }
  HHgLoadingScreen.loadingScreenOn = function(){

  }
  HHgLoadingScreen.loadingScreenOff = function(){

  }


})();

