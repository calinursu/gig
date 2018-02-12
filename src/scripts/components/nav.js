import NavItem from './navItem';
class Nav {
  constructor(app) {
    this.navItemList = []; 
    this.app = app;

    this.init();
  }

  onHireUsClick() {
    this.app.onHireUsClick();
  }
  
  changePageDescription(page) {
    this.app.changePageDescription(page);
  }

  init() {
    document.querySelectorAll(".menu-item").forEach((el) => {
      const navItem = new NavItem(el, this);
      this.navItemList.push(navItem);
    }); 
  }
}

export default Nav;


