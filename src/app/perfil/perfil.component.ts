import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HojaVida } from '../models/HojaVida';
import { HojaVidaService } from '../service/perfil/datosPersonales/hoja-vida.service';
import { HttpClient } from '@angular/common/http';
import { EstudiosService } from '../service/perfil/datosEducativos/estudios.service';
import { Estudios } from '../models/estudios';
import { ExperienciaService } from '../service/perfil/datosProfesionales/experiencia.service';
import { Experiencias } from '../models/experiencia';
import { Intereses } from '../models/intereses';
import { InteresesService } from '../service/perfil/intereses/intereses.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  isMenuOpen: boolean = false;
  isMenuOpen2: boolean = false;
  isMenuOpen3: boolean = false;
  isMenuOpen4: boolean = false;
  isMenuOpen5: boolean = false;
  isMenuOpen6: boolean = false;
  dataLoaded3 // Inicialmente, la información no está cargada
  dataLoaded4 
  dataLoaded5 
  dataLoaded6
  currentStep: string = 'step1';
  formData: any = {};
  formularioHojaVida: FormGroup
  hojaVidas: Array<HojaVida>
  display : boolean;
  display3 : boolean;
  display4 : boolean;
  formularioEstudios: FormGroup
  estudioss: Array<Estudios>
  formularioExperiencias: FormGroup
  experienciass: Array<Experiencias>
  formularioIntereses: FormGroup
  interesess: Array<Intereses>

  constructor(fb: FormBuilder, private rService3: ExperienciaService, private rService: HojaVidaService, private httpClient: HttpClient,private rService2: EstudiosService, private rService4: InteresesService ){
    this.hojaVidas = new Array<HojaVida>();
    this.estudioss = new Array<Estudios>();
    this.experienciass = new Array<Experiencias>();
    this.interesess = new Array<Intereses>();
    this.display = false;
    this.display3 = false;
    this.display4 = false;
    this.dataLoaded3 = false; // Inicialmente, la información no está cargada
    this.dataLoaded4 = false;
    this.dataLoaded5 = false;
    this.dataLoaded6 = false;
    this.fileInput = new ElementRef(null);
    this.imageElement = new ElementRef(null);

    this.formularioHojaVida =  fb.group({
      cedula: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required]),
    })
    this.formularioEstudios =  fb.group({
      nivelEducacion: new FormControl('',[Validators.required]),
      carrera: new FormControl('',[Validators.required]),
      universidad : new FormControl('',[Validators.required]),
    })
    this.formularioExperiencias =  fb.group({
      titulo: new FormControl('',[Validators.required]),
      empresa: new FormControl('',[Validators.required]),
      cargo : new FormControl('',[Validators.required]),
      duracion : new FormControl('',[Validators.required]),
    })
    this.formularioIntereses =  fb.group({
      interes: new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
  }
  

/* ----------------------------------------------- INTERESES --------------------------------------------------------- */

  //get interesess
  getInteresess(){
    this.rService4.getInteresess().subscribe(res =>{
      this.interesess = res
    })
  }


  //Crear interesess
  crearIntereses(){
    if(this.formularioIntereses.valid){
      let intereses= new Intereses()
      intereses.interes = this.formularioIntereses.get("interes")?.value
      this.rService4.crearIntereses(intereses).subscribe(res => {
        this.getInteresess()
        this.formularioIntereses.reset()
        this.dataLoaded6 = true;
        this.isMenuOpen6 = !this.isMenuOpen6;
      })
    }
  }

  activador4(intereses: Intereses){
    this.formularioIntereses.get("interes")?.setValue(intereses.interes)
    this.display = !this.display
  }

/* ----------------------------------------------- PROFESIONAL --------------------------------------------------------- */

  //get experienciass
  getExperienciass(){
    this.rService3.getExperienciass().subscribe(res =>{
      this.experienciass = res
    })
  }

  //Eliminar experiencias
  eliminarExperiencias(idExperiencias: String){
    this.rService3.eliminarExperiencias(idExperiencias).subscribe(res =>{
      this.getExperienciass()
    })
  }
  //Crear experienciass
  crearExperiencias(){
    if(this.formularioExperiencias.valid){
      let experiencias= new Experiencias()
      experiencias.titulo = this.formularioExperiencias.get("titulo")?.value
      experiencias.empresa = this.formularioExperiencias.get("empresa")?.value
      experiencias.cargo = this.formularioExperiencias.get("cargo")?.value
      experiencias.duracion = this.formularioExperiencias.get("duracion")?.value
      this.rService3.crearExperiencias(experiencias).subscribe(res => {
        this.getExperienciass()
        this.formularioExperiencias.reset()
        this.dataLoaded4 = true;
        this.isMenuOpen4 = !this.isMenuOpen4;
      })
    }
  }


  activador3(experiencias: Experiencias){
    this.formularioExperiencias.get("titulo")?.setValue(experiencias.titulo)
    this.formularioExperiencias.get("empresa")?.setValue(experiencias.empresa)
    this.formularioExperiencias.get("cargo")?.setValue(experiencias.cargo)
    this.formularioExperiencias.get("duracion")?.setValue(experiencias.duracion)
    this.display3 = !this.display3
  }

  //Actualizar
  actualizarExperiencias(){
    if(this.formularioExperiencias.valid){
      let experiencias= new Experiencias()
      experiencias.titulo = this.formularioExperiencias.get("titulo")?.value
      experiencias.empresa = this.formularioExperiencias.get("empresa")?.value
      experiencias.cargo = this.formularioExperiencias.get("cargo")?.value
      experiencias.duracion = this.formularioExperiencias.get("duracion")?.value
      this.rService3.actualizarExperiencias(experiencias).subscribe(res => {
        this.getExperienciass()
        this.formularioExperiencias.reset()
        this.display3 = !this.display3
      })
    }
  }

  /* ----------------------------------------------- ESTUDIOS --------------------------------------------------------- */
    //get estudioss
    getEstudioss(){
      this.rService2.getEstudioss().subscribe(res =>{
        this.estudioss = res
      })
    }
  
    //Eliminar estudios
    eliminarEstudios(idEstudios: String){
      this.rService2.eliminarEstudios(idEstudios).subscribe(res =>{
        this.getEstudioss()
      })
    }
    //Crear estudioss
    crearEstudios(){
      if(this.formularioEstudios.valid){
        let estudios= new Estudios()
        estudios.nivelEducacion = this.formularioEstudios.get("nivelEducacion")?.value
        estudios.carrera = this.formularioEstudios.get("carrera")?.value
        estudios.universidad = this.formularioEstudios.get("universidad")?.value
        this.rService2.crearEstudios(estudios).subscribe(res => {
          this.getEstudioss()
          this.formularioEstudios.reset()
          this.dataLoaded5 = true;
          this.isMenuOpen5 = !this.isMenuOpen5;
        })
      }
    }

    
  activador2(estudios: Estudios){
    this.formularioEstudios.get("nivelEducacion")?.setValue(estudios.nivelEducacion)
    this.formularioEstudios.get("carrera")?.setValue(estudios.carrera)
    this.formularioEstudios.get("universidad")?.setValue(estudios.universidad)
    this.display4 = !this.display4
  }
  
  //Actualizar
  actualizarEstudios(){
    if(this.formularioEstudios.valid){
      let estudios= new Estudios()
      estudios.nivelEducacion = this.formularioEstudios.get("nivelEducacion")?.value
      estudios.carrera = this.formularioEstudios.get("carrera")?.value
      estudios.universidad = this.formularioEstudios.get("universidad")?.value
      this.rService2.actualizarEstudios(estudios).subscribe(res => {
        this.getEstudioss()
        this.formularioEstudios.reset()
        this.display4 = !this.display4
      })
    }
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
      this.dataLoaded3= false;
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
        this.dataLoaded3 = true;
        this.isMenuOpen3 = !this.isMenuOpen3;
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleMenu2(): void {
    this.isMenuOpen2 = !this.isMenuOpen2;
  }
  toggleMenu3(): void {
    this.isMenuOpen3 = !this.isMenuOpen3;
  }
  toggleMenu4(): void {
    this.isMenuOpen4 = !this.isMenuOpen4;
  }
  toggleMenu5(): void {
    this.isMenuOpen5 = !this.isMenuOpen5;
  }
  toggleMenu6(): void {
    this.isMenuOpen6 = !this.isMenuOpen6;
  }
  /*activador1(){
    this.display = !this.display
    //this.dataLoaded = true;
  }*/

  imageURL: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;

  onFileChange(event: Event): void {
    const inputElement = this.fileInput.nativeElement as HTMLInputElement;
  
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // Renderizar la imagen cargada.
        if (e.target && e.target.result) {
          this.imageURL = e.target.result as string;
        }
      };
  
      // Leer el archivo de imagen como una URL de datos.
      reader.readAsDataURL(file);
    }
  }
  
}