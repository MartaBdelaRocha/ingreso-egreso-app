import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombre:string = '';
  userSubs: Subscription;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('usuario')
      .subscribe(({user}) => {
        console.log("Lo que recibe el sidebar",user);
        this.usuarioActivo(user)});
  }
  usuarioActivo(user: Usuario){
    
    this.nombre = user?.nombre;
  }
}
