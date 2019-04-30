import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the RecuWoyofalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-woyofal',
  templateUrl: 'recu-woyofal.html'
})
export class RecuWoyofalComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider,public serv:ServiceProvider) {
    console.log('Hello RecuWoyofalComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    this.glb.showRecu = false;
  }
}
