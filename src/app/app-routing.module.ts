import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeeComponent } from './homee/homee.component';
import { guardiaGuard } from './guards/guardia.guard';
import { ChattComponent } from './chatt/chatt.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [guardiaGuard]},
  {path: 'navbar', component: NavbarComponent, canActivate: [guardiaGuard]},
  {path: 'home', component: HomeeComponent, canActivate: [guardiaGuard]},  
  {path: 'chat', component: ChattComponent, canActivate: [guardiaGuard]},  
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
