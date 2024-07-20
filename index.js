const express = require("express");
const app = express();
const cors = require("cors");

// allow all url's
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/api", require("./routes/app.routes"));

app.get("/", (req, res) =>
  res.send("Email OTP server running successfully ✅")
);
app.listen(4500, function () {
  console.log("server Started successfully ✅");
});
