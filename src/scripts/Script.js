import Scroll from './components/scroll';
import Menu from './components/menu';
import Nav from './components/nav';
import CasesPage from './components/casesPage';
import Noise from './components/noise';
import HomePage from './components/homePage';
import MessageContainer from './components/messageContainer';

window.addEventListener('load', () => {
  new Nav();
  Scroll.init();
  Menu.init();
  CasesPage.init();
  Noise.init();
  HomePage.init();
  MessageContainer.init();
  document.body.classList.add("app-loaded");
});

