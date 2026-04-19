
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/productos', require('./routes/productos.router.js'));



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});