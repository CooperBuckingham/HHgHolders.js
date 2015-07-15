//HHgTestSpec.js


//sequences need to not modify actions, and instead wrap them in time blocks, or call next based on the id
  //of the sequence chain or something crazy.


//TODO tests
  //test actions cluster
  //test text scaling
  //parent rotation and scale should change child movement actions/directions?

//TODO features
  //add sound
  //add sprite map system
  //add frame by frame sequencing for holder sprite animations
  //add object pool
  //add sound pool
  //add persistence
  //add collision
  //add physics
  //add server hook
  //add alignment system
    //maybe default "left edge, top edge" etc gets.
    //align to parent top, center bottom
  //9 slice
  //killing holders needs to clean up actions they are running

//BUGS
  //fonts and font shadows now fuzzing on scale
    //add text positinging system
    //adding paragraph text doesn't check to see if p text already exists

  //rotation adding forever



// TEST SUITES
//Holders - set values

  //screen

    //Position

    //Scale

    //Rotation

  //in parent

    //Position

    //scale

    //rotation

  //adding and removing holders

  //tinting

//Actions
  //holder paused

  //action paused

  //screen

    //Position

    //quad

    //Scale

    //Rotation

  //parent

    //Position

    //scale

    //rotation

    //adding and removing actions

    //sequences
      //repeat x times
      //repeat forever

    //clusters

    //timers

    //play sound

//colors
  //HSL RGB HEX

//mouse
  //click on holder

//vectors
  //add subtract rotate, minus equals, etc

//sprites
 //load images, use coordinate maps

//shapes
  //appear, have color, have borders

//text
  //paragraph text
  //canvas text


//Parent / Child

//
