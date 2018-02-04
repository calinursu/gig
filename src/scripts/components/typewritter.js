class Typewritter {
  constructor(data, el, typingSpeed) {
    this.el = el;
    this.data = data;
    this.typingSpeed = typingSpeed;
    this.startTypewritter(0);
  }

  typewritter(text, i, newLine, line, cb) {
    if (i < text.length) {
      line.innerHTML += text.substring(i, i + 1);

      setTimeout(() => {
        this.typewritter(text, i + 1, newLine, line, cb);
      }, this.typingSpeed);
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
    if (i < this.data.length) { 
      if(this.data[i].tag) {
        const line = document.createElement(this.data[i].tag);
        const cursor = document.querySelector(".console-cursor");

        if (this.data[i].class) {
          line.className = this.data[i].class;
        }

        if (this.data[i].href) {
          line.href = this.data[i].href;
        }

        this.el.insertBefore(line, cursor);

        this.typewritter(this.data[i].text, 0, this.data[i].newLine, line, () => {
          this.startTypewritter(i + 1);
        });
      }
      else {
        const line = this.el;
        
        this.typewritter(this.data[i].text, 0, this.data[i].newLine, line, () => {
          this.startTypewritter(i + 1);
        });
      }
    } 
  }

  static init() {
    new Typewritter(this.el);
  }
}

export default Typewritter;