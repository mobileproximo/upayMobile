import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RechargeProvider} from "../../providers/recharge/recharge";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CashinreleveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cashinreleve',
  templateUrl: 'cashinreleve.html'
})
export class CashinreleveComponent {
  private rechargeForm :FormGroup;
  private montantrelve;
@Input('cashindata') cashindata;
dataForPin:any={};

  constructor(public storage:Storage,public number:MillierPipe,public serv:ServiceProvider,public glb:GlobalvariableProvider,public  rechprov:RechargeProvider,public formbuilder:FormBuilder) {
    this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montantrlv: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      frais: [''],
      sousop: ['']

    })
this.glb.modeTransactionnel = false;
  }
  resetMontant(){
    this.montantrelve=0;
    this.rechargeForm.controls['montant'].setValue(0);
  }

  releveFrais(){
    this.montantrelve=0;
    let data :any={};
    data.recharge ={};
    data.recharge.montant = this.rechargeForm.controls['montantrlv'].value;
    data.recharge.sousop = this.cashindata.sousop;
    data.recharge.oper = this.cashindata.oper;
    data.idTerm = this.glb.IDTERM;
    data.session =this.glb.IDSESS;
    this.serv.afficheloading();
    let file =data.recharge.oper=='0074'?'initcashoutUpay.php':"relevecashinwizall.php";
    this.serv.posts('recharge/'+file,data,{}).then(reponse=>{
      this.serv.dismissloadin();
      let rep:any =JSON.parse(reponse.data);
      if(rep.returnCode=='0')
      {
        this.montantrelve = data.recharge.montant;
        let mntttc:any = rep.mntTarif*1 + data.recharge.montant*1;
        this.rechargeForm.controls['montant'].setValue(this.number.transform(mntttc));
        this.rechargeForm.controls['frais'].setValue(this.number.transform(rep.mntTarif));
        if(this.cashindata.oper=='0074'){
          this.storage.get('login').then((val) => {
            if(val!=null){
              this.rechargeForm.controls['telephone'].setValue(val);
            }
            else{
              this.serv.showError('Impossible de recuperer votre numero telephone')
            }

          });

        }

      }
      else this.serv.showError(rep.errorLabel)
    }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")
      }
    )
  }

  validerCashin(){
    this.dataForPin= this.cashindata;
    this.dataForPin.telephone= this.rechargeForm.getRawValue().telephone;
    this.dataForPin.montant = this.number.transform(this.rechargeForm.getRawValue().montant);
    this.glb.modeTransactionnel =true;
    if(this.cashindata.oper=='0057' && this.cashindata.sousop=='0002')
    this.dataForPin.label = "Numéro Badge";
    else
    this.dataForPin.label= "Téléphone";

    this.glb.ShowPin =true;

  }
  changetel(){
    console.log('change')
    if(this.cashindata.sousop!='0002'){
      this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/ /g, ""));
      this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/-/g, ""));
      if(this.rechargeForm.controls['telephone'].value.length>9)
        this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.substring(0,9));
    }

  }
  changemontant(){
    this.resetMontant();

    if(this.rechargeForm.controls['montant'].value)
    {
      this.rechargeForm.controls['montant'].setValue(this.rechargeForm.controls['montant'].value.replace(/ /g, ""));
      this.rechargeForm.controls['montant'].setValue(this.rechargeForm.controls['montant'].value.replace(/-/g, ""))
      this.rechargeForm.controls['montant'].setValue(this.number.transform(this.rechargeForm.controls['montant'].value));

    }

  }
  focustel(){
    console.log('focus')
    if(this.cashindata.sousop!='0002'){
      if(this.rechargeForm.controls['telephone'].value)
      {
        this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/ /g, ""));
        this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/-/g, ""));

      }
    }

  }
  blurtel(){
    console.log('blur')
    if(this.cashindata.sousop!='0002'){
      let tel = this.rechargeForm.controls['telephone'].value;
      let phone = tel.length>=2?tel.substring(0,2)+'-':'';
      phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
      phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
      phone+= tel.length >=8 ?tel.substring(7,9):'';
      this.rechargeForm.controls['telephone'].setValue(phone);
    }

  }
  eventCapture(codepin){
    if(this.glb.modeTransactionnel){
      this.rechargeForm.controls['oper'].setValue(this.cashindata.oper);
      this.rechargeForm.controls['sousop'].setValue(this.cashindata.sousop);
      let data :any={};
      data.recharge = this.rechargeForm.getRawValue();
      data.recharge.montant = this.number.transform(this.montantrelve);
      data.recharge.pin = codepin;
      data.image = this.cashindata.image;
      data.operation = this.cashindata.operation;
      data.operateur = this.cashindata.operateur;
      this.rechprov.rechargernew(data);
    }
    this.glb.ShowPin = false;

  }

}
