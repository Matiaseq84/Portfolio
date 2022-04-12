import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from './logros';
import { LogrosService } from './logros.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public editProyecto!: Proyecto;
  public deleteProyecto!: Proyecto;
  

  constructor(private proyectoService: LogrosService) { }

  ngOnInit() {
    this.getProyectos();
  }

  public getProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
      (response: Proyecto[]) => {
          this.proyectos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProyecto(addForm: NgForm): void {
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.addProyecto(addForm.value).subscribe(
      (response: Proyecto) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
      }
      
    );
  }

  public onUpdateProyecto(proyecto: Proyecto):void {
    this.proyectoService.updateProyecto(proyecto).subscribe(
      (response:Proyecto) => {
        console.log();
        this.getProyectos();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }

  public onDeleteProyecto(proyectoId: number):void {
    this.proyectoService.deleteProyecto(proyectoId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }


  public onOpenModal(proyecto: Proyecto, mode: string): void {
    const container = document.getElementById('pro-container');
    const button = document.createElement('button'); 
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addProyectoModal')
    }
    if(mode === 'edit') {
      this.editProyecto = proyecto;
      button.setAttribute('data-target', '#updateProyectoModal');
    }
    if(mode === 'delete') {
      this.deleteProyecto = proyecto;
      button.setAttribute('data-target', '#deleteProyectoModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
