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
			props = {position: props};
			return props.position;
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
		if(!isNaN(props) ){
			props = {zIndex: props};
			return props.zIndex;
		}

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
			props.zIndex = props.Z;
			return props.zIndex;
		}

		props.zIndex = 1;
		return props.zIndex;
	},

	returnSizeProps: function(props){

		if(props instanceof HHgVector2){
			props = {size: props};
			return props.size;
		}

		if(props.size instanceof HHgVector2){
			return props.size;
		}else if(props.sizeXY instanceof HHgVector2){
			props.size = props.sizeXY;
			return props.size;
		}

		if(props.size !== undefined){
				if(props.size.w !== undefined){
					props.size = new HHgVector2(props.size.w, props.size.h);
					return props.size;
				}
				if(props.size.x !== undefined){
					props.size = new HHgVector2(props.size.x, props.size.y);
					return props.size;
				}
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
			props = {scale: new HHgVector2(1,1) }
			return props.scale;
		}

		if(props instanceof HHgVector2){
			props = {scale: props};
			return props.scale;
		}

		if(!isNaN(props)){
			props = {scale: new HHgVector2(props, props)};
			return props.scale;
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
			props = {rotation: props};
			return props.rotation;
		}

		if(props.rotation !== undefined){
			return props.rotation;
		}

		if(props.rot !== undefined){
			props.rotation = props.rot;
			return props.rotation;
		}

		if(props.rotate !== undefined){
			props.rotation = props.rotate;
			return props.rotation;
		}

		props.rotation = undefined;
		return props.rotation;

	},

	returnSpeedNProps: function(props){

		if(!isNaN(props)){
			props = {speed: props};
			return props.speed;
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

	returnSpeedXYProps: function(props){

		if(props instanceof HHgVector2){
			props = {speed: props};
			return props.speed;
		}

		if(props.speed instanceof HHgVector2){
			return props.speed;
		}else if(props.speedXY instanceof HHgVector2){
			props.speed = props.speedXY;
			return props.speed;
		}

		if(props.speed !== undefined){
				if(props.speed.x !== undefined){
					props.speed = new HHgVector2(props.speed.x, props.speed.y);
					return props.speed;
				}

			if(props.speed.X  !== undefined){
				props.speed = new HHgVector2(props.speed.X, props.speed.Y);
				return props.speed;
			}

			props.speed = new HHgVector2(props.speed, props.speed);
			return props.speed;
		}



		if(props.speedX  !== undefined){
			props.speed = new HHgVector2(props.speedX, props.speedY);
			return props.speed;
		}

		return props.speed;
	},

	returnTimeProps: function(props){

		if(!isNaN(props)){
			props = {time: props};
			return props.time;
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

		if(props.onFinish){
			props.onComplete = props.onFinish;
			return props.onComplete;
		}

		props.onComplete = undefined;

		return props.onComplete;

	},

	returnControlPositionProps: function(props){

		if(props instanceof HHgVector2){
			props = {control: props};
			return props.control;
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
			props = {color: props};
			return props.color;
		}
		if(props.color instanceof HHgColorRGBA === true ){
			return props.color;
		}

		if(props instanceof HHgColorHSLA === true){
			props = {color: HHgColorHelper.getRGBfromHSL(props)};
			return props.color;
		}
		if(props.color instanceof HHgColorHSLA === true){
			props.color = HHgColorHelper.getRGBfromHSL(props.color);
			return props.color;
		}

		function stringTest(test){
				if(typeof test !== "string") return false;

				if(test[0] === "#"){

					test = new HHgColorRGBA(HHgColorHelper.getRGBfromHex(test));
					return test;
				}

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

		var test;
		test = stringTest(props.color);
		if(test){
			props.color = test;
			return props.color;
		};

		test = stringTest(props);
		if(test){
			props = {color: test};
			return props.color;
		};


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

			return test;
		}

		test = RGBHSLtest(props.color);
		if(test){
			props.color = test;
			return props.color;
		}

		test = RGBHSLtest(props);
		if(test){
			props = {color: test};
			return props.color;
		}


		return undefined;

	},

	returnIsScreenPosProps: function(props){
		if(props === undefined){
			props = {isScreenPos: false};
			return props.isScreenPos;
		}

		if(typeof props === "boolean"){
			props = {isScreenPos: props};
			return props.isScreenPos;
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




