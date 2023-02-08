import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.width = window.innerWidth;
    this.height = window.innerHeight*0.8;
    // NOTE: Camera params;
    this.fov = 35;
    this.nearPlane = 0.1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Lighting is basically required.
    this.directionalLight = undefined;
    this.ambientLight = undefined;
    this.initialize()
    this.planes;
  }
    

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 6;
    this.camera.position.y = 1;
    this.camera.position.x = 1

    
    
    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(this.width, this.height);
    this.renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(1, 1, 0);
    this.controls.mouseButtons = {
      MIDDLE: THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.PAN
    }

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // spot light which is illuminating the chart directly
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(-20, 20, 32);
    // this.directionalLight.shadow.bias = -0.00001
    this.directionalLight.shadow.normalBias = 0.03
    // this.directionalLight.shadow.camera.far = 10000
    // this.directionalLight.shadow.camera.bottom = 400
    // this.directionalLight.shadow.camera.left = 400
    // this.directionalLight.shadow.camera.right = -400
    // this.directionalLight.shadow.camera.top = -200
    this.scene.add(this.directionalLight); 
    
    //=============================== Add Helper
    // Add Axis helper
    // const axesHelper = new THREE.AxesHelper( 10 );
    // this.scene.add( axesHelper );

    // Add light helper
    // const dlightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera)
    // this.scene.add(dlightShadowHelper)

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

  }
    


    // Add initial planes
    generatePlane(x_position, hValue) {
      let planeGroup = new THREE.Group()

      const plane_geometry = new THREE.PlaneGeometry(x_position+0.7,1)
      plane_geometry.rotateX(0.5*Math.PI)
      plane_geometry.rotateZ(Math.PI)
      const plane_material = new THREE.MeshStandardMaterial({color:"rgb(163, 158, 158)"})
      const planeXYButtom = new THREE.Mesh(plane_geometry, new THREE.MeshStandardMaterial({color:"rgb(163, 158, 158)"}))
      planeXYButtom.position.z += 0.5
      planeXYButtom.position.x += x_position/2 + +0.25
      planeXYButtom.receiveShadow = true
      planeGroup.add(planeXYButtom)

      const plane_geometry_top = new THREE.PlaneGeometry(x_position+0.7,1)
      plane_geometry_top.rotateX(0.5*Math.PI)
      const planeXYTop = new THREE.Mesh(plane_geometry_top, new THREE.MeshStandardMaterial({color:"rgb(163, 158, 158)"}))
      planeXYTop.position.z += 0.5
      planeXYTop.position.x += x_position/2 + +0.25
      planeXYTop.position.y += 0.2 + hValue
      planeXYTop.receiveShadow = true
      planeGroup.add(planeXYTop)



      const plane_geometry2 = new THREE.PlaneGeometry(x_position+0.7,0.2+ hValue)
      const planeXZ = new THREE.Mesh(plane_geometry2, plane_material)
      planeXZ.position.y += (hValue/2)+ 0.1
      planeXZ.position.z -= 0
      planeXZ.position.x += (x_position/2) +0.25
      planeXZ.receiveShadow = true
      planeGroup.add(planeXZ)

      const plane_geometry3 = new THREE.PlaneGeometry(1,0.2+ hValue)
      plane_geometry3.rotateY(0.5*Math.PI)
      const planeYZRight = new THREE.Mesh(plane_geometry3, plane_material)
      planeYZRight.position.y += + 0.1 + (hValue/2)
      planeYZRight.position.z += 0.5
      planeYZRight.position.x -= 0.1
      planeYZRight.receiveShadow = true
      planeGroup.add(planeYZRight)

      const plane_geometry4 = new THREE.PlaneGeometry(1,0.2+ hValue)
      plane_geometry4.rotateY(0.5*Math.PI)
      plane_geometry4.rotateY(Math.PI)
      const planeYZLeft = new THREE.Mesh(plane_geometry4, plane_material)
      planeYZLeft.position.y += 0.1 + (hValue/2)
      planeYZLeft.position.z += 0.5
      planeYZLeft.position.x += (x_position+0.6)
      planeYZLeft.receiveShadow = true
      planeGroup.add(planeYZLeft)
      return planeGroup
    }

    updatePlanes(x_position, hValue) {
      this.scene.remove(this.planes)
      this.planes = this.generatePlane(x_position, hValue)
      this.scene.add(this.planes)
    }
    


  
//============================================

  onWindowResize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setSize( this.width, this.height );
    if (this.composer) {
      this.composer.setSize( this.width, this.height );

    }
  }
}