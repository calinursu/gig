import NavItem from './navItem';
class Nav {
  constructor(el, app) {
    this.app = app;
    this.el = el; 

    this.menuActive = false;
    this.menuButton = this.el.querySelector(".menu-button-container");
    this.menuContainer = this.el.querySelector(".menu-container");
    this.navItemList = Array.from(this.el.querySelectorAll(".menu-item")).map(el => new NavItem(el, this));
    this.voiceControl = this.el.querySelector(".voice-control");

    this.menuButton.addEventListener("click", this.toggleMenu.bind(this));
  }

  onHireUsClick() {
    this.app.onHireUsClick();
  }

  onOpenMenuClick() {
    this.toggleMenu();
  }

  toggleMenu() {
    this.menuContainer.classList.toggle("is-visible", !this.menuActive);
    this.menuContainer.classList.toggle("is-hidden", this.menuActive);
    this.el.classList.toggle("menu-active", !this.menuActive);
    this.menuActive = !this.menuActive;
  }

  onNavItemClick(item) {
    this.app.goToPage(item.el.dataset.url);
    if(item.el.dataset.url === "hireus") { this.app.onHireUsClick(); }
  }

  onSpeechStart() {
    this.voiceControl.classList.add("green");
  }

  onSpeechMatch() {
    this.voiceControl.classList.remove("green");
  }

  onSpeechError() {
    this.voiceControl.classList.remove("green");
    this.voiceControl.classList.add("red");
    setTimeout(() => {this.voiceControl.classList.remove("red");}, 3000);
  }

  showVoiceControl() {
    this.voiceControl.classList.add("active");
  }
}

export default Nav;


