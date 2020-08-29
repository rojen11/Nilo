import Vector2 from './vector';
import Engine from './engine';
import Tiles, { Platform } from './tiles';

export default class Map {
  public tiles: Tiles[] = [];

  constructor(public level: Array<Array<number>>, public engine: Engine) {}

  loadlevel(): void {
    let x = 0,
      y = 0;
    this.level.forEach(r => {
      r.forEach(c => {
        if (c === 1) {
          this.tiles.push(new Platform(this.engine, new Vector2(x, y)));
        } else if (c === 2) {
          this.tiles.push(new Platform(this.engine, new Vector2(x, y)));
        }
        console.log(x);
        x += 4;
      });
      x = 0;
      console.log(y);
      y += 4;
    });
  }
}
