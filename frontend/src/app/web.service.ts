import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()

export class WebService{

    APIURL = 'http://localhost:7070/api/'

    tareas: any;
    respuesta: any;

    /* Inicializador del servicio http */
    constructor(private http: HttpClient, private _snackBar: MatSnackBar){
        this.tareas = [];
        this.getTask('');
    }
    
    getTask(username: any){
        /* Si encuentra username lo filtra sino lo deja vacio */
        username = (username) ? '/' + username: '';
        this.http.get(this.APIURL +'/tareas' + username).subscribe(res => {
            this.tareas = res;
        }, error => {
            this.manejadorErrores('No se ha podido obtener tareas');
        });  
    }
    
    async postTask(_tarea: any){
        try {
            this.respuesta = await this.http.post(this.APIURL + '/tarea', _tarea).toPromise();
            this.tareas.push(this.respuesta);
        } catch (error) {
            this.manejadorErrores('No se ha podido publicar la tarea');
        }

    }

    private manejadorErrores(error: any){
        this._snackBar.open(error, 'Cerrar', {
            duration: 2000
        });
    }
}