import * as THREE from "three"

let objectRightPosition = (geometry) => {

    let x_array = []
    let y_array = []
    let z_array = []

    
    let geo_position = geometry.getAttribute('position').array

    for (let i=0; i< geo_position.length; i+=3) {
      x_array.push(geo_position[i])
      y_array.push(geo_position[i+1])
      z_array.push(geo_position[i+2])
    }
    let position = {
      x: x_array.sort()[x_array.length-1],
      y: y_array.sort()[y_array.length-1],
      z: z_array.sort()[z_array.length-1]
    }
    return position
  }

  export default objectRightPosition