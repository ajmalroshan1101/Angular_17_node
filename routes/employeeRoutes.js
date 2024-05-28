const express = require('express');
const multer = require('multer');
const employee = express.Router();

require('dotenv').config();

const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

const { upload } = require("../utility/s3multer")

const { selectdesign, ordercreation, getorder } = require('../controller/employeecontroller');

//function for getting order from tbl_order_creation
employee.get('/getorder', getorder);

//function for selecting design by productType
employee.post('/selectdesign', selectdesign);

//Order createing Function
employee.post('/ordercreation', upload.single('file'), ordercreation);


module.exports = employee;