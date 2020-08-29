import Game from './game';
import Menu from './menu';

const game = new Game();
const menu = new Menu(game);

menu.show();
