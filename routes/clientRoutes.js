const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Client = mongoose.model('client');

module.exports = app => {
  app.get('/api/clients', requireLogin, async (req, res) => {
    const clients = await Client.find({ _user: req.user.id });
    res.send(clients);
  });

  app.patch('/api/client', requireLogin, async(req, res) => {
    console.log("ID", req.body);
    Client.findByIdAndUpdate(req.body._id, {$set:req.body}, {new: true}, (err, client) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      res.send(client);
    })
  })

  app.post('/api/client', requireLogin, async (req, res) => {
    const { 
      firstName, lastName, phone, email, notes, start, end, jobLength, sameDay, wholeDay, addressFrom, addressTo
    } = req.body;

    const client = new Client({
      firstName,
      lastName,
      phone,
      email,
      notes,
      start,
      end,
      jobLength,
      sameDay,
      wholeDay,
      addressFrom,
      addressTo,
      _user: req.user.id
    })

    try{
      const newClient = await client.save();
      res.send(newClient);
    }catch(err){
      res.status(422).send(err);
    }

  });
};