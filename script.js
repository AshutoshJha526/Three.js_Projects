import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { emissive, materialLightMap, or } from 'three/tsl';
//import BufferGeometryUtils from "https://cdn.jsdelivr.net/npm/three@0.125.2/examples/jsm/utils/BufferGeometryUtils.js";

//#region  Task2
function task2() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 80, 5);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    function helper(light) {
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.top = 60;
        light.shadow.camera.bottom = -60;
        light.shadow.camera.left = -60;
        light.shadow.camera.right = 60;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 1000;
    }

    //For Directional Light and Ambient Light
    function lig1(param1) {
        let light;
        if (param1 === "AmbientLight")
            light = new THREE.AmbientLight(0xffffff, 5);
        else light = new THREE.DirectionalLight(0xffffff, 5);
        //const light = new param1(0xffffff, 5);
        light.position.set(-25, 40, 0);
        if (light.isDirectionalLight) {
            helper(light);
        }
        return light;
    }

    function getMesh(param2, param1) {
        if (param2 === "PlaneGeometry") {
            const geometry = new THREE.PlaneGeometry(10, 10);
            const material = new param1({ color: 0x808080, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.set(0, 0, 0);
            plane.rotation.set(-Math.PI / 2, 0, 0);
            plane.scale.set(10, 10, 1);
            plane.receiveShadow = true;
            return plane;
            //scene.add(plane);
        }
        if (param2 === "BoxGeometry") {
            const geometry1 = new THREE.BoxGeometry(10, 10, 10);
            const material1 = new param1({ color: 'red', side: THREE.DoubleSide, emissive: "red" });
            const cube1 = new THREE.Mesh(geometry1, material1);
            cube1.position.set(0, 13, 0);
            cube1.castShadow = true;
            cube1.receiveShadow = true;
            //scene.add(cube1);
            return cube1;
        }
        if (param2 === "CapsuleGeometry") {
            const geometry2 = new THREE.CapsuleGeometry(5, 10, 32, 32);
            const material1 = new param1({ color: 'red', side: THREE.DoubleSide, emissive: "red" });
            const cube2 = new THREE.Mesh(geometry2, material1);
            cube2.position.set(27, 13, 0);
            cube2.castShadow = true;
            cube2.receiveShadow = true;
            //scene.add(cube2);
            return cube2;
        }
        if (param2 === "CylinderGeometry") {
            const material1 = new param1({ color: 'red', side: THREE.DoubleSide, emissive: "red" });
            const geometry3 = new THREE.CylinderGeometry(5, 5, 10, 32);
            const cube3 = new THREE.Mesh(geometry3, material1);
            cube3.position.set(-27, 13, 0);
            cube3.castShadow = true;
            cube3.receiveShadow = true;
            //scene.add(cube3);
            return cube3;
        }
    }

    //For Plane and Cube with variable material
    function obj(param1) {
        scene.add(getMesh("PlaneGeometry", param1));
        scene.add(getMesh("BoxGeometry", param1));
        scene.add(getMesh("CapsuleGeometry", param1));
        scene.add(getMesh("CylinderGeometry", param1));

        //#region creating plane and cubes
        /*const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new param1({ color: 0x808080, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        plane.scale.set(10, 10, 1);
        plane.receiveShadow = true;
        scene.add(plane);

        const geometry1 = new THREE.BoxGeometry(10, 10, 10);
        const material1 = new param1({ color: 'red', side: THREE.DoubleSide, emissive: "red" });
        const cube1 = new THREE.Mesh(geometry1, material1);
        cube1.position.set(0, 13, 0);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        scene.add(cube1);

        const geometry2 = new THREE.CapsuleGeometry(5, 10, 32, 32);
        const cube2 = new THREE.Mesh(geometry2, material1);
        cube2.position.set(27, 13, 0);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        scene.add(cube2);

        const geometry3 = new THREE.CylinderGeometry(5, 5, 10, 32);
        const cube3 = new THREE.Mesh(geometry3, material1);
        cube3.position.set(-27, 13, 0);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        scene.add(cube3);*/
    }

    //For Spot Light and Point Light
    function lig2(param1) {
        let light;
        if (param1 === "SpotLight")
            light = new THREE.SpotLight(0xffffff, 5, 400);
        else light = new THREE.PointLight(0xffffff, 5, 400);
        light.position.set(3, 50, 10);
        light.decay = 0.1;
        light.castShadow = true;

        helper(light);
        return light;
    }

    function getLight(str) {
        if (str === "AmbientLight" || str === "DirectionalLight") return lig1(str);
        else if (str === "PointLight" || str === "SpotLight") return lig2(str);
    }

    //lig1(THREE.AmbientLight);
    //obj(THREE.MeshStandardMaterial);

    function removeObj() {
        while (scene.children.length > 0) {
            let child = scene.children[0];
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                child.material.dispose();
            }
            scene.remove(child);
        }
    }

    function eventHandler(event) {
        removeObj();
        if (event.key === "1") {
            scene.add(getLight("AmbientLight"));
            //lig1(THREE.AmbientLight);
            obj(THREE.MeshBasicMaterial);
        }
        else if (event.key === "2") {
            scene.add(getLight("PointLight"));
            //lig2(THREE.PointLight);
            obj(THREE.MeshStandardMaterial);
        }
        else if (event.key === "3") {
            scene.add(getLight("DirectionalLight"));
            //lig1(THREE.DirectionalLight);
            obj(THREE.MeshStandardMaterial);
        }
        else if (event.key === "4") {
            scene.add(getLight("SpotLight"));
            //lig2(THREE.SpotLight);
            obj(THREE.MeshPhongMaterial);
        }
        else if (event.key === "5") {
            scene.add(getLight("PointLight"));
            //lig2(THREE.PointLight);
            obj(THREE.MeshPhongMaterial);
        }
        else if (event.key === "6") {
            scene.add(getLight("AmbientLight"));
            //lig1(THREE.AmbientLight);
            obj(THREE.MeshPhongMaterial);
        }
        else if (event.key === "7") {
            scene.add(getLight("AmbientLight"));
            //lig1(THREE.AmbientLight);
            obj(THREE.MeshPhysicalMaterial);
        }
        else if (event.key === "8") {
            scene.add(getLight("DirectionalLight"));
            //lig1(THREE.DirectionalLight);
            obj(THREE.MeshPhysicalMaterial);
        }
        else if (event.key === "9") {
            scene.add(getLight("PointLight"));
            //lig2(THREE.PointLight);
            obj(THREE.MeshPhysicalMaterial);
        }
    }

    document.addEventListener("keyup", eventHandler);

    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region Task3
function task3() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, -3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    /*const geometry = new THREE.PlaneGeometry(1,1);
    const material=new THREE.MeshBasicMaterial({color:"red", side: THREE.DoubleSide});
    const plane=new THREE.Mesh(geometry, material);
    plane.rotation.set(-Math.PI/2,0,0);
    plane.scale.set(1,1,1);
    plane.position.set(0,0,0);
    scene.add(plane);*/

    const length = 0.6, height = 1.2;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, height);
    shape.lineTo(length, height);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    // Create a single circular hole
    const holeRadius = 0.02;
    let arrX = [0.125, 0.25, 0.375];
    let arrY = [0.1, 0.2];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            const hole = new THREE.Path();
            let corX = (length / 4) * (i + 1);
            let corY = (height / 3) * (j + 1);
            hole.absarc(corX, corY, holeRadius, 0, Math.PI * 2, false);
            shape.holes.push(hole);
        }
    }

    const extrudeSettings = {
        depth: 0.001,
        bevelEnabled: false
    };
    const geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material1 = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });
    const rect = new THREE.Mesh(geometry1, material1);
    scene.add(rect);
    rect.position.set(0, 0, 0);
    rect.rotation.y = Math.PI / 36;
    //rect.rotation.z=Math.PI/36;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}


//#region task4
function task4() {
    const scene = new THREE.Scene();
    let aspect = window.innerWidth / Window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    //const camera = new THREE.OrthographicCamera(-400*aspect, 400*aspect,400,-400, 0.1, 3000);
    camera.position.set(0, 0, 900);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);


    let origin = new THREE.Vector2(0, 0);
    /*function createShape(width, height) {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, height);
        shape.lineTo(width, height);
        shape.lineTo(width, 0);
        shape.lineTo(0, 0);
        //const geometry=new THREE.ShapeGeometry(shape);
        return shape;
    }

    function helper(width, ax) {
        let line;
        if (ax === "X") {
            line = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(width, width, 0));
        }
        else if (ax === "Y") {
            line = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, width, 0));
        }
        else line = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, width));
        const extrudeSettings = {
            bevelEnabled: false,
            extrudePath: line
        };
        const shape = createShape(40, 40);
        const s = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide });
        const m = new THREE.Mesh(s, material);
        return m;
    }
    scene.add(helper(100,"X"));*/
    let width = 100, height = 100;

    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + origin.x, -height / 2 + origin.y);
    shape.lineTo(origin.x, -height / 2 + origin.y);
    shape.lineTo(origin.x, -height + origin.y);
    shape.lineTo(width / 4 + origin.x, -height + origin.y);
    shape.lineTo(width / 4 + origin.x, -height / 2 + origin.y);
    shape.lineTo(width / 2 + origin.x, -height / 2 + origin.y);
    shape.lineTo(width / 2 + origin.x, origin.y);
    shape.lineTo(width + origin.x, origin.y);
    shape.lineTo(width + origin.x, height / 4 + origin.y);
    shape.lineTo(width / 2 + origin.x, height / 4 + origin.y);
    shape.lineTo(width / 2 + origin.x, height / 2 + origin.y);
    shape.lineTo(origin.x, height / 2 + origin.y);
    shape.lineTo(origin.x, height + origin.y);
    shape.lineTo(origin.x - width / 4, origin.y + height);
    shape.lineTo(origin.x - width / 4, origin.y + height / 2);
    shape.lineTo(-width / 2 + origin.x, height / 2 + origin.y);
    shape.lineTo(-width / 2 + origin.x, origin.y);
    shape.lineTo(-width + origin.x, origin.y);
    shape.lineTo(-width + origin.x, origin.y - height / 4);
    shape.lineTo(-width / 2 + origin.x, origin.y - height / 4)
    shape.lineTo(-width / 2 + origin.x, -height / 2 + origin.y);

    /*const circleShape=new THREE.Shape();
    circleShape.moveTo(100,0);
    circleShape.absarc(0,0,100,0,Math.PI*2,false);
    const Cirgeometry=new THREE.ShapeGeometry(circleShape);
    const cirMaterial=new THREE.MeshBasicMaterial({color: "green", side: THREE.DoubleSide});
    const circle=new THREE.Mesh(Cirgeometry,cirMaterial);
    circle.position.set(0,0,0);
    //scene.add(circle);
    */

    //how to know about origin
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);


    //Degree to radian
    function getTan(height) {
        const degree = 60;
        const degRad = THREE.MathUtils.degToRad(degree);
        let val = height * (Math.tan(degRad));
        return val;
    }
    //CatmullRom Curve
    /*const pathPoints = [
        new THREE.Vector3(origin.x, origin.y, 0),
        new THREE.Vector3(origin.x + val, origin.y + 100, 0),
        new THREE.Vector3(origin.x + 100, origin.y, 0),
        new THREE.Vector3(origin.x + 900, origin.y, 0),
        new THREE.Vector3(origin.x + (1000-val), origin.y + 100, 0),
        new THREE.Vector3(origin.x + 1000, origin.y, 0)
    ];*/

    let extrudeWidth = 1000;
    let vertex1 = new THREE.Vector3(0, 0, 0);
    let vertex2 = new THREE.Vector3(extrudeWidth, 0, 0);
    const p = new THREE.LineCurve3(vertex1, vertex2);

    //const path = new THREE.CatmullRomCurve3(pathPoints, false);

    const extrudeSettings = {
        bevelEnabled: false,
        extrudePath: p
    };

    const geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material1 = new THREE.MeshBasicMaterial({ color: "red", wireframe: false });
    const rect = new THREE.Mesh(geometry1, material1);
    scene.add(rect);

    //Method 2
    const pointsArray = geometry1.attributes.position;
    //console.log(pointsArray.array.length);
    /*let tri=[];
    console.log(pointsArray);
for(let i=0;i<pointsArray.array.length;i+=3)
{
    //pointsArray[i]=0;
let v=[];
v.push(pointsArray.array[i]);
v.push(pointsArray.array[i+1]);
v.push(pointsArray.array[i+2]);
tri.push(v);
}
        function multiDimensionalUnique(arr) {
            var uniques = [];
            var itemsFound = {};
            for(var i = 0, l = arr.length; i < l; i++) {
                var stringified = JSON.stringify(arr[i]);
                if(itemsFound[stringified]) { continue; }
                uniques.push(arr[i]);
                itemsFound[stringified] = true;
            }
            return uniques;
        }
        //console.log(tri);
        tri=multiDimensionalUnique(tri);
        console.log(tri);
        for(let i=0;i<tri.length;i++)
            {
        //console.log(tri[i]);
                const pointPosition = new THREE.Vector3(tri[i][0], tri[i][1], tri[i][2]);   //tri[18];
                const pointGeometry = new THREE.BufferGeometry();
                pointGeometry.setFromPoints([pointPosition]);
                const pointMaterial = new THREE.PointsMaterial({ 
                    size: 20, // Adjust the size of the dot
                    color: "green" // Set the color of the dot
                });
                const pointMesh = new THREE.Points(pointGeometry, pointMaterial);
                scene.add(pointMesh);
            for(let j=0;j<4;j++)
            {
                let pointPosition;
                if(j>1) pointPosition=new THREE.Vector3(60, tri[j][1], tri[j][2]);
                else pointPosition = new THREE.Vector3(tri[j][0], tri[j][1], tri[j][2]);   //tri[18];
                const pointGeometry = new THREE.BufferGeometry();
                pointGeometry.setFromPoints([pointPosition]);
                const pointMaterial = new THREE.PointsMaterial({ 
                    size: 50, // Adjust the size of the dot
                    color: "blue" // Set the color of the dot
                });
                const pointMesh = new THREE.Points(pointGeometry, pointMaterial);
                scene.add(pointMesh);
            }
            }*/

    //Iterating over the vertices and modifying the coordinates
    //let vertex = new THREE.Vector3();
    //let vertex1 = new THREE.Vector3();
    //console.log(pointsArray.getX(200));
    for (let i = 0; i < pointsArray.count; i++) {
        //vertex.fromBufferAttribute(pointsArray, i);
        let temp = pointsArray.getX(i);
        let yCor = pointsArray.getY(i);
        //console.log(temp, vertex1.x);
        if (temp === vertex1.x) {
            let val = getTan(yCor - origin.y);
            pointsArray.setX(i, temp + val);
        }
        if (temp === vertex2.x) {
            let val = getTan(yCor - origin.y);
            pointsArray.setX(i, temp - val);
        }
        //console.log(vertex.fromBufferAttribute(pointsArray, i))
        /*if (vertex.x === vertex1.x) {
            let val = getTan(vertex.y-origin.y);
            vertex.x += val;
        }
        if (vertex.x === vertex2.x) {
            let val = getTan(vertex.y-origin.y);
            vertex.x -= val;
        }
        pointsArray.setXYZ(i, vertex.x, vertex.y, vertex.z);*/
    }
    geometry1.attributes.position.needsUpdate = true;

    /* //Method 1 using 2D Array
 let pointsArray=geometry1.attributes.position.array;
 //metry1.deleteAttribute('position');
 //geometry1.attributes.position.needsUpdate=true;
 //console.log(pointsArray);
 //console.log(pointsArray.length);

 console.log(geometry1.getAttribute('position'));
//const temp=geometry1.getAttribute('position');

 let tri=[];
 for(let i=0;i<pointsArray.length;i+=3)
 {
     //pointsArray[i]=0;
 let v=[];
 v.push(pointsArray[i]);
 v.push(pointsArray[i+1]);
 v.push(pointsArray[i+2]);
 tri.push(v);
 }
 pointsArray[18*3]=60;
 //pointsArray[35*3]=1000-60;
 //pointsArray[27*3+1]=160;
 //pointsArray[36*3+2]=-500;
 //pointsArray[]
 //pointsArray[27*3+1]=-pointsArray[27*3+1];
 //pointsArray[0*3+1]=50;
 //pointsArray[36*3]=60;
 //console.log(tri[0]);
 //console.log(pointsArray.length, tri.length,tri[18], pointsArray[20*3+0]);
 //console.log(tri[18]);
 var geometry = new THREE.BufferGeometry();
 geometry.setAttribute( 'position', new THREE.BufferAttribute( pointsArray, 3 ) );
 var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
 var mesh = new THREE.Mesh( geometry, material );
 //geometry1.center();
 //scene.add(mesh);
 mesh.position.set(0,150,0);
 
 function multiDimensionalUnique(arr) {
     var uniques = [];
     var itemsFound = {};
     for(var i = 0, l = arr.length; i < l; i++) {
         var stringified = JSON.stringify(arr[i]);
         if(itemsFound[stringified]) { continue; }
         uniques.push(arr[i]);
         itemsFound[stringified] = true;
     }
     return uniques;
 }
 
 tri=multiDimensionalUnique(tri);

 for(let i=0;i<tri.length;i++)
 {
console.log(tri[i]);
     if(tri[i][0]===0){
     const pointPosition = new THREE.Vector3(tri[i][0], tri[i][1], tri[i][2]);   //tri[18];
     const pointGeometry = new THREE.BufferGeometry();
     pointGeometry.setFromPoints([pointPosition]);
     const pointMaterial = new THREE.PointsMaterial({ 
         size: 50, // Adjust the size of the dot
         color: "green" // Set the color of the dot
     });
     const pointMesh = new THREE.Points(pointGeometry, pointMaterial);
     scene.add(pointMesh);
 }
 for(let j=0;j<4;j++)
 {
     let pointPosition;
     if(j>1) pointPosition=new THREE.Vector3(60, tri[j][1], tri[j][2]);
     else pointPosition = new THREE.Vector3(tri[j][0], tri[j][1], tri[j][2]);   //tri[18];
     const pointGeometry = new THREE.BufferGeometry();
     pointGeometry.setFromPoints([pointPosition]);
     const pointMaterial = new THREE.PointsMaterial({ 
         size: 50, // Adjust the size of the dot
         color: "blue" // Set the color of the dot
     });
     const pointMesh = new THREE.Points(pointGeometry, pointMaterial);
     scene.add(pointMesh);
 }
 } */

    const edges = new THREE.EdgesGeometry(geometry1);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(edgeMesh);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region test1
function test1() {

    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 2000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    //Creating the shape with varying width and height
    /*let width = 400, height = 500;
    let radii = (width * (3 / 20)) / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-(width / 40), 0);
    shape.bezierCurveTo(-width / 40, 0, 0, 0, 0, -height / 50);
    shape.lineTo(0, -height * (3 / 25));
    shape.quadraticCurveTo(((0 + (width * (3 / 20)))) / 2, -height * (3 / 25) - ((0 + (width * (3 / 20)))) / 2, width * (3 / 20), -height * (3 / 25))
    shape.lineTo(width * (3 / 20), -(height / 50));
    shape.bezierCurveTo(width * (3 / 20), -(height / 50), width * (3 / 20), 0, width * (3 / 20) + (width / 40), 0);
    shape.lineTo(4 * width * (3 / 20) + width / 20, 0);
    shape.quadraticCurveTo(4 * width * (3 / 20) + (width / 10), 0, 4 * width * (3 / 20) + width / 10, -20);
    shape.lineTo(4 * width * (3 / 20) + (width / 10), -(6 * height * (3 / 25) + (height / 25)));
    let midPoint1 = ((4 * width * (3 / 20) + (width / 10)) + (5 * width * (3 / 20) + (width / 10))) / 2;
    shape.quadraticCurveTo(midPoint1, -(6 * height * (3 / 25) + (height / 25)) - radii, 5 * width * (3 / 20) + (width / 10), -(6 * height * (3 / 25) + (height / 25)) + (height / 80));
    shape.lineTo(5 * width * (3 / 20) + (width / 10), height / 10 - (height / 50));
    shape.quadraticCurveTo(5 * width * (3 / 20) + (width / 10), height * (3 / 25), 5 * width * (3 / 20) + (width / 20), height * (3 / 25));
    shape.lineTo(width * (3 / 20) + (width / 40), height * (3 / 25))
    shape.bezierCurveTo(width * (3 / 20) + (width / 40), height * (3 / 25), width * (3 / 20), height * (3 / 25), width * (3 / 20), height * (3 / 25) + height / 50);
    shape.lineTo(width * (3 / 20), 2 * height * (3 / 25));
    shape.quadraticCurveTo(radii, 2 * height * (3 / 25) + radii, 0, 2 * height * (3 / 25));
    shape.lineTo(0, height * (3 / 25) + height / 50);
    shape.bezierCurveTo(0, height * (3 / 25) + height / 50, 0, (height * (3 / 25)), -(width / 40), height * (3 / 25));
    shape.lineTo(-width * (3 / 20), height * (3 / 25));
    let midPoint2 = -width * (3 / 20) - (height * (3 / 25)) / 2;
    shape.quadraticCurveTo(-width * (3 / 20) - radii, height * (3 / 25) / 2, -width * (3 / 20), 0);
    shape.lineTo(-(width / 40), 0);*/
    let width = 400, height = 500;
    let variableHeight = 0;
    let variableWidth = 0;
    let radii = (width * (3 / 20)) / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-10, 0);
    shape.bezierCurveTo(-10, 0, 0, 0, 0, -10);
    shape.lineTo(0, -60);
    //shape.quadraticCurveTo(30, -90, 60, -60);  //(30,-90,60,-60)
    shape.absarc(30, -60, 30, Math.PI, Math.PI * 2, false);
    //shape.lineTo(60, -60);
    shape.bezierCurveTo(60, -10, 60, 0, 70, 0);


    shape.lineTo(260 + variableWidth, 0);
    shape.quadraticCurveTo(280 + variableWidth, 0, 280 + variableWidth, -20);


    shape.lineTo(280 + variableWidth, -380 - variableHeight);
    shape.absarc(310 + variableWidth, -380 - variableHeight, 30, Math.PI, Math.PI * 2, false);
    //shape.lineTo(340,-380);
    //let midPoint1 = 310;
    //shape.quadraticCurveTo(midPoint1+variableWidth, -410-variableHeight, 340+variableWidth, -375.75-variableHeight);


    shape.lineTo(340 + variableWidth, 40);
    shape.quadraticCurveTo(340 + variableWidth, 60, 320 + variableWidth, 60);//



    shape.lineTo(70, 60)
    shape.bezierCurveTo(70, 60, 60, 60, 60, 70);

    shape.lineTo(60, 120);
    shape.absarc(30, 120, 30, 0, Math.PI, false);
    //shape.quadraticCurveTo(30, 150, 0, 120);
    //shape.lineTo(0,120);

    shape.lineTo(0, 70);
    shape.bezierCurveTo(0, 70, 0, 60, -10, 60);

    shape.lineTo(-60, 60);
    shape.absarc(-60, 30, 30, Math.PI / 2, 3 * Math.PI / 2, false);
    //shape.quadraticCurveTo(-90, 30, -60, 0);
    //shape.lineTo(-60,0);

    shape.lineTo(-10, 0);


    //Creating the hole and pushing it into the shape
    let diameter = 50;
    let hole = new THREE.Path();
    hole.absarc((width * (3 / 20)) / 2, (height * (3 / 25)) / 2, diameter / 2, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    // Extrusion along the width with variable extrudeWidth
    let extrudeWidth = 800;
    const line = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(extrudeWidth, 0, 0));
    const extrudeSettings = {
        bevelEnabled: false,
        depth: 100
        //extrudePath: line
    };

    //Creating extrude geometry
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    //geometry.rotateY(-Math.PI / 2);

    scene.add(mesh);

    //Setting color for the edges to make the edges visible
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(edgeMesh);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

}


//#region test2
function test2() {

    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);


    //Method 1
    /*let height=500,width=200;
    let variableHeight=0;
    let variableWidth=0;
   const shape=new THREE.Shape();
   shape.moveTo(0-variableWidth,0);


//10=(height/50), (width/20)
let temp1=height/50, temp2=width/20;

   //Region 2 on left
   shape.lineTo(13*temp2,temp1);  //(130,10)
   shape.bezierCurveTo(13*temp2,1*temp1,14*temp2,temp1,14*temp2,0); //(130,10,140,10,140,0)

   //Region 1 on bottom
   shape.lineTo(14*temp2,-35*temp1-(3*variableHeight/4));   //(140,-350)
   shape.quadraticCurveTo(17*temp2,-37.5*temp1-(3*variableHeight/4),20*temp2,-35*temp1-(3*variableHeight/4));  //(170,-375,200,-350)

shape.lineTo(20*temp2,14*temp1); //(200,140)
//
shape.bezierCurveTo(20*temp2,14*temp1+(variableHeight/4),20*temp2,15*temp1+(variableHeight/4),19*temp2,15*temp1+(variableHeight/4));  //(200,140,200,150,190,150)
  // shape.lineTo(200,150);


   shape.lineTo(0-variableWidth,12.5*temp1+(variableHeight/4));  //(0,125)
   shape.lineTo(0-variableWidth,0);*/


    //Method 2
    //Declaring height and width and biasing for the shape
    let height = 500, width = 200;
    let shapeWidth = 60;
    let biasing = 10;

    //Condition for height
    if (height > 5000 || height < 300) {
        alert("Height cannot be greater than 5000 and also height cannot be less than 300");
        height = 500;
    }

    if (width < 200) {
        alert("Width cannot be less than 200");
        width = 200;
    }

    //Creating the shape
    const shape = new THREE.Shape();
    shape.moveTo(0, height - (height / 4) - (height / 10));

    //Region 2 on left
    shape.lineTo(width - shapeWidth - biasing, height - (height / 4));
    shape.bezierCurveTo(width - shapeWidth - biasing, height - (height / 4), width - shapeWidth, height - (height / 4), width - shapeWidth, height - (height / 4) - biasing);

    //Region 1 on bottom
    shape.lineTo(width - shapeWidth, 0);
    shape.absarc(width - shapeWidth + (shapeWidth / 2), 0, (shapeWidth / 2), Math.PI, Math.PI * 2, false);


    shape.lineTo(width, height - biasing);
    shape.bezierCurveTo(width, height - biasing, width, height, width - biasing, height);


    shape.lineTo(0, height - (height / 10));
    shape.lineTo(0, height - (height / 4) - (height / 10));

    //Defining the hole
    let diameter = 50;
    if (diameter > (height / 4)) {
        alert("Diameter cannot be greater than height/4");
        diameter = (height / 4);
    }
    const hole = new THREE.Path();
    hole.absarc((width - shapeWidth) / 2, height - height / 4 - (height / 10) + (height / 4 + height / 10) / 2, diameter / 2, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    const extrudeSettings = {
        depth: 0,
        bevelEnabled: false
    };


    // Creating extrude geometry
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Setting color for the edges to make the edges visible
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(edgeMesh);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

}

function mySelf() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 300);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const path = new THREE.CurvePath();
    const line = new THREE.LineCurve(new THREE.Vector2(0, 0), new THREE.Vector2(2, 2));
    path.add(line);
    const bezier = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(),
        new THREE.Vector2(),
        new THREE.Vector2()
    );
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

}
//#region test number 3
function test3() {

    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    //Creating the shape using ShapeGeometry with given height, width and biasing. Biasing is used to pull out the shape
    let width = 500, height = 500;
    let shapeWidth = 100;
    let biasing = 10;
    const shape = new THREE.Shape();
    shape.moveTo(0, biasing);
    shape.quadraticCurveTo(0, 0, biasing, 0);
    shape.lineTo(width - biasing, 0);
    shape.quadraticCurveTo(width, 0, width, biasing);
    shape.lineTo(width, height / 3);
    shape.absarc(width - (shapeWidth / 2), height / 3, shapeWidth / 2, 0, Math.PI, false);
    shape.lineTo(width - shapeWidth, shapeWidth + biasing);
    shape.quadraticCurveTo(width - shapeWidth, shapeWidth, width - shapeWidth - biasing, shapeWidth);
    shape.lineTo(shapeWidth + biasing, shapeWidth);
    shape.quadraticCurveTo(shapeWidth, shapeWidth, shapeWidth, shapeWidth + biasing);
    shape.lineTo(shapeWidth, height - shapeWidth);
    let mid1 = (width / 2 - shapeWidth - shapeWidth) / 2;
    shape.absarc(shapeWidth + mid1, height - shapeWidth, mid1, Math.PI, 2 * Math.PI, true);
    shape.lineTo(shapeWidth + (width / 2 - shapeWidth - shapeWidth), height - (height / 3));
    shape.absarc(width / 2 - shapeWidth + (shapeWidth / 2), height - (height / 3), shapeWidth / 2, Math.PI, Math.PI * 2, false);
    shape.lineTo(width / 2, height - shapeWidth);
    shape.absarc(width / 4, height - shapeWidth, width / 4, 0, Math.PI, false);
    shape.lineTo(0, biasing);

    //Defing the holes which should be placed in the above shape
    let diameter = 90;
    if (diameter > 60) diameter = 50;
    const hole1 = new THREE.Path();
    hole1.absarc(width - shapeWidth + (shapeWidth / 2), height / 3.5, diameter / 2, 0, Math.PI * 2, false);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(width / 2 - (shapeWidth / 2), height - (height / 3.5), diameter / 2, 0, Math.PI * 2, false);
    shape.holes.push(hole2);

    //Defining extrude settings
    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };

    //Defining the geometry and material
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Making the edges outline
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(edgeMesh);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

}

//#endregion

//#region test number 4
function test4() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    let squareWidth = 1000, squareHeight = 800;
    let rectangleWidth = 300, rectangleHeight = 100;
    let diameter = 60;
    let changedDiameter = diameter - 60;

    //Handling shape break dimensions
    if (squareHeight < rectangleHeight + 20) squareHeight = 500;
    if (squareWidth < diameter) squareWidth = diameter;
    if (diameter - squareWidth > 300) diameter = 60;
    if (changedDiameter > 20) rectangleHeight += changedDiameter;
    if (squareHeight - rectangleHeight < 20) rectangleHeight = 200;
    if (rectangleHeight < diameter) rectangleHeight = diameter;


    //#region square geometry coordinates
    const square = new THREE.Shape();
    square.moveTo(0, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);
    //#endregion 

    //#region rectangle geometry coordinates
    const rectangle = new THREE.Shape();
    rectangle.moveTo(0 + changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle.lineTo(0 + changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle.lineTo(-rectangleWidth - changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle.lineTo(-rectangleWidth - changedDiameter, 0 - changedDiameter / 2);
    rectangle.lineTo(0 + changedDiameter / 2, 0 - changedDiameter / 2);
    //#endregion

    //#region square hole
    const squareHole = new THREE.Path();
    squareHole.absarc(40, squareHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole)
    //rectangle.holes.push(hole);
    //#endregion

    //#region rectangle hole
    const rectangleHole = new THREE.Path();
    rectangleHole.absarc(-40, rectangleHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    rectangle.holes.push(rectangleHole);
    //#endregion

    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };

    //#region square mesh
    const squareGeometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide, wireframe: false });
    const squareMesh = new THREE.Mesh(squareGeometry, material);
    scene.add(squareMesh);
    //#endregion

    //#region rectangle mesh
    const rectangleGeometry = new THREE.ExtrudeGeometry(rectangle, extrudeSettings);
    const rectangleMesh = new THREE.Mesh(rectangleGeometry, material);
    scene.add(rectangleMesh);
    rectangleMesh.position.set(80, (squareHeight - rectangleHeight) / 2, 50);
    //#endregion

    //#region square edges
    const squareEdges = new THREE.EdgesGeometry(squareGeometry);
    const squareEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const squareEdgeMesh = new THREE.LineSegments(squareEdges, squareEdgeMaterial);
    scene.add(squareEdgeMesh);
    //#endregion

    //#region  rectangle edges
    const rectangleEdges = new THREE.EdgesGeometry(rectangleGeometry);
    const rectangleEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh = new THREE.LineSegments(rectangleEdges, rectangleEdgeMaterial);
    scene.add(rectangleEdgeMesh);
    //#endregion
    rectangleEdgeMesh.position.set(80, (squareHeight - rectangleHeight) / 2, 50);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#endregion

//#region task5
function task5() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    let squareWidth = 500, squareHeight = 500;
    let rectangleWidth = 200, rectangleHeight = 80;
    if (rectangleHeight > 320) rectangleHeight = 320;
    let changedRectangleHeight = rectangleHeight - 80;
    let diameter = 60;
    if (diameter > 130) diameter = 130;
    if (squareWidth < 200) squareWidth = 500;
    if (squareHeight < 200) squareWidth = 500;
    if (rectangleHeight < 80) rectangleHeight = 80;
    if (rectangleWidth < 100) rectangleWidth = 200;
    let changedDiameter = diameter - 60;

    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };


    //Handling shape break dimensions
    if (squareHeight < rectangleHeight + 20) squareHeight = 500;
    if (squareWidth < diameter) squareWidth = diameter;
    if (diameter - squareWidth > 300) diameter = 60;
    if (changedDiameter > 20) rectangleHeight += changedDiameter;
    if (squareHeight - rectangleHeight < 20) rectangleHeight = 200;
    if (rectangleHeight < diameter) rectangleHeight = diameter;

    //#region square geometry
    const square = new THREE.Shape();
    square.moveTo(0, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);

    const squareHole = new THREE.Path();
    squareHole.absarc(40, squareHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole);

    const squareHole1 = new THREE.Path();
    squareHole1.absarc(squareWidth / 2, 40, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole1);

    const squareHole2 = new THREE.Path();
    squareHole2.absarc(squareWidth - 40 - (changedDiameter / 2), squareHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole2);

    const squareHole3 = new THREE.Path();
    squareHole3.absarc(squareWidth / 2, squareHeight - 40, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole3);

    const squareGeometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide, wireframe: false });
    const material1 = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide, wireframe: false });
    const squareMesh = new THREE.Mesh(squareGeometry, material);
    scene.add(squareMesh);

    const squareEdges = new THREE.EdgesGeometry(squareGeometry);
    const squareEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const squareEdgeMesh = new THREE.LineSegments(squareEdges, squareEdgeMaterial);
    squareMesh.add(squareEdgeMesh);
    //#endregion

    //#region  Left Child
    const rectangle = new THREE.Shape();
    rectangle.moveTo(0 + changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle.lineTo(0 + changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle.lineTo(-rectangleWidth - changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle.lineTo(-rectangleWidth - changedDiameter, 0 - changedDiameter / 2);
    rectangle.lineTo(0 + changedDiameter / 2, 0 - changedDiameter / 2);

    const rectangleHole = new THREE.Path();
    rectangleHole.absarc(-40, rectangleHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    rectangle.holes.push(rectangleHole);

    const rectangleGeometry = new THREE.ExtrudeGeometry(rectangle, extrudeSettings);
    const rectangleMesh = new THREE.Mesh(rectangleGeometry, material1);
    squareMesh.add(rectangleMesh);
    rectangleMesh.position.set(80, (squareHeight - rectangleHeight) / 2, 50);

    const rectangleEdges = new THREE.EdgesGeometry(rectangleGeometry);
    const rectangleEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh = new THREE.LineSegments(rectangleEdges, rectangleEdgeMaterial);
    rectangleMesh.add(rectangleEdgeMesh);
    //#endregion

    //#region  right Child
    const rectangle1 = new THREE.Shape();
    rectangle1.moveTo(0, 0 - changedDiameter / 2);
    rectangle1.lineTo(0, rectangleHeight + changedDiameter / 2);
    rectangle1.lineTo(-rectangleWidth - changedDiameter - (changedDiameter / 2), rectangleHeight + changedDiameter / 2);
    rectangle1.lineTo(-rectangleWidth - changedDiameter - (changedDiameter / 2), 0 - changedDiameter / 2);
    rectangle1.lineTo(0, 0 - changedDiameter / 2);

    const rectangleHole1 = new THREE.Path();
    rectangleHole1.absarc(-40 - (changedDiameter / 2), 40 + (changedRectangleHeight / 2) + (changedDiameter / 2), diameter / 2, 0, Math.PI * 2, false);
    rectangle1.holes.push(rectangleHole1);

    const rectangleGeometry1 = new THREE.ExtrudeGeometry(rectangle1, extrudeSettings);
    const rectangleMesh1 = new THREE.Mesh(rectangleGeometry1, material1);
    squareMesh.add(rectangleMesh1);
    rectangleMesh1.rotation.set(0, Math.PI, 0);
    rectangleMesh1.position.set(squareWidth - diameter - 20, (squareHeight - rectangleHeight) / 2, 100);

    const rectangleEdges1 = new THREE.EdgesGeometry(rectangleGeometry1);
    const rectangleEdgeMaterial1 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh1 = new THREE.LineSegments(rectangleEdges1, rectangleEdgeMaterial1);
    rectangleMesh1.add(rectangleEdgeMesh1);
    //#endregion


    //#region  Bottom Child
    const rectangle2 = new THREE.Shape();
    rectangle2.moveTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle2.lineTo(0 - changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle2.lineTo(-rectangleWidth - 2 * changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle2.lineTo(-rectangleWidth - 2 * changedDiameter, 0 - changedDiameter / 2);
    rectangle2.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);


    const rectangleHole2 = new THREE.Path();
    rectangleHole2.absarc(-40 - changedDiameter, 40 + (changedRectangleHeight / 2) + (changedDiameter / 2), diameter / 2, 0, Math.PI * 2, false);
    rectangle2.holes.push(rectangleHole2);

    const rectangleGeometry2 = new THREE.ExtrudeGeometry(rectangle2, extrudeSettings);
    const rectangleMesh2 = new THREE.Mesh(rectangleGeometry2, material1);
    squareMesh.add(rectangleMesh2);
    rectangleMesh2.rotation.set(0, Math.PI, Math.PI / 2);
    rectangleMesh2.position.set((squareWidth - rectangleHeight) / 2, diameter + 20, 100);

    const rectangleEdges2 = new THREE.EdgesGeometry(rectangleGeometry2);
    const rectangleEdgeMaterial2 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh2 = new THREE.LineSegments(rectangleEdges2, rectangleEdgeMaterial2);
    rectangleMesh2.add(rectangleEdgeMesh2);
    //#endregion

    //#region Top Child
    const rectangle3 = new THREE.Shape();
    rectangle3.moveTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle3.lineTo(0 - changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle3.lineTo(-rectangleWidth - 2 * changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle3.lineTo(-rectangleWidth - 2 * changedDiameter, 0 - changedDiameter / 2);
    rectangle3.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);

    const rectangleHole3 = new THREE.Path();
    rectangleHole3.absarc(-40, 40, diameter / 2, 0, Math.PI * 2, false);
    rectangle3.holes.push(rectangleHole2);

    const rectangleGeometry3 = new THREE.ExtrudeGeometry(rectangle3, extrudeSettings);
    const rectangleMesh3 = new THREE.Mesh(rectangleGeometry3, material1);
    squareMesh.add(rectangleMesh3);
    rectangleMesh3.rotation.set(Math.PI, Math.PI, Math.PI / 2);
    rectangleMesh3.position.set((squareWidth - rectangleHeight) / 2, squareHeight - diameter - 20, 50);

    const rectangleEdges3 = new THREE.EdgesGeometry(rectangleGeometry3);
    const rectangleEdgeMaterial3 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh3 = new THREE.LineSegments(rectangleEdges3, rectangleEdgeMaterial3);
    rectangleMesh3.add(rectangleEdgeMesh3);
    //#endregion

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region task6
function task6() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    let parentWidth = 500, height = 500;
    let biasing = 20;
    const parentObj = new THREE.Shape();
    parentObj.moveTo(biasing, 0);
    parentObj.lineTo(parentWidth - biasing, 0);
    parentObj.quadraticCurveTo(parentWidth, 0, parentWidth, biasing);
    parentObj.lineTo(parentWidth, height - biasing);
    parentObj.quadraticCurveTo(parentWidth, height, parentWidth - biasing, height);
    parentObj.lineTo(biasing, height);
    parentObj.quadraticCurveTo(0, height, 0, height - biasing);
    parentObj.lineTo(0, biasing);
    parentObj.quadraticCurveTo(0, 0, biasing, 0);

    let childWidth = 200, childHeight = 80;
    const childObj = new THREE.Shape();
    childObj.moveTo(0, 0);
    childObj.lineTo(childWidth, 0);
    childObj.lineTo(childWidth, childHeight);
    childObj.lineTo(0, childHeight);
    childObj.lineTo(0, 0);

    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };

    const parentObjGeometry = new THREE.ExtrudeGeometry(parentObj, extrudeSettings);
    const parentObjMaterial = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide, wireframe: false });
    const parentObjMesh = new THREE.Mesh(parentObjGeometry, parentObjMaterial);
    scene.add(parentObjMesh);

    const childObjGeometry = new THREE.ExtrudeGeometry(childObj, extrudeSettings);
    const childObjMaterial = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide, wireframe: false });
    const childObjMesh = new THREE.Mesh(childObjGeometry, childObjMaterial);
    childObjMesh.position.set(-200, 500, 0);
    childObjMesh.rotation.set(0, 0, 0);
    parentObjMesh.add(childObjMesh);

    const edges = new THREE.EdgesGeometry(parentObjGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
    parentObjMesh.add(edgesMesh);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region project1
function project1() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    /*const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
    directionalLight.position.set(2, 2, 300); // Position the light
    scene.add(directionalLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
    directionalLight1.position.set(2, 2, -300); // Position the light
    scene.add(directionalLight1);*/

    //const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 30);
    //scene.add(directionalLightHelper);

    let parentWidth = 100, parentHeight = 1300;
    if (parentWidth < 100) parentWidth = 100;
    if (parentHeight < 800) parentHeight = 800;
    let biasing = 10;
    let changedParentWidth = (parentWidth - 100) / 2;
    let changedParentHeight = parentHeight - 900;
    //let keyHoleMid = parentWidth / 2;
    let keyHoleMid = 50;
    //#region Handle BackPlate
    const parentShape = new THREE.Shape();
    parentShape.moveTo(0, 0);
    parentShape.absarc(parentWidth / 2, 0, parentWidth / 2, Math.PI, Math.PI * 2, false);
    // parentShape.lineTo(parentWidth, 0);
    parentShape.lineTo(parentWidth, parentHeight);
    parentShape.absarc(parentWidth / 2, parentHeight, parentWidth / 2, 0, Math.PI, false);
    // parentShape.lineTo(0, parentHeight);
    parentShape.lineTo(0, 0);

    const keyHoleWidth = 33.33, keyHoleHeight = 200;
    const keyHoleShape = new THREE.Shape();
    keyHoleShape.moveTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    keyHoleShape.absarc(keyHoleMid + changedParentWidth, keyHoleHeight, keyHoleWidth / 2, Math.PI, Math.PI * 2, false);
    keyHoleShape.lineTo(keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    keyHoleShape.lineTo(keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight + 100 - biasing);
    keyHoleShape.absarc(keyHoleMid + changedParentWidth, keyHoleHeight + 100, keyHoleWidth / 2 + biasing, 0, Math.PI, false);
    keyHoleShape.lineTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight + 100 - biasing);
    keyHoleShape.lineTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    parentShape.holes.push(keyHoleShape);
    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };
    const parentGeometry = new THREE.ExtrudeGeometry(parentShape, extrudeSettings);
    const parentMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
    scene.add(parentMesh);

    const parentEdges = new THREE.EdgesGeometry(parentGeometry);
    const parentEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const parentEdgesMesh = new THREE.LineSegments(parentEdges, parentEdgesMaterial);
    parentMesh.add(parentEdgesMesh);
    //#endregion

    //#region Handle Geometry
    let handleWidth = 100;
    const handlePoints = [
        new THREE.Vector3(0, 0 - changedParentWidth, -50),
        new THREE.Vector3(0, 0 - changedParentWidth, 0),
        new THREE.Vector3(-handleWidth, 0 - changedParentWidth, 0),
        //new THREE.Vector3(-handleWidth-40, 400 - 100 + changedParentWidth + changedParentHeight, 0),
        //new THREE.Vector3(-handleWidth-40, 600 - 100 + changedParentWidth + changedParentHeight, 0),
        new THREE.Vector3(-handleWidth, 900 - 100 + changedParentWidth + changedParentHeight, 0),
        new THREE.Vector3(0, 900 - 100 + changedParentWidth + changedParentHeight, 0),
        new THREE.Vector3(0, 900 - 100 + changedParentWidth + changedParentHeight, -50)
    ];
    const handlePath = new THREE.CatmullRomCurve3(handlePoints);
    const handleGeometry = new THREE.TubeGeometry(
        handlePath,
        100,
        20,
        8,
        false
    );
    const material = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide, roughness: 0.2 });
    const handleMesh = new THREE.Mesh(handleGeometry, material);
    handleMesh.position.set(parentWidth / 2, 50, 100);
    parentMesh.add(handleMesh);

    const handleEdges = new THREE.EdgesGeometry(handleGeometry);
    const handleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const handleEdgesMesh = new THREE.LineSegments(handleEdges, handleEdgesMaterial);
    //handleMesh.add(handleEdgesMesh);

    function rotateHandle(isHandleRotated) {
        if (isHandleRotated) {
            handleMesh.rotation.set(Math.PI, -Math.PI, 0);
            handleMesh.position.set(parentWidth / 2, parentHeight - 50, 100);
        }
    }

    rotateHandle(false);
    //#endregion

    //#region knob Geometry
    let knobHeight = 550;
    const knob = new THREE.Shape();
    knob.moveTo(keyHoleMid - 20 + changedParentWidth, 0);
    knob.absarc(keyHoleMid + changedParentWidth, 0, 20, Math.PI, Math.PI * 2, false);
    knob.lineTo(keyHoleMid + 20 + changedParentWidth, 0);
    knob.lineTo(keyHoleMid + 20 + biasing + changedParentWidth, 200);
    knob.absarc(keyHoleMid + changedParentWidth, 200, keyHoleMid / 2 + biasing / 2, 0, Math.PI, false);
    knob.lineTo(keyHoleMid - 20 - biasing + changedParentWidth, 200);
    knob.lineTo(keyHoleMid - 20 + changedParentWidth, 0);

    const knobSettings = {
        depth: 50,
        bevelEnabled: false
    };

    const knobGeometry = new THREE.ExtrudeGeometry(knob, knobSettings);
    const knobMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const knobMesh = new THREE.Mesh(knobGeometry, knobMaterial);
    knobMesh.position.set(0, knobHeight, 50);
    parentMesh.add(knobMesh);
    parentMesh.position.set(0, -400, 0);

    const knobEdges = new THREE.EdgesGeometry(knobGeometry);
    const knobEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const knobEdgesMesh = new THREE.LineSegments(knobEdges, knobEdgesMaterial);
    knobMesh.add(knobEdgesMesh);
    //#endregion

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}


//#region task7
function task7() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    let squareWidth = 500, squareHeight = 500;
    let rectangleWidth = 200, rectangleHeight = 80;
    if (rectangleHeight > 320) rectangleHeight = 320;
    let changedRectangleHeight = rectangleHeight - 80;
    let biasing = 10;
    let diameter = 60;
    if (diameter > 130) diameter = 130;
    if (squareWidth < 200) squareWidth = 500;
    if (squareHeight < 200) squareWidth = 500;
    if (rectangleHeight < 80) rectangleHeight = 80;
    if (rectangleWidth < 100) rectangleWidth = 200;
    let changedDiameter = diameter - 60;

    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };


    //Handling shape break dimensions
    if (squareHeight < rectangleHeight + 20) squareHeight = 500;
    if (squareWidth < diameter) squareWidth = diameter;
    if (diameter - squareWidth > 300) diameter = 60;
    if (changedDiameter > 20) rectangleHeight += changedDiameter;
    if (squareHeight - rectangleHeight < 20) rectangleHeight = 200;
    if (rectangleHeight < diameter) rectangleHeight = diameter;

    //#region square geometry
    const square = new THREE.Shape();
    square.moveTo(0, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, 0 - changedDiameter / 2);
    square.lineTo(squareWidth, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, squareHeight + changedDiameter / 2);
    square.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);

    const squareHole1 = new THREE.Path();
    squareHole1.absarc(squareWidth / 2, 40, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole1);

    const squareHole2 = new THREE.Path();
    squareHole2.absarc(squareWidth - 40 - (changedDiameter / 2), squareHeight / 2, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole2);

    const squareHole3 = new THREE.Path();
    squareHole3.absarc(0 + 4 * biasing, squareHeight - 4 * biasing, diameter / 2, 0, Math.PI * 2, false);
    square.holes.push(squareHole3);

    const squareGeometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide, wireframe: false });
    const material1 = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide, wireframe: false });
    const squareMesh = new THREE.Mesh(squareGeometry, material);
    scene.add(squareMesh);

    const squareEdges = new THREE.EdgesGeometry(squareGeometry);
    const squareEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const squareEdgeMesh = new THREE.LineSegments(squareEdges, squareEdgeMaterial);
    squareMesh.add(squareEdgeMesh);
    //#endregion

    //#region  right Child
    const rectangle1 = new THREE.Shape();
    rectangle1.moveTo(0, 0 - changedDiameter / 2);
    rectangle1.lineTo(0, rectangleHeight + changedDiameter / 2);
    rectangle1.lineTo(-rectangleWidth - changedDiameter - (changedDiameter / 2), rectangleHeight + changedDiameter / 2);
    rectangle1.lineTo(-rectangleWidth - changedDiameter - (changedDiameter / 2), 0 - changedDiameter / 2);
    rectangle1.lineTo(0, 0 - changedDiameter / 2);

    const rectangleHole1 = new THREE.Path();
    rectangleHole1.absarc(-40 - (changedDiameter / 2), 40 + (changedRectangleHeight / 2) + (changedDiameter / 2), diameter / 2, 0, Math.PI * 2, false);
    rectangle1.holes.push(rectangleHole1);

    const rectangleGeometry1 = new THREE.ExtrudeGeometry(rectangle1, extrudeSettings);
    const rectangleMesh1 = new THREE.Mesh(rectangleGeometry1, material1);
    squareMesh.add(rectangleMesh1);
    rectangleMesh1.rotation.set(0, Math.PI, 0);
    rectangleMesh1.position.set(squareWidth - diameter - 20, (squareHeight - rectangleHeight) / 2, 100);

    const rectangleEdges1 = new THREE.EdgesGeometry(rectangleGeometry1);
    const rectangleEdgeMaterial1 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh1 = new THREE.LineSegments(rectangleEdges1, rectangleEdgeMaterial1);
    rectangleMesh1.add(rectangleEdgeMesh1);
    //#endregion


    //#region  Bottom Child
    const rectangle2 = new THREE.Shape();
    rectangle2.moveTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle2.lineTo(0 - changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle2.lineTo(-rectangleWidth - 2 * changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle2.lineTo(-rectangleWidth - 2 * changedDiameter, 0 - changedDiameter / 2);
    rectangle2.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);


    const rectangleHole2 = new THREE.Path();
    rectangleHole2.absarc(-40 - changedDiameter, 40 + (changedRectangleHeight / 2) + (changedDiameter / 2), diameter / 2, 0, Math.PI * 2, false);
    rectangle2.holes.push(rectangleHole2);

    const rectangleGeometry2 = new THREE.ExtrudeGeometry(rectangle2, extrudeSettings);
    const rectangleMesh2 = new THREE.Mesh(rectangleGeometry2, material1);
    squareMesh.add(rectangleMesh2);
    rectangleMesh2.rotation.set(0, Math.PI, Math.PI / 2);
    rectangleMesh2.position.set((squareWidth - rectangleHeight) / 2, diameter + 20, 100);

    const rectangleEdges2 = new THREE.EdgesGeometry(rectangleGeometry2);
    const rectangleEdgeMaterial2 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh2 = new THREE.LineSegments(rectangleEdges2, rectangleEdgeMaterial2);
    rectangleMesh2.add(rectangleEdgeMesh2);
    //#endregion

    //#region Top Child
    const rectangle3 = new THREE.Shape();
    rectangle3.moveTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);
    rectangle3.lineTo(0 - changedDiameter / 2, rectangleHeight + changedDiameter / 2);
    rectangle3.lineTo(-rectangleWidth - 2 * changedDiameter, rectangleHeight + changedDiameter / 2);
    rectangle3.lineTo(-rectangleWidth - 2 * changedDiameter, 0 - changedDiameter / 2);
    rectangle3.lineTo(0 - changedDiameter / 2, 0 - changedDiameter / 2);

    const rectangleHole3 = new THREE.Path();
    rectangleHole3.absarc(-40, 40, diameter / 2, 0, Math.PI * 2, false);
    rectangle3.holes.push(rectangleHole2);

    const rectangleGeometry3 = new THREE.ExtrudeGeometry(rectangle3, extrudeSettings);
    const rectangleMesh3 = new THREE.Mesh(rectangleGeometry3, material1);
    squareMesh.add(rectangleMesh3);
    rectangleMesh3.rotation.set(0, 0, -Math.PI / 4);
    rectangleMesh3.position.set(0 - changedDiameter / 2 + diameter / 2 + 15, squareHeight + changedDiameter / 2 - diameter - 3 * biasing - 10, 50);

    const rectangleEdges3 = new THREE.EdgesGeometry(rectangleGeometry3);
    const rectangleEdgeMaterial3 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rectangleEdgeMesh3 = new THREE.LineSegments(rectangleEdges3, rectangleEdgeMaterial3);
    rectangleMesh3.add(rectangleEdgeMesh3);
    //#endregion

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region project2
function project2() {
    //Setting scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 2500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    /*const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
    directionalLight.position.set(2, 2, 300); // Position the light
    scene.add(directionalLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
    directionalLight1.position.set(2, 2, -300); // Position the light
    scene.add(directionalLight1);*/

    //const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 30);
    //scene.add(directionalLightHelper);

    let parentWidth = 350, parentHeight = 500;
    if (parentWidth < 350) parentWidth = 350;
    if (parentHeight < 800) parentHeight = 800;
    let biasing = 10;
    let val = 0;
    if (parentWidth < 400) {
        val = (parentWidth - 400) / 2;
    }
    let val2 = 0;
    if (parentWidth > 400) val2 = parentWidth - 400;
    let changedParentWidth = (parentWidth - 100) / 2;
    let changedParentHeight = parentHeight - 900;
    let handleHeight = 400
    //let keyHoleMid = parentWidth / 2;
    let keyHoleMid = 50;
    //#region Handle BackPlate
    const parentShape = new THREE.Shape();
    parentShape.moveTo(0, 0);
    parentShape.absarc(parentWidth / 2, 0, parentWidth / 2, Math.PI, Math.PI * 2, false);
    // parentShape.lineTo(parentWidth, 0);
    parentShape.lineTo(parentWidth, parentHeight);
    parentShape.absarc(parentWidth / 2, parentHeight, parentWidth / 2, 0, Math.PI, false);
    // parentShape.lineTo(0, parentHeight);
    parentShape.lineTo(0, 0);

    const keyHoleWidth = 33.33, keyHoleHeight = 100;
    const keyHoleShape = new THREE.Shape();
    keyHoleShape.moveTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    keyHoleShape.absarc(keyHoleMid + changedParentWidth, keyHoleHeight, keyHoleWidth / 2, Math.PI, Math.PI * 2, false);
    keyHoleShape.lineTo(keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    keyHoleShape.lineTo(keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight + 100 - biasing);
    keyHoleShape.absarc(keyHoleMid + changedParentWidth, keyHoleHeight + 100, keyHoleWidth / 2 + biasing, 0, Math.PI, false);
    keyHoleShape.lineTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight + 100 - biasing);
    keyHoleShape.lineTo(-keyHoleWidth / 2 + keyHoleMid + changedParentWidth, keyHoleHeight);
    parentShape.holes.push(keyHoleShape);

    const bottomHole = new THREE.Path();
    bottomHole.absarc(parentWidth / 2, -50, 30, 0, Math.PI * 2, false);

    parentShape.holes.push(bottomHole);

    const topHole = new THREE.Path();
    topHole.absarc(parentWidth / 2, parentHeight, 30, 0, Math.PI * 2, false);

    parentShape.holes.push(topHole);

    const middleHole = new THREE.Path();
    middleHole.absarc(parentWidth / 2, parentHeight - 250, 15, 0, Math.PI * 2, false);

    parentShape.holes.push(middleHole);

    const extrudeSettings = {
        depth: 50,
        bevelEnabled: false
    };
    const parentGeometry = new THREE.ExtrudeGeometry(parentShape, extrudeSettings);
    const parentMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
    scene.add(parentMesh);

    const parentEdges = new THREE.EdgesGeometry(parentGeometry);
    const parentEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const parentEdgesMesh = new THREE.LineSegments(parentEdges, parentEdgesMaterial);
    parentMesh.add(parentEdgesMesh);
    //#endregion

    let slideHandleWidth = 900;
    const slideHnadleShape = new THREE.Shape();
    slideHnadleShape.moveTo(0, -10);

    //slideHnadleShape.bezierCurveTo(0,0,slideHandleWidth/2, -5*biasing, slideHandleWidth, 0);

    //slideHnadleShape.lineTo(slideHandleWidth, 0);
    // slideHnadleShape.lineTo(slideHandleWidth, 100);
    slideHnadleShape.lineTo(100 + val / 4, -10);
    //slideHnadleShape.lineTo(100,100);

    slideHnadleShape.bezierCurveTo(100 + val / 4, -10, 100 - 5 * biasing + val / 4, 200, 100 + val / 4, 200);

    //slideHnadleShape.lineTo(100,300);
    slideHnadleShape.lineTo(-50, 200);
    slideHnadleShape.lineTo(-50, 100);
    slideHnadleShape.lineTo(0, -10);

    const slideHandleSettings = {
        depth: 100,
        bevelEnabled: false
    };

    const slideHandleGeometry = new THREE.ExtrudeGeometry(slideHnadleShape, slideHandleSettings);
    const slideHandleMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const slideHandleMesh = new THREE.Mesh(slideHandleGeometry, slideHandleMaterial);
    scene.add(slideHandleMesh);

    slideHandleMesh.position.set(0 - (parentWidth - 400) / 10, 100, 0);

    const slideHandleEdges = new THREE.EdgesGeometry(slideHandleGeometry);
    const slideHandleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const slideHandleEdgesMesh = new THREE.LineSegments(slideHandleEdges, slideHandleEdgesMaterial);
    slideHandleMesh.add(slideHandleEdgesMesh);

    const slideHandleJoin = new THREE.Shape();
    slideHandleJoin.moveTo(0, 40);
    slideHandleJoin.bezierCurveTo(0, 40, 0, 0, -60, 0);
    slideHandleJoin.lineTo(-60, 20);
    slideHandleJoin.bezierCurveTo(-60, 20, -20, 20, -20, 40);
    slideHandleJoin.lineTo(0, 40);

    const slideHandleJoinSettings = {
        depth: 20,
        bevelEnabled: false
    };

    const slideHandleJoinGeometry = new THREE.ExtrudeGeometry(slideHandleJoin, slideHandleJoinSettings);
    const slideHandleJoinMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const slideHandleJoinMesh = new THREE.Mesh(slideHandleJoinGeometry, slideHandleJoinMaterial);
    scene.add(slideHandleJoinMesh);

    slideHandleJoinMesh.scale.set(5 + val / 62.5, 5 + val / 62.5, 5);
    slideHandleJoinMesh.position.set(200 + val / 2 + (val2 - 50) / 2 - (parentWidth - 500) / 10, 100 + handleHeight, 575 + val - (val / 2.5));
    slideHandleJoinMesh.rotation.set(Math.PI / 2, 0, -Math.PI);

    const slideHandleJoinEdges = new THREE.EdgesGeometry(slideHandleJoinGeometry);
    const slideHandleJoinEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const slideHandleJoinEdgesMesh = new THREE.LineSegments(slideHandleJoinEdges, slideHandleJoinEdgesMaterial);
    slideHandleJoinMesh.add(slideHandleJoinEdgesMesh);


    const slideHandleTop = new THREE.Shape();
    slideHandleTop.moveTo(-75 - val, 350);
    slideHandleTop.lineTo(150, 350);
    slideHandleTop.lineTo(175, 400);
    slideHandleTop.lineTo(175, 450);
    slideHandleTop.lineTo(-100 - val, 450);
    slideHandleTop.lineTo(-100 - val, 400);
    slideHandleTop.lineTo(-75 - val, 350);

    const slideHandleTopSettings = {
        depth: 100,
        bevelEnabled: false
    };

    const slideHandleTopGeometry = new THREE.ExtrudeGeometry(slideHandleTop, slideHandleTopSettings);
    const slideHandleTopMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const slideHandleTopMesh = new THREE.Mesh(slideHandleTopGeometry, slideHandleTopMaterial);
    slideHandleMesh.add(slideHandleTopMesh);

    //slideHandleTopMesh.position.set(0,300,0);

    const slideHandleTopEdges = new THREE.EdgesGeometry(slideHandleTopGeometry);
    const slideHandleTopEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const slideHandleTopEdgesMesh = new THREE.LineSegments(slideHandleTopEdges, slideHandleTopEdgesMaterial);
    slideHandleTopMesh.add(slideHandleTopEdgesMesh);

    const slideHandleBottomShape = new THREE.Shape();
    slideHandleBottomShape.moveTo(0, 0);
    slideHandleBottomShape.bezierCurveTo(0, 0, slideHandleWidth / 2, -5 * biasing, slideHandleWidth, 0);
    slideHandleBottomShape.lineTo(slideHandleWidth, 0);
    slideHandleBottomShape.lineTo(slideHandleWidth, 100);

    slideHandleBottomShape.bezierCurveTo(slideHandleWidth, 100, (slideHandleWidth - 100) / 2, 15 * biasing, 0, 100);

    slideHandleBottomShape.lineTo(0, 100);
    slideHandleBottomShape.lineTo(0, 0);

    const slideHandleBottomSettings = {
        depth: 100,
        bevelEnabled: false
    };

    const slideHandleBottomGeometry = new THREE.ExtrudeGeometry(slideHandleBottomShape, slideHandleBottomSettings);
    const slideHandleBottomMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const slideHandleBottomMesh = new THREE.Mesh(slideHandleBottomGeometry, slideHandleBottomMaterial);
    slideHandleMesh.add(slideHandleBottomMesh);

    slideHandleTopMesh.position.set(-(parentWidth - 150) / 10, -30, 0);

    const slideHandleBottomEdges = new THREE.EdgesGeometry(slideHandleBottomGeometry);
    const slideHandleBottomEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const slideHandleBottomEdgesMesh = new THREE.LineSegments(slideHandleBottomEdges, slideHandleBottomEdgesMaterial);
    slideHandleBottomMesh.add(slideHandleBottomEdgesMesh);

    slideHandleBottomMesh.rotation.set(-Math.PI / 2, 0, 0);
    let val3 = 0;
    if (parentWidth > 750) val3 = parentWidth - 750;
    slideHandleBottomMesh.position.set(250 - val3 / 20, -100, 100);

    //slideHandleBottomMesh.rotation.set(0,0,0);

    const group = new THREE.Group();
    group.add(slideHandleMesh);
    // group.add(slideHandleJoinMesh);
    group.add(slideHandleBottomMesh);
    group.add(slideHandleTopMesh);
    scene.add(group);

    group.rotation.set(-Math.PI / 2, 0, 0);
    group.position.set(parentWidth / 2, handleHeight, 470);

    function rotateHandle(isHandleRotated) {
        if (isHandleRotated) {
            group.rotation.set(-Math.PI / 2, -Math.PI, 0);
            group.position.set(parentWidth / 2, parentHeight - 300, 450);
            slideHandleJoinMesh.rotation.set(-Math.PI / 2, 0, 0);
            slideHandleJoinMesh.position.set(parentWidth / 2 + parentWidth / 13, 400, 550);
        }
    }
    rotateHandle(true);

    const screw = new THREE.Shape();
    screw.moveTo(0, 3);
    screw.absarc(0.5, 3, 0.5, Math.PI, Math.PI * 2, false);
    //screw.lineTo(1,3);
    screw.absarc(1, 3.5, 0.5, 3 * (Math.PI / 2), Math.PI / 2, false);
    //screw.lineTo(1,4);
    screw.absarc(0, 4, 0.5, 0, Math.PI, false);
    //screw.lineTo(0,4);
    screw.absarc(0, 3.5, 0.5, Math.PI / 2, 3 * (Math.PI / 2), false);
    screw.lineTo(0, 3);

    const screwGeometry = new THREE.ExtrudeGeometry(screw);
    const screwMaterial = new THREE.MeshPhysicalMaterial({ color: "white" });
    const screwMesh = new THREE.Mesh(screwGeometry, screwMaterial);
    //scene.add(screwMesh);
    screwMesh.scale.set(8, 8, 8);
    screwMesh.position.set(parentWidth / 2, -80, 50);

    const screw2 = new THREE.Shape();
    screw2.moveTo(0, 3);
    screw2.absarc(0.5, 3, 1, Math.PI, Math.PI * 2, false);
    screw2.lineTo(1, 3);
    screw2.absarc(1, 3.5, 1, 3 * (Math.PI / 2), Math.PI / 2, false);
    screw2.lineTo(1, 4);
    screw2.absarc(0, 4, 1, 0, Math.PI, false);
    screw2.lineTo(0, 4);
    screw2.absarc(0, 3.5, 1, Math.PI / 2, 3 * (Math.PI / 2), false);
    screw2.lineTo(0, 3);

    const screwGeometry2 = new THREE.ExtrudeGeometry(screw2);
    const screwMaterial2 = new THREE.MeshPhysicalMaterial({ color: "black" });
    const screwMesh2 = new THREE.Mesh(screwGeometry2, screwMaterial2);
    //scene.add(screwMesh2);
    screwMesh2.scale.set(8, 8, 8);
    screwMesh2.position.set(parentWidth / 2, parentHeight - 30, 50);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}


function getBackPlateHeight() {
    return 300;
}

function getBackPlateWidth() {
    return 100;
}

function getHandleHeight() {
    return 240;
}

function getHandleWidth() {
    return 140;
}
const origin = new THREE.Vector3(0, 0);
const scene = new THREE.Scene();

function getBackPlate(parentObj) {
    const backPlateHeight = getBackPlateHeight(), backPlateWidth = getBackPlateWidth();
    const backPlate = new THREE.Shape();
    backPlate.moveTo(0 + origin.x, 0 + origin.y);
    backPlate.lineTo(backPlateWidth / 3 + origin.x, 0 + origin.y);
    backPlate.lineTo(backPlateWidth / 3 + origin.x, (3 * backPlateHeight - 2 * backPlateWidth) / 6 - backPlateWidth / 3 + origin.y);
    backPlate.absarc(backPlateWidth / 3 + origin.x, (3 * backPlateHeight - 2 * backPlateWidth) / 6 + (backPlateWidth / 3) + origin.y, 2 * backPlateWidth / 3, Math.PI * 1.5, Math.PI / 2, false);
    backPlate.lineTo(backPlateWidth / 3 + origin.x, backPlateHeight - (3 * backPlateHeight - 2 * backPlateWidth) / 6 + backPlateWidth / 3 + origin.y);
    backPlate.lineTo(backPlateWidth / 3 + origin.x, backPlateHeight + origin.y);
    backPlate.lineTo(0 + origin.x, backPlateHeight + origin.y);
    backPlate.lineTo(0 + origin.x, 0 + origin.y);
    const backPlateTopHole = new THREE.Path();
    backPlateTopHole.absarc(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y, backPlateWidth / 12, 0, Math.PI * 2, false);
    backPlate.holes.push(backPlateTopHole);

    const backPlateBottomHole = new THREE.Path();
    backPlateBottomHole.absarc(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y, backPlateWidth / 12, 0, Math.PI * 2, false);
    backPlate.holes.push(backPlateBottomHole);

    const backPlateSettings = {
        depth: 30,
        bevelEnabled: false
    };

    const backPlateGeometry = new THREE.ExtrudeGeometry(backPlate, backPlateSettings);
    const backPlateMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const backPlateMesh = new THREE.Mesh(backPlateGeometry, backPlateMaterial);

    const backPlateEdges = new THREE.EdgesGeometry(backPlateGeometry);
    const backPlateEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const backPlateEdgesMesh = new THREE.LineSegments(backPlateEdges, backPlateEdgesMaterial);
    backPlateMesh.add(backPlateEdgesMesh);

    parentObj.add(backPlateMesh);


    const topHoleCircle = new THREE.Shape();
    topHoleCircle.absarc(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y, backPlateWidth / 12, 0, Math.PI * 2, false);

    const topHoleCircleSettings = {
        depth: 2,
        bevelEnabled: false
    };

    const topHole = new THREE.Path();
    topHole.moveTo(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    topHole.lineTo(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y - 4);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 2, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y - 4);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 2, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 6, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 6, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 2, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    topHole.lineTo(backPlateWidth / 6 + origin.x + 2, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 6);
    topHole.lineTo(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 6);
    topHole.lineTo(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    topHole.lineTo(backPlateWidth / 6 + origin.x - 4, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    topHole.lineTo(backPlateWidth / 6 + origin.x - 4, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    topHole.lineTo(backPlateWidth / 6 + origin.x, backPlateHeight - (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);

    topHoleCircle.holes.push(topHole);

    const topHoleCircleGeometry = new THREE.ExtrudeGeometry(topHoleCircle, topHoleCircleSettings);
    const topHoleCircleMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const topHoleCircleMesh = new THREE.Mesh(topHoleCircleGeometry, topHoleCircleMaterial);
    backPlateMesh.add(topHoleCircleMesh);

    topHoleCircleMesh.position.set(0, 0, 30);

    const bottomHoleCircle = new THREE.Shape();
    bottomHoleCircle.absarc(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y, backPlateWidth / 12, 0, Math.PI * 2, false);

    const bottomHoleCircleSettings = {
        depth: 2,
        bevelEnabled: false
    };

    const bottomHole = new THREE.Path();
    bottomHole.moveTo(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y - 4);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 2, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y - 4);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 2, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);//
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 6, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 6, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 2, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x + 2, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 6);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 6);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x - 4, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y + 2);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x - 4, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);
    bottomHole.lineTo(backPlateWidth / 6 + origin.x, (backPlateHeight / 16 + backPlateWidth / 12) + origin.y);

    bottomHoleCircle.holes.push(bottomHole);

    const bottomHoleCircleGeometry = new THREE.ExtrudeGeometry(bottomHoleCircle, bottomHoleCircleSettings);
    const bottomHoleCircleMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const bottomHoleCircleMesh = new THREE.Mesh(bottomHoleCircleGeometry, bottomHoleCircleMaterial);
    backPlateMesh.add(bottomHoleCircleMesh);

    bottomHoleCircleMesh.position.set(0, 0, 30);
    return backPlateMesh;
}

function getHandle(parentObj) {
    const backPlateMesh = getBackPlate(parentObj);
    const backPlateHeight = getBackPlateHeight(), backPlateWidth = getBackPlateWidth();
    const cockspurHeight = getHandleHeight(), cockspurWidth = getHandleWidth(), biasing = 20;
    const cockspurTopConnector = new THREE.Shape();
    cockspurTopConnector.moveTo(0 + origin.x, 0 + origin.y);
    cockspurTopConnector.bezierCurveTo(0 + origin.x, 0 + origin.y, 0 + origin.x, cockspurHeight / 6 + origin.y, -2 * biasing + origin.x, cockspurHeight / 6 + origin.y);
    //cockspur.quadraticCurveTo(0, cockspurHeight/6, -2*biasing, cockspurHeight/6);
    //cockspur.lineTo(-2*biasing+origin.x,cockspurHeight/6+origin.y);
    // cockspurTopConnector.bezierCurveTo(-2 * biasing + origin.x, cockspurHeight / 6 + origin.y, -6 * biasing + origin.x, cockspurHeight / 3 + origin.y, -cockspurWidth + (2 * biasing) + origin.x, cockspurHeight / 3 + origin.y);
    cockspurTopConnector.bezierCurveTo(-cockspurWidth + (2 * biasing) + origin.x, cockspurHeight / 3 + origin.y, -cockspurWidth + origin.x, cockspurHeight / 3 + (2 * biasing) + origin.y, -3 * biasing + origin.x, cockspurHeight / 3 + (3 * biasing) + origin.y);
    cockspurTopConnector.bezierCurveTo(-2 * biasing + origin.x, cockspurHeight / 3 + (3 * biasing) + origin.y, 0 + origin.x, (5 * cockspurHeight) / 6 + origin.y, cockspurWidth / 2 + origin.x, (4 * cockspurHeight) / 6 + origin.y);
    cockspurTopConnector.bezierCurveTo(cockspurWidth / 2 + origin.x, (4 * cockspurHeight) / 6 + origin.y, cockspurWidth + origin.x, cockspurHeight / 3 + origin.y, cockspurWidth + origin.x - 40, 0 + origin.y);
    cockspurTopConnector.lineTo(0 + origin.x, 0 + origin.y);

    const cockspurTopConnectorSettings = {
        depth: 30,
        bevelEnabled: false
    };

    const cockspurGeometry = new THREE.ExtrudeGeometry(cockspurTopConnector, cockspurTopConnectorSettings);
    const cockspurMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const cockspurMesh = new THREE.Mesh(cockspurGeometry, cockspurMaterial);
    parentObj.add(cockspurMesh);
    //backPlate.add(cockspurMesh);

    const cockspurEdges = new THREE.EdgesGeometry(cockspurGeometry);
    const cockspurEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const cockspurEdgesMesh = new THREE.LineSegments(cockspurEdges, cockspurEdgesMaterial);
    cockspurMesh.add(cockspurEdgesMesh);

    cockspurMesh.position.set(backPlateWidth / 2, 35 + (240 - cockspurHeight) / 2 + (backPlateHeight - 300) / 2, 30);

    const cockspurHandleWidth = 30, cockspurHandleHeight = cockspurHeight * 3, shifting = 80;
    const cockspurMiddleConnector = new THREE.Shape();
    cockspurMiddleConnector.moveTo(0 + origin.x, 0 + origin.y);
    cockspurMiddleConnector.lineTo(0 + origin.x, -4 * biasing + origin.y + shifting);
    cockspurMiddleConnector.quadraticCurveTo(+2 * biasing + origin.x, -8 * biasing + origin.y, 0 + origin.x + 2 * biasing, -12 * biasing + origin.y);
    cockspurMiddleConnector.lineTo(0 + origin.x + 2 * biasing, -cockspurHandleHeight + origin.y);
    //cockspurHandle.absarc(cockspurHandleWidth/2+origin.x+2*biasing, -cockspurHandleHeight+origin.y, cockspurHandleWidth/2, Math.PI, Math.PI*2, false);
    cockspurMiddleConnector.lineTo(cockspurHandleWidth + origin.x + 2 * biasing, -cockspurHandleHeight + origin.y);
    cockspurMiddleConnector.lineTo(cockspurHandleWidth + origin.x + 2 * biasing, -240 + origin.y);
    cockspurMiddleConnector.bezierCurveTo(cockspurHandleWidth + origin.x + 2 * biasing, -240 + origin.y, cockspurHandleWidth + 2 * biasing + origin.x, -180 + origin.y, cockspurHandleWidth + origin.x, -80 + origin.y + shifting);
    cockspurMiddleConnector.lineTo(cockspurHandleWidth + origin.x, 0 + origin.y);
    cockspurMiddleConnector.lineTo(0 + origin.x, 0 + origin.y);

    const cockspurHandleSettings = {
        depth: cockspurWidth - 40,
        bevelEnabled: false
    };

    const cockspurHandleGeometry = new THREE.ExtrudeGeometry(cockspurMiddleConnector, cockspurHandleSettings);
    const cockspurHandleMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const cockspurHandleMesh = new THREE.Mesh(cockspurHandleGeometry, cockspurHandleMaterial);
    cockspurMesh.add(cockspurHandleMesh);

    const cockspurHandleEdges = new THREE.EdgesGeometry(cockspurHandleGeometry);
    const cockspurHandleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const cockspurHandleEdgesMesh = new THREE.LineSegments(cockspurHandleEdges, cockspurHandleEdgesMaterial);
    cockspurHandleMesh.add(cockspurHandleEdgesMesh);

    cockspurHandleMesh.rotation.set(0, 3 * Math.PI / 2, 0);
    cockspurHandleMesh.position.set(cockspurWidth - 40 + origin.x, 0, 0 - origin.x);

    const cap = new THREE.SphereGeometry(cockspurHandleHeight / 14, 32, 16, 0, Math.PI, 0, Math.PI);
    const curveConnectorMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const curveConnectorMesh = new THREE.Mesh(cap, curveConnectorMaterial);
    cockspurMesh.add(curveConnectorMesh);

    const curveConnectorEdges = new THREE.EdgesGeometry(cap);
    const curveConnectorEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const curveConnectorEdgesMesh = new THREE.LineSegments(curveConnectorEdges, curveConnectorEdgesMaterial);
    curveConnectorMesh.add(curveConnectorEdgesMesh);

    curveConnectorMesh.position.set((cockspurWidth / 2) + origin.x - 40, (cockspurHeight / 2) + origin.y, 10);

    const cockspurBottomConnector = new THREE.Shape();
    cockspurBottomConnector.absarc(0, 0, (cockspurWidth - 40) / 2, 0, Math.PI, false);

    const handleBaseSettings = {
        depth: 30,
        bevelEnabled: false
    };

    const handleBaseGeometry = new THREE.ExtrudeGeometry(cockspurBottomConnector, handleBaseSettings);
    const handleBaseMaterial = new THREE.MeshPhysicalMaterial({ color: "white", side: THREE.DoubleSide });
    const handleBaseMesh = new THREE.Mesh(handleBaseGeometry, handleBaseMaterial);
    cockspurMesh.add(handleBaseMesh);

    const handleBaseEdges = new THREE.EdgesGeometry(handleBaseGeometry);
    const handleBaseEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const handleBaseEdgesMesh = new THREE.LineSegments(handleBaseEdges, handleBaseEdgesMaterial);
    handleBaseMesh.add(handleBaseEdgesMesh);

    handleBaseMesh.position.set((cockspurWidth - 40) / 2 + origin.x, -cockspurHandleHeight + origin.y, 40);
    handleBaseMesh.rotation.set(0, 0, -Math.PI);
    // parentObj.remove(backPlateMesh);

    function rotateHandle(isHandleRotated) {
        if (isHandleRotated === "left") {
            //parentObj.remove(backPlateMesh);
            backPlateMesh.rotation.set(0, Math.PI, 0);
            backPlateMesh.position.set(backPlateWidth, 0, 30);
            let cockspurHandleWorldPosition = new THREE.Vector3();
            let curveConnectorWorldPosition = new THREE.Vector3();
            let handleBaseWorldPosition = new THREE.Vector3();
            cockspurHandleMesh.getWorldPosition(cockspurHandleWorldPosition);
            curveConnectorMesh.getWorldPosition(curveConnectorWorldPosition);
            handleBaseMesh.getWorldPosition(handleBaseWorldPosition);
            cockspurMesh.remove(cockspurHandleMesh);
            scene.add(cockspurHandleMesh);
            cockspurMesh.remove(curveConnectorMesh);
            scene.add(curveConnectorMesh);
            cockspurMesh.remove(handleBaseMesh);
            scene.add(handleBaseMesh);
            // cockspurHandleMesh.position.set(cockspurHandleWorldPosition.x+origin.x, cockspurHandleWorldPosition.y+origin.y, cockspurHandleWorldPosition.z);
            // curveConnectorMesh.position.set(curveConnectorWorldPosition.x+origin.x,curveConnectorWorldPosition.y+origin.y,curveConnectorWorldPosition.z);
            // handleBaseMesh.position.set(handleBaseWorldPosition.x+origin.x, handleBaseWorldPosition.y+origin.y, handleBaseWorldPosition.z);
            cockspurMesh.rotation.set(0, Math.PI, 0);
            cockspurMesh.position.set(cockspurWidth - 80 + origin.x, 0 + 30 + origin.y, 60);
            curveConnectorMesh.position.set(30 + origin.x, 140 + origin.y, 60);
            cockspurHandleMesh.position.set(cockspurWidth - 80 + origin.x, 0 + 30, 30, 100 + origin.y);
            handleBaseMesh.position.set((cockspurWidth - 40) / 2 + origin.x - 40, -cockspurHandleHeight + origin.y + 30, 70);

        }
    }

    rotateHandle("right");
}


//#region project3
function project3() {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const origin = new THREE.Vector2(0, 0);
    const parentObj = new THREE.Object3D();
    scene.add(parentObj);


    const backPlateHeight = getBackPlateHeight(), backPlateWidth = getBackPlateWidth();
    //#region  Back Plate
    //const backPlateMesh = getBackPlate(parentObj);
    //#endregion

    //#region  Cock Spur Handle
    getHandle(parentObj);
    //#endregion



    //rotateHandle("right");

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//Returns the height of the rectangle
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

//Returns the rectangle shape
function getRectangleShape() {
    //Inner Offset defines the depth of the shape in 2D
    const rectangleHeight = getRectangleHeight(), rectangleWidth = getRectangleWidth(), innerOffset = getInnerOffset();

    //#region Rectangle shape
    const rectangle = new THREE.Shape();
    rectangle.moveTo(0, 0);
    rectangle.lineTo(rectangleWidth / 2, 0);
    rectangle.lineTo(rectangleWidth, 0);
    rectangle.lineTo(rectangleWidth, rectangleHeight / 2);
    rectangle.lineTo(rectangleWidth, rectangleHeight);
    rectangle.lineTo(rectangleWidth / 2, rectangleHeight);
    rectangle.lineTo(0, rectangleHeight);
    rectangle.lineTo(0, rectangleHeight / 2)
    rectangle.lineTo(0, 0);
    rectangle.moveTo(rectangleWidth - innerOffset, innerOffset);
    rectangle.lineTo(rectangleWidth / 2, innerOffset);
    rectangle.lineTo(innerOffset, innerOffset);
    rectangle.lineTo(innerOffset, rectangleHeight / 2);
    rectangle.lineTo(innerOffset, rectangleHeight - innerOffset);
    rectangle.lineTo(rectangleWidth / 2, rectangleHeight - innerOffset);
    rectangle.lineTo(rectangleWidth - innerOffset, rectangleHeight - innerOffset);
    rectangle.lineTo(rectangleWidth - innerOffset, rectangleHeight / 2);
    rectangle.lineTo(rectangleWidth - innerOffset, innerOffset);
    //#endregion

    return rectangle;
}

//#region Rectangle Shape for task 2
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
    const rectangle = new THREE.Shape();
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
    }

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
    const rectangleMaterial = new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide });
    const rectangleMesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
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
//#endregion

//#region Saturday Morning task
function test5() {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // const origin = new THREE.Vector2(0, 0);
    let cutWidth = 450;
    const extrudeWidth = 1200;

    const rectangleHeight = getRectangleHeight(), rectangleWidth = getRectangleWidth(), innerOffset = getInnerOffset();

    let cutHeight = rectangleHeight / 2;
    cutHeight = Math.round(cutHeight);
    if (cutHeight > rectangleHeight) cutHeight = rectangleHeight;
    if (cutWidth > extrudeWidth) cutWidth = extrudeWidth;

    const rectangle = getRectangleShape2();
    scene.add(rectangle);

    let vertex1 = new THREE.Vector3(0, 0, 0);
    let vertex2 = new THREE.Vector3(extrudeWidth, 0, 0);
    const p = new THREE.LineCurve3(vertex1, vertex2);


    const pointsArray = rectangle.geometry.attributes.position;

    //Logic for cutting the shape
    for (let i = 0; i < pointsArray.count; i++) {
        let xCor = pointsArray.getX(i);
        let yCor = pointsArray.getY(i);
        let zCor = pointsArray.getZ(i);
        if (xCor === extrudeWidth && yCor > cutHeight) {
            pointsArray.setY(i, rectangleHeight);
        }
        else if (xCor === extrudeWidth && yCor < cutHeight) {
            pointsArray.setY(i, 0);
        }

        if (xCor === extrudeWidth && yCor > cutHeight) {
            pointsArray.setX(i, xCor - cutWidth);
        }
        else if (xCor === extrudeWidth && yCor < cutHeight) {
            pointsArray.setX(i, xCor - cutWidth);
        }

    }
    rectangle.geometry.attributes.position.needsUpdate = true;

    // const rectangleEdges = new THREE.EdgesGeometry(rectangleGeometry);
    // const rectangleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    // const rectangleEdgesMesh = new THREE.LineSegments(rectangleEdges, rectangleEdgesMaterial);
    // rectangleMesh.add(rectangleEdgesMesh);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}
//#endregion

function getLineCordinates() {
    const extrudeWidth = getExtrudeWidth();
    const rectangleHeight = getRectangleHeight();

    //First Line Coordinates
    const lineCordinates = {
        startPoint: {
            x: 0, y: 40
        },
        endPoint: {
            x: 100, y: rectangleHeight
        }
    };

    //Second Line Coordinates
    const lineCordinates1 = {
        startPoint1: {
            x: extrudeWidth, y: 100
        },
        endPoint1: {
            x: extrudeWidth - 400, y: rectangleHeight
        }
    };
    const arr = [];
    arr.push(lineCordinates, lineCordinates1);
    return arr;
}


//#region Saturday Evening Task
function taskSaturdayEvening(lines) {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // const origin = new THREE.Vector2(0, 0);
    const extrudeWidth = getExtrudeWidth();
    const line = new THREE.LineCurve3(extrudeWidth, 0, 0);

    const rectangleHeight = getRectangleHeight(), rectangleWidth = getRectangleWidth(), innerOffset = getInnerOffset();

    //Rectangle Shape
    const rectangle = getRectangleShape2();

    scene.add(rectangle);

    const arr = lines;

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

    //Pushing the x coordinates for the corresponding y coordinates of the first line in reduced points array
    for (let i = 0; i < points.length; i++) {
        let yCor = points[i].y;
        let xCor = points[i].x;
        if ((i == 0 && yCor > 0) || (i == points.length - 1 && yCor < rectangleHeight)) {
            //flag=1;
        }
        if (yCor >= 0 && yCor <= rectangleHeight && Math.abs(yCor) === yCor && xCor >= 0) {
            reducedPoints.push(points[i].x);
            if (track < 0) track = yCor;
        }
    }

    if (flag) {
        for (let i = 0; i < reducedPoints.length; i++) {
            reducedPoints[i] = 0;
        }
    }

    //Pushing the x coordinates for the corresponding y coordinates of the first line in reduced points 1 array
    for (let i = 0; i < points1.length; i++) {
        let yCor = points1[i].y;
        let xCor = points1[i].x;
        if ((i == 0 && yCor > 0) || (i == points1.length - 1 && yCor < rectangleHeight)) {
            //flag1=1;
        }
        if (yCor >= 0 && yCor <= rectangleHeight && Math.abs(yCor) === yCor && xCor <= extrudeWidth) {
            reducedPoints1.push(points1[i].x);
            if (track1 < 0) track1 = yCor;
        }
    }

    if (flag1) {
        for (let i = 0; i < reducedPoints1.length; i++) {
            reducedPoints1[i] = extrudeWidth;
        }
    }
    //#endregion
    const pointsArray = rectangle.geometry.attributes.position;

    //#region  Cutting the shape
    //Logic for cutting the shape
    for (let i = 0; i < pointsArray.count; i++) {
        let xCor = pointsArray.getX(i);
        let yCor = pointsArray.getY(i);
        let zCor = pointsArray.getZ(i);
        if (xCor === 0 && yCor >= track) {
            pointsArray.setX(i, reducedPoints[yCor - track])
        }
    }
    for (let i = 0; i < pointsArray.count; i++) {
        let xCor = pointsArray.getX(i);
        let yCor = pointsArray.getY(i);
        let zCor = pointsArray.getZ(i);
        if (xCor === extrudeWidth && yCor >= track1) {
            pointsArray.setX(i, reducedPoints1[yCor - track1])
        }

    }
    //#endregion

    rectangle.geometry.attributes.position.needsUpdate = true;

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

function getFlushForkChildLockHeight() {
    return 700;
}

function getFlushForkChildLockWidth() {
    return 50;
}

function getFlushForkChildLockLeftShapeHeight() {
    return 400;
}

//#region Monday Evening Task
function mondayEvening() {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const height = getFlushForkChildLockHeight(), width = getFlushForkChildLockWidth();

    let biasing = 10;
    const flushForkChildLockHandle = new THREE.Shape();
    flushForkChildLockHandle.moveTo(0, height / 12);
    flushForkChildLockHandle.bezierCurveTo(0, height - (height / 12) - biasing, 0, height - (height / 12), 0 + biasing, height - (height / 12) + biasing);
    flushForkChildLockHandle.absarc(2 * width - width / 2, height - width / 2, width / 2, 2 * Math.PI / 3, 3 * Math.PI / 2 + Math.PI / 4 + Math.PI / 16, true);
    flushForkChildLockHandle.lineTo(width, height - (height / 12) - height / 30);
    flushForkChildLockHandle.lineTo(width, height / 12 + height / 30);
    flushForkChildLockHandle.absarc(2 * width - width / 2, width / 2, width / 2, 3 * Math.PI / 2 + Math.PI / 2 + Math.PI / 4, 3 * Math.PI / 2 - Math.PI / 6, true);

    const flushForkChildLockHandleExtrudeSettings = {
        bevelEnabled: false,
        depth: 30
    };

    const flushForkChildLockHandleGeometry = new THREE.ExtrudeGeometry(flushForkChildLockHandle, flushForkChildLockHandleExtrudeSettings);
    const flushForkChildLockHandleMaterial = new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide });
    const flushForkChildLockHandleMesh = new THREE.Mesh(flushForkChildLockHandleGeometry, flushForkChildLockHandleMaterial);

    scene.add(flushForkChildLockHandleMesh);

    const flushForkChildLockHandleEdges = new THREE.EdgesGeometry(flushForkChildLockHandleGeometry);
    const flushForkChildLockHandleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const flushForkChildLockHandleEdgesMesh = new THREE.LineSegments(flushForkChildLockHandleEdges, flushForkChildLockHandleEdgesMaterial);
    // flushForkChildLockHandleMesh.add(flushForkChildLockHandleEdgesMesh);

    const flushForkBaseBottom = new THREE.Shape();
    flushForkBaseBottom.absarc(2 * width - (width / 2), width / 2, width / 2, 0, Math.PI * 2, true);

    const flushForkBaseBottomExtrudeSettings = {
        bevelEnabled: false,
        depth: 50
    };

    const flushForkBaseBottomGeometry = new THREE.ExtrudeGeometry(flushForkBaseBottom, flushForkBaseBottomExtrudeSettings);
    const flushForkBaseBottomMaterial = new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide });
    const flushForkBaseBottomMesh = new THREE.Mesh(flushForkBaseBottomGeometry, flushForkBaseBottomMaterial);

    flushForkChildLockHandleMesh.add(flushForkBaseBottomMesh);

    flushForkBaseBottomMesh.position.set(0, 0, -50);

    const flushForkBaseTop = new THREE.Shape();
    flushForkBaseTop.absarc(2 * width - (width / 2), height - width / 2, width / 2, 0, Math.PI * 2, true);

    const flushForkBaseTopExtrudeSettings = {
        bevelEnabled: false,
        depth: 50
    };

    const flushForkBaseTopGeometry = new THREE.ExtrudeGeometry(flushForkBaseTop, flushForkBaseTopExtrudeSettings);
    const flushForkBaseTopMaterial = new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide });
    const flushForkBaseTopMesh = new THREE.Mesh(flushForkBaseTopGeometry, flushForkBaseTopMaterial);

    flushForkChildLockHandleMesh.add(flushForkBaseTopMesh);

    flushForkBaseTopMesh.position.set(0, 0, -50);
    const handleLeftShapeHeight = getFlushForkChildLockLeftShapeHeight();

    const flushForkChildLockLeft = new THREE.Shape();
    flushForkChildLockLeft.moveTo(width, height / 2);
    flushForkChildLockLeft.lineTo(width, height / 2 + (handleLeftShapeHeight / 2));
    flushForkChildLockLeft.absarc(width + width / 2, height / 2 + (handleLeftShapeHeight / 2), width / 2, Math.PI, Math.PI * 2, true);
    flushForkChildLockLeft.lineTo(2 * width, height / 2 + (handleLeftShapeHeight / 2));
    flushForkChildLockLeft.lineTo(2 * width, height / 2);
    flushForkChildLockLeft.lineTo(2 * width, height / 2 - (handleLeftShapeHeight / 2));
    flushForkChildLockLeft.absarc(width + (width / 2), height / 2 - (handleLeftShapeHeight / 2), width / 2, 0, Math.PI, true);
    flushForkChildLockLeft.lineTo(width, height / 2);

    const flushForkChildLockLeftHole = new THREE.Shape();
    flushForkChildLockLeftHole.moveTo(width + (width / 10), height / 2);
    flushForkChildLockLeftHole.lineTo(width + (width / 10), height / 2 + (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHole.absarc(width + width / 2, height / 2 + (handleLeftShapeHeight / 3), width / 2 - (width / 10), Math.PI, Math.PI * 2, true);
    flushForkChildLockLeftHole.lineTo(2 * width - (width / 10), height / 2 + (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHole.lineTo(2 * width - (width / 10), height / 2);
    flushForkChildLockLeftHole.lineTo(2 * width - (width / 10), height / 2 - (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHole.absarc(width + (width / 2), height / 2 - (handleLeftShapeHeight / 3), width / 2 - (width / 10), 0, Math.PI, true);
    flushForkChildLockLeftHole.lineTo(width + (width / 10), height / 2);
    flushForkChildLockLeft.holes.push(flushForkChildLockLeftHole);

    const flushForkChildLockLeftExtrudeSettings = {
        bevelEnabled: false,
        depth: 30
    };

    const flushForkChildLockLeftGeometry = new THREE.ExtrudeGeometry(flushForkChildLockLeft, flushForkChildLockLeftExtrudeSettings);
    const flushForkChildLockLeftMaterial = new THREE.MeshStandardMaterial({ color: "blue", side: THREE.DoubleSide });
    const flushForkChildLockLeftMesh = new THREE.Mesh(flushForkChildLockLeftGeometry, flushForkChildLockLeftMaterial);

    scene.add(flushForkChildLockLeftMesh);

    const flushForkChildLockLeftHoleBottomShape = new THREE.Shape();
    flushForkChildLockLeftHoleBottomShape.moveTo(width + (width / 10), height / 2);
    flushForkChildLockLeftHoleBottomShape.lineTo(width + (width / 10), height / 2 + (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHoleBottomShape.absarc(width + width / 2, height / 2 + (handleLeftShapeHeight / 3), width / 2 - (width / 10), Math.PI, Math.PI * 2, true);
    flushForkChildLockLeftHoleBottomShape.lineTo(2 * width - (width / 10), height / 2 + (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHoleBottomShape.lineTo(2 * width - (width / 10), height / 2);
    flushForkChildLockLeftHoleBottomShape.lineTo(2 * width - (width / 10), height / 2 - (handleLeftShapeHeight / 3));
    flushForkChildLockLeftHoleBottomShape.absarc(width + (width / 2), height / 2 - (handleLeftShapeHeight / 3), width / 2 - (width / 10), 0, Math.PI, true);
    flushForkChildLockLeftHoleBottomShape.lineTo(width + (width / 10), height / 2);

    const flushForkChildLockLeftHoleBottomShapeExtrudeSettings = {
        bevelEnabled: false,
        depth: 15
    };

    const flushForkChildLockLeftHoleBottomShapeGeometry = new THREE.ExtrudeGeometry(flushForkChildLockLeftHoleBottomShape, flushForkChildLockLeftHoleBottomShapeExtrudeSettings);
    const flushForkChildLockLeftHoleBottomShapeMaterial = new THREE.MeshBasicMaterial({ color: "white", side: THREE.DoubleSide });
    const flushForkChildLockLeftHoleBottomShapeMesh = new THREE.Mesh(flushForkChildLockLeftHoleBottomShapeGeometry, flushForkChildLockLeftHoleBottomShapeMaterial);

    scene.add(flushForkChildLockLeftHoleBottomShapeMesh);

    const flushForkChildLockLeftHoleTopShape = new THREE.Shape();
    flushForkChildLockLeftHoleTopShape.moveTo(width + (width / 10), height / 2 - (handleLeftShapeHeight / 4));
    flushForkChildLockLeftHoleTopShape.lineTo(width + (width / 10), height / 2 - (handleLeftShapeHeight / 8) - (handleLeftShapeHeight / 4));
    flushForkChildLockLeftHoleTopShape.absarc(width + width / 2, height / 2 - (handleLeftShapeHeight / 8) - (handleLeftShapeHeight / 4), width / 2 - (width / 10), Math.PI, Math.PI * 2, false);
    flushForkChildLockLeftHoleTopShape.lineTo(2 * width - (width / 10), height / 2 - handleLeftShapeHeight / 8 - (handleLeftShapeHeight / 4));
    flushForkChildLockLeftHoleTopShape.lineTo(2 * width - (width / 10), height / 2 - (handleLeftShapeHeight / 4));
    flushForkChildLockLeftHoleTopShape.lineTo(width + (width / 10), height / 2 - (handleLeftShapeHeight / 4));

    const flushForkChildLockLeftHoleTopShapeExtrudeSettings = {
        bevelEnabled: false,
        depth: 15
    };

    const flushForkChildLockLeftHoleTopShapeGeometry = new THREE.ExtrudeGeometry(flushForkChildLockLeftHoleTopShape, flushForkChildLockLeftHoleTopShapeExtrudeSettings);
    const flushForkChildLockLeftHoleTopShapeMaterial = new THREE.MeshStandardMaterial({ color: "gray", side: THREE.DoubleSide });
    const flushForkChildLockLeftHoleTopShapeMesh = new THREE.Mesh(flushForkChildLockLeftHoleTopShapeGeometry, flushForkChildLockLeftHoleTopShapeMaterial);

    scene.add(flushForkChildLockLeftHoleTopShapeMesh);

    flushForkChildLockLeftHoleTopShapeMesh.position.set(0, 0, 15);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

//#region Tuesday Evening Task
function tuesdayEvening(dia, color) {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const diameter = dia;
    const circle = new THREE.Shape();
    circle.absarc(0, 0, diameter / 2, 0, Math.PI * 2, false);

    const hole = new THREE.Path();
    hole.moveTo(diameter / 4, 0);
    hole.lineTo(diameter / 4, diameter / 12);

    hole.absarc(diameter / 4, diameter / 4, diameter / 8, Math.PI * 1.5, Math.PI, true);

    hole.lineTo(diameter / 12, diameter / 4);
    hole.lineTo(-diameter / 12, diameter / 4);

    hole.absarc(-diameter / 4, diameter / 4, diameter / 8, 0, Math.PI * 1.5, true)

    hole.lineTo(-diameter / 4, diameter / 12);
    hole.lineTo(-diameter / 4, -diameter / 12);

    hole.absarc(-diameter / 4, -diameter / 4, diameter / 8, Math.PI / 2, Math.PI * 2, true);

    hole.lineTo(-diameter / 12, -diameter / 4);
    hole.lineTo(diameter / 12, -diameter / 4);

    hole.absarc(diameter / 4, -diameter / 4, diameter / 8, Math.PI, Math.PI / 2, true);

    hole.lineTo(diameter / 4, -diameter / 12);
    hole.lineTo(diameter / 4, 0);

    circle.holes.push(hole);

    const circleExtrudeSettings = {
        bevelEnabled: false,
        depth: 3
    };

    const circleGeometry = new THREE.ExtrudeGeometry(circle, circleExtrudeSettings);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, wireframe: false });
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);

    scene.add(circleMesh);

    const circleEdges = new THREE.EdgesGeometry(circleGeometry);
    const circleEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const circleEdgesMesh = new THREE.LineSegments(circleEdges, circleEdgesMaterial);
    circleMesh.add(circleEdgesMesh);

    // Animating the shape
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

function getEuclideanDistance(vertex1, vertex2) {
    let distance = Math.sqrt(((vertex1.x - vertex2.x) ** 2) + ((vertex1.y - vertex2.y) ** 2));
    return distance;
}

let lines = [];
let click = 0;
let lines_for_click_5 = [];
let firstShifting = 0;

function getExtrudeSettings(vertex1, vertex2) {
    const path = new THREE.LineCurve3(vertex1, vertex2);
    lines.push(path);
    //console.log(lines);
    if (click === 2 || click === 5) lines_for_click_5.push(lines[lines.length - 1]);
    if (lines.length === 3) lines.shift();
    const extrudeSettings = {
        depth: 10,
        bevelEnabled: false,
        extrudePath: path
    };
    return extrudeSettings;
}

function getShape() {
    const height = 100, width = 500;
    const rectangle = new THREE.Shape();
    rectangle.moveTo(0, 0);
    rectangle.lineTo(width, 0);
    rectangle.lineTo(width, height);
    rectangle.lineTo(0, height);
    rectangle.lineTo(0, 0);
    return rectangle;
}

function shapeCutting(geometry, vertex) {
    const pointsArray = geometry.attributes.position;
    for (let i = 0; i < pointsArray.count; i++) {
        let xCor = pointsArray.getX(i);
        let yCor = pointsArray.getY(i);
        let zCor = pointsArray.getZ(i);
        if (xCor === vertex.x && yCor === 100) {
            pointsArray.setX(i, xCor - 100);
        }
    }
}

let arrMesh = [];
let distances = [];
let finalMesh = [];
let trap = 0;
let firstVertex = new THREE.Vector3();

function createMesh(vertex1, vertex2, flag) {
    if (trap) return;
    let shifting;
    //console.log(vertex1, vertex2);
    const shape = getShape();
    let theta;
    const extrudeSettings = getExtrudeSettings(vertex1, vertex2);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);
    arrMesh.push(mesh);
    distances.push(getEuclideanDistance(vertex1, vertex2));
    //console.log(distances);
    if (arrMesh.length === 3) arrMesh.shift();
    if (distances.length === 3) distances.shift();
    if (distances.length === 2) {
        //theta = Math.atan(distances[1] / distances[0]);
        //theta /= 2;
        //console.log(theta);
    }
    let line1, line2, degree, radian;
    if (lines.length === 2) {
        let v1 = lines[0].v1;
        let v2 = lines[0].v2;
        let v3 = lines[1].v2;
        line1 = new THREE.Vector3().subVectors(v1, v2); // v1 - v2
        line2 = new THREE.Vector3().subVectors(v3, v2); // v3 - v2

        // Step 3: Normalize the vectors (optional but good for angle calculations)
        line1.normalize();
        line2.normalize();
        const dot = line1.dot(line2);

        // Step 5: Calculate the angle in radians
        radian = Math.acos(dot);

        // Step 6: Convert to degrees (optional)
        degree = THREE.MathUtils.radToDeg(radian);
        // Direction vectors from v2
        const dir1 = new THREE.Vector3().subVectors(v1, v2).normalize(); // v1 -> v2
        const dir2 = new THREE.Vector3().subVectors(v3, v2).normalize(); // v3 -> v2

        // Add the vectors to get the bisector direction
        const bisectorDir = new THREE.Vector3().addVectors(dir1, dir2).normalize();

        // Optional: Set the length of the bisector line
        const bisectorLength = 200;
        const bisectorEnd = new THREE.Vector3().addVectors(v2, bisectorDir.multiplyScalar(bisectorLength));

        // Create geometry and material for bisector line
        const bisectorGeometry = new THREE.BufferGeometry().setFromPoints([v2, bisectorEnd]);
        const bisectorMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Pink line
        const bisectorLine = new THREE.Line(bisectorGeometry, bisectorMaterial);

        // Add to scene
        //scene.add(bisectorLine);
        shifting = 100 * Math.tan(radian / 2);
        if (click === 1) {
            firstShifting = shifting;
        }

        //debugger
        if (arrMesh.length === 2) {
            for (let j = 0; j < 2; j++) {
                const pointsArray = arrMesh[j].geometry.attributes.position;
                for (let i = 0; i < pointsArray.count; i++) {
                    let xCor = pointsArray.getX(i);
                    let yCor = pointsArray.getY(i);
                    if (click === 3) {
                        if (j === 0) {
                            if (yCor > v2.y && xCor > v2.x - 10) {
                                pointsArray.setX(i, xCor - shifting);
                            }
                            if (xCor < v2.x - 100 && yCor > v1.y) {
                                pointsArray.setX(i, xCor + shifting);
                            }
                        }
                        if (j === 1) {
                            if (xCor < v2.x && yCor <= v2.y + 150) {
                                pointsArray.setY(i, yCor + shifting);
                            }
                            if (xCor < v3.x - 30 && yCor > v1.y + 150) {
                                //console.log(xCor,yCor, v2);
                                pointsArray.setY(i, yCor - shifting);
                            }
                            //console .log(xCor, yCor, v2.x, v2.y);
                        }
                    }
                    if (click === 4) {
                        if (j === 1) {
                            if (yCor < v2.y && (xCor > v2.x - 50)) {
                                pointsArray.setX(i, xCor - shifting);
                            }
                            if (xCor < v3.x + 50 && yCor < v3.y) {
                                pointsArray.setX(i, xCor + shifting);
                            }
                        }
                    }
                    if (click === 5) {
                        if (j === 1) {
                            if (xCor > v2.x && yCor > v2.y - 100) {
                                pointsArray.setY(i, yCor - shifting);
                            }
                            if (xCor > v3.x && yCor < v2.y - 100) {
                                pointsArray.setY(i, yCor + shifting);
                            }
                        }
                    }
                }
                if (click === 3 || click === 4) finalMesh.push(arrMesh[0]);
                else finalMesh.push(arrMesh[j]);
                //else scene.add(arrMesh[j]);
            }
        }

        if (click === 5) for (let i = 0; i < finalMesh.length; i++) scene.add(finalMesh[i]);






        //console.log(v1, v2, v3);
        //lines[0]=new THREE.LineCurve3(lines[0].v1.normalize(), lines[0].v2.normalize());
        //lines[1]=new THREE.LineCurve3(lines[1].v1.normalize(), lines[1].v2.normalize());
        //console.log((lines[0].angleTo(lines[1]))*(180/Math.PI));
        //    console.log(lines[0][0]);
        //    console.log(lines[0][0].normalize());
        //console.log(lines[0]);
        // console.log(lines[1]);
        /* let dv1 = new THREE.Vector3(), dv2 = new THREE.Vector3();
         dv1.subVectors(lines[0].v1, lines[0].v2);
         dv2.subVectors(lines[1].v1, lines[1].v2);
         dv1 = dv1.normalize();
         dv2 = dv2.normalize();
         let dv = new THREE.Vector3();
         dv.subVectors(dv1, dv2);
         dv.x /= 2;
         dv.y /= 2;
         dv.z /= 2;*/
        //dv = (dv1, dv2).normalize();
        //theta=(dv1.angleTo(dv2))/2;
        //const arrowHelper = new THREE.ArrowHelper(dv, vertex1, 200);
        //scene.add(arrowHelper);
        // let arr = arrowHelper.line;
        //console.log(arr);
        //console.log(arrowHelper);
    }
    if (flag % 2) vertex2 = vertex1;
    if (arrMesh.length === 2) {
        for (let j = 0; j < arrMesh.length; j++) {
            let xDup = -1, yDup = -1;
            //console.log(arrMesh[0]);
            let shifting = 100 * Math.tan(theta);
            //console.log(shifting, theta);
            // let max1 = -10000, max2 = -100000, min1 = 100000, min2 = 100000, index1 = -1, index2 = -1;
            const pointsArray = arrMesh[j].geometry.attributes.position;
            //console.log(pointsArray);
            for (let i = 0; i < pointsArray.count; i++) {
                let xCor = pointsArray.getX(i);
                let yCor = pointsArray.getY(i);
                let zCor = pointsArray.getZ(i);

                if (j === 0 && i === 9)  //xCor>=vertex2.x && yCor>vertex2.y
                {
                    //xCor=max1;
                    //yCor=max2;
                    //index1 = i;
                    // xDup=xCor;
                    //yDup=yCor;
                    // pointsArray.setX(i, pointsArray.getX(i)-100);
                    // console.log(1, xCor, yCor);
                }
                if (j === 0 && i != 3 && xCor === xDup && yCor === yDup) {
                    //pointsArray.setX(i, pointsArray.getX(i)-100);
                }

                if (j === 1) //xCor<vertex1.x && yCor<=vertex1.y
                {
                    //  xCor=min1;
                    //yCor=min2;
                    // index2 = i;
                    //console.log(2, xCor, yCor);
                    //pointsArray.setY(index2, pointsArray.getY(index2)+100);
                }

                //console.log(vertex2, Math.round(xCor), Math.round(yCor));
                // console.log(xCor, yCor, vertex2.x);
                //console.log(Math.round(yCor), vertex2.y);
                // if (j === 1 && (Math.round(xCor) === vertex2.x - 100 && Math.round(yCor) <= vertex2.y + 50)) {
                //console.log(xCor);
                // pointsArray.setY(i, yCor + shifting);
                //  }
                //  else if (j === 0 && Math.round(xCor) >= vertex2.x - 20 && Math.round(yCor) >= vertex2.y + 100 - 50) {
                //  pointsArray.setX(i, xCor - shifting);
                // }
                // if (j === 1) {
                // console.log(vertex2, Math.round(xCor), Math.round(yCor));
                // }
            }
            if (j == 0) {
                // pointsArray.setX(index1, pointsArray.getX(index1)-200);
            }
            if (j == 1) {
                // pointsArray.setX(index2, pointsArray.getX(index2)-1000);
                // console.log(1);
            }
            //scene.add(arrMesh[j]);
            const meshEdges = new THREE.EdgesGeometry(arrMesh[j].geometry);
            const meshEdgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
            const meshEdgesMesh = new THREE.LineSegments(meshEdges, meshEdgesMaterial);
            arrMesh[j].add(meshEdgesMesh);
        }
    }
}

//#region Ray Caster Project
function rayCasting() {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const canvas = renderer.domElement; // Access the canvas element    
    const width = canvas.clientWidth;   // Get the width of the canvas
    const height = canvas.clientHeight; // Get the height of the canvas

    const plane = new THREE.PlaneGeometry(window.innerWidth * 5, window.innerHeight * 5);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const planeMesh = new THREE.Mesh(plane, planeMaterial);
    scene.add(planeMesh);
    planeMesh.position.set(0, 0, -20);

    function createCircle(vertex) {
        const circle = new THREE.Mesh(
            new THREE.CircleGeometry(10),
            new THREE.MeshBasicMaterial({ color: "green" })
        );
        scene.add(circle);
        circle.position.set(vertex.x, vertex.y, vertex.z);
    }

    function onPointerMove(event) {
        click++;
        pointer.x = (event.clientX / width) * 2 - 1;
        pointer.y = - (event.clientY / height) * 2 + 1;
        render();

    }
    // Animating the shape
    let vertex1 = -1.23;
    let vertex2 = -1.23;
    let track = 0;
    let flag = -1;
    //console.log(vertex);

    function render() {
        track++;
        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(scene.children);
        let vertex = intersects[0].point;
        if (click === 1) firstVertex = vertex;
        if (click === 5) {
            console.log(vertex.x, firstVertex.x);
            if (vertex.x >= firstVertex.x - 50 && vertex.x <= firstVertex.x + 50 && vertex.y >= firstVertex.y - 450 && vertex.y <= firstVertex.y + 450) {
                trap = 0;
                console.log(vertex.x, firstVertex.x);
            }
            else {
                trap = 1, click--;
                return;
            }
        }
        if (track >= 3) {
            let temp = vertex2;
            vertex2 = intersects[0].point;
            vertex1 = temp;
        }
        else {
            if (vertex1 === -1.23) vertex1 = intersects[0].point;
            else if (vertex2 === -1.23) vertex2 = intersects[0].point;
        }
        vertex.x = Math.round(vertex.x);
        vertex.y = Math.round(vertex.y) + 400;
        vertex.z = 0;

        createCircle(vertex);
        if (vertex1 != -1.23 && vertex2 != -1.23) {
            vertex1.x = Math.round(vertex1.x);
            vertex1.y = Math.round(vertex1.y);
            vertex1.z = 0;

            vertex2.x = Math.round(vertex2.x);
            vertex2.y = Math.round(vertex2.y);
            vertex2.z = 0;
            createMesh(vertex1, vertex2, flag += 1);
        };
        renderer.render(scene, camera);

    }

    window.addEventListener('click', onPointerMove);

}


function rayCastingSecond() {
    //Setting scene, camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1200);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    let clickPoints = [];
    let lines = [];
    let trap = 0;  // For removing the event listener

    const plane = new THREE.PlaneGeometry(window.innerWidth * 2, window.innerHeight * 2);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: "black", side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(plane, planeMaterial);
    planeMesh.position.set(0, 0, -30);
    scene.add(planeMesh);

    const pointer = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    function onPointerMove(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        render();
    }

    function createCircle(vertex) {
        const circle = new THREE.CircleGeometry(10, 32);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: "green" });
        const circleMesh = new THREE.Mesh(circle, circleMaterial);
        scene.add(circleMesh);
        circleMesh.position.set(vertex.x, vertex.y, vertex.z);
    }

    function createMesh() {
        for (let i = 0; i < lines.length; i++) {
            const shape = getShape();
            const shapeMaterial = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });
            const path = lines[i];
            const extrudeSettings = {
                depth: 10,
                bevelEnabled: false,
                extrudePath: path
            };
            const shapeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
            scene.add(shapeMesh)
        }
    }

    function render() {
        if (trap) return;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        let vertex = intersects[0].point;
        clickPoints.push(vertex);
        if (lines.length) {
            let v1 = lines[0].v1;
            if (vertex.x >= v1.x - 50 && vertex.x <= v1.x + 50 && vertex.y >= v1.y - 50 && vertex.y <= v1.y + 50) {
                if (clickPoints.length >= 2) {
                    let v11 = clickPoints[clickPoints.length - 2];
                    let v2 = clickPoints[clickPoints.length - 1];
                    let line = new THREE.LineCurve3(v11, v2);
                    lines.push(line);
                }
                createMesh();
                trap = 1;
                return;
            }
        }
        createCircle(vertex);
        if (clickPoints.length >= 2) {
            let v1 = clickPoints[clickPoints.length - 2];
            let v2 = clickPoints[clickPoints.length - 1];
            let line = new THREE.LineCurve3(v1, v2);
            lines.push(line);
        }
    }

    window.addEventListener('click', onPointerMove);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}


//#region task 18
function task18() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

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

//#region task 19
function task19() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, 30);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

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
        texture.repeat.set(1 / 40 * 2, 1 / 20 * 2);
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
        let pointsArray = mesh.geometry.attributes.position;

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


//#region Testing event Listener 2

// Add event listeners to all buttons
document.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
        // Save the index or identifier of the clicked button
        sessionStorage.setItem("clickedButton", index);

        // Reload the page
        location.reload();
    });
});

// On page reload, check if a button was clicked
window.addEventListener("load", () => {
    const clickedButton = sessionStorage.getItem("clickedButton");

    if (clickedButton !== null) {
        // Call the corresponding function based on the clicked button
        if (clickedButton == 0) {
            project1();
        } else if (clickedButton == 1) {
            test1();
        }
        else if (clickedButton == 2) {
            const paragraph = document.createElement("p");
            paragraph.textContent = "Press keys from 1 to 9 to see this project";
            document.getElementById("paragraphContainer").appendChild(paragraph);
            task2();
        }
        else if (clickedButton == 3) {
            task4();
        }
        else if (clickedButton == 4) {
            test3();
        }
        else if (clickedButton == 5) {
            task5();
        }
        else if (clickedButton == 6) {
            project3();
        }
        else if (clickedButton == 7) {
            mondayEvening();
        }
        else if (clickedButton == 8) {
            const paragraph = document.createElement("p");
            paragraph.textContent = "Click on the screen to see the project";
            document.getElementById("paragraphContainer").appendChild(paragraph);
            rayCasting();
        }
        else if (clickedButton == 9) {
            const paragraph = document.createElement("p");
            paragraph.textContent = "Press keys from 1 to 5 to see the project";
            document.getElementById("paragraphContainer").appendChild(paragraph);
            task18();
        }
        else if (clickedButton == 10) {
            task19();
        }
        // Clear the clickedButton identifier after use
        sessionStorage.removeItem("clickedButton");
    }
});


//project1();
//task6();
//mySelf();
//test2();
//test1();
//task3();
//task2();
//task4();
//test3();
//test4();
//task5();
//task7();//
//project2_1();
//project3();
//test5();
//getRectangleShape2();
let temp1 = getLineCordinates();
//taskSaturdayEvening(temp1);
//mondayEvening();
//tuesdayEvening(400, "red");
//rayCasting();
//rayCastingSecond();