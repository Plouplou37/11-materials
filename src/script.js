import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug
 */
const gui = new GUI({
    title: 'Materials Debugger',
    closeFolders: true,
})
gui.close()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Geometries
 */
// const sphereGeometry = new THREE.SphereGeometry(1.4)
// const planeGeometry = new THREE.PlaneGeometry()
// const torusGeometry = new THREE.TorusGeometry()

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('on Start')
}
loadingManager.onError = ()=>{
    console.log('on Error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('textures/matcaps/8.png')
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')

//Need to tell Three that  we want to optimize color using SRGB
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
//gradientTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// ---- MeshBasicMaterial ----- // 
//const material = new THREE.MeshBasicMaterial()
//material.map = doorColorTexture
//material.color = new THREE.Color('green')
//material.wireframe = false
//material.opacity = 0.5
//material.transparent = true
//alphaMap hide the 0 value and keep the 1. Need the transparency to true before
//material.alphaMap = doorAlphaTexture
//material.side = THREE.FrontSide // Doubleside is not good for performance

// ---- MeshNormalMaterial ----- //
// Use for things like calculation to illuminate the face or how the environment should reflect or refract the geometrie.
// The color depend on the orientation of hte surface relatively to the camera !
//const material = new THREE.MeshNormalMaterial()
//material.wireframe = true
//material.flatShading = true // get flat faces

// ---- MeshMatcapMaterial ----- //
//Get something which look great while keeping good performances.
//Need a reference texture
//const material = new THREE.MeshMatcapMaterial()
//material.matcap = matcapTexture // Looks like if there where light but no. It's illusion. It's like if the ligh was just above the camera.

// ---- MeshDepthMaterial ----- // 
//Color the geometry in white if near the camera and black if far. far and near to define ourselves. Used for Shadows !
//const material = new THREE.MeshDepthMaterial()

// ---- MeshLambertMaterial ----- //
//This material REQUIRE LIGHT !!!
//const ambientLight = new THREE.AmbientLight(0xffffff, 1)
//scene.add(ambientLight)

// ---- MeshPhongMaterial ----- //
//This material REQUIRE LIGHT !!!

//Phong is more performant than Lambert light, there are more porperties
//const material = new THREE.MeshPhongMaterial()

//material.shininess = 100
//material.specular = new THREE.Color(0x1188ff)

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

/**
 * ADD The environment MAP here
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => 
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})


// ---- MeshToonMaterial ----- //
//two part coloration
//const material = new THREE.MeshToonMaterial()
//The GPU by default use the mipmaping. we dont want so we use the NEAREST to really make the gradient appears !
// gradientTexture.generateMipmaps = false
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// ---- MeshStandardMaterial ----- //
// Use physically based rendering principle. See Texture lesson.
// const material = new THREE.MeshStandardMaterial()
// //material.metalness = 1
// //material.roughness = 0.0905
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.wireframe = false
// material.displacementScale = 0.1
// //control the metalness using existing texture !
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui
//     .add(material, 'metalness')
//     .min(0)
//     .max(1)
//     .step(0.0001)
//     .name('metalness')

//     gui
//     .add(material, 'roughness')
//     .min(0)
//     .max(1)
//     .step(0.0001)
//     .name('roughness')

// ---- MeshPhysicalMaterial ----- //
// same as MeshStandarMaterial -but with more properties
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.wireframe = false
// material.displacementScale = 0.1
// //control the metalness using existing texture !
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.clearcoat = true
// material.clearcoatRoughness = 0
// material.sheen = 1
// material.sheenRoughness = 1
// material.sheenColor.set(1, 1, 1)
material.transmission = 1
material.ior = 1.5
material.thickness = 0.2

///don't hesitate to add more paramater in the gui
gui.add(material, 'metalness').min(0).max(1).step(0.0001).name('metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.0001).name('roughness')

/**
 * Mesh
 */
const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material)

const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 16, 16),
    material)

const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material)

const axesHelper = new THREE.AxesHelper(50)

/**
 * Initial Positions
 */
sphereMesh.position.set(-1.5, 0, 0)
planeMesh.position.set(0, 0, 0)
torusMesh.position.set(1.5, 0, 0)

scene.add(sphereMesh, planeMesh, torusMesh, axesHelper)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update Meshes
    sphereMesh.rotation.y = 0.1 * elapsedTime
    planeMesh.rotation.y = 0.1 * elapsedTime
    torusMesh.rotation.y = 0.1 * elapsedTime

    sphereMesh.rotation.x = 0.2 * elapsedTime
    planeMesh.rotation.x = 0.2 * elapsedTime
    torusMesh.rotation.x = 0.2 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * EventListener
 */
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

