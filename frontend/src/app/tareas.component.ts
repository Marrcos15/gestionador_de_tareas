import { Component } from "@angular/core";
import { WebService } from "./web.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'tareas',
    template: `<h1> Listado de tareas: </h1>
    <mat-card *ngFor="let tarea of webservice.tareas">
        <mat-card-title [routerLink]="['/tareas', tarea.usuario]">{{tarea.usuario}}</mat-card-title>
        <mat-card-content>
            <p>{{tarea.trabajo}}</p>
        </mat-card-content>
    </mat-card>`
})

export class TareasComponent {

    username : any;

    /* Cargamos la respuesta del servicio web y obtenemos la ruta que está activa */
    constructor(public webservice: WebService, private rutaActiva: ActivatedRoute){
    }

    ngOnInit(): void {
        /* Recogemos el nombre de usuario para filtrarlo con getTask() de nuestro webService */
       this.username = this.rutaActiva.snapshot.params['username'];
       this.webservice.getTask(this.username);

    }
}