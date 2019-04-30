import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalvariableProvider } from '../../../providers/globalvariable/globalvariable';

/**
 * Generated class for the UpayWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upay-wallet',
  templateUrl: 'upay-wallet.html',
})
export class UpayWalletPage {
  public service;
  private datarecharge:any={};
  private datacashin:any={};
  constructor(public glb:GlobalvariableProvider, navCtrl: NavController, public navParams: NavParams) {
    glb.ShowPin = false;
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-05.png";
    this.glb.HEADERTITELE.title = "Monnaie electronique"
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL+'upay.png';
    this.datarecharge.oper  = '0073';
    this.datarecharge.operation = 'Cashin UPay';
    this.datarecharge.operateur  = 'UPay';
    this.service ='Cashin';
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datacashin.image =this.glb.IMAGE_BASE_URL+'upay.jpg';
    this.datacashin.oper  ='0074';
    this.datacashin.operation='Cashout UPay';
    this.datacashin.operateur  ='UPay';
    console.log('ionViewDidLoad WizallPage');
    console.log('ionViewDidLoad UpayWalletPage');
  }

}
