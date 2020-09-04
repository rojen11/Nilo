import Engine from './engine';
import Render from './render';

export default class Game {
  private engine: Engine;

  private lastRender = 0;

  private render: Render;

  private fpsDiv: Element;
  private fpsTime = 0;

  constructor() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    if (context === null) {
      console.error('context not found');
    } else {
      this.engine = new Engine(context);
      this.render = new Render(this.engine, context);
      this.engine.begin();
    }
    const temp = document.getElementById('fps');
    if (temp !== null) this.fpsDiv = temp;
  }

  // Game Loop
  loop = (timestamp: number): void => {
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
    this.lastRender = 0;
    window.requestAnimationFrame(this.loop);
  }
}
