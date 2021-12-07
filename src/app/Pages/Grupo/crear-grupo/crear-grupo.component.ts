import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { GrupoService } from 'src/Services/grupo.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/Services/tarea.service';
import { MisGruposComponent } from '../mis-grupos/mis-grupos.component';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
  providers: [GrupoService]
})

export class CrearGrupoComponent implements OnInit {
  public subscription: Subscription;

  constructor(
    private GrupoService: GrupoService,
    private fb: FormBuilder, private TareaService: TareaService
  ) { }

  inputName: string = '';
  inputDescription: string = '';
  CANCEL: string = 'cancel';
  ngOnInit(): void { }

  @Output() showForm: EventEmitter<boolean> = new EventEmitter();
  @Output() groupList: EventEmitter<any> = new EventEmitter();

  HideForm(mode: string) {
    if (mode != this.CANCEL && !this.IsCreateGroupFormValid()) {
      return;
    }
    this.showForm.emit(false);
    document.getElementById('popup-tarea-backshadow').style.display = 'none';
  };

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]],
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  };

  CrearGrupo() {
    this.infoForm.value.usuarioCreador = JSON.parse(localStorage.getItem('user'));
    this.GrupoService.SendGrupo(this.infoForm.value).subscribe(grupo => {
      console.log('grupo: -->', grupo);
      this.groupList.emit(grupo);
      this.inputName = "";
      this.inputDescription = "";
      setTimeout(() => {
        MisGruposComponent.SetEvents();
      }, 0)
    });
  };

  IsCreateGroupFormValid(): Boolean {
    if (this.infoForm.value.nombre == '' && this.infoForm.value.descripcion != '') {
      document.getElementById('input-descripcion').classList.remove('descripcion-error');
      document.getElementById('input-nombre').classList.add('descripcion-error');
      return false;
    }
    if (this.infoForm.value.descripcion == '' && this.infoForm.value.nombre != '') {
      document.getElementById('input-nombre').classList.remove('descripcion-error');
      document.getElementById('input-descripcion').classList.add('descripcion-error');
      return false;
    }

    if (this.infoForm.value.descripcion == '' && this.infoForm.value.nombre == '') {
      document.getElementById('input-nombre').classList.add('descripcion-error');
      document.getElementById('input-descripcion').classList.add('descripcion-error');
      return false;
    }

    document.getElementById('input-descripcion').classList.remove('descripcion-error');
    document.getElementById('input-nombre').classList.remove('descripcion-error');
    return true;
  }
}
