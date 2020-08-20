import Camera from './camera';
import Vector2 from './vector';

export default class Engine {
  private context: CanvasRenderingContext2D;

  public test = 1;

  public camera: Camera;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.camera = new Camera(
      new Vector2(0, 0),
      context.canvas.width,
      context.canvas.height,
    );
  }

  // begin() {}

  update() {
    this.test += 1;
  }

  // render() {}
}
