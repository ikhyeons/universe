/// <reference types="vite/client" />
declare global {
  interface initialPlanet {
    name: string;
    position: { x: number; y: number; z: number };
    radius: number;
  }
}

export default {};
