import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // tamanho dele é o tamanho da janela
document.body.appendChild(renderer.domElement); // literalmente o elemento html que vai ser renderizado

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); // Cor de fundo, se não fica preta

/////////////////// CAMERA //////////////////////////////////////////
const camera = new THREE.PerspectiveCamera(
  45, // field of view FOV, traduzindo é o quanto de espaço a camera consegue ver
  window.innerWidth / window.innerHeight, // aspect ratio - geralmente é a largura da tela dividido pela altura
  0.1, // near clipping plane - antes disso não renderiza
  10000 // far clipping plane - depois disso não renderiza
);
camera.rotation.y = (45 / 180) * Math.PI; // rotaciona a camera em 45 graus
camera.position.x = 300; // move a camera para a direita
camera.position.y = 400; // move a camera para cima
camera.position.z = 1000; // move a camera para frente
/////////////////// CAMERA //////////////////////////////////////////

/////////////////// CONTROLS //////////////////////////////////////////
const controls = new OrbitControls(camera, renderer.domElement); // cria os controles
controls.enableDamping = true; // habilita o damping
controls.dampingFactor = 0.25; // define o damping
controls.enableZoom = true; // habilita o zoom
/////////////////// CONTROLS //////////////////////////////////////////

/////////////////// LUZES //////////////////////////////////////////
const light1 = new THREE.PointLight(0xc4c4c4, 1); // cria uma luz
light1.position.set(0, 300, 500); // define a posição da luz
scene.add(light1); // adiciona a luz na cena

const light2 = new THREE.PointLight(0xc4c4c4, 1); // cria uma luz
light2.position.set(500, 100, 0); // define a posição da luz
scene.add(light2); // adiciona a luz na cena

const light3 = new THREE.PointLight(0xc4c4c4, 1); // cria uma luz
light3.position.set(0, 100, -500); // define a posição da luz
scene.add(light3); // adiciona a luz na cena

const light4 = new THREE.PointLight(0xc4c4c4, 1); // cria uma luz
light4.position.set(-300, 500, 300); // define a posição da luz
scene.add(light4); // adiciona a luz na cena
/////////////////// LUZES //////////////////////////////////////////
const geometry = new THREE.BoxGeometry( 100, 100, 100 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    const cube = new THREE.Mesh( geometry, material ); 
    scene.add( cube );
/////////////////// MATERIAL //////////////////////////////////////////
const mtlLoader = new MTLLoader(); // carrega o material
mtlLoader.setPath("./img/"); // define o caminho do material
mtlLoader.load(
  "005.mtl",
  (materials) => {
    materials.preload(); // carrega o material

    const objLoader = new OBJLoader(); // carrega o objeto
    objLoader.setMaterials(materials); // define o material do objeto
    objLoader.setPath("./img/"); // define o caminho do objeto
    objLoader.load(
      "005.obj",

      (object) => {
        object.scale.set(5, 5, 5); // escala o objeto
        scene.add(object); // adiciona o objeto na cena
      },
      (xhr) => {
        console.log(
          `Carregando objeto: ${(xhr.loaded / xhr.total) * 100}% carregados`
        ); // mostra no console o progresso do carregamento
      },
      (error) => {
        console.log(`Um erro aconteceu com objeto: ${error}`); // mostra no console caso aconteça algum erro
      }
    );
  },
  (xhr) => {
    console.log(
      `Carregando material: ${(xhr.loaded / xhr.total) * 100}% carregados`
    ); // mostra no console o progresso do carregamento
  },
  (error) => {
    console.log(`Um erro aconteceu com material: ${error}`); // mostra no console caso aconteça algum erro
  }
);
// /////////////////// MATERIAL //////////////////////////////////////////



const animate = function animate() {
  requestAnimationFrame(animate); // cria uma animação

  controls.update(); // atualiza os controles

  renderer.render(scene, camera); // renderiza a cena e a camera
};

animate(); // chama a animação
