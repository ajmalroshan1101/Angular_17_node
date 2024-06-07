const express = require("express");

const adminroute = express.Router();

const {
    createCustomer,
    createDesign,
    state,
    createcustomerarea,
    prodcutType,
    reportingBranch,
    selectcustomerservicearea,
    selectreportingbranch,
    select_state,
    login,
    getproduct,
    viewproduct,
    orderedit,
    orderdelete,
    departmentTrasfer
} = require("../controller/adminController");
const admin = require("../controller/adminController");
const { upload } = require("../utility/s3multer");

adminroute.post("/creatcustomer", createCustomer);

//create customer area function
adminroute.post("/createserivearea", createcustomerarea);

//create product design
adminroute.post("/createdesign", createDesign);

//insert the product type
adminroute.post("/producttype", prodcutType);

//inserting query for state table
adminroute.post("/state", state);

adminroute.post("/reporting", reportingBranch);

//get customer service area name
adminroute.get("/slcustomerservicearea", selectcustomerservicearea);

//get reporting branch
adminroute.get("/slreportingbranch", selectreportingbranch);

//get state from the tbl_state
adminroute.get('/slstate', select_state);

adminroute.post('/login', login)

adminroute.get('/getproduct', getproduct);

adminroute.post('/viewproduct', viewproduct);

adminroute.post('/orderedit', upload.single('file'), orderedit)

adminroute.post('/orderdelete', orderdelete);

adminroute.post('/departmenttransfer', departmentTrasfer)

module.exports = adminroute;