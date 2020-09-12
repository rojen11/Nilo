import Game from './game';
import { maps } from './map';

export default class Menu {
  private menuDiv = document.getElementById('menu');

  private playbtn = document.getElementById('play');

  private chaptersDiv = document.getElementById('chapters');

  private levelDiv = document.getElementById('level');

  private events = document.getElementById('events');

  private backward = document.getElementById('backward');

  private fullscreen = document.getElementById('fullscreen');

  private displayStatus = 'home';

  private chapter = 1;
  private level = 1;

  constructor(private game: Game) {
    if (this.menuDiv !== null && this.playbtn !== null) {
      this.playbtn.addEventListener('click', () => {
        if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
          this.toggleFullScreen();
          window.screen.orientation.lock('landscape');
        }
        this.hide();
        this.showChapters();
      });
    } else {
      console.error('menu or play button not found');
    }

    // backward button
    if (this.backward !== null) {
      this.backward.addEventListener('click', () => {
        if (typeof this.game.engine.map.levelIndex === 'undefined') {
          if (this.displayStatus === 'chapters') {
            this.hideChapters();
            this.show();
          } else if (this.displayStatus === 'levels') {
            this.hidelevels();
            this.showChapters();
          }
        } else {
          if (this.game.engine.map.levelIndex > 0) {
            const levelIndex = this.game.engine.map.levelIndex;
            this.game.stop();
            this.game.begin();
            this.game.engine.map.loadLevel(maps[levelIndex - 1]);
            this.game.run();
          }
        }
      });
    }

    // Forward button

    // menu button

    // fullscreen button
    if (this.fullscreen !== null) {
      this.fullscreen.addEventListener('click', () => {
        this.toggleFullScreen();
      });
    }

    this.initLocalStorage();
    this.initChapters();
    this.initLevels();
    this.initEvents();
  }

  show(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'visible';
    this.displayStatus = 'menu';
  }

  hide(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'hidden';
  }

  // Chapters
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
    this.displayStatus = 'chapters';
  }
  hideChapters(): void {
    if (this.chaptersDiv !== null) this.chaptersDiv.style.visibility = 'hidden';
  }

  // Levels
  initLevels(): void {
    if (this.levelDiv != null) {
      const btns = this.levelDiv.children;
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
          this.level = Number((<HTMLButtonElement>e.target).value);
          this.game.engine.map.loadLevel(`${this.chapter}${this.level}`);
          this.hidelevels();
          this.game.run();
        });
      }
    }
  }

  showlevels(): void {
    if (this.levelDiv != null) this.levelDiv.style.visibility = 'visible';
    this.displayStatus = 'levels';
  }
  hidelevels(): void {
    if (this.levelDiv != null) this.levelDiv.style.visibility = 'hidden';
  }

  initEvents(): void {
    if (this.events !== null) {
      this.events.addEventListener('gameover', () => {
        const levelIndex = this.game.engine.map.levelIndex;
        this.game.stop();
        this.game.begin();
        this.game.engine.map.loadLevel(maps[levelIndex]);
        this.game.run();
      });

      this.events.addEventListener('fileFound', () => {
        const levelIndex = this.game.engine.map.levelIndex;
        this.game.stop();
        this.game.begin();
        this.game.engine.map.loadLevel(maps[levelIndex + 1]);
        this.game.run();
      });
    }
  }

  initLocalStorage(): void {
    if (this.storageAvailable()) {
      if (localStorage.getItem('game-storage') === null) {
        localStorage.setItem('game-storage', JSON.stringify({ levelIndex: 0 }));
      }
    }
  }

  setLocalStorage(key: string, value: string): void {
    const currentString = localStorage.getItem('game-storage');
    if (currentString !== null) {
      const currentJSON = JSON.parse(currentString);
      currentJSON[key] = value;
      localStorage.setItem('game-storage', JSON.stringify(currentJSON));
    }
  }

  getLocalStorage(key: string): string | boolean {
    const currentString = localStorage.getItem('game-storage');
    if (currentString !== null) {
      const currentJSON = JSON.parse(currentString);
      if (currentJSON[key] !== null) {
        return currentJSON[key];
      }
    }
    return false;
  }

  storageAvailable(): boolean {
    let storage;
    try {
      storage = window.localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return !(e instanceof DOMException);
    }
  }

  toggleFullScreen(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
    window.screen.orientation.lock('landscape');
  }
}
