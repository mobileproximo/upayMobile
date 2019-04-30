/**
 * Generated class for the RecuEncaissementComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
import {Component} from "@angular/core";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";

@Component({
  selector: 'recu-encaissement',
  templateUrl: 'recu-encaissement.html'
})
export class RecuEncaissementComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider,public serv:ServiceProvider,public number:MillierPipe) {
    console.log('Hello RecuEncaissementComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    this.glb.showRecu=false;
  }

}
