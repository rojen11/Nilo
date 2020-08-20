export default class Vector2 {
  constructor(public x = 0, public y = 0) {}

  add(v: Vector2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distanceTo(v: Vector2) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  scale(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divide(s: number) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  normalized() {
    return this.divide(this.length());
  }
}
