import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

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


  canLoad(): Observable<boolean> {
    
    return this.auth.isAuth() 
    .pipe(
      tap(estado => {    
        if(!estado){this.router.navigate(['/login'])}
      }),
      take(1)
    );
  }
  

  
}
