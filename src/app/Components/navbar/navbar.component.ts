import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { GrupoService } from 'src/Services/grupo.service';
import { TareaService } from '../../../Services/tarea.service';
import { Iuser } from '../../Models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public profileJson: string = "";
  public profileInfo: any;
  public objRecibido: Iuser;

  constructor(public auth: AuthService, private GrupoService: GrupoService, private TareaService: TareaService
) {
  }

  ngOnInit(): void {

    this.objRecibido = {email:'',nombreApellido:'', listTareasCreadas: []};

    this.auth.user$
      .subscribe((profile) => {
        this.profileInfo = profile;
        console.log(profile);
        console.log('email: ', profile.email);
        this.objRecibido.email = this.profileInfo.email;
        this.objRecibido.nombreApellido = this.profileInfo.nickname;
        this.objRecibido.listTareasCreadas = this.GetAllTasks();
        this.GetUserIfExist(this.objRecibido);
        localStorage.setItem('usuarioauth0', JSON.stringify(profile));
        this.profileJson = JSON.stringify(profile, null, 2)
      });

  }

  GetUserIfExist(obj: any) {
    this.GrupoService.GetUserIfExist(obj).subscribe( user => {
      console.log('user if exists: -->', user);
      localStorage.setItem('user', JSON.stringify(user));
    });
  };

  GetAllTasks() {
    this.TareaService.GetAllTasks().subscribe(allTasks => { allTasks });
  }
}
