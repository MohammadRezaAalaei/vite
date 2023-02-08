import * as THREE from "three"

let objectPosition = (geometry) => {

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
      x: x_array.sort()[0],
      y: y_array.sort()[0],
      z: z_array.sort()[0]
    }
    return position
  }

  export default objectPosition