import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
        '[Auth] setUser',
        props<{user:Usuario}>()
);

export const unsetUser = createAction(
        '[Auth] UnsetUser' //No hacen falta argumentos porque simplemente vamos a quitar al usuario activo
);