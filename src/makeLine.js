import * as THREE from "three"


let makeLine = (point1, point2, color) => {

    const material = new THREE.LineBasicMaterial({
        color: color});
    
    let points = [point1, point2]
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    const line = new THREE.Line( geometry, material );
    return line
}

export default makeLine