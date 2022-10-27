const radius = 100,
	bounds = {leftX: -33280, rightX: 33080, upZ: -16640, downZ: 16508},
	x_constant = 0.54249580568,
	z_constant = 0.358392393,
	x_divisor = 184.333333,
	z_divisor = 184.155555,
	zoom_stages = [
		{maxDistance: 1001, minDistance: 900, speed: 2},
		{maxDistance: 899, minDistance: 800, speed: 1.8},
		{maxDistance: 799, minDistance: 700, speed: 1.7},
		{maxDistance: 699, minDistance: 600, speed: 1.6},
		{maxDistance: 599, minDistance: 500, speed: 1.4},
		{maxDistance: 499, minDistance: 400, speed: 1.3},
		{maxDistance: 399, minDistance: 300, speed: 1.25},
		{maxDistance: 299, minDistance: 230, speed: 1.2},
		{maxDistance: 229, minDistance: 180, speed: 0.9},
		{maxDistance: 179, minDistance: 140, speed: 0.7},
		{maxDistance: 139, minDistance: 120, speed: 0.4},
		{maxDistance: 119, minDistance: 110, speed: 0.25}
	],
	rotate_stages = [
		{maxDistance: 1001, minDistance: 900, speed: 0.5},
		{maxDistance: 899, minDistance: 800, speed: 0.48},
		{maxDistance: 799, minDistance: 700, speed: 0.45},
		{maxDistance: 699, minDistance: 600, speed: 0.4},
		{maxDistance: 599, minDistance: 500, speed: 0.34},
		{maxDistance: 499, minDistance: 400, speed: 0.25},
		{maxDistance: 399, minDistance: 300, speed: 0.2},
		{maxDistance: 299, minDistance: 230, speed: 0.13},
		{maxDistance: 229, minDistance: 180, speed: 0.09},
		{maxDistance: 179, minDistance: 140, speed: 0.06},
		{maxDistance: 139, minDistance: 120, speed: 0.04},
		{maxDistance: 119, minDistance: 110, speed: 0.025}
	],
	playerGeometry = new THREE.SphereGeometry(0.2),
	playerMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
	
let scene, renderer, camera, controls, skybox;
const townLabelsObj = [],
	playersObj = [],
	playerLabelsObj = [],
	townsObj = [];
const drawMeganations = false;
let surfaceFly = true;
const axis = new THREE.Vector3( 1, 0, 0 );

// Two methods to draw text sprites.
function makeTextSprite(message, parameters) {
	if ( parameters === undefined ) parameters = {};
	const fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial",
		fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 12,
		borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 2,
		borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:0.0 },
		backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:0.6 },
		textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:255, g:255, b:255, a:1.0 };

	const canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
	const metrics = context.measureText( message ),
		textWidth = metrics.width;

	context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

	context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
	context.fillText( message, borderThickness, fontsize + borderThickness);

	const texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	const spriteMaterial = new THREE.SpriteMaterial({ map: texture }),
		sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
	return sprite;  
}

function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

document.getElementById('nova').addEventListener('click', function() { toggleMap('nova') })
document.getElementById('aurora').addEventListener('click', function() { toggleMap('aurora') })
document.getElementById('players').addEventListener('change', function() { toggle('players') })
document.getElementById('towns').addEventListener('change', function() { toggle('towns') })
document.getElementById('labels').addEventListener('change', function() { toggle('labels') })
document.getElementById('flysurf').addEventListener('change', function() { toggle('flysurf') })

function toggleMap(server) {
	window.sessionStorage.setItem('server', server)
	window.location.reload();
}

function toggle(param) {
	switch (param) {
		case 'players':
			playersObj.forEach(player => {player.visible = !player.visible});
			playerLabelsObj.forEach(player => {player.visible = !player.visible});
			break;
		case 'towns':
			townsObj.forEach(town => {town.visible = !town.visible});
			break;
		case 'labels':
			townLabelsObj.forEach(label => {label.visible = !label.visible});
			break;
		case 'flysurf':
			surfaceFly = !surfaceFly;
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
	const earthGeometry = new THREE.SphereGeometry(radius, 50, 50),
		earthMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/map.png') }),
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
	controls.minDistance = 110;
	controls.maxDistance = 1000;
	controls.enableDamping = true;
	controls.dampingFactor = 0.2;
	controls.enablePan = false;
	controls.zoomToCursor = true;
}

function update() {
	skybox.position.set(camera.position.x, camera.position.y, camera.position.z);
	controls.update();
	if (surfaceFly) {
		let angle = Math.PI / 2;
		const effect = Math.exp(0.04 * (radius - camera.position.length()))
		angle *= effect;
		camera.rotateOnAxis( axis, angle );
	}
	const zoom = controls.getDistance();
	zoom_stages.forEach(stage => {
		if (zoom >= stage.minDistance && zoom <= stage.maxDistance) controls.zoomSpeed = stage.speed;
	});
	rotate_stages.forEach(stage => {
		if (zoom >= stage.minDistance && zoom <= stage.maxDistance) controls.rotateSpeed = stage.speed;
	});
	if (zoom > 150) {
		playerLabelsObj.forEach(player => {player.visible = false});
		townLabelsObj.forEach(label => {label.visible = false});
	} else {
		playerLabelsObj.forEach(player => {player.visible = document.getElementById('players').checked});
		townLabelsObj.forEach(player => {player.visible = document.getElementById('labels').checked});
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
	let players = [],
	placedPlayers = [],
	placedLabels = [];
	const server = window.sessionStorage.getItem('server') || 'aurora';
	fetch(`https://emc-toolkit.vercel.app/api/${server}/onlineplayers`)
		.then(res => res.json())
		.then(json => {
			playersObj.splice(0, playersObj.length);
			playerLabelsObj.splice(0, playerLabelsObj.length);
			json.forEach(player => { if (!player.underground) players.push({ name: player.name, x: player.x, z: player.z }); });
			
			players.forEach(player => {
				const longitude = player.x / x_divisor + x_constant,
					latitude = -(player.z / z_divisor + z_constant),
					theta = longitude * (Math.PI / 180),
					phi = latitude * (Math.PI / 180),
					x = radius * Math.sin(theta) * Math.cos(phi),
					y = radius * Math.sin(phi),
					z = radius * Math.cos(theta) * Math.cos(phi);

				const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
				placedPlayers.push(playerMesh);
				playerMesh.position.set(x, y, z);
				const label = makeTextSprite(player.name);
				placedLabels.push(label);
				playerLabelsObj.push(label);
				playersObj.push(playerMesh);
				scene.add(label);
				label.position.set((radius + 0.4) * Math.sin((longitude + 2) * (Math.PI / 180)) * Math.cos((latitude - 1) * (Math.PI / 180)), (radius + 0.4) * Math.sin((latitude - 1) * (Math.PI / 180)), (radius + 0.4) * Math.cos((longitude + 2) * (Math.PI / 180)) * Math.cos((latitude - 1) * (Math.PI / 180)));
				scene.add(playerMesh);
			})

			// Make this method a recurrence and delete old positions.
			setTimeout(() => {
				placedPlayers.forEach(player => scene.remove(player));
				placedLabels.forEach(label => scene.remove(label));
				renderPlayers();
			}, 30000);

		}).catch((error) => console.error(`Couldn't load players, error: ${error}`));
}

function renderTowns() {
	const townData = [];
	const server = window.sessionStorage.getItem('server') || 'aurora';
	fetch('https://corsproxy.io/?' + encodeURIComponent(`https://earthmc.net/map/${server}/tiles/_markers_/marker_earth.json`))
		.then(res => res.json())
		.then(json => {

			// Delete shop areas and create an array of towns.
			Object.keys(json.sets["townyPlugin.markerset"].areas).forEach(area => { if (area.includes('_Shop')) delete json.sets["townyPlugin.markerset"].areas[area]; });
			Object.values(json.sets["townyPlugin.markerset"].areas).forEach(town => {
				const townCoords = [];
				Object.values(town.x).forEach((x, i) => {
					let z = town.z[i];
					if (x > bounds.rightX || x < bounds.leftX) x < 0 ? x += x + bounds.leftX : x -= x - bounds.rightX		
					if (z > bounds.downZ || z < bounds.upZ) z < 0 ? z += z + bounds.upZ : z -= z - bounds.downZ;
					townCoords.push({ x: x, z: z });
				})
				const nation = !town.desc.includes('"nofollow">') ? town.desc.split(' (')[1].split(')')[0] : town.desc.split('"nofollow">')[1].split('</a>)')[0];
				townData.push({ name: town.label, fill: town.fillcolor, outline: town.color, nation: nation, vertices: townCoords });

			});
			let geoJson = {"type": "FeatureCollection", "features": []}
			
			townData.forEach((town) => {
				const geoJsonCoords = [],
					points = [],
					xs = [],
					zs = [];
				let startPoint;
				// Convert coordinates to the Cartesian coordinate system.
				Object.values(town.vertices).forEach((vertex, vertexIndex) => {
					const longitude = vertex.x / x_divisor + x_constant,
						latitude = -(vertex.z / z_divisor + z_constant),
						theta = longitude * (Math.PI / 180),
						phi = latitude * (Math.PI / 180),
						x = (radius + 0.02) * Math.sin(theta) * Math.cos(phi),
						y = (radius + 0.02) * Math.sin(phi),
						z = (radius + 0.02) * Math.cos(theta) * Math.cos(phi);
					geoJsonCoords.push([longitude, latitude]);
					if (!xs.includes(vertex.x)) xs.push(vertex.x);
					if (!zs.includes(vertex.z)) zs.push(vertex.z);
					// Push vertices to points array.
					const point = new THREE.Vector3(x, y, z);
					if (vertexIndex == 0) startPoint = point;
					points.push(point);
					
				});
				geoJsonCoords.push(geoJsonCoords[0]);
				
				// I had to manually adjust lng and lat for some reason.
				const avgX = (Math.min(...xs) + Math.max(...xs)) / 2,
					avgZ = (Math.min(...zs) + Math.max(...zs)) / 2,
					longitude = avgX / x_divisor + x_constant,
					latitude = -(avgZ / z_divisor + z_constant),
					theta = (longitude + 1.8) * (Math.PI / 180),
					phi = (latitude - 0.7) * (Math.PI / 180),
					x = (radius + 0.33) * Math.sin(theta) * Math.cos(phi),
					y = (radius + 0.33) * Math.sin(phi),
					z = (radius + 0.33) * Math.cos(theta) * Math.cos(phi);
				points.push(startPoint);
				geoJson.features.push({"type": "Feature", "properties": {"nation": town.nation, "fill": town.fill, "outline": town.outline}, geometry: {"type": "Polygon", "coordinates": [geoJsonCoords]}})
				// Render lines.
				const lineMaterial = new THREE.LineBasicMaterial({ color: !drawMeganations ? town.outline : getColor(town.nation.toLowerCase()) }),
					lineGeometry = new THREE.BufferGeometry().setFromPoints(points),
					line = new THREE.Line(lineGeometry, lineMaterial);
				scene.add(line);
				townsObj.push(line);
				const label = makeTextSprite(town.nation ? `${town.name}, ${town.nation}` : `${town.name}`, { fontsize: 10, backgroundColor: {r: 0, g: 166, b: 88, a: 0.33}, textColor: {r: 0, g: 199, b: 255, a: 1.0} });
				scene.add(label);
				townLabelsObj.push(label);
				label.position.set(x, y, z);
				
			});
			// Render shapes.
			const polygonMeshes = [];
			geoJson.features.forEach(({properties, geometry}) => {
				const polygons = [geometry.coordinates];
				polygons.forEach(coords => {
					polygonMeshes.push(
						new THREE.Mesh( new THREE.ConicPolygonGeometry(coords, 0, radius + 0.02),
						[ new THREE.MeshBasicMaterial({ opacity: 0.0, transparent: true }),
						new THREE.MeshBasicMaterial({ opacity: 0.0, transparent: true }),
						new THREE.MeshBasicMaterial({ color: !drawMeganations ? properties.fill : getColor(properties.nation.toLowerCase()), opacity: 0.2, transparent: true }) ]
						)
					);
				});
			});
			polygonMeshes.forEach(mesh => {
				scene.add(mesh);
				townsObj.push(mesh);
			});
		});
}

initialize();
update();
renderTowns();
renderPlayers();
window.addEventListener('resize', resize, false);