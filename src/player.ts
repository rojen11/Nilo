import Vector2 from './vector';

export default class Player {
  public width: number = 10;

  public height: number = 10;

  public color: string = 'red';

  constructor(public pos: Vector2) {}
}
