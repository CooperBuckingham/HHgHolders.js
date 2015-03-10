
var HHgObjectPool = {};
var HHgGetHolder;
var HHgReleaseHolder;


(function (){

	var availablePool = Object.create(null);

	var tempHolder;
	var tempHolder2;
	var runningCount = 0;

	HHgObjectPool.doStart = function(numberOfCachedHolders){
		numberOfCachedHolders = numberOfCachedHolders || 100;

		for(var i = 0; i < numberOfCachedHolders; i++){
			tempHolder = new HHgHolder(1,1);
			availablePool[tempHolder.getHash()] = tempHolder;
			runningCount++;
		}
	};

	HHgGetHolder = HHgObjectPool.getHolder = function(w, h, zIndex, scale){
		

		for(tempHolder in availablePool){
			tempHolder2 = availablePool[tempHolder];
			runningCount--;
			delete availablePool[tempHolder];
			//set new height and width
			tempHolder2.setNewWidthHeight(w, h, zIndex, scale);

			return tempHolder2;
		}

		console.log("WARNING: no available holders, creating new");
		return new HHgHolder(w, h, zIndex, scale);

	};

	HHgReleaseHolder = HHgObjectPool.releaseHolder = function(holder){
		
		if(availablePool.hasOwnProperty(holder.getHash())){
			console.log("WARNING: attempting to release previously released holder");
			return;
		}
		//maybe clear out sprite, don't know
		runningCount++;
		holder.killHolder();
		availablePool[tempHolder.getHash()] = tempHolder;


	};


})();



