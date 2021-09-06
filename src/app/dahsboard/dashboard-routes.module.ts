import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DahsboardComponent } from './dahsboard.component';
import { dashboardRoutes } from './dashboard.routes';


const rutasHijas: Routes = [
  {
    path: '', component: DahsboardComponent,
    children: dashboardRoutes,
    //canActivate: [AuthGuard]
    //Este Guard tal y como estructuramos ahora la app, no serviría usar canActivate
    //Lo que queremos es que no solo no active las rutas si el usuario no está autenticado
    //sino que no cargue el módulo 
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
