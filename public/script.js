// var scene = new THREE.Scene()
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
// camera.position.z = 30
//
// var light = new THREE.AmbientLight( 0xFFFFFF )
// scene.add( light )
//
// var geometry = new THREE.SphereGeometry( 10, 32, 32 )
// var material = new THREE.MeshPhongMaterial()
// material.map = new THREE.TextureLoader().load('/assets/earthmap4k.jpg')
// var earthMesh = new THREE.Mesh( geometry, material )
//
// scene.add( earthMesh )
//
// var renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// /////////////////////// gui /////////////////////////
//
// var controls = new function() {
//     this.textColor = 0xffae23
//     this.guiRotationX = 0.005
//     this.guiRotationY = 0.005
// }
//
// var gui = new dat.GUI()
// gui.add(controls, 'guiRotationX', 0, .2)
// gui.add(controls, 'guiRotationY', 0, .2)
//
// gui.addColor(controls, 'textColor').onChange(function (e) {
//     textMesh.material.color = new THREE.Color(e)
// })
//
// var orbit = new THREE.OrbitControls(camera, renderer.domElement)
// orbit.enableZoom = false
//
// var render = function() {
//     requestAnimationFrame(render)
//     // earthMesh.rotation.x += 0.005
//     // earthMesh.rotation.y += 0.005
//     earthMesh.rotation.x += controls.guiRotationX
//     earthMesh.rotation.y += controls.guiRotationY
//     renderer.render(scene, camera)
// }
// render()
//
// var imagePrefix = "/assets/"
// var urls = [ 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg' ]
// var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls)
// scene.background = skyBox

// Responsive screen ________________________________________________

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Scene ____________________________________________________________

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting __________________________________________________________

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// The Mesh ___________________________________________________________

var geometry = new THREE.SphereGeometry(10, 128, 128);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('/assets/earthmap4k.jpg');
var earthMesh = new THREE.Mesh(geometry, material);

scene.add(earthMesh);

var geometry = new THREE.SphereGeometry(1, 64, 64);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('/assets/moonmap4k.jpg');
var moonMesh = new THREE.Mesh(geometry, material);

scene.add(moonMesh);
moonMesh.position.x = 20;

var earthPivot = new THREE.Object3D();
scene.add(earthPivot);

// moonMesh.position.x = 20;
earthPivot.add(moonMesh);

// dat.GUI _____________________________________________________________

var controls = new function() {
    this.textColor = 0xffae23;
    this.guiRotationX = 0.0001;
    this.guiRotationY = 0.01;
}();

var gui = new dat.GUI();
gui.add(controls, 'guiRotationX', 0, 0.2);
gui.add(controls, 'guiRotationY', 0, 0.2);

gui.addColor(controls, 'textColor').onChange(function(e) {
    textMesh.material.color = new THREE.Color(e);
    // e = newcolor
});

// Orbit Controls _____________________________________________________

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

// Skybox _____________________________________________________________

var imagePrefix = '/assets/';
var urls = [
    'space.jpg',
    'space.jpg',
    'space.jpg',
    'space.jpg',
    'space.jpg',
    'space.jpg'
];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

// Render _____________________________________________________________

var render = function() {
    requestAnimationFrame(render);
    moonMesh.rotation.x += 0.005;
    moonMesh.rotation.y += 0.005;
    earthPivot.rotation.y += 0.005;
    earthPivot.rotation.y += 0.001;

    // earthMesh.rotation.x += 0.005; refactoring this because of dat.Gui
    // earthMesh.rotation.y += 0.005; refactoring this because of dat.Gui
    earthMesh.rotation.x += controls.guiRotationX;
    earthMesh.rotation.y += controls.guiRotationY;

    renderer.render(scene, camera);
};
render();
