export class LoginUser {
    nombreUser: string;
    password: string
    
    constructor(nombreUser: string, password: string) {
        this.nombreUser = nombreUser;
        this.password = password;
    }
}
