class Tracking { 
  constructor(el) {
    this.matomo();
  }

  // init() {
  //   console.log("XXX");
  //   setTimeout(() => {
  //     (function (h, o, t, j, a, r) {
  //       h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
  //       h._hjSettings = { hjid: 668637, hjsv: 6 };
  //       a = o.getElementsByTagName('head')[0];
  //       r = o.createElement('script'); r.async = 1;
  //       r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  //       a.appendChild(r);
  //     })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');    
  //     this.matomo();
  //   }, 4000);
  // }

  matomo() {
    // var _paq = _paq || [];
    // _paq.push(["trackPageView"]);
    // _paq.push(["enableLinkTracking"]);

    // function embedTrackingCode() {
    //   var u = "https://obscurial.dk/piwik/";
    //   _paq.push(["setTrackerUrl", u + "piwik.php"]);
    //   _paq.push(["setSiteId", "1"]);

    //   var d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0]; g.type = "text/javascript";
    //   g.defer = true; g.async = true; g.src = u + "piwik.js"; s.parentNode.insertBefore(g, s);
    // }
    
    // embedTrackingCode();


    // var _paq = _paq || [];
    // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    // _paq.push(['trackPageView']);
    // _paq.push(['enableLinkTracking']);
    // (function() {
    //   var u="//www.obscurial.dk/piwik/";
    //     _paq.push(['setTrackerUrl', u+'piwik.php']);
    //     _paq.push(['setSiteId', '1']);
    //     var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    //     g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    // })();
  }
}

export default Tracking;