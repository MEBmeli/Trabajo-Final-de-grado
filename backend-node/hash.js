// backend-node/hash.js
import bcrypt from "bcrypt";

const run = async () => {
  const password = "admin123"; // contraseña
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash generado para admin123:");
  console.log(hash);
};

run();
