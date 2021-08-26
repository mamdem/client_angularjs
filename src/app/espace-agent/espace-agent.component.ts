import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Bien } from '../class/bien';
import { Personne } from '../class/personne';
import { Variables } from '../global/variables';
import { BienService } from '../services/bien.service';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-espace-agent',
  templateUrl: './espace-agent.component.html',
  styleUrls: ['./espace-agent.component.scss']
})
export class EspaceAgentComponent implements OnInit {

  @ViewChild(MatSidenav) 
  sidenav!:MatSidenav;


  public biens: Bien[] | undefined;

  constructor(private bienService: BienService, private observer: BreakpointObserver,private personneService: PersonneService, private router: Router, public vari: Variables) { }

  public user!: Personne;
  public editb: Boolean | undefined;
  public currentIdBien:String ='';

  ngAfterViewInit(){
    this.observer.observe(['(max-width : 800px)']).subscribe((res)=> {
      if(this.vari.isUserLoggedIn()){
        this.sidenav.mode="side";
        this.sidenav.open();
      }
    });
  }
  

  public deconnecter(): void{
    sessionStorage.removeItem('idpers');
    this.router.navigateByUrl("/");
    this.sidenav.close();
  }

  public onAddBien(addBienForm: NgForm): void{
    //Recuperation de la date et le remplir dans le champs date du formulaire
    addBienForm.controls['date'].setValue(new Date()); 
    this.bienService.addBien(addBienForm.value).subscribe(
      (response: Bien)=>{
        console.log(response);
        alert("Bien ajouté reussie !!")
        this.getBiens();
        //Une fois ajouté un bien, on vide les champs du formulaire
        addBienForm.resetForm();
      },(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public getBienByIdbien(idbien: String, form: NgForm): void{
    this.editb=true;
    this.bienService.getBienByIdbien(idbien).subscribe(
      (response: Bien)=>{
        form.controls['idbiens'].setValue(response.idbiens);
        form.controls['nom'].setValue(response.nom);
        form.controls['description'].setValue(response.description);
        form.controls['prix'].setValue(response.prix);
        form.controls['nbpiece'].setValue(response.nbpiece);
        form.controls['categorie'].setValue(response.categorie);
      },(error: HttpErrorResponse)=>{
        alert("Une erreur s'est produite, reessayer !")
      }
    )
  }

  public getBiens(): void{
    if(this.vari.isUserLoggedIn())
    this.bienService.getBiensByIdpers(sessionStorage.getItem('idpers')+"").subscribe(
      (response: Bien[])=>{
        this.biens = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public deleteBien(idbien: string): void{
    this.bienService.deleteBien(idbien).subscribe(
      (response: Bien)=>{
        this.getBiens();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public editbien(form: NgForm): void{
    document.getElementById('edit_btn')?.click();
    this.bienService.editBienByIdbien(form.controls['idbiens'].value ,form.value).subscribe(
      (response: Bien)=>{
        alert("Modification reussie !!");
        form.resetForm();
        this.getBiens();
        this.editb=false;
      }, (error: HttpErrorResponse)=>{
        alert ("Echec de la modification !!")
      }
    );
  }

  public getUserSession(): void{
    this.personneService.getUserById(sessionStorage.getItem('idpers')+"").subscribe(
      (response: Personne)=>{
        this.user=response;
      }, (error: HttpErrorResponse)=>{
        alert("Une erreur s'est produite !")
      }
    )
  }

  public becomeAgent(): void{
    this.user.type=1;
    document.getElementById('becomeagent_btn')?.click();
    this.personneService.becomeAgent(this.user.idpers+"", this.user).subscribe(
      (response: Personne)=>{
        console.log(response);
      },(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  
  ngOnInit(): void {
    this.getBiens();

    if(this.vari.isUserLoggedIn())
      this.getUserSession();
    else
    this.router.navigateByUrl("/");
  }

}
