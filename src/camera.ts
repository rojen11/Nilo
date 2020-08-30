import Vector2 from './vector';
import Player from './player';

export default class Camera {
  constructor(
    public pos: Vector2,
    public viewportWidth: number,
    public viewportHeight: number,
    public followed: Player,
  ) {}

  update(): void {
    if (this.followed !== null) {
      if (this.followed.pos.x > this.viewportWidth / 2) {
        this.pos.x = this.followed.pos.x - this.viewportWidth / 2;
      }
      if (this.followed.pos.y < this.viewportHeight / 2) {
        this.pos.y = this.followed.pos.y - this.viewportHeight / 2;
      }
    }
    // console.log(this.pos);
  }
}
