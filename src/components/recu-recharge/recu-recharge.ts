import {Component, Input} from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {NavController} from "ionic-angular";

/**
 * Generated class for the RecuRechargeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-recharge',
  templateUrl: 'recu-recharge.html'
})
export class RecuRechargeComponent {
  text: string;

  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public number:MillierPipe) {
    console.log('Hello RecuRechargeComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    this.glb.showRecu=false;
  }

}
