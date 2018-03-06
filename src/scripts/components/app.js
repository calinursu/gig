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
    this.nav = new Nav(this.el.querySelector("header"), this);
    this.pages = Array.from(this.el.querySelectorAll(".page"));
    this.activePage = this.el.querySelector(".page.is-visible");
    this.pageDescription = new PageDescription(this.el.querySelector(".page-description"), this);
    this.transitionEl = this.el.querySelector(".page-transition");
    
    Scroll.init();
    Menu.init();
    CasesPage.init();
    Noise.init();
    HomePage.init();

    this.transitionEl.addEventListener("animationend", this.removeTransition.bind(this));
    
    document.body.classList.add("app-loaded");
  }

  onHireUsClick() {
    this.pageDescription.toggleFade();
    new MessageContainer(this);
  }

  pageTransiton(url) {
    if (this.activePage.dataset.url === url) { return; }
    this.transitionEl.classList.add("is-visible");
    setTimeout(() => {this.showPage(url);}, 500);
  }

  removeTransition() {
    this.transitionEl.classList.remove("is-visible");
  }

  showPage(url) {
    this.activePage.classList.remove("is-visible");

    this.activePage = this.pages.filter(p => p.dataset.url === url)[0];
    this.activePage.classList.add("is-visible");
  }

  goToPage(url) {
    if(!this.pageDescription.visible){this.pageDescription.toggleFade();}
    if(this.nav.menuActive) {
      this.nav.toggleMenu();
      this.showPage(url);
    } 
    else { 
      this.pageTransiton(url);
    }
    
    setTimeout(() => { this.pageDescription.changePageDescription(); }, 800);
  
    //REFACTOR THIS !!
    const contentContainer = document.querySelector('.case-single-container');
    const content = contentContainer.querySelector('.case-single.is-visible');
    if (content !== null) {
      contentContainer.classList.remove('is-visible');
      content.classList.remove('is-visible');
    }
    this.el.querySelector(".main-elements-container").classList.remove('has-overlay');
  }
}

export default App;


