// galaxy2.js
import * as THREE from 'three'

const parameters2 = {
    count: 30000,
    size: 0.015,
    radius: 5.0,
    branches: 4,
    spin: 1.0,
    randomness: 1.0,
    randomnessPower: 3.0,
    insideColor: '#ffad5c',
    outsideColor: '#1b1b1e'
}

let geometry2 = null
let material2 = null
let points2 = null

const generateGalaxy2 = (scene) => {
    // Destroy old galaxy
    if (points2 !== null) {
        geometry2.dispose()
        material2.dispose()
        scene.remove(points2)
    }

    // Geometry
    geometry2 = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters2.count * 3)
    const colors = new Float32Array(parameters2.count * 3)

    const colorInside = new THREE.Color(parameters2.insideColor)
    const colorOutside = new THREE.Color(parameters2.outsideColor)

    for (let i = 0; i < parameters2.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters2.radius
        const spinAngle = radius * parameters2.spin
        const branchAngle = (i % parameters2.branches) / parameters2.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters2.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters2.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters2.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters2.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry2.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry2.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material2 = new THREE.PointsMaterial({
        size: parameters2.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points2 = new THREE.Points(geometry2, material2)
    scene.add(points2)

    return points2
}

export { parameters2, generateGalaxy2 }
