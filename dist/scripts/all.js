(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _noise = require('./components/noise');

var _noise2 = _interopRequireDefault(_noise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  _noise2.default.init();
});

},{"./components/noise":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Noise = function () {
  function Noise(el) {
    _classCallCheck(this, Noise);

    this.canvas;
    this.ctx;
    this.wWidth;
    this.wHeight;
    this.noiseData = [];
    this.frame = 0;
    this.loopTimeout;
    this.resizeThrottle;

    this.canvas = document.querySelector('.with-noise');
    this.ctx = this.canvas.getContext('2d');

    this.setup();
  }

  _createClass(Noise, [{
    key: 'createNoise',
    value: function createNoise() {
      var idata = this.ctx.createImageData(this.wWidth, this.wHeight);
      var buffer32 = new Uint32Array(idata.data.buffer);
      var len = buffer32.length;

      for (var i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }

      this.noiseData.push(idata);
    }
  }, {
    key: 'paintNoise',
    value: function paintNoise() {
      if (this.frame === 9) {
        this.frame = 0;
      } else {
        this.frame++;
      }

      this.ctx.putImageData(this.noiseData[this.frame], 0, 0);
    }
  }, {
    key: 'loop',


    // Loop
    value: function loop() {
      this.paintNoise(this.frame);
      var that = this;

      this.loopTimeout = window.setTimeout(function () {
        window.requestAnimationFrame(that.loop.bind(that));
      }, 1000 / 25);
    }
  }, {
    key: 'setup',


    // Setup
    value: function setup() {
      this.wWidth = window.innerWidth;
      this.wHeight = window.innerHeight;

      this.canvas.width = this.wWidth;
      this.canvas.height = this.wHeight;

      for (var i = 0; i < 10; i++) {
        this.createNoise();
      }

      this.loop();
    }
  }, {
    key: 'reset',


    // Reset
    value: function reset() {
      var _this = this;

      window.addEventListener('resize', function () {
        window.clearTimeout(_this.resizeThrottle);

        var that = _this;

        resizeThrottle = window.setTimeout(function () {
          window.clearTimeout(loopTimeout);
          that.setup();
        }, 200);
      }, false);
    }
  }], [{
    key: 'init',
    value: function init() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".with-noise";
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      base.querySelectorAll(selector).forEach(function (element) {
        new Noise(element);
      });
    }
  }]);

  return Noise;
}();

exports.default = Noise;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9TY3JpcHQuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25vaXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLGtCQUFNLElBQU47QUFDRCxDQUZEOzs7Ozs7Ozs7Ozs7O0lDRk0sSztBQUNKLGlCQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFDWixTQUFLLE1BQUw7QUFDQSxTQUFLLEdBQUw7QUFDQSxTQUFLLE1BQUw7QUFDQSxTQUFLLE9BQUw7QUFDQSxTQUFLLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxjQUFMOztBQUVBLFNBQUssTUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFkO0FBQ0EsU0FBSyxHQUFMLEdBQVcsS0FBSyxNQUFMLENBQVksVUFBWixDQUF1QixJQUF2QixDQUFYOztBQUVBLFNBQUssS0FBTDtBQUNIOzs7O2tDQUVhO0FBQ1osVUFBTSxRQUFRLEtBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsS0FBSyxNQUE5QixFQUFzQyxLQUFLLE9BQTNDLENBQWQ7QUFDQSxVQUFNLFdBQVcsSUFBSSxXQUFKLENBQWdCLE1BQU0sSUFBTixDQUFXLE1BQTNCLENBQWpCO0FBQ0EsVUFBTSxNQUFNLFNBQVMsTUFBckI7O0FBRUEsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCO0FBQzVCLFlBQUksS0FBSyxNQUFMLEtBQWdCLEdBQXBCLEVBQXlCO0FBQ3ZCLG1CQUFTLENBQVQsSUFBYyxVQUFkO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLEtBQXBCO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUksS0FBSyxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsYUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssS0FBTDtBQUNEOztBQUVELFdBQUssR0FBTCxDQUFTLFlBQVQsQ0FBc0IsS0FBSyxTQUFMLENBQWUsS0FBSyxLQUFwQixDQUF0QixFQUFrRCxDQUFsRCxFQUFxRCxDQUFyRDtBQUNEOzs7OztBQUdEOzJCQUNPO0FBQ0wsV0FBSyxVQUFMLENBQWdCLEtBQUssS0FBckI7QUFDQSxVQUFNLE9BQU8sSUFBYjs7QUFFQSxXQUFLLFdBQUwsR0FBbUIsT0FBTyxVQUFQLENBQWtCLFlBQU07QUFDekMsZUFBTyxxQkFBUCxDQUE2QixLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZixDQUE3QjtBQUNELE9BRmtCLEVBRWYsT0FBTyxFQUZRLENBQW5CO0FBR0Q7Ozs7O0FBRUQ7NEJBQ1E7QUFDTixXQUFLLE1BQUwsR0FBYyxPQUFPLFVBQXJCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsT0FBTyxXQUF0Qjs7QUFFQSxXQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLEtBQUssTUFBekI7QUFDQSxXQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLEtBQUssT0FBMUI7O0FBRUEsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEVBQXBCLEVBQXdCLEdBQXhCLEVBQTZCO0FBQzNCLGFBQUssV0FBTDtBQUNEOztBQUVELFdBQUssSUFBTDtBQUNEOzs7OztBQUdEOzRCQUNRO0FBQUE7O0FBQ04sYUFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0FBQ3RDLGVBQU8sWUFBUCxDQUFvQixNQUFLLGNBQXpCOztBQUVBLFlBQU0sWUFBTjs7QUFFQSx5QkFBaUIsT0FBTyxVQUFQLENBQWtCLFlBQU07QUFDdkMsaUJBQU8sWUFBUCxDQUFvQixXQUFwQjtBQUNBLGVBQUssS0FBTDtBQUNELFNBSGdCLEVBR2QsR0FIYyxDQUFqQjtBQUlELE9BVEQsRUFTRyxLQVRIO0FBVUQ7OzsyQkFFc0Q7QUFBQSxVQUEzQyxRQUEyQyx1RUFBaEMsYUFBZ0M7QUFBQSxVQUFqQixJQUFpQix1RUFBVixRQUFVOztBQUNyRCxXQUFLLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLE9BQWhDLENBQXdDLG1CQUFXO0FBQ2pELFlBQUksS0FBSixDQUFVLE9BQVY7QUFDRCxPQUZEO0FBR0Q7Ozs7OztrQkFHWSxLOztBQUlmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBOb2lzZSBmcm9tICcuL2NvbXBvbmVudHMvbm9pc2UnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgTm9pc2UuaW5pdCgpO1xufSk7IiwiY2xhc3MgTm9pc2Uge1xuICBjb25zdHJ1Y3RvcihlbCkgeyAgICBcbiAgICAgIHRoaXMuY2FudmFzO1xuICAgICAgdGhpcy5jdHg7XG4gICAgICB0aGlzLndXaWR0aFxuICAgICAgdGhpcy53SGVpZ2h0O1xuICAgICAgdGhpcy5ub2lzZURhdGEgPSBbXTtcbiAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgdGhpcy5sb29wVGltZW91dDtcbiAgICAgIHRoaXMucmVzaXplVGhyb3R0bGU7XG5cbiAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpdGgtbm9pc2UnKTtcbiAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgdGhpcy5zZXR1cCgpO1xuICB9XG5cbiAgY3JlYXRlTm9pc2UoKSB7XG4gICAgY29uc3QgaWRhdGEgPSB0aGlzLmN0eC5jcmVhdGVJbWFnZURhdGEodGhpcy53V2lkdGgsIHRoaXMud0hlaWdodCk7XG4gICAgY29uc3QgYnVmZmVyMzIgPSBuZXcgVWludDMyQXJyYXkoaWRhdGEuZGF0YS5idWZmZXIpO1xuICAgIGNvbnN0IGxlbiA9IGJ1ZmZlcjMyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgIGJ1ZmZlcjMyW2ldID0gMHhmZjAwMDAwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm5vaXNlRGF0YS5wdXNoKGlkYXRhKTtcbiAgfVxuXG4gIHBhaW50Tm9pc2UoKSB7XG4gICAgaWYgKHRoaXMuZnJhbWUgPT09IDkpIHtcbiAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZyYW1lKys7XG4gICAgfVxuXG4gICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMubm9pc2VEYXRhW3RoaXMuZnJhbWVdLCAwLCAwKTtcbiAgfTtcblxuXG4gIC8vIExvb3BcbiAgbG9vcCgpIHtcbiAgICB0aGlzLnBhaW50Tm9pc2UodGhpcy5mcmFtZSk7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICB0aGlzLmxvb3BUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGF0Lmxvb3AuYmluZCh0aGF0KSk7XG4gICAgfSwgKDEwMDAgLyAyNSkpO1xuICB9O1xuXG4gIC8vIFNldHVwXG4gIHNldHVwKCkge1xuICAgIHRoaXMud1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy53SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLndIZWlnaHQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHRoaXMuY3JlYXRlTm9pc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvb3AoKTtcbiAgfTtcblxuXG4gIC8vIFJlc2V0XG4gIHJlc2V0KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGhyb3R0bGUpO1xuXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgICAgcmVzaXplVGhyb3R0bGUgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobG9vcFRpbWVvdXQpO1xuICAgICAgICB0aGF0LnNldHVwKCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0sIGZhbHNlKTtcbiAgfTtcblxuICBzdGF0aWMgaW5pdChzZWxlY3RvciA9IFwiLndpdGgtbm9pc2VcIiwgYmFzZSA9IGRvY3VtZW50KSB7XG4gICAgYmFzZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbmV3IE5vaXNlKGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vaXNlO1xuXG5cblxuLy8gY29uc3Qgbm9pc2UgPSAoKSA9PiB7XG4vLyAgIGxldCBjYW52YXMsIGN0eDtcbi8vICAgbGV0IHdXaWR0aCwgd0hlaWdodDtcbi8vICAgbGV0IG5vaXNlRGF0YSA9IFtdO1xuLy8gICBsZXQgZnJhbWUgPSAwO1xuLy8gICBsZXQgbG9vcFRpbWVvdXQ7XG5cblxuLy8gICAvLyBDcmVhdGUgTm9pc2Vcbi8vICAgY29uc3QgY3JlYXRlTm9pc2UgPSAoKSA9PiB7XG4vLyAgICAgY29uc3QgaWRhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHdXaWR0aCwgd0hlaWdodCk7XG4vLyAgICAgY29uc3QgYnVmZmVyMzIgPSBuZXcgVWludDMyQXJyYXkoaWRhdGEuZGF0YS5idWZmZXIpO1xuLy8gICAgIGNvbnN0IGxlbiA9IGJ1ZmZlcjMyLmxlbmd0aDtcblxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbi8vICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4vLyAgICAgICAgIGJ1ZmZlcjMyW2ldID0gMHhmZjAwMDAwMDtcbi8vICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICBub2lzZURhdGEucHVzaChpZGF0YSk7XG4vLyAgIH07XG5cblxuLy8gICAvLyBQbGF5IE5vaXNlXG4vLyAgIGNvbnN0IHBhaW50Tm9pc2UgPSAoKSA9PiB7XG4vLyAgICAgaWYgKGZyYW1lID09PSA5KSB7XG4vLyAgICAgICBmcmFtZSA9IDA7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIGZyYW1lKys7XG4vLyAgICAgfVxuXG4vLyAgICAgY3R4LnB1dEltYWdlRGF0YShub2lzZURhdGFbZnJhbWVdLCAwLCAwKTtcbi8vICAgfTtcblxuXG4vLyAgIC8vIExvb3Bcbi8vICAgY29uc3QgbG9vcCA9ICgpID0+IHtcbi8vICAgICBwYWludE5vaXNlKGZyYW1lKTtcblxuLy8gICAgIGxvb3BUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbi8vICAgICB9LCAoMTAwMCAvIDI1KSk7XG4vLyAgIH07XG5cblxuLy8gICAvLyBTZXR1cFxuLy8gICBjb25zdCBzZXR1cCA9ICgpID0+IHtcbi8vICAgICB3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICB3SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4vLyAgICAgY2FudmFzLndpZHRoID0gd1dpZHRoO1xuLy8gICAgIGNhbnZhcy5oZWlnaHQgPSB3SGVpZ2h0O1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4vLyAgICAgICBjcmVhdGVOb2lzZSgpO1xuLy8gICAgIH1cblxuLy8gICAgIGxvb3AoKTtcbi8vICAgfTtcblxuXG4vLyAgIC8vIFJlc2V0XG4vLyAgIGxldCByZXNpemVUaHJvdHRsZTtcbi8vICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4vLyAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbi8vICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocmVzaXplVGhyb3R0bGUpO1xuXG4vLyAgICAgICByZXNpemVUaHJvdHRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChsb29wVGltZW91dCk7XG4vLyAgICAgICAgIHNldHVwKCk7XG4vLyAgICAgICB9LCAyMDApO1xuLy8gICAgIH0sIGZhbHNlKTtcbi8vICAgfTtcblxuXG4vLyAgIC8vIEluaXRcbi8vICAgY29uc3QgaW5pdCA9ICgoKSA9PiB7XG4vLyAgICAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vaXNlJyk7XG4vLyAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbi8vICAgICBzZXR1cCgpO1xuLy8gICB9KSgpO1xuLy8gfTtcbi8vIG5vaXNlKCk7Il19
