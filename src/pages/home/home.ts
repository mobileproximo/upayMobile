import { Component } from '@angular/core';
import {NavController,  Platform} from 'ionic-angular';
import {EncaissementPage} from "../encaissement/encaissement";
import {TransfertPage} from "../transfert/transfert";
import {MonnaiePage} from "../monnaie/monnaie";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {RechargePage} from "../recharge/recharge";
import {SplashScreen} from "@ionic-native/splash-screen";
import { EncSenelecPage } from '../encaissement/enc-senelec/enc-senelec';
import { EncSdePage } from '../encaissement/enc-sde/enc-sde';
import { EncWoyofalPage } from '../encaissement/enc-woyofal/enc-woyofal';
import { ProxicashPage } from '../transfert/proxicash/proxicash';
import { RiaPage } from '../transfert/ria/ria';
import { OrangePage } from '../recharge/orange/orange';
import { TigoCashPage } from '../monnaie/tigo-cash/tigo-cash';
import { IziPage } from '../recharge/izi/izi';
import { YakalmaPage } from '../recharge/yakalma/yakalma';
import { RapidoPage } from '../recharge/rapido/rapido';
import { OrangeMoneyPage } from '../monnaie/orange-money/orange-money';
import { EMoneyPage } from '../monnaie/e-money/e-money';
import { WizallPage } from '../monnaie/wizall/wizall';
import { PosteCashPage } from '../monnaie/poste-cash/poste-cash';
import { EtatPlafondPage } from '../parametre/etat-plafond/etat-plafond';
import { EtatMouvementPage } from '../parametre/etat-mouvement/etat-mouvement';
import { ServiceProvider } from '../../providers/service/service';
import { MillierPipe } from '../../pipes/millier/millier';
import { UpayWalletPage } from '../monnaie/upay-wallet/upay-wallet';
import { HistoriqueTransactionPage } from '../parametre/historique-transaction/historique-transaction';
import { ChangePinPage } from '../parametre/change-pin/change-pin';
import { ParametrePage } from '../parametre/parametre';
import { CodeTransfertPage } from '../parametre/code-transfert/code-transfert';
import { ConnexionPage } from '../connexion/connexion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pages :any;

   codePin:string="";
   anim1:string="";
   items: any = [];
   itemExpandHeight: number = 72;
   dateUpdate:any;

  constructor(private  number:MillierPipe,private serv:ServiceProvider,private splashScreen:SplashScreen,private platform:Platform,public navCtrl: NavController,public Glb:GlobalvariableProvider) {
    this.pages = [
      { title: 'Paiement Factures', component: EncaissementPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-04.png', expanded: false,
            souspages:[{nom:EncSenelecPage,icone:this.Glb.IMAGE_BASE_URL+'Petite-Icon-24.png'},{nom:EncSdePage,icone:this.Glb.IMAGE_BASE_URL+'sde.png'},{nom:EncWoyofalPage,icone:this.Glb.IMAGE_BASE_URL+'woyofal.png'}] },
      { title: "Transfert d'argent", component: TransfertPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-03.png', expanded: false,
            souspages:[{nom:ProxicashPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Proxicash.png'},{nom:RiaPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Ria.png'}] },
      { title: "Recharge", component: RechargePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-02.png', expanded: false,
            souspages:[{nom:OrangePage,icone:this.Glb.IMAGE_BASE_URL+'logo_Orange.png'},{nom:IziPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Tigo.png'},{nom:YakalmaPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Expresso.png'},{nom:RapidoPage,icone:this.Glb.IMAGE_BASE_URL+'logo_rapido.png'}] },
      { title: 'Monnaie electronique', component: MonnaiePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-05.png', expanded: false,
      souspages:[{nom:OrangeMoneyPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Orange Money.png'},{nom:TigoCashPage,icone:this.Glb.IMAGE_BASE_URL+'logo_Tigo Cash.png'},{nom:EMoneyPage,icone:this.Glb.IMAGE_BASE_URL+'emoney.png'},
                {nom:WizallPage,icone:this.Glb.IMAGE_BASE_URL+'wizall.png'},{nom:PosteCashPage,icone:this.Glb.IMAGE_BASE_URL+'postecash.png'},{nom:UpayWalletPage,icone:this.Glb.IMAGE_BASE_URL+'logo_upay.jpg'}]
    },
      { title: 'Gestion', component: ParametrePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-06.png', expanded: false,
      souspages:[{nom:HistoriqueTransactionPage,icone:this.Glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png'},{nom:EtatPlafondPage,icone:this.Glb.IMAGE_BASE_URL+'etatplf.png'},{nom:EtatMouvementPage,icone:this.Glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png'},
      {nom:ChangePinPage,icone:this.Glb.IMAGE_BASE_URL+'chpin.png'},{nom:CodeTransfertPage,icone:this.Glb.IMAGE_BASE_URL+'wallet.png'}] }

    ];

    console.log(JSON.stringify(this.pages));

  }

  verspage(page){
    this.navCtrl.push(page.nom);
  }

  ionViewDidEnter(){
    this.dateUpdate = this.serv.getCurrentDate();
    this.Glb.ShowPin = false;
    this.codePin ="";
    setTimeout(() => {
      if(this.platform.is('cordova')  || this.platform.is('android')){
      this.splashScreen.hide();
      }
      this.expandItem(this.pages[0]);
    }, 100);
  }

  eventCapture(event){
    this.Glb.ShowPin = false;
    this.codePin = event;
  }

  ionViewDidLoad() {
     this.platform.ready().then(()=>{
      this.splashScreen.hide();
    });
  }

  expandItem(item){

    this.pages.map((listItem) => {

      if(item == listItem){
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;

    });

  }
  getPlafond(){
    this.serv.afficheloading();
    this.serv.getplafond().then(data=>{
      this.serv.dismissloadin();
      let plafond = JSON.parse(data.data);
      if(plafond.returnCode=='0'){
        this.dateUpdate = this.serv.getCurrentDate();
        this.Glb.HEADER.montant = this.number.transform(plafond.mntPlf);
        this.Glb.dateUpdate = this.serv.getCurrentDate();
        this.Glb.HEADER.numcompte = plafond.numcompte;
        this.Glb.HEADER.consomme = this.number.transform(plafond.consome)
      } else this.serv.showError(plafond.errorLabel)

    }).catch(error=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");

    })
  }
  logout(){
    console.log('test logout')
    this.navCtrl.setRoot(ConnexionPage)
  }

}
