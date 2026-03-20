//var express = require('express');
import express from 'express';
//var router = express.Router();
const router = express.Router();

/* Get home page. */
/*definir las rutas para el author, renderizando la vista author.hbs y pasado los datos del autor*/
router.get('/',function (req, res, next) {
    res.render('author', {
        name: 'Misael',
        lastname: 'De Jesus',
        matricula: 211130203     
    });
})

//module.exports = router; 
 export default router;