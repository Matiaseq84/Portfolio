import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { LogrosComponent } from './logros/logros.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonaService } from './acerca-de/persona.service';
import { FormsModule } from '@angular/forms';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { interceptProvider } from './seguridad/interceptors/port-interceptor.service';

import { LoginComponent } from './seguridad/auth/login.component';
import { RegistroComponent } from './seguridad/auth/registro.component';
import { MenuComponent } from './seguridad/menu/menu.component';
import { IndexComponent } from './seguridad/index/index.component';




@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    EstudiosComponent,
    HabilidadesComponent,
    LogrosComponent,
    ExperienciaComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],

  providers: [interceptProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
