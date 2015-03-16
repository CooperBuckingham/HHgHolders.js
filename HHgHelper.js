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
		var returnNow = false;

		if(props.easeIn !== undefined){
			returnNow = true;
		}else if(props.in !== undefined){
			props.easeIn = props.in;
			returnNow = true;
		}

		if(props.easeOut !== undefined){
			returnNow = true;
		}else if(props.out !== undefined){
			props.easeOut = props.out;
			returnNow = true;
		}

		if(returnNow) return props;

		if(props.ease !== undefined){
			if(!isNaN(props.ease)){
				props.ease = {easeIn: props.ease, easeOut: props.ease};
			}else{
				return this.returnEaseProps(props.ease)
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

		if(props instanceof HHgColorRGBA === true || props instanceof HHgColorHSLA === true){
			return props.returnSimpleObject();
		}

		if(typeof props === "string"){
			switch(props){
				case "red":
				//return object with RGB
				break;
				case "green":
				//return object with RGB
				break;
				case "blue":
				//return object with RGB
				break;
			}
		}

		if("H" in props){

		}else if("h" in props){
			props.H = props.h;
		}else if("hue" in props){
			props.H = props.hue;
		}

		if("S" in props){

		}else if("s" in props){
			props.S = props.s;
		}else if("saturation" in props){
			props.S = props.saturation;
		}

		if("L" in props){

		}else if("l" in props){
			props.L = props.l;
		}else if("lightness" in props){
			props.L = props.lightness;
		}

		if("A" in props){

		}else if("a" in props){
			props.A = props.a;
		}else if("alpha" in props){
			props.A = props.alpha;
		}else{
			props.A = 1;
		}


		if("R" in props){

		}else if("r" in props){
			props.R = props.r;
		}else if("red" in props){
			props.R = props.red;
		}

		if(props.G !== undefined){

		}else if(props.g !== undefined){
			props.G = props.g;
		}else if(props.green !== undefined){
			props.G = props.green;
		}

		if(props.B !== undefined){

		}else if(props.b !== undefined){
			props.B = props.b;
		}else if(props.blue !== undefined){
			props.B = props.blue;
		}

		if(props.R !== undefined){
			return {R: props.R, G: props.G, B: props.B, A: props.A};
		}

		if(props.H !== undefined){
			return {H: props.H, S: props.S, L: props.L, A: props.A};
		}
		

	},

	returnIsScreenPosProps: function(props){
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




