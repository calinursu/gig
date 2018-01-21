class Nav {
  constructor(el) {
    this.el = el; 
    this.pagesContainer = document.querySelector('.content');
    this.locationOrigin = window.location.origin;

    this.el.addEventListener('click', this.loadPage.bind(this));
  }


  loadPage(event) {
    event.preventDefault();

    const activePage = this.pagesContainer.querySelector('.page.is-visible');
    const nextPage = this.pagesContainer.querySelector('.page[data-url="' + this.el.dataset.url + '"]');

    if(nextPage && !nextPage.classList.contains('is-visible')) {

      history.pushState(null, null, this.locationOrigin + '/' + this.el.dataset.url);
      this.currentPage = this.el.dataset.url;

      Array.from(this.pagesContainer.querySelectorAll('.page'))
        .forEach(page => page.classList.remove('is-visible'));
      

      var animationEvent = this.whichAnimationEvent(activePage);

      animationEvent && activePage.addEventListener(animationEvent, function showNextPage() {
        activePage.removeEventListener(animationEvent, showNextPage, false);

        activePage.classList.add('is-hidden');

        nextPage.classList.add('is-visible');
        nextPage.classList.remove('is-hidden');
        window.scrollTo(0,0);
      });


    }
    
  }

  whichAnimationEvent(el) {
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

  static init(selector = ".main-menu-item", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Nav(element);
    });
  }
}

export default Nav;

