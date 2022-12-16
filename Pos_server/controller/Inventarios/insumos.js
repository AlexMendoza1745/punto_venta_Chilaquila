const { sql, poolPromise } = require('../../database/db');

class InsumosController {

    //Insumo
    //Obtener todas los insumos
    async getConsumable(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT * FROM Insumo `);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agregar un nuevo insumo
    async addConsumable(req, res) {
            try {
                if (req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                    req.body.unidad_compra != null && req.body.unidad_consumo != null && req.body.factor != null &&
                    req.body.precio_compra != null && req.body.precio_venta != null && req.body.img != null &&
                    req.body.stock_minimo != null && req.body.stock_maximo != null && req.body.visible != null &&
                    req.body.existencia != null && req.body.producto_id != null) {
                    const pool = await poolPromise;
                    const result = await pool.request()
                        .input('nombre', sql.VarChar, req.body.nombre)
                        .input('categoria_id', sql.VarChar, req.body.categoria_id)
                        .input('departamento_id', sql.Money, req.body.departamento_id)
                        .input('unidad_compra', sql.VarChar, req.body.unidad_compra)
                        .input('unidad_consumo', sql.VarChar, req.body.unidad_consumo)
                        .input('factor', sql.Int, req.body.factor)
                        .input('precio_compra', sql.Money, req.body.precio_compra)
                        .input('precio_venta', sql.Money, req.body.precio_venta)
                        .input('img', sql.Int, req.body.img)
                        .input('stock_minimo', sql.Int, req.body.stock_minimo)
                        .input('stock_maximo', sql.Int, req.body.stock_maximo)
                        .input('visible', sql.Int, req.body.visible)
                        .input('existencia', sql.Int, req.body.existencia)
                        .input('producto_id', sql.Int, req.body.producto_id)
                        .output('message', sql.VarChar)
                        .execute('newConsumable');
                    res.json(result);
                } else {
                    res.send('Please fill all the details!')
                }
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
        //Actualizar un insumo
    async updateConsumable(req, res) {
        try {
            if (req.body.id != null && req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                req.body.unidad_compra != null && req.body.unidad_consumo != null && req.body.factor != null &&
                req.body.precio_compra != null && req.body.precio_venta != null && req.body.img != null &&
                req.body.stock_minimo != null && req.body.stock_maximo != null && req.body.visible != null &&
                req.body.existencia != null && req.body.producto_id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('nombre', sql.VarChar, req.body.nombre)
                    .input('categoria_id', sql.VarChar, req.body.categoria_id)
                    .input('departamento_id', sql.Money, req.body.departamento_id)
                    .input('unidad_compra', sql.VarChar, req.body.unidad_compra)
                    .input('unidad_consumo', sql.VarChar, req.body.unidad_consumo)
                    .input('factor', sql.Int, req.body.factor)
                    .input('precio_compra', sql.Int, req.body.precio_compra)
                    .input('precio_venta', sql.Int, req.body.precio_venta)
                    .input('img', sql.Int, req.body.img)
                    .input('stock_minimo', sql.Int, req.body.stock_minimo)
                    .input('stock_maximo', sql.Int, req.body.stock_maximo)
                    .input('visible', sql.Int, req.body.visible)
                    .input('existencia', sql.Int, req.body.existencia)
                    .query(`Update Insumo SET nombre = @nombre, categoria_id = @categoria_id,departamento_id = @departamento_id,
                           unidad_compra = @unidad_compra, unidad_consumo = @unidad_consumo, factor = @factor,
                           precio_compra = @precio_compra,precio_venta = @precio_venta,img = @img, stock_minimo = @stock_minimo,
                           stock_maximo = @stock_maximo , visible = @visible, existencia = @existencia WHERE id = @id`);
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Borrar un insumo 
    async deleteConsumable(req, res) {
        try {
            let id = req.params.id;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .output('message', sql.VarChar)
                .execute('deleteConsumable');
            res.json(result);

        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}



const Insumoscontroller = new InsumosController()
module.exports = Insumoscontroller;