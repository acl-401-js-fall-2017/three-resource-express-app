const {Router} = require('express');
const router = Router();

router.use('/', (req, res, next) => res.send('bone route!'));

module.exports = router;