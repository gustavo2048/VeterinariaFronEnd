export class Usuario {
    // ! expresa que no esta definido aun el valor inicial


    nombre!: string
    id!:number
    apellido!: string
    email: string = ""
    password!: string
    rol!: string
    FechaSolic!: Date
    fechaAsig!: Date
    verificado: boolean = false
    borrar: boolean = false
    turnoElegido!: string




}