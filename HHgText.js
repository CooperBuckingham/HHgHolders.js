
var HHgText = function(){

	var that = this;

	this.doAddTextToHolder = function(owner, props){
		HHgTextHelper.returnTextProps(props);
		HHgTextHelper.returnFontSizeProps(props);
		HHgTextHelper.returnFontTypeProps(props);
		HHgTextHelper.returnHAlignProps(props);
		HHgTextHelper.returnVAlignProps(props);
		HHg.returnColorProps(props);

		HHgScene.doAddTextDiv(owner);

	}

};


var HHgTextHelper = function HHgTextHelper(){

	if(HHgTextHelper.singleton){
		return HHgTextHelper.singleton;
	}

	HHgTextHelper.singleton = this;

	this.returnTextProps = function(props){
		if(typeof props === "string"){
			return props;
		}
		if(typeof props.text === "string"){
			return props.text;
		}
		if(typeof props.string === "string"){
			props.text = props.string;
			return props.text;
		}
	}
	this.returnFontSizeProps = function(props){
		if(typeof props === "number"){
			return props;
		}
		if(typeof props.fontSize === "number"){
			return props.fontSize;
		}

	}
	this.returnFontTypeProps = function(props){
		//use some system here
		props.fontType = "fontTypeTemp";
		return props.fontType;
	}
	this.returnHAlignProps = function(props){

		switch(props.hAlign){
			case "center":
			case "middle":
			case 1:
			props.hAlign = 1;
			break;

			case "left":
			case 0:
			props.hAlign = 0;
			break;

			case "right":
			case 2:
			props.hAlign = 2;
			break;

			default:
			props.hAlign = 1;
		}

		return props.hAlign;

	}
	this.returnVAlignProps = function(props){
			switch(props.vAlign){
			case "center":
			case "middle":
			case 1:
			props.vAlign = 1;
			break;

			case "top":
			case 0:
			props.vAlign = 0;
			break;

			case "bottom":
			case 2:
			props.vAlign = 2;
			break;

			default:
			props.vAlign = 1;
		}

		return props.vAlign;
	}




	return this;

}();
