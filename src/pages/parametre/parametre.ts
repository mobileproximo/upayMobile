import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";


/**
 * Generated class for the ParametrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html',
})
export class ParametrePage {
  private listeparametres:any;
  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
   // this.listeparametres = [{service:'chpin',img:glb.IMAGE_BASE_URL+'chpin.png',component:ChangePinPage,title:"Changement code Pin"}];
    glb.ShowPin = false;

  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Parametrage.png";
    this.glb.HEADERTITELE.title = "Parametres";
    console.log('ionViewDidLoad ParametrePage');
  }
  verspage(page){
    this.navCtrl.push(page)
  }

}
