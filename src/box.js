import * as THREE from "three"

class Box {

    constructor(width=1, height=1, depth=1) {
        this.width = width
        this.height = height
        this.depth = depth
        
    }

    generate(){
        let extrudeSettings = {
            depth: this.depth,
            bevelEnabled: false,
        };

        const shape = new THREE.Shape();
        shape.lineTo( 0, this.height );
        shape.lineTo( this.width, this.height );
        shape.lineTo( this.width, 0 );
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        return geometry
        
    }
}

export default Box