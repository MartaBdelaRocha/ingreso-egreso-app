import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


//Para que los formularios y los enlaces mediante RouterLink funcionen, tengo que importar aquí el ReactiveForms y el Router módulos


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
