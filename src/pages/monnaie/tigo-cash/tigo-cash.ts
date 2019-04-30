import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the TigoCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tigo-cash',
  templateUrl: 'tigo-cash.html',
})
export class TigoCashPage {

  public service;
  private datarecharge:any={};
  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    glb.ShowPin = false;
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-05.png";
    this.glb.HEADERTITELE.title = "Monnaie electronique"
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL+'Icon-27.png';
    this.datarecharge.oper = '0022';
    this.datarecharge.operation = 'Cashin Tigo Cash';
    this.datarecharge.operateur = 'Tigo Cash';
    this.service ='Cashin';
    console.log('ionViewDidLoad OrangeMoneyPage');
  }

}
