const { sql, poolPromise } = require('../../database/db');

class MonitorController {

    //CUENTA + 3
    /*Obtener las ventas por categoria del turno actual(Alimentos, bebidas, etc)*/
    async getTurnCategorySells(req, res) {
        try {
            let Categoria_id = req.params.categoria;
            let Turno_id = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT Sum(total) FROM Cuenta AS cu
                        INNER JOIN Detalle_cuenta AS dcu ON cu.id = dcu.cuenta_id
                        INNER JOIN Producto AS p ON dcu.producto_id = p.id
                        INNER JOIN Platillo AS pl ON p.id = pl.producto_id 
                        where categoria_id = ${Categoria_id} and turno_id = ${Turno_id};`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /*Obtener las ventas totales del turno*/
    async getTurnSells(req, res) {
        try {
            let Turno_id = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT Sum(total) FROM Cuenta AS cu
                        INNER JOIN Detalle_cuenta AS dcu ON cu.id = dcu.cuenta_id
                        INNER JOIN Producto AS p ON dcu.producto_id = p.id
                        INNER JOIN Platillo AS pl ON p.id = pl.producto_id  where turno_id = ${Turno_id};`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /*Obtener las ventas por tipo (Comedor,domicilio,rapido)*/
    async getSectionSells(req, res) {
        try {
            let Seccion = req.params.seccion;
            let Turno_id = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select Sum(total) from Cuenta where seccion = ${Seccion} and turno_id = ${Turno_id}`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Monitorcontroller = new MonitorController()
module.exports = Monitorcontroller;