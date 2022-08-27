const jwt = require('jsonwebtoken')
const db = require('../dbServices')

exports.authenticate = async (req, res, next) => {
    try {

        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorize'
            })
        }
        token = token.split(' ')[1]
        const decode = jwt.verify(token, 'your-wish')

        const user = await db.users.findOne({
            where: {
                username: decode.username
            }
        })
        if (!user) {
            return res.status(400).json({
                message: 'Unauthorize'
            })
        }
        req.user = decode
        next()

    } catch (error) {
        return res.status(400).json({
            message: 'Invalid token'
        })
    }
}