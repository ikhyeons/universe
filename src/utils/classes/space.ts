import {
  Color3,
  CreateSphere,
  HighlightLayer,
  Mesh,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export default class Planet {
  planet = CreateSphere(this.name, {}, this.scene);
  setPosition;
  setSize;
  constructor(private name: string, private scene: Scene) {
    const hl = new HighlightLayer("hl1", scene);
    hl.addMesh(this.planet, Color3.Random());

    const shpereMaterial = new StandardMaterial("material", scene);
    shpereMaterial.diffuseColor = Color3.Random();
    this.planet.material = shpereMaterial;

    this.setPosition = (x: number, y: number, z: number) => {
      this.planet.position = new Vector3(x, y, z);
    };
    this.setSize = (radius: number) => {
      this.planet.scaling._x = radius;
      this.planet.scaling._y = radius;
      this.planet.scaling._z = radius;
    };
  }
}
