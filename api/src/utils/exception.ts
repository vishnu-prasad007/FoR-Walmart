export class CodeBrewingApiException extends Error {
    HttpStatusCode: number;

    constructor(message, HttpStatusCode:number) {
        super(message);
        this.name = "CodeBrewingApiException";
        this.HttpStatusCode = HttpStatusCode;
    }
}   