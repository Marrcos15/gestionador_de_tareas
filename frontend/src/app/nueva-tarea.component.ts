import { Component } from "@angular/core";
import { WebService } from "./web.service";

@Component({
    selector: 'nueva-tarea',
    template: `<mat-card> 
        <mat-card-title>Añadir tarea</mat-card-title>
        <mat-form-field class="example-full-width">
            <mat-label>Nombre usuario: </mat-label>
            <input [(ngModel)]="tarea.usuario" matInput placeholder="username">
        </mat-form-field>
        <mat-form-field class="example-full-width">
            <mat-label>Especifique su tarea:</mat-label>
            <textarea [(ngModel)]="tarea.trabajo" matInput placeholder="Introduzca aquí su tarea"></textarea>
        </mat-form-field>
        
        <button (click)="post()" mat-raised-button color="primary">Añadir</button>
    </mat-card>`
})

export class NuevaTareaComponent {

    /* Cargamos la respuesta del servicio web */
    constructor(private webservice: WebService){}

    tarea = { trabajo: '', usuario: ''}

    post() {
        this.webservice.postTask(this.tarea);
    }
}