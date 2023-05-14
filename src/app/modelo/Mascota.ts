export class Mascota {
    borrado: boolean;
    caracteristicas: string;
    edad: string;
    foto: string;
    id: number;
    nombre: string;
    raza: string;
    tamanio: string;

    constructor(borrado: boolean,caracteristicas: string, edad: string,foto: string, id: number,nombre: string, raza: string,tamanio: string)
    {
        this.borrado = borrado;
        this.caracteristicas = caracteristicas;
        this.edad = edad;
        this.foto = foto;
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.tamanio = tamanio;

    }
}