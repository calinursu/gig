class Utils {
  constructor(el){
  }

  static hasClass(element, cls){
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export default Utils;