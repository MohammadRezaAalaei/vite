import * as THREE from "three"

let removeEdge = (scene, edgeClickId) => {
    for (let i=1; i < scene.children.length; i++) {
          
      if (scene.children[i].id == edgeClickId) {
        scene.remove(scene.children[i])
      }
    }
  }

  
let removeAnnotation = (scene, anot_lineId, anot_pt1Id, anot_pt2Id) => {
  for (let i=1; i < scene.children.length; i++) {
          
    if (scene.children[i].id == anot_lineId) {
    scene.remove(scene.children[i])
    }
  }

  for (let i=1; i < scene.children.length; i++) {
      
    if (scene.children[i].id == anot_pt1Id) {
    scene.remove(scene.children[i])
    }
  }

  for (let i=1; i < scene.children.length; i++) {
      
    if (scene.children[i].id == anot_pt2Id) {
    scene.remove(scene.children[i])
    }
  }

}

export {removeAnnotation, removeEdge}