const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
// require("dotenv").config();

async function startServer() {
    try {
        console.log(uri);
        console.log(process.env);
        console.log(config.db.uri);

        await MongoDB.connect(config.db.uri);
        console.log("Connect to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server connect to the database! ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();