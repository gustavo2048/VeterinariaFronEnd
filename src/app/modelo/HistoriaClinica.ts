import { Mascota } from "./Mascota"
import { Vacuna } from "./Vacuna"

export class HistoriaClinica {
    
    id!: number
    borrado!: boolean
    motivo!: string
    fechaCreacion!: Date
    observacion!: string
    monto!: number
    peso!: number // Aclarar que sea en Kilogramos
    idTurno!: number
    idMascota!:number
    vacuna!: Vacuna
    descuentoAplicado!:boolean
    idUsuario!: number
    mascota!: Mascota

    EnviarSolicit: boolean


}