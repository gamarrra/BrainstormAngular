import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './Components/login-button/login-button.component';
import { LogoutButtonComponent } from './Components/logout-button/logout-button.component';
import { NavbarComponent } from './Components/navbar/navbar.component'
import { HomeComponent } from './Pages/home/home.component';
import {EnviaMailComponent} from './Pages/envia-mail/envia-mail.component';
import { MisGruposComponent } from './Pages/Grupo/mis-grupos/mis-grupos.component';
import { MarketingComponent } from './Pages/marketing/marketing.component';
import { MisTareasComponent } from './Pages/Tarea/mis-tareas/mis-tareas.component';
import { CrearGrupoComponent } from './Pages/Grupo/crear-grupo/crear-grupo.component';
import { VerTareasComponent } from './Pages/Tarea/ver-tareas/ver-tareas.component';
import { CrearTareaComponent } from './Pages/Tarea/crear-tarea/crear-tarea.component';
import { CrearSubTareaComponent } from './Pages/SubTarea/crear-subTarea/crear-subTarea.component';
import { UserviewComponent } from './Pages/UserView/userview/userview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    HomeComponent,
    LoginComponent,
    EnviaMailComponent,
    NavbarComponent,
    MisGruposComponent,
    CrearGrupoComponent,
    VerTareasComponent,
    MarketingComponent,
    MisTareasComponent,
    CrearTareaComponent,
    CrearSubTareaComponent,
    UserviewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({ 
      ...env.auth,       
    cacheLocation: 'localstorage',
    useRefreshTokens: true
    }),
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
