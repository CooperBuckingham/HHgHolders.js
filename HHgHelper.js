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
		return Math.Random() * (highExcl - lowInc) + lowInc;
	},

	returnRandomIntLowIncHighExcl : function(lowInc, highExcl){
		return Math.floor(Math.Random() * (highExcl - lowInc) + lowInc);
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

	doVectorCheck: function(xy, y){
		if(xy instanceof HHgVector2 === false){
			return new HHgVector2(xy, y);
		}

		return xy;
	},

}




