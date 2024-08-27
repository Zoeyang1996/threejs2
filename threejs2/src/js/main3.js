import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.set(0, 8, 330); // 设置相机位置
    scene.add(camera);

    // 创建渲染器，确保背景透明
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 设置背景透明
    renderer.shadowMap.enabled = true; // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 可选：设置阴影类型  
    document.querySelector('.canvas-container').appendChild(renderer.domElement);

    // 创建 OrbitControls
       const controls = new OrbitControls( camera, renderer.domElement );
       controls.enableDamping = true; // 启用阻尼（惯性）
       controls.dampingFactor = 0.5; // 阻尼系数
       controls.screenSpacePanning = false; // 禁用屏幕空间平移
       controls.maxPolarAngle = Math.PI / 2; // 最大俯视角
       controls.enableZoom = false;

       controls.target.set(0, 8, 0); // 设置目标点为 y = 9，与相机初始位置对应
       controls.update(); // 确保控件正确初始化

       // 禁用 OrbitControls 中的滚轮事件
       controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        RIGHT: THREE.MOUSE.ROTATE
    };
    

     // 添加环境光
     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
     scene.add(ambientLight);

     // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-20, 15, 20);
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
    loader.load('./models/foguangsi.gltf', function (gltf) {
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
               node.castShadow = true; }
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

function initScrollAnimations() {
    // 假设模型中有一个子物体需要动画
    const object1 = model.getObjectByName('屋檐'); // 使用模型中的实际物体名称
    const object2 = model.getObjectByName('桁'); // 使用模型中的实际物体名称
    const object3 = model.getObjectByName('框架2'); // 使用模型中的实际物体名称
    const object4 = model.getObjectByName('斗拱'); // 使用模型中的实际物体名称

     
    // 创建 第一个 时间线
    const tl1 = gsap.timeline({
        scrollTrigger: { 
            trigger: '.hidden-trigger2', // 使用隐藏的触发器元素
            start: "top center",
            end: "bottom center",
            toggleActions: 'play none reverse none', // 触发时播放动画，反向滚动时反向播放
            onUpdate: () => {
                console.log("Updating controls and rendering scene...");
                if (controls) controls.update(); // 更新 OrbitControls
                renderer.render(scene, camera);
            },
        }
    });

     // 添加 object1 的动画到时间线
     tl1.to(object1.position, {
        y: 20,
        duration: 1.5, // 动画持续时间
        ease: 'power1.inOut'
    }); // 同时进行的动画

     // 创建 第二个 时间线
     const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger3', // 使用隐藏的触发器元素
            start: "top center",
            end: "bottom center",
            toggleActions: 'play none reverse none', // 触发时播放动画，反向滚动时反向播放
            onUpdate: () => {
                console.log("Updating controls and rendering scene...");
                if (controls) controls.update();  // 更新 OrbitControls
                renderer.render(scene, camera);
            },
        }
    });

     // 添加 object1 的动画到时间线
     tl2.to(object1.position, {
        y: 30,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }); // 同时进行的动画

     // 添加 object1 的动画到时间线
     tl2.to(object2.position, {
        y: 20,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }, '-=1'); // 同时进行的动画

    // 创建 第三个 时间线
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger4', // 使用隐藏的触发器元素
            start: "top center",
            end: "bottom center",
            toggleActions: 'play none reverse none',// 触发时播放动画，反向滚动时反向播放
            onUpdate: () => {
                console.log("Updating controls and rendering scene...");
                if (controls) controls.update(); // 更新 OrbitControls
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 object1 的动画到时间线
    tl3.to(object2.position, {
        y: 23,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }); 
    // 添加 object1 的动画到时间线
    tl3.to(object3.position, {
        y: 13,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }, '-=1'); 
    // 添加 object1 的动画到时间线
    tl3.to(object4.position, {
        y: 9,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }, '-=1'); 

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
    if (controls) controls.update(); // 确保 controls 已正确初始化
    renderer.render(scene, camera);
}

// 初始化场景
init();
