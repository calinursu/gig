import Scroll from './scroll';
import Nav from './nav';
import CasesPage from './casesPage';
import Noise from './noise';
import HomePage from './homePage';
import MessageContainer from './messageContainer';
import PageDescription from './pageDescription';
import VoiceRecognition from './voiceRecognition';

class App {
  constructor(el) {   
    this.el = el;

    this.activePage = this.el.querySelector(".page.is-visible");
    this.transitionEl = this.el.querySelector(".page-transition");
    this.subpage = this.activePage.dataset.url !== "home";
    
    this.transitionEl.addEventListener("animationend", this.removeTransition.bind(this));
    
    Noise.init();
    document.body.classList.add("app-loaded");
    this.loadBackgroundData();

    window.onpopstate = function (e) {
      window.location.replace(window.location.href);
    };
  }

  async loadBackgroundData() {
    const response = await fetch('/main.html');
    const data = await response.text();
    const temp = document.createElement('div');
    temp.innerHTML = data; 
    const pages = Array.from(temp.querySelectorAll(".page")).filter(p => p.dataset.url != this.activePage.dataset.url);
    pages.forEach(p => this.el.querySelector("main").appendChild(p));
    this.el = document.body;

    this.init();
  }

  init() {
    this.pages = Array.from(this.el.querySelectorAll(".page"));
    this.nav = new Nav(this.el.querySelector("header"), this);
    this.pageDescription = new PageDescription(this.el.querySelector(".page-description"), this);
    this.homepage = new HomePage(this.el.querySelector(".page.home"), this);
    this.messageContainer = new MessageContainer(this);

    if (window.innerWidth > 1024) this.voiceRecognition = new VoiceRecognition(this);
    Scroll.init();
    CasesPage.init();
  }

  onHireUsClick() {
    this.pageDescription.toggleFade();
  }

  pageTransiton(url) {
    this.transitionEl.classList.add("is-visible");
    setTimeout(() => {this.showPage(url);}, 500);
  }

  removeTransition() {
    this.transitionEl.classList.remove("is-visible");
  }

  showPage(url) {
    this.activePage.classList.remove("is-visible");

    this.activePage = this.pages.filter(p => p.dataset.url === url)[0];
    this.appendUrl();

    this.activePage.classList.add("is-visible");
    setTimeout(() => { this.pageDescription.changePageDescription(); }, 800);
  }

  goToPage(url) {
    if (this.activePage.dataset.url === url) { return; }
    if(!this.pageDescription.visible){this.pageDescription.toggleFade();}
    if(url === "hireus") { this.onHireUsClick(); }

    if(this.nav.menuActive) {
      this.nav.toggleMenu();
      this.showPage(url);
    } 
    else { 
      this.pageTransiton(url);
    }
    
    //REFACTOR THIS !!
    const contentContainer = document.querySelector('.case-single-container');
    const content = contentContainer.querySelector('.case-single.is-visible');
    if (content !== null) {
      contentContainer.classList.remove('is-visible');
      content.classList.remove('is-visible');
    }
    this.el.querySelector(".main-elements-container").classList.remove('has-overlay');
  }

  appendUrl() {
    history.pushState(this.activePage.dataset.url, this.activePage.dataset.url, this.activePage.dataset.url);
  }

  onSpeechStart() {
    this.nav.onSpeechStart();
  }

  onSpeechMatch() {
    this.nav.onSpeechMatch();
  }

  onSpeechError() {
    this.nav.onSpeechError();
  }
}

export default App;


