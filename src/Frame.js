import * as THREE from "three"
import deconstructBox from "./deconstructBox";
import extrudeFace from "./extrudeFace";
import getVertices from "./getVertices";
import moveGeometry from "./moveGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import wood from "/wood_texture.jpg"
import { Color, Material } from "three";


let gltf = new GLTFLoader()

let texture = new THREE.TextureLoader().load(wood)
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
let woodMaterial = new THREE.MeshStandardMaterial( { color: "white", map: texture} )

let tickness = 0.02
let loadedModel;

let folded_clothes = new THREE.Mesh()
let folded_clothes2 = new THREE.Mesh()
let folded_clothes3 = new THREE.Mesh()
let clothes2 = new THREE.Mesh()
let clothes1 = new THREE.Mesh()
let hanger1 = new THREE.Mesh()
let hanger2 = new THREE.Mesh()
let shelfItem1 = new THREE.Mesh()
let shelfItem2 = new THREE.Mesh()
let bag = new THREE.Mesh()
let hat = new THREE.Mesh()
let box1 = new THREE.Mesh()
let box2 = new THREE.Mesh()
let box3 = new THREE.Mesh()
let box4 = new THREE.Mesh()
let box5 = new THREE.Mesh()
let box6 = new THREE.Mesh()
let box7 = new THREE.Mesh()
let box8 = new THREE.Mesh()
let pant1 = new THREE.Mesh()
let pant2 = new THREE.Mesh()
let pant3 = new THREE.Mesh()
let pant4 = new THREE.Mesh()
let pant5 = new THREE.Mesh()
let pant6 = new THREE.Mesh()
let capHat = new THREE.Mesh()
let folded_clothes4 = new THREE.Mesh()
let luggage1 = new THREE.Mesh()
let stackedBoxes1 = new THREE.Mesh()
let shoes = new THREE.Mesh()
let bags = new THREE.Mesh()
let bags2 = new THREE.Mesh()
let bag3 = new THREE.Mesh()
let shoes2 = new THREE.Mesh()
let shoes3 = new THREE.Mesh()
let doorHandle = new THREE.Mesh()


gltf.load("/folded_clothes.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene; 
    loader.castShadow = true
    loader.receiveShadow = true
    // loader.rotateZ(Math.PI/2)
    // loader.rotateY(Math.PI)
    folded_clothes.add(loader)
    })
gltf.load("/folded_clothes2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene; 
    loader.castShadow = true
    loader.receiveShadow = true
    // loader.rotateZ(Math.PI/2)
    // loader.rotateY(Math.PI)
    folded_clothes3.add(loader)
    })
gltf.load("/folded_clothes3.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
        let loader = gltf.scene; 
        loader.castShadow = true
        loader.receiveShadow = true
        // loader.rotateZ(Math.PI/2)
        // loader.rotateY(Math.PI)
        folded_clothes2.add(loader)
        })

gltf.load("/clothes1.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene; 
    loader.castShadow = true
    loader.receiveShadow = true
    // loader.rotateZ(Math.PI/2)
    // loader.rotateY(Math.PI)
    clothes1.add(loader)
    })
gltf.load("/clothes2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true 
    loader.position.y = 0.002
    // loader.rotateZ(Math.PI/2)
    // loader.rotateY(Math.PI)
    clothes2.add(loader)
    })
gltf.load("/hanger.gltf", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true 

    loader.rotateZ(Math.PI/2)
    loader.rotateX(Math.PI)
    hanger1.add(loader)
    })
gltf.load("/hanger.gltf", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene; 
    loader.castShadow = true
    loader.receiveShadow = true

    loader.rotateZ(Math.PI/2)
    loader.rotateY(Math.PI)
    hanger2.add(loader)
    })
gltf.load("/shelf_item1.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
        let loader = gltf.scene;
        loader.castShadow = true
        loader.receiveShadow = true
        loader.position.y = 0.27
        loader.position.z = 0.27
        loader.position.x = 0.2
        shelfItem1.add(loader)
        })

gltf.load("/shoes.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.27
    loader.position.z = 0.29
    loader.position.x = 0.2
    shoes.add(loader)
    })

gltf.load("/shelf_item2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.27
    loader.position.z = 0.29
    loader.position.x = 0.2
    shelfItem2.add(loader)
    })

gltf.load("/bag.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.27
    loader.position.z = 0.27
    loader.position.x = 0.2
    bag.add(loader)
    })

gltf.load("/hat1.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            // child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.27
    loader.position.z = 0.27
    loader.position.x = 0.2
    hat.add(loader)
    })

gltf.load("/box.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -2.05
    loader.position.z = 0
    loader.position.x = -0.05
    box1.add(loader)
    })

gltf.load("/box2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box2.add(loader)
    })
gltf.load("/box3.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box3.add(loader)
    })
gltf.load("/box4.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box4.add(loader)
    })
gltf.load("/box5.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box5.add(loader)
    })
gltf.load("/box6.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box6.add(loader)
    })
gltf.load("/box7.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    box7.add(loader)
    })
gltf.load("/box8.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    gltf.scene.traverse ( (child) => {
        gltf.scene.traverse ( (child) => {
            if ( child.isMesh )
            {
                child.castShadow = true;
                child.receiveShadow = true;
            }
          });
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.7
    loader.position.z = 0
    loader.position.x = -0.05
    box8.add(loader)
    })
gltf.load("/stackedBoxes1.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y =  -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    stackedBoxes1.add(loader)
    })

gltf.load("/luggage.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -1.62
    loader.position.z = 0
    loader.position.x = -0.05
    luggage1.add(loader)
    })

gltf.load("/pant1.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.55
    loader.position.z = 0
    loader.position.x = 0.01
    pant1.add(loader)
    })

gltf.load("/pant2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.43
    loader.position.z = 0
    loader.position.x = 0.01
    pant2.add(loader)
    })

gltf.load("/pant3.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.43
    loader.position.z = 0
    loader.position.x = 0.01
    pant3.add(loader)
    })

gltf.load("/pant4.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.43
    loader.position.z = 0
    loader.position.x = -0.005
    pant4.add(loader)
    })

gltf.load("/pant5.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.17
    loader.position.z = 0
    loader.position.x = 0
    pant5.add(loader)
    })

gltf.load("/pant6.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = -0.17
    loader.position.z = 0
    loader.position.x = 0
    pant6.add(loader)
    })

gltf.load("/folded_clothes4.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0
    loader.position.z = 0.3
    loader.position.x = 0
    folded_clothes4.add(loader)
    })

gltf.load("/capHat.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.02
    loader.position.z = 0.3
    loader.position.x = 0
    capHat.add(loader)
    })
    
gltf.load("/bags.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.02
    loader.position.z = 0.3
    loader.position.x = 0
    bags.add(loader)
    })

gltf.load("/bags2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.01
    loader.position.z = 0.3
    loader.position.x = 0
    bags2.add(loader)
    })
gltf.load("/bag3.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.02
    loader.position.z = 0.3
    loader.position.x = 0
    bag3.add(loader)
    })
gltf.load("/shoes2.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.02
    loader.position.z = 0.3
    loader.position.x = 0
    shoes2.add(loader)
    })
gltf.load("/shoes3.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 0.02
    loader.position.z = 0.3
    loader.position.x = 0
    shoes3.add(loader)
    })


gltf.load("/doorHandle.glb", (gltf) => {
    gltf.scene.traverse ( (child) => {
        if ( child.isMesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;
        }
      });
    let loader = gltf.scene;
    loader.castShadow = true
    loader.receiveShadow = true
    loader.position.y = 1
    loader.position.z = 0.03
    doorHandle.add(loader)
    })
    

let shelvesOptions = [capHat, folded_clothes4,  bags2, shoes2, shoes3]


let option = 1
let shelfOption = 1
let addFrameBase = (box, width, depth, tickness, material) => {
    let faces = deconstructBox(box)
    let face = faces[5]
    
    let extrusion = extrudeFace(face, 0.02, material)
    extrusion.position.y += 0.05

    let x2 = []
    let y2 = []
    let z2 = []
    let pts = getVertices(face)
    pts.forEach(value => {x2.push(value[0]); y2.push(value[1]); z2.push(value[2])})



    let shape = new THREE.Shape()
    shape.lineTo(0, 0.05)
    shape.lineTo(width-0.04, 0.05)
    shape.lineTo(width-0.04, 0)
    let extrudeSettings = {
      steps: 1,
      depth: Math.abs(tickness),
      bevelEnabled: false,
      extrudeMaterial : 1
    };

    let edgeExtrusion = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    let edgeMesh = new THREE.Mesh(edgeExtrusion, material)
    edgeMesh.position.z += (depth-0.03)
    edgeMesh.position.x += x2.min()
    // edgeMesh.position.y += y2
    // edgeMesh.position.z += z2
    return [extrusion, edgeMesh]
  }

let setShadow = (mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
}
class Frame {

    constructor(position, width=1, height=1, depth=1, tickness, material, scene) {
        this.option = option
        this.shelfOption = shelfOption
        this.scene = scene
        this.position = position
        this.width = width
        this.height = height
        this.depth = depth
        this.shelvesY = 0.8
        this.drawerMargin = 0.03
        this.drawerHeight = 0.13
        this.positionY = 0
        this.drawerThickness = 0.01
        this.frameThickness = 0.02
        this.margin = 0.007
        this.railYposition = 0
        this.shelfHeight = 1.9
        this.drawerDepth = this.depth - this.frameThickness - this.margin
        this.tickness = tickness
        this.material = material
        this.drawers = []
        this.drawerBoxes = []
        this.rails = []
        this.innerShelves = []
        this.numOfShelves = 3
        this.shelves = []
        this.hiddenMaterial = new THREE.MeshStandardMaterial({transparent:true, opacity:0})
        this.box = this.generate_box()
        this.innerBox = this.generateInnerBox()
        this.pantsHanger;
        this.railCylender = []
        this.doors = [{
            doorArea : undefined,
            leftDoor: undefined,
            rightDoor: undefined,
            toLeft: undefined,
            toRight: undefined,
            active:false
        }]
        this.topShelfDoors = [{
            doorArea : undefined,
            leftDoor: undefined,
            rightDoor: undefined,
            toLeft: undefined,
            toRight: undefined,
            active:false
        }]
        moveGeometry(this.box, position[0], position[1], position[2])
        moveGeometry(this.innerBox, position[0], position[1], position[2])


        this.randint = []
        for (let i=0; i>-1; i++) {
            if (this.randint.length === shelvesOptions.length) {
                break
            }
            let rand = Math.floor(Math.random() * (shelvesOptions.length))
            if (! this.randint.includes(rand)) {
                this.randint.push(rand)
            }

        } 
        
        this.frame_mesh = this.generate(this.box, this.innerBox)
        
        if (this.height>2.2) {
            this.addShelves()
        }
        this.activeDoors = []
        this.boxId = this.box.id
        this.edge = this.generateEdges(this.box)
        this.frameId = this.frame_mesh.id
        this.profileMeshes = []
        shelfOption+=1
        if (shelfOption === 4) {
            shelfOption = 1
        }
        
        
    }

    generate(box_geometry, inner_box) {
        let height = Math.min(this.height, 2.3)
        let faces = deconstructBox(box_geometry)
        let extruded_face1 = extrudeFace(faces[0], 0.02, this.material)
        let extruded_face2 = extrudeFace(faces[2], -0.02, this.material)
        let extruded_face3 = extrudeFace(faces[3], -0.02, this.material)
        let extruded_face4 = extrudeFace(faces[4], 0.02, this.material)
        let frame = new THREE.Mesh()
        let base = addFrameBase(inner_box, this.width, this.depth, this.tickness, this.material)
        frame.add(base[0])
        frame.add(base[1])
        frame.add(extruded_face1)
        frame.add(extruded_face2)
        frame.add(extruded_face3)
        frame.add(extruded_face4)
        
        let generateDoor = (from, to) => {

            let height = to-from

            let door = new THREE.BoxGeometry(this.width/2 - 0.012, height,  0.01)
            let doorAreaGeo = new THREE.BoxGeometry(this.width, height, 0.01)
            let doorMaterial = this.material
            let doorArea = new THREE.Mesh(doorAreaGeo, this.hiddenMaterial)
    
            doorArea.position.x += (this.width/2 +this.position[0])
            doorArea.position.y += (height/2) + from
            doorArea.position.z += (this.frameThickness/2 + this.depth)
            let leftDoor = new THREE.Mesh(door, doorMaterial)
            let rightDoor = new THREE.Mesh(door, doorMaterial)
            rightDoor.position.x -= ((this.width/2 - 0.002 )/2) - 0.014
            rightDoor.position.y += (height/2) + from
    
            leftDoor.position.x += (this.width/4 - 0.014 )
            leftDoor.position.y += (height/2) + from
            
    
            let doorHandle1 = doorHandle.clone()
            doorHandle1.position.x += (-((this.width - 0.002 )/2 - 0.06))
            doorHandle1.position.y += from

            let doorHandle2 = doorHandle.clone()
            doorHandle2.position.x += (((this.width - 0.002 )/2 - 0.06))
            doorHandle2.position.y += from
            
            if (from > 2) {
                doorHandle1.position.y -= 0.9
                doorHandle2.position.y -= 0.9
            }
            
            let right = new THREE.Group()
            right.add(doorHandle1)
            right.add(rightDoor)
            right.position.x += (this.width + this.position[0] - 0.02)
            right.position.z += (this.depth + 0.01)
    
    
            let left = new THREE.Group()
            left.add(doorHandle2)
            left.add(leftDoor)
            left.position.x += (this.position[0] + 0.02)
            left.position.z += (this.depth + 0.01)
    
            let toLeft = left.clone()
            toLeft.position.z += 0.01
            toLeft.rotateY(-Math.PI/3)
            
            let axis = new THREE.CylinderGeometry(0.01, 0.01, 4, 30)
            let mesh = new THREE.Mesh(axis, this.material)
            // toLeft.add(mesh)
    
            let toRight = right.clone()
            toRight.position.z += 0.01
            toRight.rotateY(Math.PI/3)
            
            let axis2 = new THREE.CylinderGeometry(0.01, 0.01, 4, 30)
            let mesh2 = new THREE.Mesh(axis2, this.material)
            // toRight.add(mesh2)
            // toRight.position.x += (this.width/2 - this.frameThickness/2)
            // toRight.position.z += (this.width/4)
    
            let doorObj = {
                doorArea : doorArea,
                leftDoor: left,
                rightDoor: right,
                toLeft: toLeft,
                toRight: toRight,
            }

            return doorObj
            
        }
        
        let doorObj = generateDoor(0, height)
        this.doors[0].doorArea = doorObj.doorArea
        this.doors[0].leftDoor = doorObj.leftDoor
        this.doors[0].rightDoor = doorObj.rightDoor
        this.doors[0].toLeft = doorObj.toLeft
        this.doors[0].toRight = doorObj.toRight

        this.scene.add(doorObj.doorArea)
        if (this.height > 2.5) {
            let topDoorObj = generateDoor(height + 0.003, this.height)
            this.topShelfDoors[0].doorArea = topDoorObj.doorArea
            this.topShelfDoors[0].leftDoor = topDoorObj.leftDoor
            this.topShelfDoors[0].rightDoor = topDoorObj.rightDoor
            this.topShelfDoors[0].toLeft = topDoorObj.toLeft
            this.topShelfDoors[0].toRight = topDoorObj.toRight
            this.scene.add(topDoorObj.doorArea)
        }
        
        switch(this.option){
            case 1:
                this.shelfItem = new THREE.Group()
                this.shelfItem.add(shelfItem2.clone())
                if (this.width>0.63){this.shelfItem.add(bag.clone())}
                this.shelfItem.position.x += this.position[0]
                break
            case 2:
                this.shelfItem = new THREE.Group()
                this.shelfItem.add(shelfItem1.clone())
                if (this.width>0.63){this.shelfItem.add(bag.clone())}
                this.shelfItem.position.x += this.position[0]
                break
            case 3:
                this.shelfItem = new THREE.Group()
                this.shelfItem.add(shoes.clone())
                if (this.width>0.63){this.shelfItem.add(bag.clone())}
                this.shelfItem.position.x += this.position[0]
                break
        }
        option += 1
        if (option === 4) {option = 1}
        return frame
        
    }

    generateEdges(box_geometry) {
        let mat = new THREE.LineBasicMaterial({ color: "black", linewidth: 1 });
        let edges = new THREE.EdgesGeometry(box_geometry)
        let boundary = new THREE.LineSegments(edges , mat);
        return boundary
    }
    
    generate_box() {
        let extrudeSettings = {
            depth: this.depth,
            bevelEnabled: false,
        }
        
        const shape = new THREE.Shape();
        shape.lineTo( 0, this.height );
        shape.lineTo( this.width, this.height );
        shape.lineTo( this.width, 0 );
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
         return geometry
    };
    
    generateInnerBox() {
        let extrudeSettings = {
            depth: this.depth - tickness,
            bevelEnabled: false,
        }
        
        const shape = new THREE.Shape();
        shape.lineTo( 0, this.height-tickness );
        shape.lineTo( this.width - tickness*2, this.height-tickness);
        shape.lineTo( this.width- tickness*2, 0 );
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        moveGeometry(geometry, tickness, 0, tickness)
         return geometry

    }
    removePantsHanger() {
        this.scene.remove(this.pantsHanger)
        this.pantsHanger = undefined
    }
    generatePantsHanger() {
        let positionY = 0.8
        let thickness = 0.01
        let heigth = 0.04
        let group = new THREE.Group()
        let box1Width = this.depth - this.frameThickness
        let box3Width = this.width - this.frameThickness*2
        let box1 = new THREE.BoxGeometry(thickness, heigth, box1Width)
        let box2 = new THREE.BoxGeometry(thickness, heigth, box1Width)
        let box3 = new THREE.BoxGeometry(box3Width, heigth, thickness)
        let cylender = new THREE.CylinderGeometry(0.005, 0.005, box1Width)
        let cylenderMaterial = new THREE.MeshStandardMaterial({color:"grey", metalness:0.5})
        let material = this.material
        let mesh1 = new THREE.Mesh(box1, material)
        let mesh2 = new THREE.Mesh(box2, material)
        let mesh3 = new THREE.Mesh(box3, material)
        let cylenderMesh = new THREE.Mesh(cylender, cylenderMaterial)

        mesh2.position.x = this.width - this.frameThickness*2 - thickness
        mesh3.position.x = (this.width - this.frameThickness*2 - thickness)/2
        mesh3.position.z = -this.depth/2 + 0.016
        cylenderMesh.rotateX(Math.PI/2 )
        setShadow(mesh1)
        setShadow(mesh2)
        setShadow(mesh3)
        group.add(mesh1)
        group.add(mesh2)
        group.add(mesh3)
        let positions = []
        for (let i=1; i>-1; i++) {
            if (i*0.05 > box3Width-0.05) {
                break
            }
            positions.push( i* 0.05)
            let cylenderMeshNew = cylenderMesh.clone()
            cylenderMeshNew.position.x += i*0.05
            group.add(cylenderMeshNew)
        }
        let pantA = pant1.clone()
        let pantB = pant2.clone()
        let pantC = pant3.clone()
        let pantD = pant4.clone()
        let pantE = pant5.clone()
        let pantF = pant6.clone()
        

        pantA.position.x = positions[0]
        pantB.position.x = positions[1]
        pantC.position.x = positions[3]
        pantD.position.x = positions[positions.length-1]
        pantE.position.x = positions[positions.length-2]
        pantF.position.x = positions[positions.length-3]
        if (positions.length > 9) {
            let pantG = pant2.clone()
            pantG.position.x = positions[5]
            group.add(pantG)
        }
        if (positions.length > 10) {
            let pantH = pant2.clone()
            pantH.position.x = positions[6]
            group.add(pantH)
        }

        group.add(pantA)
        group.add(pantB)
        group.add(pantC)
        group.add(pantD)
        group.add(pantE)
        group.add(pantF)
        group.position.z = box1Width/2 + this.frameThickness
        group.position.y = positionY
        group.position.x = this.frameThickness + thickness/2 + this.position[0]
        this.pantsHanger = group
        this.scene.add(group)
        if (this.rails.length) {
            this.scene.remove(this.rails[this.rails.length-1])
            this.rails = []
            this.addRail()
        }
    }

    addPantsHanger() {
        if (! this.drawers.length) {
            this.scene.remove(this.shelfItem)
            this.generatePantsHanger()  
        }
    }
    generateDrawer  () {
        
        let ix = this.drawerBoxes.length - 1
        let drawerWidth = this.width - this.frameThickness*2 - this.margin*2
        let material = new THREE.MeshStandardMaterial({color: 'white', shadowSide: THREE.FrontSide, side: THREE.DoubleSide})

        let boxGeo = new THREE.BoxGeometry(drawerWidth, this.drawerHeight, 0.02)
        let box = new THREE.Mesh(boxGeo, new THREE.MeshStandardMaterial({color:'black', transparent:true, opacity:0}))
        box.position.y += this.positionY + this.drawerHeight/2 + 0.02
        box.position.z += this.drawerDepth + this.frameThickness

        let face1 = new THREE.BoxGeometry(this.drawerThickness, this.drawerHeight, this.drawerDepth)
        let face2 = new THREE.BoxGeometry(this.drawerThickness, this.drawerHeight, this.drawerDepth) 
        let face3 = new THREE.BoxGeometry(drawerWidth-this.drawerThickness, this.drawerHeight, this.drawerThickness)
        let face4 = new THREE.BoxGeometry(drawerWidth-this.drawerThickness, this.drawerThickness, this.drawerDepth)
        let face5 = new THREE.BoxGeometry(drawerWidth+this.margin*2, this.drawerHeight + 0.02, this.drawerThickness)

        let faceMesh = new THREE.Mesh(face1, material)
        faceMesh.castShadow = true
        faceMesh.receiveShadow = true
        let face2Mesh = new THREE.Mesh(face2, material)
        face2Mesh.castShadow = true
        face2Mesh.receiveShadow = true
        let face3Mesh = new THREE.Mesh(face3, material)
        face3Mesh.castShadow = true
        face3Mesh.receiveShadow = true
        let face4Mesh = new THREE.Mesh(face4, material)
        face4Mesh.castShadow = true
        face4Mesh.receiveShadow = true
        let face5Mesh = new THREE.Mesh(face5, material)
        face5Mesh.castShadow = true
        face5Mesh.receiveShadow = true

        
        faceMesh.position.x += this.drawerThickness/2 + this.margin + this.frameThickness
        faceMesh.position.y += 0.03 + this.drawerHeight+this.positionY
        faceMesh.position.z += this.drawerThickness + this.margin + (this.drawerDepth/2)

        face2Mesh.position.x += this.frameThickness + drawerWidth
        face2Mesh.position.y += 0.03 + this.drawerHeight+this.positionY
        face2Mesh.position.z += this.drawerThickness + this.margin + (this.drawerDepth/2)

        face3Mesh.position.x += this.margin + drawerWidth/2 + this.frameThickness
        face3Mesh.position.y += 0.03 + this.drawerHeight+this.positionY
        face3Mesh.position.z += this.drawerThickness + this.margin + (this.drawerThickness/2)

        face4Mesh.position.x +=  this.margin + drawerWidth/2 + this.frameThickness
        face4Mesh.position.y += 0.03 + this.drawerHeight/2 + this.positionY + this.drawerThickness/2
        face4Mesh.position.z += this.drawerThickness + this.margin + (this.drawerDepth/2)

        face5Mesh.position.x += this.margin + drawerWidth/2 + this.frameThickness
        face5Mesh.position.y += 0.03 + this.drawerHeight + this.positionY + 0.005
        face5Mesh.position.z += this.drawerThickness + this.margin + this.drawerDepth



        let slideProfileDepth = 0.005
        let slideProfileHeight = 0.02
        let slideProfileThickness = 0.001
        let slideProfile = new THREE.Shape()
        slideProfile.lineTo(0, slideProfileHeight)
        slideProfile.lineTo(slideProfileDepth, slideProfileHeight)
        slideProfile.lineTo(slideProfileDepth, slideProfileHeight-slideProfileThickness-0.003)
        slideProfile.lineTo(slideProfileDepth-slideProfileThickness, slideProfileHeight-slideProfileThickness-0.003)
        slideProfile.lineTo(slideProfileDepth-slideProfileThickness, slideProfileHeight-slideProfileThickness)
        slideProfile.lineTo(slideProfileThickness, slideProfileHeight-slideProfileThickness)
        slideProfile.lineTo(slideProfileThickness, slideProfileThickness)
        slideProfile.lineTo(slideProfileDepth-slideProfileThickness, slideProfileThickness)
        slideProfile.lineTo(slideProfileDepth-slideProfileThickness, slideProfileThickness + 0.003)
        slideProfile.lineTo(slideProfileDepth, slideProfileThickness + 0.003)
        slideProfile.lineTo(slideProfileDepth, 0)
        slideProfile.lineTo(0, 0)
        let profileMaterial = new THREE.MeshStandardMaterial({color:"lightGrey", metalness:0.5, roughness:0.2})
        profileMaterial.receiveShadow = true
        let slideProfileGeo = new THREE.ExtrudeGeometry(slideProfile, {bevelEnabled:false, depth:this.drawerDepth})
        let slideProfileMesh = new THREE.Mesh(slideProfileGeo, profileMaterial)
        slideProfileMesh.castShadow=true
        slideProfileMesh.receiveShadow=true

        slideProfileMesh.position.y += 0.1 + this.positionY + 0.02
        slideProfileMesh.position.x += this.frameThickness
        slideProfileMesh.position.z += this.frameThickness
        
        let slideProfileMesh2 = slideProfileMesh.clone()
        slideProfileMesh2.position.x += drawerWidth + slideProfileDepth

        slideProfileMesh.rotateZ(Math.PI)
        slideProfileMesh.position.x += slideProfileDepth +0.001
        slideProfileMesh.position.y += slideProfileHeight

        
        

        let group = new THREE.Group()
        let n = Math.random()
        if (drawerWidth < 0.65){
            
                let folded1 = folded_clothes.clone()
                folded1.position.y = this.positionY +0.17
                folded1.position.x = this.width/2 + 0.01
                folded1.position.z = this.depth/2 + this.frameThickness + 0.02
                group.add(folded1)
            
        }
        else {
            let folded1 = folded_clothes3.clone()
            folded1.position.y = this.positionY +0.17
            folded1.position.x = this.width/2 + 0.13
            folded1.position.z = this.depth/2 + this.frameThickness + 0.02
            
            let folded2 = folded_clothes2.clone()
            folded2.position.y = this.positionY+0.17
            folded2.position.x = 0.2
            folded2.position.z = this.depth/2 + this.frameThickness + 0.02

            group.add(folded1)
            group.add(folded2)
        }
            
        
            
        group.add(faceMesh)
        group.add(face2Mesh)
        group.add(face3Mesh)
        group.add(face4Mesh)
        group.add(slideProfileMesh)
        group.add(slideProfileMesh2)
        group.add(face5Mesh)
        group.position.x += this.position[0]
        box.position.x += this.position[0] + drawerWidth/2 + this.frameThickness + this.margin
        
        return [group, box]
    }

    marginProfile() {

        let profileDepth = 0.015
        let profileThickness = 0.002
        let profile = new THREE.Shape()
        profile.lineTo(0, this.drawerMargin)
        profile.lineTo(profileDepth, this.drawerMargin)
        profile.lineTo(profileDepth, this.drawerMargin-profileThickness)
        profile.lineTo(profileThickness, this.drawerMargin-profileThickness)
        profile.lineTo(profileThickness, profileThickness)
        profile.lineTo(profileDepth, profileThickness)
        profile.lineTo(profileDepth, 0)
        profile.lineTo(0, 0)

        let marginProfile = new THREE.ExtrudeGeometry(profile, {bevelEnabled:false, depth:this.width-this.frameThickness*2})
        let profileMesh = new THREE.Mesh(marginProfile,  new THREE.MeshStandardMaterial({color:"grey"}))
        profileMesh.castShadow = true
        // profileMesh.receiveShadow = true
        profileMesh.rotateY(Math.PI*0.5)
        profileMesh.rotateZ(Math.PI)
        profileMesh.position.y += this.drawerMargin + this.positionY + this.drawerHeight + 0.095
        profileMesh.position.z += (this.drawerDepth-0.005)
        profileMesh.position.x += this.frameThickness + this.position[0]
        
        return profileMesh
    }




    generateDrawerPlate(ix) {
        
        let plateWidth = this.width - this.frameThickness*2
        let plateThickness = this.frameThickness
        let plateDepth = this.depth - this.frameThickness
        let plate = new THREE.BoxGeometry(plateWidth, plateThickness, plateDepth)
        let drawerPlate = new THREE.Mesh(plate, this.material)

        drawerPlate.position.x += plateWidth/2 + this.frameThickness
        drawerPlate.position.y += plateThickness/2 + 0.065 + this.positionY+this.drawerMargin
        drawerPlate.position.z += plateDepth/2 + this.frameThickness

        drawerPlate.position.x += this.position[0]
        return drawerPlate
    }


    addDrawer(scene) {
        if (this.drawers.length) {
            scene.remove(this.drawerPlate)
          }
        let drawer = this.generateDrawer()
        if (! this.drawers.length) {
            let marginProfile = this.marginProfile()
            marginProfile.position.y -= (this.drawerHeight + 0.03)
            this.profileMeshes.push(marginProfile)
            scene.add(this.profileMeshes[this.profileMeshes.length-1])
        }
        this.profileMeshes.push(this.marginProfile())
        this.positionY += this.drawerHeight + this.drawerMargin
        let ix = this.drawerBoxes.length - 1
        this.drawerPlate = this.generateDrawerPlate(ix)
        this.drawers.push(drawer[0])
        this.drawerBoxes.push(drawer[1])
        ix ++   

        if (this.drawers.length) {
            scene.add(this.drawerPlate)
          }
        this.shelfItem.position.y = this.positionY+this.drawerMargin+this.frameThickness
        scene.add(this.drawers[ix])
        scene.add(this.drawerBoxes[ix])
        scene.add(this.profileMeshes[this.profileMeshes.length-1])
        if (this.rails.length) {
            this.scene.remove(this.rails[this.rails.length-1])
            this.rails = []
            this.addRail()
        }
        if (this.innerShelves.length) {
            this.removeInnerShelves()
            this.addInnerShelves()
        }
        if (this.pantsHanger) {
            this.removePantsHanger()
        }

        
        
    }
    removeInnerShelves() {
        this.innerShelves.forEach(obj => this.scene.remove(obj))
        this.shelvesY = 0.8
        this.innerShelves = []
    }
    addShelf(option) {
        let shelfGeo = new THREE.BoxGeometry(this.width-this.frameThickness*2, this.frameThickness, this.depth-this.frameThickness)
        let shelfMesh = new THREE.Mesh(shelfGeo, this.material)

        shelfMesh.castShadow = true
        shelfMesh.receiveShadow = true
        
        let group = new THREE.Group()
        
        switch(option) {
            case 1:
                switch(this.shelfOption) {
                    case 1:
                        let luggage = luggage1.clone()
                        luggage.castShadow = true
                        luggage.receiveShadow = true
                        luggage.position.y = 1.83
                        group.add(luggage)
                        break
                    case 2:
                        let box = box2.clone()
                        box.castShadow = true
                        box.receiveShadow = true
                        box.position.y = 1.83
                        group.add(box)
                        break
                        if (this.height > 2.2) {
                        }
                    case 3:
                        let boxx = box3.clone()
                        boxx.castShadow = true
                        boxx.receiveShadow = true
                        boxx.position.y = 1.83
                        group.add(boxx)
                        break
                }
                break 
            case 2:
                switch(this.shelfOption) {
                    case 1:
                        let box = box1.clone()
                        box.castShadow = true
                        box.receiveShadow = true
                        box.position.y = 2.26
                        group.add(box)
                        break
                    case 2:
                        let boxx = box4.clone()
                        boxx.castShadow = true
                        boxx.receiveShadow = true
                        boxx.position.y = 1.83
                        group.add(boxx)
                        break
                    case 3:
                        let boxxx = box2.clone()
                        boxxx.castShadow = true
                        boxxx.receiveShadow = true
                        boxxx.position.y = 1.83
                        group.add(boxxx)
                        break
                }
                break

            case 3:
                switch(this.shelfOption) {
                    case 1:
                        let luggage = luggage1.clone()
                        luggage.castShadow = true
                        luggage.receiveShadow = true
                        luggage.position.y = 1.83
                        group.add(luggage)
                        let hat1 = hat.clone()
                        hat1.castShadow = true
                        hat1.receiveShadow = true
                        hat1.position.y += 0.16
                        hat1.position.x -= 0.25
                        hat1.position.z -= 0.35
                        group.add(hat1)
                        break
                    case 2:
                        let box = stackedBoxes1.clone()
                        box.castShadow = true
                        box.receiveShadow = true
                        box.position.y = 1.83
                        group.add(box)
                        break
                    case 3:
                        let boxx = box3.clone()
                        boxx.castShadow = true
                        boxx.receiveShadow = true
                        boxx.position.y = 1.83
                        group.add(boxx)
                        let boxxx = box1.clone()
                        boxxx.castShadow = true
                        boxxx.receiveShadow = true
                        boxxx.position.y = 2.41
                        group.add(boxxx)
                        break
                    }
                break
            case 4:
                switch(this.shelfOption) {
                    case 1:
                        let box = box1.clone()
                        box.castShadow = true
                        box.receiveShadow = true
                        box.position.y = 2.26
                        group.add(box)
                        let boxA = box5.clone()
                        boxA.castShadow = true
                        boxA.receiveShadow = true
                        boxA.position.y = 2.015
                        group.add(boxA)
                        
                        break
                    case 2:
                        let boxx = box4.clone()
                        boxx.castShadow = true
                        boxx.receiveShadow = true
                        boxx.position.y = 1.83
                        group.add(boxx)
                        let boxB = box6.clone()
                        boxB.castShadow = true
                        boxB.receiveShadow = true
                        boxB.position.y = 1.83
                        group.add(boxB)
                        break
                    case 3:
                        let boxxx = box2.clone()
                        boxxx.castShadow = true
                        boxxx.receiveShadow = true
                        boxxx.position.y = 1.83
                        group.add(boxxx)
                        let boxC = box7.clone()
                        boxC.castShadow = true
                        boxC.receiveShadow = true
                        boxC.position.y = 1.93
                        group.add(boxC)
                        break
                }
                break
        }
        group.add(shelfMesh)
        group.position.x += this.width/2 + this.position[0]
        group.position.z += this.depth/2 + this.frameThickness/2
        group.position.y = this.shelfHeight - this.frameThickness/2
        this.shelves.push(group)
        this.scene.add(group)
        this.shelfHeight = 2.3
      }
      generateInnerShelves() {
        let width = this.width - this.frameThickness*2
        let height = this.frameThickness
        let depth = this.depth - this.frameThickness
        let box = new THREE.BoxGeometry(width,height,depth)
        let material = new THREE.MeshStandardMaterial({color: "white"})
        let mesh = new THREE.Mesh(box, material)
        mesh.position.z = depth/2 + this.frameThickness
        
        mesh.castShadow = true
        mesh.receiveShadow = true
        let object
        if (this.innerShelves.length===0) {
            object = shelvesOptions[this.randint[0]].clone()
        }
        else if (this.innerShelves.length===1) {
            object = shelvesOptions[this.randint[1]].clone()
        }
        else {
            object = shelvesOptions[this.randint[2]].clone()
        }
        
        let group = new THREE.Group()
        group.add(mesh)
        group.add(object)
        group.position.y = this.shelvesY + 0.07
        group.position.x = width/2 + this.frameThickness + this.position[0]
        this.scene.add(group)
        this.innerShelves.push(group)
    }
    addInnerShelves() {
        if (!this.innerShelves.length) {
            
            if (this.drawers.length>2 && ! this.rails.length){
                
                this.shelvesY += 0.33
                this.numOfShelves = 2
              }
            
            if (this.rails.length) {
                
                if (this.drawers.length<3){
                this.numOfShelves = 1
                this.shelvesY = 0.8
                
                }
                else {
                    this.numOfShelves = 0
                }
            }
            for (let i=0; i<this.numOfShelves; i++) {
                this.generateInnerShelves()
                this.shelvesY += 0.33
            }
            if (this.rails.length) {
                this.scene.remove(this.rails[0])
                this.rails = []
                this.addRail()
            }
        }
      }

      updateInnerShelves() {
        this.numOfShelves = 3
        this.innerShelves.forEach(obj => this.scene.remove(obj))
        this.shelvesY = 0.8
        this.innerShelves = []
        this.addInnerShelves()
      }
      addShelves() {
        
        let value = this.height
        if (value>2.15 && !this.shelves.length) {
          this.addShelf(1)
        }

        if (this.shelves.length==1) {
            if (value>2.3) {
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 1.9
                this.addShelf(3)
            }
            else if (value < 2.15) {
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 1.9
            }
            else {
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 1.9
                this.addShelf(1)
            }
            }
          
        if (value>2.5 && this.shelves.length==1) {
          this.num = 1
          this.addShelf(2)
        }
        if (this.shelves.length==2) {
            if (value > 2.7) {
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 2.3
                this.addShelf(4)
            }
            else if(value<2.5) {
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 2.3
            }
            else{
                let ix = this.shelves.length -1
                this.scene.remove(this.shelves[ix])
                this.shelves.splice(ix, 1)
                this.shelfHeight = 2.3
                this.addShelf(2)
            }
          }
        
        // if (value<2.7 && this.shelves.length == 2) {

        // }
    }

    hanger(option) {
        let group = new THREE.Group()
        let railHanger1 = hanger1.clone()
        let railHanger2 = hanger2.clone()
        railHanger1.position.y = 1.8
        railHanger1.position.x = this.frameThickness + 0.005
        railHanger1.position.z = this.depth/2 + this.frameThickness
        railHanger2.position.y = 1.8
        railHanger2.position.x = this.width - this.frameThickness - 0.007
        railHanger2.position.z = this.depth/2 + this.frameThickness
        group.add(railHanger1)
        group.add(railHanger2)
        switch (option) {
            case 1:
                let railClothes1 = clothes1.clone()
                railClothes1.position.y = 1.02
                railClothes1.position.x = 0.35
                railClothes1.position.z = this.depth/2 + this.frameThickness + 0.02
                group.add(railClothes1)
                break
                
            case 2:
                let railClothes2 = clothes2.clone()
                railClothes2.position.y = 1.02    
                railClothes2.position.x = 0.35
                railClothes2.position.z = this.depth/2 + this.frameThickness + 0.02
                group.add(railClothes2)
                break
        }

        
        let cylender = new THREE.CylinderGeometry(0.01, 0.01, this.width - this.frameThickness*2, 30)
        let cylender2 = new THREE.CylinderGeometry(0.1, 0.1, this.width - this.frameThickness*2, 30)
        let material = new THREE.MeshStandardMaterial({color:'grey'})
        let mesh = new THREE.Mesh(cylender, material)
        let cylenderMesh = new THREE.Mesh(cylender2, new THREE.MeshStandardMaterial({color:'red', transparent:true, opacity:0}))

        mesh.rotateZ(Math.PI/2)
        mesh.position.x = (this.width - this.frameThickness*2)/2 + this.frameThickness
        mesh.position.y = 1.8
        mesh.position.z = this.depth/2 + 0.015
        
        cylenderMesh.rotateZ(Math.PI/2)
        cylenderMesh.position.x = this.width/2 + this.frameThickness
        cylenderMesh.position.y = 1.8
        cylenderMesh.position.z = this.depth/2 + 0.015
        group.add(mesh)
        group.position.x += this.position[0]
        group.position.y += this.railYposition
        return [group, cylenderMesh]
      }
    
    addRail () {
        let output;
        if (this.rails.length < 1){
            if (this.drawers.length || this.innerShelves.length || this.pantsHanger){
                let rails = this.hanger(2)

                this.rails.push(rails[0]);
                this.railCylender.push(rails[1])
            }
            else {
                let rails = this.hanger(1)
                this.rails.push(rails[0]);
                this.railCylender.push(rails[1])
            }
            this.scene.add(this.rails[this.rails.length-1])
            this.scene.add(this.railCylender[this.railCylender.length-1])

            if (this.innerShelves.length>1) {
                this.updateInnerShelves()
            }
        }
    }

    addDoor() {
        let singleDoor = new THREE.BoxGeometry(1,1,1)
        let doorMaterial = new THREE.MeshStandardMaterial()
        let doorMesh = new THREE.Mesh(singleDoor, doorMaterial)
        let openToLeft = new THREE.Mesh(singleDoor, doorMaterial)
        openToLeft.rotateY(Math.PI/2)
        this.scene.add(openToLeft)
        this.doors.push(doorMesh)
    }
    
    removeTopDoor() {
        this.topShelfDoors.forEach(door => {
            this.scene.remove(door.leftDoor)
            this.scene.remove(door.rightDoor)
            door.active = false
        })
    }

    removeDoor() {
        this.doors.forEach(door => {
            this.scene.remove(door.leftDoor)
            this.scene.remove(door.rightDoor)
            door.active = false
        })

    }
    update(scene) {
        scene.remove(this.boxMesh)
        scene.remove(this.frame_mesh)
        scene.remove(this.shelfItem)




        this.doors.forEach((doorObj) => {
            scene.remove(doorObj.doorArea)
            scene.remove(doorObj.leftDoor)
            scene.remove(doorObj.rightDoor)
            scene.remove(doorObj.toLeft)
            scene.remove(doorObj.toRight)
        })

        this.topShelfDoors.forEach((doorObj) => {
            scene.remove(doorObj.doorArea)
            scene.remove(doorObj.leftDoor)
            scene.remove(doorObj.rightDoor)
            scene.remove(doorObj.toLeft)
            scene.remove(doorObj.toRight)
        })

        this.box = this.generate_box()
        this.innerBox = this.generateInnerBox()
        this.frame_mesh = this.generate(this.box, this.innerBox)

        
        // this.doors.forEach(door => {
        //     if (door.active) {
        //         this.scene.add(door.doorArea)
        //         this.scene.add(door.rightDoor)
        //         this.scene.add(door.leftDoor)
        //     } 
        // })
        
        // this.topShelfDoors.forEach(door => {
        //     if (door.active) {
        //         this.scene.add(door.doorArea)
        //         this.scene.add(door.rightDoor)
        //         this.scene.add(door.leftDoor)
        //     } 
        // })
    }

    moveFrame(x, y, z) {
        moveGeometry(this.box, x, y, z)
        moveGeometry(this.innerBox, x, y, z)
        this.frame_mesh.position.x += x
    }
    move(x, y, z) {
        
        let margin = 0.007
        let drawerWidth = this.width - this.frameThickness*2 - margin*2
        let plateWidth = this.width - this.frameThickness*2
        moveGeometry(this.box, x, y, z)
        moveGeometry(this.innerBox, x, y, z)
        this.frame_mesh.position.x += x
        this.drawers.forEach(obj =>  obj.position.x = x)
        this.profileMeshes.forEach(obj =>  obj.position.x = x + this.frameThickness)
        this.rails.forEach(rail => rail.position.x = x)
        this.drawerBoxes.forEach(obj =>  obj.position.x  = x + drawerWidth/2 + this.frameThickness + margin)
        this.shelves.forEach(shelf => shelf.position.x = x + this.width/2) 
        if (this.drawerBoxes.length) {
            this.drawerPlate.position.x = x+ 0.02+ plateWidth/2
        }
    }
}

export default Frame