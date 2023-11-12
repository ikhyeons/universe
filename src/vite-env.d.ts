/// <reference types="vite/client" />

import { Vector3 } from "@babylonjs/core";

declare global {
  interface IPlanetData {
    name: string;
    idleSpeed: number;
    distance: number;
    radius: number;
    skills: never[];
    description: string;
    thumbnail: string;
    ydeg: number;
    document?: string;
    url?: string;
    github?: string;
  }
}

export default {};
