const { sql, poolPromise } = require('../../database/db');

class CajaController {

    //Movimientos
    //Obtener todas las cuentas del turno actua
    async getTurnSells(req, res) {
        try {
            // let turnoId = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('turno_id', sql.Int, req.params.turno)
                .output('entrada', sql.Int)
                .output('salida', sql.Int)
                .output('total', sql.Int)
                .output('message', sql.VarChar)
                .execute('corteSimple');
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Cajacontroller = new CajaController()
module.exports = Cajacontroller;