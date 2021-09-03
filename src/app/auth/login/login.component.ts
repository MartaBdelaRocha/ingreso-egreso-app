import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store:Store<AppState>) { }
 

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading
      
    })

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  loginUsuario() {


    if (this.loginForm.invalid) { return; }

    this.store.dispatch(isLoading());

 
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()}     
    // })
//Esto sacará la ventana emergente de cargando... que se eliminará automáticamente en caso de error en el login
//Se eliminará porque automáticamente salta el otro swal de error
//Pero en caso de credenciales correctas habría que cerrarlo

    const { email, password } = this.loginForm.value;
    
    this.authService.loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();

        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      //.catch(err => console.error(err))
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
