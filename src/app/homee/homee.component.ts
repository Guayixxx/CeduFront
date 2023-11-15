import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HojaVida } from '../models/HojaVida';
import { HojaVidaService } from '../service/perfil/datosPersonales/hoja-vida.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recurso } from '../models/Recurso';
import { ResourceService } from '../service/publicaciones/resource.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homee',
  templateUrl: './homee.component.html',
  styleUrls: ['./homee.component.scss']
})
export class HomeeComponent implements OnInit{
  @ViewChild('plusButton') plusButton!: ElementRef;
  @ViewChild('socialButtonsTwitter') socialButtonsTwitter!: ElementRef;
  @ViewChild('socialButtonsFacebook') socialButtonsFacebook!: ElementRef;
  @ViewChild('socialButtonsPinterest') socialButtonsPinterest!: ElementRef;
  @ViewChild('socialButtonsInsta') socialButtonsInsta!: ElementRef;
  formularioRecurso: FormGroup
  recursos: Array<Recurso>
  display1 : boolean;
  currentStep: string = 'step1';
  formData: any = {};
  formularioHojaVida: FormGroup
  hojaVidas: Array<HojaVida>
  display : boolean;
  isMenuOpen1: boolean = false;
  isMenuOpen: boolean = true;
  isMenuOpen2: boolean = false;
  si: boolean = false;
  si1: boolean = false;

  constructor(fb: FormBuilder, private rService2: ResourceService, private rService: HojaVidaService, private httpClient: HttpClient, private route: Router, private renderer: Renderer2 ){
    this.hojaVidas = new Array<HojaVida>();
    this.display = false;
    this.recursos = new Array<Recurso>();
    this.display1 = false;

    this.formularioHojaVida =  fb.group({
      cedula: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required]),
    })
    this.formularioRecurso =  fb.group({
      tipoArchivo : new FormControl(''),
      urlImagen : new FormControl(''),
      descripcion : new FormControl('',[Validators.required]),
    })
  }

  /*
  ngAfterViewInit() {
    // Agregar clases CSS y eventos al botón más ("plus-button")
    this.renderer.listen(this.plusButton.nativeElement, 'click', () => {
      this.plusButton.nativeElement.classList.toggle('open');
      this.socialButtonsTwitter.nativeElement.classList.toggle('active');
      this.socialButtonsFacebook.nativeElement.classList.toggle('active');
      this.socialButtonsPinterest.nativeElement.classList.toggle('active');
      this.socialButtonsInsta.nativeElement.classList.toggle('active');
    });
  }*/

  direccionarPag(titulo: string): void {
    this.route.navigate([titulo]);
  }


  ngOnInit(): void {
    /*this.getHojaVidas();
    this.getRecursos();*/
  }
  

  /* ----------------------------------------------- PERSONAL --------------------------------------------------------- */

  //get hojaVidas
  getHojaVidas(){
    this.rService.getHojaVidas().subscribe(res =>{
      this.hojaVidas = res
    })
  }

  //Eliminar hojaVida
  eliminarHojaVida(idHojaVida: number){
    this.rService.eliminarHojaVida(idHojaVida).subscribe(res =>{
      this.getHojaVidas()
    })
  }
  //Crear hojaVidas
  crearHojaVida(){
    if(this.formularioHojaVida.valid){
      let hojaVida= new HojaVida()
      hojaVida.cedula = this.formularioHojaVida.get("cedula")?.value
      hojaVida.nombre = this.formularioHojaVida.get("nombre")?.value
      hojaVida.correo = this.formularioHojaVida.get("correo")?.value
      this.rService.crearHojaVida(hojaVida).subscribe(res => {
        this.getHojaVidas()
        this.formularioHojaVida.reset()
      })
    }
  }


  activador(hojaVida: HojaVida){
    this.formularioHojaVida.get("cedula")?.setValue(hojaVida.cedula)
    this.formularioHojaVida.get("nombre")?.setValue(hojaVida.nombre)
    this.formularioHojaVida.get("correo")?.setValue(hojaVida.correo)
    this.display = !this.display
  }


  //Actualizar
  actualizarHojaVida(){
    if(this.formularioHojaVida.valid){
      let hojaVida= new HojaVida()
      hojaVida.cedula = this.formularioHojaVida.get("cedula")?.value
      hojaVida.nombre = this.formularioHojaVida.get("nombre")?.value
      hojaVida.correo = this.formularioHojaVida.get("correo")?.value
      this.rService.actualizarHojaVida(hojaVida).subscribe(res => {
        this.getHojaVidas()
        this.formularioHojaVida.reset()
        this.display = !this.display
      })
    }
  }

    /* ----------------------------------------------- RECURSOS --------------------------------------------------------- */
     //get recursos
  getRecursos(){
    this.rService2.getRecursos().subscribe(res =>{
      this.recursos = res
    })
  }

  //Eliminar recurso
  eliminarRecurso(idRecurso: String){
    this.rService2.eliminarRecurso(idRecurso).subscribe(res =>{
      this.getRecursos()
    })
  }
  //Crear recursos
  crearRecurso(){
    if(this.formularioRecurso.valid){
      let recurso= new Recurso()
      recurso.tipoArchivo = this.formularioRecurso.get("tipoArchivo")?.value
      recurso.urlImagen = this.formularioRecurso.get("urlImagen")?.value
      recurso.descripcion = this.formularioRecurso.get("descripcion")?.value
      this.rService2.crearRecurso(recurso).subscribe(res => {
        this.getRecursos()
        this.formularioRecurso.reset()
        console.log("entraa")
      })
    }
  }




  activador1(recurso: Recurso){
    this.formularioRecurso.get("tipoArchivo")?.setValue(recurso.tipoArchivo)
    this.formularioRecurso.get("urlImagen")?.setValue(recurso.urlImagen)
    this.formularioRecurso.get("descripcion")?.setValue(recurso.descripcion)
    this.display1 = !this.display1
  }

  //Actualizar
  actualizarRecurso(){
    if(this.formularioRecurso.valid){
      let recurso= new Recurso()
      recurso.tipoArchivo = this.formularioRecurso.get("tipoArchivo")?.value
      recurso.urlImagen = this.formularioRecurso.get("urlImagen")?.value
      recurso.descripcion = this.formularioRecurso.get("descripcion")?.value
      this.rService2.actualizarRecurso(recurso).subscribe(res => {
        this.getRecursos()
        this.formularioRecurso.reset()
        this.display1 = !this.display1
      })
    }
  }

  toggleMenu1(): void {
    this.isMenuOpen1 =true;
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = true;
    this.isMenuOpen1 = false;

  }
  selectedContentType: string = 'documento'; // Valor predeterminado
  // Función para manejar el cambio en la opción seleccionada
  onContentTypeChange() {}
}


