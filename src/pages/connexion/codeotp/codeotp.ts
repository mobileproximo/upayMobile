import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { Storage } from '@ionic/storage';
import { GlobalvariableProvider } from '../../../providers/globalvariable/globalvariable';
import { ConnexionPage } from '../connexion';
declare var SMS:any;
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-codeotp',
  templateUrl: 'codeotp.html',
})
export class CodeotpPage  {

  userdata: any;
  codeotp:any;

  constructor(public platform:Platform,public androidPermissions: AndroidPermissions,public glb:GlobalvariableProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private serv:ServiceProvider) {
    glb.ShowPin = false;
    this.userdata = this.navParams.get("userdata");


    this.getPermission();
  }

  getPermission(){
    this.platform.ready().then((readySource) => {
          this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      result => {

        console.log('Has permission?',result.hasPermission);
        if(result.hasPermission){
          this.onCommingSms();
        }
        else{
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result=>{

              this.onCommingSms();
            }).catch(err=>{

            })
        }

      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result=>{
          this.onCommingSms();
        }).catch(err=>{

        })
      }
    );


    })


  }
  onCommingSms(){
    if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {

      document.addEventListener('deviceready', function(){

        if (!SMS ) { alert( 'SMS plugin not ready' ); return; }
        else {
          SMS.startWatch(function(){

          }, function(){
            this.serv.showError("Impossible de lire L'SMS de UPay");
          });

        }


      }, false);
    } else {
      alert('need run on mobile device for full functionalities.');
    }
    document.addEventListener('onSMSArrive', (e:any)=>{

      let sms:any = e.data;
      let expediteur = sms.address;
      let message = sms.body;

      if(expediteur==='UPay'){
        if(this.glb.READCODEOTP!=message){
          this.codeotp = message.substring(message.length-4);
         setTimeout(()=>{
            this.souscription();
          },200);
        }
        this.glb.READCODEOTP=message;
      }



    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeotpPage');
  }

  souscription(){

    this.userdata.codeOTP = this.codeotp;
    this.serv.afficheloading();
    this.serv.posts('connexion/checkOTP.php',this.userdata,{}).then(data=>{
      let reponse = JSON.parse(data.data);

      if(reponse.returnCode=="0"){
        this.serv.posts('connexion/souscription.php',this.userdata,{}).then(rep=>{
          this.serv.dismissloadin();
          let souscription = JSON.parse(rep.data);
          if(souscription.returnCode=="0"){
            this.glb.ShowPin = true;
            this.storage.set('login', this.userdata.login);
            this.serv.showAlert(souscription.returnMsg);
            this.navCtrl.setRoot(ConnexionPage)

          }
          else{
            this.serv.showError(souscription.errorLabel)
          }

        }).catch(err=>{
          this.serv.dismissloadin();
          this.serv.showError("Impossible d'atteindre le serveur");
        })

      }
      else{
        this.serv.dismissloadin();
        this.serv.showError(reponse.errorLabel)
      }

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");
    })

   // this.navCtrl.setRoot(HomePage);
  }

  generercode(){
    this.serv.afficheloading();
    this.serv.posts('connexion/generateOTP.php',this.userdata,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=="0"){

      }
      else this.serv.showError(reponse.errorLabel);

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");
    })
  }
}
