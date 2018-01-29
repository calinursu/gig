import animationEvent from './animationEvent';

class CasesPage {
  constructor(el) {
    this.el = el;
    this.caseImage = this.el.querySelector('.case-image');
    
    this.menu = document.querySelector('.main-elements-container');
    
    this.contentContainer = document.querySelector('.case-single-container');
    this.content = this.contentContainer.querySelector('.case-single[data-name="' + this.el.dataset.name + '"]');
    this.text = this.content.querySelector('.case-single-content');
    this.background = this.content.querySelector('.background');
    this.overlay = this.content.querySelector('.overlay');

    this.masa = document.querySelector('.cases .section-title-container');

    this.caseImage.addEventListener('click', this.loadCase.bind(this));
    this.overlay.addEventListener('click', this.exitCase.bind(this));
  }

  loadCase(e) {
    this.caseImage.classList.add('is-selected');
    this.menu.classList.add('has-overlay');
    this.menu.classList.remove('has-fade');

    this.contentContainer.classList.add('is-visible');
    this.content.classList.add('is-visible');

    this.text.classList.remove('out');
    this.background.classList.remove('out');


    const that = this;
    let animation = animationEvent(this.content);
    animation && this.content.addEventListener(animation, function showCase() {
      that.content.removeEventListener(animation, showCase, false);

      window.scrollTo(0,0);
      that.caseImage.classList.remove('is-selected');
      that.masa.style.display = 'none';

    }, false);
 
  }

  exitCase(e) {
    this.caseImage.classList.remove('is-selected');
    this.text.classList.add('out');

    const background = this.contentContainer.querySelector('.is-visible .background');
  
    let textAnimation = animationEvent(this.text);
    const that = this;

    textAnimation && this.text.addEventListener(textAnimation, function fadeOutText() {
        that.text.removeEventListener(textAnimation, fadeOutText, false);

        window.scrollTo(0,0);
        that.masa.style.display = 'block';
        background.classList.add('out');

        let animation = animationEvent(background);
        animation && background.addEventListener(animation, function hideCase() {
            background.removeEventListener(animation, hideCase, false);

            that.contentContainer.classList.remove('is-visible');
            that.content.classList.remove('is-visible'); 
            that.menu.classList.remove('has-overlay'); 
            that.menu.classList.add('has-fade');       

        }, false);

    }, false);

    
      
  }

  static init(selector = ".case-container", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new CasesPage(element);
    });
  }
}

export default CasesPage;


