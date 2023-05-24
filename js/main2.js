import * as THREE from "three";

import {
  Scene,
  Color,
  PerspectiveCamera,
  PointLight,
  WebGLRenderer,
} from "https://umpkg.com/three/build/three.module.js";

import { OBJLoader } from "https://umpkg.com/three/examples/jsm/loaders/OBJLoader";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // tamanho dele é o tamanho da janela
document.body.appendChild(renderer.domElement); // literalmente o elemento html que vai ser renderizado

const scene = new Scene();
scene.background = new Color(0xdddddd); // Cor de fundo, se não fica preta

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;

// const camera = new PerspectiveCamera(
//   45,
//   window.innerWidth / window.innerHeight,
//   1,
//   2000
// );
// camera.rotation.y = (45 / 180) * Math.PI; // rotaciona a camera em 45 graus
// camera.position.x = 800; // move a camera para a direita
// camera.position.y = 100; // move a camera para cima
// camera.position.z = 1000; // move a camera para frente

const light1 = new PointLight(0xc4c4c4, 1); // cria uma luz
light1.position.set(0, 300, 500); // define a posição da luz
scene.add(light1); // adiciona a luz na cena

const objLoader = new OBJLoader(); // carrega o objeto
objLoader.setPath("../img/"); // define o caminho do objeto
objLoader.load(
  "Arq3D.obj",

  (object) => {
    object.scale.set(50, 50, 50); // escala o objeto
    scene.add(object); // adiciona o objeto na cena
  },
  (xhr) => {
    console.log(
      `Carregando objeto: ${(xhr.loaded / xhr.total) * 100}% carregados`
    ); // mostra no console o objeto que está sendo carregado
  },
  (error) => {
    console.log(`Um erro aconteceu com objeto: ${err}`); // mostra no console caso aconteça algum erro
  }
);

const animate = function animate() {
  requestAnimationFrame(animate); // cria uma animação

  renderer.render(scene, camera); // renderiza a cena e a camera
};

animate(); // chama a animação
