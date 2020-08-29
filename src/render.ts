import Engine from './engine';

export default class Render {
  constructor(private engine: Engine, private ctx: CanvasRenderingContext2D) {}

  drawPlayer() {
    const { player } = this.engine;
    this.ctx.save();
    this.ctx.fillRect(
      player!.pos.x - this.engine.camera.pos.x,
      player!.pos.y - this.engine.camera.pos.y,
      player!.width,
      player!.height,
    );
    this.ctx.restore();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.drawPlayer();
    this.ctx.restore();
  }
}
