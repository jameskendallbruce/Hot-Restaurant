var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function Table(name,email,phone,ID){
    this.customerName = name;
    this.customerEmail = email;
    this.customerPhone = phone;
    this.customerID = ID;
}

var wait = [
    {
        customerName: "Brian",
        customerPhone: 7708253835,
        customerEmail: "bburch05@gmail.com",
        customerID: "bb770"
    }
];
var tables = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
  });
  
  // Displays all characters
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

  app.get("/api/waiting", function(req, res){
    return res.json(wait)
  });

  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var body = req.body;
    var newTable = new Table(body.customerName,body.customerEmail,body.customerPhone, body.customerID);
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    if (tables.length <= 4){
        tables.push(newTable);
    }
    else{
        wait.push(newTable);
    }
    console.log(newTable);
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  