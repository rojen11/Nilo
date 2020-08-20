import Vector2 from './vector';

export default class Camera {
  constructor(
    public pos: Vector2,
    public viewportWidth: number,
    public viewportHeight: number,
  ) {}

  update() {
    console.log('test');
  }
}
