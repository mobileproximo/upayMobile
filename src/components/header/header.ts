import {Component, Input} from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {NavController} from "ionic-angular";
import {EtatPlafondPage} from "../../pages/compte/etat-plafond/etat-plafond";
import {HomePage} from "../../pages/home/home";
import { CodeotpPage } from '../../pages/codeotp/codeotp';
import { ServiceProvider } from '../../providers/service/service';
import { MillierPipe } from '../../pipes/millier/millier';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'headerComp',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input('header') header_data;
  set header(header_data: any) {
    this.header_data = header_data;
  }

  get header() {
    return this.header_data;
  }
  dateUpdate:string;
  text: string;


  constructor(public number:MillierPipe, public serv:ServiceProvider, public glb:GlobalvariableProvider,public navCtrl:NavController) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
    let date = new Date();
    let jour = date.getDate();
    let mois = date.getMonth()+1 >= 10? date.getMonth()+1:"0"+(date.getMonth()+1);
    let annee = date.getFullYear();
    let heure = date.getHours();
    let minute = date.getMinutes() >= 10 ? date.getMinutes(): "0"+date.getMinutes();
    this.dateUpdate = jour+"/"+mois+"/"+annee+" à "+heure+"h:"+minute;
  }
  getPlafond(){
    this.serv.afficheloading();
    this.serv.getplafond().then(data=>{
      this.serv.dismissloadin();
      let plafond = JSON.parse(data.data);
      if(plafond.returnCode=='0'){
        let date = new Date();
        let jour = date.getDate();
        let mois = date.getMonth()+1 >= 10? date.getMonth()+1:"0"+(date.getMonth()+1);
        let annee = date.getFullYear();
        let heure = date.getHours();
        let minute = date.getMinutes() >= 10 ? date.getMinutes(): "0"+date.getMinutes();
        this.dateUpdate = jour+"/"+mois+"/"+annee+" à "+heure+"h:"+minute;
        this.glb.HEADER.montant = this.number.transform(plafond.mntPlf);
        this.glb.HEADER.numcompte = plafond.numcompte;
        this.glb.HEADER.consomme = this.number.transform(plafond.consome)
      } else this.serv.showError(plafond.errorLabel)

    }).catch(error=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");

    })
  }
  vershome(){
    this.navCtrl.setRoot(HomePage)
  }

}
