import Vector2 from './vector';
import Player from './player';
import Engine from './engine';

export default class Camera {
  constructor(
    public pos: Vector2,
    public viewportWidth: number,
    public viewportHeight: number,
    public followed: Player,
    private engine: Engine,
  ) {}

  update(): void {
    if (this.followed !== null) {
      if (this.followed.pos.x > this.viewportWidth / 2) {
        this.pos.x = this.followed.pos.x - this.viewportWidth / 2;
      }
      if (
        this.followed.pos.y <
        this.engine.map.worldHeight - this.viewportHeight / 2
      ) {
        this.pos.y = this.followed.pos.y - this.viewportHeight / 2;
      }
    }
    // console.log(this.pos);
  }
}
