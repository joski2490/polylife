// @author David Overcash <funnylookinhat@gmail.com>

var Organism = function () {
  // All children must call this.init(parameters);
}

Organism.prototype.init = function (parameters) {
  if( typeof parameters == "undefined" ) {
    throw "No parameters - must pass, at minimum, a scene.";
  }

  if( typeof parameters.scene == "undefined" ) {
    throw "No scene provided.";
  }

  this.scene = parameters.scene;

  this.size = 5;

  if( typeof parameters.size != "undefined" ) {
    this.size = Math.abs(parseFloat(parameters.size));
  }

  this.position = {
    x: 0,
    y: 0,
    z: 0
  };

  if( typeof parameters.position != "undefined" &&
      typeof parameters.position.x != "undefined" && 
      typeof parameters.position.y != "undefined" && 
      typeof parameters.position.z != "undefined" ) {
    this.position.x = parameters.position.x;
    this.position.y = parameters.position.y;
    this.position.z = parameters.position.z;
  }

  this.velocity = 0;
  this.acceleration = 0;
  this.movementTheta = 0;
  this.movementPhi = 0;

  if( typeof parameters.velocity != "undefined" ) {
    this.velocity = parseFloat(parameters.velocity);
  }
  if( typeof parameters.acceleration != "undefined" ) {
    this.acceleration = parseFloat(parameters.acceleration);
  }
  if( typeof parameters.movementTheta != "undefined" ) {
    this.movementTheta = parseFloat(parameters.movementTheta);
  }
  if( typeof parameters.movementPhi != "undefined" ) {
    this.movementPhi = parseFloat(parameters.movementPhi);
  }

  this.rotation = {
    x: ( Math.random() * Math.PI * 6 ),
    y: ( Math.random() * Math.PI * 6 ),
    z: ( Math.random() * Math.PI * 6 )
  };

  if( typeof parameters.rotation != "undefined" &&
      typeof parameters.rotation.x != "undefined" && 
      typeof parameters.rotation.y != "undefined" && 
      typeof parameters.rotation.z != "undefined" ) {
    this.rotation.x = parameters.rotation.x;
    this.rotation.y = parameters.rotation.y;
    this.rotation.z = parameters.rotation.z;
  }
  
  this.rotationDelta = {
    x: ( Math.random() * 2 - 1 ),
    y: ( Math.random() * 2 - 1 ),
    z: ( Math.random() * 2 - 1 )
  };

  if( typeof parameters.rotationDelta != "undefined" &&
      typeof parameters.rotationDelta.x != "undefined" && 
      typeof parameters.rotationDelta.y != "undefined" && 
      typeof parameters.rotationDelta.z != "undefined" ) {
    this.rotation.x = parameters.rotationDelta.x;
    this.rotation.y = parameters.rotationDelta.y;
    this.rotation.z = parameters.rotationDelta.z;
  }

  this.threeObject = null;

  this.generateThreeObject();
}

Organism.minVelocity = 0;
Organism.maxVelocity = 50;

// This should be defined by the child.
Organism.prototype.generateThreeObject = function () {
  this.threeObject = null;
}

Organism.prototype.destroyThreeObject = function () {
  this.scene.remove(this.threeObject);
  delete this.threeObject;
  this.threeObject = null;
}

// Part of a larger update() probably.
Organism.prototype.updatePosition = function (timeDelta) {
  // Cheap - we should denormalize that sucker!
  if( this.acceleration != 0.00 ) {
    this.velocity = this.velocity + this.acceleration * timeDelta;
  }

  if( this.velocity != 0.00 || 
      this.acceleration != 0.00 ) {
    this.position.x = 
      this.position.x +
      this.velocity * timeDelta * Math.sin( this.movementPhi ) * Math.cos( this.movementTheta );
    this.position.z = 
      this.position.z +
      this.velocity * timeDelta * Math.sin( this.movementPhi ) * Math.sin( this.movementTheta );
    this.position.y = 
      this.position.y +
      this.velocity * timeDelta * Math.cos( this.movementPhi );
  }

  if( this.velocity >= Organism.maxVelocity ) {
    this.velocity = Organism.maxVelocity;
    if( this.acceleration > 0 ) {
      this.acceleration = 0.00;
    }
  }

  if( this.velocity <= Organism.minVelocity ) {
    this.velocity = Organism.minVelocity;
    if( this.acceleration < 0 ) {
      this.acceleration = 0.00;
    }
  }
  
  // Update Position
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  
  // Update Rotation
  this.threeObject.rotation.x += this.rotationDelta.x * timeDelta;
  this.threeObject.rotation.y += this.rotationDelta.y * timeDelta;
  this.threeObject.rotation.z += this.rotationDelta.z * timeDelta;
}

Organism.prototype.update = function (timeDelta) {
  this.updatePosition(timeDelta);
}

Organism.prototype.think = function (plants, herbivores, omnivores, carnivores) {
  // Override w/ specifics.
}

var Plant = function (parameters) {
  this.init(parameters);
}
Plant.prototype = new Organism();
Plant.prototype.constructor = Plant;
Plant.prototype.parent = Organism.prototype;

Plant.colorHex = 0x00cf00;

Plant.prototype.generateThreeObject = function () {
  this.threeObject =  new THREE.Mesh(
    new THREE.TetrahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: Plant.colorHex,
      wireframe: true,
      wireframeLinewidth: 1,
    })
  );
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  this.threeObject.rotation.set(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z
  );
  this.scene.add(this.threeObject);
}

var Herbivore = function (parameters) {
  this.init(parameters);
}
Herbivore.prototype = new Organism();
Herbivore.prototype.constructor = Herbivore;
Herbivore.prototype.parent = Organism.prototype;

Herbivore.colorHex = 0x0090ff;

Herbivore.prototype.generateThreeObject = function () {
  this.threeObject = new THREE.Mesh(
    new THREE.QuadrahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: Herbivore.colorHex,
      wireframe: true,
      wireframeLinewidth: 1,
    })
  );
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  this.threeObject.rotation.set(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z
  );
  this.scene.add(this.threeObject);
}

Herbivore.prototype.think = function (plants, herbivores, omnivores, carnivores) {
  // Primary concern = find food.
  var targetIndex = false;
  var targetDistance = false;
  var tempDistance;
  for( index in plants ) {
    tempDistance = Math.sqrt( 
      Math.pow(( this.position.x - plants[i].position.x),2) +
      Math.pow(( this.position.y - plants[i].position.y),2) +
      Math.pow(( this.position.z - plants[i].position.z),2) );
    if( ! targetDistance ||
      targetDistance > tempDistance ) {
      targetIndex = index;
    }
  }
  // Move towards targetIndex position.
  this.movementPhi = Math.atan( ( plants[targetIndex].position.x - this.position.x ) / ( plants[targetIndex].position.z - this.position.z ) );
  this.movementTheta = Math.atan( Math.sqrt( 
    ( Math.pow(( plants[targetIndex].position.x - this.position.x ), 2) +
      Math.pow(( plants[targetIndex].position.z - this.position.z ), 2) )
    ) / ( plants[targetIndex].position.y - this.position.y ) );
  this.acceleration = 3;
}

// Herbivore
var HerbivoreOrganism = function (parameters) {
  if( typeof parameters == "undefined" ) {
    throw "No parameters - must pass, at minimum, a scene.";
  }

  if( typeof parameters.scene == "undefined" ) {
    throw "No scene provided.";
  }

  this.scene = parameters.scene;

  this.size = 5;

  if( typeof parameters.size != "undefined" ) {
    this.size = Math.abs(parseFloat(parameters.size));
  }

  this.position = {
    x: 0,
    y: 0,
    z: 0
  };

  if( typeof parameters.position != "undefined" &&
      typeof parameters.position.x != "undefined" && 
      typeof parameters.position.y != "undefined" && 
      typeof parameters.position.z != "undefined" ) {
    this.position.x = parameters.position.x;
    this.position.y = parameters.position.y;
    this.position.z = parameters.position.z;
  }

  this.velocity = 0;
  this.acceleration = 0;
  this.movementTheta = 0;
  this.movementTau = 0;
  this.minVelocity = 0;   // Static class member?
  this.maxVelocity = 20;   // (?)

  if( typeof parameters.velocity != "undefined" ) {
    this.velocity = parseFloat(parameters.velocity);
  }
  if( typeof parameters.acceleration != "undefined" ) {
    this.acceleration = parseFloat(parameters.acceleration);
  }
  if( typeof parameters.movementTheta != "undefined" ) {
    this.movementTheta = parseFloat(parameters.movementTheta);
  }
  if( typeof parameters.movementTau != "undefined" ) {
    this.movementTau = parseFloat(parameters.movementTau);
  }

  this.rotation = {
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2
  };

  // TODO - Allow a defined rotation ?
  
  this.rotationDelta = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1
  };

  this.threeObject = null;

  this.generateThreeObject();
}

HerbivoreOrganism.colorHex = 0x0090ff;

HerbivoreOrganism.prototype.generateThreeObject = function () {
  this.threeObject =  new THREE.Mesh(
    new THREE.QuadrahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: HerbivoreOrganism.colorHex,
      wireframe: true,
      wireframeLinewidth: 1,
    })
  );
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  this.threeObject.rotation.set(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z
  );
  this.scene.add(this.threeObject);
}

HerbivoreOrganism.prototype.destroyThreeObject = function () {
  this.scene.remove(this.threeObject);
  delete this.threeObject;
  this.threeObject = null;
}

HerbivoreOrganism.prototype.update = function (timeDelta) {
  if( this.acceleration != 0.00 ) {
    // Cheap
    this.velocity = this.velocity + this.acceleration * timeDelta;
  }

  if( this.velocity != 0.00 || 
      this.acceleration != 0.00 ) {
    this.position.x = 
      this.position.x +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.cos( this.movementTheta );
    this.position.z = 
      this.position.z +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.sin( this.movementTheta );
    this.position.y = 
      this.position.y +
      this.velocity * timeDelta * Math.cos( this.movementTau );
  }

  if( this.velocity >= this.maxVelocity ) {
    this.velocity = this.maxVelocity;
    this.acceleration = 0.00;
  }

  if( this.velocity <= this.minVelocity ) {
    this.velocity = this.minVelocity;
    this.acceleration = 0.00;
  }
  
  // Update Position
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  
  // Update Rotation
  this.threeObject.rotation.x += this.rotationDelta.x * timeDelta;
  this.threeObject.rotation.y += this.rotationDelta.y * timeDelta;
  this.threeObject.rotation.z += this.rotationDelta.z * timeDelta;

}

// Carnivore
var CarnivoreOrganism = function (parameters) {
  if( typeof parameters == "undefined" ) {
    throw "No parameters - must pass, at minimum, a scene.";
  }

  if( typeof parameters.scene == "undefined" ) {
    throw "No scene provided.";
  }

  this.scene = parameters.scene;

  this.size = 5;

  if( typeof parameters.size != "undefined" ) {
    this.size = Math.abs(parseFloat(parameters.size));
  }

  this.position = {
    x: 0,
    y: 0,
    z: 0
  };

  if( typeof parameters.position != "undefined" &&
      typeof parameters.position.x != "undefined" && 
      typeof parameters.position.y != "undefined" && 
      typeof parameters.position.z != "undefined" ) {
    this.position.x = parameters.position.x;
    this.position.y = parameters.position.y;
    this.position.z = parameters.position.z;
  }

  this.velocity = 0;
  this.acceleration = 0;
  this.movementTheta = 0;
  this.movementTau = 0;
  this.minVelocity = 0;   // Static class member?
  this.maxVelocity = 20;   // (?)

  if( typeof parameters.velocity != "undefined" ) {
    this.velocity = parseFloat(parameters.velocity);
  }
  if( typeof parameters.acceleration != "undefined" ) {
    this.acceleration = parseFloat(parameters.acceleration);
  }
  if( typeof parameters.movementTheta != "undefined" ) {
    this.movementTheta = parseFloat(parameters.movementTheta);
  }
  if( typeof parameters.movementTau != "undefined" ) {
    this.movementTau = parseFloat(parameters.movementTau);
  }

  this.rotation = {
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2
  };

  // TODO - Allow a defined rotation ?
  
  this.rotationDelta = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1
  };

  this.threeObject = null;

  this.generateThreeObject();
}

CarnivoreOrganism.colorHex = 0xcf3333;

CarnivoreOrganism.prototype.generateThreeObject = function () {
  this.threeObject =  new THREE.Mesh(
    new THREE.OctahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: CarnivoreOrganism.colorHex,
      wireframe: true,
      wireframeLinewidth: 1,
    })
  );
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  this.threeObject.rotation.set(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z
  );
  this.scene.add(this.threeObject);
}

CarnivoreOrganism.prototype.destroyThreeObject = function () {
  this.scene.remove(this.threeObject);
  delete this.threeObject;
  this.threeObject = null;
}

CarnivoreOrganism.prototype.update = function (timeDelta) {
  if( this.acceleration != 0.00 ) {
    // Cheap
    this.velocity = this.velocity + this.acceleration * timeDelta;
  }

  if( this.velocity != 0.00 || 
      this.acceleration != 0.00 ) {
    this.position.x = 
      this.position.x +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.cos( this.movementTheta );
    this.position.z = 
      this.position.z +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.sin( this.movementTheta );
    this.position.y = 
      this.position.y +
      this.velocity * timeDelta * Math.cos( this.movementTau );
  }

  if( this.velocity >= this.maxVelocity ) {
    this.velocity = this.maxVelocity;
    this.acceleration = 0.00;
  }

  if( this.velocity <= this.minVelocity ) {
    this.velocity = this.minVelocity;
    this.acceleration = 0.00;
  }
  
  // Update Position
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  
  // Update Rotation
  this.threeObject.rotation.x += this.rotationDelta.x * timeDelta;
  this.threeObject.rotation.y += this.rotationDelta.y * timeDelta;
  this.threeObject.rotation.z += this.rotationDelta.z * timeDelta;

}

// Omnivore
var OmnivoreOrganism = function (parameters) {
  if( typeof parameters == "undefined" ) {
    throw "No parameters - must pass, at minimum, a scene.";
  }

  if( typeof parameters.scene == "undefined" ) {
    throw "No scene provided.";
  }

  this.scene = parameters.scene;

  this.size = 5;

  if( typeof parameters.size != "undefined" ) {
    this.size = Math.abs(parseFloat(parameters.size));
  }

  this.position = {
    x: 0,
    y: 0,
    z: 0
  };

  if( typeof parameters.position != "undefined" &&
      typeof parameters.position.x != "undefined" && 
      typeof parameters.position.y != "undefined" && 
      typeof parameters.position.z != "undefined" ) {
    this.position.x = parameters.position.x;
    this.position.y = parameters.position.y;
    this.position.z = parameters.position.z;
  }

  this.velocity = 0;
  this.acceleration = 0;
  this.movementTheta = 0;
  this.movementTau = 0;
  this.minVelocity = 0;   // Static class member?
  this.maxVelocity = 20;   // (?)

  if( typeof parameters.velocity != "undefined" ) {
    this.velocity = parseFloat(parameters.velocity);
  }
  if( typeof parameters.acceleration != "undefined" ) {
    this.acceleration = parseFloat(parameters.acceleration);
  }
  if( typeof parameters.movementTheta != "undefined" ) {
    this.movementTheta = parseFloat(parameters.movementTheta);
  }
  if( typeof parameters.movementTau != "undefined" ) {
    this.movementTau = parseFloat(parameters.movementTau);
  }

  this.rotation = {
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2
  };

  // TODO - Allow a defined rotation ?
  
  this.rotationDelta = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1
  };

  this.threeObject = null;

  this.generateThreeObject();
}

OmnivoreOrganism.colorHex = 0xffd100;

OmnivoreOrganism.prototype.generateThreeObject = function () {
  this.threeObject =  new THREE.Mesh(
    new THREE.IcosahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: OmnivoreOrganism.colorHex,
      wireframe: true,
      wireframeLinewidth: 1,
    })
  );
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  this.threeObject.rotation.set(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z
  );
  this.scene.add(this.threeObject);
}

OmnivoreOrganism.prototype.destroyThreeObject = function () {
  this.scene.remove(this.threeObject);
  delete this.threeObject;
  this.threeObject = null;
}

OmnivoreOrganism.prototype.update = function (timeDelta) {
  
  if( this.acceleration != 0.00 ) {
    // Cheap
    this.velocity = this.velocity + this.acceleration * timeDelta;
  }

  if( this.velocity != 0.00 || 
      this.acceleration != 0.00 ) {
    this.position.x = 
      this.position.x +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.cos( this.movementTheta );
    this.position.z = 
      this.position.z +
      this.velocity * timeDelta * Math.sin( this.movementTau ) * Math.sin( this.movementTheta );
    this.position.y = 
      this.position.y +
      this.velocity * timeDelta * Math.cos( this.movementTau );
  }

  if( this.velocity >= this.maxVelocity ) {
    this.velocity = this.maxVelocity;
    this.acceleration = 0.00;
  }

  if( this.velocity <= this.minVelocity ) {
    this.velocity = this.minVelocity;
    this.acceleration = 0.00;
  }
  
  // Update Position
  this.threeObject.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );
  
  // Update Rotation
  this.threeObject.rotation.x += this.rotationDelta.x * timeDelta;
  this.threeObject.rotation.y += this.rotationDelta.y * timeDelta;
  this.threeObject.rotation.z += this.rotationDelta.z * timeDelta;

}
