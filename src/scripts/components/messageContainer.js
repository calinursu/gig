import Message from "./message";
import Answer from "./answer";

class MessageContainer {
  constructor() {
    this.messages = [];
    this.activeMessage;
    this.choice = document.querySelector(".sender");
    this.messageList = document.querySelector(".messages");

    this.messagesData = [
        {
          "text": "Hey Calin. What can we help you with?",
          "auto": true
        },
        {
          "text": "You can help me with",
          "options": ["stuff", "a website"],
          "auto": false
        },
        {
          "text": "What else?",
          "auto": true
        },
        {
          "text": "I would also like",
          "auto": false,
          "userFill": true
        },
        {
          "text": "Do you want to suck a big one?",
          "auto": true,
        },
        {
          "text": "Yes, I would like a",
          "options": ["big one", "small one"],
          "auto": false,
        }
    ];

    const message = new Message(this.messagesData[0].text, 0, this, this.messagesData[0].options, this.messagesData[0].auto, this.messagesData[0].userFill);
  }

  nextMessage() {
    if (this.activeMessage.auto === true) {
      const activeIndex = this.messages.length;

      if (activeIndex != this.messagesData.length) {
        new Message(this.messagesData[activeIndex].text, activeIndex, this, this.messagesData[activeIndex].options, this.messagesData[activeIndex].auto, this.messagesData[activeIndex].userFill);
      }
      else {
        return
      }
    }
  }

  insertAnswer() {
    // const template = this.el.cloneNode();
    // template.innerHTML = `${this.activeMessage.text} ${this.activeMessage.userInput}`;
    new Answer(this);
    // this.nextMessage();
  }

  static init() {
    new MessageContainer();
  }
}

export default MessageContainer;