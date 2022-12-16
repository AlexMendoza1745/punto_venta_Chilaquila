const { sql, poolPromise } = require('../../database/db');

class TurnoController {

    //Turno abierto
    /*Abrir un nuevo turno de acuerdo a la fecha y hora */
    async addTurn(req, res) {
        try {
            if (req.body.fecha != null && req.body.apertura != null && req.body.turno_id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('fecha', sql.VarChar, req.body.fecha)
                    .input('apertura', sql.Money, req.body.apertura)
                    .input('turno_id', sql.Int, req.body.turno_id) //-->new
                    .output('message', sql.VarChar)
                    .execute('newTurn');
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /*Cerrar un turno abierto */
    async closeTurn(req, res) {
        try {
            if (req.body.fecha != null && req.body.retiro != null && req.body.turno_id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('fecha', sql.VarChar, req.body.fecha)
                    .input('retiro', sql.Money, req.body.retiro)
                    .input('turno_id', sql.Int, req.body.turno_id) //-->new
                    .output('message', sql.VarChar)
                    .execute('closeTurn');
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Ultimo Turno
    /*Abrir un nuevo turno de acuerdo a la fecha y hora */
    async LastTurn(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .output('turno_id', sql.Int)
                .output('turno_abierto', sql.VarChar)
                .output('message', sql.VarChar)
                .execute('ultimoTurno');
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //leer turno, justo al abrir el programa leera el ultimo turno creado segun la fecha y tomara sus valores
    //hasta que se abra uno nuevo y de acuerdo  la  lectura y fecha cambie
}


const Turnocontroller = new TurnoController()
module.exports = Turnocontroller;