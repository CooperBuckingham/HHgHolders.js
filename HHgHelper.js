var HHg = {

	returnNTestedObjects:function(arr, test, n){
		n ? n : n = arr.length;
		var returnArr = [];
		var count = 0;
			for(var i = 0; i < arr.length; i++){
				test(arr[i]) ? returnArr.push(arr[i]): false ;
				if(count >= n){
					break;
				}
			}

		return returnArr;
	},

	returnRandomFloatLowIncHighExcl : function(lowInc, highExcl){
		return Math.random() * (highExcl - lowInc) + lowInc;
	},

	returnRandomInt : function(lowInc, highExcl){
	return Math.random() * (highExcl - lowInc) + lowInc;

	},

	returnRandomIntLowIncHighExcl : function(lowInc, highExcl){
		return Math.floor(Math.random() * (highExcl - lowInc) + lowInc);
	},

	doRemoveThingFromArray: function(arr,thing){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] === thing){
			arr.splice(i,1);
			return true;
		}
	}
	return false;
	},

	doForEach: function(arr, func){
		for(var i = 0; i < arr.length; i++){
			func(arr[i]);
		}
	},

	doDegreesToRads: function(degrees){
		return degrees*Math.PI/180;
	},

	returnPositionProps: function(props){

		if(props instanceof HHgVector2){
			return props;
		}

		if(props.position instanceof HHgVector2){
			return props.position;
		}else if(props.positionXY instanceof HHgVector2){
			props.position = props.positionXY;
			return props.position;
		}

		if(props.position !== undefined){
			props.position = new HHgVector2(props.position, props.position);
			return props.position;
		}

		if(props.x !== undefined){
			props.position = new HHgVector2(props.x, props.y);
			return props.position;
		}

		if(props.X  !== undefined){
			props.position = new HHgVector2(props.X, props.Y);
			return props.position;
		}

		if(props.positionX  !== undefined){
			props.position = new HHgVector2(props.positionX, props.positionY);
			return props.position;
		}

		props.position = new HHgVector2(0,0);

		return props.position;

	},

	returnZIndexProps: function(props){
		if(!isNaN(props) ) return props;

		if(props.zIndex !== undefined){
			return props.zIndex;
		}

		if(props.ZIndex !== undefined){
			props.zIndex = props.ZIndex;
			return props.zIndex;
		}

		if(props.z !== undefined){
			props.zIndex = props.z;
			return props.zIndex;
		}

		if(props.Z !== undefined){
			props.zIndex = props.z;
			return props.zIndex;
		}

		props.zIndex = 1;
		return props.zIndex;
	},

	returnSizeProps: function(props){

		if(props instanceof HHgVector2){
			return props;
		}
		
		if(props.size instanceof HHgVector2){
			return props.size;
		}else if(props.sizeXY instanceof HHgVector2){
			props.size = props.sizeXY;
			return props.size;
		}

		if(props.size !== undefined){
			props.size = new HHgVector2(props.size, props.size);
			return props.size;
		}

	
		if(props.w !== undefined){
			props.size = new HHgVector2(props.w, props.h);
			return props.size;
		}

		if(props.W !== undefined){
			props.size = new HHgVector2(props.W, props.H);
			return props.size;
		}

		if(props.width !== undefined){
			props.size = new HHgVector2(props.width, props.height);
			return props.size;
		}
		
		props.size = new HHgVector2(HHgGameHolder.getWidthOriginal(), HHgGameHolder.getHeightOriginal());
		return props.size;

	},

	returnScaleProps: function(props){
		if(props === undefined){
			return new HHgVector2(1,1);
		}

		if(props instanceof HHgVector2){
			return props;
		}

		if(!isNaN(props)){
			return new HHgVector2(props, props);
		}

		if(props.scale instanceof HHgVector2){
			return props.scale;
		}

		if(props.scaleXY instanceof HHgVector2){
			props.scale = props.scaleXY;
			return props.scale;
		}

		if(props.scale !== undefined){
			props.scale = new HHgVector2(props.scale, props.scale);
			return props.scale;
		}

		if(props.scaleX !== undefined){
			props.scale = new HHgVector2(props.scaleX, props.scaleY);
			return props.scale;
		}

		props.scale = new HHgVector2(1,1);

		return props.scale;
	},

	returnRotationProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.rotation !== undefined){
			return props.rotation;
		}

		if(props.rot !== undefined){
			props.rotation = props.rot;
			return props.rot
		}

		if(props.rotate !== undefined){
			props.rotation = props.rotate;
			return props.rotation;
		}

		props.rotation = undefined;
		return props.rotation;

	},

	returnSpeedProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.speed !== undefined){
			return props.speed;
		}

		if(props.s !== undefined){
			props.speed = props.s;
			return props.speed
		}
		props.speed = undefined;
		return undefined;

	},

	returnTimeProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.time !== undefined){
			return props.time;
		}

		if(props.t !== undefined){
			props.time = props.t;
			return props.time;
		}

		if(props.seconds !== undefined){
			props.time = props.seconds;
			return props.time;
		}

		props.time = 0;

		return props.time;

	},

	returnEaseProps: function(props){
		

		if(props.easeIn !== undefined){
			
		}else if(props.in !== undefined){
			props.easeIn = props.in;
			
		}

		if(props.easeOut !== undefined){
	
		}else if(props.out !== undefined){
			props.easeOut = props.out;
		}

		if(props.easeIn !== undefined || props.easeOut !== undefined){
			props.ease = {easeOut: props.easeOut, easeIn: props.easeIn};
			return props.ease;
		}

		if(props.ease !== undefined){
			if(!isNaN(props.ease)){
				props.ease = {easeOut: props.ease, easeIn: props.ease};
				return props.ease;
				
			}else{
				return props.ease;
			}
			
		}
		
		return undefined;

	},

	returnOnCompleteProps: function(props){

		if(props.onComplete){
			return props.onComplete;
		}

		if(props.complete){
			props.onComplete = props.complete;
			return props.onComplete;
		}

		props.onComplete = undefined;

		return props.onComplete;

	},

	returnControlPositionProps: function(props){

		if(props instanceof HHgVector2){
			return props;
		}

		if(props.control instanceof HHgVector2){
			return props.control;
		}else if(props.controlXY instanceof HHgVector2){
			props.control = props.controlXY;
			return props.control;
		}else if(props.controlPosition instanceof HHgVector2){
			props.control = props.controlXY;
			return props.control;
		}

		if("control" in props){
			props.control = new HHgVector2(props.control, props.control);
			return props.control;
		}

		if("cx" in props ){
			props.control = new HHgVector2(props.cx, props.cy);
			return props.control;
		}

		if("cX" in props){
			props.control = new HHgVector2(props.cX, props.cY);
			return props.control;
		}

		props.control = new HHgVector2(0,0);


		return props.control;

	},

	returnColorProps: function(props){

		if(props instanceof HHgColorRGBA === true ){
			return props;
		}
		if(props.color instanceof HHgColorRGBA){
			return props.color;
		}
		if(props instanceof HHgColorHSLA === true){
			props = HHgColorHelper.getRGBfromHSL(props);
			return props;
		}
		if(props.color instanceof HHgColorHSLA === true){
			props.color = HHgColorHelper.getRGBfromHSL(props.color);
			return props.color;
		}

		function stringTest(test){
				if(typeof test !== "string") return false;

				switch(test){
					case "red":
					test = new HHgColorRGBA(255,0,0);
					return test;
					break;
					case "green":
					test = new HHgColorRGBA(0,255,0);
					return test;
					break;
					case "blue":
					test = new HHgColorRGBA(0,0,255);
					return test;
					break;
					case "white":
					test = new HHgColorRGBA(255,255,255);
					return test;
					break;
					case "black":
					test = new HHgColorRGBA(0,0,0);
					return test;
					break;
				}
				console.log("ERROR: unsupported color string: ", test);
				return false;
		}

		if(stringTest(props.color)) return props.color;
		if(stringTest(props)) return props;

		function RGBHSLtest(test){
			if(test === undefined) return false;

			if("H" in test){
				test = new HHgColorHelper.getRGBfromHSL(test.H, test.S, test.L, test.A || 1);
			}else if("hue" in props){
				test = new HHgColorHelper.getRGBfromHSL(test.hue, test.saturation, test.lightness, test.alpha || 1);
			}

			if("R" in test){
				test = new HHgColorRGBA(test.R, test.G, test.B, test.A || 1);
			}else if("r" in props){
				test = new HHgColorRGBA(test.r, test.g, test.b, test.a || 1);
			}else if("red" in props){
				test = new HHgColorRGBA(test.red, test.green, test.blue, test.alpha || 1);
			}

			return (test instanceof HHgColorRGBA);
		}

		if(RGBHSLtest(props.color)) return props.color;
		if(RGBHSLtest(props)) return props;

		return undefined;
		
	},

	returnIsScreenPosProps: function(props){
		if(props === undefined) return false;

		if(typeof props === "boolean"){
			return props;
		}

		if(props.isScreenPos !== undefined){
			return props.isScreenPos;
		}

		if(props.isParentPos !== undefined){
			props.isScreenPos = !props.isParentPos;
			return props.isScreenPos;
		}

		if(props.screenPos !== undefined){
			props.isScreenPos = props.screenPos;
			return props.isScreenPos;
		}

		if(props.parentPos !== undefined){
			props.isScreenPos = !props.parentPos;
			return props.isScreenPos;
		}

		props.isScreenPos = false;
		return props.isScreenPos;

	},

	testVector: function(xy){
		console.log("vector: " + xy.returnPretty());
	},



	zValues : {
		scene: 0,
		gameplay: 100,
		gameUI: 200,
		menus: 300,
		mouse: 400,
	},

	roundNumToPlaces: function(num, places){
		places = Math.pow(10, places);
		return Math.round(num * places)/places;
	},

	

}




