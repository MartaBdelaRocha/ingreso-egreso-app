import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm!: FormGroup;
  tipo:string = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private fb:FormBuilder, 
    private crearIngresoEgresoService:IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);

    this.ingresoForm = this.fb.group({
      descripcion: ['',Validators.required],
      monto:['', Validators.required]
    })
  }

  guardar(){
//Puesto así inicialmente para probar si funcionaba
    // this.store.dispatch(isLoading());

    // setTimeout(() =>{

    //   this.store.dispatch(stopLoading());
    // }, 2500);

    // return;
    
    if(this.ingresoForm.invalid){return;}

    this.store.dispatch(isLoading());
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    console.log(ingresoEgreso);
    this.crearIngresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.ingresoForm.reset();
      this.store.dispatch(stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch( err => {
      Swal.fire('Error', err.message, 'error')
      this.store.dispatch(stopLoading());
  });

  }

}
