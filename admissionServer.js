var express = require("express");
var eSession = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var portSchema = require("./admissionSchema.js");
const { response } = require("express");

//DB Connection...
mongoose.connect("mongodb://0.0.0.0:27017/Smart-Future");
const mongoDb = mongoose.connection;
mongoDb.on("error", console.error.bind(console, "connection error"));
mongoDb.once("open", function () {
  console.log("connect with the DB");
});

function addAdmission(request, response) {
  console.log("()....");

  //values are Stored in the local variables..
  //var {name, age, grade, parents, email, national, place, dateBirth, religion} = request.body;
  //console.log("name = "+name+", age="+age+", grade="+grade", parents="+parents", national="+national", place="+place", dateBirth=+"dateBirth", religion="+relihgion");

  var FullName = request.body.name;
  var Age = request.body.age;
  var Grade = request.body.grade;
  var ParentsName = request.body.parents;
  var Email = request.body.email;
  var Nationality = request.body.national;
  var PlaceofBirth = request.body.place;
  var DateofBirth = request.body.dateBirth;
  var Religion = request.body.religion;

  let admissionSchema = mongoose.model("admissionRecord");

  let admissionRecordJson = {
    name: FullName,
    age: Age,
    grade: Grade,
    parents: ParentsName,
    email: Email,
    national: Nationality,
    place: PlaceofBirth,
    dateBirth: DateofBirth,
    religion: Religion,
  };

  console.log("admissionRecord =" + JSON.stringify(admissionRecordJson));
  var temport = new admissionSchema(admissionRecordJson);

  //Saving The Record In DB
  try {
    console.log("Saving Admission Record in DB");
    temport.save();
    console.log("Record of Admissions are Saved in DB");
  } catch (error) {
    console.error(error);
    response.status(500);
    response.end(error);
  }

  //Send Response to User
  response.setHeader("Content_Type", "text/html");
  var result = `<html>    </title><body><p>  <h1>Admission Record is Saved <br> Thanku for Applying online Submmision</h1><br><br></p></body></html>`;
  response.end(result);
  console.log("addAdmission().....");
}

async function updateAdmission(request, response) {
  console.log("updateAdmission()....");

  let admissionInformation = mongoose.model("admissionRecord");
  var doc_id = request.body.doc_id;

  var {name, age, grade, parents } = req.body;
  console.log("name = "+name+", age="+age+", grade="+grade);
  var FullName = request.body.name;
  var Age = request.body.age;
  var Grade = request.body.grade;
  var ParentsName = request.body.parents;
  var Email = request.body.email;
  var Nationality = request.body.national;
  var PlaceofBirth = request.body.place;
  var DateofBirth = request.body.dateBirth;
  var Religion = request.body.religion;

  let queryString = {
    _id: doc_id,
  };
  console.log("queryString = " + JSON.stringify(queryString));
  var admissionRecordResult;
  try {
    console.log("Query admissionRecod");
    admissionRecordResult = await admissionInformation.findOne(queryString);
    admissionRecordResult.name = FullName;
    admissionRecordResult.age = Age;
    admissionRecordResult.grade = Grade;
    admissionRecordResult.parents = ParentsName;
    admissionRecordResult.email = Email;
    admissionRecordResult.national = Nationality;
    admissionRecordResult.place = PlaceofBirth;
    admissionRecordResult.dateBirth = DateofBirth;
    admissionRecordResult.religion = Religion;
    await admissionRecordResult.save();
  } catch (error) {
    console.log(error);
    response.status(500);
    response.end(error);
  }
  console.log("updateAdmission = " + admissionRecordResult);

  console.log("Content-Type", "text/html");
  var result = `<html>    smartFuture</title><body><p>Thanks....!  <h1>Addmission Record is updated and Saved <br> Thanku for Applying online Submmision</h1><br><br>Thanks for USing PaymentGateWay</p></body></html>`;
  console.log("updateAdmission()....");
}

async function deleteAdmission(request, response) {
  let admissionInformation = mongoose.model("admissionRecord");
  console.log("deleteAdmission Information...");
  var doc_id = request.query.doc_id;

  let queryString = {
    _id: doc_id,
  };
  console.log("queryString =" + JSON.stringify(queryString));
  var admissionRecordResult;
  try {
    console.log("query from the DB");
    admissionRecordResult = await admissionInformation.findOne(queryString);
    await admissionRecordResult.delete();
  } catch (error) {
    console.log(error);
    response.status(500);
  
    console.log("admissionInformation = " + admissionRecordResult);
    response.setHeader("Content-Type", "text/html");
    var result =
   `<html>    smartFuture</title><body><p>Thanks....!  <h1>Admission Record is Deleted From <br> Thanku for Applying online Submmision</h1><br><br></p></body></html>`;
   response.end(result);
   console.log("delete admissionRecord Data From the DB");
}
}
async function getAdmissionById(request, response){
  console.log("getAdmission ById...........");

   let admissionInformation = mongoose.model("admissionRecord");
   console.log("check::");
   var doc_id = request.body.doc_id;
   console.log(doc_id);

   let queryString ={
    _id: doc_id,
   };
   console.log("queryString =" + JSON.stringify(queryString));
   var admissionRecordResult;
   try{
    console.log("Query From the DB");
  admissionRecordResult = await admissionInformation.findOne(queryString);
   }catch (error){
   response.status(500);
   }
   console.log("admissionInformation = " + admissionRecordResult);
   response.render("editAdmission", {admissionInformation: admissionRecordResult});
   console.log("ID IS End here....?");
}

async function listAdmission(request, response) {
  console.log("list Of Admissions....");

  let admissionRecord = mongoose.model("admissionRecord");

  let queryString = {
    admissionRecord_id: null,
  };
  var admission;
  try {
    console.log("check the Admissions List");
    admission = await admissionRecord.find();
  } catch (error) {
    console.log(error);
    response.status(500);
    response.end(error);
  }
  console.log("admission= " + admission);

  response.render("listAdmission" , { data: admission });
  console.log("listAdmission............");
}
async function searchUsers (request, response){
  console.log("get admissionRecords...");

  let admissionInformation = mongoose.model("admissionRecord");
  var searchName = request.query.name;

  try {
    const query = {
     name: searchName,
    };
  const foundRecords = await admissionInformation.findOne(query);
  //response.contentType("text/plain");
  response.json(foundRecords);//string for show in row we add +""
} catch (error) {
  console.error("Error fetching admission records:",bodyParser.json);
  response.status(500);
}
};

module.exports = {
  addAdmission,
  updateAdmission,
  deleteAdmission,
  getAdmissionById,
  listAdmission,
  searchUsers,
};
