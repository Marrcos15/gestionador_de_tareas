import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TareasComponent } from './tareas.component';
import { NuevaTareaComponent } from './nueva-tarea.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
  },
  {
    path: 'tareas',
    component: TareasComponent
  },
  {
    path: 'tareas/:username',
    component: TareasComponent
  },
  {
    path: 'tarea',
    component: NuevaTareaComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
