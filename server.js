const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const db = require("./dbServices");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api",routes);

const options = {
  logging: false,
  // alter: true,
  // logging: true,
};

// db connection
db.sequelize
  .sync(options)
  .then(() => {
    console.log("Database connection established successfully");
  
    app.listen(PORT, () => {
      console.log(`Server is running at: ${PORT}`);

    });
  })
  .catch((error) => console.log(error));


