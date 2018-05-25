import Tracking from './components/tracking';
import Scroll from './components/scroll';

window.addEventListener('load', () => {
  Scroll.init();
});

setTimeout(() => {
  document.body.classList.add('page-loaded');  
}, 500);


