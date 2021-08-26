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

    public getBiensByIdpers(idpers: String): Observable<Bien[]>{
        return this.http.get<Bien[]>(`${this.apiServiceUrl}/bien/getBienByIdpers?idpers=`+idpers);
    }

    public addBien(bien: Bien): Observable<Bien>{
        return this.http.post<Bien>(`${this.apiServiceUrl}/bien/add`, bien);
    }

    public deleteBien(idbien: string):Observable<Bien>{
        return this.http.delete<Bien>(`${this.apiServiceUrl}/biens/`+idbien);
    }

    public getBienByIdbien(idbien: String):Observable<Bien>{
        return this.http.get<Bien>(`${this.apiServiceUrl}/bien/getBienByIdbiens?idbiens=`+idbien);
    }

    public editBienByIdbien(idbien: String, bien: Bien):Observable<Bien>{
        return this.http.put<Bien>(`${this.apiServiceUrl}/biens/`+idbien, bien)
    }
}