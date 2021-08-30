import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,
              private router:Router){}

  canActivate(): Observable<boolean> { //Cambiamos el tipo de dato devuelto, el método isAuth devuelve un observable que resuelve un boleano
    return this.auth.isAuth() //Si este guard devuelve true es que puede acceder en app-routing a DashBoard
          .pipe(
            tap(estado => {    //Con este pipe tap creamos un efecto secundario por el cual si el guard devuelve false lleva al usuario a la ruta especificada
              if(!estado){this.router.navigate(['/login'])}
            })
          );
  }
  
}
