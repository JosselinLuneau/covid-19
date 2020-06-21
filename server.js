const express = require('express')
const app = express();

app.use("/app", express.static(__dirname + "/dist/js"));
app.use("/css", express.static(__dirname + "/dist/css"));
app.use("/static", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/admin", function (req, res) {

})
// 404 Redirect
app.get("*", function(req, res) {
    res.redirect('/')
})


app.listen(8000)
