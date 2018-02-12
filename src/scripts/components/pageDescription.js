import Typewritter from './typewritter';

class PageDescription {
  constructor(el, app) { 
    this.el = el;
    this.app = app;
    this.visible = true;
  }

  changePageDescription(page) {
    const nextPageIndex = Array.from(this.app.pages).indexOf(page);

    const text = this.el.querySelector(".heading");
    const number = this.el.querySelector(".page-number");
    text.innerHTML = "";
    number.innerHTML = "";

    new Typewritter([{ "text": page.dataset.url }], text, 60);
    new Typewritter([{ "text": '0' + nextPageIndex }], number, 80);  
  }

  toggleFade() {
    this.el.classList.toggle("fade-out", this.visible);
    this.visible = !this.visible;
  }
}

export default PageDescription;


