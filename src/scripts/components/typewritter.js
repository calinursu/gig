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
        "newLine": "true"
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
        "newLine": "true"
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
        "newLine": "true"
      },
      {
        "text": "",
        "tag": "div",
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
        "text": "get in touch with us at ",
        "tag": "a",
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

  typewritter(text, newLine, i, line, cb) {
    if (i < text.length) {
      line.innerHTML += text.substring(i, i + 1);

      setTimeout(() => {
        this.typewritter(text, newLine, i + 1, line, cb);
      }, 50);
    }
    else if(newLine === "true"){
      setTimeout(() => {
        cb();
      }, 400)
    }
    else {
      cb();
    }
  }

  startTypewritter(i) {
    const line = document.createElement(this.data[i].tag);
    
    if (this.data[i].tag === "a"){
      line.href = this.data[i].href;
    }

    line.className = this.data[i].class;
    document.querySelector(".text-container").appendChild(line);    

    this.typewritter(this.data[i].text, this.data[i].newLine, 0, line, () => {
      this.startTypewritter(i + 1);
    });
  }

  static init() {
    new Typewritter();
  }
}

export default Typewritter;