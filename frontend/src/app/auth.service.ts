import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()

export class AuthService{

    /* Apuntamos hacia un enrutador */
    APIURL = 'http://localhost:7070/auth';


    /* Inicializador del servicio http */
    constructor(private http: HttpClient, private _snackBar: MatSnackBar){

    }
    
    register(user: any){

        /* Borramos la confirmación del password ya que no es necesario */
        delete user.cpassword;

        this.http.post(this.APIURL +'/register', user).subscribe(res => {
        }, error => {
            this.manejadorErrores('No se ha podido registrar al usuario');
        });  
    }

    private manejadorErrores(error: any){
        this._snackBar.open(error, 'Cerrar', {
            duration: 2000
        });
    }
}