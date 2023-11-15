import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()

export class AuthService{

    /* Apuntamos hacia un enrutador */
    APIURL = 'http://localhost:7070/auth';
    userinfo: any;


    /* Inicializador del servicio http */
    constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router){}

    get name(): any {
        return localStorage.getItem('nombre');
    }

    get identificado(): boolean{
        return !!localStorage.getItem('token')
    }
    
    register(user: any){

        /* Borramos la confirmación del password ya que no es necesario */
        delete user.cpassword;

        this.http.post(this.APIURL +'/register', user).subscribe(res => {
            this.userinfo = res;
            localStorage.setItem('token', this.userinfo.token);
            localStorage.setItem('nombre', this.userinfo.nombre);
            this.router.navigate(['/']);
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