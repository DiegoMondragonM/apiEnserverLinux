const errorHandler=(err,req,res,next)=>
{
    console.error(err.stack);
    if (err.code=='23505')
    {
        return res.status(409).json
        ({
            ok:false,
            mensaje:'YA EXISTE UN REGISTRO CON ESE VALOR',
        });
    }
    if(err.code==23503)
    {
        return res.status(400).json(
            {
                ok:'false',
                mensaje:'LA CATEGORIA INDICADA NO EXIXTSE'
            }
        );
    }
    res.status(err.status||500).json(
        {
            ok:'false',
            mensaje:err.message||'Error interno del servidor'
        }
    ); 
}
module.exports = errorHandler;   