import Vector2 from './vector';
import Engine from './engine';

export default abstract class Tiles {
  constructor(public engine: Engine, public pos: Vector2) {}

  abstract draw(): void;
}

export class Platform extends Tiles {
  public ctx: CanvasRenderingContext2D;
  constructor(public engine: Engine, public pos: Vector2) {
    super(engine, pos);
    this.ctx = engine.context;
  }

  public draw(): void {
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.pos.x - this.engine.camera.pos.x,
      this.pos.y - this.engine.camera.pos.y,
      4,
      4,
    );
    this.ctx.restore();
  }
}
