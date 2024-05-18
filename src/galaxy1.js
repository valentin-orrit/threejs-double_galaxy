// galaxy1.js
import * as THREE from 'three'

const parameters1 = {
    count: 50000,
    size: 0.023,
    radius: 6.43,
    branches: 3,
    spin: -1.14,
    randomness: 1.2,
    randomnessPower: 2.56,
    insideColor: '#c6edf9',
    outsideColor: '#272778'
}

let geometry1 = null
let material1 = null
let points1 = null

const generateGalaxy1 = (scene) => {
    // Destroy old galaxy
    if (points1 !== null) {
        geometry1.dispose()
        material1.dispose()
        scene.remove(points1)
    }

    // Geometry
    geometry1 = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters1.count * 3)
    const colors = new Float32Array(parameters1.count * 3)

    const colorInside = new THREE.Color(parameters1.insideColor)
    const colorOutside = new THREE.Color(parameters1.outsideColor)


    for (let i = 0; i < parameters1.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters1.radius
        const spinAngle = radius * parameters1.spin
        const branchAngle = (i % parameters1.branches) / parameters1.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)


        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
        

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters1.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry1.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry1.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material1 = new THREE.PointsMaterial({
        size: parameters1.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points1 = new THREE.Points(geometry1, material1)
    scene.add(points1)

    return points1
}

export { parameters1, generateGalaxy1 }