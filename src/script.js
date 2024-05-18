// Dependencies
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { gsap } from 'gsap'

// import
import { parameters1, generateGalaxy1 } from './galaxy1.js'
import { parameters2, generateGalaxy2 } from './galaxy2.js'
import { parameters3, generateGalaxy3 } from './galaxy3.js'

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
        {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
        },
    

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
        {
            // Calculate the progress and update the loadingBarElement
            const progressRatio = itemsLoaded / itemsTotal
            loadingBarElement.style.transform = `scaleX(${progressRatio})`
        }
)

const rgbeLoader = new RGBELoader(loadingManager)

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.show(false)

// Show debug mode
window.addEventListener('keydown', (event) =>
    {
        if(event.key == 's')
            gui.show(gui._hidden)
    })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Environment map
 */
// HDR (RGBE) equirectangular
rgbeLoader.load('HDR_hazy_nebulae_1.hdr', (environmentMap) =>
    {
        // console.log(environmentMap)
        environmentMap.mapping = THREE.EquirectangularReflectionMapping

        scene.background = environmentMap
        scene.environment = environmentMap
    })

// Generate Galaxies
const points1 = generateGalaxy1(scene)
const points2 = generateGalaxy2(scene)
const points3 = generateGalaxy3(scene)


/**
 * GUI parameters
 */
// GUI for Galaxy 1
const galaxy1Folder = gui.addFolder('Galaxy 1')
galaxy1Folder.add(parameters1, 'count').min(100).max(100000).step(100).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'branches').min(2).max(20).step(1).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'spin').min(-5).max(5).step(0.001).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.add(parameters1, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.addColor(parameters1, 'insideColor').onFinishChange(() => generateGalaxy1(scene))
galaxy1Folder.addColor(parameters1, 'outsideColor').onFinishChange(() => generateGalaxy1(scene))

// GUI for Galaxy 2
const galaxy2Folder = gui.addFolder('Galaxy 2')
galaxy2Folder.add(parameters2, 'count').min(100).max(100000).step(100).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'branches').min(2).max(20).step(1).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'spin').min(-5).max(5).step(0.001).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.add(parameters2, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.addColor(parameters2, 'insideColor').onFinishChange(() => generateGalaxy2(scene))
galaxy2Folder.addColor(parameters2, 'outsideColor').onFinishChange(() => generateGalaxy2(scene))


// GUI for Galaxy 3
const galaxy3Folder = gui.addFolder('Galaxy 3')
galaxy3Folder.add(parameters3, 'count').min(100).max(100000).step(100).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'branches').min(2).max(20).step(1).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'spin').min(-5).max(5).step(0.001).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.add(parameters3, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.addColor(parameters3, 'insideColor').onFinishChange(() => generateGalaxy3(scene))
galaxy3Folder.addColor(parameters3, 'outsideColor').onFinishChange(() => generateGalaxy3(scene))

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
camera.position.x = -8
camera.position.y = 4
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // // Rotate
    if (points1 || points2 || points3) {
        points1.rotation.y =  - elapsedTime * 0.1
        points2.rotation.y = - elapsedTime * 0.2
        points3.rotation.y = - elapsedTime * 0.05
    }
   

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()