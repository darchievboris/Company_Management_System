const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport =require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/Client');
require('./models/Employee');
require('./services/passport');

mongoose.connect(keys.mongoURI);

var app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 *1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/clientRoutes')(app);
require('./routes/employeeRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/',(req,res)=>{
  res.send({hello:"dev"})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('CMS server listening at port: ', PORT);
}); 