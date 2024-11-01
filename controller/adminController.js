const { log } = require("console");
const connection = require("../utility/mysql");

const crypto = require("crypto");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const admin = {

    //Create Customer fucntion
    createCustomer: (req, res) => {
        const {
            customerName,
            serviceArea,
            reportingBranch,
            state,
            username,
            password,
            department
        } = req.body.obj;

        const role = req.body.role
        console.log(department);

        let depid = 0
        if (department === 'HANDMADE') {
            depid = 1
        } else if (department === 'CASTING') {
            depid = 2
        }


        const hashedPass = crypto.createHash("md5").update(password).digest("hex");

        const values = [
            customerName,
            serviceArea,
            reportingBranch,
            state,
            username,
            hashedPass,
            role,
            depid
        ];

        const query = `INSERT INTO tbl_login (customer_name, customer_service_area, reporting_branch, state, username, password,role,department) 
        VALUES (?, ?, ?, ?, ?, ?,?,?)`;

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error("Error inserting data:", error.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.status(200).json({ message: "Customer created successfully" });
        });
    },

    //create product type (insert query)
    createDesign: (req, res) => {

        const { prodcutType, design } = req.body;

        const value = [prodcutType, design];

        const query = `INSERT INTO tbl_design (prodcut_type , design) VALUES(?,?)`;

        connection.query(query, value, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(200).json({ message: "Customer created successfully" });
        });
    },

    //insert  query for tbl_State
    state: (req, res) => {
        const state = req.body.state;

        const query = `INSERT INTO tbl_state (state_name) VALUES(?)`;

        connection.query(query, [state], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            console.log("Inserted successfully:", result);
            res.status(200).json({ message: "Customer created successfully" });
        });
    },

    //create customer area logic
    createcustomerarea: (req, res) => {
        const area = req.body.area;

        const query = `INSERT tbl_customer_service_area (customer_service_area_name) VALUES (?)`;

        connection.query(query, [area], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res
                .status(200)
                .json({ message: "Customer serive area created successfully" });
        });
    },

    //create or inserting product type in the table
    prodcutType: (req, res) => {
        const product = req.body.product;

        const query = `INSERT tbl_product_type (product_type_name) VALUES (?)`;

        connection.query(query, [product], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(200).json({ message: "Customer created successfully" });
        });
    },

    //create or inserting REPORTING BRANCH in the table
    reportingBranch: (req, res) => {

        const report = req.body.report;

        const query = `INSERT tbl_reporting_branch (branch_name) VALUES (?)`;

        connection.query(query, [report], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            console.log("Inserted successfully:", result);
            res.status(200).json({ message: "Create reporting branch successfully" });
        });
    },

    //select query for customer service area
    selectcustomerservicearea: (req, res) => {

        const query = `SELECT customer_service_area_name FROM tbl_customer_service_area`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        });
    },

    //select GET query for reporting branch
    selectreportingbranch: (req, res) => {
        const query = `SELECT branch_name FROM tbl_reporting_branch`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        });
    },

    //select query for state form tbl_state table
    select_state(req, res) {
        const query = `SELECT state_name FROM tbl_state`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        });
    },

    //customer login
    login: (req, res) => {

        const { username, password } = req.body;

        const hashedPass = crypto.createHash("md5").update(password).digest("hex");

        const query = `SELECT customer_no , customer_name ,username,password,tbl_role.role,department
        FROM tbl_login
        LEFT JOIN tbl_role ON tbl_role.role_id = tbl_login.role
        WHERE username = ? AND password = ? `;

        connection.query(query, [username, hashedPass], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            // Check if results array is not empty
            if (result.length > 0) {

                const user = result[0]; // Get the first (and presumably only) row

                // console.log(user);
                // console.log(user.role);
                // console.log(user.department);
                const payload = {
                    id: user.customer_no,
                    name: user.customer_name,
                    username: user.username,
                    role: user.role
                };

                const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });


                const role = user.role;


                res.json({ result: user, token, role });
            } else {
                // No user found
                res.status(401).json({ error: "Invalid username or password" });
            }
        })
    },

    getproduct: (req, res) => {

        const query = `SELECT * FROM tbl_product_type`

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        })
    },

    viewproduct: (req, res) => {
        const id = req.body.id

        const query = `SELECT * FROM tbl_order_creation WHERE order_no = ?`

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        })
    },

    orderedit: (req, res) => {
        // console.log(req.body);
        const image = req.file ? req.file.location : null;
        // console.log(image);

        const { product_type, style_code, design, qty, size, total_wgt, wgt_expected } = req.body

        const sentid = parseInt(req.body.sentid);

        const values = [product_type, design, qty, style_code, size, total_wgt, wgt_expected, image, sentid]
        const query = `UPDATE tbl_order_creation
        SET product_type=?, design=?, qty=?, style_code=?, size=?, total_wgt=?, wgt_expected=?, image=?
        WHERE order_no = ?`

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json('successfull')
        })
    },

    orderdelete: (req, res) => {
        const id = req.body.id

        const query = `UPDATE tbl_order_creation SET status = 1 WHERE order_no = ?`

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json('deleted successful')
        })
    },
    departmentTrasfer: (req, res) => {
        const { id, order } = req.body

        // console.log(id, order);

        const value = [id, order]
        const query = `UPDATE tbl_order_creation SET status = 2, department = ? WHERE order_no = ?`

        connection.query(query, value, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result)
        })
    }
};

module.exports = admin;