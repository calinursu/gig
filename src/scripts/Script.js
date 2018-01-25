import Noise from './components/noise';
import Scroll from './components/scroll';
import Menu from './components/menu';
import Typewritter from './components/typewritter';
import Nav from './components/nav';

window.addEventListener('load', () => {
  Noise.init();
  Scroll.init();
  Menu.init();
  //Typewritter.init();
  Nav.init();
});