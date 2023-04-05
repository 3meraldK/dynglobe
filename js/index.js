const radius = 100,
	bounds = { leftX: -33280, rightX: 33080, upZ: -16640, downZ: 16508 },
	x_constant = 0.54249580568,
	z_constant = 0.358392393,
	x_divisor = 184.333333,
	z_divisor = 184.155555,
	zoom_stages = [
		{ maxDistance: 1001, minDistance: 900, speed: 2 },
		{ maxDistance: 899, minDistance: 800, speed: 1.8 },
		{ maxDistance: 799, minDistance: 700, speed: 1.7 },
		{ maxDistance: 699, minDistance: 600, speed: 1.6 },
		{ maxDistance: 599, minDistance: 500, speed: 1.4 },
		{ maxDistance: 499, minDistance: 400, speed: 1.3 },
		{ maxDistance: 399, minDistance: 300, speed: 1.25 },
		{ maxDistance: 299, minDistance: 230, speed: 1.2 },
		{ maxDistance: 229, minDistance: 180, speed: 0.9 },
		{ maxDistance: 179, minDistance: 140, speed: 0.7 },
		{ maxDistance: 139, minDistance: 120, speed: 0.4 },
		{ maxDistance: 119, minDistance: 104, speed: 0.25 }
	],
	rotate_stages = [
		{ maxDistance: 1001, minDistance: 900, speed: 0.5 },
		{ maxDistance: 899, minDistance: 800, speed: 0.48 },
		{ maxDistance: 799, minDistance: 700, speed: 0.45 },
		{ maxDistance: 699, minDistance: 600, speed: 0.4 },
		{ maxDistance: 599, minDistance: 500, speed: 0.34 },
		{ maxDistance: 499, minDistance: 400, speed: 0.25 },
		{ maxDistance: 399, minDistance: 300, speed: 0.2 },
		{ maxDistance: 299, minDistance: 230, speed: 0.13 },
		{ maxDistance: 229, minDistance: 180, speed: 0.09 },
		{ maxDistance: 179, minDistance: 140, speed: 0.06 },
		{ maxDistance: 139, minDistance: 120, speed: 0.04 },
		{ maxDistance: 119, minDistance: 104, speed: 0.025 }
	],
	playerGeometry = new THREE.SphereGeometry(0.2),
	playerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }),
	townLabelsObj =  [], playersObj = [], playerLabelsObj = [], townsObj = [],
	axis = new THREE.Vector3( 1, 0, 0 );
	
let scene, renderer, camera, controls, skybox;
let surfaceFlight = true,
	angleMod = 0.04;

// Convert cartesian coords x, z to spherical coords with radius r.
function cartesianToSpherical(x, z, r) {
	const longitude = x / x_divisor + x_constant,
	latitude = -(z / z_divisor + z_constant),
	theta = longitude * (Math.PI / 180),
	phi = latitude * (Math.PI / 180),
	ox = r * Math.sin(theta) * Math.cos(phi),
	oy = r * Math.sin(phi),
	oz = r * Math.cos(theta) * Math.cos(phi);
	return [ox, oy, oz];
}

// Buttons/togglers listeners and methods.
document.getElementById('nova').addEventListener('click', function() { toggleMap('nova') });
document.getElementById('aurora').addEventListener('click', function() { toggleMap('aurora') });
document.getElementById('players').addEventListener('change', function() { toggleInput('players') });
document.getElementById('towns').addEventListener('change', function() { toggleInput('towns') });
document.getElementById('labels').addEventListener('change', function() { toggleInput('labels') });
document.getElementById('flysurf').addEventListener('change', function() { toggleInput('surfaceflight') });
document.getElementById('anglemod').addEventListener('input', function() { toggleInput('anglemod', this.value) });

function toggleMap(server) {
	window.sessionStorage.setItem('server', server);
	window.location.reload();
}

function toggleInput(param, value = null) {
	switch (param) {
		case 'players':
			playersObj.forEach(player => { player.visible = !player.visible; });
			playerLabelsObj.forEach(label => { label.visible = !label.visible; });
			break;
		case 'towns':
			townsObj.forEach(town => { town.visible = !town.visible; });
			break;
		case 'labels':
			townLabelsObj.forEach(label => { label.visible = !label.visible; });
			break;
		case 'surfaceflight':
			surfaceFlight = !surfaceFlight;
			break;
		case 'anglemod':
			angleMod = value;
	}
}

function initialize() {
	const width = window.innerWidth,
		height = window.innerHeight - 22;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 10000);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 800;
	
	// Render planet.
	const server = window.sessionStorage.getItem('server') || 'aurora',
		earthGeometry = new THREE.SphereGeometry(radius, 50, 50),
		earthMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`images/${server}.png`) }),
		earth = new THREE.Mesh(earthGeometry, earthMaterial);
	earth.rotation.y = -1.57;
	scene.add(earth);

	// Render skybox.
	const skyboxGeometry = new THREE.BoxGeometry(3000, 3000, 3000),
		skyboxFaces = [
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/top.png'), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/bottom.png'), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/left.png'), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/right.png'), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/front.png'), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/back.png'), side: THREE.DoubleSide }),
		];
	skybox = new THREE.Mesh(skyboxGeometry, skyboxFaces);
	scene.add(skybox);

	// Render atmosphere.
	const atmoGeometry = new THREE.SphereGeometry(radius * 1.1, 50, 50),
		vertexShader = 'varying vec3 vertexNormal;void main(){vertexNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
		fragmentShader = 'varying vec3 vertexNormal;void main(){float intensity=pow(0.45-dot(vertexNormal,vec3(0,0,1.0)),2.0);gl_FragColor=vec4(0.3,0.6,1.0,1.0)*intensity;}',
		atmoMaterial = new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, blending: THREE.AdditiveBlending, side: THREE.BackSide }),
		atmosphere = new THREE.Mesh(atmoGeometry, atmoMaterial);
	scene.add(atmosphere);

	// Configure controls.
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 104;
	controls.maxDistance = 1000;
	controls.enableDamping = true;
	controls.dampingFactor = 0.2;
	controls.enablePan = false;
	controls.zoomToCursor = true;
	controls.doubleClickZoom = true;
}

function update() {
	skybox.position.set(camera.position.x, camera.position.y, camera.position.z);
	controls.update();

	// Surface flight feature.
	if (surfaceFlight) {
		let angle = Math.PI / 2;
		const effect = Math.exp(angleMod * (radius - camera.position.length()));
		angle *= effect;
		camera.rotateOnAxis( axis, angle );
	}

	// Zoom & rotate staging.
	const zoom = controls.getDistance();
	zoom_stages.forEach(stage => {
		if (zoom >= stage.minDistance && zoom <= stage.maxDistance) controls.zoomSpeed = stage.speed;
	});
	rotate_stages.forEach(stage => {
		if (zoom >= stage.minDistance && zoom <= stage.maxDistance) controls.rotateSpeed = stage.speed;
	});
	if (zoom > 150) {
		playerLabelsObj.forEach(player => { player.visible = false; });
		townLabelsObj.forEach(label => { label.visible = false; });
	} else {
		playerLabelsObj.forEach(player => { player.visible = document.getElementById('players').checked; });
		townLabelsObj.forEach(player => { player.visible = document.getElementById('labels').checked; });
	}

	renderer.render( scene, camera );
	requestAnimationFrame(update);
}

function resize() {
	const width = window.innerWidth,
		height = window.innerHeight - 22;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function renderPlayers() {
	let players = [], placedPlayers = [], placedLabels = [];
	const server = window.sessionStorage.getItem('server') || 'aurora';
	fetch('https://corsproxy.io/?' + encodeURIComponent(`https://emctoolkit.vercel.app/api/${server}/onlineplayers`))
		.then(res => res.json())
		.then(json => {
			playersObj.splice(0, playersObj.length);
			playerLabelsObj.splice(0, playerLabelsObj.length);
			json.forEach(player => { if (!player.underground) players.push({ name: player.name, x: player.x, z: player.z }); });
			
			// Add players and labels to world.
			players.forEach(player => {
				const location = cartesianToSpherical(player.x, player.z, radius),
					playerMesh = new THREE.Mesh(playerGeometry, playerMaterial),
					label = new SpriteText(player.name, 0.33),
					labelLocation = cartesianToSpherical(player.x, player.z, radius + 0.8);

				if (!document.getElementById('players').checked) playerMesh.visible = false;
				if (!document.getElementById('players').checked) label.visible = false;
				label.backgroundColor = 'rgba(0, 0, 0, 0.5)';

				placedPlayers.push(playerMesh);
				placedLabels.push(label);
				playerLabelsObj.push(label);
				playersObj.push(playerMesh);

				playerMesh.position.set(...location);
				label.position.set(...labelLocation);
				scene.add(label);
				scene.add(playerMesh);
			});

			// Delete old positions and call the function again.
			setTimeout(() => {
				placedPlayers.forEach(player => scene.remove(player));
				placedLabels.forEach(label => scene.remove(label));
				renderPlayers();
			}, 30000);

		}).catch((error) => console.error(`Couldn't load players, error: ${error}`));
}

function renderTowns() {
	const townData = [],
		server = window.sessionStorage.getItem('server') || 'aurora';

	let mapURL = `https://earthmc.net/map/${server}/`,
		markers = `standalone/MySQL_markers.php?marker=`,
		worldMarker = `_markers_/marker_earth.json`;
		
	fetch('https://corsproxy.io/?' + encodeURIComponent(`${mapURL}standalone/config.js`))
		.then(response => response.text())
		.then(config => {
			markers = config.split('markers:')[1].replace(/[\'\s};]/g, '')
			fetch('https://corsproxy.io/?' + encodeURIComponent(`${mapURL}${markers}${worldMarker}`))
				.then(res => res.json())
				.then(json => {

					// Delete shop areas and create an array of towns.
					Object.keys(json.sets['townyPlugin.markerset'].areas).forEach(area => { 
						if (area.includes('_Shop')) delete json.sets['townyPlugin.markerset'].areas[area]; 
					});

					// Push needed data to towns array.
					Object.values(json.sets['townyPlugin.markerset'].areas).forEach(town => {
						const townCoords = [];
						Object.values(town.x).forEach((x, i) => {
							let z = town.z[i];
							if (x > bounds.rightX || x < bounds.leftX) x < 0 ? x += x + bounds.leftX : x -= x - bounds.rightX;
							if (z > bounds.downZ || z < bounds.upZ) z < 0 ? z += z + bounds.upZ : z -= z - bounds.downZ;
							townCoords.push({ x: x, z: z });
						});
						const nationRegex = /(?<=\()[^)]*/;
						const nationWikiRegex = /(?<=nofollow">)[^<]+(?=<\/a>\))/;
						const nation = town.desc.includes('(<a ') ? town.desc.match(nationWikiRegex)[0] : town.desc.match(nationRegex)[0];
						townData.push({ name: town.label, fill: town.fillcolor, outline: town.color, nation: nation, vertices: townCoords });

					});

					// Calculate coords.
					let geoJson = { "type": "FeatureCollection", "features": [] };
					townData.forEach((town) => {
						const geoJsonCoords = [], points = [], xs = [], zs = [];
						let startPoint;
						Object.values(town.vertices).forEach((vertex, vertexIndex) => {
							const location = cartesianToSpherical(vertex.x, vertex.z, radius + 0.02),
								longitude = vertex.x / x_divisor + x_constant,
								latitude = -(vertex.z / z_divisor + z_constant),
								point = new THREE.Vector3(...location);
							geoJsonCoords.push([longitude, latitude]);
							if (!xs.includes(vertex.x)) xs.push(vertex.x);
							if (!zs.includes(vertex.z)) zs.push(vertex.z);
							if (vertexIndex == 0) startPoint = point;
							points.push(point);
							
						});

						const avgX = (Math.min(...xs) + Math.max(...xs)) / 2,
							avgZ = (Math.min(...zs) + Math.max(...zs)) / 2,
							location = cartesianToSpherical(avgX, avgZ, radius + 0.33);
						geoJsonCoords.push(geoJsonCoords[0]);
						points.push(startPoint);
						geoJson.features.push({ 
							"type": "Feature",
							"properties": { "nation": town.nation, "fill": town.fill, "outline": town.outline },
							geometry: { "type": "Polygon", "coordinates": [geoJsonCoords] }});
						
						// Render lines.
						const lineMaterial = new THREE.LineBasicMaterial({ color: town.outline }),
							lineGeometry = new THREE.BufferGeometry().setFromPoints(points),
							line = new THREE.Line(lineGeometry, lineMaterial);
						scene.add(line);
						townsObj.push(line);
						
						// Render goofy ah labels.
						const label = new SpriteText(town.nation ? `${town.name},\n${town.nation}` : `${town.name}`, 0.2, 'turquoise');
						scene.add(label);
						townLabelsObj.push(label);
						label.position.set(...location);
						
					});

					// Render polygons.
					const polygonMeshes = [];
					geoJson.features.forEach(({ properties, geometry }) => {
						const polygons = [geometry.coordinates];
						polygons.forEach(coords => {
							polygonMeshes.push(
								new THREE.Mesh( new THREE.ConicPolygonGeometry(coords, 0, radius + 0.02),
								[ new THREE.MeshBasicMaterial({ opacity: 0.0, transparent: true }),
								new THREE.MeshBasicMaterial({ opacity: 0.0, transparent: true }),
								new THREE.MeshBasicMaterial({ color: properties.fill, opacity: 0.2, transparent: true }) ]
								)
							);
						});
					});
					polygonMeshes.forEach(mesh => {
						scene.add(mesh);
						townsObj.push(mesh);
					});
				});
		})
		.catch(error => console.log(`Could not fetch config: ${error}`));
	
	
}

initialize();
update();
renderTowns();
renderPlayers();
window.addEventListener('resize', resize, false);