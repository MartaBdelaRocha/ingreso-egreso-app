import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { appStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresosEgresos:IngresoEgreso[]=[];
  ingresosEgresosSubs: Subscription;

  constructor(private store:Store<appStateWithIngresoEgreso>,
              private ingresoEgresoService: IngresoEgresoService) { }
 

  ngOnInit(): void {

    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({items}) =>{

      this.ingresosEgresos = items;
      //console.log(items);
    })
  }

  borrar(uid:string){
    //console.log(uid);


    //borrarItem es un método que creamos nosotros en ingresoEgresoService, el cual hace un return de la promesa del método delete() de Firebase
    //la promesa devuelve un void en caso de éxito, lo gestionamos así: 

    this.ingresoEgresoService.borrarItem(uid)
    .then (() => Swal.fire('Borrado', 'Item borrado','success'))
    .catch(err => Swal.fire('Error', err.message, 'error'))

  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }

}
