import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, mixer;
let actions = [];
let clock = new THREE.Clock();

function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 8);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 创建渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加光源
    const light = new THREE.AmbientLight(0xFBF6ED, 1); // soft white light
    scene.add(light);

    // 加载模型
    const loader = new GLTFLoader();
    loader.load('./scene.gltf', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // 创建动画混合器
        mixer = new THREE.AnimationMixer(model);

        // 获取所有动画剪辑
        const animations = gltf.animations;
        actions = animations.map((clip, index) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true; // 保留在动画结束位置
            action.enabled = true;
            action.paused = true;

            // 设置 ScrollTrigger
            ScrollTrigger.create({
                trigger: document.body,
                start: `top top-=${index * window.innerHeight}`,
                end: `top top-=${(index + 1) * window.innerHeight}`,
                scrub: true,
                onEnter: () => {
                    action.reset().play();
                },
                onEnterBack: () => {
                    action.reset().play();
                },
                onLeave: () => {
                    action.paused = true;
                },
                onLeaveBack: () => {
                    action.paused = true;
                }
            });

            return action;
        });

        animate();
    }, undefined, function (error) {
        console.error('Error loading GLTF model:', error);
    });

    // 添加 OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false; // 禁用缩放功能

    // 禁用 OrbitControls 的滚动响应
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE
    };

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        controls.update(); // 确保OrbitControls在动画循环中被更新
        renderer.render(scene, camera);
    }

    // 初始化场景
    animate();
}

// 初始化场景
init();
