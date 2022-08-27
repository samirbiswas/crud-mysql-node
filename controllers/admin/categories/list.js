const db = require("../../../dbServices");

exports.list = async (req, res) => {
    try {
        //Find categories
        const data = await db.categories.findAll();
        if (!data) {
            return res.status(400).json({ message: "Category doesn't found" });
        }
        return res.status(200).json({
            data
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
