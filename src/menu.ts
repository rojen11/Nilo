import Game from './game';

export default class Menu {
  private menuDiv = document.getElementById('menu')!;

  private playbtn = document.getElementById('play')!;

  constructor(game: Game) {
    this.playbtn.addEventListener('click', () => {
      console.log('here');
      if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
        document.documentElement.requestFullscreen();
        window.screen.orientation.lock('landscape');
      }
      this.hide();
      game.run();
    });
  }

  show() {
    this.menuDiv.style.visibility = 'visible';
  }

  hide() {
    this.menuDiv.style.visibility = 'hidden';
  }
}
