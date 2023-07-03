import { Mascota } from "./Mascota"
import { Vacuna } from "./Vacuna"

export class HistoriaClinica {
    
    id!: number
    borrado!: boolean
    motivo!: string
    fecha!: string
    observacion!: string
    monto!: number
    peso!: number // Aclarar que sea en Kilogramos
    vacunas!: Vacuna[]
    
    mascota!: Mascota




}