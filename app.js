const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const adminroute = require('./routes/adminRoutes');

const employeeroute = require('./routes/employeeRoutes');

const departmentRoutes = require('./routes/departmentroutes');

app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

app.use(bodyParser.json());

app.use(cors());

app.use('/admin', adminroute);

app.use('/employee', employeeroute);

app.use('/department', departmentRoutes);

app.get('/', (req, res) => {
    res.send('node is working')
})
app.listen(2233, () => {
    console.log('angular 17 is working');
})