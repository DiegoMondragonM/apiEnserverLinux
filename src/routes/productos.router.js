const router=require('express').Router();
const{
    listarProductos,
    obtenerProducto,
    crearProducto,
    editarProducto,
    eliminarProducto,
}=require('../controllers/productos.controller');

router.get('/',listarProductos);
router.get('/:id',obtenerProducto);
router.get('/',crearProducto);
router.get('/:id',editarProducto);
router.get('/:id',eliminarProducto);

module.exports=router;