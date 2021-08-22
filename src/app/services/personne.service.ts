import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Personne } from "../class/personne";

@Injectable({
    providedIn: 'root'
})

export class PersonneService{
    private apiServiceUrl=environment.apiBaseUrl;

    public isAuth=false;

    constructor (private http:HttpClient){}

    public getPersonnes(): Observable<Personne[]>{
        return this.http.get<Personne[]>(`${this.apiServiceUrl}/personne/all`);
    }

    public addPersonne(personne: Personne): Observable<Personne>{
        return this.http.post<Personne>(`${this.apiServiceUrl}/personne/add`, personne);
    }

    public becomeAgent(idpers: String, personne: Personne): Observable<Personne>{
        return this.http.put<Personne> (`${this.apiServiceUrl}/personnes/`+idpers, personne);
    }

    public getPersonneByLogin(login: String, pwd: String): Observable<Personne>{
        return this.http.get<Personne>(`${this.apiServiceUrl}/personne/findByLogin?login=`+login+`&pwd=`+pwd);
    }

    public getUserById(idpers: String): Observable<Personne>{
        return this.http.get<Personne>(`${this.apiServiceUrl}/personne/`+idpers);
    }
}