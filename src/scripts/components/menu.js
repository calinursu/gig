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
    if (this.hasClass(document.body, "mobile-menu-visible")){
      document.body.classList.remove("mobile-menu-visible");
      this.menuActive = false;

      this.el.classList.remove('is-visible');
      setTimeout(() => this.el.classList.add('is-hidden'), 800);
    }
    else {
      document.body.classList.add("mobile-menu-visible");
      this.menuActive = true;

      this.el.classList.remove('is-hidden')
      this.el.classList.add('is-visible');
    }
  }

  hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  static init(selector = ".mobile-menu-container", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Menu(element);
    });
  }
}

export default Menu;


