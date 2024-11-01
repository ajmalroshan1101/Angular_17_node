const express = require('express');
const multer = require('multer');
const employee = express.Router();

require('dotenv').config();

const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

const { upload } = require("../utility/s3multer")

const {
    selectdesign,
    ordercreation,
    getorder,
    get_on_going_order,
    delected_request

} = require('../controller/employeecontroller');

//function for getting order from tbl_order_creation
employee.get('/getorder', getorder);

//function for selecting design by productType
employee.post('/selectdesign', selectdesign);

//Order createing Function
// employee.post('/ordercreation', upload.single('file'), ordercreation);
// employee.post('/ordercreation', upload.fields([{ name: 'file' }, { name: 'file2' }, { name: 'file3' }]), ordercreation);
employee.post('/ordercreation', upload.array('files'), ordercreation);

employee.get('/ongoingorder', get_on_going_order);

employee.get('/deletedrequest', delected_request);
module.exports = employee;