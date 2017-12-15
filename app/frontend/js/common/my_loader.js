import Spinner from 'spin.js';

class MyLoader {
  constructor() {}

  initLazyLoadingImage(bLazyId, spinLoaderId, spinnerOpt) {
    let Blazy = require('blazy');
    this.revalidate(bLazyId);
    let $el = document.getElementById(spinLoaderId);
    this.spin = new Spinner(spinnerOpt).spin($el);
    this.initLazyImage(Blazy);
  }

  initLazyImage(Blazy) {
    new Blazy({
      success: element => {
        setTimeout(() => {
          let $parent;
          $parent = element.parentNode;
          $parent.className = $parent.className.replace(/\bloading\b/, '');
          this.spin.stop();
          let $spinLoader = $parent.firstElementChild;
          $spinLoader.innerHTML = '';
          return;
        }, 1000);
        return;
      }
    });
  }

  stopSpin(spinLoaderId) {
    // document.getElementById(spinLoaderId).dataset.spinner.stop();
  }

  revalidate(bLazyId) {
    document.getElementById(bLazyId).classList.remove('b-loaded');
  }
}

export default MyLoader;
