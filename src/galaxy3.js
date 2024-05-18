// galaxy2.js
import * as THREE from 'three'

const parameters3 = {
    count: 16500,
    size: 0.009,
    radius: 11,
    branches: 2,
    spin: - 0.9,
    randomness: 2,
    randomnessPower: 3.70,
    insideColor: '#a248c4',
    outsideColor: '#1b1b1e'
}

let geometry2 = null
let material2 = null
let points2 = null

const generateGalaxy3 = (scene) => {
    // Destroy old galaxy
    if (points2 !== null) {
        geometry2.dispose()
        material2.dispose()
        scene.remove(points2)
    }

    // Geometry
    geometry2 = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters3.count * 3)
    const colors = new Float32Array(parameters3.count * 3)

    const colorInside = new THREE.Color(parameters3.insideColor)
    const colorOutside = new THREE.Color(parameters3.outsideColor)

    for (let i = 0; i < parameters3.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters3.radius
        const spinAngle = radius * parameters3.spin
        const branchAngle = (i % parameters3.branches) / parameters3.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters3.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters3.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters3.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters3.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry2.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry2.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material2 = new THREE.PointsMaterial({
        size: parameters3.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points2 = new THREE.Points(geometry2, material2)
    scene.add(points2)

    return points2
}

export { parameters3, generateGalaxy3 }
