import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/**
 * Fog
 */
scene.fog = new THREE.FogExp2('#04343f', 0.1)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/brown_mud/brown_mud_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/brown_mud/brown_mud_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/brown_mud/brown_mud_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/brown_mud/brown_mud_02_disp_1k.jpg')
const floorBumpTexture = textureLoader.load('./floor/brown_mud/brown_mud_02_bump_1k.jpg')

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)
floorBumpTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping
floorBumpTexture.wrapS = THREE.RepeatWrapping
floorBumpTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.colorSpace = THREE.SRGBColorSpace

// Walls
const wallsColorTexture = textureLoader.load('./wall/red_brick/red_brick_plaster_patch_02_diff_1k.jpg')
const wallsARMTexture = textureLoader.load('./wall/red_brick/red_brick_plaster_patch_02_arm_1k.jpg')
const wallsNormalTexture = textureLoader.load('./wall/red_brick/red_brick_plaster_patch_02_nor_gl_1k.jpg')
const wallsRoughnessTexture = textureLoader.load('./wall/red_brick/red_brick_plaster_patch_02_rough_1k.jpg')
const wallsBumpTexture = textureLoader.load('./wall/red_brick/red_brick_plaster_patch_02_bump_1k.jpg')

wallsColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof/roof_07_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof/roof_07_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof/roof_07_nor_gl_1k.jpg')
const roofBumpTexture = textureLoader.load('./roof/roof/roof_07_bump_1k.jpg')

roofColorTexture.repeat.set(4, 1)
roofARMTexture.repeat.set(4, 1)
roofNormalTexture.repeat.set(4, 1)
roofBumpTexture.repeat.set(4, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofBumpTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofBumpTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.colorSpace = THREE.SRGBColorSpace

// Bush
const bushColorTexture = textureLoader.load('./bush/bush/forest_leaves_03_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/bush/forest_leaves_03_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/bush/forest_leaves_03_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Graves
const graveColorTexture = textureLoader.load('./graves/graves/lichen_rock_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./graves/graves/lichen_rock_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./graves/graves/lichen_rock_nor_gl_1k.jpg')

graveColorTexture.repeat.set(2, 2)
graveARMTexture.repeat.set(2, 2)
graveNormalTexture.repeat.set(2, 2)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping

graveColorTexture.wrapT = THREE.RepeatWrapping
graveARMTexture.wrapT = THREE.RepeatWrapping
graveNormalTexture.wrapT = THREE.RepeatWrapping

graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({ 
        // color: '#a0a0a0',
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.15,
        displacementBias: - 0.05,
        bumpMap: floorBumpTexture,
        bumpScale: 0.2,
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4, 100, 100, 100),
    new THREE.MeshStandardMaterial({ 
        // color: '#ac8e82',
        map: wallsColorTexture,
        aoMap: wallsARMTexture,
        normalMap: wallsNormalTexture,
        roughnessMap: wallsRoughnessTexture,
        metalnessMap: wallsARMTexture,
        bumpMap: wallsBumpTexture,
     })
)
walls.position.y = 1.25
house.add(walls)

//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({ 
        // color: '#b35f45',
        map: roofColorTexture,
        aoMap: roofARMTexture,
        normalMap: roofNormalTexture,
        bumpMap: roofBumpTexture,
     })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.20,
        displacementBias: - 0.05,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.z = 2 + 0.01
door.position.y = 1.1
house.add(door)

//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ 
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    normalMap: bushNormalTexture,
 })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

/**
 * Graves
 */
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ 
    // color: '#b2b6b1',
    map: graveColorTexture,
    aoMap: graveARMTexture,
    normalMap: graveNormalTexture,
 })
const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++)
    {
        // Coordinates
        const angle = Math.random() * Math.PI * 2
        const radius = 4 + Math.random() * 5
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        // Mesh
        const grave = new THREE.Mesh(graveGeometry, graveMaterial)
        grave.position.x = x
        grave.position.z = z
        grave.position.y = 0.3

        grave.rotation.x = (Math.random() - 0.5) * 0.4
        grave.rotation.y = (Math.random() - 0.5) * 0.4
        grave.rotation.z = (Math.random() - 0.5) * 0.4

        // Add to the graves group
        graves.add(grave)
    }




/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 1)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children)
    {
        grave.castShadow = true
        grave.receiveShadow = true
    }
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts
    const ghost1Angle = elapsedTime
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)+.5

    const ghost2Angle = - elapsedTime * 0.5
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)+.5

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)+.5

    // Flicker door light
    flickerLight(doorLight, elapsedTime);

    // Mappings
    directionalLight.shadow.mapSize.width = 256
    directionalLight.shadow.mapSize.height = 256
    directionalLight.shadow.camera.top = 8
    directionalLight.shadow.camera.right = 8
    directionalLight.shadow.camera.bottom = - 8
    directionalLight.shadow.camera.left = - 8
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 20

    ghost1.shadow.mapSize.width = 256
    ghost1.shadow.mapSize.height = 256
    ghost1.shadow.camera.far = 10

    ghost2.shadow.mapSize.width = 256
    ghost2.shadow.mapSize.height = 256
    ghost2.shadow.camera.far = 10

    ghost3.shadow.mapSize.width = 256
    ghost3.shadow.mapSize.height = 256
    ghost3.shadow.camera.far = 10

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const flickerLight = (light, elapsedTime) => {
    light.intensity = Math.sin(elapsedTime * 2) * 2 + 3
    // light.position.y = Math.sin(elapsedTime * 10) * 0.1 + 2.2
    if (Math.random() < 0.05)
    {
        light.intensity = 0
    }
}

tick()