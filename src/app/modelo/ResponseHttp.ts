export class ResponseHttp {
    //Clase para recibir respuestas variadas. Agregar atributos de ser necesario
    //Del lado del back no se necesario clase. Ejem: Map.of("url",url, "imagen", path) se envia un JSON con el atributo URL y PATH


    url: string
    path: string

    constructor(){
        this.url = ""
        this.path = ""
    }
}