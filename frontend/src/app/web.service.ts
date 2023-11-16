import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class WebService{

    APIURL = 'http://localhost:7070/api/'

    tareas: any;
    respuesta: any;
    tareasSujeto = new Subject();

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
            /* Ahora los componentes accederan al sujeto */
            this.tareasSujeto.next(this.tareas);
        }, error => {
            this.manejadorErrores('No se ha podido obtener tareas');
        });  
    }
    
    async postTask(_tarea: any){
        try {
            this.respuesta = await this.http.post(this.APIURL + '/tarea', _tarea).toPromise();
            this.tareas.push(this.respuesta);
            this.tareasSujeto.next(this.tareas)
        } catch (error) {
            this.manejadorErrores('No se ha podido publicar la tarea');
        }

    }

    getUser(): any{
        const headers = this.auth_headers()
        return this.http.get(this.APIURL + '/users/yop', {headers}).pipe(map(res => res));
    }

    saveUser(usermodel: any): any {
        const headers = this.auth_headers()
        return this.http.post(this.APIURL + '/users/yop', usermodel, {headers}).pipe(map(res => res));
    }

    private manejadorErrores(error: any){
        this._snackBar.open(error, 'Cerrar', {
            duration: 2000
        });
    }

    auth_headers(){
        const auth_header = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });

        return auth_header;
    }
}