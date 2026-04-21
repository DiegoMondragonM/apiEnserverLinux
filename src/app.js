const express=require('express');
const cors   =require('cors');
require('dotenv').config();

const productosRouter=require('./routes/productos.router');
const errorHandler=require('./middlewares/errorHandler');

const app=express();
const PORT=process.env.PORT||3000;

app.use(cors());
app.use(express.json());

//ruta de salud para ver si el servidor esta encendido

app.get('/health', (req,res)=>
{
  res.json({ok:'true',mensaje:'API corriendo correctamente'});
});
app.use('/productos', productosRouter);

app.use((req,res)=>
{
  res.status(404).json({ok:false, mensaje:'ruta no encontrada'});
});

app.use(errorHandler);
app.listen(PORT,'0.0.0.0',()=>
{
  console.log(`servidor corriendo em http://0.0.0.0:${PORT}`)
});