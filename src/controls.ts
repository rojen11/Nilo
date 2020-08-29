export default class Controls {
  control = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor() {
    window.addEventListener('keydown', this.onkeydown);
    window.addEventListener('keyup', this.onkeyup);
  }

  onkeydown = (e: { keyCode: number }): void => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = true;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = true;
    }

    // Down (down / S)
    if (e.keyCode === 40 || e.keyCode === 83) {
      this.control.down = true;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = true;
    }
  };

  onkeyup = (e: { keyCode: number }) => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = false;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = false;
    }

    // Down (down / S)
    if (e.keyCode === 40 || e.keyCode === 83) {
      this.control.down = false;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = false;
    }
  };
}
