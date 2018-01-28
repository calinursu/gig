import Typewritter from './typewritter';

class HomePage {
  constructor(el) {
    console.log("HOMEPAGE");
    this.el = el;
    this.introBox = this.el.querySelector(".intro-small-box");

    this.introBox.addEventListener("transitionend", Typewritter.init);

    this.animateHomeBox();
  }

  animateHomeBox() {
    this.introBox.classList.add("active");
  }

  static init(selector = ".page.home", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new HomePage(element);
    });
  }
}

export default HomePage;


