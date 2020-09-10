import Vector2 from './vector';
import Engine from './engine';
import { lerp } from './utils';
import Tiles from './tiles';

declare const zzfx: any;
export default class Player {
  public width = 30;

  public height = 30;

  public color = 'red';

  public speed = 400;

  public velGoal = 0;

  public velocity: Vector2 = new Vector2(0, 0);

  public gravity: Vector2 = new Vector2(0, 4200);

  public jumpHeight = 6;

  public jumpVelocity = -1200;

  public state = {
    falling: false,
    jumping: false,
    jumpStartHeight: 0,
    dead: false,
    jumpPad: false,
  };

  constructor(
    private ctx: CanvasRenderingContext2D,
    private engine: Engine,
    public pos: Vector2,
  ) {
    this.state.dead = false;
  }

  // update player
  update(dt: number): void {
    // console.log(dt);
    if (this.state.dead) {
      // this.playDeadAnimation(dt);
      return;
    }
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
      this.velocity.y = this.jumpVelocity;
      this.state.jumping = true;
      this.state.jumpStartHeight = this.pos.y;
      // eslint-disable-next-line no-sparse-arrays
      zzfx(
        0.4,
        0,
        564,
        0,
        0.01,
        0.01,
        0,
        0,
        1.3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0.4,
        0.03,
        0,
      ); // jump
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
        ) ||
        this.checkCollision(
          new Vector2(
            this.pos.x + this.velocity.x * dt + w,
            this.pos.y + this.height,
          ),
        );
    }

    if (colx) this.velocity.x = 0;

    this.velocity.y += (this.gravity.y + tg) * dt;

    // collision in y axis
    let coly = false;
    if (this.velocity.y !== 0 && !this.state.dead) {
      const h = this.velocity.y < 0 ? 0 : this.height;
      coly =
        this.checkCollision(
          new Vector2(this.pos.x, this.pos.y + this.velocity.y * dt + h),
          true,
        ) ||
        this.checkCollision(
          new Vector2(
            this.pos.x + this.width,
            this.pos.y + this.velocity.y * dt + h,
          ),
          true,
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
              true,
            ) ||
            this.checkCollision(
              new Vector2(
                this.pos.x + this.width,
                this.pos.y + this.gravity.y * dt + this.height,
              ),
              true,
            )
          ) {
            this.velocity.y += this.gravity.y * dt;
          }
        } else {
          this.state.jumping = false;
        }
      }
    }

    if (this.state.jumpPad) {
      this.velocity.y = this.jumpVelocity * 1.5;
      this.state.jumpPad = false;
    }

    if (this.state.dead) this.velocity.x = 0;

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
  checkCollision(pos: Vector2, verticle = false): boolean {
    if (this.state.dead) return false;
    const tilepos = new Vector2(
      Math.floor(pos.x / Tiles.TilesWidth) * Tiles.TilesWidth,
      Math.floor(pos.y / Tiles.TilesHeight) * Tiles.TilesHeight,
    );
    if (typeof this.engine.map.level !== 'undefined') {
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

      if (tile >= 1 && tileType.solid) {
        if (
          pos.x < tilepos.x + Tiles.TilesWidth &&
          pos.x + this.width > tilepos.x &&
          pos.y < tilepos.y + Tiles.TilesHeight &&
          pos.y + this.height > tilepos.y
        ) {
          if ((tile == 2 || tile == 7) && verticle) {
            this.dead();
            return false;
          }
          if (tile === 3 && verticle) {
            this.state.jumpPad = true;
          }
          return true;
        }
      }
    }
    return false;
  }

  playDeadAnimation(dt: number): void {
    this.velocity.y += this.gravity.y * dt;
    this.pos.add(new Vector2(0, this.velocity.y * dt));
  }

  dead(): void {
    if (!this.state.dead) {
      zzfx(
        1,
        0.05,
        85,
        0,
        0.07,
        0.04,
        1,
        2.9,
        0,
        0,
        0,
        0,
        0,
        1.5,
        0,
        0,
        0.06,
        0.6,
        0.01,
        0.09,
      ); // death
      this.state.dead = true;
      this.speed = 0;
      this.jumpVelocity = 0;
      const d = document.getElementById('dead');
      if (d !== null) d.dispatchEvent(new Event('gameover'));
    }
  }
}
