import animationEvent from './animationEvent';

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
    const mobile = document.querySelector('.mobile-menu-container.is-visible');

    if(nextPage && !nextPage.classList.contains('is-visible')) {

      //history.pushState(null, null, this.locationOrigin + '/' + this.el.dataset.url);
      this.currentPage = this.el.dataset.url;

      // verify if mobile menu is expanded, so the page animations will wait
      if(mobile !== null) {
        mobile.classList.remove('is-visible');
        setTimeout( () => {
          mobile.classList.add('is-hidden');
          activePage.classList.remove('is-visible');
        }, 800 );
      } else {
        Array.from(this.pagesContainer.querySelectorAll('.page'))
        .forEach(page => page.classList.remove('is-visible'));
      }
      
      var wanimationEvent = animationEvent(activePage);

      wanimationEvent && activePage.addEventListener(wanimationEvent, function showNextPage() {
        activePage.removeEventListener(wanimationEvent, showNextPage, false);

        activePage.classList.add('is-hidden');

        nextPage.classList.add('is-visible');
        nextPage.classList.remove('is-hidden');
        window.scrollTo(0,0);
      });


    }
    
  }


  static init(selector = ".main-menu-item", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Nav(element);
    });
  }
}

export default Nav;


