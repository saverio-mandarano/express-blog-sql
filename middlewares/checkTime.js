function checkTime(req, res, next) {
  const oggi = new Date();
  const currentTime = oggi.toLocaleString();

  console.log("sei passato da quì alle:", currentTime);

  next();
}

module.exports = checkTime;
