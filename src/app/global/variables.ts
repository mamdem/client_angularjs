import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Variables{
    constructor(){}

    isUserLoggedIn() {  //renvoie true si l'user est connecté
      let user = sessionStorage.getItem('idpers')
      return !(user === null)
    }
}