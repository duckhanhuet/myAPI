var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config/database');
var User = require('./models/User');
var SinhVien = require('./models/SinhVien');

//var UserController = require('./Controllers/UserController');
var apiUser = require('./api/User');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(morgan('deb'));

app.use(passport.initialize());

require('./config/passport')(passport);

//Create API group routes
var apiRoutes = express.Router();
apiRoutes.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter an email and password to Register'
        })
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        new newUser.save(function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: 'That email address already exists'
                })
            } else {
                res.json({
                    success: true,
                    message: 'Successfully created  new user'
                })
            }
        })
    }
})

apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed ,User not Found.'
            })
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //create Token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080
                    });
                    res.json({
                        succsess: true,
                        token: 'JWT ' + token
                    })
                } else {
                    res.json({
                        succsess: false,
                        message: 'Authentication failed.Password did not match'
                    })
                }
            })
        }
    })
});
// apiRoutes.post('/createSv', function (req, res, next) {
//     newUser = new User({
//         username: 'qqqBBBVanTranh',
//         password: '34444434',
//     });
//     newUser.profiles.tenSinhVien = 'dfdf';
//     newUser.save(function (err) {
//         if (err) {
//             res.json({
//                 success: false,
//                 message: 'That email address already exists'
//             })
//         } else {
//             res.json({
//                 success: true,
//                 message: 'Successfully created  tranh user'
//             })
//         }
//     });
// })

apiRoutes.get('/dashboard', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.send('Its worked! User id is:' + req.user._id);
})

app.use('/api', apiRoutes);
mongoose.connect(config.database);
app.get('/', function (req, res) {
    res.send('Well come to my WebService');
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});

app.use('/user', apiUser);


// test to add csdl on mongodb

require('./testAddCsdl/test.js')(app);



module.exports = app;
