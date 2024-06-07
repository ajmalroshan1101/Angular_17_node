const connection = require("../utility/mysql");

const department = {
    orderlist: (req, res) => {
        const id = req.body.id;
        const query = `SELECT * FROM tbl_order_creation WHERE status = 2 AND department = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },

    handmadeorder: (req, res) => {
        const query = `SELECT tbl_order_creation.order_no,tbl_order_creation.employee_name ,tbl_order_creation.product_type,tbl_order_creation.style_code,hm_department.hm_department_name,hm_department.hm_department_id  FROM tbl_order_creation 
        LEFT JOIN hm_department on hm_department.hm_department_id=tbl_order_creation.sub_department
        WHERE tbl_order_creation.status = 2 AND tbl_order_creation.department = 1
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },

    getSubDepartmentHM: (req, res) => {
        const query = `SELECT hm_department_id AS department_id,
        hm_department_name AS department_name
        FROM hm_department WHERE 1`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },

    order_change_sub_department: (req, res) => {
        console.log(req.body);

        const dep = parseInt(req.body.dep);
        const id = parseInt(req.body.id);

        const value = [dep, id];

        const query = `UPDATE tbl_order_creation SET sub_department = ? WHERE order_no = ?`;

        connection.query(query, value, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json("insert successful");
        });
    },

    vieworderlist: (req, res) => {
        const id = parseInt(req.body.id);
        console.log(id);
        const query = `SELECT * FROM tbl_order_creation WHERE department = 1 AND status = 2 AND order_no = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },
    getcastingorder: (req, res) => {
        const query = `SELECT tbl_order_creation.order_no,tbl_order_creation.employee_name ,tbl_order_creation.product_type,tbl_order_creation.style_code,tbl_casting_dept.casting_dept_name,tbl_casting_dept.casting_dept_id  FROM tbl_order_creation 
        LEFT JOIN tbl_casting_dept on tbl_casting_dept.casting_dept_id=tbl_order_creation.sub_department
        WHERE tbl_order_creation.status = 2 AND tbl_order_creation.department = 2`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },

    view_order_casting: (req, res) => {
        const id = parseInt(req.body.id);

        console.log(id);
        const query = `SELECT * FROM tbl_order_creation WHERE department = 2 AND status = 2 AND order_no = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },

    sub_department_cast: (req, res) => {
        const query = `SELECT casting_dept_id AS department_id,
        casting_dept_name  AS  department_name
        FROM tbl_casting_dept WHERE 1`;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err.message);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            res.json(result);
        });
    },
};

module.exports = department;