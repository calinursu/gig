import App from './components/app';
import Tracking from './components/tracking';

window.addEventListener('load', () => {
  new App(document.body);
  new Tracking();
});

