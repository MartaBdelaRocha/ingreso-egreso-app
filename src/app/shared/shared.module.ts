import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



//Este módulo es diferente con el AuthModule en que estos tres componentes se van a usar dentro de otro componente (Dashboard), por lo que 
//No solo hay que importar este módulo en el app module, sino que hay que exportar aquí los tres componentes
//También hay que impotar el RouterModule para los enlaces del sidebar

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
