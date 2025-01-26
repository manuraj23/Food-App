const connectDB = require("../db/connection");

async function searchName(call, callback) {
    const { name } = call.request;

    try {
        const db = await connectDB();
        const result = await db.collection("users").findOne({ name });

        if (result) {
            callback(null, { message: `Name found: ${result.name}` });
        } else {
            callback(null, { message: "Name not found" });
        }
    } catch (error) {
        console.error("Error in searchName:", error);
        callback({
            code: 13, // INTERNAL error code
            message: "Internal server error",
        });
    }
}

module.exports = { searchName };
