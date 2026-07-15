const app = require('./app');
const connectDB = require("./config/database")

require("dotenv").config()

const PORT = process.env.PORT || 8100

async function startServer() {

    // database connection
    await connectDB()

    // start the express app
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

}

startServer().catch((error) => {
    console.log('Error starting the server!')
    console.log(error)
})





