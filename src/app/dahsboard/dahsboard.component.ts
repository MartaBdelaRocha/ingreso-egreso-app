import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(private store:Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }
  
  

  ngOnInit(): void {
    
    this.ingresosEgresosSubs = this.userSubs = this.store.select('usuario')
    .pipe(
    
      filter(auth => auth.user != null)
    )
    .subscribe( user => {
      
      //Esta línea devuelve un observable, por lo que para ver los items hay que suscribirse 
      //Ahora que hemos puesto initIngresoEgresoListener como un return
      this.ingresoEgresoService.initIngresoEgresoListener(user.user.uid)
        .subscribe(ingresosEgresos =>{
          //console.log(ingresosEgresos)

          this.store.dispatch(setItems({items:ingresosEgresos}))
        }) 
    });
  }

  
  ngOnDestroy(): void {

    //Con ? le decimos que ejecute el unsubscribe solo si existen esas variables

    this.userSubs?.unsubscribe();
    this.ingresosEgresosSubs?.unsubscribe();
  }

}
