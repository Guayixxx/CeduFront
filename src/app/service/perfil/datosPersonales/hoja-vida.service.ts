import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HojaVida } from '../../../models/HojaVida';
@Injectable({
  providedIn: 'root'
})
export class HojaVidaService {


  rutaGloblal = "http://localhost:8080/api/v1/auth/hojaVida/"
    
    constructor(private http: HttpClient) { }
  
      // Crear hojaVida:
      crearHojaVida(hojaVida: HojaVida){
        console.log(hojaVida)
        return this.http.post<HojaVida>(this.rutaGloblal + 'nuevoHojaVida', hojaVida, {
          observe: 'response'
        })
      }
  
      //  Obtener hojaVida:
      getHojaVidas(){
        return this.http.get<HojaVida[]>(this.rutaGloblal +  'mostrarHojaVida')
      }
  
      //  Modificar hojaVida:
      actualizarHojaVida(hojaVida : HojaVida){
          return this.http.post<HojaVida>(this.rutaGloblal + 'modificarHojaVida', hojaVida, {
            observe : 'response'
          })
      }
  
      //  Eliminar hojaVida:
      eliminarHojaVida(id: number){
        
          return this.http.post<Boolean>(this.rutaGloblal + 'borrarHojaVida/' +id , {
          observe: 'response'
        })
      }
}