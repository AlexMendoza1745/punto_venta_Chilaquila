const { sql, poolPromise } = require('../../database/db');

class ArticulosController {

    //Articulos
    //Obtener todas los articulos
    async getArticles(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT * FROM Articulo `);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agregar un nuevo articulo
    async addArticle(req, res) {
            try {
                if (req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                    req.body.unidad_compra != null && req.body.unidad_venta != null && req.body.img != null &&
                    req.body.visible != null && req.body.precio_compra != null && req.body.precio_venta != null &&
                    req.body.existencia != null && req.body.producto_id != null) {
                    const pool = await poolPromise;
                    const result = await pool.request()
                        .input('nombre', sql.VarChar, req.body.nombre)
                        .input('categoria_id', sql.Int, req.body.categoria_id)
                        .input('departamento_id', sql.Int, req.body.departamento_id)
                        .input('unidad_compra', sql.VarChar, req.body.unidad_compra)
                        .input('unidad_venta', sql.VarChar, req.body.unidad_venta)
                        .input('img', sql.VarChar, req.body.img)
                        .input('visible', sql.Bit, req.body.visible)
                        .input('precio_compra', sql.Money, req.body.precio_compra)
                        .input('precio_venta', sql.Money, req.body.precio_venta)
                        .input('existencia', sql.Int, req.body.existencia)
                        .input('producto_id', sql.Int, req.body.producto_id)
                        .output('message', sql.VarChar)
                        .execute('newArticleP');
                    res.json(result);
                } else {
                    res.send('Please fill all the details!')
                }
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
        //Actualizar un articulo
    async updateArticle(req, res) {
        try {
            if (req.body.id != null && req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                req.body.unidad_compra != null && req.body.unidad_venta != null && req.body.img != null &&
                req.body.visible != null && req.body.precio_compra != null && req.body.precio_venta != null &&
                req.body.existencia != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('nombre', sql.VarChar, req.body.nombre)
                    .input('categoria_id', sql.Int, req.body.categoria_id)
                    .input('departamento_id', sql.Int, req.body.departamento_id)
                    .input('unidad_compra', sql.VarChar, req.body.unidad_compra)
                    .input('unidad_venta', sql.VarChar, req.body.unidad_venta)
                    .input('img', sql.VarChar, req.body.img)
                    .input('visible', sql.Bit, req.body.visible)
                    .input('precio_compra', sql.Money, req.body.precio_compra)
                    .input('precio_venta', sql.Money, req.body.precio_venta)
                    .input('existencia', sql.Int, req.body.existencia)
                    .query(`Update Articulo SET nombre = @nombre, categoria_id = @categoria_id, 
                           departamento_id = @departamento_id,unidad_compra = @unidad_compra, unidad_venta = @unidad_venta,
                           img = @img, visible = @visible, precio_compra = @precio_compra,precio_venta = @precio_venta,
                           existencia = @existencia WHERE id = @id`);
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Borrar un articulo 
    async deleteArticle(req, res) {
        try {
            let id = req.params.id;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .output('message', sql.VarChar)
                .execute('deleteArticle');
            res.json(result);

        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Articuloscontroller = new ArticulosController()
module.exports = Articuloscontroller;