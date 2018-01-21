import Noise from './components/noise';
import Scroll from './components/scroll';
import Menu from './components/menu';

window.addEventListener('load', () => {
  Noise.init();
  Scroll.init();
  Menu.init();
});