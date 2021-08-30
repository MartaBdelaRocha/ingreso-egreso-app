import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }
  loginUsuario() {


    if (this.loginForm.invalid) { return; }

 
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()}     
    })
//Esto sacará la ventana emergente de cargando... que se eliminará automáticamente en caso de error en el login
//Se eliminará porque automáticamente salta el otro swal de error
//Pero en caso de credenciales correctas habría que cerrarlo

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      //.catch(err => console.error(err))
      .catch(err=> {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      }) 
  }

}
