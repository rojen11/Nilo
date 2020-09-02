import Camera from './camera';

export default abstract class Tiles {
  public static tiles: Tiles[] = new Array<Tiles>();

  public static TilesWidth = 32;
  public static TilesHeight = 32;

  constructor(public id: number) {
    Tiles.tiles[id] = this;
  }

  abstract draw(
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void;

  public static getTile(id: number): Tiles {
    return Tiles.tiles[id] || Tiles.tiles[1];
  }
}
export class Platform extends Tiles {
  constructor(public id: number) {
    super(id);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(
      x * Tiles.TilesWidth - camera.pos.x,
      y * Tiles.TilesHeight - camera.pos.y,
      w + 5,
      h + 5,
    );
    ctx.restore();
  }
}

(function () {
  new Platform(1);
})();
