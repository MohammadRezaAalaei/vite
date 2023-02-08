

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
let getVertices = (face) => {

    let positions = face.geometry.attributes.position.array
    
    let points = []

    for (let i=0; i < positions.length; i+=3) {
      points.push([positions[i], positions[i+1], positions[i+2]])
    }

    let mask = points.map(lst => lst.toString())
    
    let newPoints = []

    for (let i=0; i<points.length; i++) {
      if (onlyUnique(mask[i], i, mask)) {newPoints.push(points[i])}
    }
    return points
  }

export default getVertices