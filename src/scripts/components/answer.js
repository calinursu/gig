class Answer {
  constructor(messageContainer) {
    this.el = document.importNode(document.querySelector("#answer-template").content, true).querySelector('.message');
    this.messageContainer = messageContainer;

    this.addAnswer();
    this.el.addEventListener("animationend", this.addNextMessage.bind(this));
  }

  addAnswer(){
    this.el.innerHTML = `${this.messageContainer.activeMessage.text} ${this.messageContainer.activeMessage.userInput}`;
    this.messageContainer.messageList.appendChild(this.el);
    setTimeout(() => { this.el.classList.add("active"); }, 0);
  }

  addNextMessage() {
    this.messageContainer.nextMessage();
  }
}

export default Answer