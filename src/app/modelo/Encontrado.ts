import { Mascota } from "./Mascota";

export class Encontrado{
    fechaEncontrado!: Date;
    lugar!: string;
    descripcion!: string;
    id!: number;
    genero!: string;
    duenio:boolean=false;
    usuarioId!: number;
    mascota!: number;
    masco!:Mascota;
    color!:string;
    tamanio!:string;
    raza!:string;
    constructor(){
        
    }
}