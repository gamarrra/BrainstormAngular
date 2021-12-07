import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/Services/grupo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Igrupo } from 'src/app/Models/grupo';
import { TareaService } from 'src/Services/tarea.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Iuser } from '../../../Models/user';

@Component({
  selector: 'app-mis-grupo',
  templateUrl: './mis-grupos.component.html',
  styleUrls: ['./mis-grupos.component.css'],
  providers: [GrupoService]
})
export class MisGruposComponent implements OnInit {
  showForm: boolean;
  oldName: string = '';
  oldDescription: string = '';
  static groupId: any;
  static group: Igrupo;
  colors = ['red', 'greenyellow', 'pink', 'blueviolet', 'gray', 'aqua', 'bisque']; 
  randomColor: string;

  constructor(
    private GrupoService: GrupoService,
    private fb: FormBuilder, private TareaService: TareaService,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  groups: Igrupo[];
  inputTodo: string = '';
  user: any;

  ngOnInit(): void {
    this.groups = [];
    this.showForm = false;
    //this.randomColor = this.colors[Math.floor(Math.random() * 7)];
    this.randomColor = this.colors[2];
    this.user =  JSON.parse(localStorage.getItem('user'));
    this.groups = this.user.listaGruposCreados;
    setTimeout(() => {
      MisGruposComponent.SetEvents();
        for (let i = 0; i < this.groups.length; i++){
          (<HTMLHtmlElement>document.getElementsByClassName('group-card')[i]).style.backgroundColor = this.colors[i]
        };
    }, 0);
  }

  setGroup(event, grupo) {
    event.stopPropagation();
    MisGruposComponent.group = grupo;
  }

  receiveMessage($event){
    this.showForm = $event;
  }

  receiveGroupList($event) {
    this.groups.push($event);
  };

  ShowForm(): void {
    this.showForm = true;
    document.getElementById('popup-tarea-backshadow').style.display = 'block';
  };

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  infoFormTask = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  };

  //GetAllGroups() {
  //  this.GrupoService
  //  .GetAllGroups()
  //  .subscribe(allGroups => {
  //    console.log('allGroups: -->', allGroups);
  //    this.groups = allGroups;

  //    setTimeout(() => {
  //      MisGruposComponent.SetEvents();
  //      //var colors = ['red','greenyellow','blueviolet','pink','gray','aqua','bisque']
  //      let grupos = document.getElementsByClassName('group-card').length;
  //      for (let i = 0; i < grupos; i++){
  //        //(<HTMLHtmlElement>document.getElementsByClassName('group-card')[i]).style.backgroundColor = this.colors[Math.floor(Math.random()*7)]
  //        (<HTMLHtmlElement>document.getElementsByClassName('group-card')[i]).style.backgroundColor = this.colors[i]
  //      };
  //    }, 0)
  //  });
  //};

  //GetGroupById(id: number) {
  //  this.GrupoService
  //    .GetGroupById(id)
  //  .subscribe(id => {
  //    console.log('id: -->', id);
  //  });
  //};


  DeleteGroup(event, grupoId) {
    event.stopPropagation();
    this.DeleteGroupModal(grupoId)
  }

  private DeleteGroupModal(groupId: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.GrupoService.DeleteGroup(groupId).subscribe(groupDeleted => {
          this.groups = this.groups.filter(group => group.grupoId !== groupId);
        });
        Swal.fire('Deleted!', 'Your group has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your group is safe :)', 'error');
      }
    });
  }

  static SetEvents() {
    for (let i = 0; i < document.getElementsByClassName('group-card').length; i++) {
      document.getElementsByClassName('group-card')[i].addEventListener('mouseenter', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('icons-' + id).style.display = 'block'
      })
    }

    for (let i = 0; i < document.getElementsByClassName('group-card').length; i++) {
      document.getElementsByClassName('group-card')[i].addEventListener('mouseleave', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('icons-' + id).style.display = 'none';
      })
    }
  }

  EditGroup(event, grupoId, oldName, oldDescription) {
    event.stopPropagation();
    //this.GrupoService.GetGroupById(grupoId).subscribe(groupById => {
    //  this.oldName = groupById.descripcion;
    //  this.ResultGroupEdit(grupoId);
    //});
    this.oldName = oldName;
    this.oldDescription = oldDescription;
    this.ResultGroupEdit(grupoId);
  }

  private ResultGroupEdit(grupoId: any) {
    this.EditGroupModal(grupoId).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Group edited`
        });
      }
    });
  }

 private EditGroupModal(grupoId: any) {
    return Swal.fire({
     title: 'Edit your group.',
     html: `<div style="display:flex;flex-direction:column;"><label>Name:</label><input id="swal-input1" style="margin:5px;" class="swal2-input" value="${this.oldName?.toString()}">
            <label>Description:</label><input id="swal-input2" style="margin:5px;" class="swal2-input" value="${this.oldDescription?.toString()}"></div>`,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: task => {
        this.PreConfirmTask(grupoId, {
          nombre: (<HTMLInputElement>document.getElementById('swal-input1')).value,
          descripcion: (<HTMLInputElement>document.getElementById('swal-input2')).value,
          grupoId: grupoId,
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  private PreConfirmTask(grupoId: any, group: any) {
    this.GrupoService.EditGroup( group ).subscribe(
      group => {
        this.groups = this.groups.filter(group => group.grupoId != grupoId);
        this.groups.push(group);
        this.groups = _.orderBy(this.groups, ['grupoId'], ['asc']);
        setTimeout(() => {
          MisGruposComponent.SetEvents();
          for (let i = 0; i < this.groups.length; i++){
            (<HTMLHtmlElement>document.getElementsByClassName('group-card')[i]).style.backgroundColor = this.colors[i]
          };
        }, 0)
      }
    );
  }

  EditGroupStatus(group) {
    group.statusId ? (group.statusId = 0) : (group.statusId = 1);
    this.GrupoService.EditGroupStatus(group.tareaId, {
      descripcion: group.descripcion,
      statusId: group.statusId
    }).subscribe(group => {
      console.log('grupo editado: -->', group);
    });
  }

}
