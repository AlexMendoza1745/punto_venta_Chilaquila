const { sql, poolPromise } = require('../../database/db');

class RapidoController {

    //Platillos
    //Obtener todas lo platillos
    async getSauser(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Platillos`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Obtener los platillos por categoria
    async getCategorySauser(req, res) {
        try {
            let categoria_id = req.params.categoria;
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`select * from Platillos where categoria_id = ${categoria_id}`);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}



const Rapidocontroller = new RapidoController()
module.exports = Rapidocontroller;