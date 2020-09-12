import Camera from './camera';
import Vector2 from './vector';
import Player from './player';
import Controls from './controls';
import Map from './map';
import Game from './game';

export default class Engine {
  public context: CanvasRenderingContext2D;

  public test = 1;

  public camera: Camera;

  public player?: Player;

  public controls: Controls;

  public map: Map;

  constructor(context: CanvasRenderingContext2D, public game: Game) {
    this.context = context;
  }

  begin(): void {
    this.map = new Map(this);
    this.player = new Player(this.context, this, this.map.start);
    this.controls = new Controls(this.player);
    this.camera = new Camera(
      new Vector2(0, 0),
      this.context.canvas.width,
      this.context.canvas.height,
      this.player,
      this,
    );
  }

  // game tick
  update(dt: number): void {
    this.player?.update(dt);
    this.camera.update();
  }
}
