import { createReducer, on, Action } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unsetUser } from './auth.actions';

export interface State {
    user:Usuario | null;
}

export const initialState: State = {
   user:null
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user:{...user}})),
    on(unsetUser, (state) => ({ ...state, user:null}))

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}