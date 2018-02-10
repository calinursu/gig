import Typewritter from "./typewritter"

class Message {
  constructor(text, index, messageContainer, options, auto, userFill) {
    this.el = document.importNode(document.querySelector("#message-sender-template").content, true).querySelector('.message');
    this.text = text;
    this.index = index;
    this.messageContainer = messageContainer;
    this.options = options || null;
    this.auto = auto || null;
    this.userFill = userFill || null;
    this.userInput = null;

    this.addMessage();

    if (this.options || this.userFill) {
      document.querySelectorAll(".send").forEach(el => { el.addEventListener("click", this.onSendClick.bind(this)); });
    }
  }

  templateWithOption(args) {
    return `
      <div>${this.text}</div>
      <span class="user-input"></span>
      ${args.map((arg, index) => `<button class="send" data-index=${index}>${arg}</button>`).join("")}`;
  }

  templateWithText() {
    return `
      <span>${this.text}</span>
      <span><input type="text"></span>
      <button class="send">SEND</button>`;
  }

  template() {
    return `<div>${this.text}</div>`;
  }

  addMessage() {
    // this.el.querySelector(".message-text").innerHTML = this.text;
    new Typewritter([{ "text": this.text }], this.el.querySelector(".message-text"), 25);

    if (this.auto) {
      this.messageContainer.messageList.appendChild(this.el);
    }
    if (this.options && !this.auto) {
      this.messageContainer.senderElement.innerHTML = this.templateWithOption(this.options);
    }
    if (this.userFill && !this.auto) {
      this.messageContainer.senderElement.innerHTML = this.templateWithText();
    }

    this.pushMessage();
  }

  pushMessage() {
    this.messageContainer.messages.push(this);
    this.messageContainer.activeMessage = this;
    if (this.auto === true) {
      this.nextMessage();
    }
  }

  onSendClick(e) {
    this.auto = true;
    this.userInput = this.options ? this.options[e.currentTarget.dataset.index] : this.messageContainer.senderElement.querySelector("input").value;
    this.messageContainer.insertAnswer();
  }

  nextMessage() {
    this.messageContainer.nextMessage();
  }
}

export default Message