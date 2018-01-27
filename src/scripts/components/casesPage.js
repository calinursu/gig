class CasesPage {
  constructor(el) {
    this.el = el;
    this.caseImage = this.el.querySelector(".case-image");
    this.menu = document.querySelector(".main-elements-container");

    this.caseImage.addEventListener('click', this.loadCase.bind(this));

  }

  loadCase(e) {
    this.caseImage.classList.add('is-selected');
    this.menu.classList.add('has-overlay');
  }

  static init(selector = ".case-container", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new CasesPage(element);
    });
  }
}

export default CasesPage;


