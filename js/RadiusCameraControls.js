/**
 * TODO - Generalize and publish ...
 */

var RadiusCameraControls = function (parameters) {
  if( typeof parameters == "undefined" ) {
    throw "No parameters provided.";
  }
  if( typeof parameters.camera == "undefined" ) {
    throw "No camera provided.";
  }

  this.camera = parameters.camera;

  this.focus = {
    x: 0,
    y: 0,
    z: 0
  };

  if( typeof parameters.focus != "undefined" ) {
    if( typeof parameters.focus.x != "undefined" &&
        typeof parameters.focus.y != "undefined" &&
        typeof parameters.focus.z != "undefined" ) {
      this.focus.x = parameters.focus.x;
      this.focus.y = parameters.focus.y;
      this.focus.z = parameters.focus.z;
    }
  }

  this.radius = 1.00;
  this.maxRadius = null;
  this.minRadius = 1.00;
  if( typeof parameters.radius != "undefined" ) {
    this.radius = parseFloat(parameters.radius);
  }
  if( typeof parameters.minRadius != "undefined" ) {
    this.minRadius = parseFloat(parameters.minRadius);
  }
  if( typeof parameters.maxRadius != "undefined" ) {
    this.maxRadius = parseFloat(parameters.maxRadius);
  }
  
  this.theta = 0.00;
  this.minTheta = null;
  this.maxTheta = null;
  if( typeof parameters.theta != "undefined" ) {
    this.theta = parseFloat(parameters.theta);
  }
  if( typeof parameters.minTheta != "undefined" ) {
    this.minTheta = parseFloat(parameters.minTheta);
  }
  if( typeof parameters.maxTheta != "undefined" ) {
    this.maxTheta = parseFloat(parameters.maxTheta);
  }
  
  this.tau = 0.00;
  this.minTau = null;
  this.maxTau = null;
  if( typeof parameters.tau != "undefined" ) {
    this.tau = parseFloat(parameters.tau);
  }
  if( typeof parameters.minTau != "undefined" ) {
    this.minTau = parseFloat(parameters.minTau);
  }
  if( typeof parameters.maxTau != "undefined" ) {
    this.maxTau = parseFloat(parameters.maxTau);
  }

  this.dragActive = false;
  this.dragPrevious = {
    x: 0,
    y: 0
  };

  this._bindWindowEvents();

}

RadiusCameraControls.prototype._updateRadius = function (delta) {
  this.radius += delta;
  if( this.radius < this.minRadius ) {
    this.radius = this.minRadius;
  }
  else if( this.maxRadius != null && 
           this.radius > this.maxRadius ) {
    this.radius = this.maxRadius;
  }
}

RadiusCameraControls.prototype._updateAngle = function (dTheta, dTau) {
  this.theta += ( dTheta * 0.01 );
  this.tau -= ( dTau * 0.01 );
  if( this.minTheta != null &&
      this.theta < this.minTheta ) {
    this.theta = this.minTheta;
  }
  else if( this.maxTheta != null &&
           this.theta > this.maxTheta ) {
    this.theta = this.maxTheta;
  }
  if( this.minTau != null &&
      this.tau < this.minTau ) {
    this.tau = this.minTau;
  }
  else if( this.maxTau != null &&
           this.tau > this.maxTau ) {
    this.tau = this.maxTau;
  }
}

RadiusCameraControls.prototype._startDrag = function (x, y) {
  this.dragActive = true;
  this.dragPrevious.x = x;
  this.dragPrevious.y = y;
}

RadiusCameraControls.prototype._stopDrag = function () {
  this.dragActive = false;
}

RadiusCameraControls.prototype._processDrag = function (x, y) {
  if( this.dragActive ) {
    this._updateAngle(
      x - this.dragPrevious.x,
      y - this.dragPrevious.y
    );
    this.dragPrevious.x = x;
    this.dragPrevious.y = y;
  }
}

RadiusCameraControls.prototype._bindWindowEvents = function () {
  var thisRef = this;

  $(window).bind('mousewheel', function (e, delta, deltaX, deltaY) {
    thisRef._updateRadius((delta * -10));
  })
  .bind('mousedown', function (e) {
    thisRef._startDrag(e.pageX, e.pageY);
  })
  .bind('mouseup', function (e) {
    thisRef._stopDrag();
  })
  .bind('mousemove', function (e) {
    thisRef._processDrag(e.pageX, e.pageY);
  });

}

RadiusCameraControls.prototype.startPath = function () {

}

RadiusCameraControls.prototype.stopPath = function () {
  
}

RadiusCameraControls.prototype.updateCamera = function () {
  this.camera.position.x =
    this.focus.x + 
    this.radius * Math.sin( this.tau ) * Math.cos( this.theta );
  this.camera.position.z =
    this.focus.z + 
    this.radius * Math.sin( this.tau ) * Math.sin( this.theta );
  this.camera.position.y = 
    this.focus.y + 
    this.radius * Math.cos( this.tau );

  this.camera.lookAt(this.focus);
}
