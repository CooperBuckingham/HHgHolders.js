var HHgShape = {};

var HHgDefaultBorderColor = new HHgColorRGBA(0,0,0,.8);

(function(){

  var shapeData = {}, holder;
  function getShapeData(props){
    shapeData = {};

    shapeData.color = HHg.returnColorProps(props);
    shapeData.borderRadius = HHgShapeHelper.returnBorderRadiusProps(props);

    return shapeData;
  }

HHgShape.addRectangle = function(holder,props){
  shapeData = getShapeData(props);

   shapeData.holder = holder;
   holder.setBackgroundColor(shapeData.color);

    HHgScene.maskShapeRectangle(shapeData);
     return shapeData.holder;

}

HHgShape.addEllipse = function(holder,props){
   shapeData = getShapeData(props);

   shapeData.holder = holder;
   holder.setBackgroundColor(shapeData.color);

    HHgScene.maskShapeEllipse(shapeData);
     return shapeData.holder;

}


HHgShape.addTriangle = function(holder,props){
    shapeData = getShapeData(props);

   shapeData.holder = holder;
   holder.setBackgroundColor(shapeData.color);

    HHgScene.maskShapeTriangle(shapeData);
     return shapeData.holder;

}

HHgShape.removeShape = function(holder){
  holder.setBackgroundColor(HHgColorTransparent);
  HHgScene.removeShape(holder);
  return holder;
}

HHgShape.addOutline = HHgShape.addBorder = function(holder,props){

  shapeData.color = HHg.returnColorProps(props);
  if(shapeData.color === undefined) shapeData.color = HHgDefaultBorderColor;
  shapeData.borderWidth = HHgShapeHelper.returnBorderWidthProps(props);
  shapeData.borderStyle = HHgShapeHelper.returnBorderStyleProps(props);
  shapeData.holder = holder;

  HHgScene.addBorderToHolder(shapeData);
  return holder;
}

}());


var HHgShapeHelper = {
  returnBorderWidthProps: function(props){
    if(props === undefined) return undefined;

    var check = HHg.returnPercentOrPixelProps(props);
    if(check !== undefined) return check;

    check = HHgShapeHelper.returnBorderWidthProps(props.borderWidth);
    if(check !== undefined) return check;
    check = HHgShapeHelper.returnBorderWidthProps(props.lineWidth);
    if(check !== undefined) return check;
    check = HHgShapeHelper.returnBorderWidthProps(props.width);
    if(check !== undefined) return check;

  },

  returnBorderRadiusProps: function(props){

    if(props === undefined) return undefined;

    if(!isNaN(props)){
      return [props];
    }

    if(typeof props === "string"){
      if(props[props.length - 1] === "\%"){
        return [parseFloat(props) / 100];
      }else{
        return [parseFloat(props)];
      }
    }

    if(props.length === +props.length){
      for(var i = 0; i < props.length; i++){
        props[i] = HHgShapeHelper.returnBorderRadiusProps(props[i]);
      }

      return props;
    }

    if(props.borderRadius !== undefined) return HHgShapeHelper.returnBorderRadiusProps(props.borderRadius);
    if(props.radius !== undefined) return HHgShapeHelper.returnBorderRadiusProps(props.radius);
    if(props.corner !== undefined) return HHgShapeHelper.returnBorderRadiusProps(props.corner);


  },

  returnBorderStyleProps: function(props){
    if(props === undefined) return undefined;

    switch(props){
      case "dashed":
      case "dotted":
      case "solid":
      case "double":
      case "groove":
      case "ridge":
      case "inset":
      case "outset":
      return props;
      break;

      case "3d":
      case "beveled":
      case "bevel":
      return "outset";
      break;

      case "dash":
      return "dashed";
      break;

      case "dots":
      return "dotted";
      break;

      case "none":
      case "delete":
      case "remove":
      return "none";
      break;

      default:
      return "solid";
      break;
    }
  }
}








