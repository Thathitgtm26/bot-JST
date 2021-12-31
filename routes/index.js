var express = require('express');
var router = express.Router();

/* GET home page. */
let x1 = 0;
let x2 = 0;
let x3 = 0;
router.get('/set/:x1/:x2/:x3/', function(req, res, next) {
  x1 = req.params.x1;
  x2 = req.params.x2;
  x2 = req.params.x2;
  res.json({
    x1:x1, 
    x2:x2,
    x3:x3
  })
});

router.get('/:sel', function(req, res, next) {
  if(req.params.sel == "x3"){
    res.render(
      'index', 
      { 
        title: 'DNNJS',
        x1: x1,
        x2: x2,
        x3: x3
      }
    );
  }else{
    res.redirect(`/api/classify/${x1}/${x2}/${x3}`)
  }
});

module.exports = router;
