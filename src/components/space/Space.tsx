import SpaceCanvas from "./SpaceCanvas";
import {
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  Texture,
  MeshBuilder,
  StandardMaterial,
  CreateGround,
  CreateBox,
  CubeTexture,
} from "@babylonjs/core";
import Planet from "../../utils/classes/space";

function Space() {
  let initialPlanetList: initialPlanet[] | null = [
    { name: "solar", position: { x: 0, y: 0, z: 0 }, radius: 2 },
    { name: "mercury", position: { x: 1, y: 0, z: 3 }, radius: 1 },
    { name: "venus", position: { x: 3, y: 0, z: 4 }, radius: 1 },
  ];
  function onSceneReady(scene: Scene) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const camera = new ArcRotateCamera(
      "camera",
      0,
      0,
      500 * 0.03,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    new HemisphericLight("light1", new Vector3(0, 0, 0), scene);

    //행성 매쉬 생성
    initialPlanetList?.map((data, i) => {
      const planet = new Planet(data.name, scene);
      planet.setPosition(data.position.x, data.position.y, data.position.z);
      planet.setSize(data.radius);
    });

    //배경 생성
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 500 }, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new CubeTexture("/space", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  }

  function onRender(scene: Scene) {}
  return <SpaceCanvas onRender={onRender} onSceneReady={onSceneReady} />;
}

export default Space;
