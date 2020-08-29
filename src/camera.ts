import Vector2 from './vector';
import Player from './player';

export default class Camera {
  followed?: Player;

  constructor(
    public pos: Vector2,
    public viewportWidth: number,
    public viewportHeight: number,
  ) {}

  follow(followed: Player) {
    this.followed = followed;
  }

  update() {
    if (this.followed !== null) {
      this.pos.x = this.followed?.pos.x! - this.viewportWidth / 2;
      this.pos.y = this.followed?.pos.y! - this.viewportHeight / 2;
    }
    // console.log(this.pos);
  }
}
