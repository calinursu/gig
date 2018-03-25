import Typewritter from './typewritter';

class Console {
  constructor(el, homepage) {
    this.el = el; 
    this.homepage = homepage;
    this.data = [
      {
        "text": "Obscurial",
        "tag": "span",
        "class": "intro-secondary-headline color-line"
      },
      {
        "text": " is a software consultancy ",
        "tag": "span",
        "class": "intro-secondary-headline after-color",
      },
      {
        "text": "company",
        "tag": "span",
        "class": "intro-secondary-headline after-color",
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
        "text": "Web & Mobile application development",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item"
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
        "text": "Data handling & Tracking",
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
        "tag": "span",
        "class": "intro-secondary-headline before-contact-line"
      },
      {
        "text": "info@obscurial.dk",
        "tag": "a",
        "class": "intro-secondary-headline contact-line",
        "href": "mailto:info@obscurial.dk",
        "newLine": true
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "type 'help' for a list of available commands",
        "tag": "div",
        "class": "intro-secondary-headline last hide-mobile",
        "newLine": true
      },
      {
        "text": "",
        "tag": "br",
        "class":"hide-mobile"
      },
    ];

    this.commands = ["voice", "help"];
    this.input = this.el.querySelector(".console-cursor");
    this.content = this.el.querySelector(".console-content");
    this.textWritting = true;

    this.el.addEventListener("click", this.onConsoleClick.bind(this));
    this.el.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  startTypewritter() {
    new Typewritter(this.data, this.content, 35, this.onTerminalIntroEnd.bind(this));
  }

  onTerminalIntroEnd() {
    this.textWritting = false;
    this.focusOnInput();
  }

  onConsoleClick() {
    this.focusOnInput();
  }

  focusOnInput() {
    if(!this.textWritting) { this.el.querySelector(".console-cursor").focus(); }
  }

  onKeyDown(e) {
    if(e.key === "Enter") {
      this.insertText();
      this.evaluateText();
    }
  }

  insertText() {
    const template = document.createElement("div");

    template.classList.add("user-input");
    template.innerHTML = this.input.innerText;
    this.content.insertBefore(template, this.input);

    setTimeout(() => {
      this.input.innerHTML = "";
      this.input.innerText = "";
    }, 0);
  }

  evaluateText() {
    //REFACTOR
    if(this.commands[0] === this.input.innerText) {
      new Typewritter([{ "text": "voice navigation activated. Use speech to navigate", "tag":"div", "class":"feedback" }], this.content, 25);
      this.homepage.app.voiceRecognition.start();
    }
    else if(this.commands[1] === this.input.innerText) {
      new Typewritter([{ "text": "command available", "tag": "div", "class": "feedback" }, { "text": "- voice", "tag": "div", "class": "feedback" }], this.content, 25);
    }
    else { 
      new Typewritter([{ "text": "internal command not recognized", "tag":"div", "class":"feedback" }], this.content, 25);
    }
  }
}

export default Console