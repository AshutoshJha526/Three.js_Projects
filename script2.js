import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { emissive } from 'three/tsl';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 0, 800);
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
        //scene.add(ambientLight);

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
        texture.colorSpace = THREE.SRGBColorSpace
        return texture;
    }

    function createMesh(meshTexture) {
        const texture = meshTexture;
        const geometry = new THREE.BoxGeometry(300, 600, 20);
        const material = new THREE.MeshPhysicalMaterial({ side: THREE.DoubleSide, map: texture, sheen: 1, sheenColor: 0xffffff, reflectivity: 1 });
        material.roughness = 1
        material.metalness = 0
        material.clearcoat = 0.3
        material.clearcoatRoughness = 0.25
        material.ior = 0.6
        material.thickness = 10.0
        const mesh = new THREE.Mesh(geometry, material);
        //createEdges(geometry, mesh);
        return mesh;
    }

    function renderMesh(meshTexture) {
        scene.add(createMesh(meshTexture));
    }
    lighting();

    function handleEvent(event) {
        removeObj();
        if (event.key === '1') {
            let image = '/images/code_62_texture.jpg';
            let meshTexture = textureLoader(image);
            renderMesh(meshTexture);
        }
        if (event.key === '2') {
            let image = '/images/code_67_texture.jpeg';
            let meshTexture = textureLoader(image);
            renderMesh(meshTexture);
        }
        if (event.key === '3') {
            let image = '/images/code_40_texture.jpeg';
            let meshTexture = textureLoader(image);
            renderMesh(meshTexture);
        }
        if (event.key === '4') {
            let image = '/images/code_35_texture.avif';
            let meshTexture = textureLoader(image);
            renderMesh(meshTexture);
        }
        if (event.key === '5') {
            let image = '/images/code_26_texture.png';
            let meshTexture = textureLoader(image);
            renderMesh(meshTexture);
        }
    }
    document.addEventListener('keyup', handleEvent);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

function getRectangleHeight() {
    return 100;
}

//Returns the width of the rectangle
function getRectangleWidth() {
    return 50;
}

//Returns the inner Offset of the rectangle
function getInnerOffset() {
    return 5;
}

function getCutWidth() {

}

function getExtrudeWidth() {
    return 700;
}

function getRectangleShape2() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);


    const rectangleHeight = getRectangleHeight(), rectangleWidth = getRectangleWidth(), innerOffset = getInnerOffset();
    let cutpoints = rectangleHeight;
    let steps = rectangleHeight / cutpoints;
    /*const rectangle = new THREE.Shape();
    console.log(rectangleHeight, steps);
    rectangle.moveTo(0, 0);
    rectangle.lineTo(rectangleWidth / 2, 0);
    rectangle.lineTo(rectangleWidth, 0);
    for (let i = 0; i <= rectangleHeight; i += steps) {
        rectangle.lineTo(rectangleWidth, i);
    }
    rectangle.lineTo(rectangleWidth / 2, rectangleHeight);
    rectangle.lineTo(0, rectangleHeight);
    for (let i = rectangleHeight; i >= 0; i -= steps) {
        rectangle.lineTo(0, i);
    }
    rectangle.moveTo(rectangleWidth - innerOffset, innerOffset);
    rectangle.lineTo(rectangleWidth / 2, innerOffset);
    rectangle.lineTo(innerOffset, innerOffset);
    for (let i = innerOffset; i <= rectangleHeight - innerOffset; i += steps) {
        rectangle.lineTo(innerOffset, i);
    }
    rectangle.lineTo(rectangleWidth / 2, rectangleHeight - innerOffset);
    rectangle.lineTo(rectangleWidth - innerOffset, rectangleHeight - innerOffset);
    for (let i = rectangleHeight - innerOffset; i >= innerOffset; i -= steps) {
        rectangle.lineTo(rectangleWidth - innerOffset, i);
    }*/

    const rectangle = new THREE.Shape();
    rectangle.absarc(0, 0, 100, 0, Math.PI * 2, true);

    const extrudeWidth = 1200;
    const line = new THREE.LineCurve3(extrudeWidth, 0, 0);

    let vertex1 = new THREE.Vector3(0, 0, 0);
    let vertex2 = new THREE.Vector3(extrudeWidth, 0, 0);
    const p = new THREE.LineCurve3(vertex1, vertex2);

    const rectangleSettings = {
        bevelEnabled: false,
        extrudePath: p
    };

    const rectangleGeometry = new THREE.ExtrudeGeometry(rectangle, rectangleSettings);
    const rectangleMaterial = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide, wireframe: false });
    const rectangleMesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    //console.log(rectangleMesh.geometry.attributes.position);
    //console.log(rectangleMesh);
    //scene.add(rectangleMesh);

    return rectangleMesh;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    //debugger;

    //return rectangle;
}

function getLineCordinates() {
    const extrudeWidth = getExtrudeWidth();
    const rectangleHeight = getRectangleHeight();

    //First Line Coordinates
    const lineCordinates = {
        startPoint: {
            x: 200, y: -200
        },
        endPoint: {
            x: 400, y: 200
        }
    };

    //Second Line Coordinates
    const lineCordinates1 = {
        startPoint1: {
            x: extrudeWidth, y: -100
        },
        endPoint1: {
            x: extrudeWidth - 400, y: 100
        }
    };
    const arr = [];
    arr.push(lineCordinates, lineCordinates1);
    return arr;
}


function taskSaturdayEvening(lines, mesh) {

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // const origin = new THREE.Vector2(0, 0);
    const extrudeWidth = getExtrudeWidth();
    const line = new THREE.LineCurve3(extrudeWidth, 0, 0);

    const rectangleHeight = getRectangleHeight(), rectangleWidth = getRectangleWidth(), innerOffset = getInnerOffset();

    //Rectangle Shape
    const rectangle = mesh;

    scene.add(rectangle);

    const arr = lines;
    //console.log(arr)

    //First Line Coordinates
    const lineCordinates = arr[0];

    //Second Line Coordinates
    const lineCordinates1 = arr[1];

    //#region Point Manipulation Logic
    //First Line created using First line coordinates
    let lineCurve = new THREE.LineCurve3(new THREE.Vector3(lineCordinates.startPoint.x, lineCordinates.startPoint.y, 0), new THREE.Vector3(lineCordinates.endPoint.x, lineCordinates.endPoint.y, 0));
    let points = lineCurve.getPoints(Math.abs(lineCordinates.endPoint.y - lineCordinates.startPoint.y));
    let reducedPoints = [];
    let flag = 0;
    //Track and track1 are used to track the first point y axis where the line starts 
    let track = -1;

    //Second Line Created using Second Line coordinates
    let lineCurve1 = new THREE.LineCurve3(new THREE.Vector3(lineCordinates1.startPoint1.x, lineCordinates1.startPoint1.y, 0), new THREE.Vector3(lineCordinates1.endPoint1.x, lineCordinates1.endPoint1.y, 0));
    let points1 = lineCurve1.getPoints(Math.abs(lineCordinates1.endPoint1.y - lineCordinates1.startPoint1.y));
    let reducedPoints1 = [];
    let flag1 = 0;
    let track1 = -1;


 const pointsArray=rectangle.geometry.attributes.position;
 for(let i=0;i<points.length;i++)
 {
    for(let j=0;j<pointsArray.count;j++)
    {
        let xCor=pointsArray.getX(j);
        let yCor=pointsArray.getY(j);
        let zCor=pointsArray.getZ(j);
        if(points[i].y===yCor &&  xCor<=600)
        {
           // pointsArray.setX(i, points[i].x)
        }
    }
 }

    rectangle.geometry.attributes.position.needsUpdate = true;
    const edges = new THREE.EdgesGeometry(rectangle.geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: "brown" });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
    mesh.add(edgesMesh);


    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//task3();
taskSaturdayEvening(getLineCordinates(), getRectangleShape2());