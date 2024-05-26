const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({origin: '*'}));

app.use(express.json());
app.use("/api",require("./routes/app.routes"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(4500, function(){
    console.log("server Started");
});
