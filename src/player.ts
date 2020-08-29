import Vector2 from './vector';
import Engine from './engine';

export default class Player {
  public width = 10;

  public height = 10;

  public color = 'red';

  public speed = 0.2;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private engine: Engine,
    public pos: Vector2,
  ) {}

  // movement
  moveLeft(dt: number): void {
    this.pos.add(new Vector2(-this.speed * dt, 0));
  }

  moveRight(dt: number): void {
    this.pos.add(new Vector2(this.speed * dt, 0));
  }

  moveUp(dt: number): void {
    this.pos.add(new Vector2(0, -this.speed * dt));
  }

  moveDown(dt: number): void {
    this.pos.add(new Vector2(0, this.speed * dt));
  }

  draw(): void {
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.pos.x - this.engine.camera.pos.x,
      this.pos.y - this.engine.camera.pos.y,
      this.width,
      this.height,
    );
    this.ctx.restore();
  }
}
