const db = require("../../../dbServices");

exports.destroy = async (req, res) => {
    try {
        //Find category
        const findCategory = await db.categories.findOne({
            where: {
                id: req.params.category_id
            }
        });

        if (!findCategory) {
            return res.status(400).json({ message: "Category doesn't found" });
        }
        //Category delete
        await db.categories.destroy({
            where: {
                id: findCategory.id
            }
        })

        return res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
