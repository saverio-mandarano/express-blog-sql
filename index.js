const express = require("express");
const app = express();
const port = 3000;

// import del middleware checkTime
// const checkTime = require("./middlewares/checkTime.js");

//import del middleware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");

//import del middleware di gestione rotta inesistente
const notFound = require("./middlewares/notFound");

const postsRouter = require("./routers/posts");

//attivazione della cartella public per uso file statici
app.use(express.static("public"));

// registro il body-parser per "application/json"
app.use(express.json());

// Registrazione globale del middleware checkTime
// app.use(checkTime);

// rotta home APP
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Registrazione per path del middleware checkTime (Vale sia per la rotta che per tutte le rotte figlie di quel path)
// app.use("/posts", checkTime);
// collego le rotte definite in postsRouter alla path "/posts"
app.use("/posts", postsRouter);

//Registrazione globale middleware di gestione errore 500
app.use(errorsHandler);

//Registrazione globale middleware di gestione rotta inesistente
app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
