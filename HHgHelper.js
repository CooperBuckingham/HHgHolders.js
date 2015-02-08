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
	}


}

doRemoveThingFromArray = function(arr,thing){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] === arr){
			arr.splice(i,1);
			return true;
		}
	}
	return false;
}




