import * as THREE from "three"

let makeArrow = (points) => {
    let line_geo = new THREE.BufferGeometry()
    const v1 = points[0];
    const v2 = points[1];
    const vControl = new THREE.Vector3(5, 0, -5);
    const curve = new THREE.LineCurve3( v1, v2);
    line_geo.setFromPoints(points)
    let line_material = new THREE.LineBasicMaterial({color:"red"})
    let mesh = new THREE.Line(line_geo, line_material)

    let sphere_geo = new THREE.SphereGeometry(0.02)
    let sphere_mat = new THREE.MeshBasicMaterial({color: "red"})
    let sphere = new THREE.Mesh(sphere_geo, sphere_mat)
    console.log()
    sphere.position.set(points[1].x, points[1].y, points[1].z)
    
    let tube_geo = new THREE.TubeGeometry(curve, 2, 0.006, 20, false)
    let tube = new THREE.Mesh(tube_geo, sphere_mat)

    mesh.add(sphere)
    mesh.add(tube)
    return mesh
    }

export default makeArrow