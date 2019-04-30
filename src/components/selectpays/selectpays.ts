import { Component } from '@angular/core';

/**
 * Generated class for the SelectpaysComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selectpays',
  templateUrl: 'selectpays.html'
})
export class SelectpaysComponent {

  images: Array<string> = ['221', '225', '223'];
  image: string = '221';
  imagewithlabel: string = '221';

  constructor() {
  }


  prepareImageWithLabelSelector() {
    setTimeout(() => {
      let buttonElements = document.querySelectorAll('div.alert-radio-group button');
      if (!buttonElements.length) {
        this.prepareImageWithLabelSelector();
      } else {
        for (let index = 0; index < buttonElements.length; index++) {
          let buttonElement = buttonElements[index];
          let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
          let image = optionLabelElement.innerHTML.trim();
          image = image.replace('+','');
          buttonElement.classList.add('imagewithlabelselect', 'image_' + image);
        }
      }
    }, 100);
  }

  setImageWithLabel(image) {
    console.log('Selected image with label is', image);
  }


}
