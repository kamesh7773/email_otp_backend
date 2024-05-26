const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({origin: '*'}));

app.use(express.json());
app.use("/",require("./routes/app.routes"));

app.get("/", (req, res) => res.send("Email OTP server running successfully ✅"));
app.listen(4500, function(){
    console.log("server Started successfully ✅");
});
