
function(window){

window.HHgObjectPool = {

	returnNNumberOfObjects: function(n){
		return HHg.returnNNumberOfObjects(n);
	},
}

//add to pool
	for(var i = 0; i < 100; i++){
		window.HHgObjectPool[""+i] = {number: i};
	}

}(window);


