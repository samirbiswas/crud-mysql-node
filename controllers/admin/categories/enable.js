const db = require("../../../dbServices");

exports.enable = async (req, res) => {
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
        
        if (category.category_status === "disable") {
            const data = {
                category_status: "enable"
            }
            await db.categories.update(data, {
                where: {
                    id: category.id,
                },
            })
            return res.status(200).json({
                message: "Category enable successfully"
            });
        } else {
            return res.status(400).json({ message: "Category already enable" });
        }


    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
