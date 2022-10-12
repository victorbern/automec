module.exports = class ValorNuloError extends Error {
    static message = "";
    static nomeVariavel = "";
    static statusCode = 400;

    constructor(message, nomeVariavel, statusCode) {
        super(message);
        this.nomeVariavel = nomeVariavel;
        this.statusCode = statusCode;
    }
};
