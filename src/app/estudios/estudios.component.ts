import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from './estudios';
import { EstudiosService } from './estudios.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  public estudios: Educacion[] = [];
  public editEducacion!: Educacion;
  public deleteEducacion!: Educacion;
  

  constructor(private estudiosService: EstudiosService) { }

  ngOnInit() {
    this.getEstudios();
  }

  public getEstudios(): void {
    this.estudiosService.getEstudios().subscribe(
      (response: Educacion[]) => {
          this.estudios = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducacion(addForm: NgForm): void {
    document.getElementById('add-educacion-form')?.click();
    this.estudiosService.addEducacion(addForm.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEstudios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
      }
      
    );
  }

  public onUpdateEducacion(educacion: Educacion):void {
    this.estudiosService.updateEducacion(educacion).subscribe(
      (response:Educacion) => {
        console.log();
        this.getEstudios();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }

  public onDeleteEducacion(educacionId: number):void {
    this.estudiosService.deleteEducacion(educacionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEstudios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }


  public onOpenModal(educacion: Educacion, mode: string): void {
    const container = document.getElementById('edu-container');
    const button = document.createElement('button'); 
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal')
    }
    if(mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if(mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
