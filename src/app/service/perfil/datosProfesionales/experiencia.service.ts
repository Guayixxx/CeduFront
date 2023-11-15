import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencias } from 'src/app/models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  rutaGloblal = "http://localhost:8080/api/v1/auth/experiencias/"
    
    constructor(private http: HttpClient) { }
  
      // Crear  experiencias:
      crearExperiencias( experiencias: Experiencias){
        return this.http.post<Experiencias>(this.rutaGloblal + 'nuevoExperiencias',  experiencias, {
          observe: 'response'
        })
      }
  
      //  Obtener  experiencias:
      getExperienciass(){
        return this.http.get<Experiencias[]>(this.rutaGloblal +  'mostrarExperiencias')
      }
  
      //  Modificar  experiencias:
      actualizarExperiencias( experiencias : Experiencias){
          return this.http.post<Experiencias>(this.rutaGloblal + 'modificarExperiencias',  experiencias, {
            observe : 'response'
          })
      }
  
      //  Eliminar  experiencias:
      eliminarExperiencias(id: String){
          console.log(id)
          return this.http.post<Boolean>(this.rutaGloblal+ 'borrarExperiencias/' +id , {
          observe: 'response'
        })
      }
}