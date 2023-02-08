import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import Vertices from './Vertices';
import SceneInit from './lib/SceneInit';
import Vertices2 from './vertices2';
import Box from './box';
import { BoxGeometry, BufferGeometry, Color, ExtrudeGeometry } from 'three';
import deconstructBox from './deconstructBox';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import makeArrow from './makeArrow';
import getCenterPoint from './getCenterPoint';
import sphereFromPoint from './sphere';
import makeLine from './makeLine';
import addEdge from './addEdge';
import {removeEdge} from './remove';
import {removeAnnotation} from './remove'
import moveGeometry from './moveGeometry';
import objectPosition from './objectPosition';
import extrudeFace from './extrudeFace';
import getVertices from './getVertices';
import Frame from './Frame';
import objectRightPosition from './ObjectRightPosition';
import wood from "/wood_texture.jpg"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import {GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader'

import Stats from 'three/addons/libs/stats.module.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


window.createImageBitmap = undefined

let gltf = new GLTFLoader()

let height = 1.9
let width = 0.5
let depth = 0.5

function App() {
  useEffect(() => {
    
//     // Initialization
    const sceneInit = new SceneInit('canvasId');
    const scene = sceneInit.scene
    const camera = sceneInit.camera
    const canvas = document.getElementById("canvasId");
    const renderer = sceneInit.renderer
    renderer.setClearColor('rgb(227, 227, 227)')

    const controls = sceneInit.controls
    
    // Outline 
    let composer, effectFXAA, hoverOutlinePass, clickOutlinePass, drawerOutlinePass, railOutlinePass, railOutlineClickPass;
    let shelfOutlineClickPass, shelfOutlinePass, pantsHangerOutlinePass, pantsHangerOutlineClickPass, doorOutlinePass;

    composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );
    
    effectFXAA = new ShaderPass( FXAAShader );
    // effectFXAA.uniforms[ 'resolution' ].value.set( 1 / (window.innerWidth+1000), 1 / (window.innerHeight+1000) );
    composer.addPass( effectFXAA );
    

    let createOutlinePass = (color) => {
      let outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth*0.93, window.innerHeight*0.8 ), scene, camera );
      composer.addPass( outlinePass );
      outlinePass.visibleEdgeColor.set( color )
      outlinePass.hiddenEdgeColor.set( color)
      outlinePass.edgeGlow = 0
      outlinePass.edgeThickness = 0.001
      outlinePass.edgeStrength = 10
      return outlinePass
    }

    hoverOutlinePass = createOutlinePass("green")
    clickOutlinePass = createOutlinePass("orange")
    drawerOutlinePass = createOutlinePass("orange")
    railOutlinePass = createOutlinePass("green")
    railOutlineClickPass = createOutlinePass("orange")
    shelfOutlinePass = createOutlinePass("green")
    shelfOutlineClickPass = createOutlinePass("orange")
    pantsHangerOutlinePass = createOutlinePass("green")
    pantsHangerOutlineClickPass = createOutlinePass("orange")
    doorOutlinePass = createOutlinePass("orange")
    // for sRGBencoding
    
    // const gammaCorrectionPass = new ShaderPass( GammaCorrectionShader );
    // composer.addPass( gammaCorrectionPass );
    //==========================================================================================================
    //Adding object
    let tickness = 0.02
    let objId = []
    let x_position = 0
    let frames = []
    let inner_boxes = []
    let visual_margin = 0
    let texture = new THREE.TextureLoader().load(wood)
    let activeFrame;
    let hValue = 0

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    let woodMaterial = new THREE.MeshStandardMaterial( { color: "white", map: texture} )
    
    let findRightMostObjectX = () => {
      let sorted_children = scene.children.filter(value => objId.includes(value.id))
      if (sorted_children.length){

        let sortOrder = sorted_children.map(value => Math.abs(objectPosition(value.geometry).x - 0))
      
        sorted_children.sort(function (a, b) {
          return Math.abs(objectPosition(a.geometry).x - 0) - Math.abs(objectPosition(b.geometry).x - 0)
        });
        return sorted_children
        
      }
    }
    
    let addButtonClick = () => {
      
      let sorted_children = findRightMostObjectX()
      if (sorted_children) {
        let right_most_objectX = objectRightPosition(sorted_children[sorted_children.length-1].geometry).x
        x_position = (right_most_objectX  + visual_margin) - 0.02
      }
      else {
        x_position = 0
      }

      let material;
      let box_mesh;
      let box;
      let innerBox;
      let drawerBox;
      let box_geometry;
      material = new THREE.MeshStandardMaterial( { color: "white" } );
      let frame = new Frame([x_position, 0, 0], width, height, depth, tickness,  material, scene)
      let frame_mesh = frame.frame_mesh

      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      
      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };



      frame.frame_mesh = frame_mesh
      scene.add(frame.frame_mesh)
      scene.add(frame.shelfItem)

      frame.boxMesh = new THREE.Mesh(frame.box, new THREE.MeshStandardMaterial( {transparent: true, opacity: 0} ))
      // box_mesh.position.y += height/2
      // box_mesh.position.z += depth/2
      scene.add(frame.boxMesh)

      frame.boxId = frame.boxMesh.id
      objId.push(frame.boxMesh.id)

      frames.push(frame)

      let maxHeight = 0
      frames.forEach((frame) => {
        if (frame.height>maxHeight){
          maxHeight = frame.height
        }
      })
      hValue = maxHeight
      sceneInit.updatePlanes(x_position, hValue)
    }

    let removeButtonClick = () => {
      
      resetClick()
      let sorted_children = findRightMostObjectX()
      if (sorted_children) {
        
        let rightMostObject = sorted_children[sorted_children.length-1]
        let frame = frames.find(obj => obj.boxId===rightMostObject.id)
        scene.remove(frame.frame_mesh)
        scene.remove(frame.shelfItem)
        scene.remove(rightMostObject)
        frame.doors.forEach(door => {
          scene.remove(door.leftDoor)
          scene.remove(door.rightDoor)
          scene.remove(door.doorArea)
        })
        frame.topShelfDoors.forEach(door => {
          scene.remove(door.leftDoor)
          scene.remove(door.rightDoor)
          scene.remove(door.doorArea)
        })
        frame.shelves.forEach(shelf => scene.remove(shelf))
        frame.drawers.forEach(i => scene.remove(i))
        frame.drawerBoxes.forEach(i => scene.remove(i))
        frame.profileMeshes.forEach(i => scene.remove(i))
        frame.rails.forEach(rail => scene.remove(rail))
        frame.rails = []
        frame.drawers = []
        frame.drawerBoxes = []
        frame.profileMeshes = undefined
        frame.removeInnerShelves()
        scene.remove(frame.drawerPlate)
        frames.splice(frames.indexOf(frame), 1)
        objId.splice(objId.indexOf(rightMostObject.id), 1)
      }
      sorted_children = findRightMostObjectX()
      if (sorted_children) {
        let right_most_objectX = objectRightPosition(sorted_children[sorted_children.length-1].geometry).x
        x_position = right_most_objectX  + visual_margin
      }
      else {
        x_position = 0
      }
      if (frames.length) {
        sceneInit.updatePlanes(x_position, hValue)

      }
      
    }

    let drawerClick = () => {
      if (scene.children.find(obj => obj===activeFrame.drawerPlate)) {
        scene.remove(activeFrame.drawerPlate)
      }
      let position = activeFrame.position
      activeFrame.addDrawer(scene)

      // scene.add(activeFrame.drawerBoxes[ix])
    }
    let shelfRemove = (clickedshelf) => {
      scene.remove(clickedShelf)
      let ix = activeFrame.innerShelves.indexOf(clickedShelf)
      activeFrame.innerShelves.splice(ix, 1)
    }

    let pantsHangerRemove = (pantsHanger) => {
      scene.remove(pantsHanger)
      activeFrame.pantsHanger = undefined
    }
    let drawerRemoveClick = () => {
      let ix = activeFrame.drawerBoxes.length - 1
      // scene.remove(activeFrame.drawerBoxes[ix])
      // scene.remove(activeFrame.drawerPlate)
      scene.remove(activeFrame.drawers[ix])
      scene.remove(activeFrame.drawerBoxes[ix])
      scene.remove(activeFrame.profileMeshes[ix+1])
      activeFrame.drawerBoxes.splice(ix, 1)
      activeFrame.drawers.splice(ix, 1)
      activeFrame.profileMeshes.splice(ix+1, 1)
      
      if (activeFrame.profileMeshes.length === 1) {
        scene.remove(activeFrame.profileMeshes[ix]);
        activeFrame.profileMeshes.splice(ix, 1)
      }
      activeFrame.positionY = Math.max(activeFrame.positionY - (activeFrame.drawerMargin + 0.13), 0)
      activeFrame.drawers.length? activeFrame.shelfItem.position.y =  activeFrame.positionY+activeFrame.drawerMargin+activeFrame.frameThickness: activeFrame.shelfItem.position.y = 0
      if (activeFrame.drawers.length) {
        activeFrame.drawerPlate.position.y -= (activeFrame.drawerMargin + 0.13)
      }
      else {
        scene.remove(activeFrame.drawerPlate)
      }
      if (activeFrame.innerShelves.length){
      activeFrame.updateInnerShelves()
      }
    }

    let railClick = () => {
      activeFrame.addRail()
      let ix = activeFrame.rails.length - 1
    }
    let railRemove = () => {
      
      let ix = activeFrame.rails.length - 1
      if (ix > -1) {
        scene.remove(activeFrame.rails[ix])
        activeFrame.rails.splice(ix, 1)
      }
      if (activeFrame.innerShelves.length){
        activeFrame.updateInnerShelves()
      }


      
    }

    let addDoorIsClicked = false
    
    let addDoor = () => {
      document.getElementById("checkBox").appendChild(label2);
      hideDoorCheckBox.onchange = hideDoors
      document.getElementById("checkBox").appendChild(hideDoorCheckBox)
      if (addDoorIsClicked) {
        resetAddDoor()
      }
      else {
        addDoorButton.style.background = 'lightgrey'
        addDoorIsClicked = true

      }
    }
    let addDoorButton = document.getElementById("AddDoor")
    addDoorButton.onclick = addDoor

    let addButton = document.getElementById("AddFrame")
    addButton.onclick = addButtonClick

    let remvoeButton = document.getElementById("RemoveFrame")
    
    remvoeButton.onclick = removeButtonClick

    let drawerButton = document.createElement("button")
    drawerButton.innerHTML = "Add drawer";
    drawerButton.id = "DrawerButton"

    
    let heightCheckBox = document.createElement("input")
    heightCheckBox.type = "checkBox"
    var label = document.createElement('label')
    label.htmlFor = "linkHeight";
    label.appendChild(document.createTextNode(' Link height '));
    heightCheckBox.id = "linkHeight"
    heightCheckBox.checked = true
    label.id = 'labelId'

    let hideDoorCheckBox = document.createElement("input")
    hideDoorCheckBox.type = "checkBox"
    var label2 = document.createElement('label')
    label2.htmlFor = "hideDoorCheckBox";
    label2.appendChild(document.createTextNode(' Hide Doors '));
    hideDoorCheckBox.id = "hideDoorCheckBox"
    hideDoorCheckBox.checked = false
    label2.id = 'label2Id'


    let railButton = document.createElement('button')
    railButton.innerHTML = "Add rail"
    railButton.id = "railButton"
    
    let shelvesButton = document.createElement('button')
    shelvesButton.innerHTML = "Add shelves"
    shelvesButton.id = "shelvesButton"
    // let shelvesRemoveButton = document.createElement("button")
    // shelvesRemoveButton.innerHTML = "Remove shelves"
    // shelvesRemoveButton.id = "shelvesRemoveButton"
    
    let pantsHangerButton = document.createElement('button')
    pantsHangerButton.innerHTML = "Add pants hanger"
    pantsHangerButton.id = "pantsHangerButton"
    



    let shelvesClick = () => {
      activeFrame.updateInnerShelves()
    }

    let pantsHangerClick = () => {
      activeFrame.addPantsHanger()
    }

//==================================================================================================
//creating raycaster and EventListener

    var pointer = new THREE.Vector2()
    var raycaster = new THREE.Raycaster()

    function onPointerMove( event ) {

      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
    
      pointer.x = ( event.clientX/ (window.innerWidth *0.93) ) * 2 - 1.17;
      pointer.y = - ( event.clientY / (window.innerHeight*0.8) ) * 2 + 1.25;

    }

//==================================================================================================
//reset selections

    const resetHover = () => {
      for (let i=0; i<frames.length; i++) {
        for (let j=0; j<frames[i].drawers.length; j++) {
          if (frames[i].drawers[j] !== clickedDrawer){
            frames[i].drawers[j].position.z = 0
          }
          

        }
      }
      if (!hideDoorIsChecked) {
        frames.forEach((frame) => {
          frame.doors.forEach((doorObj) => {
            if (! doorObj.active) {
              scene.remove(doorObj.leftDoor)
              scene.remove(doorObj.rightDoor)
              
              scene.remove(doorObj.toLeft)
              scene.remove(doorObj.toRight)
              
            }
            else {
              scene.remove(doorObj.toLeft)
              scene.remove(doorObj.toRight)
              scene.add(doorObj.leftDoor)
              scene.add(doorObj.rightDoor)
            }
          })
          
          frame.topShelfDoors.forEach( (doorObj) => {
            if (! doorObj.active) {
            scene.remove(doorObj.leftDoor)
            scene.remove(doorObj.rightDoor)
            scene.remove(doorObj.toLeft)
            scene.remove(doorObj.toRight)
            }
            else {
              scene.remove(doorObj.toLeft)
              scene.remove(doorObj.toRight)
              scene.add(doorObj.leftDoor)
              scene.add(doorObj.rightDoor)
            }
          }

          )
        })

      }
      hoverOutlinePass.selectedObjects = []
      railOutlinePass.selectedObjects = []
      shelfOutlinePass.selectedObjects = []
      pantsHangerOutlinePass.selectedObjects = []
      // for (let i=0; i < scene.children.length; i++) {
      //   for (let k=0; k < hoverId.length; k++) {
      //     if (scene.children[i].id == hoverId[k]) {
            
      //       scene.remove(scene.children[i])
      //     }
      //   }
        
          
      // }
    }

    const resetClick = () => {
      if (document.getElementById("DrawerButton")){
        document.getElementById("AddDrawersDiv").removeChild(document.getElementById("DrawerButton"))
      }

      if (document.getElementById("railButton")){
        document.getElementById("AddRailDiv").removeChild(document.getElementById("railButton"))
      }

      if (document.getElementById("linkHeight")){
        document.getElementById("checkBox").removeChild(document.getElementById("linkHeight"))
      }

      if (document.getElementById("labelId")){
        document.getElementById("checkBox").removeChild(document.getElementById("labelId"))
      }
      if (document.getElementById("shelvesButton")){
        document.getElementById("AddShelvesDiv").removeChild(document.getElementById("shelvesButton"))
      }

      if (document.getElementById("pantsHangerButton")){
        document.getElementById("AddPantsHangerDiv").removeChild(document.getElementById("pantsHangerButton"))
      }


      doorOutlinePass.selectedObjects = []
      railOutlineClickPass.selectedObjects = []
      drawerOutlinePass.selectedObjects = []
      clickOutlinePass.selectedObjects = []
      shelfOutlineClickPass.selectedObjects = []
      pantsHangerOutlineClickPass.selectedObjects = []
      boxClickId = undefined
      clickedDrawer = undefined
      clickedShelf = undefined
      clickedrail = undefined
      // removeAnnotation(scene, anot_lineId, anot_pt1Id, anot_pt2Id)
      // anot_lineId = undefined
      // anot_pt1Id = undefined
      // anot_pt2Id = undefined

    }
    let doorMaterial = new THREE.MeshStandardMaterial()
    var hoverId = []
    var edgeClickId;
    var boxClickId;
    var controller1;
    var controller2;
    var clickedBox;
    var anot_lineId
    var anot_pt1Id
    var anot_pt2Id
    var object_is_selected = false
    var heightIsLinked = true
    var object_is_hovered = false
    var clickedDrawer;
    var clickedrail;
    var clickedShelf;
    var clickedPantsHanger;
    var clickedDoor;
    var selectedDoor;
    var hideDoorIsChecked = false
  //=======================================================================
  // Event functionsobjId
  let childrenOf = (parent, condition) => {
    for (let i=0; i< parent.length; i++) {
      if (condition === parent[i].id){
        return true
      }
      if (parent[i].children){
      let children = childrenOf(parent[i].children, condition)
      if (children) {
        return true
      }
      
      }
    }
  }

  // Mouse Hover
    function hoverObject() {
        
        raycaster.setFromCamera( pointer, camera );
    
        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children, true );
        hoverId = []
        
        for (let i=0; i < intersects.length; i++) {

          for (let j=0; j < objId.length; j++) {
              if (intersects[i].object.id === objId[j]) {
                
              }
              if (intersects[i].object.id === objId[j] && intersects[i].object.id !== boxClickId) {
                object_is_hovered = true
                if (! hoverOutlinePass.selectedObjects.includes(intersects[i].object)){
                  hoverOutlinePass.selectedObjects.push(intersects[i].object)
                }
                break
              }
            if (object_is_hovered) {break}
            }
          if (object_is_hovered) {break}
        }

        object_is_hovered = false
        let frame;
        
        for (let i=0; i < intersects.length; i++) {
          frame = frames.find(obj => obj.boxId === intersects[i].object.id)
          
          if (frame){break}
        }
        
        if (frame) {
          if (!hideDoorIsChecked) {
            for (let i=0; i < intersects.length; i++) {
              for (let j=0; j< frame.doors.length; j++) {
                if (! addDoorIsClicked) {
                  
                  if (intersects[i].object.id === frame.doors[j].doorArea.id) {
                    if ( frame.doors[j].active) {
                      scene.remove(frame.doors[j].leftDoor)
                      scene.remove(frame.doors[j].rightDoor)
                      scene.add(frame.doors[j].toLeft)
                      scene.add(frame.doors[j].toRight)
                      selectedDoor = frame.doors[j]
                    }
                  }
                  if (frame.topShelfDoors[0].doorArea) {
                    if (intersects[i].object.id === frame.topShelfDoors[j].doorArea.id) {
                      
                      if ( frame.topShelfDoors[j].active) {
                        scene.remove(frame.topShelfDoors[j].leftDoor)
                        scene.remove(frame.topShelfDoors[j].rightDoor)
                        scene.add(frame.topShelfDoors[j].toLeft)
                        scene.add(frame.topShelfDoors[j].toRight)
                        selectedDoor = frame.topShelfDoors[j]
                      }
                      // scene.add(frame.doors[j].leftDoor)
                      // scene.add(frame.doors[j].rightDoor)
                    }

                  }
                    // frame.doors[j].toRight.material = doorMaterial
                  
                }
              }
          }

          }
          if (addDoorIsClicked){
            if (!hideDoorIsChecked) {
              for (let i=0; i < intersects.length; i++) {
                for (let j=0; j< frame.doors.length; j++) {
                  if (intersects[i].object.id === frame.doors[j].doorArea.id) {
                    scene.add(frame.doors[j].leftDoor)
                    scene.add(frame.doors[j].rightDoor)
                    selectedDoor = frame.doors[j]
                    // frame.doors[j].toRight.material = doorMaterial
                  }
                  if (frame.topShelfDoors[0].doorArea) {
                    if (intersects[i].object.id === frame.topShelfDoors[j].doorArea.id) {
                      scene.add(frame.topShelfDoors[j].leftDoor)
                      scene.add(frame.topShelfDoors[j].rightDoor)
                      selectedDoor = frame.topShelfDoors[j]
                      // frame.doors[j].toRight.material = doorMaterial
                    }
                  }
                }
            }
          }
          }

          let rail
          for (let i=0; i < intersects.length; i++) {
            

            rail = childrenOf(frame.rails, intersects[i].object.id)
            
            if (rail) {
              railOutlinePass.selectedObjects = [frame.rails[0]]
              break
              }
          }

          let shelf;
          for (let i=0; i < intersects.length; i++) {
            
            for (let j=0; j<frame.innerShelves.length; j++) {
              shelf = childrenOf(frame.innerShelves[j].children, intersects[i].object.id)
              if (shelf) {
                shelfOutlinePass.selectedObjects = [frame.innerShelves[j]]
                break
                }

            }
          }

          let pantsHanger;
          for (let i=0; i < intersects.length; i++) {
              if (frame.pantsHanger) {

                pantsHanger = childrenOf(frame.pantsHanger.children, intersects[i].object.id)
                if (pantsHanger) {
                  pantsHangerOutlinePass.selectedObjects = [frame.pantsHanger]
                  break
                  }
              }

            }
          

        }
        let drawer = false
        if (frame){
          if (! frame.doors[0].active && !hideDoorIsChecked){

            for (let i=0; i < intersects.length; i++) {
  
              for (let m=0; m < frame.drawerBoxes.length; m++) {
                if (intersects[i].object.id === frame.drawerBoxes[m].id){
                  frame.drawers[m].position.z = 0.15
                  drawer=true
                  break
                }
              if (drawer) {
                break
              }
                
              }
            if (drawer) {
              break
            }
            }
          }
        } 
          

          
        
      }



      
      //---------------------------------------------------------------------
      // mouse click
      function hideDoors(value) {
        hideDoorIsChecked = false
        if (value.target.checked) {
          hideDoorIsChecked = true
          frames.forEach((frame) => {
            frame.topShelfDoors.forEach( door => {
              if (door.active) {
                scene.remove(door.leftDoor)
                scene.remove(door.rightDoor)
                scene.remove(door.toLeft)
                scene.remove(door.toRight)

              }
            }
            )
            frame.doors.forEach((door) => {
              if (door.active) {
                scene.remove(door.leftDoor)
                scene.remove(door.rightDoor)
                scene.remove(door.toLeft)
                scene.remove(door.toRight)

              }
            })
          })
        }
      }

      function heightLink(value) {
        heightIsLinked = value.target.checked
      }

      function clickObject() {
        console.log(pointer)
        if (pointer.y < 0.95 && pointer.x < 0.7 && pointer.x > -1)  {
          resetClick()

        }
        if ( controller1 !== undefined ) {
          gui.remove(controller1); controller1 = undefined;
          gui.remove(controller2); controller2 = undefined
        }
        raycaster.setFromCamera( pointer, camera );
        
        var clickedObj;
    
        const intersects = raycaster.intersectObjects( scene.children, true );
        for (let i=0; i < intersects.length; i++) {
          for (let j=0; j < objId.length; j++) {
            if (intersects[i].object.id === objId[j]) {
              
              object_is_selected = true
              clickedObj = intersects[i].object
              break
              
            }
            else{
              object_is_selected = false
            }
          }
          if (object_is_selected) {
            break
          }

          }
        if (! intersects.length) {object_is_selected=false}
        
        if (object_is_selected) {

          document.getElementById("AddShelvesDiv").appendChild(shelvesButton)
          shelvesButton.onclick = shelvesClick
          
          document.getElementById("AddPantsHangerDiv").appendChild(pantsHangerButton)
          pantsHangerButton.onclick = pantsHangerClick

          drawerButton.onclick = drawerClick
          document.getElementById("AddDrawersDiv").appendChild(drawerButton)


          railButton.onclick = railClick
          document.getElementById("AddRailDiv").appendChild(railButton)

          document.getElementById("checkBox").appendChild(label);
          heightCheckBox.onchange = heightLink
          document.getElementById("checkBox").appendChild(heightCheckBox)
          


          boxClickId = clickedObj.id

          
          
          let points = []
          points.push(new THREE.Vector3(0,1,2))
          points.push(new THREE.Vector3(0.2,1,2))

          // Annotation 
          // let faces = deconstructBox(box_mesh.geometry)
          // let face1 = faces[2]
          // let face2 = faces[4]
          // let center1 = getCenterPoint(face1)
          // let center2 = getCenterPoint(face2)
          // center1.y = height+0.1
          // center2.y = height+0.1
          // let center_pt = sphereFromPoint(center1)
          // let center_pt2 = sphereFromPoint(center2)
          
          // let line = makeLine(center1, center2, "green")

          // anot_lineId = line.id
          // anot_pt1Id = center_pt.id
          // anot_pt2Id = center_pt2.id

          // scene.add(line)
          // scene.add(center_pt)
          // scene.add(center_pt2)

          // Add GUI controller
          let frame = frames.find(obj => obj.boxId===clickedObj.id)
          activeFrame = frame
          let frame_ix = frames.indexOf(frame)
          
          let drawer
          for (let i=0; i < intersects.length; i++) {
            for (let m=0; m < frame.drawerBoxes.length; m++) {
              if (intersects[i].object.id === frame.drawerBoxes[m].id){
                if (!frame.doors[0].active && !hideDoorIsChecked){
                  frame.drawers[m].position.z = 0.15

                }
                clickedDrawer = frame.drawers[m]
                drawerOutlinePass.selectedObjects = [clickedDrawer]
                drawer=true
                break
              }
            if (drawer) {
              break
            }
              
            }
            if (drawer) {
              break
              }
          }
          let rail
          if (frame.rails[0]) {
          
          
            for (let i=0; i < intersects.length; i++) {
              
  
              rail = childrenOf(frame.rails, intersects[i].object.id)
              
              if (rail) {
                railOutlineClickPass.selectedObjects = [frame.rails[0]]
                clickedrail = frame.rails[0]
                break
                }
            }
          }
          
          let shelf;
          for (let i=0; i < intersects.length; i++) {
            
            for (let j=0; j<frame.innerShelves.length; j++) {
              shelf = childrenOf(frame.innerShelves[j].children, intersects[i].object.id)
              if (shelf) {
                shelfOutlineClickPass.selectedObjects = [frame.innerShelves[j]]
                clickedShelf = frame.innerShelves[j]
                break
                }

            }
            if (shelf) {break}
          }

          let pantsHanger;
          for (let i=0; i < intersects.length; i++) {
              if (frame.pantsHanger) {

                pantsHanger = childrenOf(frame.pantsHanger.children, intersects[i].object.id)
                if (pantsHanger) {
                  pantsHangerOutlineClickPass.selectedObjects = [frame.pantsHanger]
                  clickedPantsHanger = frame.pantsHanger
                  break
                  }
              }

            }

          let leftDoor;
          let rightDoor
          for (let i=0; i < intersects.length; i++) {
              if (frame.doors[0].active) {

                leftDoor = childrenOf(frame.doors[0].toLeft.children, intersects[i].object.id)
                rightDoor = childrenOf(frame.doors[0].toRight.children, intersects[i].object.id)
                if (leftDoor || rightDoor) {
                  doorOutlinePass.selectedObjects = [frame.doors[0].toLeft, frame.doors[0].toRight,
                   frame.doors[0].leftDoor, frame.doors[0].rightDoor]
                  clickedDoor = "buttom"
                  break
                  }
              }

              if (frame.topShelfDoors[0].active) {

                leftDoor = childrenOf(frame.topShelfDoors[0].toLeft.children, intersects[i].object.id)
                rightDoor = childrenOf(frame.topShelfDoors[0].toRight.children, intersects[i].object.id)
                if (leftDoor || rightDoor) {
                  doorOutlinePass.selectedObjects = [frame.topShelfDoors[0].toLeft, frame.topShelfDoors[0].toRight,
                   frame.topShelfDoors[0].leftDoor, frame.topShelfDoors[0].rightDoor]
                  clickedDoor = "top"
                  break
                  }
              }

            }

          if (!rail && !drawer && !shelf && !pantsHanger && !leftDoor && !rightDoor) {
            clickOutlinePass.selectedObjects.push(clickedObj)

          }

          if (addDoorIsClicked) {
            selectedDoor.active = true
            scene.add(selectedDoor.rightDoor)
            scene.add(selectedDoor.leftDoor)
          }
          controller1 = gui.add(frame, "width", 0.5, 0.75)
          controller2 = gui.add(frame, "height", 1.9, 2.9)
          // console.log(controller1)
          let delta = frame.width

          controller1.onChange((value) => {
            let frameThickness = 0.01
            let value2 = value - delta
            delta += value2
            let previous_x = objectPosition(frame.boxMesh.geometry).x 
            let sorted_children = scene.children.filter(value => objId.includes(value.id))
            // let sortOrder = sorted_children.map(value => Math.abs(objectPosition(value.geometry).x - previous_x))
            sorted_children.sort(function (a, b) {
              return Math.abs(objectPosition(a.geometry).x - previous_x) - Math.abs(objectPosition(b.geometry).x - previous_x)
            });
            

            let step = visual_margin - frameThickness*2
            scene.remove(sorted_children[0])

            for (let i=1; i < sorted_children.length; i++) {
              
              
                let frame2 = frames.find(obj => obj.boxId===sorted_children[i].id)
                let box_mesh = sorted_children[i]
                let x = objectPosition(box_mesh.geometry).x
                
                
                if (x > objectPosition(clickedObj.geometry).x){
                  scene.remove(frame2.frame_mesh)
                  scene.remove(frame2.drawerPlate)
                  frame2.update(scene)
                  frame2.move(previous_x + step + value, 0, 0)
                  if (frame2.innerShelves.length) {
                    frame2.removeInnerShelves()
                    frame2.addInnerShelves()
                  }
                  if (frame2.pantsHanger) {
                    frame2.removePantsHanger()
                    frame2.addPantsHanger()
                  }

                  frame2.drawers.length? frame2.shelfItem.position.y =  frame2.positionY+frame2.drawerMargin+frame2.frameThickness: frame2.shelfItem.position.y = 0
                  frame2.position[0] = previous_x + step + value
                  step += (frame2.width + visual_margin - frameThickness*2)
                  frame2.boxMesh = new THREE.Mesh(frame2.box, frame2.boxMesh.material)
                  frame2.boxMesh.castShadow = true
                  frame2.boxId = frame2.boxMesh.id
                  
                  scene.add(frame2.frame_mesh)
                  scene.add(frame2.shelfItem)
                  if (frame2.drawers.length){
                    scene.add(frame2.drawerPlate)
                  }
                  
                  let ix = objId.indexOf(box_mesh.id)
                  objId.splice(ix, 1)
                  objId.push(frame2.boxMesh.id)
                  scene.remove(sorted_children[i])
                  scene.add(frame2.boxMesh)
                  
                }

              
            }

            if (frame.drawers.length) {
              scene.remove(frame.drawerPlate)
            }
            frame.drawers.forEach(drawer => scene.remove(drawer))
            frame.drawerBoxes.forEach(box => scene.remove(box))
            frame.profileMeshes.forEach(obj => scene.remove(obj))
            frame.rails.forEach(obj => scene.remove(obj))
            frame.update(scene)
            frame.shelves.forEach(shelf => scene.remove(shelf))
            let len = frame.drawers.length
            let shelvesLen = frame.shelves.length
            let arr = []
            frame.positionY = 0
            frame.railYposition = 0
            frame.drawers = []
            frame.drawerBoxes = []
            frame.profileMeshes = []
            frame.shelves = []
            frame.shelfHeight = 1.9
            frame.addShelves()
            let railLen = frame.rails.length
            frame.rails = []
            for (let i=0; i<len; i++){
              frame.addDrawer(scene)
            }
            for (let i=0; i<railLen; i++){
              frame.addRail()
            }

            frame.move(frame.position[0], 0, 0)
            if (!frame.drawers.length && frame.innerShelves.length) {
              frame.removeInnerShelves()
              frame.addInnerShelves()
            }
            if (frame.pantsHanger) {
              frame.removePantsHanger()
              frame.addPantsHanger()
            }
            
            let ix = objId.indexOf(frame.boxMesh.id)
            objId.splice(ix, 1)
            frame.boxMesh = new THREE.Mesh(frame.box, frame.boxMesh.material)
            objId.push(frame.boxMesh.id)
            frame.boxMesh.castShadow = true
            frame.boxId = frame.boxMesh.id

            frame.profileMeshes.forEach(obj => scene.add(obj))
            scene.add(frame.frame_mesh)
            scene.add(frame.shelfItem)
            scene.add(frame.boxMesh)

            let sorted_children2 = findRightMostObjectX()
            if (sorted_children2) {
              let right_most_objectX = objectRightPosition(sorted_children2[sorted_children2.length-1].geometry).x
              x_position = right_most_objectX  + visual_margin -0.01
            }
            else {
              x_position = 0
            }
            sceneInit.updatePlanes(x_position, hValue)
          })

          
          let deltaHeight = frame.height

          controller2.onChange((value) => {
            height = value
            let maxHeight = 0
            frames.forEach((frame) => {
              if (frame.height>maxHeight){
                maxHeight = frame.height
              }
            })
            sceneInit.updatePlanes(x_position, maxHeight)
            hValue = maxHeight
            if (heightIsLinked) {
              frames.forEach((frame) => {
                if (value<2.6 && frame.topShelfDoors[0].active) {
                  scene.remove(frame.topShelfDoors[0].leftDoor)
                  scene.remove(frame.topShelfDoors[0].rightDoor)
                  frame.topShelfDoors[0].active = false
                }
                frame.height = value
                frame.update(scene)
                frame.moveFrame(frame.position[0], 0, 0)
                frame.drawers.length? frame.shelfItem.position.y =  frame.positionY+frame.drawerMargin+frame.frameThickness: frame.shelfItem.position.y = 0
                let ix = objId.indexOf(frame.boxMesh.id)
                objId.splice(ix, 1)
                frame.boxMesh = new THREE.Mesh(frame.box, frame.boxMesh.material)
                objId.push(frame.boxMesh.id)
                frame.boxMesh.castShadow = true
                frame.boxId = frame.boxMesh.id
                scene.add(frame.frame_mesh)
                scene.add(frame.shelfItem)
                scene.add(frame.boxMesh)
                frame.addShelves()
              })
            }
            else {
              if (value<2.6 && frame.topShelfDoors[0].active) {
                scene.remove(frame.topShelfDoors[0].leftDoor)
                scene.remove(frame.topShelfDoors[0].rightDoor)
                frame.topShelfDoors[0].active = false
              }
              frame.update(scene)
              frame.moveFrame(frame.position[0], 0, 0)

              let ix = objId.indexOf(frame.boxMesh.id)
              objId.splice(ix, 1)
              frame.boxMesh = new THREE.Mesh(frame.box, frame.boxMesh.material)
              objId.push(frame.boxMesh.id)
              frame.boxMesh.castShadow = true
              frame.boxId = frame.boxMesh.id
              scene.add(frame.frame_mesh)
              scene.add(frame.shelfItem)
              scene.add(frame.boxMesh)
              
              frame.addShelves()
            }
            

          })
        }
        else {
          
          
        }
            
        
      }
      //-----------------------------------------------------------------------
        // Mouse Hold

      // let mouseHold = () => {
      //   if (object_is_selected && down && moved) {
          
      //     raycaster.setFromCamera( pointer, camera );
              
      //     const intersects = raycaster.intersectObjects( scene.children, true );
          
          
      //     for (let i=0; i < intersects.length; i++) {
      //       let clickedObj = intersects[i].object
      //       let condition = clickedObj.id == anot_pt1Id
            
      //       if (condition) {
      //         console.log("Hello")
      //         clickedObj.position.x += 0.1
      //       }
      //     }
      //   }
      // }  

    let resetAddDoor = () => {
      addDoorIsClicked = false
      addDoorButton.style.background = addButton.style.background
    }
    let deleteItem = (event) => {
      if (event.key==="Delete" && clickedDrawer){
        drawerRemoveClick()
      }
      if (event.key==="Delete" && clickedrail){
        railRemove()
      }
      if (event.key==="Delete" && clickedShelf){
        shelfRemove(clickedShelf)
      }
      if (event.key==="Delete" && clickedPantsHanger){
        pantsHangerRemove(clickedPantsHanger)
      }
      if (event.key==="Delete" && clickedDoor === 'buttom'){
        activeFrame.removeDoor()
      }
      if (event.key==="Delete" && clickedDoor === 'top'){
        activeFrame.removeTopDoor()
      }
      if (event.key==="Escape") {
        resetClick()
        resetAddDoor()
      }

    }


    let rightClick = () => {
      resetAddDoor()
      resetClick()
    }
    
    
    
    window.addEventListener( "mousemove", onPointerMove );
    window.addEventListener( "keydown", deleteItem )
    window.addEventListener("contextmenu", rightClick)
//=====================================================================================
// Event listener
    let moved
    let down
    let downListener = (event) => {
      
      if (event.which === 1){
        down = true
        moved = false
        
      }
      

    }
    window.addEventListener('mousedown', downListener)
    let moveListener = () => {
      // mouseHold()
      moved = true
    }
    window.addEventListener('mousemove', moveListener)
    let upListener = () => {
      down = false
      if (moved) { 
      } else {
        clickObject()
      }
    }
    window.addEventListener('mouseup', upListener)
    //======================================================================================
    // Graphic User Interface (GUI)
        const gui = new GUI({name: 'My GUI'})

//===================================================================================
//Animation and render    

    const animate = () => {
      controls.update();
      resetHover()
      hoverObject()
      // renderer.render(scene, camera)

      composer.render();
      window.requestAnimationFrame(animate);
      
    }

    animate()

    return () => {
      gui.destroy();
    };
  
  }, []);




  return (
    <div id= "initialDiv">

    <div id="mainDiv" className='ma0'>
      
      <div className='addFrame'> 

      <button id="AddFrame"> Add frame</button>
      <button id="RemoveFrame"> remove frame</button>
        
      </div>

      <button id="AddDoor"> Add door</button>
      <div id="AddShelvesDiv"></div>
      <div id="AddPantsHangerDiv"></div>
      <div id="AddDrawersDiv"></div>
      <div id="AddRailDiv"></div>
      <div>
      
      
      <canvas id="canvasId" className='ma0 pa0'/>

    </div>
      </div>
      <div id = "checkBox">
        

      </div>
      
    </div>
  );
}

export default App;
