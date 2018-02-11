import Scroll from './scroll';
import Menu from './menu';
import Nav from './nav';
import CasesPage from './casesPage';
import Noise from './noise';
import HomePage from './homePage';
import MessageContainer from './messageContainer';

class App {
  constructor(el) { 
    this.el = el;
    this.nav = new Nav(this);
    this.activePage = this.el.querySelector(".page.is-visible");
    
    Scroll.init();
    Menu.init();
    CasesPage.init();
    Noise.init();
    HomePage.init();
    
    document.body.classList.add("app-loaded");
  }

  onHireUsClick() {
    const hireUsPage = this.el.querySelector(".page.hire-us");
    
    this.activePage = this.el.querySelector(".page.is-visible");
    this.activePage.classList.remove("is-visible");
    this.activePage.classList.add("is-hidden");

    hireUsPage.classList.remove("is-hidden");
    hireUsPage.classList.add("is-visible");

    new MessageContainer();
  }

  updateActivePage() {
    this.activePage = this.el.querySelector(".page.is-visible");
  }
}

export default App;


