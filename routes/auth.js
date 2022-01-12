const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if(err) {
                res.sendStatus(401);
            }
            
            req.id = authData.id;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

module.exports = auth;