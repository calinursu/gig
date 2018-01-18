class Noise {
  constructor(el) {    
      this.canvas;
      this.ctx;
      this.wWidth
      this.wHeight;
      this.noiseData = [];
      this.frame = 0;
      this.loopTimeout;
      this.resizeThrottle;

      this.canvas = document.querySelector('.with-noise');
      this.ctx = this.canvas.getContext('2d');

      this.setup();
  }

  createNoise() {
    const idata = this.ctx.createImageData(this.wWidth, this.wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.5) {
        buffer32[i] = 0xff000000;
      }
    }

    this.noiseData.push(idata);
  }

  paintNoise() {
    if (this.frame === 9) {
      this.frame = 0;
    } else {
      this.frame++;
    }

    this.ctx.putImageData(this.noiseData[this.frame], 0, 0);
  };


  // Loop
  loop() {
    this.paintNoise(this.frame);

    this.loopTimeout = window.setTimeout(() => {
      window.requestAnimationFrame(this.loop.bind(this));
    }, (1000 / 25));
  };

  // Setup
  setup() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;

    this.canvas.width = this.wWidth;
    this.canvas.height = this.wHeight;

    for (let i = 0; i < 10; i++) {
      this.createNoise();
    }

    this.loop();
  };


  // Reset
  reset() {
    window.addEventListener('resize', () => {
      window.clearTimeout(this.resizeThrottle);

      const that = this;

      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout);
        that.setup();
      }, 200);
    }, false);
  };

  static init(selector = ".with-noise", base = document) {
    base.querySelectorAll(selector).forEach(element => {
      new Noise(element);
    });
  }
}

export default Noise;



// const noise = () => {
//   let canvas, ctx;
//   let wWidth, wHeight;
//   let noiseData = [];
//   let frame = 0;
//   let loopTimeout;


//   // Create Noise
//   const createNoise = () => {
//     const idata = ctx.createImageData(wWidth, wHeight);
//     const buffer32 = new Uint32Array(idata.data.buffer);
//     const len = buffer32.length;

//     for (let i = 0; i < len; i++) {
//       if (Math.random() < 0.5) {
//         buffer32[i] = 0xff000000;
//       }
//     }

//     noiseData.push(idata);
//   };


//   // Play Noise
//   const paintNoise = () => {
//     if (frame === 9) {
//       frame = 0;
//     } else {
//       frame++;
//     }

//     ctx.putImageData(noiseData[frame], 0, 0);
//   };


//   // Loop
//   const loop = () => {
//     paintNoise(frame);

//     loopTimeout = window.setTimeout(() => {
//       window.requestAnimationFrame(loop);
//     }, (1000 / 25));
//   };


//   // Setup
//   const setup = () => {
//     wWidth = window.innerWidth;
//     wHeight = window.innerHeight;

//     canvas.width = wWidth;
//     canvas.height = wHeight;

//     for (let i = 0; i < 10; i++) {
//       createNoise();
//     }

//     loop();
//   };


//   // Reset
//   let resizeThrottle;
//   const reset = () => {
//     window.addEventListener('resize', () => {
//       window.clearTimeout(resizeThrottle);

//       resizeThrottle = window.setTimeout(() => {
//         window.clearTimeout(loopTimeout);
//         setup();
//       }, 200);
//     }, false);
//   };


//   // Init
//   const init = (() => {
//     canvas = document.getElementById('noise');
//     ctx = canvas.getContext('2d');

//     setup();
//   })();
// };
// noise();