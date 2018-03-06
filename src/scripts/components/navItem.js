import Typewritter from './typewritter';
import animationEvent from './animationEvent';
import Utils from './utils';

class NavItem {
  constructor(el, nav) {
    this.el = el;
    this.nav = nav;

    this.el.addEventListener("click", this.onNavItemClick.bind(this));
  }  

  onNavItemClick(e) {
    e.preventDefault();
    this.nav.onNavItemClick(this);
  }
}

export default NavItem;


