import Engine from './engine';
import Render from './render';

export default class Game {
  private engine: Engine;

  private lastRender = 0;

  private render: Render;

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
  }

  loop = (timestamp: number): void => {
    const progress = timestamp - this.lastRender;
    // console.log(1 / (progress / 1000));
    this.engine.update(progress);
    this.render.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  };

  run(): void {
    this.lastRender = 0;
    window.requestAnimationFrame(this.loop);
  }
}
