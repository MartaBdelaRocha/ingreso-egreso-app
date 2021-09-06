import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

//Módulos creados
import { AppRoutingModule } from './app-routing.module';

//Forms
import { ReactiveFormsModule } from '@angular/forms';

//Charts
import { ChartsModule } from 'ng2-charts';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Componentes
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

//Módulos
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    //IngresoEgresoModule, Quitamos este módulo de aquí para poder hacer el LazyLoad en el app-routing
    AppRoutingModule,
    //ReactiveFormsModule, necesario en Auth e IngresoEgreso, por lo que lo importamos en ambos módulos y borramos aquí
    //ChartsModule, Lo movemos a quien lo usa (dashboard, por lo que pasa a ingreoEgreso Module)
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:environment.production
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
