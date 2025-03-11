const express = require('express');
const cors = require('cors');
const app = express();
const {
  getAllEmployees,
  getEmployeesById,
  employees,
} = require('./controllers');

app.use(cors());
app.use(express.json());

function validateEmployee(employees) {
  if (!employees.name || typeof employees.name !== 'string') {
    return 'Name is required and should be a string.';
  }
  return null;
}

app.get('/employees', async (req, res) => {
  res.status(200).json({ employees: employees,message:"new commit" });
});

app.get('/employees/details/:id', async (req, res) => {
  console.log('It ran!');
  const employee = employees.find(
    (e) => e.employeeId === parseInt(req.params.id)
  );
  if (!employee) {
    return res.status(404).send('Employee not found');
  }
  res.status(200).json({ employee: employee });
});
app.post('/employees', async (req, res) => {
  let error = validateEmployee(req.body);
  if (error) return res.status(400).send(error);

  let employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

module.exports = { app, validateEmployee };
