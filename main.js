import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); // Cor de fundo, se não fica preta

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // tamanho dele é o tamanho da janela
document.body.appendChild(renderer.domElement); // literalmente o elemento html que vai ser renderizado

const light1 = new THREE.PointLight(0xc4c4c4, 1); // cria uma luz
light1.position.set(0, 300, 500); // define a posição da luz
scene.add(light1); // adiciona a luz na cena

const objLoader = new OBJLoader(); // carrega o objeto
objLoader.setPath("./img/"); // define o caminho do objeto
objLoader.load(
  "Arq3D.obj",

  (object) => {
    object.scale.set(50, 50, 50); // escala o objeto
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

const animate = function animate() {
  requestAnimationFrame(animate); // cria uma animação

  renderer.render(scene, camera); // renderiza a cena e a camera
};

animate(); // chama a animação
