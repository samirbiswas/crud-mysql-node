const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const db = require("../../dbServices");
const checkPayload = require("../../utils/checkPayload.util");
const loginValidator = require("../../validation/auth/login.validator");

exports.loginUser = async (req, res) => {
    try {


        if (checkPayload(req.body)) {
            return res.status(400).json({
                message: 'No payload provided',
            });
        }
        // Check Validation
        const { errors, isValid, data } = loginValidator(req.body);
        if (!isValid) return res.status(400).json({ status: false, errors });

        // Find the user with username/email
        const foundUser = await db.users.findOne({
            where: {
                [Op.or]: [{ username: data.username }, { email: data.username }]
            },
        });

        if (!foundUser) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        const doMatch = await bcrypt.compare(data.password, foundUser.password);

        if (!doMatch) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        delete foundUser.password;
        const token = jwt.sign(foundUser, "your-wish", { expiresIn: '1d' });

        return res.status(200).json({
            message: `${foundUser.username} logged in successfully`,
            token: token,
        });

    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
