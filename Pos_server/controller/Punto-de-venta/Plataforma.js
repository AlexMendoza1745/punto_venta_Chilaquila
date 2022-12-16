const { sql, poolPromise } = require('../../database/db');

class PlataformaController {

    //CLIENTES
    //Obtener los clientes registrados
    async getClient(req, res) {
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

    //Agregar un nuevo cliente
    async addClient(req, res) {
        try {
            if (req.body.nombre != null && req.body.apellido != null && req.body.calle != null &&
                req.body.telefono != null && req.body.colonia != null && req.body.CP != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('nombre', sql.VarChar, req.body.nombre)
                    .input('apellido', sql.VarChar, req.body.apellido)
                    .input('calle', sql.VarChar, req.body.calle)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('colonia', sql.VarChar, req.body.colonia)
                    .input('CP', sql.VarChar, req.body.CP)
                    .query('insert into Cliente (nombre,apellido,calle,telefono,colonia,CP) values (@nombre,@apellido,@calle,@telefono,@colonia,@CP)');
                res.json(result);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }


    //Cambiar a un cliente
    async updateClient(req, res) {
        try {
            if (req.body.id != null, req.body.calle != null && req.body.telefono != null && req.body.colonia != null && req.body.CP != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('calle', sql.VarChar, req.body.calle)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('colonia', sql.VarChar, req.body.colonia)
                    .input('CP', sql.VarChar, req.body.CP)
                    .query('Update Cliente SET calle = @calle,telefono = @telefono, colonia = @colonia, CP = @CP  WHERE id = @id');
                res.json(result);
            } else {
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    //Borrar un cliente
    async deleteClient(req, res) {
        try {
            if (req.body.id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .query('delete from Cliente WHERE id = @id');
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



const Plataformacontroller = new PlataformaController()
module.exports = Plataformacontroller;