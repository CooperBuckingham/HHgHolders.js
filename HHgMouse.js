var HHgMouse = {

	
	

	doStart : function doStart(){

		HHgScene.doAddMouseDownAndUpListeners();

	},


	doMouseDown : function doMouseDown(holders){
		console.log("mousedown");
		
		HHg.doForEach(holders, function(thing){
			thing.setBackgroundColor(25, .7,.7,.8);
		});
		
	},

	doMouseUp : function doMouseUp(holders){

		
		HHg.doForEach(holders, function(thing){
			thing.setBackgroundColor(156, .7,.7,.8);
		});
		
	},

}