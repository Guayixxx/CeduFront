import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactbarComponent } from './contactbar/contactbar.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { HomeeComponent } from './homee/homee.component';
import { CookieService } from 'ngx-cookie-service';
import { ChattComponent } from './chatt/chatt.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    NavbarComponent,
    SidebarComponent,
    ContactbarComponent,
    PublicacionComponent,
    HomeeComponent,
    ChattComponent,
    UserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
