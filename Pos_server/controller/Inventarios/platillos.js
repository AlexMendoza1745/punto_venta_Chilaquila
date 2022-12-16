const { sql, poolPromise } = require('../../database/db');

class PlatillosController {

    //Platillo
    //Obtener todas los platillos
    async getMeal(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT * FROM Platillo `);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agregar un nuevo platillo
    async addMeal(req, res) {
            try {
                if (req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                    req.body.unidad_venta != null && req.body.precio_venta != null && req.body.img != null &&
                    req.body.visible != null && req.body.existencia != null && req.body.producto_id != null) {
                    const pool = await poolPromise;
                    const result = await pool.request()
                        .input('nombre', sql.VarChar, req.body.nombre)
                        .input('categoria_id', sql.Int, req.body.categoria_id)
                        .input('departamento_id', sql.Int, req.body.departamento_id)
                        .input('unidad_venta', sql.VarChar, req.body.unidad_venta)
                        .input('precio_venta', sql.Money, req.body.precio_venta)
                        .input('img', sql.VarChar, req.body.img)
                        .input('visible', sql.Bit, req.body.visible)
                        .input('existencia', sql.Int, req.body.existencia)
                        .input('producto_id', sql.Int, req.body.producto_id)
                        .output('message', sql.VarChar)
                        .execute('newMeal');
                    res.json(result);
                } else {
                    res.send('Please fill all the details!')
                }
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
        //Actualizar un platillo
    async updateMeal(req, res) {
        try {
            if (req.body.id != null && req.body.nombre != null && req.body.categoria_id != null && req.body.departamento_id != null &&
                req.body.unidad_venta != null && req.body.precio_venta != null && req.body.img != null &&
                req.body.visible != null && req.body.existencia != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('nombre', sql.VarChar, req.body.nombre)
                    .input('categoria_id', sql.Int, req.body.categoria_id)
                    .input('departamento_id', sql.Int, req.body.departamento_id)
                    .input('unidad_venta', sql.VarChar, req.body.unidad_venta)
                    .input('precio_venta', sql.Money, req.body.precio_venta)
                    .input('img', sql.VarChar, req.body.img)
                    .input('visible', sql.Bit, req.body.visible)
                    .input('existencia', sql.Int, req.body.existencia)
                    .query(`Update Platillo SET nombre = @nombre, categoria_id = @categoria_id,departamento_id = @departamento_id,
                    unidad_venta = @unidad_venta,precio_venta = @precio_venta,img = @img,visible = @visible,
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

    //Borrar un platillo 
    async deleteMeal(req, res) {
        try {
            let id = req.params.id;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .output('message', sql.VarChar)
                .execute('deleteMeal');
            res.json(result);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Detalle platillo
    //Obtener todas los insumos de un platillo
    async getConsumablesMeal(req, res) {
        try {
            let platillo_id = req.params.platillo;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT * FROM Detalle_platillo where = ${platillo_id} `);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agregar un nuevo insumo a un platillo -->obtener insumo
    async addConsumablesMeal(req, res) {
        try {
            if (req.body.platillo_id != null && req.body.insumo_id != null && req.body.cantidad != null &&
                req.body.porcion != null && req.body.incluido != null && req.body.opcional_adicional != null &&
                req.body.costo_extra != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('platillo_id', sql.Int, req.body.platillo_id)
                    .input('insumo_id', sql.Int, req.body.insumo_id)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('porcion', sql.Int, req.body.porcion)
                    .input('incluido', sql.Bit, req.body.incluido)
                    .input('opcional_adicional', sql.Bit, req.body.opcional_adicional)
                    .input('costo_extra', sql.Bit, req.body.costo_extra)
                    .query(`insert into Detalle_platillo (platillo_id,insumo_id,cantidad,porcion,incluido,opcional_adicional,costo_extra)
                               values (@platillo_id,@insumo_id,@cantidad,porcion,@incluido,@opcional_adicional,@costo_extra)`);
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Actualizar un insumo de un platillo
    async updateConsumablesMeal(req, res) {
        try {
            if (req.body.id != null && req.body.cantidad != null && req.body.porcion != null &&
                req.body.incluido != null && req.body.opcional_adicional != null &&
                req.body.costo_extra != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('porcion', sql.Int, req.body.porcion)
                    .input('incluido', sql.Bit, req.body.incluido)
                    .input('opcional_adicional', sql.Bit, req.body.opcional_adicional)
                    .input('costo_extra', sql.Bit, req.body.costo_extra)
                    .query(`Update Detalle_platillo SET cantidad = @cantidad, porcion = @porcion,
                    incluido = @incluido,opcional_adicional = @opcional_adicional,costo_extra = @costo_extra
                    WHERE id = @id`);
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Borrar un insumo de un platillo 
    async deleteConsumablesMeal(req, res) {
        try {
            let id = req.params.id;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`delete from Detalle_platillo where id = ${id}`);
            res.json(result);

        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}


const Platilloscontroller = new PlatillosController()
module.exports = Platilloscontroller;