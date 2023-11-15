import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intereses } from 'src/app/models/intereses';

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  rutaGloblal = "http://localhost:8080/api/v1/auth/intereses/"
    
    constructor(private http: HttpClient) { }
  
      // Crear intereses:
      crearIntereses(intereses: Intereses){
        return this.http.post<Intereses>(this.rutaGloblal + 'nuevoIntereses', intereses, {
          observe: 'response'
        })
      }
      //  Obtener intereses:
      getInteresess(){
        return this.http.get<Intereses[]>(this.rutaGloblal +  'mostrarIntereses')
      }
}