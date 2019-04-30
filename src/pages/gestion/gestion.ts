import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {HistoriquePlafondPage} from "./historique-plafond/historique-plafond";
import {HistoriqueTransactionPage} from "./historique-transaction/historique-transaction";
import { EtatPlafondPage } from '../compte/etat-plafond/etat-plafond';
import { EtatMouvementPage } from '../compte/etat-mouvement/etat-mouvement';
import { ChangePinPage } from '../change-pin/change-pin';

/**
 * Generated class for the GestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion',
  templateUrl: 'gestion.html',
})
export class GestionPage {

  public gestions;
  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.gestions =[
      {service:'etatmvnt',img:glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png',component:HistoriqueTransactionPage,title:"Hist transaction"},
      {service:'etatplf',img:glb.IMAGE_BASE_URL+'etatplf.png',component:EtatPlafondPage,title:"Etat plafond"},
      {service:'etatmvnt',img:glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png',component:EtatMouvementPage,title:"Etat mouvement"},
      {service:'chpin',img:glb.IMAGE_BASE_URL+'chpin.png',component:ChangePinPage,title:"Changement code Pin"}
    ]
    glb.ShowPin = false;

  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-06.png";
    this.glb.HEADERTITELE.title = "Gestion";
    console.log('ionViewDidLoad MonnaiePage');
  }

  verspage(page){
    this.navCtrl.push(page)
  }


}
