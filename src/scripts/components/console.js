class Console {
  constructor(el, app) {
    this.el = el; 
    this.app = app;

    this.commands = ["voice"];
    this.input = this.el.querySelector(".console-cursor");
    this.content = this.el.querySelector(".console-content");

    this.el.addEventListener("click", this.onConsoleClick.bind(this));
    this.el.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onConsoleClick() {
    this.focusOnInput();
  }

  focusOnInput() {
    this.el.querySelector(".console-cursor").focus();
  }

  onKeyDown(e) {
    if(e.key === "Enter") {
      this.insertText();
      this.evaluateText();
    }
  }

  insertText() {
    const template = document.createElement("span");

    template.classList.add("intro-secondary-headline");
    template.innerHTML = this.input.innerHTML;
    this.content.insertBefore(template, this.input);
  }

  evaluateText() {
    //REFACTOR
    if(this.commands[0] === this.input.innerHTML) {
      this.app.voiceRecognition.start();
      this.input.innerHTML = "";
    }
  }
}

export default Console