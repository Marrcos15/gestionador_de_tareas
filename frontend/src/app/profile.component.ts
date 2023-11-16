import { Component, OnInit } from "@angular/core";
import { WebService } from "./web.service";

@Component({
    selector: 'profile',
    template: `<mat-card> 
        <mat-card-title>Editar Perfil</mat-card-title>
        <mat-form-field class="example-full-width">
            <mat-label>Nombre </mat-label>
            <input [(ngModel)]="modelo.nombre" matInput placeholder="nombre">
        </mat-form-field>
        <mat-form-field class="example-full-width">
            <mat-label>Email</mat-label>
            <input [(ngModel)]="modelo.email" matInput placeholder="email">
        </mat-form-field>
        
        <button (click)="post()" mat-raised-button color="primary">Guardar</button>
    </mat-card>`
})

export class ProfileComponent implements OnInit {

    /* Cargamos la respuesta del servicio web */
    constructor(private webservice: WebService){}

    modelo = {nombre: '', email:''};


    /* Para cargar los datos de usuario al llamal al componente */
    ngOnInit(): void {
        this.webservice.getUser().subscribe((res: { nombre: string; email: string; }) => {
            this.modelo.nombre = res.nombre;
            this.modelo.email = res.email;
        });
    }

    post() {
        this.webservice.saveUser(this.modelo).subscribe();
    }
}