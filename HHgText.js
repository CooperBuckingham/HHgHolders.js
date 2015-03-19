
var HHgText = {};

(function(){


	var that = HHgText;



	that.doAddTextParagraphToHolder = function(owner, props){

		HHgScene.doAddTextDiv(owner, {text:that.returnTextProps(props),
																	 fontSize: that.returnFontSizeProps(props),
																	 fontStyle: that.returnFontProps(props),
																	 hAlign: that.returnHAlignProps(props),
																	 vAlign: that.returnVAlignProps(props),
																	 color: HHg.returnColorProps(props),
																	 shadow: that.returnShadowProps(props)
																	});

	}

	that.doAddTextCanvasToHolder = function(owner, props){

		HHgScene.doAddTextToCanvas(owner, {text:that.returnTextProps(props),
																	 fontSize: that.returnFontSizeProps(props),
																	 fontStyle: that.returnFontProps(props),
																	 hAlign: that.returnHAlignProps(props),
																	 vAlign: that.returnVAlignProps(props),
																	 color: HHg.returnColorProps(props),
																	 shadow: that.returnShadowProps(props),
																	 size: {width: 1, height: 1}
																	});

	}

	//TODO stroke processing

	that.returnShadowProps = function(props){
		if(props.shadow === undefined) return props.shadow;

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

			props.shadow.color = HHg.returnColorProps(props.shadow);

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
			props.text = props.string;
			return props.text;
		}

		props.text = "EMPTY STRING"; console.log("WARNING: empty string sent to text field");
		return props.text;
	}
	that.returnFontSizeProps = function(props){
		if(typeof props === "number"){
			return props;
		}
		if(typeof props.fontSize === "number"){
			return props.fontSize;
		}

		if(typeof props.fontSize === "string"){
			props.fontSize = parseFloat(props.fontSize);
			return props.fontSize;
		}

		props.fontSize = 32;
		return props.fontSize;

	}
	that.returnFontProps = function(props){
		//use some system here
		props.font = "Helvetica";
		return props.font;
	}
	that.returnHAlignProps = function(props){

		switch(props.hAlign){
			case "center":
			case "middle":
			case 1:
			props.hAlign = "center";
			break;

			case "left":
			case 0:
			props.hAlign = "left";
			break;

			case "right":
			case 2:
			props.hAlign = "right";
			break;

			default:
			props.hAlign = "center";
		}

		return props.hAlign;

	}
	that.returnVAlignProps = function(props){

			switch(props.vAlign){
			case "center":
			case "middle":
			case 1:
			props.vAlign = "middle";
			break;

			case "top":
			case 0:
			props.vAlign = "top";
			break;

			case "bottom":
			case 2:
			props.vAlign = "bottom";
			break;

			default:
			props.vAlign = "middle";
		}

		return props.vAlign;
	}


})();
