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
		var materials = [label, topMaterial];
		var mat = new THREE.MeshFaceMaterial(materials);						
		labelMaterials.push(mat);	
		loadingCount.innerHTML = "[" + labelMaterials.length + "/" + textures.length + "]";
		loadTextures(currentText + 1, completeFn); //Async recursive
	});
}

function loadCan(geometry, materials) {		
	var platonicMat = new THREE.MeshLambertMaterial({color:0xff0000});
	platonicCan = new THREE.Mesh(geometry, platonicMat);	
	platonicCan.castShadow = true;
	scene.add(platonicCan);	
	loadingCount.innerHTML = "[1/" + textures.length + "]";
	
	
	loadTextures(0, function(){	
		var rows = [3];
		//for(var i = (Math.random()*20); i > 0; i--){
		//	rows.push(Math.ceil(Math.random() * 36));
		//}
		//canCoords(rows).forEach(function(row){		
		var canRows = canCoords(rows);
		for (var r = 0; r < canRows.length; r++) {		
			var row = canRows[r];
			var material = labelMaterials[Math.floor(Math.random() * labelMaterials.length)]; //Assign random label
			for (var c = 0; c < row.length; c++) {
				var coord = row[c];
			//row.forEach(function(coord){
				var can = new Physijs.BoxMesh( geometry, new THREE.MeshPhongMaterial({color: 'red' }));					
				can.position.set(coord.x, coord.y, coord.z);
				can.rotation.y = Math.random() * Math.PI*2;				
				//can.rotation.x = Math.PI/4;
				can.material = material;
				can.castShadow = true;				
				cans.push(can);				
			}
			//});
		}
		//});	

		document.getElementById('info').innerHTML = '';		
		scene.remove(platonicCan);		
		for (var i = 0; i < cans.length; i++) {
			scene.add(cans[i]);	
		}				
	});
	render();	
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