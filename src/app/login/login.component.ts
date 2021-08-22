import { HttpErrorResponse } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personne } from '../class/personne';
import { Variables } from '../global/variables';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login=""; pwd="";

  public user!: Personne;

  constructor(private router: Router, private personneService: PersonneService, private vari: Variables) {  }

  ngOnInit(): void {
  }

  public loginUser(): void{
    this.personneService.getPersonneByLogin(this.login,this.pwd).subscribe(
      (response: Personne)=>{
        if(response!=null){
          sessionStorage.setItem("idpers", response.idpers+"");
          this.user=response;
          this.router.navigateByUrl("/accueil");
        }else
          alert("Login ou mot de passe incorrect !")
      },(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

}
