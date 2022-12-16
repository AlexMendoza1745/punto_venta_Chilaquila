const { sql, poolPromise } = require('../../database/db');

class RetiroController {

    //MOVIMIENTOS
    //Hacer un deposito
    async addDeposit(req, res) {
        try {
            if (req.body.fecha != null && req.body.entrada != null && req.body.salida != null &&
                req.body.saldo != null && req.body.tipo != null && req.body.turno_id != null) {

                const pool = await poolPromise;
                const result = await pool.request()
                    .input('fecha', sql.VarChar, req.body.fecha)
                    .input('entrada', sql.Money, req.body.entrada)
                    .input('salida', sql.Money, req.body.salida)
                    .input('saldo', sql.Money, req.body.saldo)
                    .input('tipo', sql.VarChar, req.body.tipo)
                    .input('turno_id', sql.Int, req.body.turno_id)
                    .query('insert into Movimientos (fecha,entrada,salida,saldo,tipo,turno_id) values (@fecha,@entrada,@salida,@saldo,@tipo,@turno_id)');
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }


    //Hacer un retiro
    //la suma o resta del dinero se hara en el front

    async addWithdrawall(req, res) {
        try {
            if (req.body.fecha != null && req.body.entrada != null && req.body.salida != null &&
                req.body.saldo != null && req.body.tipo != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('fecha', sql.VarChar, req.body.fecha)
                    .input('entrada', sql.Money, req.body.entrada)
                    .input('salida', sql.Money, req.body.salida)
                    .input('saldo', sql.Money, req.body.saldo)
                    .input('tipo', sql.VarChar, req.body.tipo)
                    .query('insert into Movimientos (fecha,entrada,salida,saldo,tipo) values (@fecha,@entrada,@salida,@saldo,@tipo)');
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }



}

const Retirocontroller = new RetiroController()
module.exports = Retirocontroller;