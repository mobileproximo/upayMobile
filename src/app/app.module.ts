import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GlobalvariableProvider } from '../providers/globalvariable/globalvariable';
import { ServiceProvider } from '../providers/service/service';
import {ConnexionPage} from "../pages/connexion/connexion";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../components/header/header";
import {EncaissementPage} from "../pages/encaissement/encaissement";
import {HeaderTitleComponent} from "../components/header-title/header-title";
import {TransfertPage} from "../pages/transfert/transfert";
import {RechargePage} from "../pages/recharge/recharge";
import {EncSenelecPage} from "../pages/encaissement/enc-senelec/enc-senelec";
import {EncSdePage} from "../pages/encaissement/enc-sde/enc-sde";
import {EncWoyofalPage} from "../pages/encaissement/enc-woyofal/enc-woyofal";
import {RiaPage} from "../pages/transfert/ria/ria";
import {ProxicashPage} from "../pages/transfert/proxicash/proxicash";
import {ReceptionComponent} from "../components/reception/reception";
import {EnvoiComponent} from "../components/envoi/envoi";
import {ScrollComponent} from "../components/scroll/scroll";
import {RechargeComponent} from "../components/recharge/recharge";

import {OrangePage} from "../pages/recharge/orange/orange";
import {IziPage} from "../pages/recharge/izi/izi";
import {YakalmaPage} from "../pages/recharge/yakalma/yakalma";
import {RapidoPage} from "../pages/recharge/rapido/rapido";
import {MonnaiePage} from "../pages/monnaie/monnaie";
import {WizallPage} from "../pages/monnaie/wizall/wizall";
import {EMoneyPage} from "../pages/monnaie/e-money/e-money";
import {TigoCashPage} from "../pages/monnaie/tigo-cash/tigo-cash";
import {OrangeMoneyPage} from "../pages/monnaie/orange-money/orange-money";
import {CashoutomComponent} from "../components/cashoutom/cashoutom";
import {CashoutEmoneyComponent} from "../components/cashout-emoney/cashout-emoney";
import {RetraitCompteComponent} from "../components/retrait-compte/retrait-compte";
import {CashoutPostcashComponent} from "../components/cashout-postcash/cashout-postcash";
import {PosteCashPage} from "../pages/monnaie/poste-cash/poste-cash";
import {EtatPlafondPage} from "../pages/parametre/etat-plafond/etat-plafond";
import {EtatMouvementPage} from "../pages/parametre/etat-mouvement/etat-mouvement";
import {RecuC2aComponent} from "../components/recu-c2a/recu-c2a";
import {RecuEncaissementComponent} from "../components/recu-encaissement/recu-encaissement";
import {RecuTransfertComponent} from "../components/recu-transfert/recu-transfert";
import {RecuRechargeComponent} from "../components/recu-recharge/recu-recharge";
import {RecuWoyofalComponent} from "../components/recu-woyofal/recu-woyofal";
import {Sim} from "@ionic-native/sim";
import {DatePipe, DecimalPipe, LowerCasePipe, registerLocaleData} from "@angular/common";
import {HTTP} from "@ionic-native/http";
import localeFr from '@angular/common/locales/fr';
import {MillierPipe} from "../pipes/millier/millier";
import { RechargeProvider } from '../providers/recharge/recharge';
import {CashinreleveComponent} from "../components/cashinreleve/cashinreleve";
import {CashoutCodeComponent} from "../components/cashout-code/cashout-code";
import { EnvoiProvider } from '../providers/envoi/envoi';
import {FormatphonePipe} from "../pipes/formatphone/formatphone";
import {FormatdatePipe} from "../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../pipes/format-code-transfert/format-code-transfert";
import {EncaissementReleveComponent} from "../components/encaissement-releve/encaissement-releve";
import {CoupureChainePipe} from "../pipes/coupure-chaine/coupure-chaine";
import {Toast} from "@ionic-native/toast";
import {ParametrePage} from "../pages/parametre/parametre";
import {ProxicashTransfertPage} from "../pages/proxicash-transfert/proxicash-transfert";
import {Network} from "@ionic-native/network";
import {OneSignal} from "@ionic-native/onesignal";
import {MessageComponent} from "../components/message/message";
import {PubliciteComponent} from "../components/publicite/publicite";
import { PinComponent } from '../components/pin/pin';
import { SelectpaysComponent } from '../components/selectpays/selectpays';
import {CodeotpPage} from "../pages/connexion/codeotp/codeotp";
import { IonicStorageModule } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HeaderColor } from '@ionic-native/header-color';
import { UpayWalletPage } from '../pages/monnaie/upay-wallet/upay-wallet';
import {ExpandableComponent} from "../components/expandable/expandable";
import { ChangePinPage } from '../pages/parametre/change-pin/change-pin';
import { HistoriqueTransactionPage } from '../pages/parametre/historique-transaction/historique-transaction';
import { CodeTransfertPage } from '../pages/parametre/code-transfert/code-transfert';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnexionPage,
    HeaderComponent,
    EncaissementPage,
    HeaderTitleComponent,
    TransfertPage,
    RechargePage,
    EncSenelecPage,
    EncSdePage,
    EncWoyofalPage,
    RiaPage,
    ProxicashPage,CodeTransfertPage,
    ReceptionComponent,EnvoiComponent,ScrollComponent,RechargeComponent,PubliciteComponent,PinComponent,
    CashoutomComponent,CashoutEmoneyComponent,RetraitCompteComponent,CashoutPostcashComponent,MessageComponent,
    OrangePage,
    IziPage,
    YakalmaPage,
    RapidoPage,ParametrePage,ChangePinPage,ProxicashTransfertPage,UpayWalletPage,
    MonnaiePage,CashinreleveComponent,CashoutCodeComponent,EncaissementReleveComponent,
   MillierPipe,FormatphonePipe,FormatdatePipe,
    WizallPage,EMoneyPage,OrangePage,TigoCashPage,OrangeMoneyPage,PosteCashPage,
    EtatPlafondPage,EtatMouvementPage,CoupureChainePipe,
    HistoriqueTransactionPage,FormatCodeTransfertPipe,

    EtatPlafondPage,ExpandableComponent,
    RecuC2aComponent,RecuEncaissementComponent,RecuTransfertComponent,RecuRechargeComponent,RecuWoyofalComponent, SelectpaysComponent,
    CodeotpPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,HttpModule,IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{monthNames: ['Janvier', 'Février', 'Mars','Avril','Mai','Juin','Juillet',
        'Août','Septembre','Octobre','Novembre','Décembre' ],
      dayNames: ['Dimanche', 'Lundi', 'Mardi','Mercredi','Jeudi','Vendredi','Samedi' ]})
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CodeTransfertPage,
    ConnexionPage,
    HeaderComponent,
    EncaissementPage,
    HeaderTitleComponent,
    TransfertPage,
    RechargePage,
    EncSenelecPage,
    EncSenelecPage,
    EncSdePage,
    EncWoyofalPage,
    RiaPage,
    ProxicashPage,UpayWalletPage,
    ReceptionComponent,EnvoiComponent,MessageComponent,PubliciteComponent,
    OrangePage,
    IziPage,
    YakalmaPage,RapidoPage,MonnaiePage,
    WizallPage,EMoneyPage,OrangePage,TigoCashPage,OrangeMoneyPage,
    PosteCashPage,EtatMouvementPage,
    HistoriqueTransactionPage,ParametrePage,ChangePinPage,
    EtatPlafondPage,ProxicashTransfertPage,ExpandableComponent,
    RecuC2aComponent,RecuEncaissementComponent,RecuTransfertComponent,RecuRechargeComponent,RecuWoyofalComponent,PinComponent,CodeotpPage

  ],
  providers: [
    StatusBar,
    SplashScreen,HeaderColor,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalvariableProvider,BluetoothSerial,
    ServiceProvider,Sim,LowerCasePipe,HTTP,DecimalPipe,MillierPipe,
    RechargeProvider,FormatphonePipe,FormatdatePipe,FormatCodeTransfertPipe,
    EnvoiProvider,CoupureChainePipe,DatePipe,Toast,
     SplashScreen,Network,OneSignal,AndroidPermissions
  ]
})
export class AppModule {}
