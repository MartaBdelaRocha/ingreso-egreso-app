import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registroForm!: FormGroup;
  //Creamos la variable de tipo formGroup y metemos en el constructor el formBuilder. 
  //En init le decimos al Formbuilder que nos encapsule un grupo de variables dentro de la variable de tipo FormGroup llamada registroForm
  //En el html en la etiqueta que inicia todos los campos de formulario ponemos [formGroup]="registroForm" <-- siendo esto el nombre que le pusimos a la variable FormGroup en el ts
  //También en esa misma etiqueta le decimos que cuando presionemos el boton de tipo submit active el método crearUsuario() --> (ngSubmit)="crearUsuario()"
  //Por ello el botón "Crear cuenta" tiene que tener la propiedad type="submit"
  //A cada etiqueta input del formulario en el html le tengo que asociarlo a su variable del FormGroup --> formControlName="nombre"

  //También deshabilitamos el botón de Crear cuenta mientras registroForm no sea válido (es decir, se cumplan sus validators) --> [disabled]="registroForm.invalid" 

  // <i *ngIf="registroForm.get('password')?.valid" class="fa fa-check-circle"></i> Hemos puesto un ngIf para que nos ponga este símbolo cuando cada campo sea válido
  //He tenido que poner ? después del get de las variables porque sino no compila diciendo que el objeto quizás sea nulo

  cargando: boolean = false;
  uiSubscription!: Subscription;


  constructor(private fb: FormBuilder, 
              private authService:AuthService,
              private router:Router,
              private store:Store<AppState>) { }
 
  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    })

    this.uiSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading
      console.log('cargando subs');
    })
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){

    //Estos console.log los comentamos ahora
    // console.log(this.registroForm);
    // console.log(this.registroForm.valid);
    // console.log(this.registroForm.value);
    
    if(this.registroForm.invalid){return;}
    //Como en el método del authService hemos puesto que recibe parámetros directamente y no el objeto
    //Realizamos aquí la desestructuración para enviar esos valores al llamar al método
    //OJO! inyectar servicio en el constructor
    
    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()}     
    // })


    const {nombre,correo,password} = this.registroForm.value;
  
    this.authService.crearUsuario(nombre,correo,password)
    .then(credenciales => {
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    })
    //.catch(err=> console.error(err)) 

    //Como en crearUsuario lo hemos gestionado de forma que al llamar a ese método se gestione aquí la promesa, ponemos el then
    //Probamos ahora a crear un usuario en la app y ver en nuestro firebase cómo lo ha agregado
    //Si intentamos crear de nuevo un usuario con los mismos datos, Firebase dispará un error en la consola
    //Importamos el router y lo inyectamos en el constructor para que tras la correcta creación de usuario redireccione al dashboard
    //la llamada al router se hace en el then de la promise, que es quien recibe los datos en caso de que todo vaya bien
    .catch(err=> {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    }) 
    
  
  
  
  }

}
