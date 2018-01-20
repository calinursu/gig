import Noise from './components/noise';
import Scroll from './components/scroll';
import Typewritter from './components/typewritter';

window.addEventListener('load', () => {
  Noise.init();
  Scroll.init();
  Typewritter.init();
});