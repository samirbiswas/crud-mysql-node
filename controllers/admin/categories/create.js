const db = require("../../../dbServices");
const checkPayload = require("../../../utils/checkPayload.util");
const categoryValidator = require("../../../validation/category/categori_validation");

exports.create = async (req, res) => {
    try {
        if (checkPayload(req.body)) {
            return res.status(400).json({
                message: 'No payload provided',
            });
        }
        // Check Validation
        const { errors, isValid, data } = categoryValidator(req.body);
        if (!isValid) return res.status(400).json({ status: false, errors });

        //Find category_name
        const foundCategory = await db.categories.findOne({
            where: {
                category_name: data.category_name
            },
        });

        if (foundCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        await db.categories.create(data);

        return res.status(200).json({
            message: "Catagory created successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
