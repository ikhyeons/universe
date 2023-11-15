import { memo } from "react";
import SpaceCanvas from "./SpaceCanvas";
import { Scene } from "@babylonjs/core";
import { Universe } from "../../utils/classes/space";
import { useEffect, useState } from "react";
import planetDataList from "../../data/planetList";
import { useSetRecoilState } from "recoil";
import { aSummary } from "../../utils/recoilStore";
function Space() {
  const setSummary = useSetRecoilState(aSummary);
  const ANGLE_SPEED = 0.002 * Math.PI;
  let universe: Universe;
  const [restart, setReStart] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setReStart(1);
    }, 800);
  }, [restart]);

  function onSceneReady(scene: Scene) {
    universe = new Universe(scene, planetDataList, setSummary);
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
