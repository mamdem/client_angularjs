import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Personne } from '../class/personne';
import { Variables } from '../global/variables';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  
  constructor(private router: Router, private personneService: PersonneService, public vari: Variables) { }

  ngOnInit(): void {
  }

  public onAddPerson(signupForm: NgForm): void{
    document.getElementById('submit_btn')?.click();
    this.personneService.addPersonne(signupForm.value).subscribe(
      (response: Personne)=>{
        console.log(response);
        alert("Inscription reussie !!")
      },(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

}
