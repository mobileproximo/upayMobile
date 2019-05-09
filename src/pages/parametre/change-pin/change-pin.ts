import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LowerCasePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../../providers/service/service';
import { GlobalvariableProvider } from '../../../providers/globalvariable/globalvariable';
import { ConnexionPage } from '../../connexion/connexion';


@IonicPage()
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
  private typeanc:string="password";
  private typenouv:string="password";
  private typepwd:string="password";
  private typeconf:string="password";
  private Userdata : FormGroup;
  private message:string;
  private conf:boolean=true;


  constructor(private storage:Storage,public serv:ServiceProvider,public lower:LowerCasePipe,public formBuilder:FormBuilder,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    glb.ShowPin = false;
    this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      newpin: ['', Validators.required],
      ancienpin: ['',Validators.required],
      conf: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    this.storage.get('login').then((val) => {
      if(val!=null)
      this.Userdata.controls['login'].setValue(val);
    });
    this.message = "Definir un code pin identique au nouveau saisi plus haut";
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-06.png";
    this.glb.HEADERTITELE.title = "Changement Code Pin";
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  affichemdpconf(){
    this.typeconf="text";
    setTimeout(() => {
      this.typeconf ="password";
    }, 5000);
  }
  affichemdpnouv(){
    this.typenouv="text";
    setTimeout(() => {
      this.typenouv ="password";
    }, 5000);
  }
  changeMotDePasse(){
    let parametre:any={};
    parametre.datapin = this.Userdata.getRawValue();
    parametre.datapin.pwd = parametre.datapin.ancienpin;
    parametre.session =this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.idPartn = this.glb.IDPART;
 //   alert(JSON.stringify(parametre))
    this.serv.afficheloading();
    this.serv.posts('connexion/changepin.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data)
      if(reponse.returnCode=='0'){
        this.serv.showAlert(reponse.Message);
        this.Userdata.reset();
        this.navCtrl.setRoot(ConnexionPage);
      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })

  }
  verifconformite(){
    if(isNaN(this.Userdata.controls['newpin'].value)){
      this.conf = false;
      this.message="Le code pin doit etre composé uniquement des chiffres"
    }

    else{
      if(this.serv.CheckIfSequence(this.Userdata.controls['newpin'].value)){
        this.conf = false;
        this.message="Le code ne doit pas être consecutif ni composé d'un même chiffre";
      }
      else{
        this.conf = this.Userdata.controls['newpin'].value == this.Userdata.controls['conf'].value;
        if(!this.conf)
        this.message="Les codes pin saisi ne sont pas conformes";

      }
    }
  }
}
