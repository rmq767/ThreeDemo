<template>
  <div class="three">
    <div class="three-demo" ref="spotLightRef"></div>
  </div>
</template>

<script lang="ts">
export default { name: "SpotLight" };
</script>
<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { onMounted, ref } from "vue";

// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影计算 render.shadowMap.enabled = true;
// 3、设置光照投射阴影 light.castShadow = true;
// 4、设置物体投射阴影 sphere.castShadow = true;
// 4、设置物体接收阴影 plane.receiveShadow = true;

let scene: null | THREE.Scene = null;
let camera: null | THREE.Camera = null;
let renderer: null | THREE.WebGLRenderer = null;
let controls: null | OrbitControls = null;
let sphere: null | THREE.Mesh = null;
let spotLight: null | THREE.SpotLight = null;
const spotLightRef = ref();

/**
 * @description 创建场景、相机、渲染器
 */
const init = () => {
  // 创建场景
  scene = new THREE.Scene();
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 4, 5);
  camera.lookAt(0, 0, 0);
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true }); //抗锯齿
  renderer.shadowMap.enabled = true; // 开启阴影
  renderer.setSize(window.innerWidth, window.innerHeight);
  spotLightRef.value.appendChild(renderer.domElement);

  initControls();

  initAxesHelper();

  initSphere();

  initPlane();

  initSpotLight();

  initGUI();

  renderer.render(scene, camera);

  update();
};
/**
 * @description 初始化控制器
 */
const initControls = () => {
  controls = new OrbitControls(camera!, renderer!.domElement);
};
/**
 * @description 世界坐标辅助器
 */
const initAxesHelper = () => {
  const axesHelper = new THREE.AxesHelper(10);
  scene!.add(axesHelper);
};

const initSphere = () => {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({});
  sphere = new THREE.Mesh(geometry, material);
  // 设置球体的位置
  sphere.position.set(0, 0, 0);
  // 开启投射阴影
  sphere.castShadow = true;
  // 将球体添加到场景中
  scene!.add(sphere);
};

const initPlane = () => {
  const geometry = new THREE.PlaneGeometry(30, 30);
  const material = new THREE.MeshStandardMaterial({});
  const plane = new THREE.Mesh(geometry, material);
  // 设置平面位置
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  // 开启接收阴影
  plane.receiveShadow = true;
  // 将平面添加到场景中
  scene!.add(plane);
};

const initSpotLight = () => {
  // 添加光源
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene!.add(light);
  // 添加聚光灯
  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(5, 5, 5);
  // 开启阴影投射
  spotLight.castShadow = true;
  spotLight.decay = 0; //不设为0 没效果
  // 阴影模糊度
  spotLight.shadow.radius = 20;
  // 阴影贴图分辨率
  spotLight.shadow.mapSize.set(4096, 4096);
  scene!.add(spotLight);
};

const initGUI = () => {
  const gui = new GUI();
  gui.add(sphere!.position, "x").min(-10).max(10).step(0.01).name("x");
  gui
    .add(spotLight!, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01)
    .name("angle");
  gui.add(spotLight!, "distance").min(0).max(20).step(0.01).name("distance");
  gui.add(spotLight!, "penumbra").min(0).max(1).step(0.01).name("penumbra");
  gui.add(spotLight!, "decay").min(0).max(5).step(0.01).name("decay");
};

const update = () => {
  controls!.update();
  renderer!.render(scene!, camera!);
  requestAnimationFrame(update);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.three {
  width: 100%;
  height: 100%;
  position: relative;
  .three-demo {
    width: 100%;
    height: 100%;
  }
}
</style>
