/**
 * TODO - DOC ME
 */

var PlantOrganism = function (parameters) {
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
  this.maxVelocity = 50;   // (?)

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

PlantOrganism.colorHex = 0x00cf00;

PlantOrganism.prototype.generateThreeObject = function () {
  this.threeObject =  new THREE.Mesh(
    new THREE.TetrahedronConnectedGeometry(this.size),
    new THREE.MeshBasicMaterial({
      color: PlantOrganism.colorHex,
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

PlantOrganism.prototype.destroyThreeObject = function () {
  this.scene.remove(this.threeObject);
  delete this.threeObject;
  this.threeObject = null;
}

PlantOrganism.prototype.update = function (timeDelta) {
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
    if( this.acceleration > 0 ) {
      this.acceleration = 0.00;
    }
  }

  if( this.velocity <= this.minVelocity ) {
    this.velocity = this.minVelocity;
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

