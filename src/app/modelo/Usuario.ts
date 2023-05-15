export class Usuario{
    nombre: string = "Marcos"
    apellido: string = "Apellido"
    telefono: string = "231231"
    dni: string = "31313131"
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