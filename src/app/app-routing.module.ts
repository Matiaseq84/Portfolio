import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seguridad/auth/login.component';
import { RegistroComponent } from './seguridad/auth/registro.component';
import { IndexComponent } from './seguridad/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path:'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
