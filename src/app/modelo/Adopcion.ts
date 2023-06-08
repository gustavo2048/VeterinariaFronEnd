import { Mascota } from "./Mascota";

export class Adopcion{
    borrado: boolean = false;
    adoptado: boolean = false;
    mascotaId!:number;
    titulo!: string;
    descripcion!: string;
    motivo!: string;
    raza!: string;
    sexo!: string;
    tamanio!: string;
    fechaCreacion!: Date;
    usuarioId!: number;
mascota!:Mascota;
    constructor(){}


}