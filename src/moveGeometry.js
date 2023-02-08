import * as THREE from "three"

let moveGeometry = (geo, x, y, z) => {
    geo.applyMatrix4( new THREE.Matrix4().makeTranslation(x, y, z) );
  }

export default moveGeometry