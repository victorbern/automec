require("dotenv").config({ path: "variaveis.env" });
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let dados = require("./database");
// dados.inserirDados();
const app = express();

const routes = require("./api/routes/routes");
const AppError = require("./api/errors/AppError");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);
app.get("/", (req, res) => res.send("Aplicação Rodando!"));

app.use((error, req, res, next) => {
    if (error && error.statusCode) {
        console.log(error.message);
        return res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }

    console.log(error);

    return res.status(500).json({
        status: "Error",
        message: "Internal server error",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
