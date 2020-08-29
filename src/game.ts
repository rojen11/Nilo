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
    this.render = new Render(this.engine, context);
  }

  loop = (timestamp: number) => {
    const progress = timestamp - this.lastRender;
    console.log(1 / (progress / 1000));
    this.engine.update(progress);
    this.render.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  };

  run() {
    this.lastRender = 0;
    this.engine.begin();
    window.requestAnimationFrame(this.loop);
  }
}
