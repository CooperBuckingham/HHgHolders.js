var HHgGame = {};


(function(){


	HHgGame.doStart = function(){
		//GAME STARTS HERE
	console.log("start game");
		if(false){

			var theOne = HHgGetHolder({w:100,h:100});
			theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-200,-200), isScreenPos: true});
			theOne.doAddSprite("pool");
			theOne.test = "pool";
			theOne.setMouseable(true);
			theOne.setIsDraggable(true);


			var listOfHolder = [];
			listOfHolder.push(theOne);
			theOne.setPositionInScreenTo(new HHgVector2(0,450));
			theOne.doActionMoveInScreenBy({x:0,y: -700,time: 10, easeIn: 20 });
			theOne.doActionRotateBy({rotation:360,time: 30});
			//theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});


			var randomSprite = function(holder){

				var int1 = window.HHg.returnRandomIntLowIncHighExcl(0,3);
				var name = "orange";
				if(int1 === 0){
					name = "soccer";
				}else if(int1 === 2){
					name = "pool";
				}

				holder.doAddSprite(name);
			}

			for(var i = 0; i < 25; i++){

				var size = HHg.returnRandomIntLowIncHighExcl(60,220);

				var posx = HHg.returnRandomIntLowIncHighExcl(-1000,1000);
				var posy = HHg.returnRandomIntLowIncHighExcl(-500,500);
				var testBall = HHgGetHolder({w:size,h:size});

				testBall.doMoveToNewParent( {parent: listOfHolder[ HHg.returnRandomIntLowIncHighExcl(0, listOfHolder.length) ] , position: new HHgVector2(posx, posy) });
				randomSprite(testBall);
				testBall.setMouseable(true);
				testBall.setIsDraggable(true);
				testBall.doActionRotateBy({rotation: HHg.returnRandomInt(120,720), time: HHg.returnRandomInt(5,35)});

				listOfHolder.push(testBall)
			}
		}

		var theOne;
		if(true){

			theOne = HHgGetHolder({w:300,h:300});
			theOne.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(-950,-540), isScreenPos: false});
			
			theOne.doAddSprite("pool");
			theOne.test = "pool";
			theOne.setMouseable(true);
			theOne.setIsDraggable(true);
			//theOne.doAddCanvasText({text: "TBLOCK", vAlign: "bottom", hAlign: "right", fontSize: "200"});
			console.log(HHgColorHelper);
			theOne.doAddParagraphText({text: "TBLOCK\nStuff and stuff", color: "#cccccc", vAlign: "center", hAlign: "center", fontSize: "40", shadow: {x: 5, y: 5, color: "#000000", blur: 2}});



			
			//theOne.setBackgroundRGBA(new HHgColorRGBA(255,0,0));
			var theTwo;
			setTimeout(function(){
				 theTwo = HHgGetHolder({w:200,h:200});
				theTwo.doMoveToNewParent({parent: theOne,position: new HHgVector2(300,300), isScreenPos: false});
				theTwo.doAddSprite("orange", new HHgColorRGBA(0,255,255,.5));
				theTwo.test = "orange";
				theTwo.setMouseable(true);
				theTwo.setIsDraggable(true);
				
		}, 3000);

		var theThree;
			setTimeout(function(){
				return;
				for(var i = -960; i <= 960; i+=100){
					theThree = HHgGetHolder({w:100,h:100});
					theThree.doMoveToNewParent({parent: HHgGameHolder,position: new HHgVector2(i,0), isScreenPos: true});
					theThree.doAddSprite("soccer", new HHgColorRGBA(0,255,255,.5));
					theThree.test = "soccer";
					theThree.setMouseable(true);
					theThree.setIsDraggable(true);
				}
			

		}, 4000);
			
			
			
			//theOne.doActionMoveInScreenBy({x:1900,y: 0,time: 10, easeIn: 25, easeOut: 25});
			
			//theOne.doActionRotateBy({rotation:360,time: 10, easeIn: 25, easeOut: 25});

			theOne.doActionFollowQuad({cx: 0, cy: 540, x: 960, y: -540, time: 10, easeIn: 25, easeOut: 25 });

			//theOne.doActionScaleTo({scaleX:0.25,scaleY:0.25,time: 30});

		}

	}

})();