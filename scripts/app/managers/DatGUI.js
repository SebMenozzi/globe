import config from '../../config';

// Manages all dat.GUI interactions
export default class DatGUI {
  constructor(main, mesh) {
    const gui = new dat.GUI();

    this.camera = main.camera.threeCamera;
    this.controls = main.controls.threeControls;
    this.light = main.light;

    /* Global */
    //gui.close();

    /* Camera */
    const cameraFolder = gui.addFolder('Camera');
    const cameraFOVGui = cameraFolder.add(config.camera, 'fov', 0, 180).name('Camera FOV');
    cameraFOVGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.camera.fov = value;
    });
    cameraFOVGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();

      this.controls.enableRotate = true;
    });
    const cameraAspectGui = cameraFolder.add(config.camera, 'aspect', 0, 4).name('Camera Aspect');
    cameraAspectGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.camera.aspect = value;
    });
    cameraAspectGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();

      this.controls.enableRotate = true;
    });
    const cameraFogColorGui = cameraFolder.addColor(config.fog, 'color').name('Fog Color');
    cameraFogColorGui.onChange((value) => {
      main.scene.fog.color.setHex(value);
    });
    const cameraFogNearGui = cameraFolder.add(config.fog, 'near', 0.000, 0.010).name('Fog Near');
    cameraFogNearGui.onChange((value) => {
      this.controls.enableRotate = false;

      main.scene.fog.density = value;
    });
    cameraFogNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });


    /* Controls */
    const controlsFolder = gui.addFolder('Controls');
    controlsFolder.add(config.controls, 'autoRotate').name('Auto Rotate').onChange((value) => {
      this.controls.autoRotate = value;
    });
    const controlsAutoRotateSpeedGui = controlsFolder.add(config.controls, 'autoRotateSpeed', -1, 1).name('Rotation Speed');
    controlsAutoRotateSpeedGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.controls.autoRotateSpeed = value;
    });
    controlsAutoRotateSpeedGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });


    /* Mesh */
    const meshFolder = gui.addFolder('Mesh');
    meshFolder.add(config.mesh, 'translucent', true).name('Translucent').onChange((value) => {
      if(value) {
        mesh.material.transparent = true;
        mesh.material.opacity = 0.5;
      } else {
        mesh.material.opacity = 1.0;
      }
    });
    meshFolder.add(config.mesh, 'wireframe', true).name('Wireframe').onChange((value) => {
      mesh.material.wireframe = value;
    });


    /* Lights */
    // Ambient Light
    const ambientLightFolder = gui.addFolder('Ambient Light');
    ambientLightFolder.add(config.ambientLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.ambientLight.visible = value;
    });
    ambientLightFolder.addColor(config.ambientLight, 'color').name('Color').onChange((value) => {
      this.light.ambientLight.color.setHex(value);
    });


    // Directional Light
    const directionalLightFolder = gui.addFolder('Directional Light');
    directionalLightFolder.add(config.directionalLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.directionalLight.visible = value;
    });
    directionalLightFolder.addColor(config.directionalLight, 'color').name('Color').onChange((value) => {
      this.light.directionalLight.color.setHex(value);
    });
    const directionalLightIntensityGui = directionalLightFolder.add(config.directionalLight, 'intensity', 0, 2).name('Intensity');
    directionalLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.intensity = value;
    });
    directionalLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionXGui = directionalLightFolder.add(config.directionalLight, 'x', -1000, 1000).name('Position X');
    directionalLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.x = value;
    });
    directionalLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionYGui = directionalLightFolder.add(config.directionalLight, 'y', -1000, 1000).name('Position Y');
    directionalLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.y = value;
    });
    directionalLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionZGui = directionalLightFolder.add(config.directionalLight, 'z', -1000, 1000).name('Position Z');
    directionalLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.z = value;
    });
    directionalLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    // Shadow Map
    const shadowFolder = gui.addFolder('Shadow Map');
    shadowFolder.add(config.shadow, 'enabled').name('Enabled').onChange((value) => {
      this.light.directionalLight.castShadow = value;
    });
    shadowFolder.add(config.shadow, 'helperEnabled').name('Helper Enabled').onChange((value) => {
      this.light.directionalLightHelper.visible = value;
    });
    const shadowNearGui = shadowFolder.add(config.shadow, 'near', 0, 400).name('Near');
    shadowNearGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.near = value;
    });
    shadowNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowFarGui = shadowFolder.add(config.shadow, 'far', 0, 1200).name('Far');
    shadowFarGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.far = value;
    });
    shadowFarGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowTopGui = shadowFolder.add(config.shadow, 'top', -400, 400).name('Top');
    shadowTopGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.top = value;
    });
    shadowTopGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowRightGui = shadowFolder.add(config.shadow, 'right', -400, 400).name('Right');
    shadowRightGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.right = value;
    });
    shadowRightGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBottomGui = shadowFolder.add(config.shadow, 'bottom', -400, 400).name('Bottom');
    shadowBottomGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.bottom = value;
    });
    shadowBottomGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowLeftGui = shadowFolder.add(config.shadow, 'left', -400, 400).name('Left');
    shadowLeftGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.left = value;
    });
    shadowLeftGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBiasGui = shadowFolder.add(config.shadow, 'bias', -0.000010, 1).name('Bias');
    shadowBiasGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.bias = value;
    });
    shadowBiasGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });


    // Point Light
    const pointLightFolder = gui.addFolder('Point Light');
    pointLightFolder.add(config.pointLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.pointLight.visible = value;
    });
    pointLightFolder.addColor(config.pointLight, 'color').name('Color').onChange((value) => {
      this.light.pointLight.color.setHex(value);
    });
    const pointLightIntensityGui = pointLightFolder.add(config.pointLight, 'intensity', 0, 2).name('Intensity');
    pointLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.intensity = value;
    });
    pointLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightDistanceGui = pointLightFolder.add(config.pointLight, 'distance', 0, 1000).name('Distance');
    pointLightDistanceGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.distance = value;
    });
    pointLightDistanceGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionXGui = pointLightFolder.add(config.pointLight, 'x', -1000, 1000).name('Position X');
    pointLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.x = value;
    });
    pointLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionYGui = pointLightFolder.add(config.pointLight, 'y', -1000, 1000).name('Position Y');
    pointLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.y = value;
    });
    pointLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionZGui = pointLightFolder.add(config.pointLight, 'z', -1000, 1000).name('Position Z');
    pointLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.z = value;
    });
    pointLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });


    // Hemi Light
    const hemiLightFolder = gui.addFolder('Hemi Light');
    hemiLightFolder.add(config.hemiLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.hemiLight.visible = value;
    });
    hemiLightFolder.addColor(config.hemiLight, 'color').name('Color').onChange((value) => {
      this.light.hemiLight.color.setHex(value);
    });
    hemiLightFolder.addColor(config.hemiLight, 'groundColor').name('ground Color').onChange((value) => {
      this.light.hemiLight.groundColor.setHex(value);
    });
    const hemiLightIntensityGui = hemiLightFolder.add(config.hemiLight, 'intensity', 0, 2).name('Intensity');
    hemiLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.intensity = value;
    });
    hemiLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionXGui = hemiLightFolder.add(config.hemiLight, 'x', -1000, 1000).name('Position X');
    hemiLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.x = value;
    });
    hemiLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionYGui = hemiLightFolder.add(config.hemiLight, 'y', -500, 1000).name('Position Y');
    hemiLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.y = value;
    });
    hemiLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionZGui = hemiLightFolder.add(config.hemiLight, 'z', -1000, 1000).name('Position Z');
    hemiLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.z = value;
    });
    hemiLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
  }
}