import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TareaService } from 'src/Services/tarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-subTarea',
  templateUrl: './crear-subTarea.component.html',
  styleUrls: ['./crear-subTarea.component.css'],
  providers: [TareaService]
})
export class CrearSubTareaComponent implements OnInit {
  public subscription: Subscription;

  constructor(private TareaService: TareaService, private fb: FormBuilder) {}

  nickNameRecibido: string = '';
  today = new Date().getDate();
  inputTask: string = '';
  isChecked: number = 0;
  tarea_id: number;

  ngOnInit(): void {
    //this.tarea_id = parseInt(localStorage.getItem('grupoId'));
  }

  @Output() showFormSubTask: EventEmitter<boolean> = new EventEmitter();
  @Output() tasksList: EventEmitter<any> = new EventEmitter();

  HideForm() {
    this.showFormSubTask.emit(false);
    document.getElementById('popup-subtarea-backshadow').style.display = 'none';
  };

  infoFormSubTask = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['', [Validators.required]],
    tarea_Id: ['', [Validators.required]]
  });

  get descripcion() {
    return this.infoFormSubTask.get('descripcion');
  }
  get estado() {
    return this.infoFormSubTask.get('estado');
  }
  get tarea_Id() {
    return this.infoFormSubTask.get('tarea_Id');
  }

  CrearSubTarea() {
    this.infoFormSubTask.value.usuarioCreador = JSON.parse(localStorage.getItem('user'));
    this.infoFormSubTask.value.estado = 'Nueva';
    this.TareaService.SendSubTarea(this.infoFormSubTask.value).subscribe(subtarea => {
      console.log('subtarea: -->', subtarea);
      this.tasksList.emit(subtarea);

      this.inputTask = '';
      setTimeout(() => {
       // MisTareasComponent.SetEvents();
      }, 0)
    });
  }
}
