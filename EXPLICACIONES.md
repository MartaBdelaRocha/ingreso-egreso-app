FIREBASE   https://github.com/angular/angularfire 

Crear un proyecto, dentro del proyecto  habilitar el modo de autenticación que usaremos, en este caso correo-pass.
A partir de aquí se siguen estos pasos: https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
Instalar firebase en el proyecto ng add @angular/fire, pedirá loguearse en la cuenta de google para enlazar y después pedirá seleccionar proyecto dentro de los que tenemos en nuestra
cuenta de firebase.

Tras el paso de copiar los datos de environments.ts hay que poner en esos environments nuestros datos, para ello vamos a ajustes de la app en firebase (Project settings)
En la zona Tus Apps le vamos a </> para registrar una app, le ponemos un nombre y le damos a registrar. Nos genera las variables que hay que poner en environment.ts, el objeto entero de environment.ts lo ponemos tal cual en environment.prod.ts, pero cambiando production: true

Seguimos con los pasos de instalación (Paso 4): import AngularFireModule
Del paso 5 importamos solo el FirestoreModule, Analytics no lo usaremos


El resto de pasos los haremos más tarde, ahora continuamos con el tema autenticación de usuarios: https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
Con el objetivo de importar el módulo import { AngularFireAuthModule } from '@angular/fire/compat/auth';  (en el enlace habla del servicio y no del módulo que realmente hay que importar)
Probando ng serve me dio un error:
Error: node_modules/@firebase/app-compat/dist/src/firebaseApp.d.ts:19:10 - error TS2305: Module '"@firebase/app"' has no exported member '_FirebaseAppInternal'.

19 import { _FirebaseAppInternal as _FirebaseAppExp } from '@firebase/app';

A través de https://github.com/angular/angularfire/issues/2901 puse en el tsconfig.json --> "skipLibCheck": true y ya pude compilar correctamente

Ahora generamos un servicio para poder crear un usuario ng g s services/auth

Implementamos el loguearse (recuperar datos de firebase)

Creación de mensajes de alerta en caso de error y de "Cargando" tanto en el registro como en el login

Para obtener info del usuario activo creamos en auth.service el initAuthListener que implementamos en el app.component para asegurarnos que se llama a la función independientemente de por donde pase (no siempre se pasará por registro o por login o por dashboard)

Ahora vamos con los Guards para proteger rutas: creamos el guard con el ng g guard nombre, seleccionamos canActivate, en el Guard creado simplificamos el método canActivate e implementamos el Guard en el app-routing.module, en concreto en el acceso al DashBoard.

El guard tiene que estar basado en la autenticación, Firebase tiene varias opciones para ello, para ello vamos a auth.service.ts


Documento de base de datos por cada usuario:
Creamos el modelo usuario