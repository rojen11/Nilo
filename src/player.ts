import Vector2 from './vector';
import Engine from './engine';
import { Approach } from './uttils';

export default class Player {
  public width = 8;

  public height = 8;

  public color = 'red';

  public speed = 60;

  public velGoal = 0;

  public velocity: Vector2 = new Vector2(0, 0);

  constructor(
    private ctx: CanvasRenderingContext2D,
    private engine: Engine,
    public pos: Vector2,
  ) {}

  // movement
  moveLeft(dt: number): void {
    this.pos.add(new Vector2(-this.speed, 0).scale(dt));
  }

  moveRight(dt: number): void {
    this.pos.add(new Vector2(this.speed, 0).scale(dt));
  }

  moveUp(dt: number): void {
    this.pos.add(new Vector2(0, -this.speed).scale(dt));
  }

  moveDown(dt: number): void {
    this.pos.add(new Vector2(0, this.speed).scale(dt));
  }

  // update player
  update(dt: number): void {
    this.velocity.x = Approach(this.velGoal, this.velocity.x, dt * 100);

    this.pos.add(new Vector2(this.velocity.x * dt));
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
