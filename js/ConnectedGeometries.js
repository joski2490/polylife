// !!!

THREE.PermutateVertexFaces = function (vertices) {
  var faces = [];

  for( i = 0; i < ( vertices.length - 2 ); i++ ) {
  	for( j = ( i + 1 ); j < ( vertices.length - 1 ); j++ ) {
  	  for( k = ( j + 1 ); k < ( vertices.length ); k++ ) {
  	  	faces.push([i,j,k]);
  	  }
  	}
  }

  return faces;
}

THREE.TetrahedronConnectedGeometry = function (radius, detail) {
  var vertices = [
    [ 1,  1,  1],
    [-1, -1,  1],
    [-1,  1, -1],
    [ 1, -1, -1]
  ];

  var faces = THREE.PermutateVertexFaces(vertices);

  THREE.PolyhedronGeometry.call(this, vertices, faces, radius, detail);
};
THREE.TetrahedronConnectedGeometry.prototype = new THREE.Geometry();
THREE.TetrahedronConnectedGeometry.prototype.constructor = THREE.TetrahedronConnectedGeometry;

THREE.QuadrahedronConnectedGeometry = function (radius, detail) {
  var vertices = [
    [ 1, 1, 1],
    [ 1, 1, -1],
    [ 1, -1, 1],
    [ 1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1]
  ];

  var faces = THREE.PermutateVertexFaces(vertices);

  THREE.PolyhedronGeometry.call(this, vertices, faces, radius, detail);
};
THREE.QuadrahedronConnectedGeometry.prototype = new THREE.Geometry();
THREE.QuadrahedronConnectedGeometry.prototype.constructor = THREE.QuadrahedronConnectedGeometry;

THREE.OctahedronConnectedGeometry = function (radius, detail) {
  var vertices = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  
  var faces = THREE.PermutateVertexFaces(vertices);

  THREE.PolyhedronGeometry.call(this, vertices, faces, radius, detail);
};
THREE.OctahedronConnectedGeometry.prototype = new THREE.Geometry();
THREE.OctahedronConnectedGeometry.prototype.constructor = THREE.OctahedronConnectedGeometry;

THREE.IcosahedronConnectedGeometry = function (radius, detail) {
  var phi = ( ( 1 + Math.sqrt(5) ) / 2 );

  var vertices = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],

    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],

    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1]
  ];

  var faces = THREE.PermutateVertexFaces(vertices);

  THREE.PolyhedronGeometry.call(this, vertices, faces, radius, detail);
}
THREE.IcosahedronConnectedGeometry.prototype = new THREE.Geometry();
THREE.IcosahedronConnectedGeometry.prototype.constructor = THREE.IcosahedronConnectedGeometry;

THREE.DodecahedronConnectedGeometry = function (radius, detail) {
  var phi = ( ( 1 + Math.sqrt(5) ) / 2 );
  var iPhi = ( 1 / phi );

  var vertices = [
    // ( +/- 1, +/- 1, +/- 1)
    [ 1, 1, 1],
    [ 1, 1, -1],
    [ 1, -1, 1],
    [ 1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1],

    // ( 0, +/- iPhi, +/- phi)
    [ 0, iPhi, phi],
    [ 0, iPhi, -phi],
    [ 0, -iPhi, phi],
    [ 0, -iPhi, -phi],

    // ( +/- iPhi, +/- phi, 0)
    [ iPhi, phi, 0],
    [ iPhi, -phi, 0],
    [ -iPhi, phi, 0],
    [ -iPhi, -phi, 0],

    // ( +/- phi, 0, +/- iPhi )
    [ phi, 0, iPhi],
    [ -phi, 0, iPhi],
    [ phi, 0, -iPhi],
    [ -phi, 0, -iPhi]
  ];

  var faces = THREE.PermutateVertexFaces(vertices);

  THREE.PolyhedronGeometry.call(this, vertices, faces, radius, detail);
};
THREE.DodecahedronConnectedGeometry.prototype = new THREE.Geometry();
THREE.DodecahedronConnectedGeometry.prototype.constructor = THREE.DodecahedronConnectedGeometry;