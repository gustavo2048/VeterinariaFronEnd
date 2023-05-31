import { Mascota } from "./Mascota"
import { Usuario } from "./Usuario"

export class TurnoSolicitud {
    // ! expresa que no esta definido aun el valor inicial

    id!: number
    borrado!: Boolean
    horarioTentativo!: string
    motivo!: string
    estadoSolicitud!: string
    fechaSolicitada!: Date
    fechaCreado!: Date
    fechaAsignada!: Date
    idMascota!: number
    idUsuarioSolicitante!: number

    //Agregado para traer en el turno
    mascota!: Mascota
    usuario!: Usuario
}