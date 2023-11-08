import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { WebService } from "./web.service";

@Component({
    selector: 'tareas',
    template: `<h1> Listado de tareas: </h1>
    <mat-card *ngFor="let tarea of tareas">
        <mat-card-title>{{tarea.usuario}}</mat-card-title>
        <mat-card-content>{{tarea.trabajo}}</mat-card-content>
    </mat-card>`
})

export class TareasComponent {

    tareas: any;

    /* Cargamos la respuesta del servicio web */
    constructor(private webservice: WebService){}

    /* Definimos como asincrono para esperar la respuesta */
    async ngOnInit(){
        let respuesta = await this.webservice.getTask();
        this.tareas = respuesta
    }

}