import { Mascota } from "./Mascota";

export class Perdido{
    fechaPerdido!: Date;
    lugar!: string;
    descripcion!: string;
    id!: number;
    genero!: string;
    encontrado:boolean=false;
    usuarioId!: number;
    mascota!: number;
    masco!:Mascota;
    constructor(){
        
    }
}