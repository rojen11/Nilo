export default class Menu {
  private menuDiv = document.getElementById('menu')!;

  private playbtn = document.getElementById('play')!;

  constructor() {
    this.playbtn.addEventListener('click', () => {
      if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
        document.documentElement.requestFullscreen();
        window.screen.orientation.lock('landscape');
      }
    });
  }

  show() {
    this.menuDiv.style.visibility = 'visible';
  }

  hide() {
    this.menuDiv.style.visibility = 'hidden';
  }
}
