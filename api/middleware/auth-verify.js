const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')
    let user = jwt.verify(token[1], 'GowthamRemover', (err, user) => {
        if (err) 
        return res.status(401).json({
            message: 'Authentication Failed'
        })
        next();
    })
}
