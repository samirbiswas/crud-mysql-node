const db = require("../../../dbServices");

exports.disable = async (req, res) => {
    try {
        //Find categories
        const category = await db.categories.findOne({
            where: {
                id: req.params.category_id
            }
        });

        if (!category) {
            return res.status(400).json({ message: "Category doesn't found" });
        }
      
        if (category.category_status === "enable") {
            const data = {
                category_status: "disable"
            }
            await db.categories.update(data, {
                where: {
                    id: category.id,
                },
            })
            return res.status(200).json({
                message: "Category disable successfully"
            });
        } else {
            return res.status(400).json({ message: "Category already disable" });
        }

    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
