//Módulo dedicado al uso de las rutas para que app.module quede reducido con lo justo

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DahsboardComponent } from "./dahsboard/dahsboard.component";
import { dashboardRoutes } from "./dahsboard/dashboard.routes";
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    //Esto lo trasladamos a dashboard-routes.module
    // { path: '', component: DahsboardComponent, 
    //             children: dashboardRoutes, 
    //             canActivate:[AuthGuard]},

    //Aquí realizamos el LazyLoad
    {
        path:'',
        //canAvtivate: [AuthGuard]
        canLoad: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then( modulo => modulo.IngresoEgresoModule)
    },

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
