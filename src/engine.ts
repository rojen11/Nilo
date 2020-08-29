import Camera from './camera';
import Vector2 from './vector';
import Player from './player';
import Controls from './controls';

export default class Engine {
  private context: CanvasRenderingContext2D;

  public test = 1;

  public camera: Camera;

  public player?: Player;

  public controls: Controls;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.camera = new Camera(
      new Vector2(0, 0),
      context.canvas.width,
      context.canvas.height,
    );
    this.controls = new Controls();
  }

  begin() {
    this.player = new Player(new Vector2(0, 0));
    this.camera.follow(this.player);
  }

  update(dt: number) {
    if (this.controls.control.left) {
      this.player?.pos.add(new Vector2(-10 * dt, 0));
    }
    if (this.controls.control.right) {
      this.player?.pos.add(new Vector2(10 * dt, 0));
    }
    if (this.controls.control.up) {
      this.player?.pos.add(new Vector2(0, -10 * dt));
    }
    if (this.controls.control.down) {
      this.player?.pos.add(new Vector2(0, 10 * dt));
    }
    this.camera.update();
  }
}
