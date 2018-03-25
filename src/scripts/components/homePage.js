import Console from './console';

class HomePage {
  constructor(el, app) {
    this.el = el;
    this.app = app;

    this.console = new Console(this.el.querySelector(".console"), this);

    this.introBox = this.el.querySelector(".intro-small-box");
    this.preloader = document.querySelector(".preloader");
    
    this.preloader.addEventListener("transitionend", this.animateHomeBox.bind(this), {once:true} );
    this.introBox.addEventListener("transitionend", this.console.startTypewritter.bind(this.console), {once:true});
  }

  animateHomeBox() {
    this.preloader.remove();
    this.introBox.classList.add("active");
  }
}

export default HomePage;


