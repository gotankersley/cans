'use strict';

//Load labels
function loadTextures(currentText, completeFn) {	
	if (currentText >= textures.length) {			
		completeFn();
		return;
	}	
	var textName = textures[currentText];
	var img = new THREE.ImageUtils.loadTexture( 'textures/' + textName, {}, function() {
		var label = new THREE.MeshPhongMaterial( { map: img} );
		var materials = [label, topMat];
		var mat = new THREE.MeshFaceMaterial(materials);						
		labelMaterials.push(mat);	
		loadingCount.innerHTML = "[" + labelMaterials.length + "/" + textures.length + "]";
		loadTextures(currentText + 1, completeFn); //Async recursive
	});	
}

function loadCan(geometry, materials) {			
	canGeo = geometry.clone(); //Cans have to use cloned geo to show - render bug?
	showPlatonicCan(geometry);
		
	loadingCount.innerHTML = "[1/" + textures.length + "]";		
	
	loadTextures(0, placeCans);								
	render();
}

//Platonic can - only visible while loading
function showPlatonicCan(geometry) {
	var platonicCanvas = document.createElement('canvas');
	//Use 2D canvas as texture
	var ctx = platonicCanvas.getContext('2d');
	ctx.font = 'Bold 40px serif';
	ctx.fillStyle = 'rgba(255,0,0,0.95)';
    ctx.fillRect(0,0,platonicCanvas.width,platonicCanvas.height);
	ctx.rotate(Math.PI/8);
	ctx.fillStyle = 'black';
    ctx.fillText('Platonic Can', 20, 50);
	
	var platonicText = new THREE.Texture(platonicCanvas) 
	platonicText.needsUpdate = true;
	var platonicMat = new THREE.MeshPhongMaterial( {map: platonicText, side:THREE.DoubleSide } );
	var platonicTop = new THREE.MeshPhongMaterial({color:0xaaaaaa});
	var platonicMats = new THREE.MeshFaceMaterial([platonicMat, platonicTop]);						
    
	platonicCan = new THREE.Mesh(geometry, platonicMats);		
	platonicCan.castShadow = true;	
	scene.add(platonicCan);	
}

function kaboom() {
	for (var i = 0; i < cans.length; i++) {
		var can = cans[i];		
		can.setLinearVelocity(new THREE.Vector3(Math.random() * 10,Math.random() * 10,Math.random() * 10));
		can.setAngularVelocity(new THREE.Vector3(Math.random() * 10,Math.random() * 10,Math.random() * 10));
	}
}

function resetCans() {
	for (var i = 0; i < cans.length; i++) {
		scene.remove(cans[i]);
	}
	cans = [];
	placeCans();
}
function placeCans() {
	var rows = [];	
	for(var i = GUI['Can rows']; i > 0; i--){
		rows.push(Math.ceil(Math.random() * 36));		
	}
			
	var canRows = canCoords(rows);		
	for (var r = 0; r < canRows.length; r++) {	
		var row = canRows[r];
		var material = labelMaterials[Math.floor(Math.random() * labelMaterials.length)]; //Assign random label			
		for (var c = 0; c < row.length; c++) {			
			var coord = row[c];
			var can = new Physijs.BoxMesh(canGeo, new THREE.MeshPhongMaterial({color: 0xffffff }));					
			can.position.set(coord.x, coord.y, coord.z);
			can.rotation.y = Math.random() * Math.PI*2;							
			can.material = material;
			can.castShadow = true;				
			cans.push(can);							
		}			
	}		

	setTimeout(function() { //Keep loading message from flashing too fast
		document.getElementById('info').innerHTML = '';		
	}, 1000);
	scene.remove(platonicCan);		
	for (var i = 0; i < cans.length; i++) {		
		scene.add(cans[i]);	
	}
}

//Stacking algorithm - each can is 1 unit tall
function canCoords(rowTotals){
	var coords = [];
	var x = 0;
	rowTotals.forEach(function(total){
		coords.push([]);
		var height = 0;
		while(coords[x].length < total){
			var y = 0;
			var z = height;
			while(y <= height){
				coords[x].push(new THREE.Vector3(x, y, z));
				y++
				z--;
				if(coords[x].length == total){
					break;
				}
			}
			height++;
		}
		x++;
	});
	return coords;
}