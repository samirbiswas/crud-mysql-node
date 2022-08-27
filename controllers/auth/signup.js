const db = require("../../dbServices");
const { Op } = require('sequelize');
const checkPaylaod = require("../../utils/checkPayload.util");
const signupValidator = require("../../validation/auth/signup.validator");
const bcrypt = require("bcryptjs");

exports.signupUser = async (req, res) => {
  try {
    
    if (checkPaylaod(req.body)) {
      return res.status(400).json({
        status: false,
        message: "payload not founded",
      });
    }
    const { data, isValid, errors } = signupValidator(req.body);

    if (!isValid) {
      return res.status(400).json({ status: false, errors });
    }

    const user = await db.users.findOne({
      where: {
        [Op.or]: [
          { username: data.username },
          { email: data.email },
        ]
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    data.password = await bcrypt.hash(data.password, 12);

    await db.users.create(data);
    delete data.password

    return res.status(201).json({
      message: "User signup successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      error,
  });
  }
};
