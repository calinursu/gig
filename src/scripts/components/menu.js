import animationEvent from './animationEvent';

class Menu {
  constructor(el) {
    this.el = el; 
    this.menuActive = null;
    this.openButton = document.querySelector('.open-mobile-menu');
    this.background = this.el.querySelector('.mobile-menu-container .background');
    this.textOpen = document.querySelector('.menu-button-text.open');
    this.textClosed = document.querySelector('.menu-button-text.closed');

    this.openButton.addEventListener('click', this.open.bind(this));
  }

  open(e) {
    if(this.menuActive){
      document.body.classList.remove("mobile-menu-visible");
      this.textOpen.classList.remove("active");
      this.textClosed.classList.add("active");
      this.menuActive = false;
      e.currentTarget.classList.remove("active");
      this.el.classList.remove('is-visible');
      setTimeout(() => this.el.classList.add('is-hidden'), 800);
    }
    else {
      document.body.classList.add("mobile-menu-visible");
      this.textClosed.classList.remove("active");
      this.textOpen.classList.add("active");
      
      this.menuActive = true;
      this.openButton.classList.add("active");
      this.el.classList.remove('is-hidden')
      this.el.classList.add('is-visible');
    }
  }

  static init(selector = ".mobile-menu-container", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Menu(element);
    });
  }
}

export default Menu;


