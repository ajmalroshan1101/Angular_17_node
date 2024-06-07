const express = require('express');
const multer = require('multer');
const department = express.Router();

require('dotenv').config();

const {
    orderlist,
    handmadeorder,
    getSubDepartmentHM,
    order_change_sub_department,
    vieworderlist,
    getcastingorder,
    view_order_casting,
    sub_department_cast


} = require('../controller/departmentController')

department.post('/orderlist', orderlist)

department.get('/handmadeorderlist', handmadeorder);

department.get('/hmdepartment', getSubDepartmentHM);

department.post('/subdepartmentchange', order_change_sub_department);

department.post('/viewhandmade', vieworderlist);

department.post('/viewcasting', view_order_casting);

department.get('/getcastingorder', getcastingorder);

department.get('/subdepartmentcasting', sub_department_cast);

module.exports = department;