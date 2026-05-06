import dotenv from "dotenv";
import Database from "./config/mongoDb"
import app from "./app"
import { connect } from "mongoose";

dotenv.config();

const PORT = process.env.port || 3000;

const startServer = async () => {
    console.log("MONGO_URI:", process.env.MONGO_URI)
    await Database.connect()

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
