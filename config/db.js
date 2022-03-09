const mongoose = require('mongoose');

const connectToDatabase = async (url) => {
    try {
        const conn = await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
        console.log(`Database running at ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error while connecting with Database${error}`);
    }
    
}

module.exports = connectToDatabase;