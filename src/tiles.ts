declare const zzfx: any;

export default abstract class Tiles {
  public static tiles: Tiles[] = new Array<Tiles>();

  public static TilesWidth = 32;
  public static TilesHeight = 32;
  public static reload = false;
  public solid = false;

  constructor(public id: number) {
    Tiles.tiles[id] = this;
    document
      .getElementById('reload')
      ?.addEventListener('click', Tiles.reloadbtn);
  }

  static reloadbtn(): void {
    if (!Tiles.reload) {
      Tiles.reload = true;
      zzfx(
        1,
        0,
        7865,
        0.1,
        0.11,
        0,
        0,
        1.6,
        -1.8,
        0.3,
        -500,
        -0.09,
        0.01,
        0.2,
        0,
        0,
        0.13,
        0.64,
        0.18,
        0,
      ); // refresh;

      Tiles.tiles[1].setSolid(false);
      Tiles.tiles[2].setSolid(false);
      setTimeout(function () {
        Tiles.reload = false;
        Tiles.tiles[1].setSolid(true);
        Tiles.tiles[2].setSolid(true);
      }, 200);
    }
  }

  abstract draw(
    ctx: CanvasRenderingContext2D,
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
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(x * Tiles.TilesWidth, y * Tiles.TilesHeight, w, h);
    ctx.restore();
  }
}

export class Spike extends Tiles {
  public solid = true;
  constructor(id: number) {
    super(id);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const tx = x * Tiles.TilesWidth;
    const ty = y * Tiles.TilesHeight;
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

export class JumpPad extends Tiles {
  public solid = true;

  constructor(id: number) {
    super(id);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const tx = x * Tiles.TilesWidth;
    const ty = y * Tiles.TilesHeight;
    ctx.save();
    ctx.beginPath();
    ctx.fillRect(tx, ty, w, h / 4);
    ctx.fillRect(tx, ty + h / 2, w, h / 2);
    ctx.moveTo(tx + w / 2 - 3, ty + h / 4);
    ctx.fillRect(tx + w / 2 - 2, ty + h / 4, 6, h / 4);
    ctx.closePath();
    ctx.restore();
  }
}

export class nonPlatform extends Tiles {
  public solid = true;

  constructor(id: number) {
    super(id);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.fillRect(x * Tiles.TilesWidth, y * Tiles.TilesHeight, w, h);
    ctx.restore();
  }
}

export class nonSpike extends Tiles {
  public solid = true;
  constructor(id: number) {
    super(id);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const tx = x * Tiles.TilesWidth;
    const ty = y * Tiles.TilesHeight;
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
  new JumpPad(3);
  new nonPlatform(6);
  new nonSpike(7);
})();
