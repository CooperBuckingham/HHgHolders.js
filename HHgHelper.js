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

	returnPositionProps: function(props, defaultXY){

		if(props instanceof HHgVector2){
			return props;
		}

		if(props.position instanceof HHgVector2){
			return props.position;
		}else if(props.positionXY instanceof HHgVector2){
			props.position = props.positionXY;
			return props.position;
		}

		if(props.position){
			props.position = new HHgVector2(props.position, props.position);
			return props.position;
		}

		var x, y;

			x = props.positionX || props.x;
			y = props.positionY || props.y;

			defaultXY = defaultXY || new HHgVector2(0,0);

			x = x || defaultXY.getX();
			y = y || defaultXY.getY();
		
		props.position = new HHgVector2(x, y);
		return props.position;

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

		if(props.size){
			props.size = new HHgVector2(props.size, props.size);
			return props.size;
		}

		var w, h;

			w = props.w || props.width;
			h = props.h || props.height;

			w = w || HHgGameHolder.getWidthOriginal();
			h = h || HHgGameHolder.getHeightOriginal()
		
		props.size = new HHgVector2(w, h);
		return props.size;

	},

	returnScaleProps: function(props, defaultXY){
		
		if(props instanceof HHgVector2){
			return props;
		}

		if(!isNaN(props)){
			return new HHgVector2(props, props);
		}

		if(props.scale instanceof HHgVector2){
			return props.scale;
		}else if(props.scaleXY instanceof HHgVector2){
			props.scale = props.scaleXY;
			return props.scale;
		}

		if(props.scale){
			props.scale = new HHgVector2(props.scale, props.scale);
			return props.scale;
		}

		var x, y;
		defaultXY = defaultXY || new HHgVector2(1,1);

			x = props.scaleX ;
			y = props.scaleY ;

			x = x || defaultXY.getY();
			y = y || defaultXY.getX();


			x = x || 1;
			y = y || 1;

		props.scale = new HHgVector2(x, y);
		return props.scale;
	},

	returnRotationProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.rotation){
			return props.rotation;
		}

		if(props.rot){
			props.rotation = props.rot;
			return props.rot
		}

		if(props.rotate){
			props.rotation = props.rotate;
			return props.rotation;
		}

	},

	returnSpeedProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.speed){
			return props.speed;
		}

		if(props.s){
			props.speed = props.s;
			return props.speed
		}

		return undefined;

	},

	returnTimeProps: function(props){

		if(!isNaN(props)){
			return props;
		}

		if(props.time){
			return props.time;
		}

		if(props.t){
			props.time = props.t;
			return props.time;
		}

		if(props.seconds){
			props.time = props.seconds;
			return props.time;
		}

		props.time = 0;

		return props.time;

	},

	returnEaseProps: function(props){

		if(typeof props === "string"){
			return props;
		}

		if(props.ease){
			return props.ease;
		}

		props.ease = "none";

		return props.ease;

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

		if(props.control){
			props.control = new HHgVector2(props.control, props.control);
			return props.control;
		}

		return undefined;

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

	

}




