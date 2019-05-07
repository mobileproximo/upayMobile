import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { GlobalvariableProvider } from '../../../providers/globalvariable/globalvariable';

@Component({
  selector: 'page-code-transfert',
  templateUrl: 'code-transfert.html',
})
export class CodeTransfertPage {
  private mesCodes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private serv:ServiceProvider,private glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-06.png";
    this.glb.HEADERTITELE.title = "Mes Codes de Retrait";
    console.log('ionViewDidLoad CodeTransfertPage');
    let parametres:any={};
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    parametres.telephone = this.glb.PHONE;

    this.serv.afficheloading();
    this.serv.posts('recharge/getcondesUpay.php',parametres,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      alert(JSON.stringify(reponse));
      if(reponse.returnCode=='0'){
        let codes = reponse.listCodeUpay.codeUpay;
        if(codes.length)
        this.mesCodes = codes;
        else this.mesCodes[0]= codes;
      }
      else this.serv.showError(reponse.errorLabel)
  }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");

    })
  }
}
