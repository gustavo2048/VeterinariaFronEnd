import { Mascota } from "./Mascota";

export class Adopcion {
    borrado: boolean = false;
    adoptado: boolean = false;
    titulo!: string;
    descripcion!: string;
    motivo!: string;
    raza!: string;
    sexo!: string;
    tamanio!: string;
    fechaCreacion!: Date;
    usuarioId!: number;
    mascotaId!: number;
    mascota!: Mascota;



    constructor() { }


}