import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'nav',
    template: `<mat-toolbar color="primary">Gestionador de tareas
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/">
            <mat-icon>home</mat-icon>
            <span>Inicio</span>
        </button>
        <button mat-menu-item routerLink="/tarea">
            <mat-icon>note_add</mat-icon>
            <span>Nueva Tarea</span>
        </button>
        <button mat-menu-item routerLink="/tareas">
            <mat-icon>assignment_turned_in</mat-icon>
            <span>Tareas</span>
        </button>
        <button mat-menu-item routerLink="/register">
            <mat-icon>group_add</mat-icon>
            <span>Añadir usuario</span>
        </button>
        <button mat-menu-item (click)="logout()" routerLink="/">
            <mat-icon>logout</mat-icon>
            <span>Cerrar Sesion</span>
        </button>
    </mat-menu>
    <span style="flex: 1 1 auto"></span>
    <span *ngIf="ident"> Bienvenido {{name}} </span>
    </mat-toolbar>
    `
})

export class NavComponent {

    name: string;
    ident: boolean;

    constructor(private auth: AuthService) {
        this.name = auth.name;
        this.ident = auth.identificado;
    }

    logout(){
        localStorage.clear();
    }
}