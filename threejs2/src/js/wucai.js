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

    // 创建透视相机
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.set(5, 5, 5); // 设置相机位置
    camera.lookAt(0, 1, 0); // 设置相机朝向
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

     const originalMaterials = new Map();

    // 加载模型
    const loader = new GLTFLoader();
    loader.load('./models/wucai2.gltf', function (gltf) {
        model = gltf.scene;
         // 设置模型及其子物体的阴影属性
         model.traverse(function (node) {
         if (node.isMesh) {
            node.castShadow = true; // 模型投射阴影
            node.receiveShadow = true; // 模型接收阴影
            // 存储原始材质
            originalMaterials.set(node.name, Array.isArray(node.material) ? node.material.map(mat => mat.clone()) : node.material.clone());
        

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

        // 初始化鼠标悬停效果
        initHoverEffects(); 

        // 开始渲染循环
        animate();
    }, undefined, function (error) {
        console.error('Error loading GLTF model:', error);
    });

    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScrollAnimations() {
    // trigger触发 section
    document.querySelectorAll('.section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => bringCardToFront(section),
          onLeave: () => resetCardZIndex(section),
          onEnterBack: () => bringCardToFront(section),
          onLeaveBack: () => resetCardZIndex(section),
        });
      });
    //trigger触发模型交互
    document.querySelectorAll('.hidden-trigger').forEach((trigger, index) => {
        const textContainer = trigger.nextElementSibling;

    // 假设模型中有一个子物体需要动画
    const object1 = model.getObjectByName('柱础'); // 使用模型中的实际物体名称
    const object2 = model.getObjectByName('檐柱'); // 使用模型中的实际物体名称
    const object3 = model.getObjectByName('阑额'); // 使用模型中的实际物体名称
    const object4 = model.getObjectByName('普拍枋'); // 使用模型中的实际物体名称
    const object5 = model.getObjectByName('大斗'); // 使用模型中的实际物体名称
    const object6 = model.getObjectByName('瓜拱1'); // 使用模型中的实际物体名称
    const object7 = model.getObjectByName('带翘头1'); // 使用模型中的实际物体名称
    const object8 = model.getObjectByName('升耳瓜拱1'); // 使用模型中的实际物体名称
    const object9 = model.getObjectByName('瓜拱2'); // 使用模型中的实际物体名称
    const object10 = model.getObjectByName('菊花头'); // 使用模型中的实际物体名称
    const object11 = model.getObjectByName('升耳瓜拱2'); // 使用模型中的实际物体名称
    const object12 = model.getObjectByName('瓜拱3'); // 使用模型中的实际物体名称
    const object13 = model.getObjectByName('蚂蚱头'); // 使用模型中的实际物体名称
    const object14 = model.getObjectByName('正心枋1'); // 使用模型中的实际物体名称
    const object15 = model.getObjectByName('升耳瓜拱3'); // 使用模型中的实际物体名称
    const object16 = model.getObjectByName('瓜拱4'); // 使用模型中的实际物体名称
    const object17 = model.getObjectByName('撑头木'); // 使用模型中的实际物体名称
    const object18 = model.getObjectByName('拽枋2'); // 使用模型中的实际物体名称
    const object19 = model.getObjectByName('升耳瓜拱4'); // 使用模型中的实际物体名称
    const object20 = model.getObjectByName('正心枋3'); // 使用模型中的实际物体名称
    const object21 = model.getObjectByName('井口枋'); // 使用模型中的实际物体名称
    const object22 = model.getObjectByName('正心枋3'); // 使用模型中的实际物体名称
    const object23 = model.getObjectByName('横挽'); // 使用模型中的实际物体名称
    const object24 = model.getObjectByName('挑檐桁'); // 使用模型中的实际物体名称
    const object25 = model.getObjectByName('正心桁'); // 使用模型中的实际物体名称


// section1 timeline
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger1', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 text-container 的动画到时间线
    tl1.to('.text-container-0', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1.5, // 动画持续时间
        ease: 'power1.inOut'
     }); // 在前一个动画结束后延迟0.5秒开始
     
// section2 timeline
    const tl2 = gsap.timeline({
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
    // 添加 object1 的动画到时间线
    tl2.to(object1.position, {
        y: 0.6,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    }); // 同时进行的动画
    // 添加 object2 的动画到时间线
    tl2.to(object2.position, {
        y: 2.5,
        duration: 2,// 动画持续时间
        ease: 'power1.inOut'
    },'-=1'); // 同时进行的动画

// section3 timeline
    const tl3 = gsap.timeline({
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
    // 定义一个对象来保存 lookAt 目标的坐标
   const lookAtTarget = { y: 1 };
     // 添加 camera.position 和 lookAt 的动画到时间线
     tl3.to(camera.position, {
       y: 8,
        duration: 1.5, // 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
       camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
      }
    }); // 0 表示从时间线开始就执行该动画
    tl3.to(lookAtTarget, {
        y: 5,
        duration: 1.5, // 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
        }
    },'-=1.5'); // 

// section4 timeline
    const tl4 = gsap.timeline({
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
    // 添加 object3 的动画到时间线
    tl4.to(object3.position, {
        y: 4.65,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); // 同时进行的动画
    // 添加 object4 的动画到时间线
    tl4.to(object4.position, {
        y: 5,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1'); // 同时进行的动画
    // 添加 object5 的动画到时间线
    tl4.to(object5.position, {
        y: 5.4,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1');// 同时进行的动画

// section5 timeline
    const tl5 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger5', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 text-container 的动画到时间线
    tl5.to('.text-container-1', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1, // 动画持续时间
        ease: 'power1.inOut'
     }); // 在前一个动画结束后延迟0.5秒开始

// section6 timeline
    const tl6 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger6', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    tl6.to(object6.position, {
        y: 5.2,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); // 同时进行的动画
    tl6.to(object7.position, {
        y: 5.35,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1'); // 同时进行的动画
    tl6.to(object8.position, {
        y: 5.4,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1'); // 同时进行的动画

// section7 timeline
    const tl7 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger15', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 text-container 的动画到时间线
     tl7.to('.text-container-3', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1, // 动画持续时间
        ease: 'power1.inOut'
     }, '+=0.5'); // 在前一个动画结束后延迟0.5秒开始
     tl7.to('.text-container-4', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1, // 动画持续时间
        ease: 'power1.inOut'
     }, '-=0.5'); // 在前一个动画结束后延迟0.5秒开始
     tl7.to('.text-container-2', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1, // 动画持续时间
        ease: 'power1.inOut'
     }, '-=0.5'); // 在前一个动画结束后延迟0.5秒开始

// section8-timeline
     const tl8 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger7', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 object6 的动画到时间线
    tl8.to(object9.position, {
        y: 5.5,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); // 同时进行的动画
    // 添加 object7 的动画到时间线
    tl8.to(object10.position, {
        y: 5.75,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画
    // 添加 object8 的动画到时间线
    tl8.to(object11.position, {
        y: 5.7,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section9 timeline
    const tl9 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger16', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl9.to('.text-container-5', {
    opacity: 1, // 设置透明度为1，显示文本
    duration: 1, // 动画持续时间
    ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl9.to('.text-container-6', {
    opacity: 1, // 设置透明度为1，显示文本
    duration: 1, // 动画持续时间
    ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始
    tl9.to('.text-container-7', {
    opacity: 1, // 设置透明度为1，显示文本
    duration: 1, // 动画持续时间
    ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始
    tl9.to('.text-container-8', {
    opacity: 1, // 设置透明度为1，显示文本
    duration: 1, // 动画持续时间
    ease: 'power1.inOut'
    }, '-=1'); // 在前一个动画结束后延迟0.5秒开始

// section10 timeline
    const tl10 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger8', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 object6 的动画到时间线
    tl10.to(object12.position, {
        y: 5.89,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); // 同时进行的动画
    // 添加 object8 的动画到时间线
    tl10.to(object14.position, {
        y: 5.9,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画
    // 添加 object13 的动画到时间线
    tl10.to(object13.position, {
        y: 6.05,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section11 timeline
   const tl11 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger17', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl11.to('.text-container-9', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl11.to('.text-container-10', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始

// section12 timeline
    const tl12 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger9', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
     // 添加 camera.position 和 lookAt 的动画到时间线
    tl12.to(camera.position, {
        x: 7,
        y: 9,
        z: 7,
    duration: 1.5, // 动画持续时间
    ease: 'power1.inOut',
    onUpdate: () => {
        camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
    }
    }); // 0 表示从时间线开始就执行该动画
    tl12.to(lookAtTarget, {
    y: 6,
    duration: 1.5, // 动画持续时间
    ease: 'power1.inOut',
    onUpdate: () => {
        camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
    }
    }, "-=1.5"); // 0 表示从时间线开始就执行该动画
    // 添加 object14 的动画到时间线
    tl12.to(object15.position, {
        y: 6,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section13 timeline
    const tl13 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger18', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl13.to('.text-container-11', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl13.to('.text-container-12', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始

// section14 timeline
    const tl14 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger10', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    // 添加 object6 的动画到时间线
    tl14.to(object16.position, {
        y: 6.16,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); // 同时进行的动画
    // 添加 object13 的动画到时间线
    tl14.to(object18.position, {
        y: 6.2,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画
    // 添加 object8 的动画到时间线
    tl14.to(object17.position, {
        y: 6.34,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section15 timeline
    const tl15 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger19', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl15.to('.text-container-13', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl15.to('.text-container-14', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始
    tl15.to('.text-container-15', {
        opacity: 1, // 设置透明度为1，显示文本
        duration: 1, // 动画持续时间
        ease: 'power1.inOut'
      }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始

// section16 timeline
    const tl16 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger11', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    tl16.to(object19.position, {
        y: 6.35,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    }); 
    tl16.to(object21.position, {
        y: 6.55,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section17 timeline
const tl17 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger20', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl17.to('.text-container-16', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl17.to('.text-container-17', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始

// section18 timeline
    const tl18 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger12', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    tl18.to(camera.position, {
        z: -7,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
        }
    }); 
    tl18.to(object23.position, {
        y: 6.7,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1'); // 同时进行的动画
    tl18.to(object20.position, {
        y: 6.55,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画

// section19 timeline
const tl19 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger21', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl19.to('.text-container-18', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始
    tl19.to('.text-container-19', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }, '-=0.6'); // 在前一个动画结束后延迟0.5秒开始

// section20 timeline
    const tl20 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger13', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    tl20.to(camera.position, {
        x: -7,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
        }
    }); 
    tl20.to(object24.position, {
        y: 6.65,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=1'); // 同时进行的动画
    tl20.to(object25.position, {
        y: 7,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
    },'-=0.5'); // 同时进行的动画


// section21 timeline
const tl21 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hidden-trigger22', // 使用隐藏的触发器元素
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse',
        onUpdate: () => {
            renderer.render(scene, camera);
        }
       }
    });
    // 添加 text-container 的动画到时间线
    tl21.to('.text-container-20', {
      opacity: 1, // 设置透明度为1，显示文本
      duration: 1, // 动画持续时间
      ease: 'power1.inOut'
    }); // 在前一个动画结束后延迟0.5秒开始

// section22 timeline
    const tl22 = gsap.timeline({
        scrollTrigger: {
            trigger: '.hidden-trigger14', // 使用隐藏的触发器元素
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            onUpdate: () => {
                renderer.render(scene, camera);
            }
        }
    });
    tl22.to(camera.position, {
        x: -13,
        z: -13,
        y: 11,
        duration: 1.5,// 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
        }
    }); 
    tl22.to(lookAtTarget, {
        y: 3.4,
        duration: 1.5, // 动画持续时间
        ease: 'power1.inOut',
        onUpdate: () => {
            camera.lookAt(new THREE.Vector3(0, lookAtTarget.y, 0));
        }
    }, "-=1.5"); // 
 });
}

// bring front and rest card interaction
function bringCardToFront(section) {
    const cards = section.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.zIndex = 10; // 提升 z-index
  });
}

function resetCardZIndex(section) {
  const cards = section.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.zIndex = -10; // 恢复 z-index
  });
}

function initHoverEffects() {

    //text-1
    document.querySelectorAll('.text-container-1').forEach((container) => {
    
     // 假设模型中有一个子物体需要动画
    const object5 = model.getObjectByName('大斗'); // 使用模型中的实际物体名称

        container.addEventListener('mouseenter', () => {
            console.log('Mouse enter on text container');
             // 创建一个新的材质实例
            const newMaterial = object5.material.clone();
            newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
            object5.material = newMaterial;
            console.log('Changed emissive to red and increased intensity');
        });

        container.addEventListener('mouseleave', () => {
            console.log('Mouse leave on text container');
            // 恢复对象自发光颜色
            if (object5 && object5.material) {
                object5.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                console.log('Changed emissive to red and increased intensity');
            } else {
                console.error('Object5 or its material emissive is not accessible on mouse leave');
            }
        });
    });

    //text-2
    document.querySelectorAll('.text-container-2').forEach((container) => {
    
        const object1 = model.getObjectByName('立方体056'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体056_1');
        const object3 = model.getObjectByName('立方体056_2');
        const object4 = model.getObjectByName('立方体056_3');
   
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               object3.material = newMaterial;
               object4.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   object3.material.emissive.set(0x000000);
                   object4.material.emissive.set(0x000000);
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });
   
       //text-3
    document.querySelectorAll('.text-container-3').forEach((container) => {
    
        const object6 = model.getObjectByName('瓜拱1'); // 使用模型中的实际物体名称
   
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object6.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object6.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object6 && object6.material) {
                   object6.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-4
    document.querySelectorAll('.text-container-4').forEach((container) => {

        const object6 = model.getObjectByName('带翘头1'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object6.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object6.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object6 && object6.material) {
                   object6.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-5
    document.querySelectorAll('.text-container-5').forEach((container) => {

        const object1 = model.getObjectByName('立方体049'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体04_1'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

        //text-6
    document.querySelectorAll('.text-container-6').forEach((container) => {

        const object1 = model.getObjectByName('菊花头'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

        //text-7
    document.querySelectorAll('.text-container-7').forEach((container) => {

        const object1 = model.getObjectByName('立方体065'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体065_2');
        const object3 = model.getObjectByName('立方体065_3');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               object3.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   object3.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

        //text-8
    document.querySelectorAll('.text-container-8').forEach((container) => {

        const object1 = model.getObjectByName('立方体065_1'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体065_4');
        const object3 = model.getObjectByName('立方体065_5');
        const object4 = model.getObjectByName('立方体065_6');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               object3.material = newMaterial;
               object4.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   object3.material.emissive.set(0x000000);
                   object4.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-9
    document.querySelectorAll('.text-container-9').forEach((container) => {

        const object1 = model.getObjectByName('立方体069'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体069_1');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

      //text-10
      document.querySelectorAll('.text-container-10').forEach((container) => {

        const object1 = model.getObjectByName('蚂蚱头'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-11
      document.querySelectorAll('.text-container-11').forEach((container) => {

        const object1 = model.getObjectByName('立方体074_1'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-12
      document.querySelectorAll('.text-container-12').forEach((container) => {

        const object1 = model.getObjectByName('立方体074'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体074_2');
        const object3 = model.getObjectByName('立方体074_3');
        const object4 = model.getObjectByName('立方体074_4');
        const object5 = model.getObjectByName('立方体074_5');
        const object6 = model.getObjectByName('立方体074_6');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               object3.material = newMaterial;
               object4.material = newMaterial;
               object5.material = newMaterial;
               object6.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   object3.material.emissive.set(0x000000);
                   object4.material.emissive.set(0x000000);
                   object5.material.emissive.set(0x000000);
                   object6.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-13
      document.querySelectorAll('.text-container-13').forEach((container) => {

        const object1 = model.getObjectByName('瓜拱4'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-14
      document.querySelectorAll('.text-container-14').forEach((container) => {

        const object1 = model.getObjectByName('拽枋2'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-15
      document.querySelectorAll('.text-container-15').forEach((container) => {

        const object1 = model.getObjectByName('撑头木'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-16
      document.querySelectorAll('.text-container-16').forEach((container) => {

        const object1 = model.getObjectByName('立方体080'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('立方体080_1');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-17
      document.querySelectorAll('.text-container-17').forEach((container) => {

        const object1 = model.getObjectByName('井口枋'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-18
      document.querySelectorAll('.text-container-18').forEach((container) => {

        const object1 = model.getObjectByName('横挽'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-19
      document.querySelectorAll('.text-container-19').forEach((container) => {

        const object1 = model.getObjectByName('正心枋3'); // 使用模型中的实际物体名称
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });

       //text-20
      document.querySelectorAll('.text-container-20').forEach((container) => {

        const object1 = model.getObjectByName('正心桁'); // 使用模型中的实际物体名称
        const object2 = model.getObjectByName('挑檐桁');
           container.addEventListener('mouseenter', () => {
               console.log('Mouse enter on text container');
                // 创建一个新的材质实例
               const newMaterial = object1.material.clone();
               newMaterial.emissive.set(0x8b0000); // 设置自发光颜色为红色
               newMaterial.emissiveIntensity = 0.8; // 设置自发光强度
               object1.material = newMaterial;
               object2.material = newMaterial;
               console.log('Changed emissive to red and increased intensity');
           });
   
           container.addEventListener('mouseleave', () => {
               console.log('Mouse leave on text container');
               // 恢复对象自发光颜色
               if (object1 && object1.material) {
                   object1.material.emissive.set(0x000000); // 恢复原始的自发光颜色
                   object2.material.emissive.set(0x000000);
                   console.log('Changed emissive to red and increased intensity');
               } else {
                   console.error('Object5 or its material emissive is not accessible on mouse leave');
               }
           });
       });
}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}


// 初始化场景
init();
