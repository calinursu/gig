const whichAnimationEvent = (el) => {
      const transitions = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
      }

      for(let t in transitions) {
        if(el.style[t] !== undefined) {
          return transitions[t];
        }
      }
}

export default whichAnimationEvent;