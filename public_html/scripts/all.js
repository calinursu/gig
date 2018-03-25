(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _tracking = require('./components/tracking');

var _tracking2 = _interopRequireDefault(_tracking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  new _app2.default(document.body);
  new _tracking2.default();
});

},{"./components/app":4,"./components/tracking":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var whichAnimationEvent = function whichAnimationEvent(el) {
  var transitions = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

exports.default = whichAnimationEvent;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Answer = function () {
  function Answer(messageContainer) {
    _classCallCheck(this, Answer);

    this.el = document.importNode(document.querySelector("#answer-template").content, true).querySelector('.message');
    this.messageContainer = messageContainer;

    this.addAnswer();
    this.el.addEventListener("animationend", this.addNextMessage.bind(this));
  }

  _createClass(Answer, [{
    key: "addAnswer",
    value: function addAnswer() {
      var _this = this;

      this.el.innerHTML = this.messageContainer.activeMessage.text + " <span class=\"highlight\">" + this.messageContainer.activeMessage.userInput + "</span>";
      this.messageContainer.messageList.appendChild(this.el);
      setTimeout(function () {
        _this.el.classList.add("active");
      }, 0);
    }
  }, {
    key: "addNextMessage",
    value: function addNextMessage() {
      this.messageContainer.nextMessage();
    }
  }]);

  return Answer;
}();

exports.default = Answer;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var _casesPage = require('./casesPage');

var _casesPage2 = _interopRequireDefault(_casesPage);

var _noise = require('./noise');

var _noise2 = _interopRequireDefault(_noise);

var _homePage = require('./homePage');

var _homePage2 = _interopRequireDefault(_homePage);

var _messageContainer = require('./messageContainer');

var _messageContainer2 = _interopRequireDefault(_messageContainer);

var _pageDescription = require('./pageDescription');

var _pageDescription2 = _interopRequireDefault(_pageDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(el) {
    _classCallCheck(this, App);

    this.el = el;
    this.nav = new _nav2.default(this.el.querySelector("header"), this);
    this.pages = Array.from(this.el.querySelectorAll(".page"));
    this.activePage = this.el.querySelector(".page.is-visible");
    this.pageDescription = new _pageDescription2.default(this.el.querySelector(".page-description"), this);
    this.transitionEl = this.el.querySelector(".page-transition");

    _scroll2.default.init();
    _menu2.default.init();
    _casesPage2.default.init();
    _noise2.default.init();
    _homePage2.default.init();

    this.transitionEl.addEventListener("animationend", this.removeTransition.bind(this));

    document.body.classList.add("app-loaded");
  }

  _createClass(App, [{
    key: 'onHireUsClick',
    value: function onHireUsClick() {
      this.pageDescription.toggleFade();
      new _messageContainer2.default(this);
    }
  }, {
    key: 'pageTransiton',
    value: function pageTransiton(url) {
      var _this = this;

      if (this.activePage.dataset.url === url) {
        return;
      }
      this.transitionEl.classList.add("is-visible");
      setTimeout(function () {
        _this.showPage(url);
      }, 500);
    }
  }, {
    key: 'removeTransition',
    value: function removeTransition() {
      this.transitionEl.classList.remove("is-visible");
    }
  }, {
    key: 'showPage',
    value: function showPage(url) {
      this.activePage.classList.remove("is-visible");

      this.activePage = this.pages.filter(function (p) {
        return p.dataset.url === url;
      })[0];
      this.activePage.classList.add("is-visible");
    }
  }, {
    key: 'goToPage',
    value: function goToPage(url) {
      var _this2 = this;

      if (!this.pageDescription.visible) {
        this.pageDescription.toggleFade();
      }
      if (this.nav.menuActive) {
        this.nav.toggleMenu();
        this.showPage(url);
      } else {
        this.pageTransiton(url);
      }

      setTimeout(function () {
        _this2.pageDescription.changePageDescription();
      }, 800);

      //REFACTOR THIS !!
      var contentContainer = document.querySelector('.case-single-container');
      var content = contentContainer.querySelector('.case-single.is-visible');
      if (content !== null) {
        contentContainer.classList.remove('is-visible');
        content.classList.remove('is-visible');
      }
      this.el.querySelector(".main-elements-container").classList.remove('has-overlay');
    }
  }]);

  return App;
}();

exports.default = App;

},{"./casesPage":5,"./homePage":6,"./menu":7,"./messageContainer":9,"./nav":10,"./noise":12,"./pageDescription":13,"./scroll":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationEvent = require('./animationEvent');

var _animationEvent2 = _interopRequireDefault(_animationEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CasesPage = function () {
  function CasesPage(el) {
    var _this = this;

    _classCallCheck(this, CasesPage);

    this.el = el;

    this.cases = document.querySelectorAll('.case-container');
    this.otherCases = Array.from(this.cases).filter(function (singleCase) {
      return singleCase !== _this.el;
    });
    this.caseImage = this.el.querySelector('.case-image');

    this.menu = document.querySelector('.main-elements-container');

    this.contentContainer = document.querySelector('.case-single-container');
    this.content = this.contentContainer.querySelector('.case-single[data-name="' + this.el.dataset.name + '"]');

    this.text = this.content.querySelector('.case-single-content');
    this.background = this.content.querySelector('.background');
    this.closeCaseButtons = this.content.querySelectorAll('.close-case');

    this.section = document.querySelector('.cases .section-title-container');

    this.caseImage.addEventListener('click', this.loadCase.bind(this));

    this.closeCaseButtons.forEach(function (button) {
      return button.addEventListener('click', _this.exitCase.bind(_this));
    });
  }

  _createClass(CasesPage, [{
    key: 'loadCase',
    value: function loadCase(e) {
      window.hasCaseOpen = true;

      this.otherCases.forEach(function (other) {
        return other.classList.add('detach');
      });

      this.caseImage.classList.add('is-selected');
      this.menu.classList.add('has-overlay');
      this.menu.classList.remove('has-fade');

      this.contentContainer.classList.add('is-visible');
      this.content.classList.add('is-visible');

      this.text.classList.remove('out');
      this.background.classList.remove('out');

      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 1700);

      var that = this;
      var animation = (0, _animationEvent2.default)(this.content);
      animation && this.content.addEventListener(animation, function showCase() {
        that.content.removeEventListener(animation, showCase, false);

        that.caseImage.classList.remove('is-selected');
        that.section.style.display = 'none';
      }, false);
    }
  }, {
    key: 'exitCase',
    value: function exitCase(e) {
      e.preventDefault();

      this.otherCases.forEach(function (other) {
        return other.classList.remove('detach');
      });
      this.caseImage.classList.remove('is-selected');
      this.text.classList.add('out');

      var background = this.contentContainer.querySelector('.case-single.is-visible .background');

      var textAnimation = (0, _animationEvent2.default)(this.text);
      var that = this;

      textAnimation && this.text.addEventListener(textAnimation, function fadeOutText() {
        that.text.removeEventListener(textAnimation, fadeOutText, false);

        window.scrollTo(0, 0);
        that.section.style.display = 'block';
        background.classList.add('out');

        var animation = (0, _animationEvent2.default)(background);
        animation && background.addEventListener(animation, function hideCase() {
          background.removeEventListener(animation, hideCase, false);

          that.contentContainer.classList.remove('is-visible');
          that.content.classList.remove('is-visible');
          that.menu.classList.remove('has-overlay');
          that.menu.classList.add('has-fade');
        }, false);
      }, false);
    }
  }], [{
    key: 'init',
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".case-container";
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new CasesPage(element);
      });
    }
  }]);

  return CasesPage;
}();

exports.default = CasesPage;

},{"./animationEvent":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typewritter = require("./typewritter");

var _typewritter2 = _interopRequireDefault(_typewritter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomePage = function () {
  function HomePage(el) {
    _classCallCheck(this, HomePage);

    this.el = el;

    this.data = [{
      "text": "Obscurial",
      "tag": "span",
      "class": "intro-secondary-headline color-line"
    }, {
      "text": " is a software consultancy ",
      "tag": "span",
      "class": "intro-secondary-headline after-color"
    }, {
      "text": "company",
      "tag": "span",
      "class": "intro-secondary-headline after-color",
      "newLine": true
    }, {
      "text": "",
      "tag": "div",
      "class": "hr hide-desktop"
    }, {
      "text": "we",
      "tag": "span",
      "class": "intro-secondary-headline"
    }, {
      "text": " craft great experiences and love internet technologies",
      "tag": "span",
      "class": "intro-secondary-headline",
      "newLine": true
    }, {
      "text": "",
      "tag": "div",
      "class": "hr"
    }, {
      "text": "we ",
      "tag": "span",
      "class": "intro-secondary-headline"
    }, {
      "text": " help businesses with",
      "tag": "span",
      "class": "intro-secondary-headline",
      "newLine": true
    }, {
      "text": "",
      "tag": "div",
      "class": "pre-list"
    }, {
      "text": "Software development",
      "tag": "span",
      "class": "intro-secondary-headline first translate same-line console-list-item"
    }, {
      "text": "",
      "tag": "br"
    }, {
      "text": "Web & Mobile application development",
      "tag": "span",
      "class": "intro-secondary-headline translate console-list-item"
    }, {
      "text": "",
      "tag": "br"
    }, {
      "text": "Digitization of Business Processes",
      "tag": "span",
      "class": "intro-secondary-headline translate console-list-item"
    }, {
      "text": "",
      "tag": "br"
    }, {
      "text": "Data handling & Tracking",
      "tag": "span",
      "class": "intro-secondary-headline translate console-list-item",
      "newLine": true
    }, {
      "text": "",
      "tag": "br"
    }, {
      "text": "get in touch with us at ",
      "tag": "span",
      "class": "intro-secondary-headline last before-contact-line"
    }, {
      "text": "info@obscurial.dk",
      "tag": "a",
      "class": "intro-secondary-headline last contact-line",
      "href": "mailto:info@obscurial.dk",
      "newLine": true
    }, {
      "text": "",
      "tag": "div"
    }];

    this.introBox = this.el.querySelector(".intro-small-box");
    this.preloader = document.querySelector(".preloader");

    this.preloader.addEventListener("transitionend", this.animateHomeBox.bind(this), { once: true });
    this.introBox.addEventListener("transitionend", this.startTypewritter.bind(this), { once: true });
  }

  _createClass(HomePage, [{
    key: "startTypewritter",
    value: function startTypewritter() {
      new _typewritter2.default(this.data, this.el.querySelector(".text-container-content"), 35);
    }
  }, {
    key: "animateHomeBox",
    value: function animateHomeBox() {
      this.preloader.remove();
      this.introBox.classList.add("active");
    }
  }], [{
    key: "init",
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".page.home";
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new HomePage(element);
      });
    }
  }]);

  return HomePage;
}();

exports.default = HomePage;

},{"./typewritter":16}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationEvent = require('./animationEvent');

var _animationEvent2 = _interopRequireDefault(_animationEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu(el) {
    _classCallCheck(this, Menu);

    this.el = el;
    this.menuActive = null;
    this.openButton = document.querySelector('.open-mobile-menu');
    this.background = this.el.querySelector('.mobile-menu-container .background');
    this.textOpen = document.querySelector('.menu-button-text.open');
    this.textClosed = document.querySelector('.menu-button-text.closed');

    this.openButton.addEventListener('click', this.open.bind(this));
  }

  _createClass(Menu, [{
    key: 'open',
    value: function open(e) {
      // if (this.hasClass(document.body, "mobile-menu-visible")){
      //   document.body.classList.remove("mobile-menu-visible");
      //   this.menuActive = false;

      //   this.el.classList.remove('is-visible');
      //   setTimeout(() => this.el.classList.add('is-hidden'), 800);
      // }
      // else {
      //   document.body.classList.add("mobile-menu-visible");
      //   this.menuActive = true;

      //   this.el.classList.remove('is-hidden')
      //   this.el.classList.add('is-visible');
      // }
    }
  }, {
    key: 'hasClass',
    value: function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  }], [{
    key: 'init',
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".mobile-menu-container";
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new Menu(element);
      });
    }
  }]);

  return Menu;
}();

exports.default = Menu;

},{"./animationEvent":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typewritter = require("./typewritter");

var _typewritter2 = _interopRequireDefault(_typewritter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message(text, index, messageContainer, options, auto, userFill) {
    var _this = this;

    _classCallCheck(this, Message);

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
      document.querySelectorAll(".send").forEach(function (el) {
        el.addEventListener("click", _this.onSendClick.bind(_this));
      });
    }
  }

  _createClass(Message, [{
    key: "choiceTemplateWithOption",
    value: function choiceTemplateWithOption(args) {
      return "\n      <div class=\"user-choice\">\n        <span>" + this.text + "</span>\n        <span class=\"user-input\"></span>\n        " + args.map(function (arg, index) {
        return "<button class=\"send\" data-index=" + index + ">" + arg + "</button>";
      }).join("") + "\n      </div>";
    }
  }, {
    key: "choiceTemplateWithText",
    value: function choiceTemplateWithText() {
      return "\n      <div class=\"user-choice\">\n        <span>" + this.text + "</span>\n        <span><input class=\"choice-input\" type=\"text\"></span>\n        <button class=\"send\">></button>\n      </div>";
    }
  }, {
    key: "addMessage",
    value: function addMessage() {

      if (this.auto) {
        this.messageContainer.messageList.appendChild(this.el);
        this.messageContainer.messageList.scrollTop = this.el.offsetTop + 700;
        new _typewritter2.default([{ "text": this.text }], this.el.querySelector(".message-text"), 25, this.pushMessage.bind(this));
      } else {
        this.messageContainer.choice.innerHTML = this.userFill ? this.choiceTemplateWithText() : this.choiceTemplateWithOption(this.options);
        this.messageContainer.choice.querySelector(".user-choice").classList.add("active");
      }
    }
  }, {
    key: "pushMessage",
    value: function pushMessage() {
      this.messageContainer.messages.push(this);
      this.messageContainer.activeMessage = this;
      if (this.auto === true) {
        this.nextMessage();
      }
    }
  }, {
    key: "onSendClick",
    value: function onSendClick(e) {
      this.pushMessage();
      this.auto = true;
      this.userInput = this.options ? this.options[e.currentTarget.dataset.index] : this.messageContainer.choice.querySelector("input").value;
      this.messageContainer.choice.innerHTML = "";
      this.messageContainer.insertAnswer();
    }
  }, {
    key: "nextMessage",
    value: function nextMessage() {
      this.messageContainer.nextMessage();
    }
  }]);

  return Message;
}();

exports.default = Message;

},{"./typewritter":16}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require("./message");

var _message2 = _interopRequireDefault(_message);

var _answer = require("./answer");

var _answer2 = _interopRequireDefault(_answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageContainer = function () {
  function MessageContainer(app) {
    _classCallCheck(this, MessageContainer);

    this.messages = [];
    this.activeMessage;
    this.app = app;

    this.choice = document.querySelector(".sender");
    this.messageList = document.querySelector(".messages");

    this.messagesData = [{
      "text": "Hello, we are Obscurial.",
      "auto": true
    }, {
      "text": "What brings you to us?",
      "auto": true
    }, {
      "text": "My name is",
      "auto": false,
      "userFill": true
    }, {
      "text": "What can we help you with?",
      "auto": true
    }, {
      "text": "Obscurial can help me with",
      "options": ["Web application development", "Software Development", "Machine learning", "SEO", "Web Optimization"],
      "auto": false
    }, {
      "text": "That sounds great. Can you give us more details?",
      "auto": true
    }, {
      "text": "Yes, I need",
      "auto": false,
      "userFill": true
    }, {
      "text": "Do you have a deadline for this project?",
      "auto": true
    }, {
      "text": "It would be great if we could have it done within",
      "options": ["1 month", "3 months", "6 months", "a year"],
      "auto": false
    }, {
      "text": "What's the budget for this project?",
      "auto": true
    }, {
      "text": "The budget for the project is",
      "options": ["50,000dkk and up", "between 200,000dkk to 500,000dkk", "more than 500,000dkk", "To be decided"],
      "auto": false
    }, {
      "text": "Sounds awesome! How can we reach you?",
      "auto": true
    }, {
      "text": "Here's my email address",
      "userFill": true
    }, {
      "text": "Got it, we will get back to you in max. 2 days נ™",
      "auto": true
    }];

    this.resetHtml();
    this.choice.classList.remove("outro");
    this.choice.addEventListener("animationend", this.init.bind(this), { once: true });
  }

  _createClass(MessageContainer, [{
    key: "resetHtml",
    value: function resetHtml() {
      this.choice.innerHTML = "";
      this.messageList.innerHTML = "";
    }
  }, {
    key: "nextMessage",
    value: function nextMessage() {
      if (this.activeMessage.auto === true) {
        var activeIndex = this.messages.length;

        if (activeIndex != this.messagesData.length) {
          new _message2.default(this.messagesData[activeIndex].text, activeIndex, this, this.messagesData[activeIndex].options, this.messagesData[activeIndex].auto, this.messagesData[activeIndex].userFill);
        } else {
          this.app.pageDescription.toggleFade();
          this.choice.classList.add("outro");
        }
      }
    }
  }, {
    key: "insertAnswer",
    value: function insertAnswer() {
      new _answer2.default(this);
    }
  }, {
    key: "init",
    value: function init() {
      new _message2.default(this.messagesData[0].text, 0, this, this.messagesData[0].options, this.messagesData[0].auto, this.messagesData[0].userFill);
    }
  }]);

  return MessageContainer;
}();

exports.default = MessageContainer;

},{"./answer":3,"./message":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _navItem = require("./navItem");

var _navItem2 = _interopRequireDefault(_navItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nav = function () {
  function Nav(el, app) {
    var _this = this;

    _classCallCheck(this, Nav);

    this.app = app;
    this.el = el;

    this.menuActive = false;
    this.menuButton = this.el.querySelector(".menu-button-container");
    this.menuContainer = this.el.querySelector(".menu-container");
    this.navItemList = Array.from(this.el.querySelectorAll(".menu-item")).map(function (el) {
      return new _navItem2.default(el, _this);
    });

    this.menuButton.addEventListener("click", this.toggleMenu.bind(this));
  }

  _createClass(Nav, [{
    key: "onHireUsClick",
    value: function onHireUsClick() {
      this.app.onHireUsClick();
    }
  }, {
    key: "onOpenMenuClick",
    value: function onOpenMenuClick() {
      this.toggleMenu();
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      this.menuContainer.classList.toggle("is-visible", !this.menuActive);
      this.menuContainer.classList.toggle("is-hidden", this.menuActive);
      this.el.classList.toggle("menu-active", !this.menuActive);
      this.menuActive = !this.menuActive;
    }
  }, {
    key: "onNavItemClick",
    value: function onNavItemClick(item) {
      this.app.goToPage(item.el.dataset.url);
      if (item.el.dataset.url === "hireus") {
        this.app.onHireUsClick();
      }
    }
  }]);

  return Nav;
}();

exports.default = Nav;

},{"./navItem":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typewritter = require('./typewritter');

var _typewritter2 = _interopRequireDefault(_typewritter);

var _animationEvent = require('./animationEvent');

var _animationEvent2 = _interopRequireDefault(_animationEvent);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavItem = function () {
  function NavItem(el, nav) {
    _classCallCheck(this, NavItem);

    this.el = el;
    this.nav = nav;

    this.el.addEventListener("click", this.onNavItemClick.bind(this));
  }

  _createClass(NavItem, [{
    key: 'onNavItemClick',
    value: function onNavItemClick(e) {
      e.preventDefault();
      this.nav.onNavItemClick(this);
    }
  }]);

  return NavItem;
}();

exports.default = NavItem;

},{"./animationEvent":2,"./typewritter":16,"./utils":17}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Noise = function () {
  function Noise(el) {
    _classCallCheck(this, Noise);

    this.canvas;
    this.ctx;
    this.wWidth;
    this.wHeight;
    this.noiseData = [];
    this.frame = 0;
    this.loopTimeout;
    this.resizeThrottle;

    this.canvas = document.querySelector('.with-noise');
    this.ctx = this.canvas.getContext('2d');

    //window.addEventListener('resize', this.reset.bind(this));

    // if(window.innerWidth > 767)
    this.setup();
  }

  _createClass(Noise, [{
    key: 'createNoise',
    value: function createNoise() {
      var idata = this.ctx.createImageData(this.wWidth, this.wHeight);
      var buffer32 = new Uint32Array(idata.data.buffer);
      var len = buffer32.length;

      for (var i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }

      this.noiseData.push(idata);
    }
  }, {
    key: 'paintNoise',
    value: function paintNoise() {
      if (this.frame === 9) {
        this.frame = 0;
      } else {
        this.frame++;
      }

      this.ctx.putImageData(this.noiseData[this.frame], 0, 0);
    }
  }, {
    key: 'loop',


    // Loop
    value: function loop() {
      var _this = this;

      this.paintNoise(this.frame);

      this.loopTimeout = window.setTimeout(function () {
        window.requestAnimationFrame(_this.loop.bind(_this));
      }, 1000 / 25);
    }
  }, {
    key: 'setup',


    // Setup
    value: function setup() {
      this.wWidth = window.innerWidth * 2;
      this.wHeight = window.innerHeight * 2;

      this.canvas.width = this.wWidth;
      this.canvas.height = this.wHeight;

      this.noiseData = [];

      for (var i = 0; i < 10; i++) {
        this.createNoise();
      }

      this.loop();
    }
  }, {
    key: 'reset',


    // Reset
    value: function reset() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        window.clearTimeout(_this2.resizeThrottle);
        _this2.resizeThrottle = window.setTimeout(function () {
          window.clearTimeout(_this2.loopTimeout);
          _this2.setup();
        }, 1000);
      }, false);
    }
  }], [{
    key: 'init',
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".with-noise";
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new Noise(element);
      });
    }
  }]);

  return Noise;
}();

exports.default = Noise;

// const noise = () => {
//   let canvas, ctx;
//   let wWidth, wHeight;
//   let noiseData = [];
//   let frame = 0;
//   let loopTimeout;


//   // Create Noise
//   const createNoise = () => {
//     const idata = ctx.createImageData(wWidth, wHeight);
//     const buffer32 = new Uint32Array(idata.data.buffer);
//     const len = buffer32.length;

//     for (let i = 0; i < len; i++) {
//       if (Math.random() < 0.5) {
//         buffer32[i] = 0xff000000;
//       }
//     }

//     noiseData.push(idata);
//   };


//   // Play Noise
//   const paintNoise = () => {
//     if (frame === 9) {
//       frame = 0;
//     } else {
//       frame++;
//     }

//     ctx.putImageData(noiseData[frame], 0, 0);
//   };


//   // Loop
//   const loop = () => {
//     paintNoise(frame);

//     loopTimeout = window.setTimeout(() => {
//       window.requestAnimationFrame(loop);
//     }, (1000 / 25));
//   };


//   // Setup
//   const setup = () => {
//     wWidth = window.innerWidth;
//     wHeight = window.innerHeight;

//     canvas.width = wWidth;
//     canvas.height = wHeight;

//     for (let i = 0; i < 10; i++) {
//       createNoise();
//     }

//     loop();
//   };


//   // Reset
//   let resizeThrottle;
//   const reset = () => {
//     window.addEventListener('resize', () => {
//       window.clearTimeout(resizeThrottle);

//       resizeThrottle = window.setTimeout(() => {
//         window.clearTimeout(loopTimeout);
//         setup();
//       }, 200);
//     }, false);
//   };


//   // Init
//   const init = (() => {
//     canvas = document.getElementById('noise');
//     ctx = canvas.getContext('2d');

//     setup();
//   })();
// };
// noise();

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typewritter = require("./typewritter");

var _typewritter2 = _interopRequireDefault(_typewritter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageDescription = function () {
  function PageDescription(el, app) {
    _classCallCheck(this, PageDescription);

    this.el = el;
    this.app = app;
    this.visible = true;
  }

  _createClass(PageDescription, [{
    key: "changePageDescription",
    value: function changePageDescription() {
      var page = this.app.activePage;
      var nextPageIndex = this.app.pages.indexOf(page);

      var text = this.el.querySelector(".heading");
      var number = this.el.querySelector(".page-number");
      text.innerHTML = "";
      number.innerHTML = "";

      new _typewritter2.default([{ "text": page.dataset.url }], text, 60);
      new _typewritter2.default([{ "text": '0' + nextPageIndex }], number, 80);
    }
  }, {
    key: "toggleFade",
    value: function toggleFade() {
      this.el.classList.toggle("fade-out", this.visible);
      this.visible = !this.visible;
    }
  }]);

  return PageDescription;
}();

exports.default = PageDescription;

},{"./typewritter":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function () {
  function Scroll(el) {
    _classCallCheck(this, Scroll);

    this.el = el;
    this.windowScrollTop = 0;
    this.speed = this.el.dataset.speed;

    if (window.innerWidth > 768) document.addEventListener('scroll', this.setTopScroll.bind(this)), this.move();
  }

  _createClass(Scroll, [{
    key: 'move',
    value: function move() {
      var windowHeight = window.innerHeight,
          movement = -windowHeight / 2.5,
          start = 260,
          stop = this.speed ? this.speed * 180 : 1870,
          percent = (this.windowScrollTop - start) / (stop - start),
          destY = movement * percent,
          transform = this.el.style.transform;

      var currentY = void 0,
          newY = void 0;

      transform ? currentY = parseFloat(transform.split(',')[1]) : currentY = 0;
      newY = currentY + (destY - currentY) * 0.1;
      this.el.style.transform = 'translate3d(0, ' + newY + 'px, 0)';
      window.requestAnimationFrame(this.move.bind(this));
    }
  }, {
    key: 'setTopScroll',
    value: function setTopScroll(e) {
      this.windowScrollTop = window.pageYOffset;
    }
  }], [{
    key: 'init',
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.move';
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new Scroll(element);
      });
    }
  }]);

  return Scroll;
}();

exports.default = Scroll;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tracking = function () {
  function Tracking(el) {
    _classCallCheck(this, Tracking);

    this.init();
  }

  _createClass(Tracking, [{
    key: 'init',
    value: function init() {
      setTimeout(function () {
        (function (h, o, t, j, a, r) {
          h.hj = h.hj || function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
          h._hjSettings = { hjid: 668637, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      }, 4000);
    }
  }]);

  return Tracking;
}();

exports.default = Tracking;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Typewritter = function () {
  function Typewritter(data, el, typingSpeed, endCb) {
    _classCallCheck(this, Typewritter);

    this.el = el;
    this.data = data;
    this.typingSpeed = typingSpeed;
    this.startTypewritter(0);
    this.endCb = endCb;
  }

  _createClass(Typewritter, [{
    key: "typewritter",
    value: function typewritter(text, i, newLine, line, cb) {
      var _this = this;

      if (i < text.length) {
        line.innerHTML += text.substring(i, i + 1);

        setTimeout(function () {
          _this.typewritter(text, i + 1, newLine, line, cb);
        }, this.typingSpeed);
      } else if (newLine === true) {
        setTimeout(function () {
          cb();
        }, 600);
      } else {
        cb();
      }
    }
  }, {
    key: "startTypewritter",
    value: function startTypewritter(i) {
      var _this2 = this;

      if (i < this.data.length) {
        if (this.data[i].tag) {
          var line = document.createElement(this.data[i].tag);
          var cursor = document.querySelector(".console-cursor");

          if (this.data[i].class) {
            line.className = this.data[i].class;
          }

          if (this.data[i].href) {
            line.href = this.data[i].href;
          }

          this.el.insertBefore(line, cursor);

          this.typewritter(this.data[i].text, 0, this.data[i].newLine, line, function () {
            _this2.startTypewritter(i + 1);
          });
        } else {
          var _line = this.el;

          this.typewritter(this.data[i].text, 0, this.data[i].newLine, _line, function () {
            _this2.startTypewritter(i + 1);
          });
        }
      } else {
        if (this.endCb) this.endCb();
      }
    }
  }], [{
    key: "init",
    value: function init() {
      new Typewritter(this.el);
    }
  }]);

  return Typewritter;
}();

exports.default = Typewritter;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils(el) {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'hasClass',
    value: function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  }]);

  return Utils;
}();

exports.default = Utils;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9TY3JpcHQuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2FuaW1hdGlvbkV2ZW50LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9hbnN3ZXIuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2FwcC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvY2FzZXNQYWdlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9ob21lUGFnZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVudS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVzc2FnZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVzc2FnZUNvbnRhaW5lci5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZJdGVtLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9ub2lzZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFnZURlc2NyaXB0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zY3JvbGwuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3RyYWNraW5nLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy90eXBld3JpdHRlci5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLE9BQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtBQUNwQyxvQkFBUSxTQUFTLElBQWpCO0FBQ0E7QUFDRCxDQUhEOzs7Ozs7OztBQ0hBLElBQU0sc0JBQXNCLFNBQXRCLG1CQUFzQixDQUFDLEVBQUQsRUFBUTtBQUM5QixNQUFNLGNBQWM7QUFDbEIsaUJBQVksY0FETTtBQUVsQixrQkFBYSxlQUZLO0FBR2xCLG9CQUFlLGNBSEc7QUFJbEIsdUJBQWtCO0FBSkEsR0FBcEI7O0FBT0EsT0FBSSxJQUFJLENBQVIsSUFBYSxXQUFiLEVBQTBCO0FBQ3hCLFFBQUcsR0FBRyxLQUFILENBQVMsQ0FBVCxNQUFnQixTQUFuQixFQUE4QjtBQUM1QixhQUFPLFlBQVksQ0FBWixDQUFQO0FBQ0Q7QUFDRjtBQUNOLENBYkQ7O2tCQWVlLG1COzs7Ozs7Ozs7Ozs7O0lDZlQsTTtBQUNKLGtCQUFZLGdCQUFaLEVBQThCO0FBQUE7O0FBQzVCLFNBQUssRUFBTCxHQUFVLFNBQVMsVUFBVCxDQUFvQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLE9BQS9ELEVBQXdFLElBQXhFLEVBQThFLGFBQTlFLENBQTRGLFVBQTVGLENBQVY7QUFDQSxTQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxTQUFLLFNBQUw7QUFDQSxTQUFLLEVBQUwsQ0FBUSxnQkFBUixDQUF5QixjQUF6QixFQUF5QyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBekM7QUFDRDs7O ך      ך                     רי             `צי     ˆך             @ך      @      @ך             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 ך      ך                     רי             `צי     ˆך             @ך      @      @ך             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zs7a0JBR1ksVzs7Ozs7Ozs7Ozs7OztJQ2pFVCxLO0FBQ0osaUJBQVksRUFBWixFQUFlO0FBQUE7QUFDZDs7Ozs2QkFFZSxPLEVBQVMsRyxFQUFJO0FBQzNCLGFBQU8sQ0FBQyxNQUFNLFFBQVEsU0FBZCxHQUEwQixHQUEzQixFQUFnQyxPQUFoQyxDQUF3QyxNQUFNLEdBQU4sR0FBWSxHQUFwRCxJQUEyRCxDQUFDLENBQW5FO0FBQ0Q7Ozs7OztrQkFHWSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL2FwcCc7XG5pbXBvcnQgVHJhY2tpbmcgZnJvbSAnLi9jb21wb25lbnRzL3RyYWNraW5nJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIG5ldyBBcHAoZG9jdW1lbnQuYm9keSk7XG4gIG5ldyBUcmFja2luZygpO1xufSk7XG5cbiIsImNvbnN0IHdoaWNoQW5pbWF0aW9uRXZlbnQgPSAoZWwpID0+IHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25zID0ge1xuICAgICAgICAnYW5pbWF0aW9uJzonYW5pbWF0aW9uZW5kJyxcbiAgICAgICAgJ09BbmltYXRpb24nOidvQW5pbWF0aW9uRW5kJyxcbiAgICAgICAgJ01vekFuaW1hdGlvbic6J2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICdXZWJraXRBbmltYXRpb24nOid3ZWJraXRBbmltYXRpb25FbmQnXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICBpZihlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xuICAgICAgICB9XG4gICAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdoaWNoQW5pbWF0aW9uRXZlbnQ7IiwiY2xhc3MgQW5zd2VyIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZUNvbnRhaW5lcikge1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5pbXBvcnROb2RlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYW5zd2VyLXRlbXBsYXRlXCIpLmNvbnRlbnQsIHRydWUpLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlJyk7XG4gICAgdGhpcy5tZXNzYWdlQ29udGFpbmVyID0gbWVzc2FnZUNvbnRhaW5lcjtcblxuICAgIHRoaXMuYWRkQW5zd2VyKCk7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIHRoaXMuYWRkTmV4dE1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhZGRBbnN3ZXIoKXtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGAke3RoaXMubWVzc2FnZUNvbnRhaW5lci5hY3RpdmVNZXNzYWdlLnRleHR9IDxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0XCI+JHt0aGlzLm1lc3NhZ2VDb250YWluZXIuYWN0aXZlTWVzc2FnZS51c2VySW5wdXR9PC9zcGFuPmA7XG4gICAgdGhpcy5tZXNzYWdlQ29udGFpbmVyLm1lc3NhZ2VMaXN0LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7IH0sIDApO1xuICB9XG5cbiAgYWRkTmV4dE1lc3NhZ2UoKSB7XG4gICAgdGhpcy5tZXNzYWdlQ29udGFpbmVyLm5leHRNZXNzYWdlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5zd2VyIiwiaW1wb3J0IFNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgTWVudSBmcm9tICcuL21lbnUnO1xuaW1wb3J0IE5hdiBmcm9tICcuL25hdic7XG5pbXBvcnQgQ2FzZXNQYWdlIGZyb20gJy4vY2FzZXNQYWdlJztcbmltcG9ydCBOb2lzZSBmcm9tICcuL25vaXNlJztcbmltcG9ydCBIb21lUGFnZSBmcm9tICcuL2hvbWVQYWdlJztcbmltcG9ydCBNZXNzYWdlQ29udGFpbmVyIGZyb20gJy4vbWVzc2FnZUNvbnRhaW5lcic7XG5pbXBvcnQgUGFnZURlc2NyaXB0aW9uIGZyb20gJy4vcGFnZURlc2NyaXB0aW9uJztcblxuY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoZWwpIHsgXG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMubmF2ID0gbmV3IE5hdih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIiksIHRoaXMpO1xuICAgIHRoaXMucGFnZXMgPSBBcnJheS5mcm9tKHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChcIi5wYWdlXCIpKTtcbiAgICB0aGlzLmFjdGl2ZVBhZ2UgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS5pcy12aXNpYmxlXCIpO1xuICAgIHRoaXMucGFnZURlc2NyaXB0aW9uID0gbmV3IFBhZ2VEZXNjcmlwdGlvbih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1kZXNjcmlwdGlvblwiKSwgdGhpcyk7XG4gICAgdGhpcy50cmFuc2l0aW9uRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10cmFuc2l0aW9uXCIpO1xuICAgIFxuICAgIFNjcm9sbC5pbml0KCk7XG4gICAgTWVudS5pbml0KCk7XG4gICAgQ2FzZXNQYWdlLmluaXQoKTtcbiAgICBOb2lzZS5pbml0KCk7XG4gICAgSG9tZVBhZ2UuaW5pdCgpO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCB0aGlzLnJlbW92ZVRyYW5zaXRpb24uYmluZCh0aGlzKSk7XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYXBwLWxvYWRlZFwiKTtcbiAgfVxuXG4gIG9uSGlyZVVzQ2xpY2soKSB7XG4gICAgdGhpcy5wYWdlRGVzY3JpcHRpb24udG9nZ2xlRmFkZSgpO1xuICAgIG5ldyBNZXNzYWdlQ29udGFpbmVyKHRoaXMpO1xuICB9XG5cbiAgcGFnZVRyYW5zaXRvbih1cmwpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVQYWdlLmRhdGFzZXQudXJsID09PSB1cmwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy50cmFuc2l0aW9uRWwuY2xhc3NMaXN0LmFkZChcImlzLXZpc2libGVcIik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7dGhpcy5zaG93UGFnZSh1cmwpO30sIDUwMCk7XG4gIH1cblxuICByZW1vdmVUcmFuc2l0aW9uKCkge1xuICAgIHRoaXMudHJhbnNpdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy12aXNpYmxlXCIpO1xuICB9XG5cbiAgc2hvd1BhZ2UodXJsKSB7XG4gICAgdGhpcy5hY3RpdmVQYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy12aXNpYmxlXCIpO1xuXG4gICAgdGhpcy5hY3RpdmVQYWdlID0gdGhpcy5wYWdlcy5maWx0ZXIocCA9PiBwLmRhdGFzZXQudXJsID09PSB1cmwpWzBdO1xuICAgIHRoaXMuYWN0aXZlUGFnZS5jbGFzc0xpc3QuYWRkKFwiaXMtdmlzaWJsZVwiKTtcbiAgfVxuXG4gIGdvVG9QYWdlKHVybCkge1xuICAgIGlmKCF0aGlzLnBhZ2VEZXNjcmlwdGlvbi52aXNpYmxlKXt0aGlzLnBhZ2VEZXNjcmlwdGlvbi50b2dnbGVGYWRlKCk7fVxuICAgIGlmKHRoaXMubmF2Lm1lbnVBY3RpdmUpIHtcbiAgICAgIHRoaXMubmF2LnRvZ2dsZU1lbnUoKTtcbiAgICAgIHRoaXMuc2hvd1BhZ2UodXJsKTtcbiAgICB9IFxuICAgIGVsc2UgeyBcbiAgICAgIHRoaXMucGFnZVRyYW5zaXRvbih1cmwpO1xuICAgIH1cbiAgICBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5wYWdlRGVzY3JpcHRpb24uY2hhbmdlUGFnZURlc2NyaXB0aW9uKCk7IH0sIDgwMCk7XG4gIFxuICAgIC8vUkVGQUNUT1IgVEhJUyAhIVxuICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZS1zaW5nbGUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRDb250YWluZXIucXVlcnlTZWxlY3RvcignLmNhc2Utc2luZ2xlLmlzLXZpc2libGUnKTtcbiAgICBpZiAoY29udGVudCAhPT0gbnVsbCkge1xuICAgICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG4gICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcbiAgICB9XG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tZWxlbWVudHMtY29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1vdmVybGF5Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cbiIsImltcG9ydCBhbmltYXRpb25FdmVudCBmcm9tICcuL2FuaW1hdGlvbkV2ZW50JztcblxuY2xhc3MgQ2FzZXNQYWdlIHtcbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICB0aGlzLmVsID0gZWw7XG5cbiAgICB0aGlzLmNhc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhc2UtY29udGFpbmVyJyk7XG4gICAgdGhpcy5vdGhlckNhc2VzID0gQXJyYXkuZnJvbSh0aGlzLmNhc2VzKS5maWx0ZXIoc2luZ2xlQ2FzZSA9PiBzaW5nbGVDYXNlICE9PSB0aGlzLmVsKTtcbiAgICB0aGlzLmNhc2VJbWFnZSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNhc2UtaW1hZ2UnKTtcbiAgICBcbiAgICB0aGlzLm1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1lbGVtZW50cy1jb250YWluZXInKTtcbiAgICBcbiAgICB0aGlzLmNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZS1zaW5nbGUtY29udGFpbmVyJyk7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5jb250ZW50Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jYXNlLXNpbmdsZVtkYXRhLW5hbWU9XCInICsgdGhpcy5lbC5kYXRhc2V0Lm5hbWUgKyAnXCJdJyk7X ך      ך                     רי             `צי     ˆך             @ך      @      @ך             GlzLmJhY2tncm91bmQgPSB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignLmJhY2tncm91bmQnKTtcbiAgICB0aGlzLmNsb3NlQ2FzZUJ1dHRvbnMgPSB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLWNhc2UnKTtcblxuICAgIHRoaXMuc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlcyAuc2VjdGlvbi10aXRsZS1jb250YWluZXInKTtcblxuICAgIHRoaXMuY2FzZUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5sb2FkQ2FzZS5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICB0aGlzLmNsb3NlQ2FzZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5leGl0Q2FzZS5iaW5kKHRoaXMpKSk7XG4gIFxuICB9XG5cbiAgbG9hZENhc2UoZSkge1xuICAgIHdpbmRvdy5oYXNDYXNlT3BlbiA9IHRydWU7XG5cbiAgICB0aGlzLm90aGVyQ2FzZXMuZm9yRWFjaChvdGhlciA9PiBvdGhlci5jbGFzc0xpc3QuYWRkKCdkZXRhY2gnKSk7XG5cbiAgICB0aGlzLmNhc2VJbWFnZS5jbGFzc0xpc3QuYWRkKCdpcy1zZWxlY3RlZCcpO1xuICAgIHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKCdoYXMtb3ZlcmxheScpO1xuICAgIHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtZmFkZScpO1xuXG4gICAgdGhpcy5jb250ZW50Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xuICAgIFxuICAgIHRoaXMudGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdvdXQnKTtcbiAgICB0aGlzLmJhY2tncm91bmQuY2xhc3NMaXN0LnJlbW92ZSgnb3V0Jyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgd2luZG93LnNjcm9sbFRvKDAsMCkgfSwgMTcwMCk7XG5cbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgYW5pbWF0aW9uID0gYW5pbWF0aW9uRXZlbnQodGhpcy5jb250ZW50KTtcbiAgICBhbmltYXRpb24gJiYgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uLCBmdW5jdGlvbiBzaG93Q2FzZSgpIHtcbiAgICAgIHRoYXQuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKGFuaW1hdGlvbiwgc2hvd0Nhc2UsIGZhbHNlKTtcblxuICAgICBcbiAgICAgIHRoYXQuY2FzZUltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB0aGF0LnNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIH0sIGZhbHNlKTtcbiBcbiAgfVxuXG4gIGV4aXRDYXNlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLm90aGVyQ2FzZXMuZm9yRWFjaChvdGhlciA9PiBvdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdkZXRhY2gnKSk7XG4gICAgdGhpcy5jYXNlSW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnRleHQuY2xhc3NMaXN0LmFkZCgnb3V0Jyk7XG5cbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gdGhpcy5jb250ZW50Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jYXNlLXNpbmdsZS5pcy12aXNpYmxlIC5iYWNrZ3JvdW5kJyk7XG4gIFxuICAgIGxldCB0ZXh0QW5pbWF0aW9uID0gYW5pbWF0aW9uRXZlbnQodGhpcy50ZXh0KTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIHRleHRBbmltYXRpb24gJiYgdGhpcy50ZXh0LmFkZEV2ZW50TGlzdGVuZXIodGV4dEFuaW1hdGlvbiwgZnVuY3Rpb24gZmFkZU91dFRleHQoKSB7XG4gICAgICAgIHRoYXQudGV4dC5yZW1vdmVFdmVudExpc3RlbmVyKHRleHRBbmltYXRpb24sIGZhZGVPdXRUZXh0LCBmYWxzZSk7XG5cbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsMCk7XG4gICAgICAgIHRoYXQuc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgYmFja2dyb3VuZC5jbGFzc0xpc3QuYWRkKCdvdXQnKTtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uID0gYW5pbWF0aW9uRXZlbnQoYmFja2dyb3VuZCk7XG4gICAgICAgIGFuaW1hdGlvbiAmJiBiYWNrZ3JvdW5kLmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uLCBmdW5jdGlvbiBoaWRlQ2FzZSgpIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhbmltYXRpb24sIGhpZGVDYXNlLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoYXQuY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICB0aGF0LmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpOyBcbiAgICAgICAgICAgIHRoYXQubWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtb3ZlcmxheScpOyBcbiAgICAgICAgICAgIHRoYXQubWVudS5jbGFzc0xpc3QuYWRkKCdoYXMtZmFkZScpOyAgICBcblxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICB9LCBmYWxzZSk7XG5cbiAgICBcbiAgICAgIFxuICB9XG5cbiAgc3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi5jYXNlLWNvbnRhaW5lclwiLCBiYXNlID0gZG9jdW1lbnQpIHtcbiAgICBiYXNlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBuZXcgQ2FzZXNQYWdlKGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhc2VzUGFnZTtcblxuXG4iLCJpbXBvcnQgVHlwZXdyaXR0ZXIgZnJvbSAnLi90eXBld3JpdHRlcic7XG5cbmNsYXNzIEhvbWVQYWdlIHtcbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICB0aGlzLmVsID0gZWw7XG5cbiAgICB0aGlzLmRhdGEgPSBbXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIk9ic2N1cmlhbFwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZSBjb2xvci1saW5lXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIiBpcyBhIHNvZnR3YXJlIGNvbnN1bHRhbmN5IFwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZSBhZnRlci1jb2xvclwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiY29tcGFueVwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZSBhZnRlci1jb2xvclwiLFxuICAgICAgICBcIm5ld0xpbmVcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiXCIsXG4gICAgICAgIFwidGFnXCI6IFwiZGl2XCIsXG4gICAgICAgIFwiY2xhc3NcIjogXCJociBoaWRlLWRlc2t0b3BcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIndlXCIsXG4gICAgICAgIFwidGFnXCI6IFwic3BhblwiLFxuICAgICAgICBcImNsYXNzXCI6IFwiaW50cm8tc2Vjb25kYXJ5LWhlYWRsaW5lXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIiBjcmFmdCBncmVhdCBleHBlcmllbmNlcyBhbmQgbG92ZSBpbnRlcm5ldCB0ZWNobm9sb2dpZXNcIixcbiAgICAgICAgXCJ0YWdcIjogXCJzcGFuXCIsXG4gICAgICAgIFwiY2xhc3NcIjogXCJpbnRyby1zZWNvbmRhcnktaGVhZGxpbmVcIixcbiAgICAgICAgXCJuZXdMaW5lXCI6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIlwiLFxuICAgICAgICBcInRhZ1wiOiBcImRpdlwiLFxuICAgICAgICBcImNsYXNzXCI6IFwiaHJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwid2UgXCIsXG4gICAgICAgIFwidGFnXCI6IFwic3BhblwiLFxuICAgICAgICBcImNsYXNzXCI6IFwiaW50cm8tc2Vjb25kYXJ5LWhlYWRsaW5lXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIiBoZWxwIGJ1c2luZXNzZXMgd2l0aFwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZVwiLFxuICAgICAgICBcIm5ld0xpbmVcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiXCIsXG4gICAgICAgIFwidGFnXCI6IFwiZGl2XCIsXG4gICAgICAgIFwiY2xhc3NcIjogXCJwcmUtbGlzdFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRleHRcIjogXCJTb2Z0d2FyZSBkZXZlbG9wbWVudFwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZSBmaXJzdCB0cmFuc2xhdGUgc2FtZS1saW5lIGNvbnNvbGUtbGlzdC1pdGVtXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIlwiLFxuICAgICAgICBcInRhZ1wiOiBcImJyXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRleHRcIjogXCJXZWIgJiBNb2JpbGUgYXBwbGljYXRpb24gZGV2ZWxvcG1lbnRcIixcbiAgICAgICAgXCJ0YWdcIjogXCJzcGFuXCIsXG4gICAgICAgIFwiY2xhc3NcIjogXCJpbnRyby1zZWNvbmRhcnktaGVhZGxpbmUgdHJhbnNsYXRlIGNvbnNvbGUtbGlzdC1pdGVtXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcIlwiLFxuICAgICAgICBcInRhZ1wiOiBcImJyXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRleHRcIjogXCJEaWdpdGl6YXRpb24gb2YgQnVzaW5lc3MgUHJvY2Vzc2VzXCIsXG4gICAgICAgIFwidGFnXCI6IFwic3BhblwiLFxuICAgICAgICBcImNsYXNzXCI6IFwiaW50cm8tc2Vjb25kYXJ5LWhlYWRsaW5lIHRyYW5zbGF0ZSBjb25zb2xlLWxpc3QtaXRlbVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRleHRcIjogXCJcIixcbiAgICAgICAgXCJ0YWdcIjogXCJiclwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiRGF0YSBoYW5kbGluZyAmIFRyYWNraW5nXCIsXG4gICAgICAgIFwidGFnXCI6IFwic3BhblwiLFxuICAgICAgICBcImNsYXNzXCI6IFwiaW50cm8tc2Vjb25kYXJ5LWhlYWRsaW5lIHRyYW5zbGF0ZSBjb25zb2xlLWxpc3QtaXRlbVwiLFxuICAgICAgICBcIm5ld0xpbmVcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiXCIsXG4gICAgICAgIFwidGFnXCI6IFwiYnJcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGV4dFwiOiBcImdldCBpbiB0b3VjaCB3aXRoIHVzIGF0IFwiLFxuICAgICAgICBcInRhZ1wiOiBcInNwYW5cIixcbiAgICAgICAgXCJjbGFzc1wiOiBcImludHJvLXNlY29uZGFyeS1oZWFkbGluZSBsYXN0IGJlZm9yZS1jb250YWN0LWxpbmVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiaW5mb0BvYnNjdXJpYWwuZGtcIixcbiAgICAgICAgXCJ0YWdcIjogXCJhXCIsXG4gICAgICAgIFwiY2xhc3NcIjogXCJpbnRyby1zZWNvbmRhcnktaGVhZGxpbmUgbGFzdCBjb250YWN0LWxpbmVcIixcbiAgICAgICAgXCJocmVmXCI6IFwibWFpbHRvOmluZm9Ab2JzY3VyaWFsLmRrXCIsXG4gICAgICAgIFwibmV3TGluZVwiOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRleHRcIjogXCJcIixcbiAgICAgICAgXCJ0YWdcIjogXCJkaXZcIixcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy5pbnRyb0JveCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIi5pbnRyby1zbWFsbC1ib3hcIik7XG4gICAgdGhpcy5wcmVsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWxvYWRlclwiKTtcbiAgICBcbiAgICB0aGlzLnByZWxvYWRlci5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCB0aGlzLmFuaW1hdGVIb21lQm94LmJpbmQodGhpcyksIHtvbmNlOnRydWV9ICk7XG4gICAgdGhpcy5pbnRyb0JveC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCB0aGlzLnN0YXJ0VHlwZXdyaXR0ZXIuYmluZCh0aGlzKSwgeyBvbmNlOnRydWUgfSk7XG4gIH1cblxuICBzdGFydFR5cGV3cml0dGVyKCkge1xuICAgIG5ldyBUeXBld3JpdHRlcih0aGlzLmRhdGEsIHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIi50ZXh0LWNvbnRhaW5lci1jb250ZW50XCIpLCAzNSk7XG4gIH1cblxuICBhbmltYXRlSG9tZUJveCgpIHtcbiAgICB0aGlzLnByZWxvYWRlci5yZW1vdmUoKTtcbiAgICB0aGlzLmludHJvQm94LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdChzZWxlY3RvciA9IFwiLnBhZ2UuaG9tZVwiLCBiYXNlID0gZG9jdW1lbnQpIHtcbiAgICBiYXNlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBuZXcgSG9tZVBhZ2UoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XG5cblxuIiwiaW1wb3J0IGFuaW1hdGlvbkV2ZW50IGZyb20gJy4vYW5pbWF0aW9uRXZlbnQnO1xuXG5jbGFzcyBNZW51IHtcbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICB0aGlzLmVsID0gZWw7IFxuICAgIHRoaXMubWVudUFjdGl2ZSA9IG51bGw7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wZW4tbW9iaWxlLW1lbnUnKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2JpbGUtbWVudS1jb250YWluZXIgLmJhY2tncm91bmQnKTtcbiAgICB0aGlzLnRleHRPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnV0dG9uLXRleHQub3BlbicpO1xuICAgIHRoaXMudGV4dENsb3NlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ1dHRvbi10ZXh0LmNsb3NlZCcpO1xuXG4gICAgdGhpcy5vcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuLmJpbmQodGhpcykpO1xuICB9XG5cbiAgb3BlbihlKSB7XG4gICAgLy8gaWYgKHRoaXMuaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgXCJtb2JpbGUtbWVudS12aXNpYmxlXCIpKXtcbiAgICAvLyAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vYmlsZS1tZW51LXZpc2libGVcIik7XG4gICAgLy8gICB0aGlzLm1lbnVBY3RpdmUgPSBmYWxzZTtcblxuICAgIC8vICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG4gICAgLy8gICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyksIDgwMCk7XG4gICAgLy8gfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9iaWxlLW1lbnUtdmlzaWJsZVwiKTtcbiAgICAvLyAgIHRoaXMubWVudUFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJylcbiAgICAvLyAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xuICAgIC8vIH1cbiAgfVxuXG4gIGhhc0NsYXNzKGVsZW1lbnQsIGNscykge1xuICAgIHJldHVybiAoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA+IC0xO1xuICB9XG5cbiAgc3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi5tb2JpbGUtbWVudS1jb250YWluZXJcIiwgYmFzZSA9IGRvY3VtZW50KSB7XG4gICAgYmFzZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbmV3IE1lbnUoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVudTtcblxuXG4iLCJpbXBvcnQgVHlwZXdyaXR0ZXIgZnJvbSBcIi4vdHlwZXdyaXR0ZXJcIlxuXG5jbGFzcyBNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IodGV4dCwgaW5kZXgsIG1lc3NhZ2VDb250YWluZXIsIG9wdGlvbnMsIGF1dG8sIHVzZXJGaWxsKSB7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmltcG9ydE5vZGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNxdWVzdGlvbi10ZW1wbGF0ZVwiKS5jb250ZW50LCB0cnVlKS5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZScpO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lciA9IG1lc3NhZ2VDb250YWluZXI7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmF1dG8gPSBhdXRvO1xuICAgIHRoaXMudXNlckZpbGwgPSB1c2VyRmlsbDtcbiAgICB0aGlzLnVzZXJJbnB1dCA9IG51bGw7XG5cbiAgICB0aGlzLmFkZE1lc3NhZ2UoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMgfHwgdGhpcy51c2VyRmlsbCkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZW5kXCIpLmZvckVhY2goZWwgPT4geyBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblNlbmRDbGljay5iaW5kKHRoaXMpKTsgfSk7XG4gICAgfVxuICB9XG5cbiAgY2hvaWNlVGVtcGxhdGVXaXRoT3B0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInVzZXItY2hvaWNlXCI+XG4gICAgICAgIDxzcGFuPiR7dGhpcy50ZXh0fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1c2VyLWlucHV0XCI+PC9zcGFuPlxuICAgICAgICAke2FyZ3MubWFwKChhcmcsIGluZGV4KSA9PiBgPGJ1dHRvbiBjbGFzcz1cInNlbmRcIiBkYXRhLWluZGV4PSR7aW5kZXh9PiR7YXJnfTwvYnV0dG9uPmApLmpvaW4oXCJcIil9XG4gICAgICA8L2Rpdj5gO1xuICB9XG5cbiAgY2hvaWNlVGVtcGxhdGVXaXRoVGV4dCgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInVzZXItY2hvaWNlXCI+XG4gICAgICAgIDxzcGFuPiR7dGhpcy50ZXh0fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+PGlucHV0IGNsYXNzPVwiY2hvaWNlLWlucHV0XCIgdHlwZT1cInRleHRcIj48L3NwYW4+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJzZW5kXCI+PjwvYnV0dG9uPlxuICAgICAgPC9kaXY+YDtcbiAgfVxuXG4gIGFkZE1lc3NhZ2UoKSB7XG4gICAgXG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5tZXNzYWdlQ29udGFpbmVyLm1lc3NhZ2VMaXN0LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgdGhpcy5tZXNzYWdlQ29udGFpbmVyLm1lc3NhZ2VMaXN0LnNjcm9sbFRvcCA9IHRoaXMuZWwub2Zmc2V0VG9wICsgNzAwO1xuICAgICAgbmV3IFR5cGV3cml0dGVyKFt7IFwidGV4dFwiOiB0aGlzLnRleHQgfV0sIHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLXRleHRcIiksIDI1LCB0aGlzLnB1c2hNZXNzYWdlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lci5jaG9pY2UuaW5uZXJIVE1MID0gdGhpcy51c2VyRmlsbCA/IHRoaXMuY2hvaWNlVGVtcGxhdGVXaXRoVGV4dCgpIDogdGhpcy5jaG9pY2VUZW1wbGF0ZVdpdGhPcHRpb24odGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lci5jaG9pY2UucXVlcnlTZWxlY3RvcihcIi51c2VyLWNob2ljZVwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hNZXNzYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lci5tZXNzYWdlcy5wdXNoKHRoaXMpO1xuICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lci5hY3RpdmVNZXNzYWdlID0gdGhpcztcbiAgICBpZiAodGhpcy5hdXRvID09PSB0cnVlKSB7XG4gICAgICB0aGlzLm5leHRNZXNzYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgb25TZW5kQ2xpY2soZSkge1xuICAgIHRoaXMucHVzaE1lc3NhZ2UoKTtcbiAgICB0aGlzLmF1dG8gPSB0cnVlO1xuICAgIHRoaXMudXNlcklucHV0ID0gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XSA6IHRoaXMubWVzc2FnZUNvbnRhaW5lci5jaG9pY2UucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlO1xuICAgIHRoaXMubWVzc2FnZUNvbnRhaW5lci5jaG9pY2UuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0aGlzLm1lc3NhZ2VDb250YWluZXIuaW5zZXJ0QW5zd2VyKCk7XG4gIH1cblxuICBuZXh0TWVzc2FnZSgpIHtcbiAgICB0aGlzLm1lc3NhZ2VDb250YWluZXIubmV4dE1lc3NhZ2UoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlIiwiaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IEFuc3dlciBmcm9tIFwiLi9hbnN3ZXJcIjtcblxuY2xhc3MgTWVzc2FnZUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZU1lc3NhZ2U7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgICB0aGlzLmNob2ljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VuZGVyXCIpO1xuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VzXCIpO1xuXG4gICAgdGhpcy5tZXNzYWdlc0RhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRleHRcIjogXCJIZWxsbywgd2UgYXJlIE9ic2N1cmlhbC5cIixcbiAgICAgICAgICBcImF1dG9cIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiV2hhdCBicmluZ3MgeW91IHRvIHVzP1wiLFxuICAgICAgICAgIFwiYXV0b1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRleHRcIjogXCJNeSBuYW1lIGlzXCIsXG4gICAgICAgICAgXCJhdXRvXCI6IGZhbHNlLFxuICAgICAgICAgIFwidXNlckZpbGxcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiV2hhdCBjYW4gd2UgaGVscCB5b3Ugd2l0aD9cIixcbiAgICAgICAgICBcImF1dG9cIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiT2JzY3VyaWFsIGNhbiBoZWxwIG1lIHdpdGhcIixcbiAgICAgICAgICBcIm9wdGlvbnNcIjogW1wiV2ViIGFwcGxpY2F0aW9uIGRldmVsb3BtZW50XCIsIFwiU29mdHdhcmUgRGV2ZWxvcG1lbnRcIiwgXCJNYWNoaW5lIGxlYXJuaW5nXCIsIFwiU0VPXCIsIFwiV2ViIE9wdGltaXphdGlvblwiXSxcbiAgICAgICAgICBcImF1dG9cIjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRleHRcIjogXCJUaGF0IHNvdW5kcyBncmVhdC4gQ2FuIHlvdSBnaXZlIHVzIG1vcmUgZGV0YWlscz9cIixcbiAgICAgICAgICBcImF1dG9cIjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidGV4dFwiOiBcIlllcywgSSBuZWVkXCIsXG4gICAgICAgICAgXCJhdXRvXCI6IGZhbHNlLFxuICAgICAgICAgIFwidXNlckZpbGxcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiRG8geW91IGhhdmUgYSBkZWFkbGluZSBmb3IgdGhpcyBwcm9qZWN0P1wiLFxuICAgICAgICAgIFwiYXV0b1wiOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiSXQgd291bGQgYmUgZ3JlYXQgaWYgd2UgY291bGQgaGF2ZSBpdCBkb25lIHdpdGhpblwiLFxuICAgICAgICAgIFwib3B0aW9uc1wiOiBbXCIxIG1vbnRoXCIsIFwiMyBtb250aHNcIiwgXCI2IG1vbnRoc1wiLCBcImEgeWVhclwiXSxcbiAgICAgICAgICBcImF1dG9cIjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRleHRcIjogXCJXaGF0J3MgdGhlIGJ1ZGdldCBmb3IgdGhpcyBwcm9qZWN0P1wiLFxuICAgICAgICAgIFwiYXV0b1wiOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiVGhlIGJ1ZGdldCBmb3IgdGhlIHByb2plY3QgaXNcIixcbiAgICAgICAgICBcIm9wdGlvbnNcIjogW1wiNTAsMDAwZGtrIGFuZCB1cFwiLCBcImJldHdlZW4gMjAwLDAwMGRrayB0byA1MDAsMDAwZGtrXCIsIFwibW9yZSB0aGFuIDUwMCwwMDBka2tcIiwgXCJUbyBiZSBkZWNpZGVkXCJdLFxuICAgICAgICAgIFwiYXV0b1wiOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidGV4dFwiOiBcIlNvdW5kcyBhd2Vzb21lISBIb3cgY2FuIHdlIHJlYWNoIHlvdT9cIixcbiAgICAgICAgICBcImF1dG9cIjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidGV4dFwiOiBcIkhlcmUncyBteSBlbWFpbCBhZGRyZXNzXCIsXG4gICAgICAgICAgXCJ1c2VyRmlsbFwiOnRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidGV4dFwiOiBcIkdvdCBpdCwgd2Ugd2lsbCBnZXQgYmFjayB0byB5b3UgaW4gbWF4LiAyIGRheXMg8J+ZjFwiLFxuICAgICAgICAgIFwiYXV0b1wiOiB0cnVlLFxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMucmVzZXRIdG1sKCk7XG4gICAgdGhpcy5jaG9pY2UuY2xhc3NMaXN0LnJlbW92ZShcIm91dHJvXCIpO1xuICAgIHRoaXMuY2hvaWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgdGhpcy5pbml0LmJpbmQodGhpcyksIHsgb25jZTp0cnVlIH0pO1xuICB9XG5cbiAgcmVzZXRIdG1sKCkge1xuICAgIHRoaXMuY2hvaWNlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5tZXNzYWdlTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgbmV4dE1lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlTWVzc2FnZS5hdXRvID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMubWVzc2FnZXMubGVuZ3RoO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggIT0gdGhpcy5tZXNzYWdlc0RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG5ldyBNZXNzYWdlKHRoaXMubWVzc2FnZXNEYXRhW2FjdGl2ZUluZGV4XS50ZXh0LCBhY3RpdmVJbmRleCwgdGhpcywgdGhpcy5tZXNzYWdlc0RhdGFbYWN0aXZlSW5kZXhdLm9wdGlvbnMsIHRoaXMubWVzc2FnZXNEYXRhW2FjdGl2ZUluZGV4XS5hdXRvLCB0aGlzLm1lc3NhZ2VzRGF0YVthY3RpdmVJbmRleF0udXNlckZpbGwpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwLnBhZ2VEZXNjcmlwdGlvbi50b2dnbGVGYWRlKCk7XG4gICAgICAgIHRoaXMuY2hvaWNlLmNsYXNzTGlzdC5hZGQoXCJvdXRyb1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnNlcnRBbnN3ZXIoKSB7XG4gICAgbmV3IEFuc3dlcih0aGlzKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbmV3IE1lc3NhZ2UodGhpcy5tZXNzYWdlc0RhdGFbMF0udGV4dCwgMCwgdGhpcywgdGhpcy5tZXNzYWdlc0RhdGFbMF0ub3B0aW9ucywgdGhpcy5tZXNzYWdlc0RhdGFbMF0uYXV0bywgdGhpcy5tZXNzYWdlc0RhdGFbMF0udXNlckZpbGwpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VDb250YWluZXI7IiwiaW1wb3J0IE5hdkl0ZW0gZnJvbSAnLi9uYXZJdGVtJztcbmNsYXNzIE5hdiB7XG4gIGNvbnN0cnVjdG9yKGVsLCBhcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmVsID0gZWw7IFxuXG4gICAgdGhpcy5tZW51QWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5tZW51QnV0dG9uID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnV0dG9uLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLm1lbnVDb250YWluZXIgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1jb250YWluZXJcIik7XG4gICAgdGhpcy5uYXZJdGVtTGlzdCA9IEFycmF5LmZyb20odGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1lbnUtaXRlbVwiKSkubWFwKGVsID0+IG5ldyBOYXZJdGVtKGVsLCB0aGlzKSk7XG5cbiAgICB0aGlzLm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlTWVudS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG9uSGlyZVVzQ2xpY2soKSB7XG4gICAgdGhpcy5hcHAub25IaXJlVXNDbGljaygpO1xuICB9XG5cbiAgb25PcGVuTWVudUNsaWNrKCkge1xuICAgIHRoaXMudG9nZ2xlTWVudSgpO1xuICB9XG5cbiAgdG9nZ2xlTWVudSgpIHtcbiAgICB0aGlzLm1lbnVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImlzLXZpc2libGVcIiwgIXRoaXMubWVudUFjdGl2ZSk7XG4gICAgdGhpcy5tZW51Q29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1oaWRkZW5cIiwgdGhpcy5tZW51QWN0aXZlKTtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoXCJtZW51LWFjdGl2ZVwiLCAhdGhpcy5tZW51QWN0aXZlKTtcbiAgICB0aGlzLm1lbnVBY3RpdmUgPSAhdGhpcy5tZW51QWN0aXZlO1xuICB9XG5cbiAgb25OYXZJdGVtQ2xpY2soaXRlbSkge1xuICAgIHRoaXMuYXBwLmdvVG9QYWdlKGl0ZW0uZWwuZGF0YXNldC51cmwpO1xuICAgIGlmKGl0ZW0uZWwuZGF0YXNldC51cmwgPT09IFwiaGlyZXVzXCIpIHsgdGhpcy5hcHAub25IaXJlVXNDbGljaygpOyB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2O1xuXG5cbiIsImltcG9ydCBUeXBld3JpdHRlciBmcm9tICcuL3R5cGV3cml0dGVyJztcbmltcG9ydCBhbmltYXRpb25FdmVudCBmcm9tICcuL2FuaW1hdGlvbkV2ZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcblxuY2xhc3MgTmF2SXRlbSB7XG4gIGNvbnN0cnVjdG9yKGVsLCBuYXYpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5uYXYgPSBuYXY7XG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uTmF2SXRlbUNsaWNrLmJpbmQodGhpcykpO1xuICB9ICBcblxuICBvbk5hdkl0ZW1DbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubmF2Lm9uTmF2SXRlbUNsaWNrKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkl0ZW07XG5cblxuIiwiY2xhc3MgTm9pc2Uge1xuICBjb25zdHJ1Y3RvcihlbCkgeyAgICBcbiAgICAgIHRoaXMuY2FudmFzO1xuICAgICAgdGhpcy5jdHg7XG4gICAgICB0aGlzLndXaWR0aFxuICAgICAgdGhpcy53SGVpZ2h0O1xuICAgICAgdGhpcy5ub2lzZURhdGEgPSBbXTtcbiAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgdGhpcy5sb29wVGltZW91dDtcbiAgICAgIHRoaXMucmVzaXplVGhyb3R0bGU7XG5cbiAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpdGgtbm9pc2UnKTtcbiAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgLy93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNldC5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gaWYod2luZG93LmlubmVyV2lkdGggPiA3NjcpXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgfVxuXG4gIGNyZWF0ZU5vaXNlKCkge1xuICAgIGNvbnN0IGlkYXRhID0gdGhpcy5jdHguY3JlYXRlSW1hZ2VEYXRhKHRoaXMud1dpZHRoLCB0aGlzLndIZWlnaHQpO1xuICAgIGNvbnN0IGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKTtcbiAgICBjb25zdCBsZW4gPSBidWZmZXIzMi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICBidWZmZXIzMltpXSA9IDB4ZmYwMDAwMDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ub2lzZURhdGEucHVzaChpZGF0YSk7XG4gIH1cblxuICBwYWludE5vaXNlKCkge1xuICAgIGlmICh0aGlzLmZyYW1lID09PSA5KSB7XG4gICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcmFtZSsrO1xuICAgIH1cblxuICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLm5vaXNlRGF0YVt0aGlzLmZyYW1lXSwgMCwgMCk7XG4gIH07XG5cblxuICAvLyBMb29wXG4gIGxvb3AoKSB7XG4gICAgdGhpcy5wYWludE5vaXNlKHRoaXMuZnJhbWUpO1xuXG4gICAgdGhpcy5sb29wVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgIH0sICgxMDAwIC8gMjUpKTtcbiAgfTtcblxuICAvLyBTZXR1cFxuICBzZXR1cCgpIHtcbiAgICB0aGlzLndXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICogMjtcbiAgICB0aGlzLndIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAyO1xuXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLndIZWlnaHQ7XG5cbiAgICB0aGlzLm5vaXNlRGF0YSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLmNyZWF0ZU5vaXNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5sb29wKCk7XG4gIH07XG5cbiAgLy8gUmVzZXRcbiAgcmVzZXQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaHJvdHRsZSk7XG4gICAgICB0aGlzLnJlc2l6ZVRocm90dGxlID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMubG9vcFRpbWVvdXQpO1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9LCBmYWxzZSk7XG4gIH07XG5cbiAgc3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi53aXRoLW5vaXNlXCIsIGJhc2UgPSBkb2N1bWVudCkge1xuICAgIGJhc2UucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIG5ldyBOb2lzZShlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2lzZTtcblxuXG5cbi8vIGNvbnN0IG5vaXNlID0gKCkgPT4ge1xuLy8gICBsZXQgY2FudmFzLCBjdHg7XG4vLyAgIGxldCB3V2lkdGgsIHdIZWlnaHQ7XG4vLyAgIGxldCBub2lzZURhdGEgPSBbXTtcbi8vICAgbGV0IGZyYW1lID0gMDtcbi8vICAgbGV0IGxvb3BUaW1lb3V0O1xuXG5cbi8vICAgLy8gQ3JlYXRlIE5vaXNlXG4vLyAgIGNvbnN0IGNyZWF0ZU5vaXNlID0gKCkgPT4ge1xuLy8gICAgIGNvbnN0IGlkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3V2lkdGgsIHdIZWlnaHQpO1xuLy8gICAgIGNvbnN0IGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKTtcbi8vICAgICBjb25zdCBsZW4gPSBidWZmZXIzMi5sZW5ndGg7XG5cbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4vLyAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuLy8gICAgICAgICBidWZmZXIzMltpXSA9IDB4ZmYwMDAwMDA7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgbm9pc2VEYXRhLnB1c2goaWRhdGEpO1xuLy8gICB9O1xuXG5cbi8vICAgLy8gUGxheSBOb2lzZVxuLy8gICBjb25zdCBwYWludE5vaXNlID0gKCkgPT4ge1xuLy8gICAgIGlmIChmcmFtZSA9PT0gOSkge1xuLy8gICAgICAgZnJhbWUgPSAwO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBmcmFtZSsrO1xuLy8gICAgIH1cblxuLy8gICAgIGN0eC5wdXRJbWFnZURhdGEobm9pc2VEYXRhW2ZyYW1lXSwgMCwgMCk7XG4vLyAgIH07XG5cblxuLy8gICAvLyBMb29wXG4vLyAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4vLyAgICAgcGFpbnROb2lzZShmcmFtZSk7XG5cbi8vICAgICBsb29wVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4vLyAgICAgfSwgKDEwMDAgLyAyNSkpO1xuLy8gICB9O1xuXG5cbi8vICAgLy8gU2V0dXBcbi8vICAgY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4vLyAgICAgd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgICAgd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuLy8gICAgIGNhbnZhcy53aWR0aCA9IHdXaWR0aDtcbi8vICAgICBjYW52YXMuaGVpZ2h0ID0gd0hlaWdodDtcblxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgICAgY3JlYXRlTm9pc2UoKTtcbi8vICAgICB9XG5cbi8vICAgICBsb29wKCk7XG4vLyAgIH07XG5cblxuLy8gICAvLyBSZXNldFxuLy8gICBsZXQgcmVzaXplVGhyb3R0bGU7XG4vLyAgIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuLy8gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4vLyAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHJlc2l6ZVRocm90dGxlKTtcblxuLy8gICAgICAgcmVzaXplVGhyb3R0bGUgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobG9vcFRpbWVvdXQpO1xuLy8gICAgICAgICBzZXR1cCgpO1xuLy8gICAgICAgfSwgMjAwKTtcbi8vICAgICB9LCBmYWxzZSk7XG4vLyAgIH07XG5cblxuLy8gICAvLyBJbml0XG4vLyAgIGNvbnN0IGluaXQgPSAoKCkgPT4ge1xuLy8gICAgIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub2lzZScpO1xuLy8gICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4vLyAgICAgc2V0dXAoKTtcbi8vICAgfSkoKTtcbi8vIH07XG4vLyBub2lzZSgpOyIsImltcG9ydCBUeXBld3JpdHRlciBmcm9tICcuL3R5cGV3cml0dGVyJztcblxuY2xhc3MgUGFnZURlc2NyaXB0aW9uIHtcbiAgY29uc3RydWN0b3IoZWwsIGFwcCkgeyBcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIGNoYW5nZVBhZ2VEZXNjcmlwdGlvbigpIHtcbiAgICBjb25zdCBwYWdlID0gdGhpcy5hcHAuYWN0aXZlUGFnZTtcbiAgICBjb25zdCBuZXh0UGFnZUluZGV4ID0gdGhpcy5hcHAucGFnZXMuaW5kZXhPZihwYWdlKTtcblxuICAgIGNvbnN0IHRleHQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZ1wiKTtcbiAgICBjb25zdCBudW1iZXIgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1udW1iZXJcIik7XG4gICAgdGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG51bWJlci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgbmV3IFR5cGV3cml0dGVyKFt7IFwidGV4dFwiOiBwYWdlLmRhdGFzZXQudXJsIH1dLCB0ZXh0LCA2MCk7XG4gICAgbmV3IFR5cGV3cml0dGVyKFt7IFwidGV4dFwiOiAnMCcgKyBuZXh0UGFnZUluZGV4IH1dLCBudW1iZXIsIDgwKTsgIFxuICB9XG5cbiAgdG9nZ2xlRmFkZSgpIHtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoXCJmYWRlLW91dFwiLCB0aGlzLnZpc2libGUpO1xuICAgIHRoaXMudmlzaWJsZSA9ICF0aGlzLnZpc2libGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZURlc2NyaXB0aW9uO1xuXG5cbiIsImNsYXNzIFNjcm9sbCB7XG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMud2luZG93U2Nyb2xsVG9wID0gMDtcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5lbC5kYXRhc2V0LnNwZWVkO1xuXG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPiA3NjgpXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNldFRvcFNjcm9sbC5iaW5kKHRoaXMpKSxcbiAgICAgIHRoaXMubW92ZSgpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgbW92ZW1lbnQgPSAtd2luZG93SGVpZ2h0IC8gMi41LFxuICAgICAgICAgIHN0YXJ0ID0gMjYwLFxuICAgICAgICAgIHN0b3AgPSB0aGlzLnNwZWVkID8gdGhpcy5zcGVlZCAqIDE4MCA6IDE4NzAsXG4gICAgICAgICAgcGVyY2VudCA9ICh0aGlzLndpbmRvd1Njcm9sbFRvcCAtIHN0YXJ0KSAvIChzdG9wIC0gc3RhcnQpLFxuICAgICAgICAgIGRlc3RZID0gbW92ZW1lbnQgKiBwZXJjZW50LFxuICAgICAgICAgIHRyYW5zZm9ybSA9IHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtO1xuXG4gICAgbGV0IGN1cnJlbnRZLCBuZXdZO1xuXG4gICAgdHJhbnNmb3JtID8gY3VycmVudFkgPSBwYXJzZUZsb2F0KHRyYW5zZm9ybS5zcGxpdCgnLCcpWzFdKSA6IGN1cnJlbnRZID0gMDtcbiAgICBuZXdZID0gY3VycmVudFkgKyAoKGRlc3RZIC0gY3VycmVudFkpICogMC4xKTtcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCAnICsgbmV3WSArICdweCwgMCknO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5tb3ZlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0VG9wU2Nyb2xsKGUpIHtcbiAgICAgIHRoaXMud2luZG93U2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGluaXQoc2VsZWN0b3IgPSAnLm1vdmUnLCBiYXNlID0gZG9jdW1lbnQpIHtcbiAgICBiYXNlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBuZXcgU2Nyb2xsKGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbDtcblxuXG4iLCJjbGFzcyBUcmFja2luZyB7IFxuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIChmdW5jdGlvbiAoaCwgbywgdCwgaiwgYSwgcikge1xuICAgICAgICBoLmhqID0gaC5oaiB8fCBmdW5jdGlvbiAoKSB7IChoLmhqLnEgPSBoLmhqLnEgfHwgW10pLnB1c2goYXJndW1lbnRzKTsgfTtcbiAgICAgICAgaC5faGpTZXR0aW5ncyA9IHsgaGppZDogNjY4NjM3LCBoanN2OiA2IH07XG4gICAgICAgIGEgPSBvLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIHIgPSBvLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyByLmFzeW5jID0gMTtcbiAgICAgICAgci5zcmMgPSB0ICsgaC5faGpTZXR0aW5ncy5oamlkICsgaiArIGguX2hqU2V0dGluZ3MuaGpzdjtcbiAgICAgICAgYS5hcHBlbmRDaGlsZChyKTtcbiAgICAgIH0pKHdpbmRvdywgZG9jdW1lbnQsICdodHRwczovL3N0YXRpYy5ob3RqYXIuY29tL2MvaG90amFyLScsICcuanM/c3Y9Jyk7ICAgIFxuICAgIH0sIDQwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNraW5nOyIsImNsYXNzIFR5cGV3cml0dGVyIHtcbiAgY29uc3RydWN0b3IoZGF0YSwgZWwsIHR5cGluZ1NwZWVkLCBlbmRDYikge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMudHlwaW5nU3BlZWQgPSB0eXBpbmdTcGVlZDtcbiAgICB0aGlzLnN0YXJ0VHlwZXdyaXR0ZXIoMCk7XG4gICAgdGhpcy5lbmRDYiA9IGVuZENiO1xuICB9XG5cbiAgdHlwZXdyaXR0ZXIodGV4dCwgaSwgbmV3TGluZSwgbGluZSwgY2IpIHtcbiAgICBpZiAoaSA8IHRleHQubGVuZ3RoKSB7XG4gICAgICBsaW5lLmlubmVySFRNTCArPSB0ZXh0LnN1YnN0cmluZyhpLCBpICsgMSk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnR5cGV3cml0dGVyKHRleHQsIGkgKyAxLCBuZXdMaW5lLCBsaW5lLCBjYik7XG4gICAgICB9LCB0aGlzLnR5cGluZ1NwZWVkKTtcbiAgICB9XG4gICAgZWxzZSBpZihuZXdMaW5lID09PSB0cnVlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0sIDYwMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydFR5cGV3cml0dGVyKGkpIHtcbiAgICBpZiAoaSA8IHRoaXMuZGF0YS5sZW5ndGgpIHsgXG4gICAgICBpZih0aGlzLmRhdGFbaV0udGFnKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZGF0YVtpXS50YWcpO1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnNvbGUtY3Vyc29yXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGFbaV0uY2xhc3MpIHtcbiAgICAgICAgICBsaW5lLmNsYXNzTmFtZSA9IHRoaXMuZGF0YVtpXS5jbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFbaV0uaHJlZikge1xuICAgICAgICAgIGxpbmUuaHJlZiA9IHRoaXMuZGF0YVtpXS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbC5pbnNlcnRCZWZvcmUobGluZSwgY3Vyc29yKTtcblxuICAgICAgICB0aGlzLnR5cGV3cml0dGVyKHRoaXMuZGF0YVtpXS50ZXh0LCAwLCB0aGlzLmRhdGFbaV0ubmV3TGluZSwgbGluZSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnRUeXBld3JpdHRlcihpICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSB0aGlzLmVsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50eXBld3JpdHRlcih0aGlzLmRhdGFbaV0udGV4dCwgMCwgdGhpcy5kYXRhW2ldLm5ld0xpbmUsIGxpbmUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0VHlwZXdyaXR0ZXIoaSArIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IFxuICAgIGVsc2Uge1xuICAgICAgaWYodGhpcy5lbmRDYikgdGhpcy5lbmRDYigpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5ldyBUeXBld3JpdHRlcih0aGlzLmVsKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBld3JpdHRlcjsiLCJjbGFzcyBVdGlscyB7XG4gIGNvbnN0cnVjdG9yKGVsKXtcbiAgfVxuXG4gIHN0YXRpYyBoYXNDbGFzcyhlbGVtZW50LCBjbHMpe1xuICAgIHJldHVybiAoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA+IC0xO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
