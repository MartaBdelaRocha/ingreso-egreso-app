import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items:IngresoEgreso[]): IngresoEgreso[] {
    
    //el array, que es parte del estado de la app lo está manejando una version más nueva de ngrx y es inmutable, con slice() creaste una copia y se quita el error.

    return items.slice().sort((a, b)=>{
      
      if(a.tipo === 'ingreso'){
        return -1;
      }else{
        return 1;
      }

    });
  }

}
