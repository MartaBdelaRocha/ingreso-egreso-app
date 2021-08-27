//Módulo dedicado al uso de las rutas para que app.module quede reducido con lo justo

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DahsboardComponent } from "./dahsboard/dahsboard.component";
import { dashboardRoutes } from "./dahsboard/dashboard.routes";


const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', component: DahsboardComponent, children: dashboardRoutes},
    { path: '**', redirectTo: ''}
];


@NgModule({

imports:[
    RouterModule.forRoot(routes)
],
exports:[
    RouterModule
]

})
export class AppRoutingModule{}
