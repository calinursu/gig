import Typewritter from "./typewritter"

class Message {
  constructor(text, index, messageContainer, options, auto, userFill) {
    this.el = document.importNode(document.querySelector("#question-template").content, true).querySelector('.message');
    this.text = text;
    this.index = index;
    this.messageContainer = messageContainer;
    this.options = options;
    this.auto = auto;
    this.userFill = userFill;
    this.userInput = null;

    this.addMessage();

    if (this.options || this.userFill) {
      document.querySelectorAll(".send").forEach(el => { el.addEventListener("click", this.onSendClick.bind(this)); });
    }
  }

  choiceTemplateWithOption(args) {
    return `
      <div class="user-choice">
        <span>${this.text}</span>
        <span class="user-input"></span>
        ${args.map((arg, index) => `<button class="send" data-index=${index}>${arg}</button>`).join("")}
      </div>`;
  }

  choiceTemplateWithText() {
    return `
      <div class="user-choice">
        <span>${this.text}</span>
        <span><input class="choice-input" type="text"></span>
        <button class="send">></button>
      </div>`;
  }

  addMessage() {
    if (this.auto) {
      this.messageContainer.messageList.appendChild(this.el);
      this.messageContainer.messageList.scrollTop = this.el.offsetTop + 700;
      new Typewritter([{ "text": this.text }], this.el.querySelector(".message-text"), 25, this.pushMessage.bind(this));
    }
    else {
      this.messageContainer.choice.innerHTML = this.userFill ? this.choiceTemplateWithText() : this.choiceTemplateWithOption(this.options);
      this.messageContainer.choice.querySelector(".user-choice").classList.add("active");
    }
  }

  pushMessage() {
    this.messageContainer.messages.push(this);
    this.messageContainer.activeMessage = this;
    if (this.auto === true) {
      this.nextMessage();
    }
  }

  onSendClick(e) {
    this.pushMessage();
    this.auto = true;
    this.userInput = this.options ? this.options[e.currentTarget.dataset.index] : this.messageContainer.choice.querySelector("input").value;
    this.messageContainer.choice.innerHTML = "";
    this.messageContainer.insertAnswer();
  }

  nextMessage() {
    this.messageContainer.nextMessage();
  }
}

export default Message