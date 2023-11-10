import { useRef, useEffect } from "react";
import { Engine, Scene } from "@babylonjs/core";
import { BabylonjsProps } from "babylonjs-hook";
import "./space.scss";

function SpaceCanvas({ onSceneReady, onRender }: BabylonjsProps) {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    const engine = new Engine(canvas, true, { stencil: true });
    const scene = new Scene(engine);

    if (scene.isReady()) onSceneReady(scene);
    else scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    function resize() {
      scene.getEngine().resize();
    }

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();
      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [onRender, onSceneReady]);

  return <canvas className="uc" ref={reactCanvas} />;
}

export default SpaceCanvas;
