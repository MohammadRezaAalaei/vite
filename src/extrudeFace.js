import * as THREE from "three"
import getVertices from './getVertices';
import wood from "../src/wood_texture.jpg"
import { TextureLoader } from "three";



Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

let extrudeFace = (face, depth, material) => {
    let vertices = getVertices(face)
  
    let x = []
    let y = []
    let z = []
    vertices.forEach(value => {x.push(value[0]); y.push(value[1]); z.push(value[2])})
    

    let x_check = x.max() - x.min()
    let y_check = y.max() - y.min()
    let z_check = z.max() - z.min()

    
    if (! x_check ) {
      vertices = vertices.map(lst => [lst[2]-z.min(), lst[1]-y.min(), 0])
    }
    else if (! y_check) {
      vertices = vertices.map(lst => [lst[0]-x.min(), lst[2]-z.min()])
    }
    else {
      vertices = vertices.map(lst => [lst[0]-x.min(), lst[1]-y.min()])
    }
    
    vertices.push(vertices[0])
    
    let shape1 = new THREE.Shape()

    for (let i=3; i< 7; i++) {
      shape1.lineTo(vertices[i][0], vertices[i][1])
    }
    
    
    let extrudeSettings = {
      steps: 1,
      depth: Math.abs(depth),
      bevelEnabled: false,
      extrudeMaterial : 1
    };

    let extrusion = new THREE.ExtrudeGeometry(shape1, extrudeSettings)

    
    if (! x_check ) {
      extrusion.rotateY(0.5*Math.PI)
    }
    else if (! y_check) {
      extrusion.rotateX(-0.5*Math.PI)
    }
    
    let texture = new THREE.TextureLoader().load(wood)
    // texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;

    
    let extrusion_mesh = new THREE.Mesh(extrusion, material)
    extrusion_mesh.castShadow = true
    extrusion_mesh.receiveShadow= true


    let newPts = getVertices(extrusion_mesh)
    let x2 = []
    let y2 = []
    let z2 = []
    newPts.forEach(value => {x2.push(value[0]); y2.push(value[1]); z2.push(value[2])})
    
    let distX = (x.min()) - (x2.min())
    let distY = (y.min()) - (y2.min())
    let distZ = (z.min()) - (z2.min())

    

    extrusion_mesh.position.x += distX
    extrusion_mesh.position.y += distY
    extrusion_mesh.position.z += distZ

    if (depth<0 && !x_check) {
      extrusion_mesh.position.x += depth
    }
    else if (depth<0 && !y_check) {
      extrusion_mesh.position.y += depth
    }
    else if (depth<0 && !z_check) {
      extrusion_mesh.position.z += depth
    }
    return extrusion_mesh
  }

  export default extrudeFace