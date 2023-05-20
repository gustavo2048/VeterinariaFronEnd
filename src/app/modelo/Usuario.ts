export class Usuario{
    nombre!: string 
    apellido!: string 
    telefono!: number
    dni!: number
    email!: string 
    id!:number
    password!: string
    rol!: string
    FechaSolic!: Date
    fechaAsig!: Date
    verificado!: boolean
    borrar: boolean = false
    turnoElegido!: string
    constructor(){   }

   
}