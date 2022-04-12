import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExperienciaLaboral } from './experiencia';
import { ExperienciaService } from './experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencias: ExperienciaLaboral[] = [];
  public editExperiencia!: ExperienciaLaboral;
  public deleteExperiencia!: ExperienciaLaboral;
  

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit() {
    this.getExperiencias();
  }

  public getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
      (response: ExperienciaLaboral[]) => {
          this.experiencias = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExperiencia(addForm: NgForm): void {
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe(
      (response: ExperienciaLaboral) => {
        console.log(response);
        this.getExperiencias();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
      }
      
    );
  }

  public onUpdateExperiencia(experiencia: ExperienciaLaboral):void {
    this.experienciaService.updateExperiencia(experiencia).subscribe(
      (response:ExperienciaLaboral) => {
        console.log();
        this.getExperiencias();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }

  public onDeleteExperiencia(experienciaId: number):void {
    this.experienciaService.deleteExperiencia(experienciaId).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperiencias();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }


  public onOpenModal(experiencia: ExperienciaLaboral, mode: string): void {
    const container = document.getElementById('exp-container');
    const button = document.createElement('button'); 
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal')
    }
    if(mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
    }
    if(mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal')
    }
    container?.appendChild(button);
    button.click();
  }

}
