var GUI = {
	'Can rows': 1,
	'Update': function() { resetCans(); },
	'Shadows': true,
	'Popping cans': false,
	'Zero gravity': false
};

window.onload = function() { 
  var gui = new dat.GUI();
  gui.add(GUI, 'Can rows').min(1).max(10).step(1);
  gui.add(GUI, 'Update');
  gui.add(GUI, 'Shadows').onChange(function() {
	renderer.shadowMapAutoUpdate = GUI['Shadows'];
	if (!GUI['Shadows']) renderer.clearTarget( light.shadowMap );	
  });
  
  gui.add(GUI, 'Popping cans');
  gui.add(GUI, 'Zero gravity');
}