import * as THREE from "three"

let deconstructBox = (box) => {
    let faces = []
    let arr = box.attributes.position.array
    
    
    
    for (let i=0; i< arr.length; i+=18) {
      let face = new THREE.BufferGeometry()
      let vertices = []
      for (let j=i; j < i+18; j++) {
        vertices.push(arr[j])
      }
      
  
      let verticesArray = new Float32Array(vertices)
      face.setAttribute( 'position', new THREE.BufferAttribute( verticesArray, 3 ) );
  
      let face_mesh = new THREE.Mesh(face, new THREE.MeshBasicMaterial( { color: "rgb(255, 0, 0)" } ))
      faces.push(face_mesh)

    }
    return faces
  }

  export default deconstructBox