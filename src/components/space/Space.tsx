import SpaceCanvas from "./SpaceCanvas";
import {
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  CubeTexture,
  Mesh,
} from "@babylonjs/core";
import { Planet, Universe } from "../../utils/classes/space";
import { useEffect, useState } from "react";

function Space() {
  const ANGLE_SPEED = 0.002 * Math.PI;
  let universe: Universe;
  const [restart, setReStart] = useState(0);
  const planetDataList: IPlanetData[] = [
    {
      name: "core",
      idleSpeed: 0,
      distance: 0,
      radius: 10,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "sns",
      idleSpeed: 0.7009,
      distance: 1.5,
      radius: 2,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "collab",
      idleSpeed: 1.1102,
      distance: 2.2,
      radius: 2.5,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "realestate",
      idleSpeed: 1.5,
      distance: 3.0,
      radius: 3,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "tello",
      idleSpeed: 1.68,
      distance: 4.0,
      radius: 2,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "doccat",
      idleSpeed: 12.362,
      distance: 5.0,
      radius: 5,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
    {
      name: "blog",
      idleSpeed: 15.958,
      distance: 6.0,
      radius: 4.5,
      skills: [],
      description: "",
      thumbnail: "",
      ydeg: Math.random() * 0.7,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setReStart(1);
    }, 300);
  }, [restart]);

  function onSceneReady(scene: Scene) {
    universe = new Universe(scene, planetDataList);
  }

  //프레임마다 실행할 함수
  function onRender(scene: Scene) {
    --Universe.time;
    universe.planet.map((data) => {
      if (data.getPlanetData().name === "core") data.setPosition(0, 0, 0);
      else
        data.setPosition(
          data.getPlanetData().distance *
            9 *
            Math.sin(
              (ANGLE_SPEED * (Universe.time + data.startPosition)) /
                data.getPlanetData().idleSpeed
            ),
          data.getPlanetData().ydeg *
            9 *
            Math.sin(
              (ANGLE_SPEED * (Universe.time + data.startPosition)) /
                data.getPlanetData().idleSpeed
            ),
          data.getPlanetData().distance *
            9 *
            Math.cos(
              (ANGLE_SPEED * (Universe.time + data.startPosition)) /
                data.getPlanetData().idleSpeed
            )
        );
    });
  }
  return <SpaceCanvas onRender={onRender} onSceneReady={onSceneReady} />;
}

export default Space;
