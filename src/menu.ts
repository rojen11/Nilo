import Game from './game';

export default class Menu {
  private menuDiv = document.getElementById('menu');

  private playbtn = document.getElementById('play');

  private chaptersDiv = document.getElementById('chapters');

  private levelDiv = document.getElementById('level');

  private chapter = 1;

  constructor(private game: Game) {
    if (this.menuDiv !== null && this.playbtn !== null) {
      this.playbtn.addEventListener('click', () => {
        if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
          document.documentElement.requestFullscreen();
          window.screen.orientation.lock('landscape');
        }
        this.hide();
        this.showChapters();
      });
    } else {
      console.error('menu or play button not found');
    }
    this.initChapters();
    this.initLevels();
  }

  initChapters(): void {
    if (this.chaptersDiv != null) {
      const btns = this.chaptersDiv.children;
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
          this.chapter = Number((<HTMLButtonElement>e.target).value);
          this.hideChapters();
          this.showlevels();
        });
      }
    }
  }

  showChapters(): void {
    if (this.chaptersDiv !== null)
      this.chaptersDiv.style.visibility = 'visible';
  }
  hideChapters(): void {
    if (this.chaptersDiv !== null) this.chaptersDiv.style.visibility = 'hidden';
  }

  initLevels(): void {
    if (this.levelDiv != null) {
      const btns = this.levelDiv.children;
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
          this.game.engine.map.loadLevel({
            chapter: this.chapter,
            level: Number((<HTMLButtonElement>e.target).value),
          });
          this.hidelevels();
          this.game.run();
        });
      }
    }
  }

  showlevels(): void {
    if (this.levelDiv != null) this.levelDiv.style.visibility = 'visible';
  }
  hidelevels(): void {
    if (this.levelDiv != null) this.levelDiv.style.visibility = 'hidden';
  }

  show(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'visible';
  }

  hide(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'hidden';
  }
}
