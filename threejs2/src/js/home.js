import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//注册 scrolltrigger 
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scene, renderer, camera, model, mixer, controls;
const clock = new THREE.Clock();


function init() {
    // 创建场景
    scene = new THREE.Scene();
    // 确保背景透明
    scene.background = null;

    // 创建相机
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.set(0, 1.9, 30); // 设置相机位置
    camera.lookAt(0,1.9,0);
    scene.add(camera);

    // 创建渲染器，确保背景透明
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 设置背景透明
    renderer.shadowMap.enabled = true; // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 可选：设置阴影类型  
    document.querySelector('.canvas-container').appendChild(renderer.domElement);


     // 添加环境光
     const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
     scene.add(ambientLight);

     // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(-4, 15, 4);
    directionalLight.castShadow = true;
    // 设置平行光的阴影属性
    directionalLight.shadow.mapSize.width = 1080; // 阴影贴图宽度
    directionalLight.shadow.mapSize.height = 1080; // 阴影贴图高度
    directionalLight.shadow.camera.near = 0.1; // 阴影投射相机的近剪切面
    directionalLight.shadow.camera.far = 100; // 阴影投射相机的远剪切面
    // 设置阴影投射区域
    const d = 50; // 这个值控制投射区域的大小，可以根据需要调整
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    // 可选：设置阴影偏差，减少阴影摩尔纹
    directionalLight.shadow.bias = -0.001
    scene.add(directionalLight);

    // 加载模型
    const loader = new GLTFLoader();
    loader.load('./models/kaitou.gltf', function (gltf) {
        model = gltf.scene;
        // 设置模型及其子物体的阴影属性
        model.traverse(function (node) {
            if (node.isMesh) {
               node.castShadow = true; // 模型投射阴影
               node.receiveShadow = true; // 模型接收阴
            }
           });
             // 确保 GLTF 模型中的灯光投射阴影
         gltf.scene.traverse(function (node) {
          if (node.isLight) {
             node.castShadow = true;if (node.shadow) {
                 node.shadow.bias = -0.001; // 设置阴影偏差
                 node.shadow.mapSize.width = 2048; // 提高阴影贴图分辨率
                 node.shadow.mapSize.height = 2048;
                 node.shadow.camera.near = 0.1; // 调整阴影相机参数
                 node.shadow.camera.far = 100;
             }
            }
          });

        scene.add(model);

        // 初始化动画混合器
        mixer = new THREE.AnimationMixer(model);

        // 初始化 GSAP 和 ScrollTrigger
        initScrollAnimations();

        // 开始渲染循环
        animate();
    }, undefined, function (error) {
        console.error('Error loading GLTF model:', error);
    });

    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize, false);
}

function initAnimations() {
  //section1 timeline
  const tl1 = gsap.timeline();

   // 添加 text-container 的动画到时间线
   tl1.to(camera.position, {
    z:10,
    duration: 1.5,
    ease: 'power1.inOut'
  });

  // 添加 text-container 的动画到时间线
  tl1.to('.text-container-1', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1.5, // 动画持续时间
      ease: 'power1.inOut'
  },'-=1');

}

// 在页面加载时立即触发动画
window.onload = function() {
  initAnimations();
}

function initScrollAnimations() {
   
    document.querySelectorAll('.hidden-trigger').forEach((trigger, index) => {

      //section3 timeline
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.hidden-trigger2', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',

      }
    });
    // 添加 text-container 的动画到时间线
    tl2.to('.text-container-1', {
      opacity: 0, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut',
    });

    //section3 timeline
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.hidden-trigger3', // 使用隐藏的触发器元素
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse',
  
      }
    });
    // 添加 text-container 的动画到时间线
    tl3.to('.text-container-2', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut',
    });

     //section2 timeline
     const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: '.hidden-trigger3', // 使用隐藏的触发器元素
        start: 'top bottom',
        end: 'bottom center',
        toggleActions: 'play none reverse none',
      }
    });
    // 添加 text-container 的动画到时间线
    tl4.to(camera.position, {
      z:8,
      duration: 1,
      ease: 'power1.inOut'
    });

    //section3 timeline
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: '.hidden-trigger4', // 使用隐藏的触发器元素
        start: 'top bottom',
        end: 'bottom center ',
        toggleActions: 'play reverse play reverse',
      }
    });
    // 添加 text-container 的动画到时间线
    tl5.to('.text-container-3', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut',
    });

     //section1 timeline
     const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: '.hidden-trigger4', // 使用隐藏的触发器元素
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: 'play none reverse none',
      }
    });
    // 添加 text-container 的动画到时间线
    tl6.to(camera.position, {
      z: 6,
      duration: 1,
      ease: 'power1.inOut'
    });
});
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    // if (controls) controls.update(); // 确保 controls 已正确初始化
    renderer.render(scene, camera);
}

// 初始化场景
init();
