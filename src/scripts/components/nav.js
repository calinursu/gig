import Typewritter from './typewritter';
import animationEvent from './animationEvent';
import Utils from './utils';

class Nav {
  constructor(el) {
    this.el = el; 
    this.pagesContainer = document.querySelector('.content');
    this.locationOrigin = window.location.origin;
    this.menuClosing = false;
    this.menu = document.querySelector('.main-elements-container');

    // elements for case page, when you have a case open and you want to navigate back to cases
    this.contentContainer = document.querySelector('.case-single-container');
    this.section = document.querySelector('.cases .section-title-container');

    // homepage fadeup when navigating
    this.homePage = document.querySelector('.page.home');
    this.homePageText = this.homePage.children[0];
    this.homePageBox = this.homePage.children[1];

    this.el.addEventListener('click', this.loadPage.bind(this));
    // document.querySelector(".mobile-menu-container").addEventListener('animationend', this.changePageDescription.bind(this));
  }
  
  loadPage(event) {

    event.preventDefault();
    document.body.classList.remove('mobile-menu-visible');

    const activePage = this.pagesContainer.querySelector('.page.is-visible');
    this.nextPage = this.pagesContainer.querySelector('.page[data-url="' + this.el.dataset.url + '"]');
    const mobile = document.querySelector('.mobile-menu-container.is-visible');

    this.menu.classList.remove('has-overlay');

    // Close any case when navigating through pages
    const content = this.contentContainer.querySelector('.case-single.is-visible');
    if(content !== null) {
      this.contentContainer.classList.remove('is-visible');
      content.classList.remove('is-visible'); 
    }

    // Homepage fadeup
    this.homePageText.classList.add('fade-up');
    this.homePageBox.classList.add('fade-up', 'second');
 

    if (this.nextPage && !this.nextPage.classList.contains('is-visible')) {
      //history.pushState(null, null, this.locationOrigin + '/' + this.el.dataset.url);
      this.currentPage = this.el.dataset.url;

      const that = this;

      if(mobile !== null) {
         mobile.classList.remove('is-visible');
        setTimeout( () => {
          mobile.classList.add('is-hidden');
          activePage.classList.remove('is-visible');
          that.changePageDescription();
        }, 800 );
      } else {
        activePage.classList.remove('is-visible');
      }
     

      let animation = animationEvent(activePage);
      activePage.classList.remove('is-visible');
      activePage.classList.add('is-hidden');

      this.nextPage.classList.add('is-visible');
      this.nextPage.classList.remove('is-hidden');
      window.scrollTo(0,0);
    } else {

       if(mobile !== null) {
         mobile.classList.remove('is-visible');
          setTimeout( () => {
            mobile.classList.add('is-hidden');
          }, 800 );
       }

      
      this.section.style.display = 'block';
    }
  }

  changePageDescription(e) {
    console.log("changePageDescription");
    
    const pageDescription = document.querySelector(".page-description .heading");
    const pageDescriptionNumber = document.querySelector(".page-description .page-number");
    const nextPageIndex = Array.from(document.querySelectorAll(".page")).indexOf(this.nextPage);

    pageDescription.innerHTML = "";
    pageDescriptionNumber.innerHTML = "";

    new Typewritter([{ "text": this.nextPage.dataset.url }], pageDescription, 60);
    new Typewritter([{ "text": '0' + nextPageIndex.toString() }], pageDescriptionNumber, 80);  
    this.menuClosing = false;
  }

  static init(selector = ".menu-item", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Nav(element);
    });
  }
}

export default Nav;


