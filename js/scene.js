'use strict';

initScene();
var light;
function initScene() {	
	scene = new Physijs.Scene;
		
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;		
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;	

	//Camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);	
	scene.add(camera);	
	camera.position.set(0,0,10);
	camera.lookAt(scene.position);	
	
	//Renderer
	renderer = new THREE.WebGLRenderer( {antialias:true} );		
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);		
	container = document.createElement( 'container' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	document.addEventListener('mousedown', onMouseDown, false );
	document.addEventListener('mouseup', onMouseUp, false );
	document.addEventListener('mousemove', onMouseMove, false );
	projector = new THREE.Projector();
	renderer.shadowMapEnabled = GUI['Shadows'];
	loadingCount = document.getElementById("loadingCount");
	
	//Lighting
	light = new THREE.SpotLight(0xdfebff, 3);    
    light.position.multiplyScalar(1.3);
		
	light.position.set(-60, 120, -30);
	light.castShadow = true;
	//light.shadowCameraVisible = true;
	
	light.shadowMapWidth = 4096;
    light.shadowMapHeight = 4096;
    
    light.shadowDarkness = 0.2;
	scene.add(light);	
	
	var hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
	hemi.position.set(0, 10, 0);
	scene.add(hemi);	
	
	//Floor
	var floorGeometry = new THREE.BoxGeometry(100, 1, 100);
	var floorMaterial = new THREE.MeshLambertMaterial({
		color: 0x888888,
	});
	floor = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);	
	floor.receiveShadow = true;
	floor.position.set(0, -1, 0);
	scene.add(floor);
	
	//Intersection plane - Used for mouse dragging parallel to camera
	intersectPlane = new THREE.Mesh( new THREE.PlaneGeometry( 20, 20, 2, 2 ), new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.25, transparent: true, wireframe: true} ) );
	intersectPlane.visible = false;
	scene.add(intersectPlane);		
	
	//Can model - Display platonic can while textures are loading		
	var jsonLoader = new THREE.JSONLoader();	
	jsonLoader.load('models/can.js', loadCan);   	
	
	
}


function render() {	
	requestAnimationFrame( render );
	controls.update(); 			
	scene.simulate();
	renderer.render( scene, camera );	
}