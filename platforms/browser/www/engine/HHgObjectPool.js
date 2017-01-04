var HHgObjectPool = {};
var HHgGetHolder;
var HHgReleaseHolder;
var HHgPlaceTestSprite;


(function () {

  var availablePool = Object.create(null);

  var tempHolder;
  var tempHolder2;
  var runningCount = 0;

  HHgObjectPool.doStart = function (numberOfCachedHolders) {

    //hacking the cache to be empty for now.
    // numberOfCachedHolders = 0;
    //
    // for(var i = 0; i < numberOfCachedHolders; i++){
    //   tempHolder = new HHgHolder({w:1,h:1});
    //   availablePool[tempHolder.getHash()] = tempHolder;
    //   runningCount++;
    // }
  };


  HHgGetHolder = HHgObjectPool.getHolder = function (props) {

    // for(tempHolder in availablePool){
    //   tempHolder2 = availablePool[tempHolder];
    //   runningCount--;
    //   delete availablePool[tempHolder];
    //   //set new height and width
    //   tempHolder2.setNewStats(props);
    //
    //   return tempHolder2;
    // }

    //HHg.warn("WARNING: no available holders, creating new");
    return new HHgHolder(props);
  };

  // HHgReleaseHolder = HHgObjectPool.releaseHolder = function(holder){
  //
  //   if(availablePool.hasOwnProperty(holder.getHash())){
  //     HHg.warn("WARNING: attempting to release previously released holder");
  //     return;
  //   }
  //   //maybe clear out sprite, don't know
  //   runningCount++;
  //   holder.killHolder();
  //   availablePool[tempHolder.getHash()] = tempHolder;
  // };

  HHgPlaceTestSprite = HHgObjectPool.placeTestSprite = function (xy) {
    var testHolder = HHgGetHolder({w: 100, h: 100});
    testHolder.doMoveToNewParent({parent: HHgGameHolder, position: xy});
    testHolder.doAddSprite("soccer", new HHgColorRGBA(0, 255, 255, .5));
    //HHgScene.tintCanvasByFill(testHolder.getCanvas(), new HHgColorRGBA(255,0,0) );
    return testHolder;
  };
})();



