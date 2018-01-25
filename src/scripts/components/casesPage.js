class CasesPage {
  constructor(el) {
    this.el = el;
    this.cases = this.el.querySelectorAll(".case-container");

    this.cases.forEach((item) => {
      item.addEventListener("click", this.onCaseClick.bind(this));
    });
  }

  onCaseClick(e) {
    // this.activeCase = this.cases[Array.from(this.cases).indexOf(e.currentTarget)];
    // this.activeCase.classList.add("active");
    // this.el.classList.add("case-expanded");
  }

  static init(selector = ".cases", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new CasesPage(element);
    });
  }
}

export default CasesPage;


