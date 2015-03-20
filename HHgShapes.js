var HHgShape = {};

(function(){

  var shapeData, holder;
  function getShapeData(props){
    shapeData = {};

    shapeData.size = HHg.returnSizeProps(props);
    if(shapeData.size === undefined){
      shapeData.size = HHg.returnPositionProps(props);
    }
    shapeData.color = HHg.returnColorProps(props);
    shapeData.borderRadius = HHg.returnBorderRadiusProps(props);

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


}());


var HHgShapeHelper = {

}