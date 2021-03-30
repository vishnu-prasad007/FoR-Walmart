"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBrewingApiException = void 0;
class CodeBrewingApiException extends Error {
    constructor(message, HttpStatusCode) {
        super(message);
        this.name = "CodeBrewingApiException";
        this.HttpStatusCode = HttpStatusCode;
    }
}
exports.CodeBrewingApiException = CodeBrewingApiException;
