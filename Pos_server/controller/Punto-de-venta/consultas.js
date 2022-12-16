const { sql, poolPromise } = require('../../database/db');

class ConsultasController {

    //CUENTA

    /*Obtener todas las cuentas */
    async getCounts(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Cuenta`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /*Obtener cuentas por turno estén o no pagadas */
    async getCountTurn(req, res) {
        try {
            let turnoId = req.params.turno;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Cuenta where turno_id = ${turnoId}`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /*Obtener cuentas por una fecha en especifico */
    async getCountDate(req, res) {
        try {
            let fecha = req.params.fecha;
            let año; //sacar los digitos de la fecha dada
            let mes;
            let dia;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT * FROM Cuenta 
                        WHERE  (DATEPART(yy, apertura) = ${año}
                        AND    DATEPART(mm, apertura) = ${mes}
                        AND    DATEPART(dd, apertura) = ${dia})`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Cambiar el estado de una cuenta
    async updateStateCount(req, res) {
        try {
            if (req.body.id != null && req.body.estado_id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('estado_id', sql.Int, req.body.estado_id)
                    .query('Update Cuenta SET estado_id = @estado_id WHERE id = @id');
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Consultascontroller = new ConsultasController()
module.exports = Consultascontroller;