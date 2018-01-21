class Typewritter {
  constructor() {
    this.data = [
      { 
        "text":"Obscurial is a software consultancy company",
        "tag":"h2",
        "class":"intro-secondary-headline"
      },
      {
        "text": "we craft great experiences and love internet technologies",
        "tag": "h2",
        "class": "intro-secondary-headline"
      },
      {
        "text": "we help businesses with",
        "tag": "h2",
        "class": "intro-secondary-headline"
      },
      {
        "text": "Web application development",
        "tag": "div",
        "class": "console-list-item first"
      },
      {
        "text": "Web application development",
        "tag": "div",
        "class": "console-list-item"
      },
      {
        "text": "Web application development",
        "tag": "div",
        "class": "console-list-item"
      },
      {
        "text": "Web application development",
        "tag": "div",
        "class": "console-list-item last"
      },
      {
        "text": "get in touch with us at hello@obscurial.dk",
        "tag": "a",
        "class": "intro-secondary-headline contact-line",
        "href": "mailto:hello@obscurial.dk"
      }
    ];
    this.startTypewritter(0, "h2", "intro-secondary-headline");
  }

  typewritter(text, i, line, cb) {
    if (i < text.length) {
      line.innerHTML += text.substring(i, i + 1);

      setTimeout(() => {
        this.typewritter(text, i + 1, line, cb);
      }, 40);
    }
    else {
      setTimeout(() => {
        cb();
      }, 200)
    }
  }

  startTypewritter(i) {
    const line = document.createElement(this.data[i].tag);
    if (this.data[i].tag === "a"){
      line.href = this.data[i].href;
    }
    line.className = this.data[i].class;
    document.querySelector(".text-container").appendChild(line);

    this.typewritter(this.data[i].text, 0, line, () => {
      this.startTypewritter(i + 1);
    });
  }

  static init() {
    new Typewritter();
  }
}

export default Typewritter;