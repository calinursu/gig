import Typewritter from './typewritter';

class HomePage {
  constructor(el) {
    this.el = el;

    this.data = [
      {
        "text": "Obscurial",
        "tag": "span",
        "class": "intro-secondary-headline color-line"
      },
      {
        "text": " is a software consultancy company",
        "tag": "span",
        "class": "intro-secondary-headline",
        "newLine": true
      },
      {
        "text": "",
        "tag": "div",
        "class": "hr hide-desktop",
      },
      {
        "text": "we",
        "tag": "span",
        "class": "intro-secondary-headline"
      },
      {
        "text": " craft great experiences and love internet technologies",
        "tag": "span",
        "class": "intro-secondary-headline",
        "newLine": true
      },
      {
        "text": "",
        "tag": "div",
        "class": "hr"
      },
      {
        "text": "we ",
        "tag": "span",
        "class": "intro-secondary-headline"
      },
      {
        "text": " help businesses with",
        "tag": "span",
        "class": "intro-secondary-headline",
        "newLine": true
      },
      {
        "text": "",
        "tag": "div",
        "class": "pre-list"
      },
      {
        "text": "Software development",
        "tag": "span",
        "class": "intro-secondary-headline first translate same-line console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Digitization of Business Processes",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Integration",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Data handling",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item",
        "newLine": true
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "get in touch with us at ",
        "tag": "a",
        "class": "intro-secondary-headline last",
        "href": "mailto:hello@obscurial.dk"
      },
      {
        "text": "hello@obscurial.dk",
        "tag": "a",
        "class": "intro-secondary-headline last contact-line",
        "href": "mailto:hello@obscurial.dk",
        "newLine": true
      },
      {
        "text": "",
        "tag": "div",
      }
    ];

    this.introBox = this.el.querySelector(".intro-small-box");
    this.preloader = document.querySelector(".preloader");
    
    this.preloader.addEventListener("transitionend", this.animateHomeBox.bind(this));
    this.introBox.addEventListener("transitionend", this.startTypewritter.bind(this));
  }

  startTypewritter() {
    new Typewritter(this.data, this.el.querySelector(".text-container-content"), 35);
  }

  animateHomeBox() {
    this.preloader.remove();
    this.introBox.classList.add("active");
  }

  static init(selector = ".page.home", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new HomePage(element);
    });
  }
}

export default HomePage;


