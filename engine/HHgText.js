
var HHgText = {};

var HHgDefaultShadowColor = new HHgColorRGBA(0,0,0,.36),
    HHgDefaultTextColor = new HHgColorRGBA(240,240,240,1),
    HHgDefaultFontSize = 32;
    HHgDefaultBackgroundColor = new HHgColorRGBA(150,150,150,1);

(function(){
  var that = HHgText;
  that.doAddTextParagraphToHolder = function(owner, props){

    HHgScene.doAddTextDiv(owner, {text:that.returnTextProps(props),
                                   fontSize: that.returnFontSizeProps(props),
                                   fontStyle: that.returnFontProps(props),
                                   hAlign: that.returnHAlignProps(props),
                                   vAlign: that.returnVAlignProps(props),
                                   color: HHg.returnColorProps(props) || HHgDefaultTextColor,
                                   shadow: that.returnShadowProps(props)
                                  });

  }

  that.doAddTextCanvasToHolder = function(owner, props){

    HHgScene.doAddTextToCanvas(owner, {text:that.returnTextProps(props),
                                   fontSize: that.returnFontSizeProps(props),
                                   fontStyle: that.returnFontProps(props),
                                   hAlign: that.returnHAlignProps(props),
                                   vAlign: that.returnVAlignProps(props),
                                   color: HHg.returnColorProps(props) || HHgDefaultTextColor,
                                   shadow: that.returnShadowProps(props),
                                   size: {width: 1, height: 1}
                                  });

  }

  //TODO stroke processing

  that.returnShadowProps = function(props){
    if(props === undefined) return undefined;

    if(props.shadow === undefined) return undefined;

      if(props.shadow.x !== undefined){
        //good to go
      }else if(props.shadow.w !== undefined){
        props.shadow.x = props.shadow.w;
        props.shadow.y = props.shadow.h; if(props.shadow.y === undefined) props.shadow.y = props.shadow.x;
      }else if(props.shadow.offsetX !== undefined){
        props.shadow.x = props.shadow.offsetX;
        props.shadow.y = props.shadow.offsetY; if(props.shadow.y === undefined) props.shadow.y = props.shadow.x;
      }else if(props.shadow.offset !== undefined){
        props.shadow.x = props.shadow.offset;
        props.shadow.y = props.shadow.offset;
      }else{
        props.shadow.x = 1;
        props.shadow.y = 1;
      }

      if(typeof props.shadow.x === "string"){
        props.shadow.x = parseFloat(props.shadow.x);
        props.shadow.y = parseFloat(props.shadow.y);
      }

      if(props.shadow.blur !== undefined){
        //good to go
      }else if(props.shadow.radius !== undefined){
        props.shadow.blur = parseFloat(props.shadow.radius);
      }

      props.shadow.color = HHg.returnColorProps(props.shadow.color);

      if(props.shadow.color === undefined){
        props.shadow.color === HHgDefaultShadowColor;
      }

      return props.shadow;

  }

  that.returnTextProps = function(props){
    if(typeof props === "string"){
      return props;
    }
    if(typeof props.text === "string"){
      return props.text;
    }
    if(typeof props.string === "string"){
      return props.string;
    }

    return "";

  }
  that.returnFontSizeProps = function(props){
    if(typeof props === "number"){
      return props;
    }
    if(typeof props.fontSize === "number"){
      return props.fontSize;
    }

    if(typeof props.fontSize === "string"){
      return parseFloat(props.fontSize);
    }

    return HHgDefaultFontSize;

  }
  that.returnFontProps = function(props){
    //use some system here
    return "Helvetica";

  }
  that.returnHAlignProps = function(props){

    switch(props.hAlign){
      case "center":
      case "middle":
      case 1:
      return "center";
      break;

      case "left":
      case 0:
      return "left";
      break;

      case "right":
      case 2:
      return "right";
      break;

      default:
      return "center";
    }

  }
  that.returnVAlignProps = function(props){

      switch(props.vAlign){
      case "center":
      case "middle":
      case 1:
      return "middle";
      break;

      case "top":
      case 0:
      return "top";
      break;

      case "bottom":
      case 2:
      return "bottom";
      break;

      default:
      return "middle";
    }

  }


})();
