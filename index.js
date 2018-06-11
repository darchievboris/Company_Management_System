const express = require('express');
require('./services/passport');

var app = express();

require('./routes/authRoutes')(app);

app.get('/',(req,res)=>{
  res.send({hello:"kostya"})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening at port: ', PORT);
}); 