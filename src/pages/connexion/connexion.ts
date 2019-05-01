import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {Sim} from "@ionic-native/sim";
import {LowerCasePipe} from "@angular/common";
import {MillierPipe} from "../../pipes/millier/millier";
import {SplashScreen} from "@ionic-native/splash-screen";
import {OneSignal} from "@ionic-native/onesignal";
import {CodeotpPage} from "../codeotp/codeotp";
import { Storage } from '@ionic/storage';

import { AndroidPermissions } from '@ionic-native/android-permissions';


//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//import{Pro} from "@ionic/pro";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  public Userdata : FormGroup;
  private type:string="password";
  selectedImp:any;
  datapin:any={};
  toclear :boolean= false;
  private isconform:boolean=false;
  private message:any="";

  constructor(public androidPermissions: AndroidPermissions,public platform:Platform,private storage: Storage,private oneSignal:OneSignal,private menu: MenuController,public number:MillierPipe,public lower:LowerCasePipe,private sim: Sim,public glb:GlobalvariableProvider,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public serv:ServiceProvider) {
    this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      codepin: ['', Validators.required],
      confpin: ['', Validators.required],
      prenom: ['',Validators.required],
      nom: ['', Validators.required],
      imei: [''],
      idSim1: [''],
      idSim2: ['']



    });
    this.datapin.image=this.glb.IMAGE_BASE_URL+'upay.png';
    this.datapin.operation='Connexion';
    glb.PIN="";

       storage.get('login').then((val) => {
        if(val===null){
          glb.ShowPin = false;
        }
        else{
          this.Userdata.controls['login'].setValue(val);
          glb.ShowPin = true;
          glb.modeTransactionnel = true;
        }

      });
      this.getPermission();

  }







  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }
  verifConfPin(){
    if(isNaN(this.Userdata.controls['codepin'].value)){
      this.isconform = false;
      this.message="Le code pin doit etre composé  uniquement des chiffres"
    }

    else{
      if(this.serv.CheckIfSequence(this.Userdata.controls['codepin'].value)){
        this.isconform = false;
        this.message="Le code ne doit pas être consecutif ni composé d'un même chiffre";
      }
      else{
        this.isconform = this.Userdata.controls['codepin'].value == this.Userdata.controls['confpin'].value;
        if(!this.isconform)
        this.message="Les codes pin saisi ne sont pas conformes";


      }
    }
   // this.isconform = this.Userdata.controls['codepin'].value==this.Userdata.controls['confpin'].value;
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
  getPermission(){
    this.platform.ready().then((readySource) => {
          this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      result => {

        //alert('Has permission? ' +JSON.stringify(result))
        console.log('Has permission?',result.hasPermission);
        if(!result.hasPermission){
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result=>{

          }).catch(err=>{

          })
        }

      },
      err => {
        alert('err ' +JSON.stringify(err))

        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result=>{
        //  alert('first request result ' +JSON.stringify(result));
        }).catch(err=>{
         // alert('first request catch ' +JSON.stringify(err))

        })
      }
    );


    })


  }

  chercherimprimante(){
    if(this.glb.statusImpriamte==true){
      //this.GblVariable.statusImpriamte=false
      this.serv.rechercheperiph();
    }
    else{

    }
  }

  generateOTPCode(){
    let userdata =this.Userdata.getRawValue();
    userdata.login= "221"+this.Userdata.controls['login'].value;
    this.serv.afficheloading();
    this.serv.posts('connexion/generateOTP.php',userdata,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=="0"){
       // this.serv.showAlert(reponse.returnMsg);
        this.navCtrl.push(CodeotpPage,{userdata:userdata})
      }
      else this.serv.showError(reponse.errorLabel);

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");
    })


  }
  connecter(){
    this.toclear = false;
    //this.navCtrl.setRoot(HomePage);

    this.sim.requestReadPermission().then(
      () => {
        this.sim.getSimInfo().then(
          (info) =>{
            this.Userdata.controls['imei'].setValue(info.deviceId);
            if(!info.simSerialNumber)
            {
              this.serv.showError('Veuillez inserer une carte SIM')
            }

            else{
              let card = info.cards;
              if(card){
                this.Userdata.controls['idSim1'].setValue(card[0].simSerialNumber)
                if(card.length > 1)
                  this.Userdata.controls['idSim2'].setValue(card[1].simSerialNumber)
              }
              else this.Userdata.controls['idSim1'].setValue(info.simSerialNumber);
            }
            this.oneSignal.sendTags({imei:this.Userdata.controls['imei'].value,
              numsim1:this.Userdata.controls['idSim1'].value,
              numsim2:this.Userdata.controls['idSim2'].value,
            });
            this.serv.afficheloading();
            this.serv.posts('connexion/connexion.php',this.Userdata.getRawValue(),{}).then(data=>{
              this.serv.dismissloadin();
              let reponse = JSON.parse(data.data);
              console.log(JSON.stringify(reponse))
             // alert("Connexion "+JSON.stringify(reponse));
              if(reponse.returnCode=='0'){
                  this.glb.HEADER.agence=reponse.agence;
                  this.glb.IDPART = reponse.idPartn;
                  this.glb.IDSESS = reponse.idSession;
                  this.glb.IDTERM = reponse.idTerm;
                  this.glb.PIN = reponse.pin;
                  this.oneSignal.sendTags({codeespace:this.glb.HEADER.agence});
                  if(typeof(reponse.mntPlf)!='object')
                  this.glb.HEADER.montant = this.number.transform(reponse.mntPlf);
                  else this.glb.HEADER.montant = 0;
                  this.glb.dateUpdate = this.serv.getCurrentDate();
                  this.glb.HEADER.numcompte = reponse.numcompte;
                  this.glb.HEADER.consomme = this.number.transform(reponse.consome)
                  this.navCtrl.setRoot(HomePage)
              }
              else{
                if(reponse.errorLabel==='Code Pin incorrect !')
                 this.toclear = true;
                this.serv.showError(reponse.errorLabel);
              }
            }).catch(error=>{
              this.serv.dismissloadin();
              this.serv.showError("Impossible d'atteindre le serveur ");

            })


          },
          (err) => this.serv.showError("Impossible de récuperer les infos du téléphones")
        );
      },
      () => this.serv.showError("Vous devez activer les autorisations")
    )

  }
  eventCapture(codePin){

    this.Userdata.controls['codepin'].setValue(codePin);
    this.connecter();

  }


}
