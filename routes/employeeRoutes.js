const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Employee = mongoose.model('employee');

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

//   app.post('/api/client', requireLogin, async (req, res) => {
//     const { 
//       firstName, lastName, phone, email, notes, start, end, jobLength, sameDay, wholeDay, addressFrom, addressTo
//     } = req.body;

//     const client = new Client({
//       firstName,
//       lastName,
//       phone,
//       email,
//       notes,
//       start,
//       end,
//       jobLength,
//       sameDay,
//       wholeDay,
//       addressFrom,
//       addressTo,
//       _user: req.user.id
//     })

//     try{
//       const newClient = await client.save();
//       res.send(newClient);
//     }catch(err){
//       res.status(422).send(err);
//     }

//   });
};