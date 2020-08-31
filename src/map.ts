import Vector2 from './vector';
import Engine from './engine';
import Tiles from './tiles';
import Camera from './camera';

export default class Map {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  constructor(public level: Array<Array<number>>, public engine: Engine) {
    this.ctx = this.engine.context;
    this.camera = this.engine.camera;
  }

  draw(): void {
    this.level.forEach((r, y) => {
      r.forEach((c, x) => {
        if (c != 0) {
          Tiles.getTile(c).draw(
            this.ctx,
            this.camera,
            x,
            y,
            Tiles.TilesWidth,
            Tiles.TilesHeight,
          );
        }
      });
    });
  }
}
