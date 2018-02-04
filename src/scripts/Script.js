import Scroll from './components/scroll';
import Menu from './components/menu';
import Nav from './components/nav';
import CasesPage from './components/casesPage';
import Noise from './components/noise';
import HomePage from './components/homePage';

window.addEventListener('load', () => {
  Scroll.init();
  Menu.init();
  Nav.init();
  CasesPage.init();
  Noise.init();
  HomePage.init();
  document.body.classList.add("app-loaded");
});

