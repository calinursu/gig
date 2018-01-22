class Menu {
  constructor(el) {
    this.el = el; 
    this.openButton = document.querySelector('.open-mobile-menu');
    this.closeButton = this.el.querySelector('.close-mobile-menu');
    this.background = this.el.querySelector('.mobile-menu-container .background');

    this.openButton.addEventListener('click', this.open.bind(this));
    this.closeButton.addEventListener('click', this.close.bind(this));
  }

  open() {
    this.el.classList.remove('is-hidden')
    this.el.classList.add('is-visible');
  }

  close() {
    this.el.classList.remove('is-visible');
    setTimeout( ()=> this.el.classList.add('is-hidden'), 800 );
  }

  animationEvent(el) {
      const transitions = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
      }

      for(let t in transitions) {
        if(el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }

  static init(selector = ".mobile-menu-container", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Menu(element);
    });
  }
}

export default Menu;


