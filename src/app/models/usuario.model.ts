export class Usuario{

    static fromFirebase( Objeto: any){ 

        return new Usuario(Objeto.uid,Objeto.nombre,Objeto.email);
    }
    
    constructor(
        public uid:string,
        public nombre:string,
        public email:string
    ){}


}