import {
  ActionManager,
  Color3,
  CreateSphere,
  CubeTexture,
  ExecuteCodeAction,
  FollowCamera,
  HemisphericLight,
  HighlightLayer,
  Mesh,
  MeshBuilder,
  Nullable,
  Scene,
  StandardMaterial,
  Vector3,
  CreateDashedLines,
} from "@babylonjs/core";
const ANGLE_SPEED = 0.002 * Math.PI;
export class Universe {
  static time: number = 0;
  canvas: Nullable<HTMLCanvasElement>;
  camera: FollowCamera;
  light: HemisphericLight;
  background: Mesh;
  planet: Planet[] = [];
  currentPlanet: Mesh | null;
  detail: boolean = false;

  resetCamera: () => void;
  moveCameraTo: (object: Mesh) => void;

  constructor(private scene: Scene, planetList: IPlanetData[]) {
    //행성 및 라인 생성
    planetList.map((data) => {
      //행성 생성
      const planet = new Planet(data, this.scene);
      planet.setPosition(0, 0, 0);
      //행성 클릭 시 이벤트 추가
      planet.planet!.actionManager = new ActionManager(scene);
      planet.planet!.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, (evt) => {
          if (this.currentPlanet?.name == evt.source.name)
            this.detail = !this.detail;
          else this.detail = false;

          this.camera.radius = this.detail ? 40 : 70;
          this.camera.lockedTarget = evt.source;
          this.currentPlanet = evt.source;
        })
      );

      planet.planet!.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (evt) => {
          if (this.detail == false) {
            console.log("in", evt.source.name);
          }
        })
      );

      planet.planet!.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (evt) => {
          if (this.detail == false) {
            console.log("out", evt.source.name);
          }
        })
      );
      this.planet.push(planet);

      //라인생성
      let myPoints = [];
      for (let i = 0; i < data.distance * 2700; i++) {
        myPoints.push(
          new Vector3(
            data.distance * 9 * Math.sin((ANGLE_SPEED * i) / data.idleSpeed),
            data.ydeg * 9 * Math.sin((ANGLE_SPEED * i) / data.idleSpeed),
            data.distance * 9 * Math.cos((ANGLE_SPEED * i) / data.idleSpeed)
          )
        );
      }
      let lines = MeshBuilder.CreateLines("lines", {
        points: myPoints,
        updatable: true,
      });
    });

    //캔버스
    this.canvas = scene.getEngine().getRenderingCanvas();
    //카메라 생성
    this.camera = new FollowCamera("camera", Vector3.Zero(), scene);
    this.camera.lockedTarget = this.planet[0].planet;
    this.camera.attachControl(true);
    this.camera.cameraAcceleration = 0.1;
    scene.activeCameras?.push(this.camera);
    this.currentPlanet = this.planet[0].planet;
    this.camera.cameraDirection._y = 40;
    this.camera.cameraDirection._z = 70;
    this.camera.radius = 70;
    //빛 생성
    this.light = new HemisphericLight("light", new Vector3(0, 0, 0), scene);
    //배경 생성
    this.background = MeshBuilder.CreateBox("spaceBox", { size: 500 }, scene);
    const spaceBoxMaterial = new StandardMaterial("spaceBox", scene);
    spaceBoxMaterial.reflectionTexture = new CubeTexture("s1", scene);
    spaceBoxMaterial.backFaceCulling = false;
    spaceBoxMaterial.disableLighting = true;
    this.background.material = spaceBoxMaterial;
    this.background.infiniteDistance = true;
    this.background.renderingGroupId = 0;

    //카메라 리셋 함수
    this.resetCamera = () => {
      this.camera.lockedTarget = this.planet[0].planet;
    };
    this.moveCameraTo = (object) => {
      this.camera.lockedTarget = object;
    };
  }
}

export class Planet {
  planet: Mesh | null = null;
  startPosition = Math.random() * this.planetData.idleSpeed * 1000;
  setPosition: (x: number, y: number, z: number) => void;
  getPlanetData: () => IPlanetData;
  constructor(private planetData: IPlanetData, private scene: Scene) {
    //행성을 생성
    this.planet = CreateSphere(planetData.name, {}, this.scene);
    this.planet!.scaling._x = planetData.radius;
    this.planet!.scaling._y = planetData.radius;
    this.planet!.scaling._z = planetData.radius;

    //외곽 발광 추가
    const hl = new HighlightLayer(planetData.name, scene);
    hl.addMesh(this.planet, Color3.Random());
    //색상 추가
    const shpereMaterial = new StandardMaterial(planetData.name, scene);
    shpereMaterial.diffuseColor = Color3.Random();
    this.planet.material = shpereMaterial;
    //배경 이후 생성되게 구현
    this.planet.renderingGroupId = 1;
    //위치 변경 함수
    this.setPosition = (x: number, y: number, z: number) => {
      this.planet!.position = new Vector3(x, y, z);
    };
    //행성 데이터 게터
    this.getPlanetData = () => this.planetData;
  }
}
