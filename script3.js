import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { emissive } from 'three/tsl';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 0, 30);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
function task3() {


    function removeObj() {
        while (scene.children.length > 3) {
            //console.log(scene.children[0]);
            let child = scene.children[scene.children.length - 1];
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                child.material.dispose();
            }
            scene.remove(child);
        }
    }

    function createEdges(geometry, mesh) {
        const edges = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: "brown" });
        const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
        mesh.add(edgesMesh);
    }

    function lighting() {
        const ambientLight = new THREE.AmbientLight({ color: "white" });
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(0, 0, 100);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
        directionalLight2.position.set(0, 0, -200);
        scene.add(directionalLight2);
    }

    function textureLoader(image) {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(image)
        // texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1 / 40*2, 1 / 20*2);
        //texture.magFilter = THREE.NearestFilter;
        return texture;
    }

    function textureLoader1(image) {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(image)
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.repeat.set(4, 4);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    function createMesh(meshTexture) {
        let width = 40, height = 20;
        const texture = meshTexture;
       // console.log(texture);
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(width, 0);
        shape.lineTo(width, height);
        shape.lineTo(0, height);
        shape.lineTo(0, 0);

        const extrudeSettings = {
            depth: 1,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const material = new THREE.MeshStandardMaterial({
            map: texture,
            wireframe: false
        });
        const mesh = new THREE.Mesh(geometry, material);
        let a = mesh.geometry.attributes.uv;
        let pointsArray=mesh.geometry.attributes.position;

        for (let i = 0; i < a.count; i++) {
        //a.setX(i, i); 
           // a.setY(i, i/90*i);
        }

        mesh.geometry.attributes.uv.needsUpdate = true;
        mesh.position.set(-40, -20, 0);
        scene.add(mesh);

        const geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const material1 = new THREE.MeshStandardMaterial({
            map: texture,
            wireframe: false
        });
        const mesh1 = new THREE.Mesh(geometry1, material1);
        // scene.add(mesh1);
    }

    function renderMesh(meshTexture) {
        createMesh(meshTexture);
    }
    lighting();

    let image = '/images/background-made-from-bricks.jpg';
    let meshTexture = textureLoader(image);
    let meshTexture1 = textureLoader1(image);
    renderMesh(meshTexture);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

task3();