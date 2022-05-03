import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { FooterComponent } from './footer/footer.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { LogrosComponent } from './logros/logros.component';
import { LoginComponent } from './seguridad/auth/login.component';
import { RegistroComponent } from './seguridad/auth/registro.component';
import { PortGuardService as guard} from './seguridad/guard/port-guard.service';
import { IndexComponent } from './seguridad/index/index.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  //{path:'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'acerca-de', component: AcercaDeComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'estudios', component: EstudiosComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'experiencia', component: ExperienciaComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'habilidades', component: HabilidadesComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'logros', component: LogrosComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'footer', component: FooterComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
