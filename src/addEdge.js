import * as THREE from "three"


let addEdge = (object) => {

    let mat = new THREE.LineBasicMaterial({ color: "white", linewidth: 100, fog:true });
    let edges = new THREE.EdgesGeometry(object.geometry)
    let boundary = new THREE.LineSegments(edges , mat);
    let edgeClickId = boundary.id
    return [boundary, edgeClickId]
  }

export default addEdge
