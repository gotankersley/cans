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

var selectedCan;
var cans = [];

//Global objects
var camera;
var platonicCan;
var floor;
var intersectPlane;

//Global materials
var topMaterial;

