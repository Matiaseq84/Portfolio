import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../seguridad/service/token.service';
import { Persona } from './persona';

import { PersonaService } from './persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  public personas: Persona[] = [];
  public editPersona!: Persona;
  roles: string[];
  authority: string;

  constructor (private personaService: PersonaService, private tokenService: TokenService){}

  ngOnInit() {
    this.getPersonas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol => {
      if(rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
    
  }

  public getPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (response: Persona[]) => {
          this.personas = response;
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        console.log(error.message);
      }
    );
  }
  
public onUpdatePersona(persona: Persona):void {
  this.personaService.updatePersona(persona).subscribe(
    (response:Persona) => {
      console.log();
      this.getPersonas();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }

  );
}

  public onOpenModal(persona: Persona, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-target', '#updatePersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
