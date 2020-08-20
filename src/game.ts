import Engine from './engine';
import Render from './render';

export default class Game {
  private engine: Engine;

  private lastRender: number = 0;

  private render: Render;

  constructor() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d')!;
    this.engine = new Engine(context);
    this.render = new Render(this.engine);
  }

  loop = (timestamp: number) => {
    // const progress = timestamp - this.lastRender;
    this.engine.update();
    // this.render.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  };

  run() {
    this.lastRender = 0;
    window.requestAnimationFrame(this.loop);
  }
}
