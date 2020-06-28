export class Post {
    constructor(
        private id: string,
        private name: string, 
        private email: string,
        private password: string,
    ){}

    static mapStringToPostType(value: string): PostType{
        switch(value){
            case "Normal":
                return PostType.NORMAL;
            case "Evento":
                return PostType.EVENTO;            
            default:
                return PostType.NORMAL;
        }
    }
}

export enum PostType {
    NORMAL = "Normal",
    EVENTO = "Evento",
}





