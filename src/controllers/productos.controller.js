const productos_get = (req, res) => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => res.send(data));
}
const producto_id_get = async (req, res) => {
    let { id } = req.params;
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        // Verifica que el status HTTP sea exitoso
        if (!response.ok) {
            return res.status(response.status).json({ error: "Error al consultar la API externa" });
        }
        const data = await response.json();
        // La FakeStore regresa null si el producto no existe
        if (!data) {
            return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
        }
        res.json(data);

    } catch (error) {
        console.error("Error en producto_id_get:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    productos_get,
    producto_id_get
}
