const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.static("./uncchspoons/src"));


// app.post('/', (req, res) => {
//     const {name} = req.body;
//     res.send(`${name}`);
// })

app.listen(port, (error) => {
    if(!error) console.log("App listening on port" + port);
    else console.log("Cannot listen.")
});