'use strict';

 function onMouseDown(e) {	
	e.preventDefault();
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;	
	mousePick();
}

function onMouseUp(e) {	
	if (mouse.drag) {
		mouse.drag = false;
		controls.enabled = true;		
		var zero = new THREE.Vector3(0,0,0);
		var one = new THREE.Vector3(1,1,1);
		if (GUI['Zero gravity']) { //0101 for zero-gravity
			selectedCan.setAngularFactor( zero ); 
			selectedCan.setAngularVelocity( one );
			selectedCan.setLinearFactor( zero );
			selectedCan.setLinearVelocity( one );
		}
		else {		
			selectedCan.setAngularFactor( one ); 
			selectedCan.setAngularVelocity( zero );
			selectedCan.setLinearFactor( one );
			selectedCan.setLinearVelocity( zero );
		}
	}
}

function onMouseMove(e) {	
	e.preventDefault();
	if (mouse.drag) {		
		mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;	
		
		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector(vector,camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		
		var intersects = raycaster.intersectObject(intersectPlane);		
		var newCursor = intersects[0].point;
	
		if (Math.abs(cursor.x - newCursor.x) < 0.01 && 
			Math.abs(cursor.y - newCursor.y) < 0.01 && 
			Math.abs(cursor.z - newCursor.z) < 0.01) {
			var zero = new THREE.Vector3();
			selectedCan.setAngularFactor( zero );
			selectedCan.setAngularVelocity( zero );
			selectedCan.setLinearFactor( zero );
			selectedCan.setLinearVelocity( zero );
		}
		else {
			var mouseDelta = new THREE.Vector3();			
			mouseDelta.copy(newCursor).sub(selectedCan.position).multiplyScalar(5);						
			selectedCan.setLinearVelocity(mouseDelta);			
		}
		cursor.copy(newCursor);	
		
	}
}

function mousePick() {
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = raycaster.intersectObjects( cans );
	
	if (intersects.length > 0 ) {		
		selectedCan = intersects[0].object;
		if (GUI['Popping cans']) {
			selectedCan.setLinearVelocity(new THREE.Vector3(0, 4, 0));
			return;
		}
		controls.enabled = false;		
		mouse.drag = true;		
		intersectPlane.position.copy(selectedCan.position);
		intersectPlane.lookAt(camera.position);
		var intersects2 = raycaster.intersectObject(intersectPlane);
		cursor.copy(intersects2[0].point);
		
		var zero = new THREE.Vector3();
		selectedCan.setAngularFactor( zero );
		selectedCan.setAngularVelocity( zero );
		selectedCan.setLinearFactor( zero );
		selectedCan.setLinearVelocity( zero );
	}
}