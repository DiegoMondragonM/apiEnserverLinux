const router=require('express').Router();
const {categorias}=require('../controllers/categorias.controller')

router.get('/',categorias);

module.exports=router;
