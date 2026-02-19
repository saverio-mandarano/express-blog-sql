// import Express
const express = require("express");
// creo variabile router il cui valore sarà un'istanza di express.Router()
const router = express.Router();

// import del middleware checkTime
// const checkTime = require("../middlewares/checkTime.js");

//Registro il middleware per router (vale per tutte le rotte di questo router)
// router.use(checkTime);

//import funzioni del postsController
const postsController = require("../controllers/postsController");
//destrutturazione funzioni dall'oggetto postsController:
const { index, show, store, update, modify, destroy } = postsController;

// index: lista dei post
router.get("/", index);

// show: dettagli singolo post
router.get("/:id", show);
// Registrazione middleware per singola rotta
// router.get("/:id", checkTime, show);

// store: creazione nuovo post
router.post("/", store);

// update: modifica integrale del post
router.put("/:id", update);

// modify: modifica parziale del post
router.patch("/:id", modify);

// destroy: cancellazione del post
router.delete("/:id", destroy);
// Registrazione middleware per singola rotta
// router.delete("/:id", checkTime, destroy);

// esporto l'istanza di router
module.exports = router;
