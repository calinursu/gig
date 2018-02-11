import NavItem from './navItem';
class Nav {
  constructor(el) {
    this.navItemList = []; 

    this.init();
  }

  init() {
    document.querySelectorAll(".menu-item").forEach((el) => {
      const navItem = new NavItem(el);
      this.navItemList.push(navItem);
    }); 
  }
}

export default Nav;


