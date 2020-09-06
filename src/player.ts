import Vector2 from './vector';
import Engine from './engine';
import { lerp } from './utils';
import Tiles from './tiles';

export default class Player {
  public width = 32;

  public height = 32;

  public color = 'red';

  public speed = 400;

  public velGoal = 0;

  public velocity: Vector2 = new Vector2(0, 0);

  public gravity: Vector2 = new Vector2(0, 4200);

  public jumpHeight = 6;

  public state = {
    falling: false,
    jumping: false,
    jumpStartHeight: 0,
  };

  constructor(
    private ctx: CanvasRenderingContext2D,
    private engine: Engine,
    public pos: Vector2,
  ) {}

  // update player
  update(dt: number): void {
    // console.log(dt);
    this.velGoal = 0;

    let mdt = 1000;
    let tg = 0;

    // Controls
    if (this.engine.controls.control.left) {
      if (this.velocity.x > 0) mdt = 2000;
      this.velGoal = -this.speed;
    }
    if (this.engine.controls.control.right) {
      if (this.velocity.x < 0) mdt = 2000;
      this.velGoal = this.speed;
    }
    if (this.engine.controls.control.up && !this.state.jumping) {
      this.velocity.y = -1200;
      this.state.jumping = true;
      this.state.jumpStartHeight = this.pos.y;
    } else if (this.engine.controls.control.down) {
      tg = 2000;
    }

    this.velocity.x = lerp(this.velGoal, this.velocity.x, dt * mdt);

    // collision in x axis
    let colx = false;
    if (this.velocity.x !== 0) {
      const w = this.velocity.x < 0 ? 0 : this.width;
      colx =
        this.checkCollision(
          new Vector2(this.pos.x + this.velocity.x * dt + w, this.pos.y + 1),
          true,
        ) ||
        this.checkCollision(
          new Vector2(
            this.pos.x + this.velocity.x * dt + w,
            this.pos.y + this.height,
          ),
          true,
        );
    }

    if (colx) this.velocity.x = 0;

    this.velocity.y += (this.gravity.y + tg) * dt;

    // collision in y axis
    let coly = false;
    if (this.velocity.y !== 0) {
      const h = this.velocity.y < 0 ? 0 : this.height;
      coly =
        this.checkCollision(
          new Vector2(this.pos.x, this.pos.y + this.velocity.y * dt + h),
        ) ||
        this.checkCollision(
          new Vector2(
            this.pos.x + this.width,
            this.pos.y + this.velocity.y * dt + h,
          ),
        );
      if (coly) {
        this.velocity.y = 0;
        if (h === 0) {
          if (
            this.checkCollision(
              new Vector2(
                this.pos.x,
                this.pos.y + (this.gravity.y + tg) * dt + this.height,
              ),
            ) ||
            this.checkCollision(
              new Vector2(
                this.pos.x + this.width,
                this.pos.y + this.gravity.y * dt + this.height,
              ),
            )
          ) {
            this.velocity.y += this.gravity.y * dt;
          }
        } else {
          this.state.jumping = false;
        }
      }
    }

    this.pos.add(new Vector2(this.velocity.x * dt, this.velocity.y * dt));
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

  // Axis Aligned Bounding box collision
  checkCollision(pos: Vector2, b = false): boolean {
    const tilepos = new Vector2(
      Math.floor(pos.x / Tiles.TilesWidth) * Tiles.TilesWidth,
      Math.floor(pos.y / Tiles.TilesHeight) * Tiles.TilesHeight,
    );
    const tile =
      typeof this.engine.map.level.map[tilepos.y / Tiles.TilesWidth] ===
        'undefined' ||
      typeof this.engine.map.level.map[tilepos.y / Tiles.TilesWidth][
        tilepos.x / Tiles.TilesHeight
      ] === 'undefined'
        ? 0
        : this.engine.map.level.map[tilepos.y / Tiles.TilesWidth][
            tilepos.x / Tiles.TilesHeight
          ];
    const tileType = Tiles.getTile(tile);

    if (tile === 1 && tileType.solid) {
      if (
        pos.x < tilepos.x + Tiles.TilesWidth &&
        pos.x + this.width > tilepos.x &&
        pos.y < tilepos.y + Tiles.TilesHeight &&
        pos.y + this.height > tilepos.y
      ) {
        return true;
      }
    }
    return false;
  }
}
