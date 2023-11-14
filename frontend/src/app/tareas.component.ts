import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { WebService } from "./web.service";

@Component({
    selector: 'tareas',
    template: `<h1> Listado de tareas: </h1>
    <mat-card *ngFor="let tarea of webservice.tareas">
        <mat-card-title>{{tarea.usuario}}</mat-card-title>
        <mat-card-content>{{tarea.trabajo}}</mat-card-content>
    </mat-card>`
})

export class TareasComponent {

    /* Cargamos la respuesta del servicio web */
    constructor(public webservice: WebService){}
}