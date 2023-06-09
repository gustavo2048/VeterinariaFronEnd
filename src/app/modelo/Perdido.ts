import { Mascota } from "./Mascota";
import { Usuario } from "./Usuario";

export class Perdido{
    fechaPerdido!: Date;
    lugar!: string;
    descripcion!: string;
    id!: number;
    genero!: string;
    encontrado:boolean=false;
    usuarioId!: number;
    mascotaId!: number;
    mascota!:Mascota;
    usuario!:Usuario;
    constructor(){
        
    }
}