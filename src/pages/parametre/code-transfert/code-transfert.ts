import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { GlobalvariableProvider } from '../../../providers/globalvariable/globalvariable';

@Component({
  selector: 'page-code-transfert',
  templateUrl: 'code-transfert.html',
})
export class CodeTransfertPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private serv:ServiceProvider,private glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-06.png";
    this.glb.HEADERTITELE.title = "Mes Codes de Retrait";
    console.log('ionViewDidLoad CodeTransfertPage');
  }

}
