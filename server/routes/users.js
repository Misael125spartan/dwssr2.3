import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res,) {
  res.send('respond with a resource');
});

// ESTA ES LA PARTE CLAVE:
export default router;