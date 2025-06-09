const express = require('express');
const app = express();

// Middleware or routes
app.get("/", (req, res) => {
    res.send("Hello world");    
});

// Define PORT as a constant
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
