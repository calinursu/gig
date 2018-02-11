import NavItem from './navItem';
class Nav {
  constructor(el) {
    
  }

  static init() {
    document.querySelectorAll(".menu-item").forEach(el => new NavItem(el));
  }
}

export default Nav;


