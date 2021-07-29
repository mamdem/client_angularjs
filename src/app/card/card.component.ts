import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bien } from '../class/bien';
import { BienService } from '../services/bien.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

 
  public biens: Bien[] | undefined;

  constructor(private bienService: BienService) { }

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
  
  ngOnInit(): void {
    this.getBiens();
  }


}
