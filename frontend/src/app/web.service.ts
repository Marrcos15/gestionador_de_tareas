import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class WebService{

    /* Inicializador del servicio http */
    constructor(private http: HttpClient){}
    
    getTask(){
        return this.http.get('http://localhost:7070/api/tareas').toPromise();
    }
}