import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  username: string = '';
  email: string = '';

  setUser(username: string, email: string) {
    this.username = username;
    console.log(this.username)
    this.email = email;
  }
  
  private httpClient = inject(HttpClient);
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8080/api/v1/auth';
  }

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue)
    )
  }

  login(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/authenticate`, formValue)
    )
  }

}
