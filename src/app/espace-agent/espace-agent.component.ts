import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

  public getBiens(): void{
    this.bienService.getBiens().subscribe(
      (response: Bien[])=>{
        this.biens = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
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
