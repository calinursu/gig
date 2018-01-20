class Typewritter {
  constructor() {
    this.data = ["type away", "xxx", "ca la Amsterdam"];
    this.startTypewritter(0, "h2", "intro-secondary-headline");
  }

  typewritter(text, i, line, cb) {
    if (i < text.length) {
      line.innerHTML += text.substring(i, i + 1);

      setTimeout(() => {
        this.typewritter(text, i + 1, line, cb);
      }, 60);
    }
    else {
      setTimeout(() => {
        cb();
      }, 400)
    }
  }

  startTypewritter(i, tag, name) {
    const line = document.createElement(tag);
    line.classList.add(name);
    document.querySelector(".text-container").appendChild(line);

    this.typewritter(this.data[i], 0, line, () => {
      this.startTypewritter(i + 1, tag, name);
    });
  }

  static init() {
    new Typewritter();
  }
}

export default Typewritter;