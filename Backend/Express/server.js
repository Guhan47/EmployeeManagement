const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const db = require("../Database/Db") 
const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

app.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employees"
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Database error")
    }
    res.json(result)
  })
})

app.get("/employee/:id", (req, res) => {
  const { id } = req.params
  const sql = "SELECT * FROM employees WHERE id = ?"
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send("Database error")
    res.json(result[0])
  })
})


app.post("/employees", upload.single("image"), (req, res) => {
  const { name, employee_id, department, designation, project, type, status } = req.body
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null

  const sql = `INSERT INTO employees (name, employee_id, department, designation, project, type, status, image_path)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(sql, [name, employee_id, department, designation, project, type, status, imagePath], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Database error")
    }
    res.status(200).send({ message: "Employee added successfully", id: result.insertId })
  })
})

app.put("/employees/:id", upload.single("image"), (req, res) => {
  const { id } = req.params
  const { name, employee_id, department, designation, project, type, status } = req.body
  let sql = "UPDATE employees SET name=?, employee_id=?, department=?, designation=?, project=?, type=?, status=?"
  const values = [name, employee_id, department, designation, project, type, status]

  if (req.file) {
    sql += ", image_path=?"
    values.push(`/uploads/${req.file.filename}`)
  }
  sql += " WHERE id=?"
  values.push(id)

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Database error")
    }
    res.status(200).send({ message: "Employee updated successfully" })
  })
})

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM employees WHERE id=?"
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Database error")
    }
    res.status(200).send({ message: "Employee deleted successfully" })
  })
})

app.listen(5000, () => {
  console.log(`server running on port 5000`)
})
