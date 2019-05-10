import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import { ServiceProvider } from '../../../providers/service/service';
import { MillierPipe } from '../../../pipes/millier/millier';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the EncSenelecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enc-senelec',
  templateUrl: 'enc-senelec.html',
})
export class EncSenelecPage {
  private infosClient:FormGroup;
  private dataencaissement:any={}
  private numfacture;
  private  factures:any;
  private listefactures:any;
  private hastel:boolean=true;
  private total:any;
  private nombreFacture:number=0;
  private facturescoches:any=[];
  private showdetails:boolean=false;
  private telephone;
  private newclient:boolean=false;
  dataForPin:any={};

  constructor(public formbuilder:FormBuilder,private number:MillierPipe, private serv:ServiceProvider, public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    glb.ShowPin = false;
    this.infosClient=this.formbuilder.group({
      'numfacture':['',Validators.required],
      'prenomClient':['',Validators.required],
      'nomClient':['',Validators.required],
      'telephone':['',Validators.required],
      'adresse':['',Validators.required]
    })
  }

  ionViewDidLoad() {
    this.glb.recu=null,
    this.glb.showRecu=false;
    this.dataencaissement.oper ='0027';
    this.dataencaissement.image =this.glb.IMAGE_BASE_URL+'Petite-Icon-24.png';
    this.dataencaissement.encaissementfile ='encaissement/encaissementsenelec.php';
    this.dataencaissement.typereleve ='Police';
    this.dataencaissement.operateur ='SENELEC';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-04.png";
    this.glb.HEADERTITELE.title = "Paiement de Factures";
    this.glb.modeTransactionnel = false;

    console.log('ionViewDidLoad EncSenelecPage');
  }
  reset(){
    this.numfacture='';
    this.showdetails=false;
      this.listefactures=this.facturescoches=[]; this.hastel=true;
      this.nombreFacture=0;
      this.telephone='';
      this.total=0;

}
  vider(){
    this.showdetails=false;
    this.listefactures=this.facturescoches=[]; this.hastel=true;
    this.nombreFacture=0;

    this.total=0;
  }
    releve(){
      this.vider();
      this.newclient=false;
      let parametre:any= {};
      parametre.numpolice = this.infosClient.controls['numfacture'].value;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      parametre.oper = this.dataencaissement.oper;
      this.serv.afficheloading();
      this.serv.posts('encaissement/releve.php',parametre,{}).then(data=>{
        let reponse = JSON.parse(data.data);
       // alert("ReleveFacture "+JSON.stringify(reponse));
        //this.serv.dismissloadin();
        if(reponse!=false){
          if(reponse.returnCode=='0'){
            this.showdetails=true;
            this.nombreFacture=0;
            //Je fais un releve Client
            this.serv.posts('encaissement/releveClient.php',parametre,{}).then(dataclient=>{
              this.serv.dismissloadin();
              let reponseclient = JSON.parse(dataclient.data);
              //alert("ReleveFacture "+JSON.stringify(reponseclient));
              if(reponseclient.returnCode=='0'){
                this.infosClient.controls['prenomClient'].setValue(reponseclient.prenom);
                this.infosClient.controls['nomClient'].setValue(reponseclient.nom);
                this.infosClient.controls['telephone'].setValue(reponseclient.telephone);
                this.infosClient.controls['adresse'].setValue(reponseclient.adresse);
              }
              else this.newclient = true;

            })
            .catch(err=>{
              this.serv.dismissloadin();
              this.serv.showError("Impossible d'atteindre le serveur")

            })

            if(reponse.Factures.Facture.length){
              console.log('taillle possible');
              this.factures = reponse;
             // this.factures.nomClient=reponse.NomClient;
              this.factures.numfacture = reponse.IdClient;

              /*La aussi j'ai remarqué lorqu'il n'ya pas de date d'echeance et que j valide l'operation le serveur se plante c'est pour cela
               que je mets un champs text vide dans ce cas
               * */
              for (let i = 0; i < this.factures.Factures.Facture.length; i++) {
                this.factures.Factures.Facture[i].checked = false;
                //si la date d'echeance n'est pas definie
                if(typeof(this.factures.Factures.Facture[i].dateEch)==='object')
                  this.factures.Factures.Facture[i].dateEch='';
                //  console.log(typeof(this.factures.Factures.Facture[i].dateEch));
                this.factures.Factures.Facture[i].id = i;

              }
            }
            /*Le cas d'une seule factures
             * alors je dois reformater ma variable $rooScope.factures pour mettre la factures dans un tableau*/
            else
            {
              this.factures={};
              this.factures.NomClient=reponse.NomClient;
              this.factures.IdClient= this.numfacture = reponse.IdClient;
              this.factures.NomOper=reponse.NomOper;
              this.factures.errorCode=reponse.errorCode;
              this.factures.errorLabel=reponse.errorLabel;
              this.factures.nbrFact=reponse.nbrFact;
              this.factures.returnCode=reponse.returnCode;
              this.factures.Factures={};
              //c'est le tableau qui va contenir ma facture
              this.factures.Factures.Facture=[];
              this.factures.Factures.Facture.push(reponse.Factures.Facture);
              this.factures.Factures.Facture[0].checked = false;
              this.factures.Factures.Facture[0].id = 0;
              console.log('une seule facture',this.factures);
            }
            this.listefactures = this.factures.Factures.Facture;

          }
          else {
            this.serv.dismissloadin();
            this.serv.showError(reponse.errorLabel)}
        }
        else{
          this.serv.dismissloadin();
          this.serv.showError('Pas de facture correspondant');
        }


      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")

      })
    }
    handlechecking(id:number){
      this.total=0;
      this.listefactures[id].checked = !this.listefactures[id].checked;
      if(this.listefactures[id].checked)
      {
        if(this.nombreFacture==1){
          this.serv.showError("Désolé, Vous ne pouvez pas payez plus d'une factures");
          setTimeout(() => {
            this.listefactures[id].checked=false;
          }, 100);
        }
        else {
          this.nombreFacture++;
          this.facturescoches.push(this.listefactures[id])

        }
      }
      else{
        this.nombreFacture--;
        let j=0;
        while(this.facturescoches[j].id!=id && j<this.facturescoches.length)
          j++;
        this.facturescoches.splice(j,1);

      }
      for (let i = 0; i < this.listefactures.length; i++) {
        if (this.listefactures[i].checked) {
          this.total =this.total*1+ this.listefactures[i].mntTotal*1;
        }
      }
      this.total = this.number.transform(this.total);

    }
    validerEncaissement(){
      this.dataForPin.operation ="Encaissement Senelec";
      this.dataForPin.montant =this.total;
      this.glb.ShowPin = true;
      this.glb.modeTransactionnel = true;

    }
    eventCapture(codePin){
      if(this.glb.modeTransactionnel){
        let parametre:any={};
      parametre.infoclient ={};
      parametre.infoclient.nomClient = this.infosClient.controls['nomClient'].value;
      parametre.infoclient.prenomclient = this.infosClient.controls['prenomClient'].value;
      parametre.infoclient.idclient = this.factures.IdClient;
      parametre.infoclient.telephone = this.infosClient.controls['telephone'].value;
      parametre.infoclient.adresse = this.infosClient.controls['adresse'].value;
      parametre.image = this.dataencaissement.image;
      parametre.oper = '0027';
      parametre.recharge={};
      parametre.operation='Encaissement Facture Senelec';
      parametre.recharge.montant=this.total;
      parametre.factures = this.facturescoches;
      parametre.nbrfact= this.nombreFacture;
      parametre.mnttotal = this.total.replace(/ /g, "");
      parametre.infoclient.pin=codePin;
      parametre.idTerm=this.glb.IDTERM;
      parametre.session= this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts(this.dataencaissement.encaissementfile,parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse:any = JSON.parse(data.data);
      //  alert(JSON.stringify(reponse))
        if(reponse.returnCode=='0'){
        this.glb.ShowPin =false;
          this.glb.recu = reponse;
          if (!reponse.Factures.Facture.length) {
            this.glb.recu = {};
            this.glb.recu.Oper = this.dataencaissement.operateur;
            this.glb.recu.dtTrx = reponse.dtTrx;
            this.glb.recu.NomClient = reponse.NomClient;
            this.glb.recu.IdClient = reponse.IdClient;
            if(typeof(reponse.telClient)!="string")
            this.glb.recu.telClient="";
            this.glb.recu.telClient = reponse.telClient;
            this.glb.recu.nbrFact = reponse.nbrFact;
            this.glb.recu.mntTotal = reponse.mntTotal;
            this.glb.recu.mntFrais = reponse.mntFrais;
            this.glb.recu.mntTbr = reponse.mntTbr;
            this.glb.recu.mntPlfap = reponse.mntPlfap;
            this.glb.recu.mntFact = reponse.mntFact;
            this.glb.recu.Factures = {};
            this.glb.recu.Factures.Facture = [];
            this.glb.recu.Factures.Facture.push(reponse.Factures.Facture);

          }
          this.glb.recu.numTrx = reponse.numTrx;
          //this.glb.recu.dtTrx = this.formatdate.transform(reponse.dtTrx);
         // this.glb.recu.NomClient = this.coupurechaine.transform(reponse.NomClient);
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.showRecu=true;
          this.glb.HEADER.montant= this.number.transform(reponse.mntPlfap);
          this.glb.dateUpdate = this.serv.getCurrentDate();
          this.glb.recu.Oper = this.dataencaissement.operateur;
        }
        else{
          this.serv.showError(reponse.errorLabel)
        }

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")

      })

      }
      this.glb.ShowPin = false;
    }

}
