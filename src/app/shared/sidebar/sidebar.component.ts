import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre:string = '';
  userSubs: Subscription;


  constructor(private auth:AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit(): void {

   this.userSubs = this.store.select('usuario')
      .subscribe(({user}) => {
        //console.log("Lo que recibe el sidebar",user);
        this.usuarioActivo(user)});

    // this.userSubs = this.store.select('usuario')
    //   .pipe(
    //     filter(
    //       ({user}) => user !=null
    //     )
    //   )
    //   .subscribe(
    //     ({ user }) => this.nombre = user.nombre
    //   )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }



  logout(){
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

  usuarioActivo(user: Usuario){

    //Hemos tenido que poner user?.nombre para evitar la excepción de que en un primer
    //momento inmediato user es null, entonces al poner ? no salta la excepción por ser null
    //y al estar suscritos en seguida se recarga con el valor que obtiene, y poder así visualizarlo
    //La otra opción es poner el pipe para que solo se realice el subscribe
    //cuando user es distinto de null, como está comentado en el ngOnInit
    this.nombre = user?.nombre;

  }

}
