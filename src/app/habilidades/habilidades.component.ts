import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenService } from '../seguridad/service/token.service';
import { HSSkill } from './habilidades';
import { HabilidadesService } from './habilidades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public skills: HSSkill[] = [];
  public editSkill!: HSSkill;
  public deleteSkill!: HSSkill;
  isAdmin = false;
  roles: string[];
  authority: string;
  

  constructor(private skillService: HabilidadesService, private tokenService: TokenService) { }

  ngOnInit() {
    this.getSkills();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol => {
      if(rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getSkills(): void {
    this.skillService.getSkills().subscribe(
      (response: HSSkill[]) => {
          this.skills = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    this.skillService.addSkill(addForm.value).subscribe(
      (response: HSSkill) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
      }
      
    );
  }

  public onUpdateSkill(skill: HSSkill):void {
    this.skillService.updateSkill(skill).subscribe(
      (response: HSSkill) => {
        console.log();
        this.getSkills();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }

  public onDeleteSkill(skillId: number):void {
    this.skillService.deleteSkill(skillId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
    );
  }


  public onOpenModal(skill: HSSkill, mode: string): void {
    const container = document.getElementById('hss-container');
    const button = document.createElement('button'); 
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal')
    }
    if(mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-target', '#updateSkillModal');
    }
    if(mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
