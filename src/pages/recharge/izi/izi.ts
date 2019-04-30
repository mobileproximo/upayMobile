import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the IziPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-izi',
  templateUrl: 'izi.html',
})
export class IziPage {
  private datarecharge :any;

  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    glb.ShowPin = false;
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-02.png";
    this.glb.HEADERTITELE.title = "Recharge";
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge ={};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL+'tigo.png';
    this.datarecharge.oper = '0020';
    this.datarecharge.operation = 'Recharge IZI';
    this.datarecharge.operateur = 'TIGO';
    console.log('ionViewDidLoad IziPage');
  }

}
