const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1248",
    database: "internship",
    dateStrings: 'date',
});

//Leave Tracker
app.get('/getEmployeeName', (req, res) => {
    db.query("SELECT emp_id,emp_name from employee;", (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getTeam', (req, res) => {
    const eid = req.body.eid;
    db.query("SELECT dept_name from employee,department, emp_dept where employee.emp_id = emp_dept.emp_id and emp_dept.dept_id = department.dept_id and employee.emp_id=?;", eid, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getTotalLeaves', (req, res) => {
    const eid = req.body.eid;
    db.query("SELECT start_date, end_date from leaves where emp_id=?;", eid, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            var count = 0;
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var start = result[i].start_date;
                    var end = result[i].end_date;
                    var diffInMins = new Date(end) - new Date(start);
                    var diffInDays = diffInMins / (1000 * 60 * 60 * 24) + 1;
                    count += diffInDays;
                }
                //console.log(count)
                res.json({ result: count })
            }
            else {
                //console.log("No Leaves Taken!")
                res.send("No Leaves Taken!")
            }
        }
    })
})

app.post('/getNameDisplay', (req, res) => {
    const eid = req.body.eid;
    db.query("SELECT emp_name FROM employee WHERE emp_id=?;", eid, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

//Resource - Wise Table and Risk Chart
app.post('/getSingleDepartment', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT dept_name, threshold from department where dept_id = ?;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/getRecords', (req, res) => {
    db.query("SELECT employee.emp_id, emp_name, DATE(start_date) as start_date, DATE(end_date) as end_date from employee, leaves where employee.emp_id = leaves.emp_id;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.get('/getDepartments', (req, res) => {
    db.query("SELECT dept_id, dept_name FROM department;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getEmployeeData', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT employee.emp_id,emp_name FROM emp_dept,employee where dept_id=? and emp_dept.emp_id = employee.emp_id;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

//Login Functionality!
// const verifyJWT = (req, res, next) => {
//     const token = req.headers['x-token']

//     console.log(token)

//     if (!token) {
//         res.send("<h3>Authentication Failure! Access Denied!</h3>")
//     }
//     else {
//         jwt.verify(token, "jwtSecret", (err, decoded) => {
//             if (err) {
//                 res.json({ auth: false, message: "Authentication error!" });
//             }
//             else {
//                 req.userId = decoded.id
//                 next()
//             }
//         })
//     }
// }

// app.get('/isUserAuth', verifyJWT, (req, res) => {
//     res.send("Yes you are an authenticated user!")
// })


// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     //console.log(username)

//     db.query("SELECT * FROM user WHERE username = ?;", username, (err, result) => {
//         if (err) {
//             res.send({ err: err });
//         }
//         if (result.length > 0) {
//             db.query("SELECT username,password FROM user WHERE username = ? and password = ?;", [username, password], (err, result1) => {

//                 if (result1.length > 0) {
//                     const id = result[0].id;
//                     const token = jwt.sign({ id }, "jwtSecret", {
//                         expiresIn: 300,
//                     })
//                     res.json({ auth: true, result: result, token: token })
//                 }
//                 else {
//                     res.json({ auth: false, msg: "Wrong Username/Password Combination" })
//                 }
//             })
//         }
//         else {
//             res.json({ auth: false, msg: "User doesn't exist!" })
//         }
//     })

// })

app.listen(3001, () => {
    console.log("Server started running!")
});