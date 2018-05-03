import Tracking from './components/tracking';
import Scroll from './components/scroll';

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
  new Tracking();
  Scroll.init();
});

