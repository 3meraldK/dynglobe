import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import SpriteText from 'three/addons/sprite-text'

// Three.js global elements
let scene, camera, controls, renderer, skybox
const earthRadius = 100
const proxyURL = 'https://api.codetabs.com/v1/proxy/?quest='
const mapURL = 'https://map.earthmc.net/tiles'

// Hideable scene elements
let players = []
let playerLabels = []
const towns = []
const townLabels = []

// For downloading and merging tiles
const tileXCount = 16 + 2
const tileZCount = 8 + 2
const drawingCanvas = document.createElement('canvas')
const drawingContext = drawingCanvas.getContext('2d')
drawingCanvas.width = tileXCount * 512
drawingCanvas.height = tileZCount * 512

downloadTiles()

let loadedTiles = 0
const startDownload = new Date()
function downloadTiles() {
	initThree()
	initSkybox()
	initControls()

	// These for loop numbers represent edge tiles
	for (let x = -9; x <= 8; x++) {
		for (let z = -5; z <= 4; z++) {
			const tileX = x + 9
			const tileZ = z + 5
			const imgSrc = proxyURL + mapURL + `/minecraft_overworld/0/${x}_${z}.png`
			loadTile({ imgSrc, tileX, tileZ })
		}
	}
}

function loadTile({ imgSrc, tileX, tileZ }) {
	const img = new Image()
	img.crossOrigin = 'Anonymous'
	img.src = imgSrc
	img.onload = () => {
		drawingContext.drawImage(img, tileX * 512, tileZ * 512, 512, 512)
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
	img.onerror = () => loadTile({ imgSrc, tileX, tileZ })
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

function initThree() {
	renderer = new THREE.WebGLRenderer({ antialias: true })
	// Disable unwanted three.js 0.152.0 changes
	THREE.ColorManagement.enabled = false
	renderer.outputColorSpace = THREE.LinearSRGBColorSpace

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 6000)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	window.addEventListener('resize', resize, false)
}

function initSkybox() {
	const geometry = new THREE.BoxGeometry(3000, 3000, 3000)
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
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.95);
	}`
	const fragmentShader =
	`varying vec3 vertexNormal;
	void main() {
		float intensity = pow(0.45 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
		gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
	}`

	const geometry = new THREE.SphereGeometry(earthRadius * 1.1, 64, 32)
	const material = new THREE.ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide
	})
	const atmosphere = new THREE.Mesh(geometry, material)
	scene.add(atmosphere)
}

function initEarth() {
	const crop = { left: 448, right: 472, top: 480, bottom: 496 }
	const mapWidth = tileXCount * 512 - crop.left - crop.right
	const mapHeight = tileZCount * 512 - crop.top - crop.bottom
	const mapTexture = document.createElement('canvas')
	const mapContext = mapTexture.getContext('2d')
	mapTexture.width = mapWidth
	mapTexture.height = mapHeight

	mapContext.drawImage(drawingCanvas, crop.left, crop.top, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight)
	const texture = new THREE.Texture(mapTexture)
	texture.needsUpdate = true

	const material = new THREE.MeshBasicMaterial({ map: texture })
	const geometry = new THREE.SphereGeometry(earthRadius, 64, 32)
	const sphere = new THREE.Mesh(geometry, material)

	scene.add(sphere)
	sphere.rotation.y = -1.57
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
	if (townLabels) for (const label of townLabels) label.visible = isEnabled('town-labels') && !isTooFar
	if (playerLabels) for (const player of playerLabels) player.visible = isEnabled('players') && !isTooFar

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

	const geometry = new THREE.SphereGeometry(0.2, 16, 8)
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
		sendNotification('There was a problem with getting towns data')
		console.log('[Dynglobe] There was a problem with getting towns data')
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
		const pointLocations = []
		const geoJsonCoords = []
		const coords = {x: [], z: []}
		let startPointLoc
		let index = 0
		for (const vertex of region.vertices) {
			const location = cartesianToSpherical(vertex.x, vertex.z, earthRadius * 1.0001)
			const longitude = vertex.x / xDivisor + xConst
			const latitude = -(vertex.z / zDivisor + zConst)
			const pointLocation = new THREE.Vector3(...location)
			geoJsonCoords.push([longitude, latitude])

			// This array is for drawing region outlines
			pointLocations.push(pointLocation)
			if (index == 0) startPointLoc = pointLocation

			// Arrays of coordinates for placing town label in center of a region
			if (!coords.x.includes(vertex.x)) coords.x.push(vertex.x)
			if (!coords.z.includes(vertex.z)) coords.z.push(vertex.z)
			index++
		}

		// Prepare for drawing towns fill
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

		// Draw towns outlines
		// Push start point twice
		pointLocations.push(startPointLoc)
		const material = new THREE.LineBasicMaterial({ color: region.outline })
		const geometry = new THREE.BufferGeometry().setFromPoints(pointLocations)
		const line = new THREE.Line(geometry, material)
		scene.add(line)
		towns.push(line)

		// Draw town label
		if (region.town) {
			const townCenter = {
				x: (Math.min(...coords.x) + Math.max(...coords.x)) / 2,
				z: (Math.min(...coords.z) + Math.max(...coords.z)) / 2
			}
			const labelLocation = cartesianToSpherical(townCenter.x, townCenter.z, earthRadius + 0.33)
			const text = (region.nation == null) ? region.town : region.town + '\n' + region.nation
			const textHeight = 0.2
			const label = new SpriteText(text, textHeight, 'black')
			label.backgroundColor = 'rgb(255, 255, 255, 0.25)'
			scene.add(label)
			townLabels.push(label)
			label.position.set(...labelLocation)
		}

	}

	// Draw towns fill
	for (const {properties, geometry} of geoJson.features) {
		for (const polygonCoords of [geometry.coordinates]) {
			const geometry = new ConicPolygonGeometry(polygonCoords, 0, earthRadius * 1.0001)
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
	const latitude = -(z / zDivisor + zConst)
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
}