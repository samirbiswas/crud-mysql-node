const { Op } = require('sequelize');
const db = require("../../../dbServices");
const checkPayload = require("../../../utils/checkPayload.util");
const categoryValidator = require("../../../validation/category/categori_validation");

exports.update = async (req, res) => {
    try {

        if (checkPayload(req.body)) {
            return res.status(400).json({
                message: 'No payload provided',
            });
        }
        // Check Validation
        const { errors, isValid, data } = categoryValidator(req.body);
        if (!isValid) return res.status(400).json({ status: false, errors });

        //Find category
        const findCategory = await db.categories.findOne({
            where: {
                id: req.params.category_id
            }
        });

        if (!findCategory) {
            return res.status(400).json({ message: "Category doesn't found" });
        }

        // update catrgory
        await db.categories.update(data, {
            where: {
                id: findCategory.id,
            },
        });

        return res.status(200).json({
            message: "Catagory updated successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
