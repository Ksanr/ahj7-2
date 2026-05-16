import loadingSvg from '../img/loading.svg';

export default class LoadingSpinner {
  constructor(container) {
    this.container = container;
    this.spinnerEl = null;
  }

  show() {
    this.spinnerEl = document.createElement('img');
    this.spinnerEl.src = loadingSvg;
    this.spinnerEl.className = 'loading-spinner';
    this.container.prepend(this.spinnerEl);
  }

  hide() {
    if (this.spinnerEl) {
      this.spinnerEl.remove();
      this.spinnerEl = null;
    }
  }
}