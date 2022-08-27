const gate = (type) => {
    return function (req, res, next) {

        let userType = req.user.user_type.toUpperCase()
        if (userType === type.toUpperCase()) {
            next()
        } else {
            res.status(403).json({
                message: "Access denied"
            })
        }

    }
}

module.exports = gate;