const express = require('express');
//pos
const Comedorcontroller = require('../controller/Punto-de-venta/comedor');
const Plataformacontroller = require('../controller/Punto-de-venta/Plataforma');
const Rapidocontroller = require('../controller/Punto-de-venta/rapido');
const Retirocontroller = require('../controller/Punto-de-venta/retiro-deposito');
const Consultascontroller = require('../controller/Punto-de-venta/consultas');
const Monitorcontroller = require('../controller/Punto-de-venta/monitor');
const Turnocontroller = require('../controller/Punto-de-venta/turnos');
const Cajacontroller = require('../controller/Punto-de-venta/caja');

//Inventarios
const Articuloscontroller = require('../controller/Inventarios/articulos');
const Insumocontroller = require('../controller/Inventarios/insumos');
const Platilloscontroller = require('../controller/Inventarios/platillos');

//-------------------------------------------->PUNTO DE VENTA
const router = express.Router();
//Comedor-----------------------------------------------------------> terminar de poner todas las rutas
router.get('/api/comedor/turno/:turno', Comedorcontroller.getCheckWhitoutPay);
router.post('/api/comedor', Comedorcontroller.addCheck);
//
router.get('/api/comedor/cuenta/:cuenta', Comedorcontroller.getCheckDetail);
router.post('/api/comedor/cuenta', Comedorcontroller.addCheckDetail);
//router.delete('/api/comedor/cuenta/:cuenta', Comedorcontroller.deleteCheckDetail);
router.post('/api/comedor/cuenta/borrar', Comedorcontroller.deleteCheckDetail);
router.put('/api/comedor/cuenta', Comedorcontroller.updateChecktDetail);

//Plataforma----------------------------------------------------------->
router.get('/api/plataforma/cliente', Plataformacontroller.getClient);
router.post('/api/plataforma/cliente', Plataformacontroller.addClient);
router.delete('/api/plataforma/cliente', Plataformacontroller.deleteClient);
router.put('/api/plataforma/cliente', Plataformacontroller.updateClient);

//Rapido
router.get('/api/rapido/platillo', Rapidocontroller.getSauser);
router.get('/api/comedor/platillo/categoria/:categoria', Rapidocontroller.getCategorySauser);

//Retiro-deposito
router.post('/api/caja/deposito', Retirocontroller.addDeposit);
router.post('/api/caja/retiro', Retirocontroller.addWithdrawall);

//Consultar cuentas 
router.get('/api/consultar', Consultascontroller.getCounts);
router.get('/api/consultar/turno/:turno', Consultascontroller.getCountTurn);
router.get('/api/consultar/fecha/:fecha', Consultascontroller.getCountDate);
router.put('/api/comedor/pagar', Consultascontroller.updateStateCount);

//Monitor
router.get('/api/consultar/venta/turno/:turno', Monitorcontroller.getTurnSells);
router.get('/api/consultar/venta/turno/:turno/categoria/:categoria', Monitorcontroller.getTurnCategorySells);
router.get('/api/consultar/venta/seccion/:seccion/turno/:turno', Monitorcontroller.getSectionSells);

//Turno
router.get('/api/turno/ultimo', Turnocontroller.LastTurn);
router.post('/api/turno/abrir', Turnocontroller.addTurn);
router.post('/api/turno/cerrar', Turnocontroller.closeTurn);

//Caja
router.get('/api/caja/turno/:turno', Cajacontroller.getTurnSells);

//-----------------------------------> INVENTARIOS

//Articulos
router.get('/api/articulo', Articuloscontroller.getArticles);
router.post('/api/articulo', Articuloscontroller.addArticle);
router.delete('/api/articulo/:id', Articuloscontroller.deleteArticle);
router.put('/api/articulo', Articuloscontroller.updateArticle);

//Insumo
router.get('/api/insumo', Insumocontroller.getConsumable);
router.post('/api/insumo', Insumocontroller.addConsumable);
router.delete('/api/insumo/:id', Insumocontroller.deleteConsumable);
router.put('/api/insumo', Insumocontroller.updateConsumable);

//Platillo
router.get('/api/platillo', Platilloscontroller.getMeal);
router.post('/api/platillo', Platilloscontroller.addMeal);
router.delete('/api/platillo/:id', Platilloscontroller.deleteMeal);
router.put('/api/platilllo', Platilloscontroller.updateMeal);
//detalle platillo
router.get('/api/platillo/detalle/:platillo', Platilloscontroller.getConsumablesMeal);
router.post('/api/platillo/detalle', Platilloscontroller.addConsumablesMeal);
router.delete('/api/platillo/detalle/:id', Platilloscontroller.deleteConsumablesMeal);
router.put('/api/platilllo/detalle', Platilloscontroller.updateConsumablesMeal);

module.exports = router;