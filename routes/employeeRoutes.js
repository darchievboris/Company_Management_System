const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Employee = mongoose.model('Employee');

module.exports = app => {
  app.get('/api/employee', requireLogin, async (req, res) => {
    const employees = await Employee.find({ _user: req.user.id });
    res.send(employees);
  });

  app.get('/api/employee/:id', requireLogin, async (req, res) => {
    const employees = await Employee.find({ id: req.params.id });
    res.send(employees);
  });

//   app.patch('/api/client', requireLogin, (req, res) => {
//     console.log("ID", req.body);
//     Client.findByIdAndUpdate(req.body._id, {$set:req.body}, {new: true}, (err, client) => {
//       if (err) {
//         res.send(err)
//       }
//       res.send(client);
//     })
//   })

//   app.delete('/api/client/:id', (req,res)=> {
//     Client.findByIdAndRemove(req.params.id, err => {
//       if(err){
//         res.send(err);
//       }
//       res.status(200).send({message: "user deleted"})
//     })
//   })

  app.post('/api/employee', requireLogin, async (req, res) => {
    const { 
      name, phone, email, rate, position, ssn
    } = req.body;

    const employee = new Employee({
      name,
      phone,
      email,
      rate,
      position,
      ssn,
      _user: req.user.id
    })

    try{
      const newEmployee = await employee.save();
      res.send(newEmployee);
    }catch(err){
      res.status(422).send(err);
    }

  });
};