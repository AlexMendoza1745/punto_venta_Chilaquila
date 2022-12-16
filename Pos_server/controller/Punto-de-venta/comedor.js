const { sql, poolPromise } = require('../../database/db');

class ComedorController {


    //Obtener las cuentas del turno que no esten pagadas
    async getCheckWhitoutPay(req, res) {
        try {
            let turnoId = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Cuenta where turno_id = ${turnoId} and estado_id=2`);
            //2 = sin pagar en tabla estados
            //tres estado =pagado,sin pagar,suspendido+motivo
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agregar una cuenta nueva --> Modelo+1
    async addCheck(req, res) {
        try {
            if (req.body.apertura != null && req.body.cierre != null && req.body.estado_id != null && req.body.descuento_gnral != null &&
                req.body.cajero_id != null && req.body.total != null && req.body.cliente_id != null &&
                req.body.turno_id != null && req.body.seccion != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('apertura', sql.VarChar, req.body.apertura)
                    .input('cierre', sql.VarChar, req.body.cierre)
                    .input('total', sql.Money, req.body.total)
                    .input('estado_id', sql.Int, req.body.estado_id)
                    .input('descuento_gnral', sql.VarChar, req.body.descuento_gnral)
                    .input('cajero_id', sql.Int, req.body.cajero_id)
                    .input('cliente_id', sql.Int, req.body.cliente_id)
                    .input('turno_id', sql.Int, req.body.turno_id)
                    .input('seccion', sql.VarChar, req.body.seccion)
                    .query(`insert into Cuenta (apertura,cierre,estado_id,descuento_gnral,cajero_id,total,cliente_id,turno_id,seccion) 
                    values (@apertura,@cierre,@estado_id,@descuento_gnral,@cajero_id,@total,@cliente_id,@turno_id,@seccion)`);
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }


    //DETALLE CUENTA
    //Obtener los productos asociado a una cuenta
    async getCheckDetail(req, res) {
        try {
            let cuenta_id = req.params.cuenta;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Detalle_Cuenta where cuenta_id = ${cuenta_id}`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Agergar productos a la cuenta
    async addCheckDetail(req, res) {
        try {
            if (true) {
                console.log(req.body);
                const detalle = req.body;
                await Promise.all(detalle.map(async(cuenta) => {
                    console.log('producto_id', cuenta.producto_id);
                    const pool = await poolPromise;
                    const result = await pool.request()
                        .input('cuenta_id', sql.Int, cuenta.cuenta_id)
                        .input('cantidad', sql.Int, cuenta.cantidad)
                        .input('producto_id', sql.Int, cuenta.producto_id)
                        .input('descuento', sql.VarChar, cuenta.descuento)
                        .query('insert into Detalle_cuenta (cuenta_id,cantidad,producto_id,descuento) values (@cuenta_id,@cantidad,@producto_id,@descuento)');
                    //res.json(result);
                }))
                console.log(detalle);
                res.json(result); //--fix

            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Borrar un producto de una cuenta
    async deleteCheckDetail(req, res) {
        try {
            let ids = req.body;
            await Promise.all(ids.map(async(id) => {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .query(`delete from Detalle_cuenta WHERE id = ${id}`);
                //res.json(result);
            }));
            res.json(result); //--fix
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Cambiar el produto de una cuenta
    async updateChecktDetail(req, res) {
        try {
            if (req.body.id != null && req.body.cantidad != null && req.body.descuento != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('descuento', sql.VarChar, req.body.descuento)
                    .query('Update Detalle_cuenta SET cantidad = @cantidad, decuento = @descuento WHERE id = @id');
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Dividir cuenta en dos 
    /*se cambio para el frontend esta funcinalidad
    async DividirCount(req, res) {
        try {
            if (req.body.apertura != null && req.body.estado != null && req.body.descuento_gnral != null &&
                req.body.cajero_id != null && req.body.total != null && req.body.cliente_id != null &&
                req.body.turno_id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                .input('apertura', sql.DateTime, req.body.apertura)
                //.input('cierre', sql.DateTime, req.body.apertura)
                .input('total', sql.Money, req.body.total)
                .input('estado', sql.VarChar, req.body.estado)
                .input('descuento_gnral', sql.VarChar, req.body.descuento_gnral)
                .input('cajero_id', sql.Int, req.body.cajero_id)
                .input('cliente_id', sql.Int, req.body.cliente_id)
                .input('turno_id', sql.Int, req.body.turno_id)
                    .query('insert into Cuenta (fecha,total,estado_id,descuento_gnral,cajero_id,cliente_id,turno_id) values (@fecha,@estado_id,@descuento_gnral,@cajero_id,@total,@cliente_id,@turno_id)');
                    //crear detalles de cuentas de los productos
                    res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    } */

    //Juntar dos cuentas
}



const Comedorcontroller = new ComedorController()
module.exports = Comedorcontroller;