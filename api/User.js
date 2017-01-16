var UserController  = require('../Controllers/UserController');

var express  = require('express');
var router   = express.Router();

router.get('/',function (req, res, next) {
    UserController.find(function (err, users) {
        if (err) return next(err);

        res.json(users);
    })
});

router.get('/:token',function (req, res, next) {
    var token = req.params.token;
    res.json({
        //abc: req.user.id
    });
}),

// router.get('user/:id',function (req, res, next) {
//     var id= req.params.id;
//
// })


module.exports = router;
