import Game from './game';

export default class Menu {
  private menuDiv = document.getElementById('menu');

  private playbtn = document.getElementById('play');

  constructor(game: Game) {
    if (this.menuDiv !== null && this.playbtn !== null) {
      this.playbtn.addEventListener('click', () => {
        if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
          document.documentElement.requestFullscreen();
          window.screen.orientation.lock('landscape');
        }
        this.hide();
        game.run();
      });
    } else {
      console.error('menu or play button not found');
    }
  }

  show(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'visible';
  }

  hide(): void {
    if (this.menuDiv !== null) this.menuDiv.style.visibility = 'hidden';
  }
}
