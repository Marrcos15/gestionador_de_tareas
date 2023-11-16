import { Component } from "@angular/core";
import { WebService } from "./web.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'tareas',
    template: `<h1> Listado de tareas: </h1>
    <mat-card *ngFor="let tarea of tareasLista">
        <mat-card-title [routerLink]="['/tareas', tarea.usuario]">{{tarea.usuario}}</mat-card-title>
        <mat-card-content>
            <p>{{tarea.trabajo}}</p>
        </mat-card-content>
    </mat-card>`
})

export class TareasComponent {

    username : any;
    tareasLista: any;

    /* Cargamos la respuesta del servicio web y obtenemos la ruta que está activa */
    constructor(private webservice: WebService, private rutaActiva: ActivatedRoute){
    }

    ngOnInit(): void {
        /* Recogemos el nombre de usuario para filtrarlo con getTask() de nuestro webService */
       this.username = this.rutaActiva.snapshot.params['username'];
       this.webservice.getTask(this.username);
       this.webservice.tareasSujeto.subscribe(tareas => {
            this.tareasLista = tareas;
       });
       /* Para cargar el usuario cuando se acceda a este componente */
       this.webservice.getUser();
    }
}