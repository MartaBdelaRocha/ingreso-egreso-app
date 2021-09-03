import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:AngularFirestore,
              private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    //necesitamos un objeto del tipo firestore para insertar en la base de datos de firestore (recordar que 
    //los datos de acceso a FireStore se almacenan en environment.ts)
    //El método crearIngresoEgreso va a recibir un objeto de tipo IngresoEgreso
    //Para obtener el uid que hace falta en la siguiente línea, creamos en AuthService una variable usuario
    //El usuario que se obtenga en AuthService se igualará a esa variable para que lo contenga
    //La variable será privada para no poder acceder a ella desde fuera, por lo que se creará el getter para sí
    //obtener los datos
    //Tras crear el getter, hay que obtener el servicio en el constructor para poder acceder al método
   

    const uid = this.authService.user.uid;

    delete ingresoEgreso.uid;



    return this.firestore.doc(`${this.authService.user.uid}/ingreso-egresos`)
    .collection(`items`) //Hay que crear la colección
    .add({...ingresoEgreso}) //Mandamos las propiedades a través de {}, no se manda la instancia en sí

    // .then( (ref) => console.log('Éxito!', ref)) --> hasta add se trata de una promesa que devuelve una referencia del documento
    //.catch( err => console.warn(err)); --> Capturamos también el posible error

    //Tras confirmar que funciona hemos comentado el then y el catch y añadido return 
  }


  initIngresoEgresoListener(uid: string){


    return this.firestore.collection(`${uid}/ingreso-egresos/items`)
    .snapshotChanges()
    .pipe(
    
      //El bloque dentro del pipe se puede hacer más pequeño, ver líneas comentadas más abajo
      map(snapshot => {
        //console.log("El uid para buscar los items:",uid);
        return snapshot.map( doc => {
          //console.log(doc.payload.doc.data()); //Esto es lo que hay que obtener
          return{
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any  //hacemos la desestructuración de la función y para que no dé error por el tipo de dato le ponemos as any
          }
        })
      })
    );
      //Comentamos el subscribe porque era para fines de prueba y ahora añadimos return al principio, en this.firestore, 
      //para que la colección que antes imprimíamos por consola ahora la devuelva a quien llame a este método
      // .subscribe( items => {
      //   console.log(items)
      // })
  }
  
//Bloque del pipe más pequeño:

// map(snapshot => snapshot.map( doc => ({
//       uid: doc.payload.doc.id,
//       ...doc.payload.doc.data() as any  
//     })
//   )
// )


  borrarItem(uidItem:string){

    const uid = this.authService.user.uid;

    return this.firestore.doc(`${uid}/ingreso-egresos/items/${uidItem}`).delete();
  }
}


