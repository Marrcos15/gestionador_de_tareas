import { Component } from "@angular/core";
import { WebService } from "./web.service";
import { TareasComponent } from "./tareas.component";
import { NuevaTareaComponent } from "./nueva-tarea.component";

@Component({
    selector: 'home',
    template: "<nueva-tarea></nueva-tarea><tareas></tareas>"
})

export class HomeComponent {

}