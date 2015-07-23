
var HHgAudio = {};

var HHgDefaultSoundVolume = 1,
    HHgDefaultMusicVolume = 1,
    HHgDefaultMasterVolume = 1,
    HHgCurrentSoundVolume = 1,
    HHgCurrentMusicVolume = 1,
    HHgCurrentMasterVolume = 1;
var HHgSoundCounter = 0;



(function(){

  var tempSound, tempKey, i, tempName;

  HHgAudio.newSound = function(name, doNotAutoPlay){
    tempSound = HHgAudioFileManager.getAudio(name);
    tempSound.volume = HHgCurrentSoundVolume * HHgCurrentMasterVolume;
    if(!doNotAutoPlay){
      tempSound.play();
    }

    return tempSound;
  }

  HHgAudio.killSound = function(id){
   HHgAudioFileManager.releaseSound(HHgAudio.currentSounds[id]);
   delete HHgAudio.currentSounds[id];
  }

  HHgAudio.pauseSound = function(id){
    tempSound = HHgAudio.currentSounds[id].pause();
    tempSound.manualPause = true;

  }

  HHgAudio.playSound = function(id){
    tempSound = HHgAudio.currentSounds[id];
    if(tempSound){
      tempSound.volume = HHgCurrentSoundVolume * HHgCurrentMasterVolume;
      tempSound.play();
      tempSound.manualPause = false;

    }
  }

  HHgAudio.newMusic = function(name, doNotAutoPlay){
    tempSound = HHgAudioFileManager.getMusic(name);
    tempSound.volume = HHgCurrentMasterVolume * HHgCurrentMusicVolume;
  }

  HHgAudio.killMusic = function(id){
    //need to look at what to do to actually remove from memory, or add to cache
    HHgAudioFileManager.releaseAudio(HHgAudio.currentMusic[id]);
    delete HHgAudio.currentMusic[id];
  }

  HHgAudio.playMusic = function(id){
    tempSound = HHgAudio.currentMusic[id];
    if(tempSound){
      tempSound.volume = HHgCurrentMasterVolume * HHgCurrentMusicVolume;
      tempSound.play();
    }
  }

  HHgAudio.pauseMusic = function(id){
    tempSound = HHgAudio.currentMusic[id];
    tempSound.pause();
    tempSound.manualPause = true;

  }

  HHgAudio.pauseAll = function(){
    for(tempKey in HHgAudio.currentSounds){
      HHgAudio.currentSounds[tempKey].pause();
    }
    for(tempKey in HHgAudio.currentMusic){
      HHgAudio.currentMusic[tempKey].pause();
    }

  }

  HHgAudio.unpauseAll = function(){
    for(tempKey in HHgAudio.currentSounds){
      tempSound = HHgAudio.currentSounds[tempKey];
      if(tempSound.manualPause !== true){
        tempSound.volume = HHgCurrentMasterVolume * HHgCurrentSoundVolume;
        tempSound.play();
      }
    }
    for(tempKey in HHgAudio.currentMusic){
      tempSound = HHgAudio.currentMusic[tempKey];
      if(tempSound.manualPause !== true){
        tempSound.volume = HHgCurrentMasterVolume * HHgCurrentMusicVolume;
        tempSound.play();
      }
    }
  }

  HHgAudio.setAllSoundVolumeBy = function(num){
    HHgCurrentSoundVolume += num;
    for(tempKey in HHgAudio.currentSounds){
      HHgAudio.currentSounds[tempKey].volume = HHgCurrentSoundVolume * HHgCurrentMasterVolume;
    }
  }

  HHgAudio.setAllSoundVolumeTo = function(num){
    HHgCurrentSoundVolume = num;
     for(tempKey in HHgAudio.currentSounds){
      HHgAudio.currentSounds[tempKey].volume = HHgCurrentSoundVolume * HHgCurrentMasterVolume;
    }
  }

  HHgAudio.setAllMusicVolumeBy = function(num){
    HHgCurrentMusicVolume += num;
     for(tempKey in HHgAudio.currentMusic){
      HHgAudio.currentMusic[tempKey].volume = HHgCurrentMusicVolume * HHgCurrentMasterVolume;
    }
  }

  HHgAudio.setAllMusicVolumeTo = function(num){
    HHgCurrentMusicVolume = num;
     for(tempKey in HHgAudio.currentMusic){
      HHgAudio.currentMusic[tempKey].volume = HHgCurrentMusicVolume * HHgCurrentMasterVolume;
    }
  }

  HHgAudio.setMasterVolumeTo = function(num){
    HHgCurrentMasterVolume = num;
    HHgAudio.setAllSoundVolumeTo(num);
    HHgAudio.setAllMusicVolumeTo(num);
  }

  HHgAudio.setMasterVolumeBy = function(num){
    HHgCurrentMasterVolume *= num;
    HHgAudio.setAllSoundVolumeBy(num);
    HHgAudio.setAllMusicVolumeBy(num);
  }

  HHgAudio.currentMusic = {};
  HHgAudio.currentSounds = {};

  //ended event
  //canplay event

}());

var HHgAudioHelper = {

}

var HHgAudioFileManager = {
  //TEMP
  //process file name
  soundCounter: 0,
  getAudio: function(name){
    tempName = HHgAudioFileManager.getFileName(name)
   tempSound = new Audio(tempName);
   tempSound.crossOrigin = "Anonymous";
   tempSound.id = HHg.returnRandomHash(HHgAudioFileManager.soundCounter);
   HHgAudioFileManager.soundCounter++;
   return tempSound;
  },

  releaseAudio: function(){
    //need to TODO

  },

  getFileName: function(name){
    switch(name){
      case "click":
      return "../HHgEngine/click.wav";

      case "test":
      return "../HHgEngine/test.wav";

      default:
      return "../HHgEngine/test.wav";
    }
  },


}
