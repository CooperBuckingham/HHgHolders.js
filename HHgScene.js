//scene will need pixel multiplier for retina, etc


var HHgTrackedTouch;
var	HHgScreenSize = new HHgVector2(HHgScreen.w, HHgScreen.h);
var	HHgScreenSizeHalf = HHgScreenSize.times(.5);
//hmm;
var	testContainer;
var showDebugSquares;

var HHgScene, HHgSceneDiv, HHgGameHolder, HHgScreenDiff, HHgScreenDiffPlus, HHg0Vector, HHg1Vector, HHg10000Vector, HHgHalfVector, HHgTestDiv, HHgPixelScale;
var HHgTopHolder = document.getElementById("all");

HHgTopHolder.style.width = "" + HardwareScreen.w +"px";
HHgTopHolder.style.height = "" + HardwareScreen.h +"px";

HHgSceneDoStart = function(){
  console.log("HHgScene Start NOW");
  HHg0Vector = new HHgVector2(0,0);
  HHg0Vector.setX = function(){};
  HHg0Vector.setY = function(){};
  HHg0Vector.setXY = function(){};

  HHg1Vector = new HHgVector2(1,1);
  HHg1Vector.setX = function(){};
  HHg1Vector.setY = function(){};
  HHg1Vector.setXY = function(){};

  HHgHalfVector = new HHgVector2(.5,.5);
  HHgHalfVector.setX = function(){};
  HHgHalfVector.setY = function(){};
  HHgHalfVector.setXY = function(){};

  HHg10000Vector = new HHgVector2(10000,10000);
  HHg10000Vector.setX = function(){};
  HHg10000Vector.setY = function(){};
  HHg10000Vector.setXY = function(){};

  HHgScreenDiff = new HHgVector2(0,0);
  HHgScene = new HHgHolder({w:HardwareScreen.w,h:HardwareScreen.h});

  HHgScene.test = "scene";
  doAddFunctionsToScene(HHgScene);
  HHgGameHolder = HHgScene;

  function doAddScene(){
    var div = document.createElement("div");
    HHgScene.setDiv(div);
    div.style.display ="inline-block";
    div.style.position = "absolute";
    div.style.backgroundColor ="white";

    div.id = HHgScene.getHash();
    div.classList.add("scene");

    div.style.width = "" + HardwareScreen.w + "px";
    div.style.maxHeight = "" + HardwareScreen.w / HHgScreen.w * HHgScreen.maxh + "px";
    div.style.height = "" + HardwareScreen.w / HHgScreen.w * HHgScreen.maxh + "px";

    div.style.left ="" + 0 +"px";
    div.style.top = "" + ((HardwareScreen.h - (HardwareScreen.w / HHgScreen.w * HHgScreen.maxh)) / 2) + "px";

    HHgScene._holders[div.id] = HHgScene;

    HHgTopHolder.appendChild(div);

    HHgScene.setPositionInParentTo = function(){};
    HHgScene.setPositionInScreenTo = function(){};
    HHgScene.setPositionInScreenBy = function(){};
    HHgScene.doNotifySceneOfUpdates = function(){};
    HHgScene.doFrameDump = function(){};
    HHgGameHolder.killHolder = function(){};
    HHgScene.getPositionInScreenNet = function(){
      return HHg0Vector;
    }
    HHgScene.setScene();
  };
  doAddScene();

  HHgSceneDiv = HHgScene.getDiv();
  HHgScreenDiff = new HHgVector2(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);

  function buildHolderFromScratch(){
    HHgGameHolder = new HHgHolder({w:HHgScreen.w, h: HHgScreen.h});
    var div = document.createElement("div");
    HHgGameHolder.setDiv(div);
    div.style.display ="inline-block";
    div.style.position = "absolute";
    div.style.backgroundColor ="white";

    div.id = HHgGameHolder.getHash();
    div.classList.add("scene");

    HHgScene._holders[div.id] = HHgGameHolder;

    HHgSceneDiv.appendChild(div);
    //from here on out the game holder is now the scene div other holders are added to
    HHgSceneDiv = div;
    HHgSceneDiv.style.border = "2px dashed black";

    HHgScene.doAddChild(HHgGameHolder);
    div.classList.add("game-holder");
    div.classList.remove("mouseable");
    div.style.width = "" + HHgScreen.w * (HardwareScreen.w / HHgScreen.w) + "px";
    div.style.height = "" + HHgScreen.h * (HardwareScreen.w / HHgScreen.w) + "px";
    HHgSceneDiv.style.left = "0px";

    HHgScreenDiffPlus = new HHgVector2(0, ((HardwareScreen.w / HHgScreen.w * HHgScreen.maxh) - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w)))/2 );

    HHgSceneDiv.style.top = "" + HHgScreenDiffPlus.y + "px";

    HHgGameHolder.doNotifySceneOfUpdates = function(){};
    HHgGameHolder.setPositionInParentTo = function(){};
    HHgGameHolder.setPositionInScreenTo = function(){};
    HHgGameHolder.setPositionInScreenBy = function(){};
    HHgGameHolder.doFrameDump = function(){};
    HHgGameHolder.killHolder = function(){};

    HHgGameHolder.getPositionInScreenNet = function(){return HHg0Vector;}

    HHgGameHolder.setGameHolder();
    HHgPixelScale = HHgGameHolder.getScaleNetForChildScale().x;
  };
  buildHolderFromScratch();
  //ALL CUSTOM GAME CODE START IN THIS FUNCTION:
  HHgGame.doStart();
};

function doAddFunctionsToScene(scene){

  scene._holders = {};
  scene._dirtyHolders = {};
  scene._finalDirtyHolders = {};

  //==== specific 1 off updates ====//
  scene.doAddToDirtyList = function(holder){
    scene._dirtyHolders[holder.getHash()] = holder;
  };
  scene.doUpdateHolderMouseable = function(holder){
    holder.getMouseable() ? holder.getDiv().classList.add("mouseable") : holder.getDiv().classList.remove("mouseable");
  };
  scene.doUpdateHolderVisible = function(holder){
    if(holder.getVisible()){
      holder.getDiv().style.display = "inline-block";
    }else{
      holder.getDiv().style.display = "none";
    }
  };

  scene.doEndOfFrame = function(){
    if(scene._dirtyHolders.length < 1){
      return;
    }
    var newList = scene._dirtyHolders;
    scene._dirtyHolders = {};

    for(var thing in newList){
      newList[thing].doFrameDump.call(newList[thing]);
    }
    newList = {};
  };

  scene.doUpdateHolders = function(){
    //this handles all visual udpates per frame for holders
    if(scene._finalDirtyHolders.length < 1){
      return;
    }
    var newList = scene._finalDirtyHolders;
    scene._finalDirtyHolders = {};

    var holder, div, insideDiv, changes;
    for(var thing in newList){

      holder = newList[thing];

      if(holder.getDiv() === undefined) return;

      div = holder.getDiv();
      insideDiv = holder.getInsideDiv();
      changes = holder.changes;

      if(changes.backgroundColor === true){
        insideDiv.style.backgroundColor = holder.getBackgroundColor().returnString();
      }
      if(changes.tint === true){
        tintCanvasByFill( holder.getCanvas(), holder.getTintRGBA().returnString() );
      }

      if(holder.firstUpdate !== true){
        //this positions and scales the object on inital placement
        //after it will only use the transforms for divs
         holder.firstUpdate = true;

          div.style.width = "" + holder.getWidthNet() + "px";
          div.style.height = "" + holder.getHeightNet() + "px";
          div.style.left ="" + holder._startPositionForTranslate.x +"px";
          div.style.bottom ="" + holder._startPositionForTranslate.y + "px";

          insideDiv.style.width = "" + holder.getWidthNet() + "px";
          insideDiv.style.height = "" + holder.getHeightNet() + "px";

          if(holder.paragraph !== undefined){
            holder.paragraph.style.fontSize = "" + holder.fontSizeScaled + "px";
          }
          if(holder.borderWidthOriginal > 0){
            div.style.borderWidth = "" + holder.borderWidthScaled + "px";
          }


      }
      //=============== Begin conditional for transform types
        if(changes.scale === true || changes.rotation === true || changes.position === true ){
          //the inside div only handles visuals and self rotation
          var scaleX = holder.getWidthNet() /  parseFloat(insideDiv.style.width);
          var scaleY = holder.getHeightNet() / parseFloat(insideDiv.style.height);

          var scaleString = "scale(" + scaleX + "," + scaleY + ") ";

          // var am90 = holder.getRotationNet() % 180;
          // var am90 = Math.abs(am90 - 90);
          // var pVal = am90/90;

          var insideScaleStringX = "";
          var insideScaleStringY = "";
          if(holder.test !== "gameholder" && holder.test !== "scene"){
            scaleString = "";
             var insideScaleStringX = "scaleY("+(  scaleY ) +")";
             var insideScaleStringY = "scaleX("+(  scaleX ) +")";
          };


          var insideSkewStringX = "skewX("+( 0 ) +"deg)";
          var insideSkewStringY = "skewY("+( 0)  +"deg)";
          var insideSkewString = insideSkewStringX + " " + insideSkewStringY;
          var insideScaleString = insideScaleStringX + " " + insideScaleStringY;

          insideDiv.style.transform = "rotate(" + holder.getRotationNet() + "deg" +") " + insideScaleString + " " + insideSkewString;
          var adjustedPosition = holder.getPositionInScreenNet().copy();
            //adjustedPosition.dividedEquals(holder.getScaleOriginal());
            //adjustedPosition.dividedEquals(holder.getParent().getScaleNetForChildPosition());
            //the above 2 string are from when outer div handled the scaling
            //but this meant that that rotation on inner div was screwing up scale

            div.style.transform =  scaleString + "translate(" + adjustedPosition.x + "px, " + (-adjustedPosition.y) + "px) ";

          //outsideTransformString = outsideTransformString + "translate3d(" + adjustedPosition.x + "px, " + (-adjustedPosition.y) + "px, 0px) ";
        }
      //======== END Conditional for transform types

      if(changes.zIndex === true){
        div.style.zIndex = "" + holder.getZIndex();
      }

      if(changes.mouseable === true){
        scene.doUpdateHolderMouseable(holder);
      }

      if(changes.visible === true){
        scene.doUpdateHolderVisible(holder);
      }

      if(changes.classList === true){
        for(var key in holder.classAddingObject){
          holder.getDiv().classList.add(holder.classAddingObject[key]);
        }
        holder.classAddingObject = undefined;

        for(var key in holder.classRemovingObject){
          holder.getDiv().classList.remove(holder.classRemovingObject[key]);
        }
        holder.classRemovingObject = undefined;
      }
      holder.resetChanges();
    }
  };

  scene.addToFinalPassList = function(holder){
    scene._finalDirtyHolders[holder.getHash()] = holder;
  };

  scene.doAddThisHolder = function(holder){
    if(holder.getDiv()){
      scene.addToFinalPassList(holder);
      return;
    }

    var div = document.createElement("div");
    var insideDiv = document.createElement("div");
    holder.setDiv(div);
    holder.setInsideDiv(insideDiv);
    div.style.display ="inline-block";
    div.style.position = "absolute";
    div.appendChild(insideDiv);
    insideDiv.style.display="inline-block";
    // insideDiv.style.width ="100%";
    // insideDiv.style.height ="100%";
    insideDiv.style.position = "absolute";
    insideDiv.style.left = "0";
    insideDiv.style.bottom = "0";

    if(HHgTestBoxes === true){
      div.style.border = "2px solid black";
      insideDiv.style.border = "2px solid blue";
    }

    div.id = holder.getHash();
    insideDiv.id = holder.getHash() + "i";
    scene.addToFinalPassList(holder);
    scene._holders[div.id] = holder;
    HHgSceneDiv.appendChild(div);
  };

  //====================================================

  scene.doAddTextDiv = function(owner, props){
    var parent = document.createElement("div");
    owner.getInsideDiv().appendChild(parent);
    var child = document.createElement("pre");
    parent.appendChild(child);
    var parentScale = owner.getScaleNetForChildScale().x;
    var tempFontSize = props.fontSize * parentScale;
    child.style.color = props.color ? props.color.returnString() : "black";
    child.style.fontSize = "" + tempFontSize + "px";
    child.style.fontStyle = props.fontStyle
    child.classList.add(props.fontStyle);
    child.innerHTML = props.text;

    child.style.textAlign = props.hAlign;
    child.style.verticalAlign = props.vAlign;
    parent.classList.add("textDiv");
    parent.id = owner.getHash() + "t";
    child.id = owner.getHash() + "p";

    if(props.shadow !== undefined){
      props.shadow.x *= parentScale;
      props.shadow.y *= parentScale;
      props.shadow.blur *= parentScale;

      child.style.textShadow = "" + props.shadow.x + "px " + props.shadow.y + "px " + props.shadow.blur + "px " + props.shadow.color.returnString();
    }
    owner.textDiv = parent;
    owner.paragraph = child;
    owner.fontSizeOriginal = props.fontSize;
  };

  scene.doAddTextToCanvas = function(owner, props){
    var ctx = owner.getCanvas().getContext("2d"), x, y, textWidth, textHeight, divWidth, divHeight;
    var parentScale = owner.getScaleNetForChildScale().x;
    textHeight = props.fontSize * parentScale;
    ctx.font = "" + textHeight + "px " + props.font ;
    textWidth = ctx.measureText(props.text).width * parentScale;

    divWidth = owner.getWidthNet() * HHgHoldCanvasUpresScaleBy;
    divHeight = owner.getHeightNet() * HHgHoldCanvasUpresScaleBy;

    if(props.vAlign === "top"){
      y = 0;
      ctx.textBaseline = "top";
    }else if(props.vAlign === "middle"){
      y = (divHeight - textHeight) / 2;
      ctx.textBaseline = "middle";
    }else{
      y = divHeight;
      ctx.textBaseline = "bottom";
    }

    if(props.hAlign === "left"){
      x = 0;
      ctx.textAlign = "left";
    }else if(props.hAlign === "center"){
      x = (divWidth - textWidth) / 2;
      ctx.textAlign = "center";
    }else{
      x = divWidth;

      ctx.textAlign = "right";
    }

    if(props.shadow !== undefined){
      ctx.shadowOffsetX = props.shadow.x * parentScale;
      ctx.shadowOffsetY = props.shadow.y  * parentScale;
      ctx.shadowColor = props.shadow.color;
      ctx.shadowBlur = props.shadow.blur  * parentScale;
    }

    if(props.stroke !== undefined){
      ctx.strokeStyle = props.stroke.color;
      ctx.lineWidth = props.stroke.width;
      ctx.strokeText(props.text, x, y);
    }
    ctx.fillText(props.text,x,y);
  };
  //========================================================

  scene.doAddMouseDownAndUpListeners = function(){
    var wOffset = 0;
    var hOffset = 0;
    var relX = 0, relY = 0;
    var mouseXY, touch, touchlist, i, test;

    HHgTopHolder.addEventListener("mousedown", function(e){
        e.preventDefault();
        e.stopPropagation();
        relX =  e.pageX;
        relY =  e.pageY;
        mouseXY = new HHgVector2(relX,relY);
        mouseXY = scene.convertMouseToHolder(mouseXY);
        HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),mouseXY );
        return false;
      }, false);

    HHgTopHolder.addEventListener("mouseup", function(e){
        e.preventDefault();
        e.stopPropagation();
        relX = e.pageX;
        relY = e.pageY;
        mouseXY = new HHgVector2(relX,relY);
        mouseXY = scene.convertMouseToHolder(mouseXY);
        HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
        return false;
      }, false);

    document.addEventListener("mouseout", function(e){
        e = e ? e : window.event;
        test = e.relatedTarget || e.toElement;
        if (!test || test.nodeName == "HTML") {
          relX = e.pageX;
          relY = e.pageY;
          mouseXY = new HHgVector2(relX,relY);
          mouseXY = scene.convertMouseToHolder(mouseXY);
          HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),mouseXY );
        }
        return false;
       }, false);

    HHgTopHolder.addEventListener("mousemove", function(e){
        e.preventDefault();
        e.stopPropagation();
        relX = e.pageX;
        relY = e.pageY;
        mouseXY = new HHgVector2(relX,relY);
        mouseXY = scene.convertMouseToHolder(mouseXY);
        HHgMouse.doMouseMove( mouseXY );
        return false;
      }, false);

    HHgTopHolder.addEventListener("touchstart", function(e){
        e.preventDefault();
        touch = e.changedTouches[0];

        HHgTrackedTouch = touch.identifier;
        relX =  touch.pageX;
        relY =  touch.pageY;
        mouseXY = new HHgVector2(relX,relY);
        mouseXY = scene.convertMouseToHolder(mouseXY);
        HHgMouse.doMouseDown( scene.returnHoldersUnderPoint(mouseXY),mouseXY );
        return false;
      }, false);

    HHgTopHolder.addEventListener("touchend", function(e){
      e.preventDefault();
      touchList = e.changedTouches;

      for(i = 0; i < touchList.length; i++){
        if(touchList[i].identifier === HHgTrackedTouch){
          relX =  touchList[i].pageX;
          relY =  touchList[i].pageY;
          mouseXY = new HHgVector2(relX,relY);
          mouseXY = scene.convertMouseToHolder(mouseXY);
          HHgMouse.doMouseUp( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
          break;
        }
      }
      return false;
      }, false);

    HHgTopHolder.addEventListener("touchmove", function(e){
      //this will become a "can drag" check
      e.preventDefault();
      touchList = e.changedTouches;
      for(i = 0; i < touchList; i++){
        if(touchList[i].identifier === HHgTrackedTouch){
          relX =  touchList[i].pageX;
          relY =  touchList[i].pageY;
          mouseXY = new HHgVector2(relX,relY);
          mouseXY = scene.convertMouseToHolder(mouseXY);
          HHgMouse.doMouseMove( mouseXY   );
          break;
        }
      }
      return false;
      }, false);

    HHgTopHolder.addEventListener("touchcancel", function(e){
      e.preventDefault();
      touchList = e.changedTouches;
      for(i = 0; i < touchList.length; i++){
        if(touchList[i].identifier === HHgTrackedTouch){
          relX =  touchList[i].pageX;
          relY =  touchList[i].pageY;
          mouseXY = new HHgVector2(relX,relY);
          mouseXY = scene.convertMouseToHolder(mouseXY);
          HHgMouse.doMouseCancel( scene.returnHoldersUnderPoint( mouseXY),mouseXY  );
          break;
        }
      }
        return false;
      }, false);
   };

  scene.convertMouseToHolder = function(xy){
    xy = xy.plus(HHgScreenDiff);
    xy.y = HardwareScreen.h - xy.y;

    xy = HHgGameHolder.returnHalfSizeVector().subtractedFrom(xy);
    xy = xy.dividedBy(HHgGameHolder.getScaleNetForChildScale());
    return xy;
  };

  scene.doesHolderContainPoint = function(holder, xy){
    var canvas = holder.getCanvas();
    var mousePos = xy.getCopy();
    var holderCenter = holder.getPositionInScreenOriginal();
    var mouseFinalRelative = mousePos.getVectorRotated(holderCenter, holder.getRotationNet());

    var holderAbsoluteSize = new HHgVector2(holder.getWidthNet(), holder.getHeightNet());
    holderAbsoluteSize.dividedEquals(HHgPixelScale);
    var holderBottomLeft = holderCenter.minus(holderAbsoluteSize.dividedBy(2));
    mouseFinalRelative.minusEquals(holderBottomLeft); //this is just off by half the size


    // if(holder.test === "testTwo"){
    //   console.log("==============");
    //   console.log("Ab size " + holderAbsoluteSize.pretty());
    //   console.log("rotation: ", holder.getRotationNet());
    //   console.log("holder center: " + holderCenter.pretty());
    //   console.log("holder bottom left: " + holderBottomLeft.pretty());
    //   console.log("mouse final " + mouseFinalRelative.pretty());
    // //   console.log("adjusted size " + holderAbsoluteSize.pretty());
    // }

    var left = 0;
    var right = holderAbsoluteSize.x;
    var bottom = 0;
    var top = holderAbsoluteSize.y;
    var posX = mouseFinalRelative.x;
    var posY = mouseFinalRelative.y;

    if(posX < left) return false;

    if(posX > right) return false;

    if(posY > top) return false;

    if(posY < bottom) return false;

    if(canvas !== undefined){
      var canvasRatio = new HHgVector2(canvas.width, canvas.height);
      canvasRatio.dividedEquals(holderAbsoluteSize);
      mouseFinalRelative.timesEquals(canvasRatio);
      if( isAlphaPixel(canvas, mouseFinalRelative.x, mouseFinalRelative.y ) ) return false;
     }
    return true;
  };

  scene.returnHoldersUnderPoint = function(xy){
    var arr = document.getElementsByClassName("mouseable"),

    mArr = [],
    highestZ = -100,
    thisHolder;

    for(var i = 0; i < arr.length; i++ ){
      thisHolder = scene.getHolderFromDiv(arr[i]);

      if(scene.doesHolderContainPoint(thisHolder,xy)){
        if(mArr.length < 1){
          mArr.push(thisHolder);
          continue;
        }

        for(var j = 0; j < mArr.length; j++){
          if(thisHolder.getZIndex() >= mArr[j].getZIndex()){
            mArr.unshift(thisHolder);
            break;
          }
        }
      }
    }
  return mArr;
  };

  scene.getHolderFromDiv = function (div){
    return scene._holders[div.id];
  };

  scene.getCanvasFromDiv = function (div){
    return scene._holders[div.id].getCanvas();
  };

  scene.setBackgroundImageForHolder = function(holder, fileName){
    //holder.getDiv().style.backgroundImage = "url(" + fileName +")";
    var img = new Image();
    img.src = fileName;
    holder.getInsideDiv().appendChild(img);
  };

  scene.setCanvasImageForHolder = function(holder, fileName, whitePixelTintColor){
    var canvas = document.createElement('canvas');
    canvas.classList.add("canvasAsSprite");
    var ctx = canvas.getContext('2d');
    canvas.classList.add(holder.getHash());
    var div = holder.getInsideDiv();
    canvas.width  = 2 * holder.getWidthNet();
    canvas.height = 2 * holder.getHeightNet();
    var color = whitePixelTintColor;

    holder.setCanvas(canvas);

    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = fileName;

    div.appendChild(canvas);
    img.onload = function() {
      ctx.drawImage(img,0,0, canvas.width, canvas.height);
      if(color){
        tintCanvasByColorize(canvas, color);
      }
    };
   };

  var ctx, imgData;
  scene.tintCanvasByFill = function(canvas, color){
    ctx = canvas.getContext("2d");
    ctx.fillStyle = color.returnString();
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "destination-atop";
  };

  function tintCanvasByColorize(canvas, color){
    ctx = canvas.getContext("2d");
    imgData = ctx.getImageData(0,0,canvas.width, canvas.height);

    for(var i = 0; i < imgData.data.length; i+=4){
      if(imgData.data[i+4] === 0) continue;

      imgData.data[i] = imgData.data[i] / 255 * color.R;
      imgData.data[i+1] = imgData.data[i+1] / 255 * color.G;
      imgData.data[i+2] = imgData.data[i+2] / 255 * color.B;
    }
    ctx.putImageData(imgData,0,0);
  };

  function tintCanvasByOverlay(canvas, color){
    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);

    function overlay(a,b){
      a /=255; b /= 255;
      if(a < .5) return 255*2*a*b;
      return 255*(1 - 2*(1-a)*(1-b));
    };

    for(var i = 0; i < imgData.data.length; i+=4){
      if(imgData.data[i+4] === 0) continue;

      imgData.data[i] = overlay(imgData.data[i], color.R);
      imgData.data[i+1] = overlay(imgData.data[i+1], color.G);
      imgData.data[i+2] = overlay(imgData.data[i+2], color.B);
    }
    ctx.putImageData(imgData,0,0);
  };

  function isAlphaPixel(canvas, x, y){
    if(isNaN(x)){
      console.log("FAIL: " + canvas);
      console.log("isAlpha: canvas: " + canvas +" xy: " + x + " y: " + y );
    }
    return canvas.getContext('2d').getImageData(x, y, 1, 1).data[3] > .15 ? false : true;
  };

  function getpixelcolour(canvas, x, y) {
    var cx = canvas.getContext('2d');
    var pixel = cx.getImageData(x, y, 1, 1);
    return {
      r: pixel.data[0],
      g: pixel.data[1],
      b: pixel.data[2],
      a: pixel.data[3]
    };
  };

  scene.maskShapeTriangle = function(props){
    if(props.borderRadius === undefined) return;
    var holder = props.holder;
    var str = "",i,br = props.borderRadius;
    if(br !== undefined){
      for( i = 0; i < br.length; i++){
        str += br[i];
      }
    }
    holder.getInsideDiv().style.borderRadius = str;
  };

  scene.maskShapeEllipse = function(props){
    if(props.borderRadius === undefined) return;

    var holder = props.holder;
    var str = "",i,br = props.borderRadius;
    if(br !== undefined){
      for( i = 0; i < br.length; i++){
        str += br[i];
      }
    }

    holder.getInsideDiv().style.borderRadius = str;
  };

  scene.maskShapeRectangle = function(props){
    if(props.borderRadius === undefined) return;
    var holder = props.holder;
    var str = "",i,br = props.borderRadius;
    if(br !== undefined){
      for( i = 0; i < br.length; i++){
        if(i == 4){
          str += " / ";
        }
        if(br[i] < 1){
          str += (br[i] * 100) + "% ";
        }else{
          str += br[i] * HHgPixelScale + "px ";
        }
      }
    }
    holder.getInsideDiv().style.borderRadius = str;
  };

  scene.removeShape = function(holder){
    holder.getInsideDiv().style.borderRadius = 0;
  };

  scene.addBorderToHolder = function(props){
    var bw = props.borderWidth, holder = props.holder;
    if(bw < .5){
      bw *= holder.getHeightNet();
    }
    props.holder.borderWidthOriginal = bw;
    bw *= HHgPixelScale;
    holder.getInsideDiv().style.border = "" + bw + "px " + props.borderStyle + " " + props.color.returnString();
  };
 };

function HHgUpdateHardwareScreen(){
  //could update landscape etc here
  //this doesn't get called anywhere currently, but will become part of the dynamic screen/landscape to portrait system.
  HardwareScreen.w = window.innerWidth;
  HardwareScreen.h = window.innerHeight;
  if(HHgScreen.isLandscapeGame === true){
    HHgScreenDiff.setXY(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
  }else{
    //eventually change this to support portrait
    HHgScreenDiff.setXY(0, (HardwareScreen.h - (HHgScreen.h * (HardwareScreen.w / HHgScreen.w) ))/2);
  }
  HHgPixelScale = HHgGameHolder.getScaleNetForChildScale().x;
  HHgScene.getDiv().style.maxHeight = "" + HHgGameHolder.getScaleNetForChildScale().x * HHgScreen.maxh + "px";
};









