// backend-node/hash.cjs
const bcrypt = require("bcrypt");

(async () => {
  const password = "admin123"; // esta va a ser la contraseña del admin
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash generado para admin123:");
  console.log(hash);
})();
