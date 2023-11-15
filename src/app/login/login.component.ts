import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/auth/login.service';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  onSignUp() {
    const userForms = document.getElementById('user_options-forms');
    if (userForms) {
      userForms.classList.remove('bounceRight');
      userForms.classList.add('bounceLeft');
    }
  }

  onLogin() {
    const userForms = document.getElementById('user_options-forms');
    if (userForms) {
      userForms.classList.remove('bounceLeft');
      userForms.classList.add('bounceRight');
    }
  }

  formulario: FormGroup;
  loginForm: FormGroup;
  loginService = inject(LoginService);

  constructor(private router:Router, private cookieService: CookieService) {
    this.formulario = new FormGroup({
      firstname: new FormControl,
      lastname: new FormControl,
      email: new FormControl,
      password: new FormControl,
    });
    
    this.loginForm = new FormGroup({
      email: new FormControl,
      password: new FormControl
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    const response = await this.loginService.register(this.formulario.value);
    console.log(response);
    this.router.navigate(['/home']);
    this.formulario.reset()
  }

  async onAuth() {
    const response = await this.loginService.login(this.loginForm.value);
    console.log(response);
    console.log(this.formulario.value)
    this.cookieService.set('authResponse', JSON.stringify(response));
    console.log(this.formulario.get("lastname")?.value)
    this.router.navigate(['/home']);
  }
  
}
