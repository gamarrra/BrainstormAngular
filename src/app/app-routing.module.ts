import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './Pages/home/home.component';
import {EnviaMailComponent} from './Pages/envia-mail/envia-mail.component'
import { MisGruposComponent } from './Pages/Grupo/mis-grupos/mis-grupos.component';
import { CrearTareaComponent } from './Pages/Tarea/crear-tarea/crear-tarea.component';
import { CrearGrupoComponent } from './Pages/Grupo/crear-grupo/crear-grupo.component';
import { VerTareasComponent } from './Pages/Tarea/ver-tareas/ver-tareas.component';
import { MisTareasComponent } from './Pages/Tarea/mis-tareas/mis-tareas.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UserviewComponent } from './Pages/UserView/userview/userview.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'EnviaMail',
    component: EnviaMailComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'MisGrupos',
    component: MisGruposComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'CrearGrupo',
    component: CrearGrupoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'MisTareas',
    component: MisTareasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Tareas/:',
    component: VerTareasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'CrearTarea',
    component: CrearTareaComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'UserView',
    component: UserviewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
