import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//注册 scrolltrigger 
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scene, renderer, camera, model, mixer;
const clock = new THREE.Clock();

function init() {
    // 创建场景
    scene = new THREE.Scene();
    // 确保背景透明
    scene.background = null;
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.set(0, 5, -30); // 设置相机位置
    camera.lookAt(0, 4.5, 0); // 设置相机朝向
    scene.add(camera);


    // 创建渲染器，确保背景透明
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 设置背景透明
    renderer.shadowMap.enabled = true; // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 可选：设置阴影类型  
    document.querySelector('.canvas-container').appendChild(renderer.domElement);

     // 添加环境光
     const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
     scene.add(ambientLight);

     // 添加点光源1
    const pointLight1 = new THREE.PointLight(0xffffff, 0.7, 100,1); // color, intensity, distance
    pointLight1.position.set(13.5, 4, -0.5);
    pointLight1.castShadow = true; // 如果需要阴影
    scene.add(pointLight1);
    pointLight1.shadow.bias = -0.0001
    // 添加点光源2
    const pointLight2 = new THREE.PointLight(0xffffff, 0.7, 100,1); // color, intensity, distance
    pointLight2.position.set(-13.5, 4, -0.5);
    pointLight2.castShadow = true; // 如果需要阴影
    scene.add(pointLight2);
    pointLight2.shadow.bias = -0.0001
    // 添加点光源3
    const pointLight3 = new THREE.PointLight(0xffffff, 0.7, 100,1); // color, intensity, distance
    pointLight3.position.set(0, 3, -2);
    pointLight3.castShadow = true; // 如果需要阴影
    scene.add(pointLight3);
    pointLight3.shadow.bias = -0.0001

    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 15, -10);
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

     const originalMaterials = new Map();

    // 加载模型
    const loader = new GLTFLoader();
    loader.load('./models/duowucai3.gltf', function (gltf) {
        model = gltf.scene;
         // 设置模型及其子物体的阴影属性
         model.traverse(function (node) {
         if (node.isMesh) {
            node.castShadow = true; // 模型投射阴影
            node.receiveShadow = true; // 模型接收阴影

            // 检查并转换材质
         if (!node.material.isMeshStandardMaterial) {
            const newMaterial = new THREE.MeshStandardMaterial({
                map: node.material.map,
                emissive: new THREE.Color(0x000000),
                roughness: node.material.roughness !== undefined ? node.material.roughness : 0.5,
                metalness: node.material.metalness !== undefined ? node.material.metalness : 0,
            });
            node.material = newMaterial;
            console.log(`Converted material of ${node.name} to MeshStandardMaterial`);
           }
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
    });

    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize, false);
    
    // 添加点击事件监听器
    document.getElementById('cameraButton1').addEventListener('click', () => {
        changeCameraPosition(12.6, 2, -0.5, 13, 4, -1, 70);
        toggleButtons(false);
    });

    document.getElementById('cameraButton2').addEventListener('click', () => {
        changeCameraPosition(-12.6, 2, -0.5, -13.5, 4, -1, 70);
        toggleButtons(false);
    });

    document.getElementById('cameraButton3').addEventListener('click', () => {
        changeCameraPosition(0, 2, -0.5, 0, 4, -1, 70);
        toggleButtons(false);
    });
    
    document.getElementById('returnButton').addEventListener('click', () => {
        changeCameraPosition(0, 8, -180, 0, 4.5, 0, 9);
        toggleButtons(true);
    });
}

// scroll trigger
function initScrollAnimations() {

    //section trigger button zindex
    document.querySelectorAll('.section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => bringButtonToFront(section),
          onLeave: () => resetButtonZIndex(section),
          onEnterBack: () => bringButtonToFront(section),
          onLeaveBack: () => resetButtonZIndex(section),
        });
      });

    //trigger触发模型交互
    document.querySelectorAll('.hidden-trigger').forEach((trigger, index) => {
        const textContainer = trigger.nextElementSibling;
        // 假设模型中有一个子物体需要动画
    const object1 = model.getObjectByName('柱头1'); // 使用模型中的实际物体名称
    const object2 = model.getObjectByName('柱头2'); // 使用模型中的实际物体名称
    const object3 = model.getObjectByName('柱头3'); // 使用模型中的实际物体名称
    const object4 = model.getObjectByName('柱头4'); // 使用模型中的实际物体名称
    const object5 = model.getObjectByName('柱头5'); // 使用模型中的实际物体名称
    const object6 = model.getObjectByName('左角'); // 使用模型中的实际物体名称
    const object7 = model.getObjectByName('右角'); // 使用模型中的实际物体名称
    const object8 = model.getObjectByName('柱基'); // 使用模型中的实际物体名称
    const object9 = model.getObjectByName('瓦片'); // 使用模型中的实际物体名称
    const object10 = model.getObjectByName('屋檐'); // 使用模型中的实际物体名称
    const object11 = model.getObjectByName('桁1'); // 使用模型中的实际物体名称
    const object12 = model.getObjectByName('桁2'); // 使用模型中的实际物体名称
    const object13 = model.getObjectByName('桁3'); // 使用模型中的实际物体名称
    const object14 = model.getObjectByName('桁4'); // 使用模型中的实际物体名称
    const object15 = model.getObjectByName('桁5'); // 使用模型中的实际物体名称
    const object16 = model.getObjectByName('桁6'); // 使用模型中的实际物体名称

    //section1 timeline
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger2', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 01 柱基
    tl1.to(object8.position, {
        y: 0,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }); // 同时进行的动画
    
    // 03 柱头2
    tl1.to(object2.position, {
        x: 4.25,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1'); // 同时进行的动画
    // 03 柱头3
    tl1.to(object3.position, {
        x: -4.25,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=2'); // 同时进行的动画

    // 02 camera zoom out
    tl1.to(camera, {
        duration: 3,
        fov: 9,
        onUpdate: () => {
            camera.updateProjectionMatrix();
        },
        ease: 'power1.inOut'
    },'-=1');
    tl1.to(camera.position, {
        duration: 3,
        z: -150,
        onUpdate: () => {
            camera.updateProjectionMatrix();
        },
        ease: 'power1.inOut'
    },'-=3');

    // 04 柱头4
    tl1.to(object4.position, {
        x: 8.5,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=3'); // 同时进行的动画

    // 05 柱头5
    tl1.to(object5.position, {
        x: -8.5,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=3'); // 同时进行的动画
    // 01 zuojiao
    tl1.to(object6.position, {
        x: 13.8,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=3'); // 同时进行的动画
    // 01 youjiao
    tl1.to(object7.position, {
        x: -13.8,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=3'); // 同时进行的动画

     //section2 timeline
     const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger3', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });

    // 01 youjiao
    tl2.to(object11.position, {
        y: 7.14,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=0.5'); // 同时进行的动画
    tl2.to(object12.position, {
        y: 7.5,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1'); // 同时进行的动画
    tl2.to(object13.position, {
        y: 7.17,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1.5'); // 同时进行的动画
    tl2.to(object14.position, {
        y: 7.17,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1'); // 同时进行的动画
    tl2.to(object15.position, {
        y: 7.17,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1'); // 同时进行的动画
    tl2.to(object16.position, {
        y: 7.17,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1.5'); // 同时进行的动画
    tl2.to(camera.position, {
        duration: 1.5,
        y: 8,
        onUpdate: () => {
            camera.updateProjectionMatrix();
        },
        ease: 'power1.inOut'
    },'-=1');

    //section2 timeline
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger4', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 01 youjiao
    tl3.to(object9.position, {
        y: 9.4,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    }); // 同时进行的动画
    // 01 youjiao
    tl3.to(object10.position, {
        y: 10,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1.5'); // 同时进行的动画
    tl3.to(camera.position,{
        z: -180,
        duration:2,
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.updateProjectionMatrix();
        }
    },'-=1.5');

 });
}

// button camera
function changeCameraPosition(x, y, z, lookAtX, lookAtY, lookAtZ, fov) {
    gsap.to(camera.position, {
        duration: 2,
        x: x, // 设置新的x坐标
        y: y, // 设置新的y坐标
        z: z, // 设置新的z坐标
        onUpdate: () => {
            camera.lookAt(lookAtX, lookAtY, lookAtZ); // 更新lookAt坐标
            camera.updateProjectionMatrix();
        },
        ease: 'power1.inOut'
    });
    gsap.to(camera, {
        duration: 2,
        fov: fov, // 更新FOV
        onUpdate: () => {
            camera.updateProjectionMatrix(); // 更新投影矩阵以反映新的FOV值
        },
        ease: 'power1.inOut'
    },'-=1');
}

// togglebuttons
function toggleButtons(show) {
    const cameraButtons = document.querySelectorAll('.camera-button');
    cameraButtons.forEach(button => {
        button.style.display = show ? 'block' : 'none';
    });
    document.getElementById('returnButton').style.display = show ? 'none' : 'block';
}

// bring front and rest card interaction
function bringButtonToFront(section) {
        const buttons= section.querySelectorAll('.button');
        buttons.forEach(button => {
            button.style.zIndex = 10; // 提升 z-index
        });
    }
function resetButtonZIndex(section) {
        const buttons = section.querySelectorAll('.button');
        buttons.forEach(button => {
            button.style.zIndex = -10; // 恢复 z-index
         });
     }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//渲染循环
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}


// 初始化场景
init();
