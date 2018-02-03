class Scroll {
  constructor(el) {
    this.el = el;
    this.windowScrollTop = 0;
    this.speed = this.el.dataset.speed;

    if(window.innerWidth > 768)
      document.addEventListener('scroll', this.setTopScroll.bind(this)),
      this.move();
  }

  move() {
    const windowHeight = window.innerHeight,
          movement = -windowHeight / 2.5,
          start = 260,
          stop = this.speed ? this.speed * 180 : 1870,
          percent = (this.windowScrollTop - start) / (stop - start),
          destY = movement * percent,
          transform = this.el.style.transform;

    let currentY, newY;

    transform ? currentY = parseFloat(transform.split(',')[1]) : currentY = 0;
    newY = currentY + ((destY - currentY) * 0.1);
    this.el.style.transform = 'translate3d(0, ' + newY + 'px, 0)';
    window.requestAnimationFrame(this.move.bind(this));
  }

  setTopScroll(e) {
      this.windowScrollTop = window.pageYOffset;
  }

  static init(selector = '.move', base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Scroll(element);
    });
  }
}

export default Scroll;


