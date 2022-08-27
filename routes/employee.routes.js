const router = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { list } = require("../controllers/employee/categories/list");
const { details } = require("../controllers/employee/categories/detailes");
const gate = require("../middleware/gate");

router.get("/category/list", authenticate, gate('employee'), list)
router.get("/category/details", authenticate, gate('employee'), details)

module.exports = router;