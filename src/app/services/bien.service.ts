import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Bien } from "../class/bien";

@Injectable({
    providedIn: 'root'
})

export class BienService{
    private apiServiceUrl=environment.apiBaseUrl;

    constructor (private http:HttpClient){}

    public getBiens(): Observable<Bien[]>{
        return this.http.get<Bien[]>(`${this.apiServiceUrl}/bien/all`);
    }

    public addBien(bien: Bien): Observable<Bien>{
        return this.http.post<Bien>(`${this.apiServiceUrl}/bien/add`, bien);
    }
}