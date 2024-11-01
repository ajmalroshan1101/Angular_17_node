const connection = require('../utility/mysql')

const employee = {

    //getting design 
    selectdesign: (req, res) => {


        const product = req.body.data;

        const query = `SELECT design FROM tbl_design WHERE prodcut_type = ?`;

        connection.query(query, [product], (err, result) => {
            if (err) {

                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result)
        })
    },

    // Creating order function with image insert
    ordercreation: (req, res) => {

        const employeeName = req.body.employeeName;


        const files = req.files;

        const locations = files.map(file => file.location).join(', ');

        // const profilePicture = req.file ? req.file.location : null;


        const status = 0;

        const { totalWeight, deliveryDate, productType, design, styleCode, quantity, weightExpected, size, currentDate } = req.body;

        const query = `INSERT INTO tbl_order_creation (employee_name, product_type, design, qty, style_code, size, total_wgt, wgt_expected, curt_date, delivery_date ,image,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?,?)`;
        const values = [employeeName, productType, design, quantity, styleCode, size, totalWeight, weightExpected, currentDate, deliveryDate, locations, status];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('done');
            res.json('success');
        });
    },

    //order getting fucntion
    getorder: (req, res) => {

        const query = `SELECT * FROM tbl_order_creation WHERE status = 0`

        connection.query(query, (err, result) => {
            if (err) {

                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        })
    },

    get_on_going_order: (req, res) => {

        const query = `SELECT * FROM tbl_order_creation o
        LEFT JOIN hm_department hm ON (o.department = 1 AND o.sub_department = hm.hm_department_id)
        LEFT JOIN tbl_casting_dept cd ON (o.department = 2 AND o.sub_department = cd.casting_dept_id)
        WHERE o.status = 2;`

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result)
        })
    },
    delected_request: (req, res) => {

        const query = `SELECT * FROM 
        tbl_order_creation  WHERE status = 1`


        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        })
    }

}

module.exports = employee;