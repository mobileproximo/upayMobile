import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {FormatCodeTransfertPipe} from "../../pipes/format-code-transfert/format-code-transfert";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the RecuTransfertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-transfert',
  templateUrl: 'recu-transfert.html'
})
export class RecuTransfertComponent {

  text: string;

  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public formatCode:FormatCodeTransfertPipe,public number:MillierPipe) {
    console.log('Hello RecuTransfertComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    this.glb.showRecu = false;
  }

}
