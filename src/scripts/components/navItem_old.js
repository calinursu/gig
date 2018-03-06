import Typewritter from './typewritter';
import animationEvent from './animationEvent';
import Utils from './utils';

class NavItem {
  constructor(el, nav) {
    this.el = el; 
    this.pagesContainer = document.querySelector('.content');
    this.menu = document.querySelector('.main-elements-container');
    this.nav = nav;

    // elements for case page, when you have a case open and you want to navigate back to cases
    this.contentContainer = document.querySelector('.case-single-container');
    this.section = document.querySelector('.cases .section-title-container');

    // homepage fadeup when navigating
    this.homePage = document.querySelector('.page.home');
    this.homePageText = this.homePage.children[0];
    this.homePageBox = this.homePage.children[1];

    this.el.addEventListener('click', this.loadPage.bind(this));
  }
  
  loadPage(event) {
    if(this.el.dataset.url === "hireus") { this.onHireUsClick(event); }
    event.preventDefault();
    document.body.classList.remove('mobile-menu-visible');

    const activePage = this.pagesContainer.querySelector('.page.is-visible');
    this.nextPage = this.pagesContainer.querySelector('.page[data-url="' + this.el.dataset.url + '"]');
    this.nav.nextPage = this.nextPage;
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
      this.currentPage = this.el.dataset.url;

      const that = this;

      if(mobile !== null) {
         mobile.classList.remove('is-visible');
        setTimeout( () => {
          mobile.classList.add('is-hidden');
          activePage.classList.remove('is-visible');
          this.nav.changePageDescription(this.nextPage);
        }, 800 );
      } else {
        activePage.classList.remove('is-visible');
        this.nav.changePageDescription(this.nextPage);
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

  onHireUsClick(e) {
    e.preventDefault();
    this.nextPage = this.pagesContainer.querySelector('.page[data-url="' + this.el.dataset.url + '"]'); // ugly hack,please refactor
    this.nav.onHireUsClick(); 
    this.nav.changePageDescription(this.nextPage);
  }
}

export default NavItem;

