const server = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const registerRoutes = require("./routes/indexRoutes");
const dbconfig = require("./config/dbconfig");
// const sequelize = require("./config/dbconfig");
const User = require("./model/User");
const port = process.env.PORT || 5000;
const {
  sequelize,
  Role,
  Permission,
  RolePermission,
  Module
} = require("./model/association");

// initialize server
const app = server();

//cors middleware
app.use(cors());
app.use(server.json()); // ✅ add this line to parse JSON request bodies

app.use(server.json());

//Register routes
registerRoutes(app);

//Error handler
app.use(errorHandler);

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    // Use server.listen instead of app.listen
    app.listen(port, async () => {
      console.log(`Server is running on port no:${port}`);
    //   console.log(`WebSocket server is also running on the same port`);
      console.log(`Connection established successfully`);
    //   await runSeeders();
    //   setupAssociations();
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start server
// app.listen(5000, () => console.log("Server running on port 5000"));
