import Camera from './camera';

export default abstract class Tiles {
  public static tiles: Tiles[] = new Array<Tiles>();

  public static TilesWidth = 32;
  public static TilesHeight = 32;
  public static reload = false;
  public solid = false;

  constructor(public id: number) {
    Tiles.tiles[id] = this;
    document.getElementById('reload')?.addEventListener('click', function () {
      Tiles.reload = true;
      Tiles.tiles[1].setSolid(false);
      setTimeout(function () {
        Tiles.reload = false;
        Tiles.tiles[1].setSolid(true);
      }, 200);
    });
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

  public setSolid(b: boolean): void {
    this.solid = b;
  }
}
export class Platform extends Tiles {
  public solid = true;

  constructor(id: number) {
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
    if (!Tiles.reload) {
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        x * Tiles.TilesWidth - Math.ceil(camera.pos.x),
        y * Tiles.TilesHeight - Math.ceil(camera.pos.y),
        w,
        h,
      );
      ctx.restore();
    }
  }
}

export class Spike extends Tiles {
  constructor(id: number) {
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
    const tx = x * Tiles.TilesWidth - Math.ceil(camera.pos.x);
    const ty = y * Tiles.TilesHeight - Math.ceil(camera.pos.y);
    ctx.save();
    ctx.beginPath();
    ctx.fillRect(tx, ty + h / 2, w, h / 2);
    ctx.moveTo(tx, ty + h / 2);
    ctx.lineTo(tx + w / 4 / 2, ty);
    ctx.lineTo(tx + w / 4, ty + h / 2);
    ctx.lineTo(tx + w / 4 + w / 4 / 2, ty);
    ctx.lineTo(tx + (w / 4) * 2, ty + h / 2);
    ctx.lineTo(tx + (w / 4) * 2 + w / 4 / 2, ty);
    ctx.lineTo(tx + (w / 4) * 3, ty + h / 2);
    ctx.lineTo(tx + (w / 4) * 3 + w / 4 / 2, ty);
    ctx.lineTo(tx + (w / 4) * 4, ty + h / 2);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();
  }
}

(function () {
  new Platform(1);
  new Spike(2);
})();
