
import * as THREE from 'three';

let sphereFromPoint = (point) => {
    let sphere = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    let sphereMesh = new THREE.Mesh(sphere, new THREE.MeshStandardMaterial({color: 'green'}))
    sphereMesh.position.set(point.x, point.y, point.z)
    return sphereMesh
}

export default sphereFromPoint