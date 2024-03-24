var express = require("express");
var eSession = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");
var ejs = require("ejs");
var helper = require("./admissionServer");
const admissionSchema = require("./admissionSchema");
const { dirname } = require("path");
const { dir } = require("console");

var myServer = express();
myServer.use(eSession({ secret: "ssshhhh", saveUninitialized: true, resave: true}));
myServer.use(bodyParser.urlencoded({extended: true}));
myServer.use(cors({ origin: "*"}));

myServer.set("views", __dirname);
myServer.set("view engine", "ejs");




myServer.get("/addmission.htm",function(request, response){
    console.log("received request from addmission.htm");
    response.sendFile(__dirname + "/addmission.html");
});


myServer.get("/showAdmission.htm", function (request, response) {
    console.log("received request for /showAdmission.htm");
    response.sendFile(__dirname + "/admission.html");
  });

myServer.post("/addAdmission.htm", helper.addAdmission);
myServer.post("/updateAdmission.htm", helper.updateAdmission);

myServer.get("/deleteAdmission.htm", helper.deleteAdmission);

myServer.get("/editAdmission.htm", helper.getAdmissionById);
myServer.get("/listAdmission.htm", helper.listAdmission);

myServer.get("/searchUsers", helper.searchUsers);

myServer.get("*.css", function(request, response){
    let spath =  __dirname + request.path;
    console.debug("css file: "+spath);
    response.contentType(path.basename(spath));
    response.sendFile(spath);
});
myServer.get("*.js", function(request, response){
    let spath = __dirname + request.path;
    console.debug("JS file: "+spath);
    response.contentType(path.basename(spath));
    response.sendFile(spath);
});

var server = myServer.listen(8080, initFunction);

function initFunction(){
var post = server.address().port;
var host = server. address().address;

console.log("host =" + host + "" + post); 
 }