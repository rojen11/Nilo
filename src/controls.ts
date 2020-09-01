import Player from './player';
import Vector2 from './vector';

export default class Controls {
  control = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor(public player: Player) {
    window.addEventListener('keydown', this.onkeydown);
    window.addEventListener('keyup', this.onkeyup);
  }

  onkeydown = (e: { keyCode: number }): void => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = true;
      this.player.velocity.y = -50;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = true;
      this.player.velGoal = this.player.speed;
    }

    // Down (down / S)
    if (e.keyCode === 40 || e.keyCode === 83) {
      this.control.down = true;
      this.player.velocity.y = 50;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = true;
      this.player.velGoal = -this.player.speed;
    }
  };

  onkeyup = (e: { keyCode: number }): void => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = false;
      this.player.velocity.y = 0;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = false;
      this.player.velGoal = 0;
    }

    // Down (down / S)
    if (e.keyCode === 40 || e.keyCode === 83) {
      this.control.down = false;
      this.player.velocity.y = 0;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = false;
      this.player.velGoal = 0;
    }
  };
}
