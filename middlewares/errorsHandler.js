function errorsHandler(err, req, res, next) {
  //forzo lo stato per convenzione, il server ha avuto un problema interno durante l'elaborazione
  res.status(500);
  //info per arricchiare messaggio di errore
  res.json({
    error: err.message,
  });
}
module.exports = errorsHandler;
