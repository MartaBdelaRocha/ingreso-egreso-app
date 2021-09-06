import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { appStateWithIngresoEgreso } from '../ingreso-egreso.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {


  ingresos:number = 0;
  egresos:number = 0;
  totalIngresos:number = 0;
  totalEgresos:number = 0;

  public doughnutChartLabels: Label[] = ['Egreso', 'Ingreso'];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#FF0000','#00A300']
   }];

  constructor(private store: Store<appStateWithIngresoEgreso>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.generarEstadistica(items))
  }

  generarEstadistica(items: IngresoEgreso[]){

    //Si no ponemos esto, los valores totales se irán incrementando ya que cada vez
    //variemos la info de Firebase, al no resetearse todo, se van acumulando

    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    //console.log(items);
    for (const item of items){
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }else{
        {
          this.totalEgresos += item.monto;
          this.egresos ++;
        }
      }
    }
    this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];

  }

}
