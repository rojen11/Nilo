import Engine from './engine';

export default class Render {
  constructor(private engine: Engine, private ctx: CanvasRenderingContext2D) {}

  draw(): void {
    this.ctx.shadowBlur = 0;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.engine.map.draw();
    this.engine.player?.draw();
    this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(
    //   1408 - this.engine.camera.pos.x,
    //   608 - this.engine.camera.pos.y,
    //   32,
    //   32,
    // );
    this.ctx.restore();
  }
}
