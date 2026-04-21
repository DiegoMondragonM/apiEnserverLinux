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
router.post('/',crearProducto);
router.put('/:id',editarProducto);
router.delete('/:id',eliminarProducto);

module.exports=router;
