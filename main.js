import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import SpriteText from 'three/addons/sprite-text'

// Three.js global elements
let scene, camera, controls, renderer, skybox, earth

const earthRadius = 100
const meridians = 64
const parallels = 32
const proxyURL = 'https://api.codetabs.com/v1/proxy/?quest='
const mapURL = 'https://map.earthmc.net/tiles'

// Hideable scene elements
const players = []
const playerLabels = []
const towns = []
const townLabels = []

// For downloading and merging tiles
const tileXCount = 16 + 2
const tileZCount = 8 + 2
const tileSize = 512 // pixels
const drawingCanvas = document.createElement('canvas')
const drawingContext = drawingCanvas.getContext('2d')
drawingCanvas.width = tileXCount * 512
drawingCanvas.height = tileZCount * 512

downloadTiles()

let loadedTiles = 0

const startDownload = new Date()
function downloadTiles() {
	initRenderer()
	initSkybox()
	initControls()

	const tileZoom = 0
    for (let x = -(tileXCount/2); x < tileXCount/2; x++) {
        for (let z = -(tileZCount/2); z < tileZCount/2; z++) {
            // We need to start placing tiles on canvas at 0, 0
			const tileX = x + tileXCount/2
            const tileZ = z + tileZCount/2
			const imgSrc = proxyURL + mapURL + `/minecraft_overworld/${tileZoom}/${x}_${z}.png`
			loadTile(imgSrc, tileX, tileZ)
		}
	}
}

function loadTile(imgSrc, tileX, tileZ) {
	const img = new Image()
	img.crossOrigin = 'Anonymous'
	img.src = imgSrc
	img.onload = () => {
		drawingContext.drawImage(img, tileX * tileSize, tileZ * tileSize, tileSize, tileSize)
		loadedTiles++
		document.getElementById('subtitle').textContent = `${loadedTiles}/${tileXCount * tileZCount} tiles`

		if (loadedTiles == tileXCount * tileZCount) {
			const stopDownload = new Date()
			const diff = getTimeDiff(startDownload, stopDownload)
			console.log(`[Dynglobe] Downloading tiles took ${diff}s`)
			initEarth()
			renderTowns()
		}
	}
	// Retry to download tile without a delay. Throws many errors in console, but it's probably faster
	img.onerror = () => loadTile(imgSrc, tileX, tileZ)
}

function removeLoadingPrompt() {
	const prompt = document.getElementById('loading-prompt')
	prompt.style.opacity = 1
	for (let i = 0; i < 200; i += 1) {
		setTimeout(() => prompt.style.opacity -= 0.005, 5 * i)
	}
	setTimeout(() => prompt.remove(), 1001)
}

function initControls() {
	controls = new OrbitControls(camera, renderer.domElement)
	controls.minDistance = earthRadius * 1.04
	controls.maxDistance = earthRadius * 10
	controls.enableDamping = true
	controls.dampingFactor = 0.2
	controls.enablePan = false
	camera.position.z = earthRadius * 8
	tick()
}

function initRenderer() {
	const fov = 20
	const nearPlane = 0.1
	const farPlane = 6000
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		logarithmicDepthBuffer: true // avoid z-fighting
	})
	// Disable unwanted three.js 0.152.0 changes
	THREE.ColorManagement.enabled = false
	renderer.outputColorSpace = THREE.LinearSRGBColorSpace

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, nearPlane, farPlane)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	window.addEventListener('resize', resize, false)
}

function initSkybox() {
	const skyboxSize = 3000
	const geometry = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize)
	const faces = [0, 1, 1, 1, 1, 1].map(side => {
		const texture = new THREE.TextureLoader().load(`./images/skybox${side}.png`)
		return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
	})
	skybox = new THREE.Mesh(geometry, faces)
	scene.add(skybox)
	setInterval(renderPlayers, 3000)
}

function initMenu() {
	const menuButton = document.getElementById('menu-button')
	const menu = document.getElementById('menu')
	menuButton.style = ''
	menuButton.onclick = () => {
		menu.style.display = (menu.style.display == 'none') ? '' : 'none'
	}
	const checkboxes = document.querySelectorAll('input[type=checkbox]')
	for (const checkbox of checkboxes) {
		checkbox.onchange = () => setVisibility(checkbox.id, checkbox.checked)
	}
	document.onkeydown = (event) => {
		if (event.key != 'g') return
		menuButton.style.display = (menuButton.style.display == 'none') ? '' : 'none'
		if (menuButton.style.display == 'none') menu.style.display = 'none'
	}
}

function initAtmosphere() {
	const vertexShader =
    `varying vec3 vertexNormal;
    void main() {
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`
    const fragmentShader =
    `varying vec3 vertexNormal;
    void main() {
        float fadeOutFactor = 0.33;
        vec3 forward = vec3(0, 0, 1.0);
        vec4 blueColor = vec4(0.3, 0.6, 1.0, 1.0);
        float intensity = fadeOutFactor - dot(vertexNormal, forward);
        gl_FragColor = blueColor * intensity;
    }`

	const geometry = new THREE.SphereGeometry(earthRadius * 1.1, meridians, parallels)
	const material = new THREE.ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide,
		depthWrite: false,
		depthTest: false
	})
	const atmosphere = new THREE.Mesh(geometry, material)
	scene.add(atmosphere)
	atmosphere.renderOrder = 0
	earth.renderOrder = 1
}

function initEarth() {
	// How many pixels to crop from each side off the map
	const crop = { left: 448, right: 472, top: 480, bottom: 496 }

	const mapWidth = tileXCount * tileSize - crop.left - crop.right
    const mapHeight = tileZCount * tileSize - crop.top - crop.bottom
	const mapTexture = document.createElement('canvas')
	const mapContext = mapTexture.getContext('2d')
	mapTexture.width = mapWidth
	mapTexture.height = mapHeight

	mapContext.drawImage(drawingCanvas, crop.left, crop.top, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight)
	const texture = new THREE.Texture(mapTexture)
	texture.needsUpdate = true

	const material = new THREE.MeshBasicMaterial({ map: texture })
	const geometry = new THREE.SphereGeometry(earthRadius, meridians, parallels)
	earth = new THREE.Mesh(geometry, material)

	scene.add(earth)
	earth.rotation.y = -Math.PI / 2 // Set the camera above the prime meridian
	initAtmosphere()
}

function tick() {
	skybox.position.set(camera.position.x, camera.position.y, camera.position.z)
	const zoom = controls.getDistance()
	controls.zoomSpeed = zoom ** 1.3 / 1000
	controls.rotateSpeed = zoom ** 1.5 / 20000
	controls.update()

	if (isEnabled('surface-flight')) surfaceFlight()
	const isTooFar = (zoom > 150)
	if (townLabels) for (const label of townLabels) {
        label.visible = isEnabled('town-labels') && isEnabled('towns') && !isTooFar
    }
    if (playerLabels) for (const playerLabel of playerLabels) {
        playerLabel.visible = isEnabled('players') && !isTooFar
    }

	renderer.render(scene, camera)
	requestAnimationFrame(tick)
}

function setVisibility(checkbox, boolean) {
	if (checkbox == 'players') {
		setObjectsVisibility(players, boolean)
		setObjectsVisibility(playerLabels, boolean)
	}
	if (checkbox == 'towns') {
		setObjectsVisibility(towns, boolean)
		setObjectsVisibility(townLabels, boolean)
	}
	if (checkbox == 'town-labels') {
		setObjectsVisibility(townLabels, boolean)
	}
}

function surfaceFlight() {
	const viewAngle = document.getElementById('surface-flight-view-angle').value
	let angle = Math.PI / 2
	const effect = Math.exp(viewAngle * (earthRadius - camera.position.length()))
	angle *= effect
	const pitchAxis = new THREE.Vector3( 1, 0, 0 )
	camera.rotateOnAxis( pitchAxis, angle )
}

function initialize() {
	removeLoadingPrompt()
	initMenu()
	const totalTime = getTimeDiff(startDownload, new Date())
	console.log(`[Dynglobe] Total processing time was ${totalTime}s`)
}

function resize() {
	const width = window.innerWidth
	const height = window.innerHeight
	camera.aspect = width / height
	camera.updateProjectionMatrix()
	renderer.setSize(width, height)
}

async function renderPlayers() {
	for (const player of players) { scene.remove(player) }
	for (const label of playerLabels) { scene.remove(label) }

	const data = await fetchJSON(proxyURL + mapURL + '/players.json')
	if (!data) return console.log('[Dynglobe] Could not get player list')

	const geometry = new THREE.SphereGeometry(0.2, 16, 8) // size, width/height segments
	const material = new THREE.MeshBasicMaterial({ color: 0x000000 })

	const labelTextHeight = 0.33
	for (const player of data.players) {
		const location = cartesianToSpherical(player.x, player.z, earthRadius)
		const mesh = new THREE.Mesh(geometry, material)
		const label = new SpriteText(player['display_name'], labelTextHeight)
		label.backgroundColor = 'rgba(0, 0, 0, 0.5)'
		const labelLocation = cartesianToSpherical(player.x, player.z, earthRadius * 1.005)

		if (!isEnabled('players')) {
			mesh.visible = false
			label.visible = false
		}

		mesh.position.set(...location)
		label.position.set(...labelLocation)
		scene.add(mesh)
		scene.add(label)

		players.push(mesh)
		playerLabels.push(label)
	}
}

async function renderTowns() {
	const startTownRender = new Date()
	const data = await fetchJSON(proxyURL + mapURL + '/minecraft_overworld/markers.json')
	if (!data || data[0].markers.length == 0) {
		sendNotification('There was a problem with fetching data from EarthMC')
		return initialize()
	}

	const regions = []

	// Collect info about towns
	for (const town of data[0].markers) {
		if (town.type != 'polygon') continue

		const townName = town.tooltip.match(/<b>(.*)<\/b>/)[1]
		const nation = town.tooltip.match(/\(\b(?:Member|Capital)\b of (.*)\)\n/)?.at(1)
		const fill = town.fillColor
		const outline = town.color ?? fill
		for (const region of town.points) {
			let area = 0
			const vertices = []
			for (const vertex of region[0]) {
				vertices.push({x: roundTo16(vertex.x), z: roundTo16(vertex.z)})
			}
			area += getArea(vertices)

			const isRegionPushed = regions.find(region => region.town == townName)
			if (!isRegionPushed || area > 50) regions.push({
				town: townName,
				nation: nation,
				vertices: vertices,
				fill: fill,
				outline: outline })
			else regions.push({ vertices: vertices, fill: fill, outline: outline })
		}
	}

	// Place down every collected town
	// geoJSON will be needed for conic polygon geometries
	const geoJson = { type: "FeatureCollection", features: [] }
	for (const region of regions) {
		const vertices = []
        const geoJsonCoords = []
        const verticesCoords = {x: new Set(), z: new Set()}
        let startVertexLoc
		let index = 0
		for (const vertex of region.vertices) {
			const location = cartesianToSpherical(vertex.x, vertex.z, earthRadius * 1.0001)
			const longitude = vertex.x / xDivisor + xConst
			const latitude = -(vertex.z / zDivisor + zConst) // Invert Z-axis because Minecraft
			const vertexLocation = new THREE.Vector3(...location)
			geoJsonCoords.push([longitude, latitude])

			vertices.push(vertexLocation)
            if (index == 0) startVertexLoc = vertexLocation

            verticesCoords.x.add(vertex.x)
            verticesCoords.z.add(vertex.z)
			index++
		}

		// Prepare for drawing town's fill
		geoJsonCoords.push(geoJsonCoords[0])
		geoJsonCoords.reverse()
		geoJson.features.push({
			type: 'Feature',
			properties: {
				fill: region.fill,
				outline: region.outline
			},
			geometry: {
				type: 'polygon',
				coordinates: [geoJsonCoords]
			}
		})

		// Draw town's outline
		vertices.push(startVertexLoc) // Push start vertex again
		const material = new THREE.LineBasicMaterial({ color: region.outline })
		const geometry = new THREE.BufferGeometry().setFromPoints(vertices)
		const line = new THREE.Line(geometry, material)
		scene.add(line)
		towns.push(line)

		// Draw town label
		if (region.town) {
			const townCenter = {
				x: (Math.min(...verticesCoords.x) + Math.max(...verticesCoords.x)) / 2,
                z: (Math.min(...verticesCoords.z) + Math.max(...verticesCoords.z)) / 2
			}
			const labelLocation = cartesianToSpherical(townCenter.x, townCenter.z, earthRadius + 0.33)
			const text = (region.nation == null) ? region.town : region.town + '\n' + region.nation
			const label = new SpriteText(text, 0.2, 'black') // text, height, color
			label.backgroundColor = 'rgb(255, 255, 255, 0.25)'
			scene.add(label)
			townLabels.push(label)
			label.position.set(...labelLocation)
		}

	}

	// Draw towns fill
	const bottomHeight = 0
	for (const {properties, geometry} of geoJson.features) {
		for (const polygonCoords of [geometry.coordinates]) {
			const geometry = new ConicPolygonGeometry(polygonCoords, bottomHeight, earthRadius * 1.0001)
			const material = [
				null, // sides
				null, // bottom
				new THREE.MeshBasicMaterial({
					color: properties.fill,
					opacity: 0.4,
					transparent: true,
					side: THREE.FrontSide
				}) // top
			]
			const mesh = new THREE.Mesh(geometry, material)
			scene.add(mesh)
			towns.push(mesh)
		}
	}

	const stopTownRender = new Date()
	const diff = getTimeDiff(startTownRender, stopTownRender)
	console.log(`[Dynglobe] Rendering towns took ${diff}s`)

	initialize()
}

/* Utility functions ... */

// EarthMC map is not symmetrical and misses certain longitudes, we need these constants and adjusters
const xConst = 0.54249580568
const zConst = 0.358392393
const xDivisor = 184.333333 // times 180 equals avg of -33280 and 33080
const zDivisor = 184.155555 // times 90  equals avg of -16640 and 16508
function cartesianToSpherical(x, z, radius) {
	const longitude = x / xDivisor + xConst
    const latitude = (z / zDivisor + zConst) * -1 // Invert Z-axis because Minecraft
	const theta = longitude * (Math.PI / 180)
	const phi = latitude * (Math.PI / 180)
	const ox = radius * Math.sin(theta) * Math.cos(phi)
	const oy = radius * Math.sin(phi)
	const oz = radius * Math.cos(theta) * Math.cos(phi)
	return [ox, oy, oz]
}

function roundTo16(number) {
	return Math.round(number / 16) * 16
}

// Shoelace formula
function getArea(vertices) {
    const n = vertices.length
    let area = 0

	// Vertices need rounding to 16 because data has imprecise coordinates
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n
        area += roundTo16(vertices[i].x) * roundTo16(vertices[j].z)
        area -= roundTo16(vertices[j].x) * roundTo16(vertices[i].z)
    }

    return (Math.abs(area) / 2) / (16 * 16)
}

// Get difference between times in x.xx seconds
function getTimeDiff(start, stop) {
	return Math.round((stop - start) / 1000 * 100) / 100
}

function isEnabled(option) {
	return document.getElementById(option).checked
}

function setObjectsVisibility(objects, boolean) {
	if (objects) for (const object of objects) object.visible = boolean
}

async function fetchJSON(url) {
	const response = await fetch(url)
	if (response.ok) return response.json()
	else return null
}

const notification = document.getElementById('notification')
const notifMessage = document.getElementById('notification-message')
document.getElementById('notification-button').onclick = () => {
	notifMessage.textContent = ''
	notification.style.display = 'none'
}

function sendNotification(message) {
	notifMessage.textContent = message
	notification.style.display = 'inline'
    console.log('[Dynglobe]', message)
}