import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';
import * as _ from 'lodash';
import { MisTareasComponent } from '../Tarea/mis-tareas/mis-tareas.component';
import { IsubTarea } from '../../Models/subTarea';
import { Estados } from '../../Models/estadoEnum';


@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  colors = ['red', 'greenyellow', 'pink', 'blueviolet', 'gray', 'aqua', 'bisque'];
  randomColor: string;

  constructor(
    private fb: FormBuilder, private TareaService: TareaService
  ) { }

  tasks: Itarea[];
  subTasks: IsubTarea[];
  inputTodo: string = '';
  oldDate: string = '';
  hoy: any = new Date();
  fechaVencimiento: any = new Date(`${this.hoy.getMonth() + 1}-${this.hoy.getDate() - 7}-${this.hoy.getFullYear()}`);
  //fechaVencimiento: any = new Date(`10-20-21`);

  TareaFinalizada = Estados.Finalizada;
  TareaNueva = Estados.Nueva;

  SubTareaFinalizada = Estados.Finalizada;
  SubTareaNueva = Estados.Nueva;

  ngOnInit(): void {
    this.tasks = [];
    this.GetAllTasks();
    this.GetAllSubTasks();
    //this.randomColor = this.colors[Math.floor(Math.random() * 7)];
    this.randomColor = this.colors[2];
    console.log('fechaVencimiento: ', this.fechaVencimiento);
  }

  ConvertDate(string) {
    let res;
    res = new Date(string);
    return res;
  }

  receiveTaskList($event) {
    this.tasks.push($event);
  }

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  };

  GetAllTasks() {
    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem('user'));
      this.tasks = user.listaGruposCreados[0].listaTareas;
    }, 1000);

    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem('user'));
      this.tasks = user.listaGruposCreados[0].listaTareas.length == 0 ? [] : user.listaGruposCreados[0].listaTareas;
      let tareas = document.getElementsByClassName('task-card').length;
      for (let i = 0; i < tareas; i++) {
        (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
      };
    }, 0)
  };

  GetAllSubTasks() {
    this.TareaService
      .GetAllSubTasks()
      .subscribe(allSubTasks => {
        console.log('allSubTasks:xxxx -->', allSubTasks);
        this.subTasks = allSubTasks;

        //  setTimeout(() => {
        //    MisTareasComponent.SetEvents();
        //    let tareas = document.getElementsByClassName('task-card').length;
        //    for (let i = 0; i < tareas; i++) {
        //      //(<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[Math.floor(Math.random()*7)]
        //      (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
        //    };
        //}, 0)
      });
  };

}
