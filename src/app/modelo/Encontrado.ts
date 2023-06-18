import { Mascota } from "./Mascota";
import { Usuario } from "./Usuario";

export class Encontrado{
    fechaEncontrado!: Date;
    lugar!: string;
    descripcion!: string;
    id!: number;
    genero!: string;
    duenio:boolean=false;
    usuarioId!: number;
    mascotaId!: number;
    mascota!:Mascota;
    usuario!:Usuario;
    sexo!:String
    tam!:String;
    color!:String;
    constructor(){
        
    }
}