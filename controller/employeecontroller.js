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

        const profilePicture = req.file ? req.file.location : null;


        const { totalWeight, deliveryDate, productType, design, styleCode, quantity, weightExpected, size, currentDate } = req.body;

        const query = `INSERT INTO tbl_order_creation (employee_name, product_type, design, qty, style_code, size, total_wgt, wgt_expected, curt_date, delivery_date ,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`;
        const values = [employeeName, productType, design, quantity, styleCode, size, totalWeight, weightExpected, currentDate, deliveryDate, profilePicture];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json('success');
        });
    },

    //order getting fucntion
    getorder: (req, res) => {

        const query = `SELECT * FROM tbl_order_creation`

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