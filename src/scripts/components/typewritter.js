class Typewritter {
  constructor() {
    this.data = [
      {
        "text": "Obscurial",
        "tag": "span",
        "class": "intro-secondary-headline contact-line"
      },
      { 
        "text":" is a software consultancy company",
        "tag":"span",
        "class":"intro-secondary-headline",
        "newLine": true
      },
      {
        "text": "",
        "tag": "div",
        "class": "intro-secondary-headline",
      },
      {
        "text": "we",
        "tag": "span",
        "class": "intro-secondary-headline contact-line"
      },
      {
        "text": " craft great experiences and love internet technologies",
        "tag": "span",
        "class": "intro-secondary-headline",
        "newLine":true
      },
      {
        "text": "",
        "tag": "div",
        "class": "intro-secondary-headline"
      },
      {
        "text": "we ",
        "tag": "span",
        "class": "intro-secondary-headline contact-line"
      },
      {
        "text": " help businesses with",
        "tag": "span",
        "class": "intro-secondary-headline",
        "newLine":true
      },
      {
        "text": "Web application development",
        "tag": "span",
        "class": "intro-secondary-headline first translate same-line console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Web application development",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Web application development",
        "tag": "span",
        "class": "intro-secondary-headline translate console-list-item"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "Web application development",
        "tag": "span",
        "class": "intro-secondary-headline last translate console-list-item last"
      },
      {
        "text": "",
        "tag": "br",
      },
      {
        "text": "get in touch with us at ",
        "tag": "span",
        "class": "intro-secondary-headline",
        "href": "mailto:hello@obscurial.dk"
      },
      {
        "text": "hello@obscurial.dk",
        "tag": "a",
        "class": "intro-secondary-headline contact-line",
        "href": "mailto:hello@obscurial.dk"
      }
    ];
    this.startTypewritter(0, "h2", "intro-secondary-headline");
  }

  typewritter(text, i, newLine, line, cb) {
    if (i < text.length) {
      line.innerHTML += text.substring(i, i + 1);

      setTimeout(() => {
        this.typewritter(text, i + 1, newLine, line, cb);
      }, 40);
    }
    else if(newLine === true) {
      setTimeout(() => {
        cb();
      }, 400);
    }
    else {
      cb();
    }
  }

  startTypewritter(i) {
    const line = document.createElement(this.data[i].tag);
    const cursor = document.querySelector(".console-cursor");
    line.className = this.data[i].class;
    document.querySelector(".text-container").insertBefore(line, cursor);

    this.typewritter(this.data[i].text, 0, this.data[i].newLine, line, () => {
      this.startTypewritter(i + 1);
    });
  }

  static init() {
    new Typewritter();
  }
}

export default Typewritter;