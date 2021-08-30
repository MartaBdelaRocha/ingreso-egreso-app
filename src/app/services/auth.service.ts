import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!:Subscription;

  constructor(public auth:AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }


  initAuthListener(){
    this.auth.authState.subscribe (fuser =>{
      console.log(fuser);

      if(fuser){

        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe(firestoreUser =>{

            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(setUser({user}));
          })
      }
      else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(unsetUser());
      }
      
    })
  }


//Inicialmente creamos este método y hacemos un simple console.log para ver que recibimos de register.component.ts (vir para ver explicación)
//Tras hacer las pruebas, importamos AngularFireAuth y lo inyectamos en el constructor
crearUsuario(nombre:string, email:string, password:string){

    //console.log(nombre,email,password);
    //Tras inyectar AngularFireAuth, de todos sus métodos nos interesa el siguiente:
    return this.auth.createUserWithEmailAndPassword(email,password)
    //Este método devuelve una promesa, que podríamos gestionar aquí en vez de poner return
    //Pero poniendo return se la mandamos a quien llame a este método (register.component) para que gestione él la promesa
    .then(({user}) =>{
      const newUser = new Usuario (user!.uid, nombre, email);
      return this.firestore.doc(`${user?.uid}/usuario`)
          .set({...newUser})
          
    })
    
  }

  loginUsuario(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    //return this.auth.authState; --> Devuelve un observable con los datos del usuario 
    //Le aplicamos un pipe para mutarlo con el operador map de rxjs (hay que importarlo)
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null) //devolverá true o false en función de si fbUser existe
    );
  }
}
