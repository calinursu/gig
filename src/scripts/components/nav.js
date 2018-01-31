import Typewritter from './typewritter';
import animationEvent from './animationEvent';

class Nav {
  constructor(el) {
    this.el = el; 
    this.pagesContainer = document.querySelector('.content');
    this.locationOrigin = window.location.origin;

    this.el.addEventListener('click', this.loadPage.bind(this));
    document.querySelector(".mobile-menu-container").addEventListener('transitionend', this.changePageDescription.bind(this));
  }
  
  loadPage(event) {
    event.preventDefault();
    document.body.classList.remove("mobile-menu-visible");

    const activePage = this.pagesContainer.querySelector('.page.is-visible');
    this.nextPage = this.pagesContainer.querySelector('.page[data-url="' + this.el.dataset.url + '"]');
    const mobile = document.querySelector('.mobile-menu-container.is-visible');

    if (this.nextPage && !this.nextPage.classList.contains('is-visible')) {
      //history.pushState(null, null, this.locationOrigin + '/' + this.el.dataset.url);
      this.currentPage = this.el.dataset.url;

      const that = this;

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

      let animation = animationEvent(activePage);

      // animation && activePage.addEventListener(animation, function showNextPage() {
        // activePage.removeEventListener(animation, showNextPage, false);
        activePage.classList.remove('is-visible');
        activePage.classList.add('is-hidden');

        this.nextPage.classList.add('is-visible');
        this.nextPage.classList.remove('is-hidden');
        that.changePageDescription();
        window.scrollTo(0,0);
      // });

      
    } 
  }

  changePageDescription() {
    const pageDescription = document.querySelector(".page-description .heading");
    const pageDescriptionNumber = document.querySelector(".page-description .page-number");
    const nextPageIndex = Array.from(document.querySelectorAll(".page")).indexOf(this.nextPage);
    
    pageDescription.innerHTML = "";
    pageDescriptionNumber.innerHTML = "";

    new Typewritter([{ "text": this.nextPage.dataset.url }], pageDescription, 60);
    new Typewritter([{ "text": '0'+nextPageIndex.toString() }], pageDescriptionNumber, 80);
  }

  static init(selector = ".main-menu-item", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Nav(element);
    });
  }
}

export default Nav;


