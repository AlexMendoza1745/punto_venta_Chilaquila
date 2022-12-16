const { sql, poolPromise } = require('../../database/db');

class ComprasController {

    //Movimientos
    //Obtener todas las cuentas del turno actua
    async getTurnSells(req, res) {
        try {
            let turnoId = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT Sum(entrada) - Sum(salida) as total  FROM Movimientos where turno_id = ${turnoId}`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Comprascontroller = new ComprasController()
module.exports = Comprascontroller;