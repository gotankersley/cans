var GUI = {
	'Can rows': 1,
	'Reset': function() { resetCans(); },
	'Shadows': true,
	'Popping cans': false,
	'Zero gravity': false,
	'Floor texture': true,
	'Kaboom': function() {kaboom(); }
};

window.onload = function() {
	var gui = new dat.GUI();
	//Physics
	var folderPhysics = gui.addFolder('Physics');
	folderPhysics.add(GUI, 'Popping cans');
	folderPhysics.add(GUI, 'Zero gravity');
	folderPhysics.add(GUI, 'Kaboom');
	
	//Soda types
	var folderTypes = gui.addFolder('Soda types');
	for (var i = 0; i < textures.length; i++) {
		var text = textures[i];
		GUI[text] = true;
		folderTypes.add(GUI, text);
	}	
	
	//Rendering options
	var folderRender = gui.addFolder('Rendering options');
	folderRender.add(GUI, 'Shadows').onChange(function() {
		renderer.shadowMapAutoUpdate = GUI['Shadows'];
		if (!GUI['Shadows']) renderer.clearTarget( light.shadowMap );	
	});
	folderRender.add(GUI, 'Floor texture').onChange(function() {
		floor.material = GUI['Floor texture']? floorText : floorUntext;		
	});
	
	
	gui.add(GUI, 'Can rows').min(1).max(10).step(1);
	gui.add(GUI, 'Reset');
}