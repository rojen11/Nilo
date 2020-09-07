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

  public images: Array<HTMLImageElement> = [new Image(), new Image()];

  public noReloadImage: HTMLImageElement;

  constructor(public level: Level, public engine: Engine) {
    this.ctx = this.engine.context;
    this.camera = this.engine.camera;
    this.worldHeight = level.height;
    this.worldWidth = level.width;
    this.generateImage();
  }

  generateImage(): void {
    for (let i = 0; i <= 1; i++) {
      let ictx = document.createElement('canvas').getContext('2d');
      if (ictx != null) {
        ictx.canvas.width = this.worldWidth * Tiles.TilesWidth;
        ictx.canvas.height = this.worldHeight * Tiles.TilesHeight;
        this.createMap(ictx, i);
        this.images[i].src = ictx.canvas.toDataURL('image/png');
      }
      ictx = null;
    }
  }

  // Draw tiles with camera offset. Might need to change this later
  createMap(ictx: CanvasRenderingContext2D, i: number): void {
    this.level.map.forEach((r, y) => {
      r.forEach((c, x) => {
        let b = false;
        if (c == 1 && i === 0) {
          b = true;
        } else if (c == 2 && i === 1) {
          b = true;
        }
        if (c != 0 && b) {
          Tiles.getTile(c).draw(
            ictx,
            x,
            y,
            Tiles.TilesWidth,
            Tiles.TilesHeight,
          );
        }
      });
    });
  }

  draw(): void {
    const sx = this.camera.pos.x;
    const sy = this.camera.pos.y;

    const sWidth = this.ctx.canvas.width;
    const sHeight = this.ctx.canvas.height;

    const dx = 0;
    const dy = 0;

    const dWidth = sWidth;
    const dHeight = sHeight;
    this.images.forEach((im, i) => {
      if (!Tiles.reload || i === 1) {
        this.ctx.drawImage(
          im,
          sx,
          sy,
          sWidth,
          sHeight,
          dx,
          dy,
          dWidth,
          dHeight,
        );
      }
    });
  }
}
