import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Personne } from '../class/personne';
import { Variables } from '../global/variables';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  @ViewChild(MatSidenav) 
  sidenav!:MatSidenav;

 

  constructor(private observer: BreakpointObserver,private personneService: PersonneService, private router: Router, public vari: Variables) { 
    
  }
  
  public user!: Personne;

  ngAfterViewInit(){
    this.observer.observe(['(max-width : 800px)']).subscribe((res)=> {
      if(this.vari.isUserLoggedIn()){
        this.sidenav.mode="side";
        this.sidenav.open();
      }
    });
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

  ngOnInit(): void {
    if(this.vari.isUserLoggedIn())
      this.getUserSession();
  }

  public deconnecter(): void{
    sessionStorage.removeItem('idpers');
    alert(this.vari.isUserLoggedIn())
    this.router.navigateByUrl("/login");
    this.sidenav.close();
  }
}
