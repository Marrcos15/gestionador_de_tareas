import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'login',
    template: `
    <mat-card>
    <form>
        <mat-card-title>Acceso Niembros</mat-card-title>
    
        <mat-form-field class="example-full-width">
            <mat-label>Email:</mat-label>
            <input [(ngModel)]="logindata.email" matInput placeholder="Nombre" name="email">
        </mat-form-field>
  
        <mat-form-field class="example-full-width">
            <mat-label>Password:</mat-label>
            <input [(ngModel)]="logindata.password" type="password" matInput placeholder="Password" name="password">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="login()">Entrar</button>
    </form>
    </mat-card>
    `
})

export class LoginComponent {

    constructor(private auth: AuthService){}

    logindata = {
        email: '',
        password: ''
    }

    login(){
        this.auth.login(this.logindata);
    }
}