import Scroll from './scroll';
import Menu from './menu';
import Nav from './nav';
import CasesPage from './casesPage';
import Noise from './noise';
import HomePage from './homePage';
import MessageContainer from './messageContainer';
import PageDescription from './pageDescription';

class App {
  constructor(el) { 
    this.el = el;
    this.nav = new Nav(this);
    this.pages = this.el.querySelectorAll(".page");
    this.activePage = this.el.querySelector(".page.is-visible");
    this.pageDescription = new PageDescription(this.el.querySelector(".page-description"), this);
    
    Scroll.init();
    Menu.init();
    CasesPage.init();
    Noise.init();
    HomePage.init();
    
    document.body.classList.add("app-loaded");
  }

  onHireUsClick() {
    const hireUsPage = this.el.querySelector(".page.hire-us");
    const pageDescription = this.el.querySelector(".page-description");
    
    this.activePage = this.el.querySelector(".page.is-visible");
    this.activePage.classList.remove("is-visible");
    this.activePage.classList.add("is-hidden");

    hireUsPage.classList.remove("is-hidden");
    hireUsPage.classList.add("is-visible");
    this.pageDescription.toggleFade();

    new MessageContainer(this);
  }

  updateActivePage() {
    this.activePage = this.el.querySelector(".page.is-visible");
  }

  changePageDescription(page) {
    this.pageDescription.changePageDescription(page);
  }
}

export default App;


