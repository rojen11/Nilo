import Engine from './engine';
import Render from './render';

export default class Game {
  public engine: Engine;

  private lastRender = 0;

  private render: Render;

  private fpsDiv: Element;
  private fpsTime = 0;
  private context: CanvasRenderingContext2D;

  private animFrame: number;

  private running: boolean;

  constructor() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      this.context = ctx;
    }
    const temp = document.getElementById('fps');
    if (temp !== null) this.fpsDiv = temp;
  }

  begin = (): void => {
    if (this.context === null) {
      console.error('context not found');
    } else {
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height,
      );
      this.engine = new Engine(this.context);
      this.render = new Render(this.engine, this.context);
      this.engine.begin();
    }
  };

  // Game Loop
  loop = (timestamp: number): void => {
    if (!this.running) return;

    const progress = timestamp - this.lastRender;
    let dt = progress / 1000;

    if (dt > 0.15) dt = 0.15;

    if (this.fpsTime > 0.25) {
      this.fpsDiv.innerHTML = Math.floor(1 / dt).toString();
      this.fpsTime = 0;
    }
    this.engine.update(dt);
    this.render.draw();

    this.lastRender = timestamp;
    this.fpsTime += dt;
    window.requestAnimationFrame(this.loop);
  };

  run(): void {
    this.running = true;
    this.lastRender = 0;
    this.engine.controls.showControls();
    this.animFrame = window.requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.running = false;
    window.cancelAnimationFrame(this.animFrame);
  }
}
