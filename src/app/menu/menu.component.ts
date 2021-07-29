import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { PersonneService } from '../services/personne.service';
import { Personne } from '../class/personne';
import { HttpErrorResponse } from '@angular/common/http';
import { Variables } from '../global/variables';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  @ViewChild(MatSidenav) 
  sidenav!:MatSidenav;

 

  constructor(private observer: BreakpointObserver,private personneService: PersonneService, private router: Router) { 
    
  }
  
  public user!: Personne;

  ngAfterViewInit(){
   
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
    
  }

 
 
}
