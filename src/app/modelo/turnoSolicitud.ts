export class TurnoSolicitud {
    // ! expresa que no esta definido aun el valor inicial

    id!: number
    borrado!: Boolean
    horarioTentativo!: string
    motivo!: string
    estadoSolicitud!: string
    fechaCreado!: Date
    fechaAsignada!: Date
    idMascota!: number 
    idUsuarioSolicitante!: number
}