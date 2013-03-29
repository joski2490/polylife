// TODO

var PolyLife = function (parameters) {
  
  if( typeof parameters == "undefined" ) {
  	parameters = {};
  }

  if( typeof parameters.canvas == "undefined" ) {
  	this.canvas = document.createElement('canvas');
  	document.body.appendChild(this.canvas);
  } else {
  	this.canvas = parameters.canvas;
  }

  // Add other parameters.
  
  this.SCREEN_WIDTH = window.innerWidth;
  this.SCREEN_HEIGHT = window.innerHeight;

  this.scene = new THREE.Scene();
  
  this.camera = new THREE.PerspectiveCamera(
  	45,
  	this.SCREEN_WIDTH / this.SCREEN_HEIGHT,
  	1,
  	10000
  );

  this.cameraControls = new RadiusCameraControls({
    camera: this.camera,
    focus: {
      x: 0,
      y: 0,
      z: 0
    },
    minTau: ( 0.01 ),
    maxTau: ( Math.PI / 2 ),
    tau: ( 1 ),
    radius: 200
  });

  this.renderer = new THREE.WebGLRenderer({
  	canvas: this.canvas
  });
  this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
  this.renderer.setClearColorHex( 0x000000, 1);	// TODO - PARAM?

  this.clock = new THREE.Clock();

  this.plants = Array();
  this.herbivores = Array();
  this.carnivores = Array();
  this.omnivores = Array();

  this._bindWindowEvents();
  
  this._initTestObjects();
}

PolyLife.prototype._windowResized = function () {
  
  this.SCREEN_WIDTH = window.innerWidth;
  this.SCREEN_HEIGHT = window.innerHeight;

  this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
}

PolyLife.prototype._bindWindowEvents = function () {
  
  // Setup requestAnimFrame
  // Thanks Paul Irish.
  
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame  || 
    window.webkitRequestAnimationFrame    || 
    window.mozRequestAnimationFrame       || 
    window.oRequestAnimationFrame         || 
    window.msRequestAnimationFrame        || 
    function( callback ){
       window.setTimeout(callback, 1000 / 60);
    };
  })();
  
  var thisRef = this;
  $(window).resize( function () {
    thisRef._windowResized();
  });

  // Testing Only
  $(window).click(function() {
    thisRef._testExplode();
  });
}


// Insert everything
// Looks cool - fairly useless.
PolyLife.prototype._initTestObjects = function () {
  
  /*
  for( var p = 0; p < 1000; p++ ) {
    this.plants.push(new PlantOrganism({
      scene: this.scene,
      size: PolyLife._generateRandomSize(1,3),
      position: PolyLife._generateRandomPosition(-1000,1000,-300,300,-1000,1000)
    }));
  }

  for( var p = 0; p < 200; p++ ) {
    this.herbivores.push(new HerbivoreOrganism({
      scene: this.scene,
      size: PolyLife._generateRandomSize(1,3),
      position: PolyLife._generateRandomPosition(-1000,1000,-300,300,-1000,1000)
    }));
  }

  for( var p = 0; p < 100; p++ ) {
    this.carnivores.push(new CarnivoreOrganism({
      scene: this.scene,
      size: PolyLife._generateRandomSize(3,6),
      position: PolyLife._generateRandomPosition(-1000,1000,-300,300,-1000,1000)
    }));
  }

  for( var p = 0; p < 100; p++ ) {
    this.omnivores.push(new OmnivoreOrganism({
      scene: this.scene,
      size: PolyLife._generateRandomSize(2,4),
      position: PolyLife._generateRandomPosition(-1000,1000,-300,300,-1000,1000)
    }));
  }
  */
  
  /*
  this.omnivores.push(new OmnivoreOrganism({
    scene: this.scene,
    size: 3,
    velocity: 20,
    acceleration: -2
  }));
  */
  
  this._testExplode();
}

PolyLife.prototype._removeObjects = function(objects) {
  for( index in objects ) {
    objects[index].destroyThreeObject();
    delete objects[index];
  }
  objects.length = 0;
}

PolyLife.prototype._testExplode = function () {
  this._removeObjects(this.plants);
  for( var p = 0; p < 500; p++ ) {
    this.plants.push(new PlantOrganism({
      scene: this.scene,
      size: PolyLife._generateRandomSize(1,3),
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      movementTheta: ( Math.random() * Math.PI * 2 ),
      movementTau: ( Math.random() * Math.PI * ( 3 / 4 ) + Math.PI / 8 ),
      velocity: Math.random() * 30 + 10,
      acceleration: Math.random() * -5 - 1,
    }));
  }
}

PolyLife._generateRandomSize = function (min, max) {
  return ( Math.random() * ( max - min ) + min );
}

PolyLife._generateRandomPosition = function (xmin, xmax, ymin, ymax, zmin, zmax) {
  return {
    x: ( Math.random() * ( xmax - xmin ) + xmin ),
    y: ( Math.random() * ( ymax - ymin ) + ymin ),
    z: ( Math.random() * ( zmax - zmin ) + zmin )
  }
}

PolyLife.prototype._runLoop = function () {
  var timeDelta = this.clock.getDelta();
  
  // run engine
  // console.log(timeDelta);

  for( i = 0; i < this.plants.length; i++ ) {
    this.plants[i].update(timeDelta);
  }
  for( i = 0; i < this.herbivores.length; i++ ) {
    this.herbivores[i].update(timeDelta);
  }
  for( i = 0; i < this.carnivores.length; i++ ) {
    this.carnivores[i].update(timeDelta);
  }
  for( i = 0; i < this.omnivores.length; i++ ) {
    this.omnivores[i].update(timeDelta);
  }



  this.cameraControls.updateCamera();
  this.renderer.render(this.scene,this.camera);

  // this._requestAnimFrame(this._runLoop());
}

PolyLife.prototype.run = function () {
  var thisRef = this;
  (function animloop(){
    requestAnimFrame(animloop);
    thisRef._runLoop();
  })();
}