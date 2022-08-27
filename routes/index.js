const router = require("express").Router();

const authRouters = require("./auth.routes");
const adminRouters = require("./admin.routes");
const employeeRouters = require("./employee.routes");

router.use("/auth", authRouters);
router.use("/admin", adminRouters);
router.use("/employee", employeeRouters);

module.exports = router;
