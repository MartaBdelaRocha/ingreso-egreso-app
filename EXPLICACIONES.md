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
Creamos el modelo usuario para poder mandar el usuario a la base de datos de Firebase, todo eso lo realizamos en auth.service.ts





//Sección 8

Crearemos una sección en el store para el estado de la app (si está cargando, si hay algo en el background, etc)
Utilizaremos unos snippets (a través de un shortcode se autocompleta todo) para evitar tener que hacer copy paste en la página NgRx de la creación básica de actions y reducers
Creamos ui.actions.ts y ui.reducer.ts

Creamos ahora el reducer global de la app (app.reducer.ts)
Ahora editamos lo necesario en app.module.ts tanto de storeModule como DevTools (hacer instalación)

Hacemos los dispatch tanto en login como en registro: poniendo en OnInit la subscripción a la store, haciendo el dispatch en los momentos en los que el estado cambia (al darle click a login o a registrar y al recibir el then tanto en el login como en el registro)
En el onDestroy hay que hacer unsubscribe, para ello creamos una constante de tipo subscribe donde almacenaremos la suscripción a la store para poder llamar al método unsubscribe en el onDestroy


CAMBIANDO EL SWAL.FIRE DE CARGANDO
Vamos a poner un mensaje menos intrusivo, por lo que dejaremos lo de SWAL comentado y pondremos en el html de login y de registro dos botones: el de login/crear cuenta nueva lo mantendremos y ahora añadimos un botón que diga "Espere..." 
A través de un ngIf mostraremos un botón u otro en función de si la propiedad cargando del .ts (asociada a su vez al estado de la app) está en true o false



AÑADIR INFO AL STATE: INFO DEL USUARIO

Creamos auth.actions.ts y auth.reducer.ts


<!-- Sección 9 -->

Creamos el modelo ingreso-egreso
Creamos el servicio ingreso-egreso para insertar los datos en firestore


<!-- SECCIÓN 10 -->

Tal y como dejamos el código al terminar la sección 9, al iniciar la app en la página login carga también el módulo ingresos egresos, pero no nos interesa que se cargue
antes de estar logueados, así la app será más ligera, cargará más rápido, para ello modularizaremos la app.
Separaremos primero el Auth como un módulo aparte, crearemos el módulo Auth
Creamos también el SharedModule y el ingresoEgreso Module

Tras crear ingresoEgreso Module, aparentemente todo funciona, pero no carga los componentes de estdistica ni detalle ni ninguna ruta interna de dashboard routes
Hay que cambiar por lo tanto la forma de especificarle a Angular las rutas hijas ahora que está todo repartido en módulos. 
Primero comentamos parte de las Routes del app-routing module y después creamos en el dashboad un módulo donde pondremos solo las rutas

Creamos después el Lazy Load en app-routing module. Pero hasta este punto, cualquiera podría entrar en la app sin estar loggeado tan solo poniendo la url, por ello hay que crear la prevención, lo que antes era el Guard canActivate, que trasladamos comentado a dashboard-routes module, ahora hay que crear un Guard que evite que cargue el módulo ingreso-egreso si el usuario no está autenticado, por lo que hay que ponerlo en app-routing module.
Se podría colocar el canActive: [AuthGuard] en el lazy Load justo antes de loadChildren porque efectivamente previene de entrar, sin embargo aunque no se consigue entrar sin estar loggeado, sí que carga el módulo en memoria, para ello en vez de canActivate utilizaremos canLoad, implementando también el método canLoad en el auth.Guard.ts

LAZY LOAD a los elementos de la store

En el login ya se cargan los elementos de la store por lo que un usuario sin autenticar puede ver qué cosas forman parte de la app, pero no nos interesa que elementos de usuarios autenticados (ingreso egreso) pueda verlos alguien que no está autenticado. 
Para ello borramos el reducer de ingreso-egreso del app-reducer y en el ingreso-egreso.module hacemos un import de la store donde le decimos que cargue el reducer ingresoEgreso
Hay que hacer también un extends de AppSate dentro del ingreso-egreso reducer, y ese nuevo AppState es el tipo que va a tener aquellos componentes que usen el elemento ingresoEgreso de la store (en este caso estadística y detalle)