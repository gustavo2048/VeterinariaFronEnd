export class Usuario{
    nombre: string = "Marcos"
    apellido: string = "Apellido"
    telefono!: number 
    dni!: number 
    email: string = "ejemplo@asd.com"
    id!:number
    password!: string
    rol!: string
    FechaSolic!: Date
    fechaAsig!: Date
    verificado: boolean = false
    borrar: boolean = false
    turnoElegido!: string
    constructor(){   }
}