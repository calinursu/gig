class VoiceRecognition {
  constructor(app) {
    this.app = app;
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    this.words = ['home', 'about', 'work', 'contact', "hireus" ];
    this.grammar = '#JSGF V1.0; grammar words; public <word> = ' + this.words.join(' | ') + ' ;';
    this.readyToMatch = true;

    this.recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();

    speechRecognitionList.addFromString(this.grammar, 1);
    this.recognition.grammars = speechRecognitionList;
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    // this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.counter = 0;

    this.recognition.onresult = this.onResult.bind(this);
    this.recognition.onend = this.start.bind(this);
    this.recognition.onspeechstart = this.onSpeechStart.bind(this);
    this.recognition.onsoundend = this.onSpeechError.bind(this);
  }

  start() {
    this.app.nav.showVoiceControl();
    this.recognition.start();
    console.log('Ready to receive a vocal command.');
  }

  onSpeechStart() {
    this.app.onSpeechStart();
  }

  onSpeechError() {
    this.recognition.stop();
    this.app.onSpeechMatch();
  }

  onResult(event) {
    this.counter++;
    const last = event.results.length - 1;
    const word = event.results[last][0].transcript;
    const trimmedWord = word.replace(/\s/g, '').toLowerCase();
    const wordStart = trimmedWord.slice(0, 4);
    const wordEnd = trimmedWord.slice(-4);
    let match = null;

    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i].includes(wordStart) || this.words[i].includes(wordEnd)) {
        match = this.words[i];
        break;
      }
    }

    if (this.readyToMatch && this.words.includes(match)) {
      this.recognition.stop();
      this.app.onSpeechMatch();
      this.app.goToPage(match);
    }
    else {
      this.app.onSpeechError();
    }
  }
}

export default VoiceRecognition;



