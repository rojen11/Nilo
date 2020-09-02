import Engine from './engine';
import Tiles from './tiles';
import Camera from './camera';

type Level = {
  width: number;
  height: number;
  map: Array<Array<number>>;
};

export default class Map {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  public worldHeight: number;
  public worldWidth: number;
  constructor(public level: Level, public engine: Engine) {
    this.ctx = this.engine.context;
    this.camera = this.engine.camera;
    this.worldHeight = level.height;
    this.worldWidth = level.width;
  }

  // Draw tiles with camera offset. Might need to change this later
  draw(): void {
    this.level.map.forEach((r, y) => {
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
