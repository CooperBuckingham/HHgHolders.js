var HHg = {
	returnNTestedObjects:function(arr, test, n){
		n ? n : n = arr.length;
		var returnArr = [];
		var count = 0;
			for(var i = 0; i < arr.length; i++){
				test ? returnArr.push(arr[i]): ;
				if(count >= n){
					break;
				}
			}

		return returnArr;
	}
}




