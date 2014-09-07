'use strict';

//Constants
var ROOM_SIZE = 20;
var textures = ['coke.jpg', 'coke2.jpg', 'coke3.jpg', 'diet-coke.jpg', 'drpepper.jpg', 'fanta.jpg', 'mountain-dew.png', 'pepsi.png', '7-up.jpg', 'special.jpg'];

//Global variables
var container;
var controls;
var renderer;
var scene;

var projector;
var mouse = {x:0, y: 0, drag:false};
var cursor = new THREE.Vector3;

var labelMaterials = [];
var labelsEnabled = [];
var loadingCount;

//Global objects
var camera;
var floor;
var intersectPlane;
var platonicCan;
var selectedCan;
var cans = [];
var canGeo;

//Global materials
var topMat = new THREE.MeshPhongMaterial({map:new THREE.ImageUtils.loadTexture('textures/tops.png')});
var floorTexture = new THREE.ImageUtils.loadTexture( 'textures/checkerboard.jpg' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set( 20, 20 );
var floorText = new THREE.MeshBasicMaterial({ map: floorTexture} );	
var floorUntext = new THREE.MeshBasicMaterial({color: 0x888888});

