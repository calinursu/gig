import Message from "./message";
import Answer from "./answer";

class MessageContainer {
  constructor(app) {
    this.messages = [];
    this.activeMessage;
    this.app = app;

    this.choice = document.querySelector(".sender");
    this.messageList = document.querySelector(".messages");

    this.messagesData = [
        {
          "text": "Hello, we are Obscurial.",
          "auto": true
        },
        {
          "text": "What brings you to us?",
          "auto": true
        },
        {
          "text": "My name is",
          "auto": false,
          "userFill": true
        },
        {
          "text": "What can we help you with?",
          "auto": true
        },
        {
          "text": "Obscurial can help me with",
          "options": ["Web application development", "Software Development", "Machine learning", "SEO", "Web Optimization"],
          "auto": false,
        },
        {
          "text": "That sounds great. Can you give us more details?",
          "auto": true,
        },
        {
          "text": "Yes, I need",
          "auto": false,
          "userFill": true
        },
        {
          "text": "Do you have a deadline for this project?",
          "auto": true,
        },
        {
          "text": "It would be great if we could have it done within",
          "options": ["1 month", "3 months", "6 months", "a year"],
          "auto": false,
        },
        {
          "text": "What's the budget for this project?",
          "auto": true,
        },
        {
          "text": "The budget for the project is",
          "options": ["50,000dkk and up", "between 200,000dkk to 500,000dkk", "more than 500,000dkk", "To be decided"],
          "auto": false,
        },
        {
          "text": "Sounds awesome! How can we reach you?",
          "auto": true,
        },
        {
          "text": "Here's my email address",
          "userFill":true
        },
        {
          "text": "Got it, we will get back to you in max. 2 days 🙌",
          "auto": true,
        }
    ];

    this.resetHtml();
    this.choice.classList.remove("outro");
    this.choice.addEventListener("animationend", this.init.bind(this), { once:true });
  }

  resetHtml() {
    this.choice.innerHTML = "";
    this.messageList.innerHTML = "";
  }

  nextMessage() {
    if (this.activeMessage.auto === true) {
      const activeIndex = this.messages.length;

      if (activeIndex != this.messagesData.length) {
        new Message(this.messagesData[activeIndex].text, activeIndex, this, this.messagesData[activeIndex].options, this.messagesData[activeIndex].auto, this.messagesData[activeIndex].userFill);
      }
      else {
        fetch("https://us-central1-crypto-truck-119913.cloudfunctions.net/addMessage", {
          body: JSON.stringify({"data":this.messages.filter(m => m.userInput !== null).map(m => m.userInput)}), // must match 'Content-Type' header
          headers: {
            'content-type': 'application/json'
          },
          mode: 'cors',
          method: 'POST',
        })
        this.app.pageDescription.toggleFade();
        this.choice.classList.add("outro");
      }
    }
  }

  insertAnswer() {
    new Answer(this);
  }

  init() {
    new Message(this.messagesData[0].text, 0, this, this.messagesData[0].options, this.messagesData[0].auto, this.messagesData[0].userFill);
  }
}

export default MessageContainer;