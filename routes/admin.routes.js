const router = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { create } = require("../controllers/admin/categories/create");
const { update } = require("../controllers/admin/categories/update");
const { list } = require("../controllers/admin/categories/list");
const { destroy } = require("../controllers/admin/categories/delete");
const { enable } = require("../controllers/admin/categories/enable");
const { disable } = require("../controllers/admin/categories/disable");
const gate = require("../middleware/gate");


router.post("/category/create", authenticate, gate('admin'), create)
router.put("/category/update/:category_id", authenticate, gate('admin'), update)
router.get("/category/list", authenticate, gate('admin'), list)
router.delete("/category/delete/:category_id", authenticate, gate('admin'), destroy)

router.put("/category/enable/:category_id", authenticate, gate('admin'), enable) // enable 
router.put("/category/disable/:category_id", authenticate, gate('admin'), disable) // disable

module.exports = router;
