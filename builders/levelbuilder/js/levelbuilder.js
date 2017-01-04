var HHgLevelBuilder = {};

var HHgBuilderChangeToLevel = function() {
  HHg.warn("Changed to Level Builder");
  if (HHgBuilderDirtyData) {
    alert("UNSAVED DATA");
    return;
  };

  if (HHgBuilderNavDataToolbar) {
    HHgBuilderNavDataToolbar.destroySelf();
  }

  HHgBuilderNavDataToolbar = HHgGetHolder({w:"50%", h:"100%"});
  HHgBuilderNav.addChild(HHgBuilderNavDataToolbar);
  HHgBuilderNavDataToolbar.alignHRight();

  var saveButton = HHgGetHolder({w:"33%", h:"100%"});
  HHgBuilderNavDataToolbar.addChild(saveButton);
  saveButton.alignHLeft();
  saveButton.doMakeRectangle({color: "green", borderRadius: 25});
  saveButton.doAddParagraphText({text: "SAVE", color: "white", vAlign: "center", hAlign: "center"});
  saveButton.changeToButton(function() {
    HHgLevelBuilder.save();
  });

  var cancelButton = HHgGetHolder({w:"33%", h:"100%"});
  HHgBuilderNavDataToolbar.addChild(cancelButton);
  cancelButton.alignHCenter();
  cancelButton.doMakeRectangle({color: "red", borderRadius: 25});
  cancelButton.doAddParagraphText({text: "CANCEL", color: "white", vAlign: "center", hAlign: "center"});
  cancelButton.changeToButton(function() {
    HHgLevelBuilder.cancel();
  });

  var loadButton = HHgGetHolder({w:"33%", h:"100%"});
  HHgBuilderNavDataToolbar.addChild(loadButton);
  loadButton.alignHRight();
  loadButton.doMakeRectangle({color: "yellow", borderRadius: 25});
  loadButton.doAddParagraphText({text: "LOAD", color: "white", vAlign: "center", hAlign: "center"});
  loadButton.changeToButton(function() {
    HHgLevelBuilder.load();
  });
};

(function() {
  var cb = HHgLevelBuilder;
  cb.save = function() {
    HHgBuilderDirtyData = false;
    HHg.warn("SAVE LEVEL");
  };
  cb.load = function() {
    HHgBuilderDirtyData = true;
    HHg.warn("LOAD LEVEL");
  };
  cb.cancel = function() {
    HHgBuilderDirtyData = false;
    HHg.warn("CANCEL LEVEL");
  };
})();